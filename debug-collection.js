// Debug script to check what's in the merch-and-apparel collection
import { readFileSync } from 'fs';

// Load .env.local
const envFile = readFileSync('.env.local', 'utf8');
const envVars = {};
envFile.split('\n').forEach(line => {
  const [key, ...valueParts] = line.split('=');
  if (key && valueParts.length) {
    envVars[key.trim()] = valueParts.join('=').trim();
  }
});

const SHOPIFY_STORE_DOMAIN = envVars.VITE_SHOPIFY_STORE_DOMAIN;
const SHOPIFY_STOREFRONT_TOKEN = envVars.VITE_SHOPIFY_STOREFRONT_TOKEN;
const SHOPIFY_API_VERSION = '2024-10';
const SHOPIFY_STOREFRONT_URL = `https://${SHOPIFY_STORE_DOMAIN}/api/${SHOPIFY_API_VERSION}/graphql.json`;

const query = `
  query getCollection($handle: String!) {
    collection(handle: $handle) {
      id
      title
      handle
      products(first: 50) {
        edges {
          node {
            id
            title
            handle
            productType
          }
        }
      }
    }
  }
`;

async function debugCollection(handle) {
  console.log(`\n🔍 Checking collection: ${handle}\n`);

  const res = await fetch(SHOPIFY_STOREFRONT_URL, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "X-Shopify-Storefront-Access-Token": SHOPIFY_STOREFRONT_TOKEN,
    },
    body: JSON.stringify({ query, variables: { handle } }),
  });

  const data = await res.json();

  if (data.errors) {
    console.error('GraphQL Errors:', data.errors);
    return;
  }

  if (!data.data.collection) {
    console.log(`❌ Collection "${handle}" not found in Shopify!`);
    return;
  }

  const collection = data.data.collection;
  const products = collection.products.edges;

  console.log(`✅ Collection found: ${collection.title}`);
  console.log(`📦 Products in collection: ${products.length}\n`);

  products.forEach((edge, index) => {
    const product = edge.node;
    console.log(`${index + 1}. ${product.title}`);
    console.log(`   Handle: ${product.handle}`);
    console.log(`   Type: ${product.productType}`);
    console.log('');
  });
}

// Check all collections
async function checkAllCollections() {
  await debugCollection('all');
  await debugCollection('hot-sauce');
  await debugCollection('bbq-rubs');
  await debugCollection('merch-and-apparel');
  await debugCollection('bundles');
}

checkAllCollections().catch(console.error);
