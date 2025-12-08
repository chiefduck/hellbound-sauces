import { Link } from 'react-router-dom';
import { Flame, ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { products } from '@/data/products';

const heatLevels = [
  { level: 1, name: 'Mild', scoville: '0-5,000 SHU', color: 'bg-green-500', description: 'Perfect for everyday use' },
  { level: 2, name: 'Medium', scoville: '5,000-50,000 SHU', color: 'bg-yellow-500', description: 'A noticeable kick' },
  { level: 3, name: 'Hot', scoville: '50,000-350,000 SHU', color: 'bg-orange-500', description: 'For heat seekers' },
  { level: 4, name: 'Extra Hot', scoville: '350,000-1M SHU', color: 'bg-red-500', description: 'Serious heat warning' },
  { level: 5, name: 'Extreme', scoville: '1M+ SHU', color: 'bg-red-700', description: 'Enter at your own risk' },
];

export function HeatScaleSection() {
  return (
    <section className="py-20 lg:py-28 bg-charcoal relative overflow-hidden">
      {/* Background effects */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom,_hsl(var(--primary)/0.1)_0%,_transparent_70%)]" />
      
      <div className="container mx-auto px-4 lg:px-8 relative z-10">
        <div className="text-center mb-12">
          <span className="text-primary font-heading text-sm uppercase tracking-widest">Find Your Heat</span>
          <h2 className="font-display text-4xl lg:text-5xl mt-2">The Scoville Scale</h2>
          <p className="text-muted-foreground mt-4 max-w-2xl mx-auto">
            From mild and flavorful to face-melting extreme, we've got a sauce for every heat tolerance.
          </p>
        </div>

        {/* Heat scale visualization */}
        <div className="max-w-4xl mx-auto mb-12">
          <div className="relative">
            {/* Scale bar */}
            <div className="h-4 rounded-full bg-gradient-to-r from-green-500 via-yellow-500 via-orange-500 via-red-500 to-red-700 mb-8" />
            
            {/* Level markers */}
            <div className="grid grid-cols-5 gap-4">
              {heatLevels.map((level, index) => {
                const productsAtLevel = products.filter(p => p.heatLevel === level.level && p.category === 'hot-sauce');
                
                return (
                  <div
                    key={level.level}
                    className="text-center animate-fade-in-up"
                    style={{ animationDelay: `${index * 100}ms` }}
                  >
                    <div className={`w-8 h-8 rounded-full ${level.color} mx-auto mb-3 flex items-center justify-center`}>
                      <Flame className="h-4 w-4 text-white" fill="white" />
                    </div>
                    <h4 className="font-heading text-sm uppercase tracking-wide">{level.name}</h4>
                    <p className="text-xs text-muted-foreground mt-1">{level.scoville}</p>
                    <p className="text-xs text-muted-foreground/70 mt-2 hidden lg:block">{level.description}</p>
                    {productsAtLevel.length > 0 && (
                      <p className="text-xs text-primary mt-2">{productsAtLevel.length} sauce{productsAtLevel.length > 1 ? 's' : ''}</p>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        <div className="text-center">
          <Button asChild size="lg" className="bg-gradient-fire hover:opacity-90 font-heading tracking-wide group">
            <Link to="/heat-guide">
              Explore Heat Guide
              <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
            </Link>
          </Button>
        </div>
      </div>
    </section>
  );
}
