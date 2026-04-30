#!/usr/bin/env node

/**
 * Fetch all products from Shopify Storefront API and save to static JSON.
 * Runs at build time on Netlify so product pages render with real images
 * on first paint — prevents Soft 404 from Google seeing loading states.
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

if (!SHOPIFY_STORE_DOMAIN || !SHOPIFY_STOREFRONT_TOKEN) {
  console.warn('⚠️  Shopify env vars not set — skipping product fetch. Pages will use placeholder images.');
  process.exit(0);
}

const STOREFRONT_URL = `https://${SHOPIFY_STORE_DOMAIN}/api/${SHOPIFY_API_VERSION}/graphql.json`;

const PRODUCTS_QUERY = `
  {
    products(first: 100) {
      edges {
        node {
          id
          title
          handle
          description
          descriptionHtml
          productType
          tags
          images(first: 10) {
            edges {
              node {
                url
                altText
              }
            }
          }
          variants(first: 100) {
            edges {
              node {
                id
                title
                price { amount currencyCode }
                compareAtPrice { amount currencyCode }
                availableForSale
                image { url altText }
                selectedOptions { name value }
              }
            }
          }
        }
      }
    }
  }
`;

function getCategory(productType = '', tags = []) {
  const type = productType.toLowerCase();
  const tagStr = tags.join(' ').toLowerCase();
  if (type.includes('merch') || type.includes('apparel') || type.includes('clothing') ||
      tagStr.includes('merch') || tagStr.includes('apparel') || tagStr.includes('shirt') || tagStr.includes('hat')) {
    return 'merch';
  }
  if (type.includes('bundle') || tagStr.includes('bundle')) return 'bundle';
  if (type.includes('rub') || tagStr.includes('rub') || tagStr.includes('bbq')) return 'rub';
  if (type.includes('sauce') || tagStr.includes('sauce') || tagStr.includes('hot')) return 'hot-sauce';
  return 'merch';
}

function getHeatLevel(tags = []) {
  const tagStr = tags.join(' ').toLowerCase();
  if (tagStr.includes('heat-5') || tagStr.includes('heat5')) return 5;
  if (tagStr.includes('heat-4') || tagStr.includes('heat4')) return 4;
  if (tagStr.includes('heat-3') || tagStr.includes('heat3')) return 3;
  if (tagStr.includes('heat-2') || tagStr.includes('heat2')) return 2;
  if (tagStr.includes('heat-1') || tagStr.includes('heat1')) return 1;
  if (tagStr.includes('extreme')) return 5;
  if (tagStr.includes('very hot')) return 4;
  if (tagStr.includes('medium hot')) return 3;
  if (tagStr.includes('mild')) return 2;
  return undefined;
}

function transformProduct(node) {
  const firstVariant = node.variants?.edges?.[0]?.node;
  const images = node.images?.edges?.map(e => e.node.url).filter(Boolean);
  const category = getCategory(node.productType, node.tags);

  return {
    id: node.id,
    handle: node.handle,
    title: node.title,
    description: node.description || '',
    longDescription: node.description || '',
    descriptionHtml: category === 'merch' ? (node.descriptionHtml || '') : undefined,
    price: parseFloat(firstVariant?.price?.amount || '0'),
    compareAtPrice: firstVariant?.compareAtPrice ? parseFloat(firstVariant.compareAtPrice.amount) : undefined,
    images: images?.length ? images : ['/placeholder.svg'],
    category,
    heatLevel: getHeatLevel(node.tags),
    featured: node.tags?.includes('featured'),
    bestSeller: node.tags?.includes('best-seller'),
    new: node.tags?.includes('new'),
    shopifyVariantId: firstVariant?.id,
    tags: node.tags || [],
    variants: node.variants?.edges?.map(e => ({
      id: e.node.id,
      title: e.node.title,
      price: parseFloat(e.node.price.amount),
      availableForSale: e.node.availableForSale,
      image: e.node.image?.url,
      selectedOptions: e.node.selectedOptions,
    })) || [],
  };
}

async function fetchProducts() {
  console.log('📡 Fetching products from Shopify Storefront API...');

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

  const products = (data?.data?.products?.edges || []).map(e => transformProduct(e.node));

  const outputPath = path.join(__dirname, '../src/data/products-static.json');
  fs.writeFileSync(outputPath, JSON.stringify({
    fetchedAt: new Date().toISOString(),
    products,
  }, null, 2));

  console.log(`✅ Saved ${products.length} products to src/data/products-static.json`);
  products.forEach(p => {
    const hasRealImages = p.images[0] !== '/placeholder.svg';
    console.log(`   ${hasRealImages ? '🖼️ ' : '⚠️ '} ${p.handle} — ${p.images.length} image(s)`);
  });
}

fetchProducts().catch(err => {
  console.error('❌ Error fetching products:', err.message);
  process.exit(1);
});
