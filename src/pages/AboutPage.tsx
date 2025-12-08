import { Layout } from '@/components/layout/Layout';
import { Flame, Award, Users, Heart, Leaf } from 'lucide-react';
import { SEOHead } from '@/components/seo';

export default function AboutPage() {
  return (
    <Layout>
      <SEOHead
        title="About Us | Our Story & Mission"
        description="Born from an obsession with heat and a commitment to craft, Hellbound Hot Sauce brings you the most flavorful fire on the planet. Learn about our small-batch artisan hot sauce journey."
        canonical="/about"
      />
      {/* Hero */}
      <section className="py-20 lg:py-28 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-primary/10 via-transparent to-transparent" />
        <div className="container mx-auto px-4 lg:px-8 relative z-10 text-center">
          <Flame className="h-12 w-12 text-primary mx-auto mb-6" />
          <h1 className="font-display text-5xl lg:text-7xl mb-6">
            <span className="text-gradient-fire">Our Story</span>
          </h1>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Born from an obsession with heat and a commitment to craft, 
            Hellbound Hot Sauce brings you the most flavorful fire on the planet.
          </p>
        </div>
      </section>

      {/* Story */}
      <section className="py-20 lg:py-28">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div>
              <h2 className="font-display text-4xl mb-6">From Kitchen Experiments to Craft Excellence</h2>
              <div className="space-y-4 text-muted-foreground">
                <p>
                  It started in 2018, in a small kitchen filled with smoke and the intoxicating 
                  aroma of roasting peppers. What began as a quest to grow and ferment the 
                  world's hottest peppers quickly evolved into something more.
                </p>
                <p>
                  We discovered that extreme heat didn't have to mean sacrificing flavor. 
                  Through months of experimentation, aging our fermented pepper mashes in 
                  oak barrels, and countless taste tests that pushed the limits of human 
                  endurance, we developed sauces that deliver both incredible heat and 
                  complex, nuanced flavors.
                </p>
                <p>
                  Today, every bottle of Hellbound Hot Sauce is still made by hand, in small 
                  batches, using the same techniques and obsessive attention to quality that 
                  started it all. We grow many of our own peppers, source the rest from trusted 
                  small farms, and refuse to cut corners with artificial anything.
                </p>
              </div>
            </div>
            <div className="relative aspect-square rounded-xl overflow-hidden border border-border bg-secondary/50">
              <div className="absolute inset-0 flex items-center justify-center">
                <Flame className="h-24 w-24 text-primary/30" />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="py-20 lg:py-28 bg-charcoal">
        <div className="container mx-auto px-4 lg:px-8">
          <h2 className="font-display text-4xl text-center mb-16">What Drives Us</h2>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              { icon: Flame, title: 'Authentic Heat', desc: 'Real peppers, real fire, no shortcuts' },
              { icon: Award, title: 'Quality First', desc: 'Small batch craft, big bold flavors' },
              { icon: Leaf, title: 'All Natural', desc: 'No artificial anything, ever' },
              { icon: Heart, title: 'Community', desc: 'Built by chili-heads, for chili-heads' },
            ].map((value) => (
              <div key={value.title} className="text-center">
                <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-primary/10 mb-4">
                  <value.icon className="h-8 w-8 text-primary" />
                </div>
                <h3 className="font-heading text-xl uppercase tracking-wide mb-2">{value.title}</h3>
                <p className="text-muted-foreground">{value.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Team */}
      <section className="py-20 lg:py-28">
        <div className="container mx-auto px-4 lg:px-8 text-center">
          <Users className="h-12 w-12 text-primary mx-auto mb-6" />
          <h2 className="font-display text-4xl mb-6">The Hellbound Family</h2>
          <p className="text-muted-foreground max-w-2xl mx-auto mb-12">
            We're a small, passionate team dedicated to bringing you the finest artisan 
            hot sauces and BBQ rubs. Every member of our crew shares the same obsession 
            with heat, quality, and flavor.
          </p>
        </div>
      </section>
    </Layout>
  );
}
