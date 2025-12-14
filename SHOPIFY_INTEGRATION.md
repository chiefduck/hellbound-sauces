# Shopify Headless Storefront Integration

This document explains how the Shopify Storefront API integration works and how to use it in the application.

## Overview

The integration is **frontend-only** using the Shopify Storefront API (GraphQL):
- Products are fetched from Shopify
- Cart is managed client-side
- Checkout redirects to Shopify's hosted checkout page
- No backend or serverless functions required

## Files Created

### Core API Files

1. **`src/lib/shopify.ts`**
   - Base Shopify GraphQL fetch helper
   - Handles authentication with Storefront API token
   - All API calls go through this function

2. **`src/lib/shopifyProducts.ts`**
   - Product and collection queries
   - Functions: `getProducts()`, `getProductByHandle()`, `getCollectionByHandle()`, `getAllCollections()`

3. **`src/lib/shopifyCheckout.ts`**
   - Checkout creation and redirect logic
   - `createCheckout(items)` - Creates a Shopify checkout session
   - `redirectToCheckout(url)` - Redirects browser to Shopify checkout

4. **`src/lib/shopifyTransform.ts`**
   - Transforms Shopify API responses into app's Product format
   - Maps Shopify product types and tags to app categories
   - Extracts heat levels from product tags

### React Hooks

5. **`src/hooks/useShopifyProducts.ts`**
   - `useShopifyProducts()` - Fetch all products
   - `useShopifyProduct(handle)` - Fetch single product by handle
   - `useShopifyCollection(handle)` - Fetch collection with products

### Updated Files

6. **`src/contexts/CartContext.tsx`**
   - Added `variantId` support to cart items
   - Added `proceedToCheckout()` function
   - Added `isCheckingOut` state
   - Now passes Shopify variant IDs through to checkout

7. **`src/components/cart/CartDrawer.tsx`**
   - Connected checkout button to `proceedToCheckout()`
   - Shows loading state during checkout creation

8. **`src/data/products.ts`**
   - Added `shopifyVariantId` field to Product interface

## Environment Variables

Already configured in `.env`:

```env
VITE_SHOPIFY_DOMAIN=hellboundsauces.myshopify.com
VITE_SHOPIFY_STOREFRONT_TOKEN=shpat_XXXXXXXXXXXXXXXX
VITE_SHOPIFY_API_VERSION=2024-01
```

## Usage Examples

### Fetch Products in a Component

```tsx
import { useShopifyProducts } from '@/hooks/useShopifyProducts';

function ProductsPage() {
  const { products, loading, error } = useShopifyProducts();

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error.message}</div>;

  return (
    <div>
      {products.map(product => (
        <ProductCard key={product.id} product={product} />
      ))}
    </div>
  );
}
```

### Fetch Single Product

```tsx
import { useShopifyProduct } from '@/hooks/useShopifyProducts';

function ProductPage({ handle }) {
  const { product, loading, error } = useShopifyProduct(handle);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error.message}</div>;
  if (!product) return <div>Product not found</div>;

  return <ProductDetails product={product} />;
}
```

### Add Product to Cart

```tsx
import { useCart } from '@/contexts/CartContext';

function AddToCartButton({ product }) {
  const { addItem } = useCart();

  return (
    <button onClick={() => addItem(product, 1)}>
      Add to Cart
    </button>
  );
}
```

The cart will automatically use the `product.shopifyVariantId` for checkout.

### Proceed to Checkout

The checkout button is already configured in `CartDrawer`. When clicked:
1. Cart items are mapped to Shopify line items
2. A checkout session is created via Shopify API
3. User is redirected to Shopify's hosted checkout page
4. Order is completed on Shopify
5. Order appears in Shopify Admin

## Product Data Requirements

For checkout to work, products must have a `shopifyVariantId`:

```typescript
const product = {
  // ... other fields
  shopifyVariantId: "gid://shopify/ProductVariant/1234567890"
};
```

### Syncing Shopify Products

To sync products from Shopify, you can:

**Option 1: Replace static products with Shopify data**

Update `src/data/products.ts` to fetch from Shopify:

```typescript
import { getProducts } from '@/lib/shopifyProducts';
import { transformShopifyProduct } from '@/lib/shopifyTransform';

export async function loadProducts() {
  const response = await getProducts();
  return response.data.products.edges.map(edge =>
    transformShopifyProduct(edge.node)
  );
}
```

**Option 2: Use Shopify hooks directly in components**

Replace static product imports with the `useShopifyProducts()` hook.

## Product Tags for Categorization

The integration uses Shopify product tags to determine:

### Category
- Tags: `bundle` → category: 'bundle'
- Tags: `rub`, `bbq` → category: 'rub'
- Default → category: 'hot-sauce'

### Heat Level
- Tags: `heat-5`, `extreme` → heatLevel: 5
- Tags: `heat-4`, `hot` → heatLevel: 4
- Tags: `heat-3`, `medium` → heatLevel: 3
- Tags: `heat-2`, `mild` → heatLevel: 2
- Default → heatLevel: 1

### Featured/Special
- Tag: `featured` → featured: true
- Tag: `best-seller` → bestSeller: true
- Tag: `new` → new: true

**Recommendation:** Add these tags to your Shopify products for proper categorization.

## Testing the Integration

### 1. Test Product Fetching

Create a test page:

```tsx
import { useShopifyProducts } from '@/hooks/useShopifyProducts';

export default function TestPage() {
  const { products, loading, error } = useShopifyProducts();

  return (
    <div>
      <h1>Shopify Products Test</h1>
      {loading && <p>Loading...</p>}
      {error && <p>Error: {error.message}</p>}
      {products && (
        <div>
          <p>Found {products.length} products</p>
          <pre>{JSON.stringify(products, null, 2)}</pre>
        </div>
      )}
    </div>
  );
}
```

### 2. Test Cart & Checkout

1. Add a product to cart (must have `shopifyVariantId`)
2. Open cart drawer
3. Click "Proceed to Checkout"
4. Should redirect to Shopify checkout page
5. Complete purchase
6. Verify order appears in Shopify Admin

## Troubleshooting

### "Shopify Storefront API request failed"

- Check environment variables are set correctly
- Verify Storefront API token is valid
- Ensure `VITE_SHOPIFY_DOMAIN` doesn't include `https://`

### "Failed to create checkout"

- Ensure cart items have valid `variantId`
- Check that variant IDs are full Shopify GIDs (e.g., `gid://shopify/ProductVariant/123`)
- Verify products are published to the sales channel

### Products not loading

- Check browser console for errors
- Verify API token has correct permissions
- Ensure products are published in Shopify

## Next Steps

1. **Update existing pages to use Shopify data:**
   - Replace static product imports with `useShopifyProducts()`
   - Update `CollectionPage` to use `useShopifyCollection()`
   - Update `ProductPage` to use `useShopifyProduct()`

2. **Add Shopify variant IDs to all products:**
   - Fetch products from Shopify Admin
   - Map handles to variant IDs
   - Update product data

3. **Test complete checkout flow:**
   - Add items to cart
   - Proceed to checkout
   - Complete test order
   - Verify in Shopify Admin

4. **Optional enhancements:**
   - Add inventory tracking
   - Display "Out of Stock" status
   - Add product variant selection (size, color, etc.)
   - Implement collections filtering

## API Reference

### shopifyFetch(query, variables)

Base GraphQL fetch function.

**Parameters:**
- `query` (string): GraphQL query/mutation
- `variables` (object): Query variables

**Returns:** Promise with Shopify API response

### getProducts()

Fetch all products (up to 50).

**Returns:** Promise with products data

### getProductByHandle(handle)

Fetch single product by handle.

**Parameters:**
- `handle` (string): Product handle

**Returns:** Promise with product data

### createCheckout(items)

Create Shopify checkout session.

**Parameters:**
- `items` (CartItem[]): Array of cart items with variantId and quantity

**Returns:** Promise with checkout object containing `webUrl`

## Support

For issues with:
- Shopify API: See [Storefront API docs](https://shopify.dev/api/storefront)
- Integration: Check browser console for errors
- Checkout flow: Verify products are published and have valid variant IDs
