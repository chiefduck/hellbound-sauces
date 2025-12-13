import { Link } from 'react-router-dom';
import { ArrowRight, Flame } from 'lucide-react';
import { Button } from '@/components/ui/button';

export function BrandStory() {
  return (
    <section className="py-20 lg:py-28 relative overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-background via-charcoal to-background" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_left,_hsl(var(--primary)/0.1)_0%,_transparent_50%)]" />
      
      <div className="container mx-auto px-4 lg:px-8 relative z-10">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Image */}
          <div className="relative animate-fade-in-up">
            <div className="aspect-[4/3] rounded-xl overflow-hidden border border-border bg-gradient-to-br from-secondary/80 to-secondary/40 backdrop-blur">
              <div className="w-full h-full flex items-center justify-center p-8">
                <img
                  src="/logo.png"
                  alt="Hellbound Hot Sauce - Premium Artisan Hot Sauces"
                  className="max-w-[70%] max-h-[70%] object-contain drop-shadow-2xl"
                />
              </div>
            </div>
            {/* Decorative elements */}
            <div className="absolute -bottom-4 -right-4 w-24 h-24 border-2 border-primary/30 rounded-xl" />
            <div className="absolute -top-4 -left-4 w-16 h-16 border-2 border-accent/30 rounded-xl" />
          </div>

          {/* Content */}
          <div className="animate-fade-in-up" style={{ animationDelay: '200ms' }}>
            <span className="text-primary font-heading text-sm uppercase tracking-widest">Our Story</span>
            <h2 className="font-display text-4xl lg:text-5xl mt-2 mb-6">Born From a Passion for Bold Flavors</h2>

            <div className="space-y-4 text-muted-foreground">
              <p>
                HellBound Sauces originated from Scott's kitchen experiments with hot sauce ingredients.
                What started as a personal passion project—sharing small-batch creations with loved ones—evolved
                into a commercial venture after overwhelming positive feedback and numerous requests from friends and family.
              </p>
              <p>
                Scott's approach prioritized balance over mere heat intensity, creating sauces that complement
                food, delivering bold flavors with just the right kick, rather than simply maximizing spice levels.
              </p>
              <p>
                Partnering with talented artist Aldo Gallegos, they developed HellBound's distinctive
                striking, tattoo-inspired artwork that perfectly captures the brand's daring and creative essence—from
                Pineapple Mango to Cucumber Madness and Sweet Heat.
              </p>
            </div>

            <Button asChild size="lg" className="mt-8 bg-gradient-fire hover:opacity-90 font-heading tracking-wide group">
              <Link to="/about">
                Learn More About Us
                <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
              </Link>
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}
