import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import { getFeaturedProducts } from '@/data/products';
import { ProductGrid } from '@/components/product/ProductGrid';
import { Button } from '@/components/ui/button';

export function FeaturedProducts() {
  const products = getFeaturedProducts();

  return (
    <section className="py-20 lg:py-28">
      <div className="container mx-auto px-4 lg:px-8">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-end gap-4 mb-12">
          <div>
            <span className="text-primary font-heading text-sm uppercase tracking-widest">Our Favorites</span>
            <h2 className="font-display text-4xl lg:text-5xl mt-2">Featured Products</h2>
          </div>
          <Button asChild variant="ghost" className="font-heading tracking-wide group">
            <Link to="/collections/hot-sauces">
              View All
              <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
            </Link>
          </Button>
        </div>

        <ProductGrid products={products} columns={4} />
      </div>
    </section>
  );
}
