import { Link } from 'react-router-dom';
import { ArrowRight, Flame, ChefHat, Gift } from 'lucide-react';
import { collections } from '@/data/products';

const collectionIcons = {
  'hot-sauces': Flame,
  'bbq-rubs': ChefHat,
  'bundles': Gift,
};

export function CollectionsGrid() {
  return (
    <section className="py-20 lg:py-28 bg-secondary/30">
      <div className="container mx-auto px-4 lg:px-8">
        <div className="text-center mb-12">
          <span className="text-primary font-heading text-sm uppercase tracking-widest">Shop by Category</span>
          <h2 className="font-display text-4xl lg:text-5xl mt-2">Our Collections</h2>
        </div>

        <div className="grid md:grid-cols-3 gap-6">
          {collections.map((collection, index) => {
            const Icon = collectionIcons[collection.handle as keyof typeof collectionIcons] || Flame;
            
            return (
              <Link
                key={collection.id}
                to={`/collections/${collection.handle}`}
                className="group relative overflow-hidden rounded-xl bg-card border border-border hover:border-primary/50 transition-all duration-300 animate-fade-in-up"
                style={{ animationDelay: `${index * 150}ms` }}
              >
                <div className="aspect-[4/3] relative">
                  {/* Background gradient */}
                  <div className="absolute inset-0 bg-gradient-to-br from-primary/20 via-transparent to-accent/20 opacity-50 group-hover:opacity-100 transition-opacity" />
                  
                  {/* Icon */}
                  <div className="absolute inset-0 flex items-center justify-center">
                    <Icon className="h-20 w-20 text-primary/30 group-hover:text-primary/50 group-hover:scale-110 transition-all duration-300" />
                  </div>
                  
                  {/* Content */}
                  <div className="absolute inset-0 p-6 flex flex-col justify-end bg-gradient-to-t from-background via-background/50 to-transparent">
                    <h3 className="font-display text-2xl lg:text-3xl mb-2 group-hover:text-primary transition-colors">
                      {collection.title}
                    </h3>
                    <p className="text-muted-foreground text-sm mb-4">{collection.description}</p>
                    <div className="flex items-center gap-2 text-primary font-heading text-sm uppercase tracking-wide">
                      Shop Now
                      <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                    </div>
                  </div>
                </div>
              </Link>
            );
          })}
        </div>
      </div>
    </section>
  );
}
