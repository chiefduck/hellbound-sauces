#!/usr/bin/env node

/**
 * Fetch all reviews from Judge.me API and save to static JSON file
 * Runs at build time on Netlify
 */

import fetch from 'node-fetch';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Environment variables (set in Netlify)
const JUDGEME_PRIVATE_TOKEN = process.env.VITE_JUDGEME_PRIVATE_TOKEN;
const JUDGEME_SHOP_DOMAIN = process.env.VITE_JUDGEME_SHOP_DOMAIN || '394ac6-2.myshopify.com';

if (!JUDGEME_PRIVATE_TOKEN) {
  console.error('❌ Error: VITE_JUDGEME_PRIVATE_TOKEN not found in environment variables');
  process.exit(1);
}

async function fetchAllReviews() {
  console.log('📡 Fetching reviews from Judge.me API...');

  try {
    const url = new URL('https://judge.me/api/v1/reviews');
    url.searchParams.append('shop_domain', JUDGEME_SHOP_DOMAIN);
    url.searchParams.append('api_token', JUDGEME_PRIVATE_TOKEN);
    url.searchParams.append('per_page', '250'); // Fetch up to 250 reviews per page

    console.log(`   Fetching from: ${url.origin}${url.pathname}`);

    const response = await fetch(url.toString());

    if (!response.ok) {
      throw new Error(`Judge.me API error: ${response.status} ${response.statusText}`);
    }

    const data = await response.json();
    const reviews = data.reviews || [];

    console.log(`✅ Fetched ${reviews.length} reviews`);

    // Organize reviews by product handle
    const reviewsByProduct = {};

    reviews.forEach(review => {
      const handle = review.product_handle;
      if (!handle) return;

      if (!reviewsByProduct[handle]) {
        reviewsByProduct[handle] = {
          productHandle: handle,
          productTitle: review.product_title,
          reviews: [],
          stats: {
            averageRating: 0,
            totalReviews: 0,
            ratingDistribution: { 5: 0, 4: 0, 3: 0, 2: 0, 1: 0 }
          }
        };
      }

      reviewsByProduct[handle].reviews.push({
        id: review.id,
        rating: review.rating,
        title: review.title,
        body: review.body,
        reviewer: {
          name: review.reviewer?.name || 'Anonymous',
          email: review.reviewer?.email
        },
        verified: review.verified === 'yes',
        createdAt: review.created_at,
        updatedAt: review.updated_at
      });
    });

    // Calculate stats for each product
    Object.values(reviewsByProduct).forEach(productReviews => {
      const reviews = productReviews.reviews;
      const totalReviews = reviews.length;

      if (totalReviews === 0) return;

      const totalRating = reviews.reduce((sum, r) => sum + r.rating, 0);
      const averageRating = Math.round((totalRating / totalReviews) * 10) / 10;

      const ratingDistribution = { 5: 0, 4: 0, 3: 0, 2: 0, 1: 0 };
      reviews.forEach(r => {
        ratingDistribution[r.rating] = (ratingDistribution[r.rating] || 0) + 1;
      });

      productReviews.stats = {
        averageRating,
        totalReviews,
        ratingDistribution
      };

      // Sort reviews by date (newest first)
      productReviews.reviews.sort((a, b) =>
        new Date(b.createdAt) - new Date(a.createdAt)
      );
    });

    // Save to public directory
    const outputPath = path.join(__dirname, '../public/reviews.json');
    fs.mkdirSync(path.dirname(outputPath), { recursive: true });
    fs.writeFileSync(outputPath, JSON.stringify({
      lastUpdated: new Date().toISOString(),
      totalReviews: reviews.length,
      products: reviewsByProduct
    }, null, 2));

    console.log(`💾 Saved reviews to: ${outputPath}`);
    console.log(`📊 Summary:`);
    console.log(`   - Total reviews: ${reviews.length}`);
    console.log(`   - Products with reviews: ${Object.keys(reviewsByProduct).length}`);

    // Log product breakdown
    Object.entries(reviewsByProduct).forEach(([handle, data]) => {
      console.log(`   - ${data.productTitle}: ${data.stats.totalReviews} reviews (avg: ${data.stats.averageRating}★)`);
    });

  } catch (error) {
    console.error('❌ Error fetching reviews:', error.message);
    process.exit(1);
  }
}

fetchAllReviews();
