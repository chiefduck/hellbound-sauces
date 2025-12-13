import { Link } from 'react-router-dom';
import { ArrowRight, Flame, Award, Leaf } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { images } from '@/data/images';

export function Hero() {
  return (
    <section className="relative min-h-[90vh] flex items-center overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-dark">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_hsl(var(--primary)/0.15)_0%,_transparent_70%)]" />
        <img 
          src={images.hero} 
          alt="Hellbound Hot Sauce" 
          className="absolute inset-0 w-full h-full object-cover opacity-30"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-background via-background/80 to-transparent" />
        {/* Animated glow effects */}
        <div className="absolute bottom-0 left-1/4 w-96 h-96 bg-primary/20 rounded-full blur-[100px] animate-pulse" />
        <div className="absolute top-1/4 right-1/4 w-64 h-64 bg-accent/20 rounded-full blur-[80px] animate-pulse" style={{ animationDelay: '1s' }} />
      </div>

      <div className="container mx-auto px-4 lg:px-8 relative z-10">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Content */}
          <div className="text-center lg:text-left">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 border border-primary/20 mb-6 animate-fade-in">
              <Flame className="h-4 w-4 text-primary" />
              <span className="text-sm font-medium text-primary">Artisan Crafted • Small Batch</span>
            </div>
            
            <h1 className="font-display text-5xl sm:text-6xl lg:text-7xl xl:text-8xl leading-none mb-6 animate-fade-in-up">
              <span className="text-gradient-fire">EMBRACE</span>
              <br />
              <span className="text-foreground">THE HEAT</span>
            </h1>
            
            <p className="text-xl text-muted-foreground max-w-xl mx-auto lg:mx-0 mb-8 animate-fade-in-up" style={{ animationDelay: '200ms' }}>
              Premium hot sauces and BBQ rubs crafted with the world's hottest peppers. 
              Aged to perfection. Built for flavor.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start animate-fade-in-up" style={{ animationDelay: '400ms' }}>
              <Button asChild size="lg" className="bg-gradient-fire hover:opacity-90 text-lg font-heading tracking-wide group">
                <Link to="/collections/hot-sauces">
                  Shop Hot Sauces
                  <ArrowRight className="ml-2 h-5 w-5 transition-transform group-hover:translate-x-1" />
                </Link>
              </Button>
              <Button asChild variant="outline" size="lg" className="text-lg font-heading tracking-wide border-border hover:bg-secondary">
                <Link to="/heat-guide">
                  Explore Heat Levels
                </Link>
              </Button>
            </div>

            {/* Trust badges */}
            <div className="flex flex-wrap gap-6 justify-center lg:justify-start mt-12 animate-fade-in-up" style={{ animationDelay: '600ms' }}>
              <div className="flex items-center gap-2 text-muted-foreground">
                <Award className="h-5 w-5 text-gold" />
                <span className="text-sm">Award Winning</span>
              </div>
              <div className="flex items-center gap-2 text-muted-foreground">
                <Leaf className="h-5 w-5 text-green-500" />
                <span className="text-sm">All Natural</span>
              </div>
              <div className="flex items-center gap-2 text-muted-foreground">
                <Flame className="h-5 w-5 text-primary" />
                <span className="text-sm">Small Batch</span>
              </div>
            </div>
          </div>

          {/* Hero Image */}
          <div className="relative animate-fade-in-up hidden lg:block" style={{ animationDelay: '300ms' }}>
            <div className="relative aspect-square max-w-lg mx-auto">
              {/* Glow effect */}
              <div className="absolute inset-0 bg-primary/30 rounded-full blur-[60px] animate-pulse-glow" />

              {/* Logo image */}
              <div className="relative w-full h-full flex items-center justify-center">
                <img
                  src="/logo.png"
                  alt="HellBound Sauces Logo"
                  className="w-3/4 h-3/4 object-contain"
                />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-bounce">
        <div className="w-6 h-10 rounded-full border-2 border-muted-foreground/30 flex items-start justify-center p-2">
          <div className="w-1 h-2 bg-primary rounded-full animate-pulse" />
        </div>
      </div>
    </section>
  );
}
