import { shopifyFetch } from "./shopify";

export async function getProducts() {
  return shopifyFetch(`
    {
      products(first: 50) {
        edges {
          node {
            id
            title
            handle
            description
            descriptionHtml
            images(first: 5) {
              edges {
                node {
                  url
                  altText
                }
              }
            }
            variants(first: 100) {
              edges {
                node {
                  id
                  title
                  price {
                    amount
                    currencyCode
                  }
                  compareAtPrice {
                    amount
                    currencyCode
                  }
                  availableForSale
                  image {
                    url
                    altText
                  }
                  selectedOptions {
                    name
                    value
                  }
                }
              }
            }
            tags
            productType
          }
        }
      }
    }
  `);
}

export async function getProductByHandle(handle: string) {
  return shopifyFetch(`
    query getProduct($handle: String!) {
      product(handle: $handle) {
        id
        title
        handle
        description
        descriptionHtml
        images(first: 10) {
          edges {
            node {
              url
              altText
            }
          }
        }
        variants(first: 100) {
          edges {
            node {
              id
              title
              price {
                amount
                currencyCode
              }
              compareAtPrice {
                amount
                currencyCode
              }
              availableForSale
              image {
                url
                altText
              }
              selectedOptions {
                name
                value
              }
            }
          }
        }
        tags
        productType
      }
    }
  `, { handle });
}

export async function getCollectionByHandle(handle: string) {
  return shopifyFetch(`
    query getCollection($handle: String!) {
      collection(handle: $handle) {
        id
        title
        handle
        description
        descriptionHtml
        image {
          url
          altText
        }
        products(first: 50) {
          edges {
            node {
              id
              title
              handle
              description
              descriptionHtml
              images(first: 5) {
                edges {
                  node {
                    url
                    altText
                  }
                }
              }
              variants(first: 100) {
                edges {
                  node {
                    id
                    price {
                      amount
                      currencyCode
                    }
                    compareAtPrice {
                      amount
                      currencyCode
                    }
                    availableForSale
                    image {
                      url
                      altText
                    }
                    selectedOptions {
                      name
                      value
                    }
                  }
                }
              }
              tags
              productType
            }
          }
        }
      }
    }
  `, { handle });
}

export async function getAllCollections() {
  return shopifyFetch(`
    {
      collections(first: 20) {
        edges {
          node {
            id
            title
            handle
            description
            descriptionHtml
            image {
              url
              altText
            }
          }
        }
      }
    }
  `);
}
