export interface BlogPost {
  id: string;
  slug: string;
  title: string;
  excerpt: string;
  content: string;
  image: string;
  author: string;
  date: string;
  category: string;
  readTime: number;
  featured?: boolean;
}

export const blogPosts: BlogPost[] = [
  {
    id: '1',
    slug: 'ultimate-guide-to-carolina-reapers',
    title: 'The Ultimate Guide to Carolina Reapers',
    excerpt: 'Everything you need to know about the world\'s hottest pepper and how we use it in our sauces.',
    content: `The Carolina Reaper has held the Guinness World Record for the world's hottest pepper since 2013...`,
    image: '/placeholder.svg',
    author: 'Chef Marcus',
    date: '2024-11-20',
    category: 'Pepper Guide',
    readTime: 8,
    featured: true
  },
  {
    id: '2',
    slug: 'perfect-bbq-brisket-guide',
    title: 'The Perfect BBQ Brisket: A Complete Guide',
    excerpt: 'Master the art of smoking brisket with our step-by-step guide and signature rub.',
    content: `Brisket is the king of BBQ, and with our signature rub, you'll create competition-worthy results...`,
    image: '/placeholder.svg',
    author: 'Pitmaster John',
    date: '2024-11-15',
    category: 'BBQ Tips',
    readTime: 12,
    featured: true
  },
  {
    id: '3',
    slug: 'scoville-scale-explained',
    title: 'The Scoville Scale Explained',
    excerpt: 'Understanding heat levels and what makes peppers so hot.',
    content: `The Scoville scale measures the pungency of chili peppers based on capsaicin concentration...`,
    image: '/placeholder.svg',
    author: 'Dr. Spice',
    date: '2024-11-10',
    category: 'Education',
    readTime: 6
  },
  {
    id: '4',
    slug: 'hot-sauce-food-pairings',
    title: 'Hot Sauce Food Pairings: A Flavor Guide',
    excerpt: 'Learn which sauces pair best with different foods to elevate your meals.',
    content: `Pairing the right hot sauce with your food can transform a good meal into an extraordinary one...`,
    image: '/placeholder.svg',
    author: 'Chef Marcus',
    date: '2024-11-05',
    category: 'Food Pairing',
    readTime: 7
  },
  {
    id: '5',
    slug: 'fermentation-process',
    title: 'The Art of Fermentation in Hot Sauce',
    excerpt: 'How we ferment our peppers for months to develop complex flavors.',
    content: `Fermentation is what separates artisan hot sauces from mass-produced bottles...`,
    image: '/placeholder.svg',
    author: 'Chef Marcus',
    date: '2024-10-28',
    category: 'Behind the Scenes',
    readTime: 9
  },
  {
    id: '6',
    slug: 'building-hot-sauce-tolerance',
    title: 'Building Your Spice Tolerance',
    excerpt: 'Tips for gradually increasing your heat tolerance and enjoying hotter sauces.',
    content: `Building spice tolerance is a journey, not a destination. Here's how to train your palate...`,
    image: '/placeholder.svg',
    author: 'Dr. Spice',
    date: '2024-10-20',
    category: 'Education',
    readTime: 5
  }
];

export const getBlogPostBySlug = (slug: string): BlogPost | undefined => {
  return blogPosts.find(p => p.slug === slug);
};

export const getFeaturedPosts = (): BlogPost[] => {
  return blogPosts.filter(p => p.featured);
};

export const getPostsByCategory = (category: string): BlogPost[] => {
  return blogPosts.filter(p => p.category === category);
};

export const getCategories = (): string[] => {
  return [...new Set(blogPosts.map(p => p.category))];
};

export const getRecentPosts = (limit: number = 3): BlogPost[] => {
  return blogPosts.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()).slice(0, limit);
};
