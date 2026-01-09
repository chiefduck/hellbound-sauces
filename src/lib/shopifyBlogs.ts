import { shopifyFetch } from './shopify';

export interface ShopifyBlogArticle {
  id: string;
  title: string;
  handle: string;
  content: string;
  contentHtml: string;
  excerpt?: string;
  excerptHtml?: string;
  image?: {
    url: string;
    altText?: string;
  };
  tags: string[];
  publishedAt: string;
  author?: {
    name: string;
  };
  blog: {
    handle: string;
  };
}

const BLOG_ARTICLES_BY_TAG_QUERY = `
  query GetBlogArticlesByTag($blogHandle: String!, $first: Int!, $query: String) {
    blog(handle: $blogHandle) {
      articles(first: $first, query: $query, sortKey: PUBLISHED_AT, reverse: true) {
        edges {
          node {
            id
            title
            handle
            content
            contentHtml
            excerpt
            excerptHtml
            image {
              url
              altText
            }
            tags
            publishedAt
            authorV2 {
              name
            }
            blog {
              handle
            }
          }
        }
      }
    }
  }
`;

/**
 * Fetch blog articles from Shopify filtered by tag
 * @param blogHandle - The handle of the blog (e.g., "news", "artists")
 * @param tag - The tag to filter by (e.g., "Tattoo Artist", "recipe")
 * @param first - Number of articles to fetch (default: 50)
 */
export async function getBlogArticlesByTag(
  blogHandle: string,
  tag: string,
  first: number = 50
): Promise<ShopifyBlogArticle[]> {
  try {
    const query = `tag:${tag}`;

    const response = await shopifyFetch(BLOG_ARTICLES_BY_TAG_QUERY, {
      blogHandle,
      first,
      query,
    });

    const articles = response?.data?.blog?.articles?.edges || [];

    return articles.map((edge: any) => ({
      id: edge.node.id,
      title: edge.node.title,
      handle: edge.node.handle,
      content: edge.node.content,
      contentHtml: edge.node.contentHtml,
      excerpt: edge.node.excerpt,
      excerptHtml: edge.node.excerptHtml,
      image: edge.node.image,
      tags: edge.node.tags || [],
      publishedAt: edge.node.publishedAt,
      author: edge.node.authorV2,
      blog: edge.node.blog,
    }));
  } catch (error) {
    console.error('Error fetching blog articles by tag:', error);
    return [];
  }
}

const ALL_BLOG_ARTICLES_QUERY = `
  query GetAllBlogArticles($blogHandle: String!, $first: Int!) {
    blog(handle: $blogHandle) {
      articles(first: $first, sortKey: PUBLISHED_AT, reverse: true) {
        edges {
          node {
            id
            title
            handle
            content
            contentHtml
            excerpt
            excerptHtml
            image {
              url
              altText
            }
            tags
            publishedAt
            authorV2 {
              name
            }
            blog {
              handle
            }
          }
        }
      }
    }
  }
`;

/**
 * Fetch all blog articles from Shopify
 * @param blogHandle - The handle of the blog (e.g., "news", "artists")
 * @param first - Number of articles to fetch (default: 50)
 */
export async function getAllBlogArticles(
  blogHandle: string,
  first: number = 50
): Promise<ShopifyBlogArticle[]> {
  try {
    const response = await shopifyFetch(ALL_BLOG_ARTICLES_QUERY, {
      blogHandle,
      first,
    });

    const articles = response?.data?.blog?.articles?.edges || [];

    return articles.map((edge: any) => ({
      id: edge.node.id,
      title: edge.node.title,
      handle: edge.node.handle,
      content: edge.node.content,
      contentHtml: edge.node.contentHtml,
      excerpt: edge.node.excerpt,
      excerptHtml: edge.node.excerptHtml,
      image: edge.node.image,
      tags: edge.node.tags || [],
      publishedAt: edge.node.publishedAt,
      author: edge.node.authorV2,
      blog: edge.node.blog,
    }));
  } catch (error) {
    console.error('Error fetching all blog articles:', error);
    return [];
  }
}
