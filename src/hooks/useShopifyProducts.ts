import { useState, useEffect } from 'react';
import { getProducts, getProductByHandle, getCollectionByHandle } from '@/lib/shopifyProducts';
import { transformShopifyProduct, transformShopifyCollection } from '@/lib/shopifyTransform';
import { Product, getProductByHandle as getLocalProduct, getCollectionByHandle as getLocalCollection } from '@/data/products';

/**
 * Hook to fetch all products from Shopify
 */
export function useShopifyProducts() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    async function fetchProducts() {
      try {
        setLoading(true);
        const response = await getProducts();
        const shopifyProducts = response.data?.products?.edges || [];
        const transformed = shopifyProducts.map((edge: any) =>
          transformShopifyProduct(edge.node)
        );
        console.log(`🔍 Fetched ${transformed.length} products from Shopify`);
        console.log('Products:', transformed.map(p => ({ title: p.title, category: p.category })));
        setProducts(transformed);
        setError(null);
      } catch (err) {
        setError(err instanceof Error ? err : new Error('Failed to fetch products'));
      } finally {
        setLoading(false);
      }
    }

    fetchProducts();
  }, []);

  return { products, loading, error };
}

/**
 * Hook to fetch a single product from Shopify.
 * Seeds initial state from local data so the page renders content immediately
 * (prevents Soft 404 signals when Google crawls before the Shopify API responds).
 */
export function useShopifyProduct(handle: string) {
  const localFallback = handle ? (getLocalProduct(handle) ?? null) : null;
  const [product, setProduct] = useState<Product | null>(localFallback);
  const [loading, setLoading] = useState(!localFallback);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    async function fetchProduct() {
      if (!handle) {
        setLoading(false);
        return;
      }

      try {
        if (!localFallback) setLoading(true);
        const response = await getProductByHandle(handle);
        if (response.data?.product) {
          const transformed = transformShopifyProduct(response.data.product);
          setProduct(transformed);
        } else if (!localFallback) {
          setProduct(null);
        }
        setError(null);
      } catch (err) {
        if (!localFallback) setError(err instanceof Error ? err : new Error('Failed to fetch product'));
      } finally {
        setLoading(false);
      }
    }

    fetchProduct();
  }, [handle]);

  return { product, loading, error };
}

/**
 * Hook to fetch a collection from Shopify.
 * Seeds initial state from local data so the page renders content immediately.
 */
export function useShopifyCollection(handle: string) {
  const localFallback = handle ? (getLocalCollection(handle) ?? null) : null;
  const [collection, setCollection] = useState<any>(localFallback);
  const [loading, setLoading] = useState(!localFallback);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    async function fetchCollection() {
      if (!handle) {
        setLoading(false);
        return;
      }

      try {
        if (!localFallback) setLoading(true);
        const response = await getCollectionByHandle(handle);

        if (response.data?.collection) {
          const transformed = transformShopifyCollection(response.data.collection);
          setCollection(transformed);
        } else if (!localFallback) {
          setCollection(null);
        }
        setError(null);
      } catch (err) {
        console.error('Error fetching collection:', err);
        if (!localFallback) setError(err instanceof Error ? err : new Error('Failed to fetch collection'));
      } finally {
        setLoading(false);
      }
    }

    fetchCollection();
  }, [handle]);

  return { collection, loading, error };
}
