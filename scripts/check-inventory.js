#!/usr/bin/env node

/**
 * Polls Shopify for hot-sauce/rub inventory and alerts Scott by email the moment
 * a product crosses under LOW_STOCK_THRESHOLD. Only fires once per dip — state is
 * tracked in src/data/inventory-state.json (committed by the workflow) so a product
 * sitting low for days doesn't re-alert on every run. It re-arms once restocked.
 */

import fetch from 'node-fetch';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const SHOPIFY_STORE_DOMAIN = process.env.VITE_SHOPIFY_STORE_DOMAIN;
const SHOPIFY_STOREFRONT_TOKEN = process.env.VITE_SHOPIFY_STOREFRONT_TOKEN;
const SHOPIFY_API_VERSION = '2024-10';
const ALERT_FUNCTION_URL = process.env.ALERT_FUNCTION_URL;
const ALERT_SECRET = process.env.ALERT_SECRET;

const LOW_STOCK_THRESHOLD = 25;
const LOW_STOCK_ELIGIBLE_CATEGORIES = ['hot-sauce', 'rub'];
const STATE_PATH = path.join(__dirname, '../src/data/inventory-state.json');
const SITE_URL = 'https://hellboundsauces.com';

if (!SHOPIFY_STORE_DOMAIN || !SHOPIFY_STOREFRONT_TOKEN) {
  console.error('Missing VITE_SHOPIFY_STORE_DOMAIN or VITE_SHOPIFY_STOREFRONT_TOKEN');
  process.exit(1);
}
if (!ALERT_FUNCTION_URL || !ALERT_SECRET) {
  console.error('Missing ALERT_FUNCTION_URL or ALERT_SECRET');
  process.exit(1);
}

const STOREFRONT_URL = `https://${SHOPIFY_STORE_DOMAIN}/api/${SHOPIFY_API_VERSION}/graphql.json`;

const PRODUCTS_QUERY = `
  {
    products(first: 100) {
      edges {
        node {
          handle
          title
          productType
          tags
          variants(first: 100) {
            edges {
              node {
                availableForSale
                quantityAvailable
              }
            }
          }
        }
      }
    }
  }
`;

// Mirrors getCategory() in src/lib/shopifyTransform.ts and scripts/fetch-products.js.
function getCategory(productType = '', tags = []) {
  const type = productType.toLowerCase();
  const tagStr = tags.join(' ').toLowerCase();
  if (type.includes('merch') || type.includes('apparel') || type.includes('clothing') ||
      tagStr.includes('merch') || tagStr.includes('apparel') || tagStr.includes('shirt') || tagStr.includes('hat')) {
    return 'merch';
  }
  if (type.includes('bundle') || tagStr.includes('bundle')) return 'bundle';
  if (type.includes('rub') || tagStr.includes('rub') || tagStr.includes('bbq')) return 'rub';
  // Only trust productType for "sauce"/"hot" — tag-based matching false-positives on
  // brand/marketing tags like "HellBound Sauces" or "Hot Sauce Lover" applied to merch.
  if (type.includes('sauce') || type.includes('hot')) return 'hot-sauce';
  return 'merch';
}

// Mirrors getTotalAvailableQuantity() in src/lib/inventory.ts.
function getTotalAvailableQuantity(variants) {
  const available = variants.filter(v => v.availableForSale !== false);
  if (available.some(v => v.quantityAvailable === undefined || v.quantityAvailable === null)) return undefined;
  return available.reduce((sum, v) => sum + v.quantityAvailable, 0);
}

function loadState() {
  try {
    return JSON.parse(fs.readFileSync(STATE_PATH, 'utf-8'));
  } catch {
    return {};
  }
}

async function main() {
  console.log('Checking Shopify inventory for low-stock products...');

  const res = await fetch(STOREFRONT_URL, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'X-Shopify-Storefront-Access-Token': SHOPIFY_STOREFRONT_TOKEN,
    },
    body: JSON.stringify({ query: PRODUCTS_QUERY }),
  });

  if (!res.ok) {
    throw new Error(`Shopify API error: ${res.status} ${res.statusText}`);
  }

  const data = await res.json();
  if (data.errors) {
    throw new Error(`Shopify GraphQL error: ${data.errors[0].message}`);
  }

  const products = (data?.data?.products?.edges || []).map(e => e.node);
  const prevState = loadState();
  const nextState = { ...prevState };
  const newlyLow = [];

  for (const product of products) {
    const category = getCategory(product.productType, product.tags);
    if (!LOW_STOCK_ELIGIBLE_CATEGORIES.includes(category)) continue;

    const variants = (product.variants?.edges || []).map(e => e.node);
    const quantity = getTotalAvailableQuantity(variants);
    if (quantity === undefined) continue;

    const isLow = quantity > 0 && quantity < LOW_STOCK_THRESHOLD;
    const wasLow = prevState[product.handle]?.low ?? false;

    if (isLow && !wasLow) {
      newlyLow.push({ title: product.title, handle: product.handle, quantity });
    }

    nextState[product.handle] = { low: isLow, quantity };
  }

  if (newlyLow.length > 0) {
    console.log(`Alerting on ${newlyLow.length} newly low-stock product(s):`, newlyLow.map(p => p.handle).join(', '));

    const alertRes = await fetch(ALERT_FUNCTION_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'x-alert-secret': ALERT_SECRET,
      },
      body: JSON.stringify({
        type: 'low-stock',
        email: 'inventory-alerts@hellboundsauces.com',
        products: newlyLow,
        siteUrl: SITE_URL,
      }),
    });

    if (!alertRes.ok) {
      throw new Error(`Alert function returned ${alertRes.status}: ${await alertRes.text()}`);
    }
  } else {
    console.log('No newly low-stock products this run.');
  }

  fs.writeFileSync(STATE_PATH, JSON.stringify(nextState, null, 2) + '\n');
}

main().catch(err => {
  console.error('Inventory check failed:', err.message);
  process.exit(1);
});
