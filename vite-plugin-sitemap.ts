import type { Plugin } from 'vite';
import { products } from './src/data/products';
import { blogPosts } from './src/data/blog';

const SITE_URL = 'https://hellboundhotsauce.com';

interface SitemapEntry {
  loc: string;
  lastmod: string;
  changefreq: 'always' | 'hourly' | 'daily' | 'weekly' | 'monthly' | 'yearly' | 'never';
  priority: number;
  images?: { loc: string; title: string }[];
}

function escapeXml(text: string): string {
  return text
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&apos;');
}

function generateSitemapXML(entries: SitemapEntry[]): string {
  const urlEntries = entries.map(entry => {
    const imageXml = entry.images?.map(img => `
      <image:image>
        <image:loc>${img.loc}</image:loc>
        <image:title>${escapeXml(img.title)}</image:title>
      </image:image>`).join('') || '';

    return `
  <url>
    <loc>${entry.loc}</loc>
    <lastmod>${entry.lastmod}</lastmod>
    <changefreq>${entry.changefreq}</changefreq>
    <priority>${entry.priority}</priority>${imageXml}
  </url>`;
  }).join('');

  return `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"
        xmlns:image="http://www.google.com/schemas/sitemap-image/1.1">
${urlEntries}
</urlset>`;
}

function generateSitemap(): string {
  const today = new Date().toISOString().split('T')[0];
  const entries: SitemapEntry[] = [];

  // Static pages
  const staticPages = [
    { path: '', priority: 1.0, changefreq: 'daily' as const },
    { path: '/about', priority: 0.8, changefreq: 'monthly' as const },
    { path: '/heat-guide', priority: 0.8, changefreq: 'monthly' as const },
    { path: '/blog', priority: 0.9, changefreq: 'daily' as const },
    { path: '/wholesale', priority: 0.7, changefreq: 'monthly' as const },
    { path: '/contact', priority: 0.7, changefreq: 'monthly' as const },
    { path: '/faq', priority: 0.7, changefreq: 'monthly' as const },
    { path: '/shipping', priority: 0.5, changefreq: 'yearly' as const },
    { path: '/privacy', priority: 0.3, changefreq: 'yearly' as const },
    { path: '/terms', priority: 0.3, changefreq: 'yearly' as const },
  ];

  staticPages.forEach(page => {
    entries.push({
      loc: `${SITE_URL}${page.path}`,
      lastmod: today,
      changefreq: page.changefreq,
      priority: page.priority,
    });
  });

  // Collections
  const collections = ['all', 'hot-sauces', 'bbq-rubs', 'bundles'];
  collections.forEach(handle => {
    entries.push({
      loc: `${SITE_URL}/collections/${handle}`,
      lastmod: today,
      changefreq: 'weekly',
      priority: 0.9,
    });
  });

  // Products (dynamically from data)
  products.forEach(product => {
    const images = product.images?.map(img => ({
      loc: img.startsWith('http') ? img : `${SITE_URL}${img}`,
      title: `${product.title} - Hellbound Hot Sauce`,
    })) || [];

    entries.push({
      loc: `${SITE_URL}/products/${product.handle}`,
      lastmod: today,
      changefreq: 'weekly',
      priority: 0.8,
      images,
    });
  });

  // Blog posts (dynamically from data)
  blogPosts.forEach(post => {
    entries.push({
      loc: `${SITE_URL}/blog/${post.slug}`,
      lastmod: post.date,
      changefreq: 'monthly',
      priority: 0.7,
      images: post.image ? [{
        loc: post.image.startsWith('http') ? post.image : `${SITE_URL}${post.image}`,
        title: post.title,
      }] : undefined,
    });
  });

  return generateSitemapXML(entries);
}

export function sitemapPlugin(): Plugin {
  return {
    name: 'vite-plugin-sitemap',
    
    // Generate sitemap during build
    generateBundle() {
      const sitemap = generateSitemap();
      
      this.emitFile({
        type: 'asset',
        fileName: 'sitemap.xml',
        source: sitemap,
      });
      
      console.log('✓ Sitemap generated with', products.length, 'products and', blogPosts.length, 'blog posts');
    },
    
    // Serve dynamic sitemap in dev mode
    configureServer(server) {
      server.middlewares.use((req, res, next) => {
        if (req.url === '/sitemap.xml') {
          const sitemap = generateSitemap();
          res.setHeader('Content-Type', 'application/xml');
          res.end(sitemap);
          return;
        }
        next();
      });
    },
  };
}
