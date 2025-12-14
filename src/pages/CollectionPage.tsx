import { useState, useMemo } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Layout } from '@/components/layout/Layout';
import { ProductGrid } from '@/components/product/ProductGrid';
import { useShopifyCollection, useShopifyProducts } from '@/hooks/useShopifyProducts';
import { getCollectionImage } from '@/data/images';
import { Flame, Loader2, SlidersHorizontal } from 'lucide-react';
import { SEOHead, CollectionSchema, BreadcrumbSchema } from '@/components/seo';
import { Button } from '@/components/ui/button';
import { Product } from '@/data/products';

// Suggest alternative handles based on common patterns
function suggestAlternativeHandles(handle: string): string[] {
  const suggestions: string[] = [];

  // Try singular/plural variations
  if (handle.endsWith('s')) {
    suggestions.push(handle.slice(0, -1)); // Remove 's'
  } else {
    suggestions.push(handle + 's'); // Add 's'
  }

  // Try with/without hyphens
  if (handle.includes('-')) {
    suggestions.push(handle.replace(/-/g, '')); // Remove hyphens
    suggestions.push(handle.replace(/-/g, '_')); // Replace with underscores
  } else {
    // Try adding common prefixes/suffixes
    const words = handle.split(/(?=[A-Z])/); // Split on capital letters
    if (words.length > 1) {
      suggestions.push(words.join('-').toLowerCase());
    }
  }

  // Common variations based on actual Shopify handles
  const variations: Record<string, string[]> = {
    'hot-sauces': ['hot-sauce'], // Correct: hot-sauce (singular)
    'hot-sauce': ['hot-sauces'], // Alternative
    'bbq-rubs': ['bbq-rub', 'rubs', 'rub', 'barbecue-rubs'],
    'merch': ['merch-and-apparel', 'merchandise', 'apparel'], // Correct: merch-and-apparel
    'merch-and-apparel': ['merch', 'apparel'],
    'bundles': ['bundle', 'sets', 'gift-sets'],
  };

  if (variations[handle]) {
    suggestions.push(...variations[handle]);
  }

  return [...new Set(suggestions)]; // Remove duplicates
}

export default function CollectionPage() {
  const { handle } = useParams<{ handle: string }>();
  const { collection, loading, error } = useShopifyCollection(handle || '');
  const { products: allProducts, loading: loadingAllProducts } = useShopifyProducts();

  // Filter states
  const [sortBy, setSortBy] = useState<'featured' | 'price-asc' | 'price-desc' | 'name'>('featured');
  const [filterCategory, setFilterCategory] = useState<'all' | 'hot-sauce' | 'rub' | 'bundle' | 'merch'>('all');
  const [filterHeatLevel, setFilterHeatLevel] = useState<'all' | 1 | 2 | 3 | 4 | 5>('all');
  const [showFilters, setShowFilters] = useState(false);

  // Handle "all" collection - show all products
  const isAllCollection = handle === 'all';

  // Filter and sort products
  const filteredAndSortedProducts = useMemo(() => {
    let products = isAllCollection ? allProducts : (collection?.products || []);

    // Apply category filter
    if (filterCategory !== 'all') {
      products = products.filter(p => p.category === filterCategory);
    }

    // Apply heat level filter (only filter products that have heat levels)
    if (filterHeatLevel !== 'all') {
      products = products.filter(p => p.heatLevel && p.heatLevel === filterHeatLevel);
    }

    // Apply sorting
    const sorted = [...products];
    switch (sortBy) {
      case 'price-asc':
        sorted.sort((a, b) => a.price - b.price);
        break;
      case 'price-desc':
        sorted.sort((a, b) => b.price - a.price);
        break;
      case 'name':
        sorted.sort((a, b) => a.title.localeCompare(b.title));
        break;
      case 'featured':
      default:
        sorted.sort((a, b) => {
          if (a.featured && !b.featured) return -1;
          if (!a.featured && b.featured) return 1;
          return 0;
        });
    }

    return sorted;
  }, [isAllCollection, allProducts, collection, filterCategory, filterHeatLevel, sortBy]);

  if (loading || (isAllCollection && loadingAllProducts)) {
    return (
      <Layout>
        <div className="container mx-auto px-4 py-20 flex flex-col items-center justify-center min-h-[60vh]">
          <Loader2 className="h-12 w-12 text-primary animate-spin mb-4" />
          <p className="text-muted-foreground">Loading products from Shopify...</p>
        </div>
      </Layout>
    );
  }

  if (error && !isAllCollection) {
    return (
      <Layout>
        <div className="container mx-auto px-4 py-20 text-center">
          <h1 className="font-display text-4xl mb-4 text-red-500">Error Loading Collection</h1>
          <p className="text-muted-foreground mb-4">{error.message}</p>
          <p className="text-sm text-muted-foreground mb-2">Requested handle: {handle}</p>
          <p className="text-sm text-muted-foreground">Check browser console for details</p>
        </div>
      </Layout>
    );
  }

  // For "all" collection, create a virtual collection
  if (isAllCollection) {
    const allCollection = {
      id: 'all',
      handle: 'all',
      title: 'All Products',
      description: 'Browse our complete collection of hot sauces, BBQ rubs, and bundles.',
      image: getCollectionImage('all'), // Use local image for virtual "all" collection
      products: allProducts,
    };

    return (
      <Layout>
        <SEOHead
          title="All Products | Shop Premium Hot Sauces & BBQ Rubs"
          description={allCollection.description}
          canonical="/collections/all"
        />
        <CollectionSchema collection={allCollection} products={allProducts} />
        <BreadcrumbSchema items={[
          { name: 'Home', url: '/' },
          { name: 'All Products', url: '/collections/all' }
        ]} />

        {/* Hero */}
        <section className="py-16 lg:py-24 relative overflow-hidden">
          <div className="absolute inset-0">
            <img
              src={allCollection.image}
              alt="All Products"
              className="w-full h-full object-cover opacity-20"
            />
            <div className="absolute inset-0 bg-gradient-to-b from-background/50 via-background to-background" />
          </div>
          <div className="container mx-auto px-4 lg:px-8 relative z-10 text-center">
            <div className="flex items-center justify-center gap-2 text-primary font-heading text-sm uppercase tracking-widest mb-4">
              <Flame className="h-4 w-4" />
              Shop Collection
            </div>
            <h1 className="font-display text-5xl lg:text-6xl mb-4">All Products</h1>
            {/* Hidden until client feedback - description available at allCollection.description */}
          </div>
        </section>

        {/* Products */}
        <section className="pb-20 lg:pb-28">
          <div className="container mx-auto px-4 lg:px-8">
            {/* Filter Bar */}
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-8">
              <p className="text-muted-foreground">
                {filteredAndSortedProducts.length} product{filteredAndSortedProducts.length !== 1 ? 's' : ''}
              </p>

              <div className="flex flex-wrap gap-3 w-full sm:w-auto">
                {/* Sort */}
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value as any)}
                  className="px-4 py-2 rounded-lg bg-card border border-border text-sm font-heading uppercase tracking-wide focus:outline-none focus:ring-2 focus:ring-primary"
                >
                  <option value="featured">Featured</option>
                  <option value="price-asc">Price: Low to High</option>
                  <option value="price-desc">Price: High to Low</option>
                  <option value="name">Name: A-Z</option>
                </select>

                {/* Category Filter */}
                <select
                  value={filterCategory}
                  onChange={(e) => setFilterCategory(e.target.value as any)}
                  className="px-4 py-2 rounded-lg bg-card border border-border text-sm font-heading uppercase tracking-wide focus:outline-none focus:ring-2 focus:ring-primary"
                >
                  <option value="all">All Categories</option>
                  <option value="hot-sauce">Hot Sauces</option>
                  <option value="rub">BBQ Rubs</option>
                  <option value="bundle">Bundles</option>
                  <option value="merch">Merch</option>
                </select>

                {/* Heat Level Filter */}
                <select
                  value={filterHeatLevel}
                  onChange={(e) => setFilterHeatLevel(e.target.value === 'all' ? 'all' : parseInt(e.target.value) as any)}
                  className="px-4 py-2 rounded-lg bg-card border border-border text-sm font-heading uppercase tracking-wide focus:outline-none focus:ring-2 focus:ring-primary"
                >
                  <option value="all">All Heat Levels</option>
                  <option value="1">🌶️ Mild</option>
                  <option value="2">🌶️🌶️ Medium</option>
                  <option value="3">🌶️🌶️🌶️ Hot</option>
                  <option value="4">🌶️🌶️🌶️🌶️ Very Hot</option>
                  <option value="5">🌶️🌶️🌶️🌶️🌶️ Extreme</option>
                </select>
              </div>
            </div>

            <ProductGrid products={filteredAndSortedProducts} columns={3} />
          </div>
        </section>
      </Layout>
    );
  }

  if (!collection) {
    const suggestions = suggestAlternativeHandles(handle || '');

    return (
      <Layout>
        <div className="container mx-auto px-4 py-20 max-w-3xl">
          <h1 className="font-display text-4xl mb-4 text-center">Collection Not Found</h1>
          <p className="text-muted-foreground mb-6 text-center">Collection handle "{handle}" doesn't exist in Shopify.</p>

          {suggestions.length > 0 && (
            <div className="bg-card border border-border rounded-lg p-6 mb-6">
              <h2 className="font-heading text-lg mb-3">Try these alternative handles:</h2>
              <div className="flex flex-wrap gap-2">
                {suggestions.map((suggestion) => (
                  <code key={suggestion} className="bg-secondary px-3 py-1.5 rounded text-sm">
                    {suggestion}
                  </code>
                ))}
              </div>
            </div>
          )}

          <div className="bg-card border border-border rounded-lg p-6 mb-6">
            <h2 className="font-heading text-lg mb-3">How to find the correct handle:</h2>
            <ol className="list-decimal list-inside space-y-2 text-sm text-muted-foreground">
              <li>Go to your Shopify Admin → Products → Collections</li>
              <li>Find the collection you want (e.g., "Hot Sauces")</li>
              <li>Click on it and check the URL - the handle is the last part</li>
              <li>Example: <code className="bg-secondary px-1 py-0.5 rounded">/admin/collections/hot-sauce</code> means the handle is <strong>"hot-sauce"</strong></li>
              <li>Update the navigation in <code className="bg-secondary px-1 py-0.5 rounded">src/components/layout/Header.tsx</code> to use the correct handle</li>
            </ol>
            <p className="mt-4 text-sm text-muted-foreground">
              <strong>Tip:</strong> Check your browser console (F12) for detailed logs about what Shopify returned.
            </p>
          </div>

          <div className="text-center">
            <Link to="/collections/all" className="text-primary hover:underline inline-flex items-center gap-2">
              ← Back to All Products
            </Link>
          </div>
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      <SEOHead
        title={`${collection.title} | Shop Premium ${collection.title}`}
        description={collection.description}
        canonical={`/collections/${collection.handle}`}
      />
      <CollectionSchema collection={collection} products={filteredAndSortedProducts} />
      <BreadcrumbSchema items={[
        { name: 'Home', url: '/' },
        { name: collection.title, url: `/collections/${collection.handle}` }
      ]} />
      {/* Hero */}
      <section className="py-16 lg:py-24 relative overflow-hidden">
        <div className="absolute inset-0">
          <img
            src={collection.image}
            alt={collection.title}
            className="w-full h-full object-cover opacity-20"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-background/50 via-background to-background" />
        </div>
        <div className="container mx-auto px-4 lg:px-8 relative z-10 text-center">
          <div className="flex items-center justify-center gap-2 text-primary font-heading text-sm uppercase tracking-widest mb-4">
            <Flame className="h-4 w-4" />
            Shop Collection
          </div>
          <h1 className="font-display text-5xl lg:text-6xl mb-4">{collection.title}</h1>
          {/* Hidden until client feedback - description available at collection.description */}
        </div>
      </section>

      {/* Products */}
      <section className="pb-20 lg:pb-28">
        <div className="container mx-auto px-4 lg:px-8">
          {/* Filter Bar */}
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-8">
            <p className="text-muted-foreground">
              {filteredAndSortedProducts.length} product{filteredAndSortedProducts.length !== 1 ? 's' : ''}
            </p>

            <div className="flex flex-wrap gap-3 w-full sm:w-auto">
              {/* Sort */}
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value as any)}
                className="px-4 py-2 rounded-lg bg-card border border-border text-sm font-heading uppercase tracking-wide focus:outline-none focus:ring-2 focus:ring-primary"
              >
                <option value="featured">Featured</option>
                <option value="price-asc">Price: Low to High</option>
                <option value="price-desc">Price: High to Low</option>
                <option value="name">Name: A-Z</option>
              </select>


              {/* Heat Level Filter */}
              <select
                value={filterHeatLevel}
                onChange={(e) => setFilterHeatLevel(e.target.value === 'all' ? 'all' : parseInt(e.target.value) as any)}
                className="px-4 py-2 rounded-lg bg-card border border-border text-sm font-heading uppercase tracking-wide focus:outline-none focus:ring-2 focus:ring-primary"
              >
                <option value="all">All Heat Levels</option>
                <option value="1">🌶️ Mild</option>
                <option value="2">🌶️🌶️ Medium</option>
                <option value="3">🌶️🌶️🌶️ Hot</option>
                <option value="4">🌶️🌶️🌶️🌶️ Very Hot</option>
                <option value="5">🌶️🌶️🌶️🌶️🌶️ Extreme</option>
              </select>
            </div>
          </div>

          <ProductGrid products={filteredAndSortedProducts} columns={3} />
        </div>
      </section>
    </Layout>
  );
}
