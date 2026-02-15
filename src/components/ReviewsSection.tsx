import { Star } from 'lucide-react';
import { useProductReviews, type Review } from '@/hooks/useProductReviews';
import { formatDistanceToNow } from 'date-fns';

interface ReviewsSectionProps {
  productHandle: string;
}

function StarRating({ rating }: { rating: number }) {
  return (
    <div className="flex gap-1">
      {[1, 2, 3, 4, 5].map((star) => (
        <Star
          key={star}
          className={`w-4 h-4 ${
            star <= rating
              ? 'fill-[hsl(var(--gold))] text-[hsl(var(--gold))]'
              : 'fill-[hsl(var(--muted))] text-[hsl(var(--muted))]'
          }`}
        />
      ))}
    </div>
  );
}

function ReviewCard({ review }: { review: Review }) {
  return (
    <div className="bg-card border border-border rounded-lg p-6 transition-all hover:border-primary/50">
      {/* Header */}
      <div className="flex items-start justify-between mb-3">
        <div>
          <div className="flex items-center gap-3 mb-1">
            <StarRating rating={review.rating} />
            {review.verified && (
              <span className="text-xs text-green-600 font-medium">Verified Purchase</span>
            )}
          </div>
          <div className="flex items-center gap-2 text-sm">
            <span className="font-medium text-foreground">{review.reviewer.name}</span>
            <span className="text-muted-foreground">•</span>
            <span className="text-muted-foreground">
              {formatDistanceToNow(new Date(review.createdAt), { addSuffix: true })}
            </span>
          </div>
        </div>
      </div>

      {/* Content */}
      {review.title && (
        <h4 className="font-heading text-base font-semibold mb-2 uppercase tracking-wide">
          {review.title}
        </h4>
      )}
      <p className="text-muted-foreground leading-relaxed">{review.body}</p>
    </div>
  );
}

function RatingsSummary({ stats }: { stats: ReturnType<typeof useProductReviews>['stats'] }) {
  if (stats.totalReviews === 0) return null;

  const percentage = (count: number) =>
    stats.totalReviews > 0 ? (count / stats.totalReviews) * 100 : 0;

  return (
    <div className="bg-card border border-border rounded-lg p-6 mb-8">
      <div className="flex items-center gap-6 mb-6">
        <div>
          <div className="text-5xl font-display text-primary mb-1">
            {stats.averageRating.toFixed(1)}
          </div>
          <StarRating rating={Math.round(stats.averageRating)} />
          <div className="text-sm text-muted-foreground mt-1">
            {stats.totalReviews} {stats.totalReviews === 1 ? 'review' : 'reviews'}
          </div>
        </div>

        <div className="flex-1 space-y-2">
          {[5, 4, 3, 2, 1].map((rating) => {
            const count = stats.ratingDistribution[rating as keyof typeof stats.ratingDistribution];
            const pct = percentage(count);

            return (
              <div key={rating} className="flex items-center gap-3">
                <span className="text-sm text-muted-foreground w-12">{rating} star</span>
                <div className="flex-1 h-2 bg-muted rounded-full overflow-hidden">
                  <div
                    className="h-full bg-[hsl(var(--gold))] transition-all"
                    style={{ width: `${pct}%` }}
                  />
                </div>
                <span className="text-sm text-muted-foreground w-12 text-right">{count}</span>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}

export function ReviewsSection({ productHandle }: ReviewsSectionProps) {
  const { reviews, stats, loading, error } = useProductReviews(productHandle);

  if (loading) {
    return (
      <section className="mb-20">
        <h2 className="font-display text-3xl mb-8">Customer Reviews</h2>
        <div className="text-muted-foreground">Loading reviews...</div>
      </section>
    );
  }

  if (error) {
    return (
      <section className="mb-20">
        <h2 className="font-display text-3xl mb-8">Customer Reviews</h2>
        <div className="text-muted-foreground">Unable to load reviews at this time.</div>
      </section>
    );
  }

  if (reviews.length === 0) {
    return (
      <section className="mb-20">
        <h2 className="font-display text-3xl mb-8">Customer Reviews</h2>
        <div className="bg-card border border-border rounded-lg p-8 text-center">
          <p className="text-muted-foreground">No reviews yet. Be the first to review this product!</p>
        </div>
      </section>
    );
  }

  return (
    <section className="mb-20">
      <h2 className="font-display text-3xl mb-8">Customer Reviews</h2>

      {/* Ratings Summary */}
      <RatingsSummary stats={stats} />

      {/* Review Cards */}
      <div className="space-y-4">
        {reviews.map((review) => (
          <ReviewCard key={review.id} review={review} />
        ))}
      </div>
    </section>
  );
}
