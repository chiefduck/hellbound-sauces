export interface Review {
  id: string;
  productId: string;
  author: string;
  rating: number;
  title: string;
  content: string;
  date: string;
  verified: boolean;
  helpful: number;
}

export const reviews: Review[] = [
  {
    id: '1',
    productId: '1',
    author: 'Mike T.',
    rating: 5,
    title: 'The best hot sauce I\'ve ever had!',
    content: 'I\'ve tried hundreds of hot sauces, and Devil\'s Tongue is hands down the best. The heat is intense but the flavor is incredible. The smoky notes really make it stand out from other super-hot sauces.',
    date: '2024-11-15',
    verified: true,
    helpful: 45
  },
  {
    id: '2',
    productId: '1',
    author: 'Sarah K.',
    rating: 5,
    title: 'Perfect balance of heat and flavor',
    content: 'Most extreme hot sauces sacrifice flavor for heat, but not this one. You can actually taste the peppers, the smoke, the complexity. It\'s art in a bottle.',
    date: '2024-11-10',
    verified: true,
    helpful: 32
  },
  {
    id: '3',
    productId: '2',
    author: 'Jason R.',
    rating: 5,
    title: 'Tropical heat heaven',
    content: 'The mango and pineapple really come through before the habanero kicks in. Perfect on fish tacos and grilled shrimp. My new go-to sauce.',
    date: '2024-11-12',
    verified: true,
    helpful: 28
  },
  {
    id: '4',
    productId: '3',
    author: 'Amanda L.',
    rating: 5,
    title: 'Smoky perfection',
    content: 'I put this on everything. Burgers, eggs, pizza, you name it. The smoky flavor is addictive and the heat level is perfect for everyday use.',
    date: '2024-11-08',
    verified: true,
    helpful: 56
  },
  {
    id: '5',
    productId: '7',
    author: 'BBQ Dad Steve',
    rating: 5,
    title: 'Competition-worthy bark every time',
    content: 'I\'ve won three local BBQ competitions using this rub. The flavor profile is perfectly balanced and it creates the most beautiful bark on brisket.',
    date: '2024-10-28',
    verified: true,
    helpful: 89
  },
  {
    id: '6',
    productId: '10',
    author: 'Chris M.',
    rating: 5,
    title: 'Worth every penny',
    content: 'Got this bundle as a gift and ended up ordering two more for friends. Every sauce in the collection is premium quality. You can taste the craftsmanship.',
    date: '2024-11-01',
    verified: true,
    helpful: 41
  }
];

export const getReviewsByProductId = (productId: string): Review[] => {
  return reviews.filter(r => r.productId === productId);
};

export const getAverageRating = (productId: string): number => {
  const productReviews = getReviewsByProductId(productId);
  if (productReviews.length === 0) return 0;
  return productReviews.reduce((acc, r) => acc + r.rating, 0) / productReviews.length;
};

export const getAllReviews = (): Review[] => {
  return reviews.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
};

export const getFeaturedReviews = (): Review[] => {
  return reviews.filter(r => r.helpful > 30).slice(0, 6);
};
