import { useState, useEffect } from 'react';

export interface Review {
  id: string;
  rating: number;
  title: string | null;
  body: string;
  reviewer: {
    name: string;
    email?: string;
  };
  verified: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface ReviewStats {
  averageRating: number;
  totalReviews: number;
  ratingDistribution: {
    5: number;
    4: number;
    3: number;
    2: number;
    1: number;
  };
}

export interface ProductReviews {
  productHandle: string;
  productTitle: string;
  reviews: Review[];
  stats: ReviewStats;
}

interface ReviewsData {
  lastUpdated: string;
  totalReviews: number;
  products: Record<string, ProductReviews>;
}

/**
 * Hook to load cached reviews for a specific product
 */
export function useProductReviews(productHandle: string) {
  const [reviews, setReviews] = useState<Review[]>([]);
  const [stats, setStats] = useState<ReviewStats>({
    averageRating: 0,
    totalReviews: 0,
    ratingDistribution: { 5: 0, 4: 0, 3: 0, 2: 0, 1: 0 }
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    if (!productHandle) {
      setLoading(false);
      return;
    }

    async function loadReviews() {
      try {
        setLoading(true);

        // Fetch cached reviews from public directory
        const response = await fetch('/reviews.json');

        if (!response.ok) {
          throw new Error('Failed to load reviews');
        }

        const data: ReviewsData = await response.json();
        const productReviews = data.products[productHandle];

        if (productReviews) {
          setReviews(productReviews.reviews);
          setStats(productReviews.stats);
        } else {
          // No reviews for this product
          setReviews([]);
          setStats({
            averageRating: 0,
            totalReviews: 0,
            ratingDistribution: { 5: 0, 4: 0, 3: 0, 2: 0, 1: 0 }
          });
        }

        setError(null);
      } catch (err) {
        console.error('Error loading reviews:', err);
        setError(err instanceof Error ? err : new Error('Failed to load reviews'));
        setReviews([]);
      } finally {
        setLoading(false);
      }
    }

    loadReviews();
  }, [productHandle]);

  return { reviews, stats, loading, error };
}
