# Shopify Quick Start Guide

## Critical Changes Made

The integration has been updated to match your working implementation from your other site:

### ✅ Updated Items:

1. **API Version**: Changed from `2024-01` to `2024-10` (latest stable)
2. **Checkout Mutation**: Changed from `checkoutCreate` to `cartCreate` (newer API)
3. **Environment Variables**: Changed naming to match your other site:
   - ~~`VITE_SHOPIFY_DOMAIN`~~ → `VITE_SHOPIFY_STORE_DOMAIN`
   - ~~`VITE_SHOPIFY_API_VERSION`~~ → Hardcoded to `2024-10`
4. **Error Logging**: Added console logging for easier debugging

---

## Setup Instructions (5 Minutes)

### 1. Update Your .env.local File

**CRITICAL:** The environment variable names have changed!

```env
# OLD (remove these):
# VITE_SHOPIFY_DOMAIN=hellboundsauces.myshopify.com
# VITE_SHOPIFY_API_VERSION=2024-01

# NEW (use these):
VITE_SHOPIFY_STORE_DOMAIN=hellboundsauces.myshopify.com
VITE_SHOPIFY_STOREFRONT_TOKEN=your_storefront_access_token_here
```

**Important:**
- Remove old `VITE_SHOPIFY_DOMAIN` variable
- Rename to `VITE_SHOPIFY_STORE_DOMAIN`
- Remove `VITE_SHOPIFY_API_VERSION` (now hardcoded)

### 2. Get Your Storefront API Token

If you don't have it yet:

1. Shopify Admin → **Settings** → **Apps and sales channels** → **Develop apps**
2. Click your app (or create new one)
3. Go to **Configuration** tab
4. Enable **Storefront API** scopes:
   - ✅ `unauthenticated_read_product_listings`
   - ✅ `unauthenticated_read_product_inventory`
   - ✅ `unauthenticated_write_checkouts`
   - ✅ `unauthenticated_read_checkouts`
5. Click **Save**
6. Go to **API credentials** tab → Install app
7. Copy the **Storefront API access token**

### 3. Restart Dev Server

**MUST restart for environment variables to load:**

```bash
# Stop server (Ctrl+C)
npm run dev
```

### 4. Test the Integration

**Visit:** http://localhost:5173/shopify-test

This page will:
- ✅ Check if environment variables are set
- ✅ Test connection to Shopify
- ✅ Fetch products to verify everything works

**Expected Results:**
- Domain: `hellboundsauces.myshopify.com` ✅
- Storefront Token: `SET` ✅
- API Version: `2024-10` ✅

Click **"Test Shop Connection"** → Should see success message

Click **"Test Product Fetching"** → Should see your products

---

## Troubleshooting

### Issue: "Domain: NOT SET"

**Problem:** Environment variable not loading

**Fix:**
1. Check `.env.local` file exists in project root (not in `src/`)
2. Variable must be named `VITE_SHOPIFY_STORE_DOMAIN` (exact spelling)
3. **Restart dev server** after changing .env file

### Issue: "Storefront Token: NOT SET"

**Problem:** Token not configured

**Fix:**
1. Get token from Shopify Admin (see Step 2 above)
2. Add to `.env.local` as `VITE_SHOPIFY_STOREFRONT_TOKEN`
3. **Restart dev server**

### Issue: "401 Unauthorized" or "Storefront API request failed"

**Problem:** Wrong token or permissions

**Fix:**
1. Verify you're using **Storefront API access token** (NOT Admin API key)
2. Check token has correct scopes enabled
3. Ensure app is installed in Shopify

### Issue: "No products found"

**Problem:** Products not published

**Fix:**
1. Go to Shopify Admin → Products
2. Edit each product
3. Scroll to "Product availability"
4. Ensure published to "Online Store" sales channel

### Issue: Browser Console Shows Errors

**Check the console logs:**
- "Shopify API Request" → Shows connection attempt
- "Shopify API Error" → Shows API response errors
- "Shopify GraphQL Errors" → Shows query errors

**Common console errors:**
- `domain: undefined` → Variable name wrong in `.env.local`
- `401` → Wrong token or not installed
- `403` → Missing permissions/scopes
- `404` → Wrong domain

---

## Verify Integration is Working

### 1. Check Browser Console

Should see:
```
Shopify API Request: {
  url: "https://hellboundsauces.myshopify.com/api/2024-10/graphql.json",
  hasToken: true,
  domain: "hellboundsauces.myshopify.com"
}
```

### 2. Test Product Display

Products should appear on:
- http://localhost:5173/collections/all
- http://localhost:5173/collections/hot-sauces

### 3. Test Cart & Checkout

1. Add a product to cart
2. Open cart drawer
3. Click "Proceed to Checkout"
4. Should redirect to Shopify checkout page

---

## File Reference

### Changed Files:
- ✅ `src/lib/shopify.ts` - Updated API version and env variables
- ✅ `src/lib/shopifyCheckout.ts` - Changed to cartCreate mutation
- ✅ `src/vite-env.d.ts` - Added TypeScript types
- ✅ `.env.example` - Updated variable names
- ✅ `SHOPIFY_SETUP.md` - Updated documentation

### New Files:
- ✅ `src/pages/ShopifyTestPage.tsx` - Test page at `/shopify-test`
- ✅ `SHOPIFY_QUICK_START.md` - This file

---

## Next Steps After Integration Works

1. **Tag your products** in Shopify for better organization:
   - `featured` - Show on homepage
   - `best-seller` - Mark as bestseller
   - `new` - Mark as new product
   - `heat-1` through `heat-5` - Heat level indicators

2. **Update product pages** to load from Shopify:
   ```tsx
   import { useShopifyProducts } from '@/hooks/useShopifyProducts';

   const { products, loading, error } = useShopifyProducts();
   ```

3. **Test complete checkout flow**:
   - Add items to cart
   - Click checkout
   - Complete test order
   - Verify order in Shopify Admin

---

## Quick Debug Checklist

- [ ] `.env.local` file exists in project root
- [ ] Variable named `VITE_SHOPIFY_STORE_DOMAIN` (exact spelling)
- [ ] Variable named `VITE_SHOPIFY_STOREFRONT_TOKEN` (exact spelling)
- [ ] Dev server restarted after changing .env
- [ ] Token is Storefront API token (not Admin API)
- [ ] App is installed in Shopify
- [ ] Products published to Online Store
- [ ] Browser console shows connection attempt
- [ ] Test page shows all green checkmarks

---

## Support

**Test Page:** http://localhost:5173/shopify-test

**Documentation:**
- `SHOPIFY_SETUP.md` - Detailed setup guide
- `SHOPIFY_INTEGRATION.md` - Integration usage guide

**Still having issues?**
1. Check browser console for errors
2. Visit `/shopify-test` page to see exact error
3. Verify all checklist items above
