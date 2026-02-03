import { Product } from '@/data/products';

/**
 * Convert Shopify HTML to clean formatted text with preserved structure
 */
function formatShopifyHtml(html: string): string {
  if (!html) return '';

  // Replace common HTML elements with text equivalents
  let formatted = html
    // Convert div and paragraph closing/opening pairs to double line breaks
    .replace(/<\/(p|div)>\s*<(p|div)[^>]*>/gi, '\n\n')
    // Convert opening paragraphs and divs (remove them but they'll create structure)
    .replace(/<(p|div)[^>]*>/gi, '')
    // Convert closing paragraphs and divs to double line breaks
    .replace(/<\/(p|div)>/gi, '\n\n')
    // Convert line breaks
    .replace(/<br\s*\/?>/gi, '\n')
    // Convert lists
    .replace(/<li[^>]*>/gi, '• ')
    .replace(/<\/li>/gi, '\n')
    .replace(/<\/?[uo]l[^>]*>/gi, '\n')
    // Convert headings
    .replace(/<\/h[1-6]>/gi, '\n\n')
    .replace(/<h[1-6][^>]*>/gi, '')
    // Remove strong/em/span tags but keep content
    .replace(/<\/?(?:strong|em|b|i|span|a)[^>]*>/gi, '')
    // Remove all other HTML tags
    .replace(/<[^>]*>/g, '')
    // Decode HTML entities
    .replace(/&nbsp;/g, ' ')
    .replace(/&amp;/g, '&')
    .replace(/&lt;/g, '<')
    .replace(/&gt;/g, '>')
    .replace(/&quot;/g, '"')
    .replace(/&#39;/g, "'")
    .replace(/&#x27;/g, "'")
    // Clean up excessive whitespace but preserve paragraph breaks
    .replace(/[ \t]+/g, ' ')  // Multiple spaces/tabs to single space
    .replace(/\n\s+\n/g, '\n\n')  // Clean up spaces between line breaks
    .replace(/\n{3,}/g, '\n\n')  // Max 2 consecutive line breaks
    .trim();

  return formatted;
}

/**
 * Transform Shopify product data into our app's Product format
 */
export function transformShopifyProduct(shopifyProduct: any): Product & { shopifyVariantId?: string; descriptionHtml?: string } {
  const firstVariant = shopifyProduct.variants?.edges?.[0]?.node;
  const firstImage = shopifyProduct.images?.edges?.[0]?.node;

  // Determine category first to decide how to handle description
  const category = getCategory(shopifyProduct.productType, shopifyProduct.tags);

  // For merch products, preserve HTML (especially tables for size charts)
  // For other products, convert to plain text
  let formattedDescription = '';
  let descriptionHtml = '';

  if (category === 'merch' && shopifyProduct.descriptionHtml) {
    // Keep raw HTML for merch products
    descriptionHtml = shopifyProduct.descriptionHtml;
    formattedDescription = shopifyProduct.description || '';
  } else if (shopifyProduct.descriptionHtml) {
    // Convert HTML to formatted text for non-merch products
    formattedDescription = formatShopifyHtml(shopifyProduct.descriptionHtml);
  } else if (shopifyProduct.description) {
    formattedDescription = shopifyProduct.description;
  }

  return {
    id: shopifyProduct.id,
    handle: shopifyProduct.handle,
    title: shopifyProduct.title,
    description: formattedDescription,
    longDescription: formattedDescription,
    descriptionHtml: descriptionHtml || undefined, // Only set for merch
    price: parseFloat(firstVariant?.price?.amount || '0'),
    compareAtPrice: firstVariant?.compareAtPrice ? parseFloat(firstVariant.compareAtPrice.amount) : undefined,
    images: shopifyProduct.images?.edges?.map((edge: any) => edge.node.url) || [firstImage?.url || '/placeholder.svg'],
    category,
    heatLevel: getHeatLevel(shopifyProduct.tags),
    featured: shopifyProduct.tags?.includes('featured'),
    bestSeller: shopifyProduct.tags?.includes('best-seller'),
    new: shopifyProduct.tags?.includes('new'),
    shopifyVariantId: firstVariant?.id,
    tags: shopifyProduct.tags || [],
    variants: shopifyProduct.variants?.edges?.map((edge: any) => ({
      id: edge.node.id,
      title: edge.node.title,
      price: parseFloat(edge.node.price.amount),
      image: edge.node.image?.url, // Variant-specific image
      selectedOptions: edge.node.selectedOptions, // Array of {name, value} pairs like [{name: "Color", value: "Black"}]
    })),
  };
}

/**
 * Transform Shopify collection data
 */
export function transformShopifyCollection(shopifyCollection: any) {
  const products = shopifyCollection.products?.edges?.map((edge: any) =>
    transformShopifyProduct(edge.node)
  ) || [];

  // Format collection description same as product descriptions
  let formattedDescription = '';
  if (shopifyCollection.descriptionHtml) {
    formattedDescription = formatShopifyHtml(shopifyCollection.descriptionHtml);
  } else if (shopifyCollection.description) {
    formattedDescription = shopifyCollection.description;
  }

  return {
    id: shopifyCollection.id,
    handle: shopifyCollection.handle,
    title: shopifyCollection.title,
    description: formattedDescription,
    image: shopifyCollection.image?.url || '/placeholder.svg',
    products,
  };
}

/**
 * Determine product category from Shopify data
 */
function getCategory(productType: string, tags: string[] = []): 'hot-sauce' | 'rub' | 'bundle' | 'merch' {
  const type = productType?.toLowerCase() || '';
  const tagString = tags.join(' ').toLowerCase();

  // Check tags and product type for category indicators
  // Check merch first (apparel, accessories, etc.)
  if (
    type.includes('merch') ||
    type.includes('apparel') ||
    type.includes('clothing') ||
    type.includes('accessory') ||
    tagString.includes('merch') ||
    tagString.includes('apparel') ||
    tagString.includes('clothing') ||
    tagString.includes('hat') ||
    tagString.includes('shirt') ||
    tagString.includes('accessory')
  ) {
    return 'merch';
  }

  if (type.includes('bundle') || tagString.includes('bundle')) {
    return 'bundle';
  }

  if (type.includes('rub') || tagString.includes('rub') || tagString.includes('bbq')) {
    return 'rub';
  }

  // Check for hot sauce indicators (handles "Hot Sauces", "hot-sauce", "sauce", etc.)
  if (type.includes('sauce') || tagString.includes('sauce') || tagString.includes('hot')) {
    return 'hot-sauce';
  }

  // Default to merch if nothing else matches (safer than defaulting to hot-sauce)
  return 'merch';
}

/**
 * Determine heat level from Shopify tags
 * Returns undefined for non-food items (merch)
 */
function getHeatLevel(tags: string[] = []): 1 | 2 | 3 | 4 | 5 | undefined {
  const tagString = tags.join(' ').toLowerCase();

  // Look for explicit heat level tags first
  if (tagString.includes('heat-5') || tagString.includes('heat5')) return 5;
  if (tagString.includes('heat-4') || tagString.includes('heat4')) return 4;
  if (tagString.includes('heat-3') || tagString.includes('heat3')) return 3;
  if (tagString.includes('heat-2') || tagString.includes('heat2')) return 2;
  if (tagString.includes('heat-1') || tagString.includes('heat1')) return 1;

  // Fallback to descriptive terms only if it's clearly a food product
  if (tagString.includes('extreme')) return 5;
  if (tagString.includes('very hot')) return 4;
  if (tagString.includes('medium hot')) return 3;
  if (tagString.includes('mild')) return 2;

  // Return undefined for products without heat level (like merch)
  return undefined;
}
