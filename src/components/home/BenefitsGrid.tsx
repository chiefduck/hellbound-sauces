import { Flame, Leaf, Clock, Award, Heart, Truck } from 'lucide-react';

const benefits = [
  {
    icon: Flame,
    title: 'Artisan Crafted',
    description: 'Every batch is handmade with care and attention to detail.',
  },
  {
    icon: Leaf,
    title: 'All Natural',
    description: 'No artificial preservatives, colors, or flavors. Just pure heat.',
  },
  {
    icon: Clock,
    title: 'Small Batch Crafted',
    description: 'Carefully crafted in small batches to develop bold, complex flavors.',
  },
  {
    icon: Award,
    title: 'Premium Quality',
    description: 'Exceptional flavor profiles that complement food perfectly.',
  },
  {
    icon: Heart,
    title: 'Family Owned',
    description: 'A passion project turned business, run by chili-heads for chili-heads.',
  },
  {
    icon: Truck,
    title: 'Fast Shipping',
    description: 'Orders ship within 1-2 business days. Shipping calculated at checkout.',
  },
];

export function BenefitsGrid() {
  return (
    <section className="py-20 lg:py-28">
      <div className="container mx-auto px-4 lg:px-8">
        <div className="text-center mb-12">
          <span className="text-primary font-heading text-sm uppercase tracking-widest">Why Choose Us</span>
          <h2 className="font-display text-4xl lg:text-5xl mt-2">The Hellbound Difference</h2>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {benefits.map((benefit, index) => (
            <div
              key={benefit.title}
              className="group p-6 rounded-xl bg-card border border-border hover:border-primary/50 transition-all duration-300 animate-fade-in-up"
              style={{ animationDelay: `${index * 100}ms` }}
            >
              <div className="inline-flex items-center justify-center w-12 h-12 rounded-lg bg-primary/10 mb-4 group-hover:bg-primary/20 transition-colors">
                <benefit.icon className="h-6 w-6 text-primary" />
              </div>
              <h3 className="font-heading text-lg uppercase tracking-wide mb-2">{benefit.title}</h3>
              <p className="text-muted-foreground text-sm">{benefit.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
