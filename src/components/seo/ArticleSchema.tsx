import { BlogPost } from '@/data/blog';

interface ArticleSchemaProps {
  post: BlogPost;
}

export function ArticleSchema({ post }: ArticleSchemaProps) {
  const schema = {
    "@context": "https://schema.org",
    "@type": "Article",
    "@id": `https://hellboundsauces.com/blog/${post.slug}#article`,
    "headline": post.title,
    "description": post.excerpt,
    "image": post.image || "https://hellboundsauces.com/logo.png",
    "datePublished": post.date,
    "dateModified": post.date,
    "author": {
      "@type": "Person",
      "name": post.author,
      "url": "https://hellboundsauces.com/about"
    },
    "publisher": {
      "@type": "Organization",
      "@id": "https://hellboundsauces.com/#organization",
      "name": "Hellbound Hot Sauce",
      "logo": {
        "@type": "ImageObject",
        "url": "https://hellboundsauces.com/logo.png"
      }
    },
    "mainEntityOfPage": {
      "@type": "WebPage",
      "@id": `https://hellboundsauces.com/blog/${post.slug}`
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
