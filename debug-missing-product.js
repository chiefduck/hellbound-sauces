// Check why "2026 Logo Shirt" isn't appearing in API results
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

// Search for products with "2026" or "Logo Shirt" in the title
const searchQuery = `
{
  products(first: 50, query: "2026") {
    edges {
      node {
        id
        title
        handle
        availableForSale
        publishedAt
      }
    }
  }
}
`;

async function findMissingProduct() {
  console.log('🔍 Searching for "2026 Logo Shirt"...\n');

  const res = await fetch(SHOPIFY_STOREFRONT_URL, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "X-Shopify-Storefront-Access-Token": SHOPIFY_STOREFRONT_TOKEN,
    },
    body: JSON.stringify({ query: searchQuery }),
  });

  const data = await res.json();

  if (data.errors) {
    console.error('GraphQL Errors:', data.errors);
    return;
  }

  const products = data.data.products.edges;

  if (products.length === 0) {
    console.log('❌ Product NOT found in Storefront API results');
    console.log('\n⚠️  This means the product is either:');
    console.log('   1. In DRAFT status (not published)');
    console.log('   2. Not published to the "Online Store" sales channel');
    console.log('\n📝 To fix this in Shopify Admin:');
    console.log('   1. Go to Products → Find "2026 Logo Shirt"');
    console.log('   2. Check the Status in the top right - it should be "Active"');
    console.log('   3. Scroll down to "Product availability" section');
    console.log('   4. Make sure "Online Store" is checked');
    console.log('   5. Click "Save"');
  } else {
    console.log(`✅ Found ${products.length} product(s):\n`);
    products.forEach((edge, index) => {
      const p = edge.node;
      console.log(`${index + 1}. ${p.title}`);
      console.log(`   Handle: ${p.handle}`);
      console.log(`   Available for sale: ${p.availableForSale}`);
      console.log(`   Published: ${p.publishedAt || 'NOT PUBLISHED'}`);
      console.log('');
    });
  }
}

findMissingProduct().catch(console.error);
