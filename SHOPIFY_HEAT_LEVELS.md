# Shopify Heat Level Tags Configuration

## Overview
The Heat Guide page dynamically pulls products from Shopify and filters them by heat level. For this to work correctly, each hot sauce and BBQ rub product in Shopify must have a heat level tag applied.

## Required Tags

### Heat Level Tags
Add ONE of these tags to each product in Shopify Admin:

- `heat-1` - Mild (0-5,000 SHU)
- `heat-2` - Medium (5,000-50,000 SHU)
- `heat-3` - Hot (50,000-350,000 SHU)
- `heat-4` - Extra Hot (350,000-1,000,000 SHU)
- `heat-5` - Extreme (1,000,000+ SHU)

### Alternative Tag Formats (also supported)
- `heat1`, `heat2`, `heat3`, `heat4`, `heat5` (without hyphen)
- Descriptive terms: `mild`, `medium hot`, `very hot`, `extreme`

## Product Heat Level Recommendations

### Series 1 Hot Sauces ($12.00) - Heat Level 2 (Medium)
- **Sweet Heat** → `heat-2`
  - Balanced sweet and spicy
  - Perfect for everyday use

- **Cucumber Madness** → `heat-2`
  - Refreshing cucumber base with moderate heat
  - Serrano and jalapeño peppers

- **Pineapple-Mango** → `heat-2`
  - Tropical fruit with mild-medium heat
  - Great for grilled chicken and fish

### Series 2 Hot Sauces ($15.00) - Heat Level 3 (Hot)
- **Wide Awake** → `heat-3`
  - Espresso-infused hot sauce
  - Noticeable kick with complex flavors

- **Leprechaun Lava** → `heat-3`
  - Green sauce with vibrant heat
  - Good balance of flavor and spice

- **Clove Keeper** → `heat-3`
  - Aromatic spices with warming heat
  - Complex flavor profile

### Series 3 Hot Sauces ($16.00) - Heat Level 3-4
- **Sapphire Dragon** → `heat-4`
  - Dragon fruit infused
  - Premium heat level for serious enthusiasts

- **Blazin' Bee Mustard** → `heat-3`
  - Honey mustard with fiery twist
  - Hot but not overwhelming

- **Bangkok Burn** → `heat-4`
  - Thai-inspired intense heat
  - Bold spice profile

### BBQ Rubs ($15.00) - Heat Level 2 (Medium)
- **Beekeepers Blend** → `heat-2`
  - Sweet and smoky with gentle heat
  - Honey powder and paprika base

- **Aztec Gold** → `heat-2`
  - Earthy Southwest flavor
  - Moderate chili heat

- **Wildwood Maple** → `heat-2`
  - Maple sweetness with black pepper
  - Mild-medium heat level

### Extreme Heat Products (if applicable) - Heat Level 5
- **Garlic Reaper** → `heat-5`
  - Carolina Reaper based
  - Extreme heat warning required

- Any other Reaper/Scorpion products → `heat-5`

## How to Add Tags in Shopify

1. Log into Shopify Admin
2. Go to **Products**
3. Click on a product to edit
4. Scroll to the **Tags** section
5. Add the appropriate heat level tag (e.g., `heat-2`)
6. Add any other relevant tags:
   - `featured` - Shows on homepage
   - `best-seller` - Displays best seller badge
   - `new` - Displays new product badge
7. Click **Save**

## How the System Works

### Product Transformation
1. Products are fetched from Shopify via GraphQL
2. The `transformShopifyProduct` function reads product tags
3. The `getHeatLevel` function looks for `heat-1` through `heat-5` tags
4. If no explicit tag is found, it falls back to descriptive terms
5. Products without heat tags show as `undefined` (e.g., merchandise)

### Heat Guide Quiz
1. User answers 4 questions about heat tolerance
2. System calculates heat level (1-5) based on answers
3. Filters Shopify products by matching `heatLevel` property
4. Displays up to 3 recommended products for that level

### Heat Levels Display
Each heat level section shows:
- Only products tagged with that specific heat level
- Only hot sauces (filtered by `category === 'hot-sauce'`)
- Real product images from Shopify
- Live pricing and availability

## Verification Checklist

After adding tags, verify:
- [ ] All hot sauces have a heat level tag
- [ ] All BBQ rubs have a heat level tag
- [ ] Tags use the format `heat-1`, `heat-2`, etc.
- [ ] Products appear in correct heat level sections
- [ ] Quiz recommendations show relevant products
- [ ] Product images load correctly (not placeholders)

## Testing

1. Visit `/heat-guide` on your website
2. Take the heat quiz and verify recommended products appear
3. Scroll to "Heat Levels Explained" section
4. Verify products appear in each heat level category
5. Check that product images, titles, and prices are correct

## Troubleshooting

**Products not showing in Heat Guide:**
- Verify product has `heat-1` through `heat-5` tag in Shopify
- Check that product is published and available
- Ensure product category is correctly set (Product Type or tags)

**Wrong heat level appearing:**
- Check for multiple conflicting heat tags
- Remove any old/incorrect heat tags
- The system uses the highest heat level if multiple tags exist

**Placeholder images showing:**
- Ensure product has images uploaded in Shopify
- Check that images are published
- Verify image URLs are accessible

## Support

For technical issues with the heat guide integration, check:
- `/src/pages/HeatGuidePage.tsx` - Main heat guide component
- `/src/lib/shopifyTransform.ts` - Heat level tag parsing
- `/src/hooks/useShopifyProducts.ts` - Shopify data fetching
