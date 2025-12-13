import { useEffect } from 'react';

interface SEOHeadProps {
  title: string;
  description: string;
  canonical?: string;
  type?: 'website' | 'article' | 'product';
  image?: string;
  publishedTime?: string;
  modifiedTime?: string;
  author?: string;
  section?: string;
  tags?: string[];
  noindex?: boolean;
}

export function SEOHead({
  title,
  description,
  canonical,
  type = 'website',
  image = 'https://hellboundhotsauce.com/logo.png',
  publishedTime,
  modifiedTime,
  author,
  section,
  tags,
  noindex = false,
}: SEOHeadProps) {
  const fullTitle = title.includes('Hellbound') ? title : `${title} | Hellbound Hot Sauce`;
  const baseUrl = 'https://hellboundhotsauce.com';
  const canonicalUrl = canonical ? `${baseUrl}${canonical}` : undefined;

  useEffect(() => {
    // Update document title
    document.title = fullTitle;

    // Helper to update or create meta tag
    const setMeta = (name: string, content: string, property = false) => {
      const attr = property ? 'property' : 'name';
      let meta = document.querySelector(`meta[${attr}="${name}"]`);
      if (!meta) {
        meta = document.createElement('meta');
        meta.setAttribute(attr, name);
        document.head.appendChild(meta);
      }
      meta.setAttribute('content', content);
    };

    // Basic meta tags
    setMeta('description', description);
    setMeta('robots', noindex ? 'noindex, nofollow' : 'index, follow');

    // Open Graph
    setMeta('og:title', fullTitle, true);
    setMeta('og:description', description, true);
    setMeta('og:type', type, true);
    setMeta('og:image', image, true);
    setMeta('og:site_name', 'Hellbound Hot Sauce', true);
    if (canonicalUrl) {
      setMeta('og:url', canonicalUrl, true);
    }

    // Twitter
    setMeta('twitter:card', 'summary_large_image');
    setMeta('twitter:title', fullTitle);
    setMeta('twitter:description', description);
    setMeta('twitter:image', image);

    // Article-specific meta
    if (type === 'article') {
      if (publishedTime) setMeta('article:published_time', publishedTime, true);
      if (modifiedTime) setMeta('article:modified_time', modifiedTime, true);
      if (author) setMeta('article:author', author, true);
      if (section) setMeta('article:section', section, true);
      if (tags) {
        tags.forEach((tag, i) => {
          setMeta(`article:tag:${i}`, tag, true);
        });
      }
    }

    // Canonical link
    let canonicalLink = document.querySelector('link[rel="canonical"]');
    if (canonicalUrl) {
      if (!canonicalLink) {
        canonicalLink = document.createElement('link');
        canonicalLink.setAttribute('rel', 'canonical');
        document.head.appendChild(canonicalLink);
      }
      canonicalLink.setAttribute('href', canonicalUrl);
    } else if (canonicalLink) {
      canonicalLink.remove();
    }
  }, [fullTitle, description, canonicalUrl, type, image, publishedTime, modifiedTime, author, section, tags, noindex]);

  return null;
}
