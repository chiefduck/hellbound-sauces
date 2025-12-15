#!/usr/bin/env node

/**
 * Test script to verify Judge.me API credentials
 * Run with: JUDGEME_PRIVATE_TOKEN=your_token VITE_JUDGEME_SHOP_DOMAIN=your_domain node scripts/test-judgeme-api.js
 * Or set the environment variables in your .env.local file
 */

import { readFileSync } from 'fs';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';

const __dirname = dirname(fileURLToPath(import.meta.url));

// Try to load from .env.local if environment variables aren't set
let JUDGEME_PRIVATE_TOKEN = process.env.JUDGEME_PRIVATE_TOKEN;
let JUDGEME_SHOP_DOMAIN = process.env.VITE_JUDGEME_SHOP_DOMAIN;

if (!JUDGEME_PRIVATE_TOKEN || !JUDGEME_SHOP_DOMAIN) {
  try {
    const envPath = join(__dirname, '..', '.env.local');
    const envContent = readFileSync(envPath, 'utf8');
    const envLines = envContent.split('\n');

    for (const line of envLines) {
      const [key, ...valueParts] = line.split('=');
      const value = valueParts.join('=').trim();

      if (key.trim() === 'JUDGEME_PRIVATE_TOKEN') {
        JUDGEME_PRIVATE_TOKEN = value;
      } else if (key.trim() === 'VITE_JUDGEME_SHOP_DOMAIN') {
        JUDGEME_SHOP_DOMAIN = value;
      }
    }
  } catch (error) {
    // .env.local doesn't exist, that's okay
  }
}

async function testJudgemeAPI() {
  console.log('Testing Judge.me API credentials...\n');

  // Verify environment variables
  if (!JUDGEME_PRIVATE_TOKEN) {
    console.error('❌ JUDGEME_PRIVATE_TOKEN is not set');
    console.error('Please set it in your .env.local file or pass as environment variable');
    process.exit(1);
  }

  if (!JUDGEME_SHOP_DOMAIN) {
    console.error('❌ VITE_JUDGEME_SHOP_DOMAIN is not set');
    console.error('Please set it in your .env.local file or pass as environment variable');
    process.exit(1);
  }

  console.log('✓ Environment variables found');
  console.log(`  Shop Domain: ${JUDGEME_SHOP_DOMAIN}`);
  console.log(`  Private API Token: ${JUDGEME_PRIVATE_TOKEN.substring(0, 10)}...`);
  console.log();

  // Build API URL
  const url = new URL('https://judge.me/api/v1/reviews');
  url.searchParams.append('shop_domain', JUDGEME_SHOP_DOMAIN);
  url.searchParams.append('api_token', JUDGEME_PRIVATE_TOKEN);
  url.searchParams.append('published', 'true');
  url.searchParams.append('per_page', '10');

  console.log('Calling Judge.me API with private token...');
  console.log(`URL: ${url.toString().replace(JUDGEME_PRIVATE_TOKEN, 'TOKEN_HIDDEN')}\n`);

  try {
    const response = await fetch(url.toString());

    console.log(`Status: ${response.status} ${response.statusText}`);
    console.log('Headers:', Object.fromEntries(response.headers.entries()));
    console.log();

    const data = await response.json();

    if (!response.ok) {
      console.error('❌ API Error Response:');
      console.error(JSON.stringify(data, null, 2));
      process.exit(1);
    }

    console.log('✅ API call successful!');
    console.log(`Found ${data.reviews?.length || 0} reviews`);

    if (data.reviews && data.reviews.length > 0) {
      console.log('\nFirst review:');
      console.log(`  - ID: ${data.reviews[0].id}`);
      console.log(`  - Title: ${data.reviews[0].title}`);
      console.log(`  - Author: ${data.reviews[0].reviewer.name}`);
      console.log(`  - Rating: ${data.reviews[0].rating}/5`);
    }

  } catch (error) {
    console.error('❌ Error calling API:');
    console.error(error.message);
    process.exit(1);
  }
}

testJudgemeAPI();
