# Shopify Storefront API Setup Guide

## Important: You need a Storefront API Access Token (NOT the Admin API secret key)

The Storefront API uses a **public access token** that's safe to use in frontend code.

---

## Step 1: Create a Storefront API Access Token

### Option A: Using a Custom App (Recommended)

1. **Go to Shopify Admin**
   - Navigate to: `Settings` → `Apps and sales channels` → `Develop apps`

2. **Create a new app** (if you don't have one)
   - Click "Create an app"
   - Name it something like "HellBound Website"
   - Click "Create app"

3. **Configure Storefront API access**
   - Click on your app
   - Go to the "Configuration" tab
   - Scroll to "Storefront API scopes"
   - Enable these scopes:
     - ✅ `unauthenticated_read_product_listings`
     - ✅ `unauthenticated_read_product_inventory`
     - ✅ `unauthenticated_read_product_pickup_locations`
     - ✅ `unauthenticated_write_checkouts`
     - ✅ `unauthenticated_read_checkouts`

4. **Save and install the app**
   - Click "Save"
   - Go to "API credentials" tab
   - Click "Install app"

5. **Get your Storefront API Access Token**
   - In the "API credentials" tab
   - Under "Storefront API access token"
   - Click "Reveal token once" or copy the token
   - It will look like: `shpat_xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx` or just a random string

---

### Option B: Using a Sales Channel (Alternative)

1. Go to Shopify Admin
2. Navigate to `Settings` → `Apps and sales channels`
3. Click "Develop apps" (or go to a specific sales channel)
4. Find or create a Storefront API access token

---

## Step 2: Update Environment Variables

Create or update `.env.local` file in your project root:

```env
VITE_SHOPIFY_STORE_DOMAIN=hellboundsauces.myshopify.com
VITE_SHOPIFY_STOREFRONT_TOKEN=your_storefront_access_token_here
```

**IMPORTANT:**
- `VITE_SHOPIFY_STORE_DOMAIN` should NOT include `https://`
- Use ONLY the myshopify.com domain (not custom domain)
- `VITE_SHOPIFY_STOREFRONT_TOKEN` is the **Storefront API access token** from Step 1
- API version is hardcoded to `2024-10` (latest stable version)

---

## Step 3: Verify Products are Published

1. Go to Shopify Admin → Products
2. For each product, ensure it's published to the **sales channel** that has Storefront API access
3. Check "Product availability" section when editing a product

---

## Step 4: Test the Integration

1. **Stop your dev server** (Ctrl+C)
2. **Restart the dev server** to load new env variables:
   ```bash
   npm run dev
   ```

3. **Open browser console** (F12) and check for errors

4. **Test products are loading:**
   - Navigate to your collections page
   - Check browser Network tab for GraphQL requests to Shopify
   - Look for responses with product data

---

## Troubleshooting

### "Storefront API request failed" or 401 Unauthorized

**Issue:** Wrong token or permissions

**Fix:**
- Double-check you're using the **Storefront API access token** (not Admin API key)
- Verify the token in Shopify Admin → Apps → Your App → API credentials
- Ensure all required scopes are enabled
- Make sure the app is installed

### Products not loading / Empty response

**Issue:** Products not published to the sales channel

**Fix:**
- Go to each product in Shopify Admin
- Edit product
- Scroll to "Product availability"
- Ensure it's available on the sales channel with Storefront API access
- Or make it available on "Online Store" channel

### CORS errors

**Issue:** Domain restrictions

**Fix:**
- Storefront API should work from any domain
- If you see CORS errors, check that you're using the Storefront API (not Admin API)
- Verify the domain in your .env doesn't include protocol

### Network request shows 404

**Issue:** Wrong domain or API version

**Fix:**
- Verify `VITE_SHOPIFY_DOMAIN=hellboundsauces.myshopify.com` (no https://)
- Check API version is valid (2024-01 is current)
- Ensure the domain is correct in Shopify settings

---

## Checking Token Type

### ✅ Storefront API Access Token (CORRECT)
- Typically starts with random characters
- Created in App → API credentials → Storefront API
- Safe to use in frontend code
- Used for reading products and creating checkouts

### ❌ Admin API Access Token (WRONG - Don't use)
- Created in App → API credentials → Admin API
- Used for backend/server operations only
- Should NEVER be exposed in frontend code
- Has broader permissions

---

## Example .env.local File

```env
# Shopify Configuration
VITE_SHOPIFY_STORE_DOMAIN=hellboundsauces.myshopify.com
VITE_SHOPIFY_STOREFRONT_TOKEN=a1b2c3d4e5f6g7h8i9j0k1l2m3n4o5p6
```

---

## Quick Test

Once configured, you can test the integration by opening browser console and running:

```javascript
// This should log your Shopify config
console.log({
  domain: import.meta.env.VITE_SHOPIFY_STORE_DOMAIN,
  hasToken: !!import.meta.env.VITE_SHOPIFY_STOREFRONT_TOKEN
});
```

If `hasToken` is `false`, your environment variables aren't loading correctly.

---

## Need Help?

1. **Check Shopify's documentation:** https://shopify.dev/docs/api/storefront
2. **Verify app installation:** Shopify Admin → Apps → Your App
3. **Test with GraphiQL:** Use Shopify's GraphiQL app to test queries with your token
4. **Check browser console** for detailed error messages
