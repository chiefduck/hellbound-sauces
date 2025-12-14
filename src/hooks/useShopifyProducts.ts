import { useState, useEffect } from 'react';
import { getProducts, getProductByHandle, getCollectionByHandle } from '@/lib/shopifyProducts';
import { transformShopifyProduct, transformShopifyCollection } from '@/lib/shopifyTransform';
import { Product } from '@/data/products';

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
 * Hook to fetch a single product from Shopify
 */
export function useShopifyProduct(handle: string) {
  const [product, setProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    async function fetchProduct() {
      if (!handle) {
        setLoading(false);
        return;
      }

      try {
        setLoading(true);
        const response = await getProductByHandle(handle);
        if (response.data?.product) {
          const transformed = transformShopifyProduct(response.data.product);
          setProduct(transformed);
        } else {
          setProduct(null);
        }
        setError(null);
      } catch (err) {
        setError(err instanceof Error ? err : new Error('Failed to fetch product'));
      } finally {
        setLoading(false);
      }
    }

    fetchProduct();
  }, [handle]);

  return { product, loading, error };
}

/**
 * Hook to fetch a collection from Shopify
 */
export function useShopifyCollection(handle: string) {
  const [collection, setCollection] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    async function fetchCollection() {
      if (!handle) {
        setLoading(false);
        return;
      }

      try {
        setLoading(true);
        console.log('Fetching collection with handle:', handle);
        const response = await getCollectionByHandle(handle);
        console.log('Collection response:', response);

        if (response.data?.collection) {
          const transformed = transformShopifyCollection(response.data.collection);
          console.log('Transformed collection:', transformed);
          setCollection(transformed);
        } else {
          console.log('No collection found for handle:', handle);
          setCollection(null);
        }
        setError(null);
      } catch (err) {
        console.error('Error fetching collection:', err);
        setError(err instanceof Error ? err : new Error('Failed to fetch collection'));
      } finally {
        setLoading(false);
      }
    }

    fetchCollection();
  }, [handle]);

  return { collection, loading, error };
}
