export interface Product {
  id: string;
  handle: string;
  title: string;
  description: string;
  longDescription?: string;
  price: number;
  compareAtPrice?: number;
  images: string[];
  category: 'hot-sauce' | 'rub' | 'bundle';
  heatLevel: 1 | 2 | 3 | 4 | 5;
  scoville?: string;
  ingredients?: string[];
  pairings?: string[];
  featured?: boolean;
  bestSeller?: boolean;
  new?: boolean;
  variants?: { id: string; title: string; price: number }[];
  reviews?: { rating: number; count: number };
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
  {
    id: '4',
    handle: 'scorpion-sting',
    title: 'Scorpion Sting',
    description: 'Trinidad Scorpion peppers deliver an unforgiving, face-melting heat.',
    longDescription: 'Not for the faint of heart. Our Scorpion Sting uses only the hottest Trinidad Scorpion peppers, fermented for 12 months to develop a complex, fruity flavor that precedes the devastating heat.',
    price: 16.99,
    images: ['/placeholder.svg'],
    category: 'hot-sauce',
    heatLevel: 5,
    scoville: '1,400,000-2,000,000 SHU',
    ingredients: ['Trinidad Scorpion Peppers', 'Apple Cider Vinegar', 'Garlic', 'Onion', 'Salt'],
    pairings: ['Extreme Wings', 'Chili', 'BBQ Challenges'],
    new: true,
    reviews: { rating: 4.9, count: 87 }
  },
  {
    id: '5',
    handle: 'garlic-ghost',
    title: 'Garlic Ghost',
    description: 'Roasted garlic meets ghost pepper in this savory-spicy blend.',
    longDescription: 'For garlic lovers who crave heat. We roast whole heads of garlic until caramelized, then blend them with ghost peppers and aged vinegar. The result is a rich, savory sauce with serious kick.',
    price: 13.99,
    images: ['/placeholder.svg'],
    category: 'hot-sauce',
    heatLevel: 4,
    scoville: '800,000-1,000,000 SHU',
    ingredients: ['Roasted Garlic', 'Ghost Peppers', 'White Wine Vinegar', 'Olive Oil', 'Herbs'],
    pairings: ['Pizza', 'Pasta', 'Bread', 'Roasted Vegetables'],
    featured: true,
    reviews: { rating: 4.8, count: 156 }
  },
  {
    id: '6',
    handle: 'citrus-reaper',
    title: 'Citrus Reaper',
    description: 'Bright citrus notes balance the extreme heat of Carolina Reapers.',
    longDescription: 'A unique combination of Meyer lemon, blood orange, and Carolina Reaper creates a sauce that\'s as complex as it is hot. The citrus hits first, then the reaper takes over.',
    price: 15.99,
    images: ['/placeholder.svg'],
    category: 'hot-sauce',
    heatLevel: 5,
    scoville: '1,500,000-2,200,000 SHU',
    ingredients: ['Carolina Reapers', 'Meyer Lemon', 'Blood Orange', 'Lime', 'Agave', 'Salt'],
    pairings: ['Seafood', 'Ceviche', 'Grilled Fish', 'Asian Dishes'],
    reviews: { rating: 4.6, count: 98 }
  },
  {
    id: '7',
    handle: 'hellbound-signature-rub',
    title: 'Hellbound Signature Rub',
    description: 'Our signature spice blend for the perfect BBQ crust.',
    longDescription: 'A perfectly balanced blend of smoked paprika, brown sugar, cayenne, and 12 secret spices. Creates an incredible bark on brisket, ribs, and pork shoulder.',
    price: 9.99,
    images: ['/placeholder.svg'],
    category: 'rub',
    heatLevel: 2,
    ingredients: ['Smoked Paprika', 'Brown Sugar', 'Cayenne', 'Garlic Powder', 'Onion Powder', 'Black Pepper', 'Cumin'],
    pairings: ['Brisket', 'Ribs', 'Pork Shoulder', 'Chicken'],
    bestSeller: true,
    reviews: { rating: 4.9, count: 267 }
  },
  {
    id: '8',
    handle: 'reaper-rub',
    title: 'Reaper Rub',
    description: 'Carolina Reaper-infused rub for extreme heat seekers.',
    longDescription: 'For those who want their BBQ with a serious kick. Ground Carolina Reapers combined with traditional BBQ spices create a rub that brings the heat while still delivering incredible flavor.',
    price: 11.99,
    images: ['/placeholder.svg'],
    category: 'rub',
    heatLevel: 5,
    ingredients: ['Carolina Reaper Powder', 'Smoked Paprika', 'Salt', 'Pepper', 'Garlic', 'Mustard Powder'],
    pairings: ['Wings', 'Ribs', 'Pulled Pork'],
    new: true,
    reviews: { rating: 4.7, count: 54 }
  },
  {
    id: '9',
    handle: 'coffee-cocoa-rub',
    title: 'Coffee Cocoa Rub',
    description: 'Rich coffee and dark cocoa create a complex, earthy crust.',
    longDescription: 'An unexpected combination that delivers incredible results. Freshly ground coffee, dark cocoa, and ancho chili create a deep, complex bark perfect for beef.',
    price: 10.99,
    images: ['/placeholder.svg'],
    category: 'rub',
    heatLevel: 1,
    ingredients: ['Ground Coffee', 'Dark Cocoa', 'Ancho Chili', 'Brown Sugar', 'Smoked Salt'],
    pairings: ['Brisket', 'Ribeye', 'Short Ribs'],
    featured: true,
    reviews: { rating: 4.8, count: 143 }
  },
  {
    id: '10',
    handle: 'ultimate-heat-bundle',
    title: 'Ultimate Heat Bundle',
    description: 'All 6 hot sauces at a special bundle price.',
    longDescription: 'Get the complete Hellbound hot sauce collection and save 20%. Perfect for heat seekers who want to experience our entire range of artisan sauces.',
    price: 69.99,
    compareAtPrice: 86.94,
    images: ['/placeholder.svg'],
    category: 'bundle',
    heatLevel: 5,
    reviews: { rating: 5.0, count: 89 }
  },
  {
    id: '11',
    handle: 'bbq-masters-bundle',
    title: 'BBQ Masters Bundle',
    description: 'All 3 rubs plus 2 sauces - everything you need for the perfect BBQ.',
    longDescription: 'The complete grillmaster kit. Includes all three signature rubs plus our Smoky Chipotle Inferno and Hellfire Habanero sauces.',
    price: 49.99,
    compareAtPrice: 59.95,
    images: ['/placeholder.svg'],
    category: 'bundle',
    heatLevel: 3,
    bestSeller: true,
    reviews: { rating: 4.9, count: 178 }
  },
  {
    id: '12',
    handle: 'starter-pack',
    title: 'Starter Pack',
    description: 'New to Hellbound? Start your journey with our 3 most popular sauces.',
    longDescription: 'The perfect introduction to Hellbound. Includes Smoky Chipotle Inferno, Hellfire Habanero, and Devil\'s Tongue - covering mild to extreme heat levels.',
    price: 34.99,
    compareAtPrice: 39.97,
    images: ['/placeholder.svg'],
    category: 'bundle',
    heatLevel: 3,
    featured: true,
    reviews: { rating: 4.8, count: 234 }
  }
];

export const collections: Collection[] = [
  {
    id: 'all',
    handle: 'all',
    title: 'All Products',
    description: 'Browse our complete collection of hot sauces, BBQ rubs, bundles, and merchandise.',
    image: '/placeholder.svg',
    products: ['1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11', '12']
  },
  {
    id: 'hot-sauces',
    handle: 'hot-sauces',
    title: 'Hot Sauces',
    description: 'Artisan hot sauces crafted with bold flavors that complement food. Featuring unique flavors from Sweet Heat to Cucumber Madness.',
    image: '/placeholder.svg',
    products: ['1', '2', '3', '4', '5', '6']
  },
  {
    id: 'bbq-rubs',
    handle: 'bbq-rubs',
    title: 'BBQ Rubs',
    description: 'Premium spice blends for the perfect crust on any meat. Wildwood Maple and Beekeepers Blend.',
    image: '/placeholder.svg',
    products: ['7', '8', '9']
  },
  {
    id: 'bundles',
    handle: 'bundles',
    title: 'Bundles',
    description: 'Save big with our curated bundles and gift sets.',
    image: '/placeholder.svg',
    products: ['10', '11', '12']
  },
  {
    id: 'merch',
    handle: 'merch',
    title: 'Merchandise',
    description: 'Coming soon: HellBound Sauces apparel and accessories featuring our striking tattoo-inspired artwork. Will be available when Shopify is connected.',
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

export const getProductsByCategory = (category: Product['category']): Product[] => {
  return products.filter(p => p.category === category);
};

export const getFeaturedProducts = (): Product[] => {
  return products.filter(p => p.featured);
};

export const getBestSellers = (): Product[] => {
  return products.filter(p => p.bestSeller);
};

export const getNewProducts = (): Product[] => {
  return products.filter(p => p.new);
};

export const getCollectionByHandle = (handle: string): Collection | undefined => {
  if (handle === 'all') {
    return {
      id: 'all',
      handle: 'all',
      title: 'All Products',
      description: 'Browse our complete collection of artisan hot sauces, BBQ rubs, and bundles.',
      image: '/placeholder.svg',
      products: products.map(p => p.id),
    };
  }
  return collections.find(c => c.handle === handle);
};

export const getProductsInCollection = (collectionHandle: string): Product[] => {
  if (collectionHandle === 'all') {
    return products;
  }
  const collection = getCollectionByHandle(collectionHandle);
  if (!collection) return [];
  return collection.products.map(id => getProductById(id)).filter(Boolean) as Product[];
};
