// Debug script to check what products Shopify is returning
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
{
  products(first: 50) {
    edges {
      node {
        id
        title
        handle
        productType
        tags
        availableForSale
        totalInventory
        variants(first: 100) {
          edges {
            node {
              id
              title
              availableForSale
            }
          }
        }
      }
    }
  }
}
`;

async function debugProducts() {
  console.log('Fetching products from Shopify...\n');

  const res = await fetch(SHOPIFY_STOREFRONT_URL, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "X-Shopify-Storefront-Access-Token": SHOPIFY_STOREFRONT_TOKEN,
    },
    body: JSON.stringify({ query }),
  });

  const data = await res.json();

  if (data.errors) {
    console.error('GraphQL Errors:', data.errors);
    return;
  }

  const products = data.data.products.edges;
  console.log(`Total products returned: ${products.length}\n`);

  products.forEach((edge, index) => {
    const product = edge.node;
    const variantsAvailable = product.variants.edges.filter(v => v.node.availableForSale).length;
    const totalVariants = product.variants.edges.length;

    console.log(`${index + 1}. ${product.title}`);
    console.log(`   Handle: ${product.handle}`);
    console.log(`   Type: ${product.productType}`);
    console.log(`   Tags: ${product.tags.join(', ')}`);
    console.log(`   Available: ${product.availableForSale}`);
    console.log(`   Variants: ${variantsAvailable}/${totalVariants} available`);
    console.log('');
  });

  // Group by product type
  const byType = products.reduce((acc, edge) => {
    const type = edge.node.productType || 'No Type';
    acc[type] = (acc[type] || 0) + 1;
    return acc;
  }, {});

  console.log('\nProducts by Type:');
  Object.entries(byType).forEach(([type, count]) => {
    console.log(`  ${type}: ${count}`);
  });
}

debugProducts().catch(console.error);
