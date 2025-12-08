import { Star, Quote } from 'lucide-react';
import { getFeaturedReviews } from '@/data/reviews';
import { getProductById } from '@/data/products';

export function ReviewsCarousel() {
  const reviews = getFeaturedReviews();

  return (
    <section className="py-20 lg:py-28">
      <div className="container mx-auto px-4 lg:px-8">
        <div className="text-center mb-12">
          <span className="text-primary font-heading text-sm uppercase tracking-widest">What People Say</span>
          <h2 className="font-display text-4xl lg:text-5xl mt-2">Customer Reviews</h2>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {reviews.map((review, index) => {
            const product = getProductById(review.productId);
            
            return (
              <div
                key={review.id}
                className="p-6 rounded-xl bg-card border border-border hover:border-primary/30 transition-all duration-300 animate-fade-in-up"
                style={{ animationDelay: `${index * 100}ms` }}
              >
                <Quote className="h-8 w-8 text-primary/30 mb-4" />
                
                {/* Stars */}
                <div className="flex gap-1 mb-4">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      className={`h-4 w-4 ${i < review.rating ? 'fill-gold text-gold' : 'text-muted/30'}`}
                    />
                  ))}
                </div>

                <h4 className="font-heading text-lg uppercase tracking-wide mb-2">{review.title}</h4>
                <p className="text-muted-foreground text-sm mb-4">{review.content}</p>

                <div className="flex items-center justify-between pt-4 border-t border-border">
                  <div>
                    <p className="font-medium text-sm">{review.author}</p>
                    {product && (
                      <p className="text-xs text-muted-foreground">{product.title}</p>
                    )}
                  </div>
                  {review.verified && (
                    <span className="text-xs text-green-500 font-medium">✓ Verified</span>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
