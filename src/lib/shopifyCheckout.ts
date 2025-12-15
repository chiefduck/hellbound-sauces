import { shopifyFetch } from "./shopify";

export interface CartItem {
  variantId: string;
  quantity: number;
  title: string;
  price: number;
  image?: string;
  handle?: string;
}

/**
 * Create a Shopify cart and get checkout URL
 * Uses the newer cartCreate mutation (2024-10 API)
 */
export async function createCheckout(items: CartItem[]) {
  console.log('Creating checkout with items:', items);

  const lines = items.map(item => ({
    merchandiseId: item.variantId,
    quantity: item.quantity,
  }));

  const mutation = `
    mutation cartCreate($input: CartInput!) {
      cartCreate(input: $input) {
        cart {
          id
          checkoutUrl
          totalQuantity
          cost {
            totalAmount {
              amount
              currencyCode
            }
          }
          lines(first: 100) {
            edges {
              node {
                id
                quantity
                merchandise {
                  ... on ProductVariant {
                    id
                    title
                    price {
                      amount
                      currencyCode
                    }
                    product {
                      title
                      handle
                    }
                  }
                }
              }
            }
          }
        }
        userErrors {
          field
          message
        }
      }
    }
  `;

  const variables = {
    input: {
      lines,
    },
  };

  const response = await shopifyFetch(mutation, variables);

  console.log('Checkout response:', response);

  if (response.data?.cartCreate?.userErrors?.length > 0) {
    const errors = response.data.cartCreate.userErrors;
    console.error('Cart creation errors:', errors);
    throw new Error(errors[0].message);
  }

  if (!response.data?.cartCreate?.cart?.checkoutUrl) {
    console.error('No checkout URL in response:', response);
    throw new Error('Failed to create checkout - no checkout URL returned');
  }

  const checkoutUrl = response.data.cartCreate.cart.checkoutUrl;
  const shopifyDomain = import.meta.env.VITE_SHOPIFY_STORE_DOMAIN;

  console.log('=== CHECKOUT URL DEBUG ===');
  console.log('Raw checkout URL from Shopify:', checkoutUrl);
  console.log('Shopify domain:', shopifyDomain);
  console.log('URL starts with /:', checkoutUrl.startsWith('/'));
  console.log('URL includes hellboundsauces.com:', checkoutUrl.includes('hellboundsauces.com'));

  // Ensure we have a full URL pointing to Shopify domain
  let fullCheckoutUrl = checkoutUrl;

  // Case 1: Relative URL (starts with /)
  if (checkoutUrl.startsWith('/')) {
    fullCheckoutUrl = `https://${shopifyDomain}${checkoutUrl}`;
    console.log('Converted relative URL to absolute:', fullCheckoutUrl);
  }
  // Case 2: Full URL with custom domain (contains hellboundsauces.com)
  else if (checkoutUrl.includes('hellboundsauces.com')) {
    fullCheckoutUrl = checkoutUrl.replace('hellboundsauces.com', shopifyDomain);
    console.log('Replaced custom domain with Shopify domain:', fullCheckoutUrl);
  }
  // Case 3: Already a full Shopify URL
  else {
    console.log('URL already appears to be a full Shopify URL');
  }

  console.log('Final checkout URL:', fullCheckoutUrl);
  console.log('=== END DEBUG ===');

  return {
    id: response.data.cartCreate.cart.id,
    webUrl: fullCheckoutUrl,
    totalQuantity: response.data.cartCreate.cart.totalQuantity,
    totalAmount: response.data.cartCreate.cart.cost.totalAmount,
  };
}

export function redirectToCheckout(checkoutUrl: string) {
  console.log('=== REDIRECT DEBUG ===');
  console.log('Received checkout URL for redirect:', checkoutUrl);

  // Validate we have a full URL
  if (!checkoutUrl.startsWith('http://') && !checkoutUrl.startsWith('https://')) {
    console.error('Invalid checkout URL - not a full URL:', checkoutUrl);
    throw new Error('Invalid checkout URL format');
  }

  // Additional safety check: ensure URL uses Shopify domain, not custom domain
  const shopifyDomain = import.meta.env.VITE_SHOPIFY_STORE_DOMAIN;
  let finalCheckoutUrl = checkoutUrl;

  if (checkoutUrl.includes('hellboundsauces.com')) {
    finalCheckoutUrl = checkoutUrl.replace('hellboundsauces.com', shopifyDomain);
    console.warn('WARNING: Checkout URL contained custom domain, replaced with Shopify domain');
    console.log('Original:', checkoutUrl);
    console.log('Corrected:', finalCheckoutUrl);
  }

  console.log('Final redirect URL:', finalCheckoutUrl);
  console.log('Shopify domain check:', finalCheckoutUrl.includes(shopifyDomain) ? 'PASS' : 'FAIL');
  console.log('Executing redirect via window.location.replace...');
  console.log('=== END REDIRECT DEBUG ===');

  // Use window.location.replace for a cleaner redirect (no browser history entry)
  window.location.replace(finalCheckoutUrl);
}
