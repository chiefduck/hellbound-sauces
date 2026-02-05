// Test the category transformation logic
const productTypes = [
  { type: 'Hat', tags: ['merch'] },
  { type: 'T-Shirt', tags: ['Women\'s T-Shirt', 'Casual Wear'] },
  { type: 'Shoes', tags: ['Adjustable Straps', 'Beach Footwear'] },
  { type: 'Sweatshirt', tags: ['Cozy Apparel'] },
  { type: 'Home Decor', tags: ['Absorbent Cotton'] },
  { type: 'All Over Prints', tags: ['Athlete Fashion'] },
  { type: 'Mug', tags: ['Bottles & Tumblers'] },
  { type: 'Paper products', tags: ['Accessories'] },
  { type: 'Bags', tags: ['Fanny Pack'] },
  { type: 'Hot Sauce', tags: ['featured', 'Heat-2'] },
  { type: 'BBQ Rubs', tags: ['BBQ Rubs', 'best-seller'] },
];

function getCategory(productType, tags = []) {
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

  // Check for hot sauce indicators
  if (type.includes('sauce') || tagString.includes('sauce') || tagString.includes('hot')) {
    return 'hot-sauce';
  }

  // Default to merch if nothing else matches
  return 'merch';
}

console.log('Category Transformation Test:\n');
productTypes.forEach(({ type, tags }) => {
  const category = getCategory(type, tags);
  console.log(`Type: ${type.padEnd(20)} Tags: ${tags.slice(0, 2).join(', ').padEnd(40)} → Category: ${category}`);
});
