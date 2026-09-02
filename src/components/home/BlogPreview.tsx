import { ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';

/** The blog moved to blog.hellboundsauces.com (written and published on a schedule by Update My
 *  SEO). The old hardcoded posts in @/data/blog stay reachable at /blog/<slug> but are no longer
 *  promoted here as "latest": they're from 2024. */
export function BlogPreview() {
  return (
    <section className="py-20 lg:py-28 bg-secondary/30">
      <div className="container mx-auto px-4 lg:px-8">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-end gap-6">
          <div className="max-w-2xl">
            <span className="text-primary font-heading text-sm uppercase tracking-widest">From the Blog</span>
            <h2 className="font-display text-4xl lg:text-5xl mt-2">Heat, sauce, and BBQ, fresh every week</h2>
            <p className="text-muted-foreground mt-4">New articles on picking your heat level, pairing sauces with food, and getting the most out of every bottle.</p>
          </div>
          <Button asChild size="lg" className="font-heading tracking-wide group">
            <a href="https://blog.hellboundsauces.com">
              Read the blog
              <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
            </a>
          </Button>
        </div>
      </div>
    </section>
  );
}
