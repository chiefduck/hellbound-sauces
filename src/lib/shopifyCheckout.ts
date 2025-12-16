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

  // FIXED: Removed custom checkout domain rewriting to ensure Shopify canonical URLs are preserved.
  // Use the checkout URL exactly as Shopify returns it - no domain rewriting or manipulation.
  const checkoutUrl = response.data.cartCreate.cart.checkoutUrl;

  return {
    id: response.data.cartCreate.cart.id,
    webUrl: checkoutUrl,
    totalQuantity: response.data.cartCreate.cart.totalQuantity,
    totalAmount: response.data.cartCreate.cart.cost.totalAmount,
  };
}

export function redirectToCheckout(checkoutUrl: string) {
  // FIXED: Removed custom checkout domain rewriting to ensure Shopify canonical URLs are preserved.
  // Redirect directly to the Shopify checkout URL without any modifications.
  window.location.href = checkoutUrl;
}
