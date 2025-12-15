# Blog Image Specifications

## Quick Answer

**Create one image per blog post:**
- **Recommended Size:** 1200px × 675px (16:9 ratio)
- **Format:** WebP (preferred) or JPG
- **Quality:** 80-85% compression
- **File Size Target:** Under 200KB

## Detailed Breakdown

### Aspect Ratios Used

All blog images use a **16:9 aspect ratio** (with one exception):

1. **Homepage Blog Preview** - 16:9 (`aspect-video`)
2. **Blog Listing Page** - 16:9 (`aspect-video`)
3. **Blog Detail Page Hero** - 16:9 on desktop, 16:10 on mobile
4. **Related Posts** - 16:9 (`aspect-video`)

### Image Dimensions by Location

#### 1. Homepage Blog Preview (`/src/components/home/BlogPreview.tsx`)

**Layout:** 3-column grid on desktop, 2-column on tablet, 1-column on mobile

**Display Sizes:**
- Desktop (3 columns): ~380px wide
- Tablet (2 columns): ~360px wide
- Mobile (1 column): ~100% of screen width (320-430px)

**Aspect Ratio:** 16:9

**Actual Displayed Dimensions:**
- Desktop: 380px × 214px
- Tablet: 360px × 203px
- Mobile: 375px × 211px (average)

---

#### 2. Blog Listing Page - Featured Posts (`/src/pages/BlogPage.tsx`)

**Layout:** 2-column grid on desktop/tablet

**Display Sizes:**
- Desktop: ~560px wide
- Tablet: ~360px wide
- Mobile: ~100% width

**Aspect Ratio:** 16:9

**Actual Displayed Dimensions:**
- Desktop: 560px × 315px
- Tablet: 360px × 203px
- Mobile: 375px × 211px

---

#### 3. Blog Listing Page - Regular Posts Grid (`/src/pages/BlogPage.tsx`)

**Layout:** 2-column grid

**Display Sizes:**
- Desktop: ~380px wide
- Tablet: ~360px wide
- Mobile: ~100% width

**Aspect Ratio:** 16:9

**Actual Displayed Dimensions:**
- Desktop: 380px × 214px
- Tablet: 360px × 203px
- Mobile: 375px × 211px

---

#### 4. Blog Detail Page Hero (`/src/pages/BlogPostPage.tsx`)

**Layout:** Full-width on mobile, max-width constrained on desktop

**Display Sizes:**
- Desktop: Max 1024px wide (lg:max-w-4xl)
- Tablet: ~768px wide
- Mobile: Full width (~375-430px)

**Aspect Ratio:**
- Mobile: 16:10 (`aspect-[16/10]`)
- Desktop: 16:9 (`aspect-video`)

**Actual Displayed Dimensions:**
- Desktop: 1024px × 576px
- Tablet: 768px × 432px
- Mobile: 375px × 234px (16:10 ratio)

---

#### 5. Related Posts Section (`/src/pages/BlogPostPage.tsx`)

**Layout:** 3-column grid on desktop, horizontal scroll on mobile

**Display Sizes:**
- Desktop: ~380px wide
- Mobile scroll: 280px wide

**Aspect Ratio:** 16:9

**Actual Displayed Dimensions:**
- Desktop: 380px × 214px
- Mobile: 280px × 158px

---

## Recommended Image Specifications

### Primary Recommendation: 1200×675px

**Dimensions:** 1200px × 675px (16:9 ratio)

**Why this size?**
- Covers the largest display (Blog Detail Hero at 1024px) with room for retina/2× displays
- Provides 2× pixel density for most locations
- Works well for mobile 16:10 display (crops minimally)
- File size remains manageable with proper compression

**Export Settings:**
- Format: WebP (best compression) or JPG
- Quality: 80-85%
- Target file size: 150-200KB

---

### Alternative: 1920×1080px (High Quality)

**Dimensions:** 1920px × 1080px (16:9 ratio)

**When to use:**
- Hero images for featured articles
- High-quality photography or artwork
- When detail is critical

**Export Settings:**
- Format: WebP (required for larger files)
- Quality: 75-80%
- Target file size: 200-300KB

---

### Minimum Size: 800×450px

**Dimensions:** 800px × 450px (16:9 ratio)

**When to use:**
- Low-bandwidth considerations
- Simple graphics or text-heavy images
- Quick blog posts

**Export Settings:**
- Format: WebP or JPG
- Quality: 85-90%
- Target file size: 50-100KB

---

## Image Optimization Checklist

### Before Upload
- [ ] Resize to 1200×675px (or chosen dimension)
- [ ] Crop to exact 16:9 ratio (no letterboxing)
- [ ] Optimize/compress (WebP preferred)
- [ ] Check file size (under 200KB ideal)
- [ ] Test on dark background (site uses dark theme)
- [ ] Verify important content not at edges (may be cropped on mobile)

### Subject Composition Tips
Since the site uses a **dark theme**, consider:
- Avoid pure black backgrounds (low contrast)
- Add subtle borders or glows to images for definition
- Test against dark gray background (#1a1a1a)
- Center important subjects (mobile crops may vary)
- Leave breathing room at edges

---

## File Naming Convention

**Recommended format:**
```
blog-[slug]-featured.webp
```

**Examples:**
```
blog-ultimate-hot-sauce-guide-featured.webp
blog-beginner-heat-tolerance-featured.webp
blog-bbq-rub-comparison-featured.webp
```

**Benefits:**
- Easy to identify blog images in assets folder
- Matches blog post slug for consistency
- WebP extension indicates optimized format

---

## Current Image Storage Location

Based on the recipe images, blog images should be stored at:
```
/public/assets/blog/
```

Then referenced in blog data as:
```javascript
image: '/assets/blog/blog-post-name-featured.webp'
```

---

## Export Guide by Tool

### Photoshop
1. File → Export → Export As...
2. Format: WebP or JPEG
3. Image Size: 1200 × 675
4. Quality: 80-85%
5. Convert to sRGB: ✓
6. Save

### Figma
1. Select frame
2. Export settings: WebP
3. 1× scale at 1200×675, or 2× scale at 600×337.5
4. Export

### Canva
1. Download → Custom size
2. Width: 1200, Height: 675
3. File type: JPG (Canva doesn't support WebP export)
4. Then convert to WebP using online tool (squoosh.app)

### Online Compression Tools
- **squoosh.app** - WebP conversion and compression
- **tinypng.com** - JPG/PNG compression
- **imageoptim.com** - Batch optimization (Mac)

---

## Example Blog Post Data Structure

```javascript
{
  id: 'ultimate-hot-sauce-guide',
  slug: 'ultimate-hot-sauce-guide',
  title: 'The Ultimate Guide to Hot Sauce Heat Levels',
  excerpt: 'Learn everything about Scoville ratings, pepper types, and finding your perfect heat level.',
  image: '/assets/blog/blog-ultimate-hot-sauce-guide-featured.webp', // <-- Image path
  category: 'Heat Education',
  author: 'Sarah Martinez',
  date: '2024-12-01',
  readTime: 8,
  featured: true,
  tags: ['heat guide', 'scoville', 'peppers', 'beginner'],
  content: `# Full article content here in markdown...`
}
```

---

## Testing Your Images

After adding blog images, verify:

1. **Homepage** (`/`)
   - Scroll to "Latest Articles" section
   - Check 3-column grid displays correctly
   - Images should fill containers without stretching

2. **Blog Page** (`/blog`)
   - Check featured posts section (if applicable)
   - Verify grid of all posts
   - Images should load quickly

3. **Blog Detail** (`/blog/your-post-slug`)
   - Hero image should be prominent
   - Mobile: Check 16:10 crop looks good
   - Desktop: Verify centered and max-width
   - Related posts images should match

4. **Mobile Testing**
   - Test on actual device or DevTools
   - Check hero image 16:10 crop
   - Verify horizontal scroll in related posts
   - Images should be sharp (not blurry)

---

## Common Issues & Solutions

### Issue: Image looks blurry
**Solution:** Increase resolution to 1920×1080px or ensure image is exactly 1200×675px

### Issue: File size too large
**Solution:**
- Convert to WebP format
- Reduce quality to 75-80%
- Use compression tools (squoosh.app)

### Issue: Important content cut off on mobile
**Solution:** Keep important subjects centered, leave 10-15% margin on all edges

### Issue: Low contrast on dark background
**Solution:** Add subtle light border, increase image brightness, or add drop shadow

### Issue: Images not loading
**Solution:**
- Verify images are in `/public/assets/blog/`
- Check path starts with `/assets/blog/` (not `/public/`)
- Clear browser cache

---

## Summary Table

| Location | Layout | Display Size | Aspect Ratio | Recommended Image |
|----------|--------|--------------|--------------|-------------------|
| Homepage Preview | 3-col grid | 380px wide | 16:9 | 1200×675 |
| Blog Featured | 2-col grid | 560px wide | 16:9 | 1200×675 |
| Blog Grid | 2-col grid | 380px wide | 16:9 | 1200×675 |
| Detail Hero | Full-width | 1024px max | 16:9 desktop, 16:10 mobile | 1200×675 |
| Related Posts | 3-col grid | 380px wide | 16:9 | 1200×675 |

**One image size fits all locations: 1200px × 675px (16:9)**

---

## Pro Tips

1. **Use WebP format** - 30% smaller file size than JPG with same quality
2. **Test on dark background** - Site uses dark theme, ensure good contrast
3. **Center important content** - Mobile crops to 16:10, desktop shows full 16:9
4. **Batch process** - Create template at 1200×675px, export all blog images same size
5. **Consistent style** - Keep similar visual style across all blog images for brand cohesion
6. **Alt text** - Always include descriptive alt text in image tag (accessibility)

---

## Need Help?

**Image too large?** Use squoosh.app to compress to WebP
**Don't have design software?** Use Canva free tier with 1200×675px custom dimensions
**Stock photos?** Unsplash.com has free high-quality images (check licenses)
**Vector graphics?** Can export at any size, use 1200×675px export dimensions
