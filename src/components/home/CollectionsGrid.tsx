import { Link } from 'react-router-dom';
import { ArrowRight, Flame, ChefHat, Gift } from 'lucide-react';
import { collections } from '@/data/products';
import { getCollectionImage } from '@/data/images';

const collectionIcons = {
  'hot-sauce': Flame,
  'bbq-rubs': ChefHat,
  'bundles': Gift,
};

export function CollectionsGrid() {
  // Filter out bundles collection (hidden for now - may use in future)
  const visibleCollections = collections.filter(c => c.handle !== 'bundles' && c.handle !== 'all' && c.handle !== 'merch-and-apparel');

  return (
    <section className="py-20 lg:py-28 bg-secondary/30">
      <div className="container mx-auto px-4 lg:px-8">
        <div className="text-center mb-12">
          <span className="text-primary font-heading text-sm uppercase tracking-widest">Shop by Category</span>
          <h2 className="font-display text-4xl lg:text-5xl mt-2">Our Collections</h2>
        </div>

        <div className="grid md:grid-cols-2 gap-6">
          {visibleCollections.map((collection, index) => {
            const Icon = collectionIcons[collection.handle as keyof typeof collectionIcons] || Flame;
            const collectionImage = getCollectionImage(collection.handle);
            
            return (
              <Link
                key={collection.id}
                to={`/collections/${collection.handle}`}
                className="group relative overflow-hidden rounded-xl border border-border hover:border-primary/50 transition-all duration-300 animate-fade-in-up"
                style={{ animationDelay: `${index * 150}ms` }}
              >
                <div className="aspect-[4/3] relative">
                  {/* Background image */}
                  <img 
                    src={collectionImage} 
                    alt={collection.title}
                    className="absolute inset-0 w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                  />
                  
                  {/* Overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-background via-background/70 to-background/30" />
                  
                  {/* Icon */}
                  <div className="absolute top-4 right-4 p-3 rounded-full bg-primary/20 backdrop-blur-sm">
                    <Icon className="h-6 w-6 text-primary" />
                  </div>
                  
                  {/* Content */}
                  <div className="absolute inset-0 p-6 flex flex-col justify-end">
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
