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
  const checkoutDomain = 'checkout.hellboundsauces.com';

  console.log('=== CHECKOUT URL DEBUG ===');
  console.log('Raw checkout URL from Shopify:', checkoutUrl);
  console.log('Target checkout domain:', checkoutDomain);
  console.log('URL starts with /:', checkoutUrl.startsWith('/'));
  console.log('URL includes checkout.hellboundsauces.com:', checkoutUrl.includes(checkoutDomain));

  // Ensure we have a full URL pointing to checkout domain
  let fullCheckoutUrl = checkoutUrl;

  // Case 1: Relative URL (starts with /)
  if (checkoutUrl.startsWith('/')) {
    fullCheckoutUrl = `https://${checkoutDomain}${checkoutUrl}`;
    console.log('Converted relative URL to absolute:', fullCheckoutUrl);
  }
  // Case 2: Already has checkout.hellboundsauces.com - use as is
  else if (checkoutUrl.includes(checkoutDomain)) {
    console.log('URL already uses checkout domain - no changes needed');
  }
  // Case 3: Has hellboundsauces.com but not checkout subdomain - add checkout subdomain
  else if (checkoutUrl.includes('hellboundsauces.com')) {
    fullCheckoutUrl = checkoutUrl.replace('hellboundsauces.com', checkoutDomain);
    console.log('Updated to use checkout subdomain:', fullCheckoutUrl);
  }
  // Case 4: Has myshopify.com domain - replace with checkout domain
  else if (checkoutUrl.includes('myshopify.com')) {
    const urlParts = checkoutUrl.split('/');
    const pathAfterDomain = '/' + urlParts.slice(3).join('/');
    fullCheckoutUrl = `https://${checkoutDomain}${pathAfterDomain}`;
    console.log('Replaced Shopify domain with checkout domain:', fullCheckoutUrl);
  }
  // Case 5: Unknown format
  else {
    console.log('URL in unexpected format, using as-is:', fullCheckoutUrl);
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

  // Ensure URL uses checkout.hellboundsauces.com
  const checkoutDomain = 'checkout.hellboundsauces.com';
  let finalCheckoutUrl = checkoutUrl;

  // If URL doesn't already use checkout.hellboundsauces.com, update it
  if (!checkoutUrl.includes(checkoutDomain)) {
    if (checkoutUrl.includes('hellboundsauces.com')) {
      finalCheckoutUrl = checkoutUrl.replace(/([^.]+\.)?hellboundsauces\.com/, checkoutDomain);
      console.log('Updated to checkout domain:', finalCheckoutUrl);
    } else if (checkoutUrl.includes('myshopify.com')) {
      const urlParts = checkoutUrl.split('/');
      const pathAfterDomain = '/' + urlParts.slice(3).join('/');
      finalCheckoutUrl = `https://${checkoutDomain}${pathAfterDomain}`;
      console.log('Replaced myshopify.com with checkout domain:', finalCheckoutUrl);
    }
  }

  console.log('Final redirect URL:', finalCheckoutUrl);
  console.log('Checkout domain check:', finalCheckoutUrl.includes(checkoutDomain) ? 'PASS' : 'FAIL');
  console.log('Executing redirect via window.location.replace...');
  console.log('=== END REDIRECT DEBUG ===');

  // Use window.location.replace for a cleaner redirect (no browser history entry)
  window.location.replace(finalCheckoutUrl);
}
