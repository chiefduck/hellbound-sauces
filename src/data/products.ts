export interface Product {
  id: string;
  handle: string;
  title: string;
  description: string;
  longDescription?: string;
  descriptionHtml?: string; // Raw HTML description for merch products with size charts
  price: number;
  compareAtPrice?: number;
  images: string[];
  category: 'hot-sauce' | 'rub' | 'merch';
  heatLevel?: 1 | 2 | 3 | 4 | 5; // Optional for non-food items like merch
  scoville?: string;
  ingredients?: string[];
  pairings?: string[];
  featured?: boolean;
  bestSeller?: boolean;
  new?: boolean;
  variants?: {
    id: string;
    title: string;
    price: number;
    availableForSale?: boolean; // Whether this variant is in stock
    image?: string; // Variant-specific image
    selectedOptions?: { name: string; value: string }[]; // e.g., [{name: "Color", value: "Black"}, {name: "Size", value: "Large"}]
  }[];
  reviews?: { rating: number; count: number };
  shopifyVariantId?: string; // Shopify variant ID for checkout
  tags?: string[]; // Shopify product tags for filtering
}

export interface Collection {
  id: string;
  handle: string;
  title: string;
  description: string;
  image: string;
  products: string[];
}

export const products: Product[] = [
  // Series 1 Hot Sauces - $12.00
  {
    id: '1',
    handle: 'sweet-heat',
    title: 'Series 1 - Sweet Heat',
    description: 'Perfect balance of sweet and spicy that complements any dish.',
    longDescription: 'Our Sweet Heat sauce delivers the perfect balance of sweet and heat. Crafted to complement food rather than overwhelm it, this sauce has earned a perfect 5-star rating from our customers.',
    price: 12.00,
    images: ['/placeholder.svg'],
    category: 'hot-sauce',
    heatLevel: 2,
    pairings: ['Wings', 'Chicken', 'Tacos', 'Pizza'],
    featured: true,
    bestSeller: true,
    reviews: { rating: 5.0, count: 8 }
  },
  {
    id: '2',
    handle: 'cucumber-madness',
    title: 'Series 1 - Cucumber Madness',
    description: 'Unique cucumber-based hot sauce with refreshing heat.',
    longDescription: 'A one-of-a-kind hot sauce featuring fresh cucumber flavors paired with just the right amount of heat. This unique blend has quickly become a fan favorite.',
    price: 12.00,
    images: ['/placeholder.svg'],
    category: 'hot-sauce',
    heatLevel: 2,
    pairings: ['Salads', 'Fish', 'Vegetables', 'Summer Dishes'],
    featured: true,
    reviews: { rating: 5.0, count: 5 }
  },
  {
    id: '3',
    handle: 'pineapple-mango',
    title: 'Series 1 - Pineapple-Mango',
    description: 'Tropical fruit hot sauce with bold flavors.',
    longDescription: 'Transport your taste buds to the tropics with our Pineapple-Mango sauce. Sweet tropical fruits meet carefully balanced heat for an unforgettable flavor experience.',
    price: 12.00,
    images: ['/placeholder.svg'],
    category: 'hot-sauce',
    heatLevel: 2,
    pairings: ['Grilled Chicken', 'Fish Tacos', 'Shrimp', 'Rice Bowls'],
    featured: true,
    reviews: { rating: 5.0, count: 4 }
  },
  // Series 2 Hot Sauces - $15.00
  {
    id: '4',
    handle: 'wide-awake',
    title: 'Series 2 - Wide Awake',
    description: '5-star premium hot sauce with bold awakening flavors.',
    longDescription: 'Wide Awake lives up to its name with an explosive blend that will wake up your taste buds. Our Series 2 premium offering has earned perfect ratings from customers.',
    price: 15.00,
    images: ['/placeholder.svg'],
    category: 'hot-sauce',
    heatLevel: 3,
    pairings: ['Breakfast Dishes', 'Eggs', 'Hash Browns', 'Breakfast Burritos'],
    featured: true,
    reviews: { rating: 5.0, count: 2 }
  },
  {
    id: '5',
    handle: 'leprechaun-lava',
    title: 'Series 2 - Leprechaun Lava',
    description: 'Vibrant green sauce with explosive flavor.',
    longDescription: 'Don\'t let the playful name fool you - Leprechaun Lava delivers serious heat with a unique flavor profile that stands out from the crowd.',
    price: 15.00,
    images: ['/placeholder.svg'],
    category: 'hot-sauce',
    heatLevel: 3,
    pairings: ['Tacos', 'Quesadillas', 'Nachos', 'Mexican Dishes'],
    reviews: { rating: 5.0, count: 1 }
  },
  {
    id: '6',
    handle: 'clove-keeper',
    title: 'Series 2 - Clove Keeper',
    description: 'Complex aromatic sauce with warming spices.',
    longDescription: 'Clove Keeper features an unexpected blend of aromatic spices that create a warming, complex heat. A sophisticated choice for the discerning heat seeker.',
    price: 15.00,
    images: ['/placeholder.svg'],
    category: 'hot-sauce',
    heatLevel: 3,
    pairings: ['Pork', 'Ham', 'Root Vegetables', 'Stews'],
    reviews: { rating: 5.0, count: 1 }
  },
  // Series 3 Hot Sauces - $16.00
  {
    id: '7',
    handle: 'sapphire-dragon',
    title: 'Series 3 - Sapphire Dragon',
    description: 'Premium dragon fruit-infused sauce with mystical flavors.',
    longDescription: 'Our most premium hot sauce featuring exotic dragon fruit and a carefully crafted spice blend. Sapphire Dragon is where art meets extreme flavor.',
    price: 16.00,
    images: ['/placeholder.svg'],
    category: 'hot-sauce',
    heatLevel: 4,
    pairings: ['Seafood', 'Sushi', 'Asian Cuisine', 'Rice Dishes'],
    featured: true,
    new: true,
    reviews: { rating: 5.0, count: 1 }
  },
  {
    id: '8',
    handle: 'blazin-bee-mustard',
    title: 'Series 3 - Blazin Bee Mustard',
    description: 'Honey mustard heat with a fiery twist.',
    longDescription: 'Sweet honey and tangy mustard meet serious heat in this unique Series 3 creation. Perfect for those who want complexity with their spice.',
    price: 16.00,
    images: ['/placeholder.svg'],
    category: 'hot-sauce',
    heatLevel: 3,
    pairings: ['Pretzels', 'Brats', 'Sandwiches', 'Chicken Tenders'],
    reviews: { rating: 5.0, count: 1 }
  },
  {
    id: '9',
    handle: 'bangkok-burn',
    title: 'Series 3 - Bangkok Burn',
    description: 'Asian-inspired hot sauce with bold Thai flavors.',
    longDescription: 'Inspired by the street food of Bangkok, this sauce brings authentic Thai heat and flavor to your kitchen. A perfect blend of Southeast Asian spices and peppers.',
    price: 16.00,
    images: ['/placeholder.svg'],
    category: 'hot-sauce',
    heatLevel: 4,
    pairings: ['Pad Thai', 'Stir Fry', 'Noodles', 'Asian Cuisine'],
    featured: true,
    reviews: { rating: 5.0, count: 1 }
  },
  // BBQ Rubs - $15.00
  {
    id: '10',
    handle: 'beekeepers-blend',
    title: 'Beekeepers Blend (Large 12.2 oz)',
    description: 'Sweet and spicy blend made with real honey powder, smoky paprika, garlic, and a touch of chili.',
    longDescription: 'Perfect for grilled chicken, brisket, and BBQ wings. Made with real honey powder, smoky paprika, garlic, and a touch of chili for a sweet and spicy flavor profile.',
    price: 15.00,
    images: ['/placeholder.svg'],
    category: 'rub',
    heatLevel: 2,
    ingredients: ['Honey Powder', 'Smok y Paprika', 'Garlic', 'Chili'],
    pairings: ['Chicken', 'Brisket', 'BBQ Wings', 'Pork'],
    bestSeller: true,
    reviews: { rating: 5.0, count: 1 }
  },
  {
    id: '11',
    handle: 'aztec-gold',
    title: 'Aztec Gold (Large 9.2 oz)',
    description: 'Earthy, aromatic rub combining chili powders, cumin, roasted garlic, and coriander.',
    longDescription: 'Designed for beef, vegetables, and hearty stews. This earthy blend combines chili powders, cumin, roasted garlic, and coriander for authentic Southwest flavors.',
    price: 15.00,
    images: ['/placeholder.svg'],
    category: 'rub',
    heatLevel: 2,
    ingredients: ['Chili Powders', 'Cumin', 'Roasted Garlic', 'Coriander'],
    pairings: ['Beef', 'Vegetables', 'Stews', 'Mexican Dishes'],
    reviews: { rating: 5.0, count: 1 }
  },
  {
    id: '12',
    handle: 'wildwood-maple',
    title: 'Wildwood Maple (Large 11 oz)',
    description: 'Rich, woodsy blend featuring maple sugar, Worcestershire powder, and dried shallots.',
    longDescription: 'Ideal for smoking, roasting, or open-flame grilling. Features maple sugar, Worcestershire powder, dried shallots with black pepper and cayenne for a complex, sweet-savory profile.',
    price: 15.00,
    images: ['/placeholder.svg'],
    category: 'rub',
    heatLevel: 2,
    ingredients: ['Maple Sugar', 'Worcestershire Powder', 'Dried Shallots', 'Black Pepper', 'Cayenne'],
    pairings: ['Ribs', 'Brisket', 'Pork Shoulder', 'Smoked Meats'],
    featured: true,
    reviews: { rating: 5.0, count: 1 }
  },
  // Bundles
  {
    id: '13',
    handle: 'series-1-bundle',
    title: 'Series 1 Complete Collection',
    description: 'All three Series 1 hot sauces: Sweet Heat, Cucumber Madness, and Pineapple-Mango.',
    longDescription: 'Save when you buy all three Series 1 sauces together. Experience the perfect introduction to HellBound Sauces with our most popular balanced flavors.',
    price: 32.00,
    compareAtPrice: 36.00,
    images: ['/placeholder.svg'],
    category: 'bundle',
    heatLevel: 2,
    bestSeller: true,
    reviews: { rating: 5.0, count: 12 }
  },
  {
    id: '14',
    handle: 'ultimate-heat-pack',
    title: 'Ultimate Heat Pack',
    description: 'Our hottest sauces: Sapphire Dragon, Bangkok Burn, and Wide Awake.',
    longDescription: 'For serious heat seekers. This bundle includes our most intense Series 2 and 3 sauces for those who crave the burn.',
    price: 42.00,
    compareAtPrice: 47.00,
    images: ['/placeholder.svg'],
    category: 'bundle',
    heatLevel: 4,
    featured: true,
    reviews: { rating: 5.0, count: 8 }
  },
  {
    id: '15',
    handle: 'bbq-masters-collection',
    title: 'BBQ Masters Collection',
    description: 'All three premium BBQ rubs: Beekeepers Blend, Aztec Gold, and Wildwood Maple.',
    longDescription: 'Everything you need for exceptional BBQ. Get all three of our premium rubs and save. Perfect for the serious pitmaster.',
    price: 40.00,
    compareAtPrice: 45.00,
    images: ['/placeholder.svg'],
    category: 'bundle',
    heatLevel: 2,
    bestSeller: true,
    reviews: { rating: 5.0, count: 15 }
  }
];

export const collections: Collection[] = [
  {
    id: 'all',
    handle: 'all',
    title: 'All Products',
    description: 'Browse our complete collection of hot sauces, BBQ rubs, bundles, and merchandise.',
    image: '/placeholder.svg',
    products: ['1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11', '12', '13', '14', '15']
  },
  {
    id: 'hot-sauce',
    handle: 'hot-sauce',
    title: 'Hot Sauces',
    description: 'Artisan hot sauces crafted with bold flavors that complement food. Featuring unique flavors from Sweet Heat to Cucumber Madness.',
    image: '/placeholder.svg',
    products: ['1', '2', '3', '4', '5', '6', '7', '8', '9']
  },
  {
    id: 'bbq-rubs',
    handle: 'bbq-rubs',
    title: 'BBQ Rubs',
    description: 'Premium spice blends for the perfect crust on any meat. Wildwood Maple and Beekeepers Blend.',
    image: '/placeholder.svg',
    products: ['10', '11', '12']
  },
  {
    id: 'bundles',
    handle: 'bundles',
    title: 'Bundles',
    description: 'Save big with our curated bundles and gift sets.',
    image: '/placeholder.svg',
    products: ['13', '14', '15']
  },
  {
    id: 'merch-and-apparel',
    handle: 'merch-and-apparel',
    title: 'Merchandise',
    description: 'HellBound Sauces apparel and accessories featuring our striking tattoo-inspired artwork.',
    image: '/placeholder.svg',
    products: []
  }
];

export const getProductById = (id: string): Product | undefined => {
  return products.find(p => p.id === id);
};

export const getProductByHandle = (handle: string): Product | undefined => {
  return products.find(p => p.handle === handle);
};

export const getCollectionByHandle = (handle: string): Collection | undefined => {
  return collections.find(c => c.handle === handle);
};

export const getProductsInCollection = (collectionHandle: string): Product[] => {
  const collection = collections.find(c => c.handle === collectionHandle);
  if (!collection) return [];
  return collection.products
    .map(id => products.find(p => p.id === id))
    .filter((p): p is Product => p !== undefined);
};

export const getFeaturedProducts = (): Product[] => {
  return products.filter(p => p.featured).slice(0, 6);
};

export const getBestSellers = (): Product[] => {
  return products.filter(p => p.bestSeller).slice(0, 6);
};

export const getNewProducts = (): Product[] => {
  return products.filter(p => p.new).slice(0, 6);
};
