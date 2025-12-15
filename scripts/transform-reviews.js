#!/usr/bin/env node

/**
 * Transform Judge.me reviews from API format to app format
 * Reads from src/data/judgeme-reviews-raw.json
 * Writes to src/data/judgeme-reviews.json
 */

import { readFileSync, writeFileSync, unlinkSync } from 'fs';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';

const __dirname = dirname(fileURLToPath(import.meta.url));

const RAW_FILE = join(__dirname, '..', 'src', 'data', 'judgeme-reviews-raw.json');
const OUTPUT_FILE = join(__dirname, '..', 'src', 'data', 'judgeme-reviews.json');

try {
  console.log('Reading raw reviews from Judge.me API...');
  const rawData = JSON.parse(readFileSync(RAW_FILE, 'utf8'));

  if (!rawData.reviews || rawData.reviews.length === 0) {
    console.warn('No reviews found in API response');
    process.exit(0);
  }

  console.log(`Found ${rawData.reviews.length} reviews`);

  // Transform to app format
  const reviews = rawData.reviews.map((review) => ({
    id: review.id.toString(),
    productId: review.product_handle || 'unknown',
    author: review.reviewer.name,
    rating: review.rating,
    title: review.title,
    content: review.body,
    date: new Date(review.created_at).toISOString().split('T')[0],
    verified: review.verified === 'ok',
    helpful: 0,
  }));

  // Create output structure
  const output = {
    lastUpdated: new Date().toISOString(),
    count: reviews.length,
    reviews,
  };

  // Write transformed reviews
  writeFileSync(OUTPUT_FILE, JSON.stringify(output, null, 2));
  console.log(`✅ Successfully transformed ${reviews.length} reviews to ${OUTPUT_FILE}`);

  // Clean up raw file
  unlinkSync(RAW_FILE);
  console.log('Cleaned up raw API response file');

} catch (error) {
  console.error('❌ Error transforming reviews:', error.message);
  process.exit(1);
}
