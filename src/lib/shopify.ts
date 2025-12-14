// Shopify Configuration
export const SHOPIFY_API_VERSION = '2024-10';
const SHOPIFY_STORE_DOMAIN = import.meta.env.VITE_SHOPIFY_STORE_DOMAIN;
const SHOPIFY_STOREFRONT_TOKEN = import.meta.env.VITE_SHOPIFY_STOREFRONT_TOKEN;

// Construct Shopify Storefront API URL
export const SHOPIFY_STOREFRONT_URL = `https://${SHOPIFY_STORE_DOMAIN}/api/${SHOPIFY_API_VERSION}/graphql.json`;

/**
 * Generic Storefront API request handler
 */
export async function shopifyFetch(query: string, variables = {}) {
  console.log('Shopify API Request:', {
    url: SHOPIFY_STOREFRONT_URL,
    hasToken: !!SHOPIFY_STOREFRONT_TOKEN,
    domain: SHOPIFY_STORE_DOMAIN,
  });

  if (!SHOPIFY_STORE_DOMAIN || !SHOPIFY_STOREFRONT_TOKEN) {
    throw new Error('Shopify environment variables not configured. Check VITE_SHOPIFY_STORE_DOMAIN and VITE_SHOPIFY_STOREFRONT_TOKEN');
  }

  const res = await fetch(SHOPIFY_STOREFRONT_URL, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "X-Shopify-Storefront-Access-Token": SHOPIFY_STOREFRONT_TOKEN,
    },
    body: JSON.stringify({ query, variables }),
  });

  if (!res.ok) {
    const errorText = await res.text();
    console.error('Shopify API Error:', {
      status: res.status,
      statusText: res.statusText,
      body: errorText,
    });
    throw new Error(`Shopify Storefront API request failed: ${res.status} ${res.statusText}`);
  }

  const data = await res.json();

  if (data.errors) {
    console.error('Shopify GraphQL Errors:', data.errors);
    throw new Error(`Shopify GraphQL Error: ${data.errors[0].message}`);
  }

  return data;
}
