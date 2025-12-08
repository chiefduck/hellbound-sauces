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
  {
    id: '1',
    handle: 'devils-tongue',
    title: "Devil's Tongue",
    description: 'A fiery blend of ghost peppers and Carolina Reapers with smoky undertones.',
    longDescription: 'Our signature sauce that started it all. Devil\'s Tongue combines the intense heat of ghost peppers and Carolina Reapers with a complex smoky flavor profile. Aged in oak barrels for 6 months, this artisan hot sauce delivers a slow burn that builds with each bite.',
    price: 14.99,
    images: ['/placeholder.svg'],
    category: 'hot-sauce',
    heatLevel: 5,
    scoville: '1,000,000+ SHU',
    ingredients: ['Ghost Peppers', 'Carolina Reapers', 'Aged Vinegar', 'Garlic', 'Smoked Salt', 'Oak Extract'],
    pairings: ['Wings', 'BBQ Ribs', 'Tacos', 'Eggs'],
    featured: true,
    bestSeller: true,
    reviews: { rating: 4.9, count: 234 }
  },
  {
    id: '2',
    handle: 'hellfire-habanero',
    title: 'Hellfire Habanero',
    description: 'Classic habanero heat with tropical mango and pineapple notes.',
    longDescription: 'A Caribbean-inspired masterpiece that balances the fierce heat of habaneros with sweet tropical fruits. Perfect for those who want intense flavor without overwhelming spice.',
    price: 12.99,
    images: ['/placeholder.svg'],
    category: 'hot-sauce',
    heatLevel: 3,
    scoville: '150,000-350,000 SHU',
    ingredients: ['Habanero Peppers', 'Mango', 'Pineapple', 'Lime', 'Cilantro', 'Sea Salt'],
    pairings: ['Fish Tacos', 'Grilled Chicken', 'Shrimp', 'Rice Bowls'],
    featured: true,
    reviews: { rating: 4.8, count: 189 }
  },
  {
    id: '3',
    handle: 'smoky-chipotle-inferno',
    title: 'Smoky Chipotle Inferno',
    description: 'Deep smoky chipotle flavor with a perfect medium heat.',
    longDescription: 'Slow-roasted chipotles meet aged balsamic and honey in this perfectly balanced sauce. The smoke hits first, followed by a warm, lingering heat that complements rather than overwhelms.',
    price: 11.99,
    images: ['/placeholder.svg'],
    category: 'hot-sauce',
    heatLevel: 2,
    scoville: '15,000-30,000 SHU',
    ingredients: ['Chipotle Peppers', 'Tomatoes', 'Balsamic Vinegar', 'Honey', 'Garlic', 'Cumin'],
    pairings: ['Burgers', 'Steaks', 'Nachos', 'Burritos'],
    bestSeller: true,
    reviews: { rating: 4.7, count: 312 }
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
    id: 'hot-sauces',
    handle: 'hot-sauces',
    title: 'Hot Sauces',
    description: 'Artisan hot sauces crafted with the world\'s hottest peppers.',
    image: '/placeholder.svg',
    products: ['1', '2', '3', '4', '5', '6']
  },
  {
    id: 'bbq-rubs',
    handle: 'bbq-rubs',
    title: 'BBQ Rubs',
    description: 'Premium spice blends for the perfect crust on any meat.',
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
