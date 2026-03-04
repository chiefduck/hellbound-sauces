import { useQuery } from '@tanstack/react-query';
import { getShopifyPolicy, ShopifyPolicy, ShopifyPolicyKey } from '@/lib/shopify';

export function useShopifyPolicy(key: ShopifyPolicyKey) {
  return useQuery<ShopifyPolicy | null>({
    queryKey: ['shopify-policy', key],
    queryFn: () => getShopifyPolicy(key),
    staleTime: 1000 * 60 * 5,
  });
}
