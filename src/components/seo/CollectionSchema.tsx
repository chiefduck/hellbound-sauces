import { Collection, Product } from '@/data/products';

interface CollectionSchemaProps {
  collection: Collection;
  products: Product[];
}

export function CollectionSchema({ collection, products }: CollectionSchemaProps) {
  const schema = {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    "@id": `https://hellboundsauces.com/collections/${collection.handle}#collection`,
    "name": collection.title,
    "description": collection.description,
    "url": `https://hellboundsauces.com/collections/${collection.handle}`,
    "mainEntity": {
      "@type": "ItemList",
      "name": collection.title,
      "description": collection.description,
      "numberOfItems": products.length,
      "itemListElement": products.map((product, index) => ({
        "@type": "ListItem",
        "position": index + 1,
        "item": {
          "@type": "Product",
          "@id": `https://hellboundsauces.com/products/${product.handle}`,
          "name": product.title,
          "description": product.description,
          "image": product.images?.[0],
          "offers": {
            "@type": "Offer",
            "price": product.price.toFixed(2),
            "priceCurrency": "USD",
            "availability": "https://schema.org/InStock"
          }
        }
      }))
    },
    "publisher": {
      "@type": "Organization",
      "@id": "https://hellboundsauces.com/#organization"
    }
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}
