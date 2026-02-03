import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Flame, Instagram, Facebook, Youtube } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { useToast } from '@/hooks/use-toast';

interface FooterProps {
  showNewsletter?: boolean;
}

const footerLinks = {
  shop: [
    { name: 'All Products', href: '/collections/all' },
    { name: 'Hot Sauces', href: '/collections/hot-sauce' },
    { name: 'BBQ Rubs', href: '/collections/bbq-rubs' },
    { name: 'Merch', href: '/collections/merch-and-apparel' },
  ],
  company: [
    { name: 'About Us', href: '/about' },
    { name: 'Our Story', href: '/about#story' },
    { name: 'Wholesale', href: '/wholesale' },
    { name: 'Contact', href: '/contact' },
  ],
  support: [
    { name: 'Heat Guide', href: '/heat-guide' },
    { name: 'Blog', href: '/blog' },
    { name: 'FAQs', href: '/faq' },
    { name: 'Shipping', href: '/shipping' },
    { name: 'Returns & Refunds', href: '/refund' },
  ],
  legal: [
    { name: 'Privacy Policy', href: '/privacy' },
    { name: 'Terms of Service', href: '/terms' },
    { name: 'Cancellation Policy', href: '/cancellation' },
  ],
};

const socialLinks = [
  { name: 'Instagram', icon: Instagram, href: 'https://www.instagram.com/hellbound_sauces/' },
  { name: 'Facebook', icon: Facebook, href: 'https://www.facebook.com/HellBoundSauces' },
  { name: 'YouTube', icon: Youtube, href: 'https://www.youtube.com/@HellBoundSauces' },
];

export function Footer({ showNewsletter = true }: FooterProps) {
  const [isSubscribing, setIsSubscribing] = useState(false);
  const { toast } = useToast();

  const handleNewsletterSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    // Honeypot check - if filled, it's a bot
    const formData = new FormData(e.currentTarget);
    if (formData.get('website')) return;

    setIsSubscribing(true);

    // Map to Agency Standard Schema
    const payload = {
      // Top Level: Standard Fields
      email: formData.get('email'),
      lead_source: 'Hellbound Sauces - Newsletter Form',
      website: formData.get('website'), // Honeypot field

      // Metadata: The "Bucket" for everything else
      metadata: {
        inquiry_type: 'newsletter',
        consent: true,
        consentTimestamp: new Date().toISOString()
      }
    };

    try {
      const response = await fetch(import.meta.env.VITE_N8N_WEBHOOK_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });

      if (!response.ok) throw new Error('Failed to subscribe');

      toast({
        title: "Welcome to the Family!",
        description: "You've been added to our newsletter. Check your email for exclusive content!",
      });
      (e.target as HTMLFormElement).reset();
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to subscribe. Please try again later.",
        variant: "destructive",
      });
    } finally {
      setIsSubscribing(false);
    }
  };

  return (
    <footer className="bg-charcoal border-t border-border">
      {/* Newsletter Section */}
      {showNewsletter && (
        <div className="border-b border-border">
          <div className="container mx-auto px-4 lg:px-8 py-12">
            <div className="max-w-2xl mx-auto text-center">
              <h3 className="font-display text-3xl lg:text-4xl mb-3 text-gradient-fire">
                Join the Hellbound Family
              </h3>
              <p className="text-muted-foreground mb-6">
                Get exclusive recipes, early access to new products, and special offers.
              </p>
              <form onSubmit={handleNewsletterSubmit} className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto">
                {/* Honeypot field - hidden from users */}
                <input
                  type="text"
                  name="website"
                  style={{ display: 'none' }}
                  tabIndex={-1}
                  autoComplete="off"
                />
                <Input
                  name="email"
                  type="email"
                  placeholder="Enter your email"
                  required
                  disabled={isSubscribing}
                  className="bg-secondary border-border focus:border-primary"
                />
                <Button type="submit" disabled={isSubscribing} className="bg-gradient-fire hover:opacity-90 transition-opacity whitespace-nowrap">
                  {isSubscribing ? 'Subscribing...' : 'Subscribe'}
                </Button>
              </form>
            </div>
          </div>
        </div>
      )}

      {/* Main Footer */}
      <div className="container mx-auto px-4 lg:px-8 py-12">
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-8">
          {/* Brand */}
          <div className="col-span-2 md:col-span-4 lg:col-span-1">
            <Link to="/" className="flex items-center gap-2 mb-4">
              <Flame className="h-8 w-8 text-primary" />
              <span className="font-display text-2xl tracking-wider">HELLBOUND</span>
            </Link>
            <p className="text-muted-foreground text-sm mb-6">
              Artisan hot sauces and BBQ rubs crafted with the world's hottest peppers.
            </p>
            <div className="flex gap-4">
              {socialLinks.map((social) => (
                <a
                  key={social.name}
                  href={social.href}
                  className="text-muted-foreground hover:text-primary transition-colors"
                  aria-label={social.name}
                >
                  <social.icon className="h-5 w-5" />
                </a>
              ))}
            </div>
          </div>

          {/* Links */}
          <div>
            <h4 className="font-heading text-sm uppercase tracking-wider mb-4">Shop</h4>
            <ul className="space-y-3">
              {footerLinks.shop.map((link) => (
                <li key={link.name}>
                  <Link
                    to={link.href}
                    className="text-muted-foreground hover:text-foreground text-sm transition-colors"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="font-heading text-sm uppercase tracking-wider mb-4">Company</h4>
            <ul className="space-y-3">
              {footerLinks.company.map((link) => (
                <li key={link.name}>
                  <Link
                    to={link.href}
                    className="text-muted-foreground hover:text-foreground text-sm transition-colors"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="font-heading text-sm uppercase tracking-wider mb-4">Support</h4>
            <ul className="space-y-3">
              {footerLinks.support.map((link) => (
                <li key={link.name}>
                  <Link
                    to={link.href}
                    className="text-muted-foreground hover:text-foreground text-sm transition-colors"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="font-heading text-sm uppercase tracking-wider mb-4">Legal</h4>
            <ul className="space-y-3">
              {footerLinks.legal.map((link) => (
                <li key={link.name}>
                  <Link
                    to={link.href}
                    className="text-muted-foreground hover:text-foreground text-sm transition-colors"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-border">
        <div className="container mx-auto px-4 lg:px-8 py-6">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-muted-foreground text-sm">
              © {new Date().getFullYear()} Hellbound Hot Sauce. All rights reserved.
            </p>
            <div className="flex items-center gap-3 text-xs text-muted-foreground">
              <span className="px-2 py-1 border border-border rounded bg-card font-medium">VISA</span>
              <span className="px-2 py-1 border border-border rounded bg-card font-medium">MASTERCARD</span>
              <span className="px-2 py-1 border border-border rounded bg-card font-medium">AMEX</span>
              <span className="px-2 py-1 border border-border rounded bg-card font-medium">DISCOVER</span>
              <span className="px-2 py-1 border border-border rounded bg-card font-medium">PAYPAL</span>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
