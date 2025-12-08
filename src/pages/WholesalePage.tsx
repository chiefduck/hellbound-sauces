import { useState } from 'react';
import { Layout } from '@/components/layout/Layout';
import { Building2, Package, Truck, Shield, CheckCircle } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import { useToast } from '@/hooks/use-toast';
import { SEOHead } from '@/components/seo';

export default function WholesalePage() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { toast } = useToast();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);
    await new Promise(resolve => setTimeout(resolve, 1000));
    toast({
      title: "Application Received!",
      description: "We'll review your application and get back to you within 48 hours.",
    });
    setIsSubmitting(false);
    (e.target as HTMLFormElement).reset();
  };

  return (
    <Layout>
      <SEOHead
        title="Wholesale | Partner With Hellbound Hot Sauce"
        description="Become a Hellbound Hot Sauce wholesale partner. Premium artisan hot sauces for retailers, restaurants, and distributors. Low minimums, fast shipping, and marketing support."
        canonical="/wholesale"
      />
      {/* Hero */}
      <section className="py-20 lg:py-28 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-primary/10 via-transparent to-transparent" />
        <div className="container mx-auto px-4 lg:px-8 relative z-10 text-center">
          <Building2 className="h-12 w-12 text-primary mx-auto mb-6" />
          <h1 className="font-display text-5xl lg:text-7xl mb-6">Wholesale</h1>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Partner with Hellbound Hot Sauce. Premium products, competitive pricing, 
            and dedicated support for retail and foodservice partners.
          </p>
        </div>
      </section>

      {/* Benefits */}
      <section className="py-16">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              { icon: Package, title: 'Low Minimums', desc: 'Start with just 12 units' },
              { icon: Truck, title: 'Fast Shipping', desc: 'Orders ship within 48 hours' },
              { icon: Shield, title: 'Quality Guaranteed', desc: '100% satisfaction promise' },
              { icon: CheckCircle, title: 'Marketing Support', desc: 'POS materials included' },
            ].map((benefit) => (
              <div key={benefit.title} className="text-center p-6 rounded-xl bg-card border border-border">
                <benefit.icon className="h-10 w-10 text-primary mx-auto mb-4" />
                <h3 className="font-heading text-lg uppercase tracking-wide mb-2">{benefit.title}</h3>
                <p className="text-muted-foreground text-sm">{benefit.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Form */}
      <section className="py-16 lg:py-24">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="max-w-2xl mx-auto">
            <h2 className="font-display text-4xl text-center mb-8">Apply for Wholesale</h2>
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid sm:grid-cols-2 gap-4">
                <Input placeholder="Business Name *" required className="bg-secondary border-border" />
                <Input placeholder="Contact Name *" required className="bg-secondary border-border" />
              </div>
              <div className="grid sm:grid-cols-2 gap-4">
                <Input type="email" placeholder="Email *" required className="bg-secondary border-border" />
                <Input type="tel" placeholder="Phone" className="bg-secondary border-border" />
              </div>
              <Input placeholder="Website" className="bg-secondary border-border" />
              <Input placeholder="Business Address" className="bg-secondary border-border" />
              <Textarea placeholder="Tell us about your business and how you plan to sell Hellbound products..." className="bg-secondary border-border min-h-[120px]" />
              <Button type="submit" disabled={isSubmitting} className="w-full bg-gradient-fire hover:opacity-90 font-heading text-lg h-12">
                {isSubmitting ? 'Submitting...' : 'Submit Application'}
              </Button>
            </form>
          </div>
        </div>
      </section>
    </Layout>
  );
}
