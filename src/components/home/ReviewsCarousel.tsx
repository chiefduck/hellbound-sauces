import { Star, Quote, ExternalLink, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import { getFeaturedReviews } from '@/data/reviews';
import { getProductByHandle, type Product } from '@/data/products';
import { Button } from '@/components/ui/button';
import judgemeReviews from '@/data/judgeme-reviews.json';

/**
 * Get a consistent seed based on current day
 * This ensures the same reviews show all day, but change daily
 */
function getDailySeed(): number {
  const today = new Date();
  const year = today.getFullYear();
  const month = today.getMonth();
  const day = today.getDate();
  return year * 10000 + month * 100 + day;
}

/**
 * Shuffle array using a seeded random number generator
 * This ensures consistent results for the same seed (same day)
 */
function shuffleWithSeed<T>(array: T[], seed: number): T[] {
  const shuffled = [...array];
  let currentSeed = seed;

  // Simple seeded random number generator
  const seededRandom = () => {
    currentSeed = (currentSeed * 9301 + 49297) % 233280;
    return currentSeed / 233280;
  };

  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(seededRandom() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }

  return shuffled;
}

/**
 * Normalize Judge.me product handles to match local product handles.
 * Judge.me includes "series-X-" prefixes and "-hot-sauce" suffixes
 * that the local product data doesn't use.
 */
function getProductFromHandle(productId: string): Product | undefined {
  // Try direct match first
  const direct = getProductByHandle(productId);
  if (direct) return direct;

  // Strip "series-X-" prefix (e.g. "series-3-blazin-bee-mustard" → "blazin-bee-mustard")
  const withoutPrefix = productId.replace(/^series-\d+-/, '');
  const afterPrefix = getProductByHandle(withoutPrefix);
  if (afterPrefix) return afterPrefix;

  // Strip "-hot-sauce" suffix (e.g. "sweet-heat-hot-sauce" → "sweet-heat")
  const withoutSuffix = withoutPrefix.replace(/-hot-sauce$/, '');
  return getProductByHandle(withoutSuffix);
}

export function ReviewsCarousel() {
  // Use cached Judge.me reviews if available, otherwise fall back to static reviews
  const hasJudgemeReviews = judgemeReviews.reviews && judgemeReviews.reviews.length > 0;
  const reviewSource = hasJudgemeReviews ? judgemeReviews.reviews : getFeaturedReviews();

  // Use daily rotation to show different reviews each day
  const dailySeed = getDailySeed();
  const shuffled = shuffleWithSeed(reviewSource, dailySeed);
  const visibleReviews = shuffled.slice(0, 6);

  // Note: Reviews are automatically updated monthly via GitHub Actions
  // See .github/workflows/update-reviews.yml for the automation

  return (
    <section className="py-20 lg:py-28">
      <div className="container mx-auto px-4 lg:px-8">
        <div className="text-center mb-12">
          <span className="text-primary font-heading text-sm uppercase tracking-widest">What People Say</span>
          <h2 className="font-display text-4xl lg:text-5xl mt-2">Customer Reviews</h2>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {visibleReviews.map((review, index) => {
            const product = getProductFromHandle(review.productId);

            const cardClassName = "p-6 rounded-xl bg-card border border-border hover:border-primary/30 transition-all duration-300 animate-fade-in-up flex flex-col" + (product ? " hover:shadow-md cursor-pointer" : "");

            const cardContent = (
              <>
                <div className="flex items-start justify-between mb-3">
                  <Quote className="h-6 w-6 text-primary/30 shrink-0" />
                  {product && (
                    <span className="text-xs font-medium text-primary/80 bg-primary/10 px-2 py-1 rounded-full leading-tight text-right max-w-[60%]">
                      {product.title}
                    </span>
                  )}
                </div>

                {/* Stars */}
                <div className="flex gap-1 mb-3">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      className={`h-4 w-4 ${i < review.rating ? 'fill-gold text-gold' : 'text-muted/30'}`}
                    />
                  ))}
                </div>

                {review.title && (
                  <h4 className="font-heading text-base uppercase tracking-wide mb-2">{review.title}</h4>
                )}
                <p className="text-muted-foreground text-sm mb-4 flex-1">{review.content}</p>

                <div className="flex items-center justify-between pt-4 border-t border-border">
                  <p className="font-medium text-sm">{review.author}</p>
                  <div className="flex items-center gap-2">
                    {review.verified && (
                      <span className="text-xs text-green-500 font-medium">✓ Verified</span>
                    )}
                    {product && (
                      <ArrowRight className="h-3.5 w-3.5 text-primary/50" />
                    )}
                  </div>
                </div>
              </>
            );

            return product ? (
              <Link
                key={review.id}
                to={`/products/${product.handle}`}
                className={cardClassName}
                style={{ animationDelay: `${index * 100}ms` }}
              >
                {cardContent}
              </Link>
            ) : (
              <div
                key={review.id}
                className={cardClassName}
                style={{ animationDelay: `${index * 100}ms` }}
              >
                {cardContent}
              </div>
            );
          })}
        </div>

        {/* Leave a Review CTA */}
        <div className="mt-12 text-center">
          <div className="inline-block p-8 rounded-xl bg-gradient-to-br from-card via-card to-secondary border border-border">
            <h3 className="font-display text-2xl mb-3">Love Our Sauces?</h3>
            <p className="text-muted-foreground mb-6 max-w-md">
              Share your experience and help others discover the perfect heat level for their taste!
            </p>
            <Button asChild size="lg" className="bg-gradient-fire hover:opacity-90 font-heading text-lg tracking-wide group">
              <a
                href="https://maps.app.goo.gl/uvBTRmeT7HRJyN4h8"
                target="_blank"
                rel="noopener noreferrer"
              >
                Leave a Review
                <ExternalLink className="ml-2 h-5 w-5 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
              </a>
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}
