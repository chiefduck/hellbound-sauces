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
        pageInfo {
          hasNextPage
          hasPreviousPage
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

    console.log('🔍 Fetching blog articles:', { blogHandle, tag, query, first });

    const response = await shopifyFetch(BLOG_ARTICLES_BY_TAG_QUERY, {
      blogHandle,
      first,
      query,
    });

    console.log('📦 Raw Shopify response:', {
      hasBlog: !!response?.data?.blog,
      blogHandle: response?.data?.blog ? blogHandle : 'BLOG NOT FOUND',
      hasArticles: !!response?.data?.blog?.articles,
      edgesLength: response?.data?.blog?.articles?.edges?.length || 0,
      fullResponse: response?.data,
    });

    if (!response?.data?.blog) {
      console.error(`❌ Blog with handle "${blogHandle}" not found in Shopify!`);
      console.error('💡 Check that:');
      console.error('  1. The blog exists in Shopify Admin > Online Store > Blog Posts');
      console.error('  2. The blog handle is exactly "tattoo-artist"');
      console.error('  3. The blog has the correct visibility settings');
      return [];
    }

    const articles = response?.data?.blog?.articles?.edges || [];

    console.log('📝 Articles found:', articles.length);
    articles.forEach((edge: any, index: number) => {
      console.log(`  ${index + 1}. ${edge.node.title}`, {
        handle: edge.node.handle,
        tags: edge.node.tags || [],
        publishedAt: edge.node.publishedAt,
      });
    });

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
    console.error('❌ Error fetching blog articles by tag:', error);
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

const BLOG_ARTICLE_BY_HANDLE_QUERY = `
  query GetBlogArticleByHandle($blogHandle: String!, $articleHandle: String!) {
    blog(handle: $blogHandle) {
      articleByHandle(handle: $articleHandle) {
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
`;

/**
 * Fetch a single blog article by handle
 * @param blogHandle - The handle of the blog (e.g., "recipes")
 * @param articleHandle - The handle of the article
 */
export async function getBlogArticleByHandle(
  blogHandle: string,
  articleHandle: string
): Promise<ShopifyBlogArticle | null> {
  try {
    const response = await shopifyFetch(BLOG_ARTICLE_BY_HANDLE_QUERY, {
      blogHandle,
      articleHandle,
    });

    const article = response?.data?.blog?.articleByHandle;

    if (!article) {
      return null;
    }

    return {
      id: article.id,
      title: article.title,
      handle: article.handle,
      content: article.content,
      contentHtml: article.contentHtml,
      excerpt: article.excerpt,
      excerptHtml: article.excerptHtml,
      image: article.image,
      tags: article.tags || [],
      publishedAt: article.publishedAt,
      author: article.authorV2,
      blog: article.blog,
    };
  } catch (error) {
    console.error('Error fetching blog article by handle:', error);
    return null;
  }
}
