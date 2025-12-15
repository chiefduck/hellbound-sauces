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

    const formData = new FormData(e.currentTarget);
    const data = {
      type: 'wholesale',
      name: formData.get('name'),
      email: formData.get('email'),
      phone: formData.get('phone'),
      message: formData.get('message'),
    };

    try {
      const response = await fetch('/.netlify/functions/send-email', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      });

      if (!response.ok) throw new Error('Failed to send message');

      toast({
        title: "Application Received!",
        description: "We'll review your application and get back to you within 48 hours.",
      });
      (e.target as HTMLFormElement).reset();
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to send application. Please try again or email us directly.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Layout>
      <SEOHead
        title="Wholesale | Partner With HellBound Sauces"
        description="Partner with HellBound Sauces. By stocking our premium hot sauces, you're bringing a world of rich, unique flavors to your clientele. Let's spice up your offerings together!"
        canonical="/wholesale"
      />
      {/* Hero */}
      <section className="py-20 lg:py-28 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-primary/10 via-transparent to-transparent" />
        <div className="container mx-auto px-4 lg:px-8 relative z-10 text-center">
          <Building2 className="h-12 w-12 text-primary mx-auto mb-6" />
          <h1 className="font-display text-5xl lg:text-7xl mb-6">Wholesale Partners</h1>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            By choosing to stock our premium hot sauces, you're not just adding a product to your
            shelves – you're bringing a world of rich, unique flavors to your clientele.
          </p>
          <p className="text-lg text-primary mt-4 font-heading tracking-wide">
            Let's spice up your offerings together!
          </p>
        </div>
      </section>

      {/* Benefits */}
      <section className="py-16 bg-charcoal">
        <div className="container mx-auto px-4 lg:px-8">
          <h2 className="font-display text-4xl text-center mb-12">Why Partner With Us</h2>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              { icon: Package, title: 'Premium Products', desc: 'Bold flavors that complement food' },
              { icon: Truck, title: 'Unique Artwork', desc: 'Tattoo-inspired labels that stand out' },
              { icon: Shield, title: 'Quality First', desc: 'Small batch craft excellence' },
              { icon: CheckCircle, title: 'Growing Brand', desc: '5-star customer reviews' },
            ].map((benefit) => (
              <div key={benefit.title} className="text-center p-6 rounded-xl bg-card border border-border hover:border-primary/50 transition-all">
                <benefit.icon className="h-10 w-10 text-primary mx-auto mb-4" />
                <h3 className="font-heading text-lg uppercase tracking-wide mb-2">{benefit.title}</h3>
                <p className="text-muted-foreground text-sm">{benefit.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Product Highlights */}
      <section className="py-16">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="max-w-4xl mx-auto">
            <h2 className="font-display text-4xl text-center mb-12">Our Product Lines</h2>
            <div className="grid md:grid-cols-2 gap-8">
              <div className="p-6 rounded-xl border border-border bg-card">
                <h3 className="font-heading text-xl uppercase tracking-wide mb-3 text-primary">Hot Sauces</h3>
                <ul className="space-y-2 text-muted-foreground">
                  <li>• Series 1: Sweet Heat, Cucumber Madness, Pineapple-Mango ($12)</li>
                  <li>• Series 2 & 3: Wide Awake, Bangkok Burn ($15)</li>
                  <li>• 5-star customer ratings</li>
                  <li>• Unique flavor profiles that balance heat and taste</li>
                </ul>
              </div>
              <div className="p-6 rounded-xl border border-border bg-card">
                <h3 className="font-heading text-xl uppercase tracking-wide mb-3 text-primary">BBQ Rubs</h3>
                <ul className="space-y-2 text-muted-foreground">
                  <li>• Wildwood Maple (11 oz)</li>
                  <li>• Beekeepers Blend (12.2 oz)</li>
                  <li>• Premium blends for grilling and smoking</li>
                  <li>• Perfect for BBQ enthusiasts</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Form */}
      <section className="py-16 lg:py-24 bg-charcoal">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="max-w-2xl mx-auto">
            <h2 className="font-display text-4xl text-center mb-4">Get Started</h2>
            <p className="text-center text-muted-foreground mb-8">
              Connect with us to discover how our wholesale program can benefit your business and delight your customers.
            </p>
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid sm:grid-cols-2 gap-4">
                <Input name="name" placeholder="Name *" required className="bg-secondary border-border" />
                <Input name="email" type="email" placeholder="Email *" required className="bg-secondary border-border" />
              </div>
              <Input name="phone" type="tel" placeholder="Phone Number" className="bg-secondary border-border" />
              <Textarea
                name="message"
                placeholder="Tell us about your business and how you'd like to stock HellBound Sauces..."
                required
                className="bg-secondary border-border min-h-[140px]"
              />
              <Button type="submit" disabled={isSubmitting} className="w-full bg-gradient-fire hover:opacity-90 font-heading text-lg h-12">
                {isSubmitting ? 'Sending...' : 'Contact Us'}
              </Button>
            </form>
          </div>
        </div>
      </section>
    </Layout>
  );
}
