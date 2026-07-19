import { Product } from '@/data/products';

export const LOW_STOCK_THRESHOLD = 25;

type Variant = NonNullable<Product['variants']>[number];

/**
 * Sums quantityAvailable across variants that are still purchasable.
 * Returns undefined if no variant reports a quantity (Storefront API didn't return it).
 */
export function getTotalAvailableQuantity(variants?: Variant[]): number | undefined {
  if (!variants?.length) return undefined;

  const available = variants.filter(v => v.availableForSale !== false);
  if (available.some(v => v.quantityAvailable === undefined)) return undefined;

  return available.reduce((sum, v) => sum + (v.quantityAvailable ?? 0), 0);
}

// Merch is fulfilled print-on-demand and reports quantityAvailable=1 per size/color
// variant regardless of real supply, so the low-stock signal only applies to
// manufactured products (sauces, rubs, bundles) where inventory is actually tracked.
const LOW_STOCK_ELIGIBLE_CATEGORIES: Product['category'][] = ['hot-sauce', 'rub'];

export function isLowStock(
  quantity: number | undefined,
  hasAvailableVariants: boolean,
  category?: Product['category']
): boolean {
  if (category && !LOW_STOCK_ELIGIBLE_CATEGORIES.includes(category)) return false;
  return hasAvailableVariants && quantity !== undefined && quantity > 0 && quantity < LOW_STOCK_THRESHOLD;
}
