import { Link } from 'react-router-dom';
import { Layout } from '@/components/layout/Layout';
import { Flame } from 'lucide-react';
import { products } from '@/data/products';
import { ProductCard } from '@/components/product/ProductCard';

const heatLevels = [
  {
    level: 1,
    name: 'Mild',
    scoville: '0-5,000 SHU',
    color: 'bg-green-500',
    borderColor: 'border-green-500',
    description: 'Perfect for everyday use. A gentle warmth that enhances flavor without overwhelming.',
    peppers: ['Poblano', 'Anaheim', 'Banana Pepper'],
  },
  {
    level: 2,
    name: 'Medium',
    scoville: '5,000-50,000 SHU',
    color: 'bg-yellow-500',
    borderColor: 'border-yellow-500',
    description: 'A noticeable kick that adds excitement. Great for those building their heat tolerance.',
    peppers: ['Jalapeño', 'Serrano', 'Chipotle'],
  },
  {
    level: 3,
    name: 'Hot',
    scoville: '50,000-350,000 SHU',
    color: 'bg-orange-500',
    borderColor: 'border-orange-500',
    description: 'For dedicated heat seekers. Intense but still allows flavor appreciation.',
    peppers: ['Cayenne', 'Tabasco', 'Habanero'],
  },
  {
    level: 4,
    name: 'Extra Hot',
    scoville: '350,000-1,000,000 SHU',
    color: 'bg-red-500',
    borderColor: 'border-red-500',
    description: 'Serious heat warning. Not for the faint of heart. Endorphin rush guaranteed.',
    peppers: ['Ghost Pepper', 'Scotch Bonnet', '7 Pot'],
  },
  {
    level: 5,
    name: 'Extreme',
    scoville: '1,000,000+ SHU',
    color: 'bg-red-700',
    borderColor: 'border-red-700',
    description: 'Enter at your own risk. The world\'s hottest peppers. Legendary heat levels.',
    peppers: ['Carolina Reaper', 'Trinidad Scorpion', 'Pepper X'],
  },
];

export default function HeatGuidePage() {
  return (
    <Layout>
      {/* Hero */}
      <section className="py-20 lg:py-28 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-primary/10 via-transparent to-transparent" />
        <div className="container mx-auto px-4 lg:px-8 relative z-10 text-center">
          <Flame className="h-12 w-12 text-primary mx-auto mb-6" />
          <h1 className="font-display text-5xl lg:text-7xl mb-6">Heat Guide</h1>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Understanding the Scoville scale and finding your perfect heat level.
          </p>
        </div>
      </section>

      {/* Scale Visualization */}
      <section className="py-12">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="h-6 rounded-full bg-gradient-to-r from-green-500 via-yellow-500 via-orange-500 via-red-500 to-red-700 mb-8" />
        </div>
      </section>

      {/* Heat Levels */}
      <section className="pb-20 lg:pb-28">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="space-y-16">
            {heatLevels.map((level) => {
              const levelProducts = products.filter(p => p.heatLevel === level.level && p.category === 'hot-sauce');
              
              return (
                <div key={level.level} className={`p-8 rounded-xl bg-card border-l-4 ${level.borderColor}`}>
                  <div className="flex flex-wrap items-center gap-4 mb-6">
                    <div className={`w-12 h-12 rounded-full ${level.color} flex items-center justify-center`}>
                      <Flame className="h-6 w-6 text-white" fill="white" />
                    </div>
                    <div>
                      <h2 className="font-display text-3xl">{level.name}</h2>
                      <p className="text-muted-foreground">{level.scoville}</p>
                    </div>
                  </div>
                  
                  <p className="text-lg text-muted-foreground mb-6">{level.description}</p>
                  
                  <div className="mb-8">
                    <h4 className="font-heading text-sm uppercase tracking-wide mb-3">Common Peppers</h4>
                    <div className="flex flex-wrap gap-2">
                      {level.peppers.map((pepper) => (
                        <span key={pepper} className="px-3 py-1 rounded-full bg-secondary text-sm">{pepper}</span>
                      ))}
                    </div>
                  </div>

                  {levelProducts.length > 0 && (
                    <div>
                      <h4 className="font-heading text-sm uppercase tracking-wide mb-4">Our Sauces at This Level</h4>
                      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
                        {levelProducts.map((product) => (
                          <ProductCard key={product.id} product={product} />
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </section>
    </Layout>
  );
}
