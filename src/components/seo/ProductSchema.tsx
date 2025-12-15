import { Product } from '@/data/products';

interface ProductSchemaProps {
  product: Product;
}

export function ProductSchema({ product }: ProductSchemaProps) {
  const schema = {
    "@context": "https://schema.org",
    "@type": "Product",
    "@id": `https://hellboundsauces.com/products/${product.handle}#product`,
    "name": product.title,
    "description": product.longDescription || product.description,
    "image": product.images?.[0] || "https://hellboundsauces.com/placeholder.svg",
    "sku": product.id,
    "mpn": `HB-${product.id}`,
    "brand": {
      "@type": "Brand",
      "name": "Hellbound Hot Sauce"
    },
    "category": product.category === 'hot-sauce' ? 'Hot Sauce' : product.category === 'rub' ? 'BBQ Rub' : 'Bundle',
    "offers": {
      "@type": "Offer",
      "url": `https://hellboundsauces.com/products/${product.handle}`,
      "priceCurrency": "USD",
      "price": product.price.toFixed(2),
      "priceValidUntil": new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
      "availability": "https://schema.org/InStock",
      "seller": {
        "@type": "Organization",
        "name": "Hellbound Hot Sauce"
      },
      "shippingDetails": {
        "@type": "OfferShippingDetails",
        "shippingRate": {
          "@type": "MonetaryAmount",
          "value": "5.99",
          "currency": "USD"
        },
        "shippingDestination": {
          "@type": "DefinedRegion",
          "addressCountry": "US"
        },
        "deliveryTime": {
          "@type": "ShippingDeliveryTime",
          "handlingTime": {
            "@type": "QuantitativeValue",
            "minValue": 1,
            "maxValue": 2,
            "unitCode": "DAY"
          },
          "transitTime": {
            "@type": "QuantitativeValue",
            "minValue": 3,
            "maxValue": 7,
            "unitCode": "DAY"
          }
        }
      },
      "hasMerchantReturnPolicy": {
        "@type": "MerchantReturnPolicy",
        "applicableCountry": "US",
        "returnPolicyCategory": "https://schema.org/MerchantReturnFiniteReturnWindow",
        "merchantReturnDays": 30,
        "returnMethod": "https://schema.org/ReturnByMail",
        "returnFees": "https://schema.org/FreeReturn"
      }
    },
    ...(product.reviews && {
      "aggregateRating": {
        "@type": "AggregateRating",
        "ratingValue": product.reviews.rating.toString(),
        "reviewCount": product.reviews.count.toString(),
        "bestRating": "5",
        "worstRating": "1"
      }
    }),
    ...(product.ingredients && {
      "additionalProperty": [
        {
          "@type": "PropertyValue",
          "name": "Heat Level",
          "value": `${product.heatLevel}/5`
        },
        ...(product.scoville ? [{
          "@type": "PropertyValue",
          "name": "Scoville Rating",
          "value": product.scoville
        }] : []),
        {
          "@type": "PropertyValue",
          "name": "Ingredients",
          "value": product.ingredients.join(', ')
        }
      ]
    })
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}
