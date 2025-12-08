import { BlogPost } from '@/data/blog';

interface ArticleSchemaProps {
  post: BlogPost;
}

export function ArticleSchema({ post }: ArticleSchemaProps) {
  const schema = {
    "@context": "https://schema.org",
    "@type": "Article",
    "@id": `https://hellboundhotsauce.com/blog/${post.slug}#article`,
    "headline": post.title,
    "description": post.excerpt,
    "image": post.image || "https://hellboundhotsauce.com/og-image.jpg",
    "datePublished": post.date,
    "dateModified": post.date,
    "author": {
      "@type": "Person",
      "name": post.author,
      "url": "https://hellboundhotsauce.com/about"
    },
    "publisher": {
      "@type": "Organization",
      "@id": "https://hellboundhotsauce.com/#organization",
      "name": "Hellbound Hot Sauce",
      "logo": {
        "@type": "ImageObject",
        "url": "https://hellboundhotsauce.com/logo.png"
      }
    },
    "mainEntityOfPage": {
      "@type": "WebPage",
      "@id": `https://hellboundhotsauce.com/blog/${post.slug}`
    },
    "articleSection": post.category,
    "keywords": post.tags?.join(', ') || post.category,
    "wordCount": post.content.split(/\s+/).length,
    "timeRequired": `PT${post.readTime}M`,
    "inLanguage": "en-US",
    "isAccessibleForFree": true
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}
