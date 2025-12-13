import { Link } from 'react-router-dom';
import { Building2, ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';

export function WholesaleCTA() {
  return (
    <section className="py-20 lg:py-28 relative overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-primary/10 via-charcoal to-background" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_hsl(var(--primary)/0.15)_0%,_transparent_60%)]" />

      <div className="container mx-auto px-4 lg:px-8 relative z-10">
        <div className="max-w-4xl mx-auto text-center">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-primary/10 border-2 border-primary/30 mb-6">
            <Building2 className="h-8 w-8 text-primary" />
          </div>

          <h2 className="font-display text-4xl lg:text-5xl mb-6">
            Bring Bold Flavors to Your Business
          </h2>

          <p className="text-lg text-muted-foreground mb-4 max-w-2xl mx-auto">
            By choosing to stock our premium hot sauces, you're not just adding a product to your
            shelves – you're bringing a world of rich, unique flavors to your clientele.
          </p>

          <p className="text-xl text-primary font-heading tracking-wide mb-8">
            Let's spice up your offerings together!
          </p>

          <div className="flex flex-wrap gap-4 justify-center">
            <Button asChild size="lg" className="bg-gradient-fire hover:opacity-90 font-heading tracking-wide group">
              <Link to="/wholesale">
                Wholesale Inquiry
                <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
              </Link>
            </Button>
            <Button asChild size="lg" variant="outline" className="border-2 border-primary hover:bg-primary/10 font-heading tracking-wide">
              <Link to="/contact">
                Contact Us
              </Link>
            </Button>
          </div>

          <div className="mt-12 grid sm:grid-cols-3 gap-6 text-sm">
            <div className="p-4 rounded-lg bg-card/50 border border-border/50">
              <div className="font-heading uppercase tracking-wide text-primary mb-1">Premium Products</div>
              <p className="text-muted-foreground">Bold flavors with striking artwork</p>
            </div>
            <div className="p-4 rounded-lg bg-card/50 border border-border/50">
              <div className="font-heading uppercase tracking-wide text-primary mb-1">5-Star Rated</div>
              <p className="text-muted-foreground">Loved by customers nationwide</p>
            </div>
            <div className="p-4 rounded-lg bg-card/50 border border-border/50">
              <div className="font-heading uppercase tracking-wide text-primary mb-1">Growing Brand</div>
              <p className="text-muted-foreground">Join our expanding network</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
