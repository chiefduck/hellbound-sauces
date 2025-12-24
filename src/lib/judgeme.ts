/**
 * Judge.me Public API Integration
 * Frontend-only review fetching
 */

import judgemeReviewsData from '@/data/judgeme-reviews.json';

const JUDGEME_PUBLIC_TOKEN = import.meta.env.VITE_JUDGEME_PUBLIC_TOKEN;
const JUDGEME_SHOP_DOMAIN = import.meta.env.VITE_JUDGEME_SHOP_DOMAIN;

export interface JudgeMeReview {
  id: number;
  title: string;
  body: string;
  rating: number;
  reviewer: {
    name: string;
    email?: string;
  };
  verified: string; // "ok" if verified
  created_at: string;
  product_title?: string;
  product_handle?: string;
}

export interface JudgeMeResponse {
  reviews: JudgeMeReview[];
  current_page: number;
  per_page: number;
  total: number;
}

export interface CachedReview {
  id: string;
  productId: string;
  author: string;
  rating: number;
  title: string | null;
  content: string;
  date: string;
  verified: boolean;
  helpful: number;
}

/**
 * Fetch reviews from Judge.me Public API
 * @param limit - Number of reviews to fetch (default: 10)
 * @returns Promise with review data
 */
export async function getHomepageReviews(limit = 10): Promise<JudgeMeResponse> {
  if (!JUDGEME_PUBLIC_TOKEN || !JUDGEME_SHOP_DOMAIN) {
    console.warn('Judge.me credentials not configured. Using fallback reviews.');
    throw new Error('Judge.me credentials not configured');
  }

  const url = new URL('https://judge.me/api/v1/reviews');
  url.searchParams.append('shop_domain', JUDGEME_SHOP_DOMAIN);
  url.searchParams.append('api_token', JUDGEME_PUBLIC_TOKEN);
  url.searchParams.append('published', 'true');
  url.searchParams.append('per_page', limit.toString());

  console.log('Fetching Judge.me reviews:', url.toString());

  const res = await fetch(url.toString());

  if (!res.ok) {
    console.error('Failed to fetch Judge.me reviews:', res.status, res.statusText);
    throw new Error(`Failed to fetch Judge.me reviews: ${res.status}`);
  }

  const data = await res.json();
  console.log('Judge.me reviews fetched:', data);

  return data;
}

/**
 * Get cached Judge.me reviews for a specific product by handle
 * @param productHandle - The Shopify product handle (e.g., 'sweet-heat', 'pineapple-mango')
 * @returns Array of reviews for the product
 */
export function getProductReviews(productHandle: string): CachedReview[] {
  if (!judgemeReviewsData.reviews || judgemeReviewsData.reviews.length === 0) {
    return [];
  }

  // Match product handle with productId in reviews
  // Handle variations like 'sweet-heat' matching 'sweet-heat-hot-sauce'
  const normalizedHandle = productHandle.toLowerCase().replace(/-/g, '');

  return judgemeReviewsData.reviews.filter((review) => {
    const normalizedProductId = review.productId.toLowerCase().replace(/-/g, '');
    return normalizedProductId.includes(normalizedHandle) || normalizedHandle.includes(normalizedProductId);
  });
}

/**
 * Calculate average rating for a product
 * @param productHandle - The Shopify product handle
 * @returns Object with average rating and count
 */
export function getProductRatingStats(productHandle: string): { rating: number; count: number } {
  const reviews = getProductReviews(productHandle);

  if (reviews.length === 0) {
    return { rating: 0, count: 0 };
  }

  const totalRating = reviews.reduce((sum, review) => sum + review.rating, 0);
  const averageRating = totalRating / reviews.length;

  return {
    rating: Math.round(averageRating * 10) / 10, // Round to 1 decimal
    count: reviews.length
  };
}
