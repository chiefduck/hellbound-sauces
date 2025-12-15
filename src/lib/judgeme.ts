/**
 * Judge.me Public API Integration
 * Frontend-only review fetching
 */

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
