import { useState } from 'react';
import { SEOHead } from '@/components/seo';
import { Layout } from '@/components/layout/Layout';
import { Mail, Phone, MapPin, MessageSquare, Building } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useToast } from '@/hooks/use-toast';
import { Label } from '@/components/ui/label';

const inquiryTypes = [
  { value: 'consumer', label: 'Consumer Question', icon: MessageSquare },
  { value: 'wholesale', label: 'Wholesale Inquiry', icon: Building },
];

const consumerTopics = [
  { value: 'order-status', label: 'Order Status' },
  { value: 'shipping', label: 'Shipping Question' },
  { value: 'returns', label: 'Returns & Refunds' },
  { value: 'product-info', label: 'Product Information' },
  { value: 'heat-recommendation', label: 'Heat Level Recommendation' },
  { value: 'ingredients', label: 'Ingredients & Allergens' },
  { value: 'subscription', label: 'Subscription Help' },
  { value: 'feedback', label: 'General Feedback' },
  { value: 'other', label: 'Other' },
];

const wholesaleTopics = [
  { value: 'new-account', label: 'Open Wholesale Account' },
  { value: 'pricing', label: 'Pricing & Minimum Orders' },
  { value: 'samples', label: 'Sample Request' },
  { value: 'distribution', label: 'Distribution Partnership' },
  { value: 'restaurant', label: 'Restaurant / Food Service' },
  { value: 'retail', label: 'Retail Store Inquiry' },
  { value: 'existing-order', label: 'Existing Order Question' },
  { value: 'other', label: 'Other' },
];

export default function ContactPage() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [inquiryType, setInquiryType] = useState<string>('');
  const [topic, setTopic] = useState<string>('');
  const { toast } = useToast();

  const topics = inquiryType === 'wholesale' ? wholesaleTopics : consumerTopics;

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);
    await new Promise(resolve => setTimeout(resolve, 1000));
    toast({
      title: "Message Sent!",
      description: inquiryType === 'wholesale' 
        ? "Our wholesale team will get back to you within 1-2 business days."
        : "We'll get back to you within 24 hours.",
    });
    setIsSubmitting(false);
    setInquiryType('');
    setTopic('');
    (e.target as HTMLFormElement).reset();
  };

  return (
    <Layout>
      <SEOHead
        title="Contact Us | Get in Touch"
        description="Have questions about Hellbound Hot Sauce? Contact our team for order support, wholesale inquiries, product information, or general feedback. We respond within 24 hours."
        canonical="/contact"
      />
      {/* Hero */}
      <section className="py-20 lg:py-28 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-primary/10 via-transparent to-transparent" />
        <div className="container mx-auto px-4 lg:px-8 relative z-10 text-center">
          <h1 className="font-display text-5xl lg:text-7xl mb-6">Contact Us</h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Have questions, feedback, or interested in wholesale? We'd love to hear from you.
          </p>
        </div>
      </section>

      {/* Contact Info & Form */}
      <section className="py-16 lg:py-24">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="grid lg:grid-cols-3 gap-12">
            {/* Contact Info */}
            <div className="space-y-8">
              <div className="flex items-start gap-4">
                <div className="p-3 rounded-lg bg-primary/10">
                  <Mail className="h-6 w-6 text-primary" />
                </div>
                <div>
                  <h3 className="font-heading uppercase tracking-wide mb-1">Email</h3>
                  <a href="mailto:hello@hellboundhs.com" className="text-muted-foreground hover:text-primary transition-colors">
                    hello@hellboundhs.com
                  </a>
                  <p className="text-sm text-muted-foreground mt-1">
                    Wholesale: wholesale@hellboundhs.com
                  </p>
                </div>
              </div>
              <div className="flex items-start gap-4">
                <div className="p-3 rounded-lg bg-primary/10">
                  <Phone className="h-6 w-6 text-primary" />
                </div>
                <div>
                  <h3 className="font-heading uppercase tracking-wide mb-1">Phone</h3>
                  <a href="tel:+15551234567" className="text-muted-foreground hover:text-primary transition-colors">
                    (555) 123-4567
                  </a>
                  <p className="text-sm text-muted-foreground mt-1">
                    Mon-Fri 9am-5pm CST
                  </p>
                </div>
              </div>
              <div className="flex items-start gap-4">
                <div className="p-3 rounded-lg bg-primary/10">
                  <MapPin className="h-6 w-6 text-primary" />
                </div>
                <div>
                  <h3 className="font-heading uppercase tracking-wide mb-1">Location</h3>
                  <p className="text-muted-foreground">
                    Austin, Texas<br />United States
                  </p>
                </div>
              </div>

              {/* Quick Links */}
              <div className="pt-6 border-t border-border">
                <h3 className="font-heading uppercase tracking-wide mb-4">Quick Links</h3>
                <ul className="space-y-2 text-muted-foreground">
                  <li><a href="/faq" className="hover:text-primary transition-colors">FAQ</a></li>
                  <li><a href="/wholesale" className="hover:text-primary transition-colors">Wholesale Program</a></li>
                  <li><a href="/heat-guide" className="hover:text-primary transition-colors">Heat Guide</a></li>
                </ul>
              </div>
            </div>

            {/* Form */}
            <div className="lg:col-span-2">
              <form onSubmit={handleSubmit} className="space-y-6">
                {/* Inquiry Type Selection */}
                <div className="grid sm:grid-cols-2 gap-4">
                  {inquiryTypes.map((type) => {
                    const Icon = type.icon;
                    return (
                      <button
                        key={type.value}
                        type="button"
                        onClick={() => {
                          setInquiryType(type.value);
                          setTopic('');
                        }}
                        className={`p-4 rounded-xl border-2 transition-all text-left flex items-center gap-3 ${
                          inquiryType === type.value
                            ? 'border-primary bg-primary/10'
                            : 'border-border bg-secondary hover:border-primary/50'
                        }`}
                      >
                        <Icon className={`h-5 w-5 ${inquiryType === type.value ? 'text-primary' : 'text-muted-foreground'}`} />
                        <span className="font-heading uppercase tracking-wide">{type.label}</span>
                      </button>
                    );
                  })}
                </div>

                {/* Topic Dropdown */}
                {inquiryType && (
                  <div className="space-y-2">
                    <Label>What can we help you with?</Label>
                    <Select value={topic} onValueChange={setTopic}>
                      <SelectTrigger className="bg-secondary border-border">
                        <SelectValue placeholder="Select a topic..." />
                      </SelectTrigger>
                      <SelectContent>
                        {topics.map((t) => (
                          <SelectItem key={t.value} value={t.value}>{t.label}</SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                )}

                <div className="grid sm:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label>Name *</Label>
                    <Input placeholder="Your name" required className="bg-secondary border-border" />
                  </div>
                  <div className="space-y-2">
                    <Label>Email *</Label>
                    <Input type="email" placeholder="your@email.com" required className="bg-secondary border-border" />
                  </div>
                </div>

                {inquiryType === 'wholesale' && (
                  <div className="grid sm:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label>Company Name *</Label>
                      <Input placeholder="Your company" required className="bg-secondary border-border" />
                    </div>
                    <div className="space-y-2">
                      <Label>Phone</Label>
                      <Input type="tel" placeholder="(555) 123-4567" className="bg-secondary border-border" />
                    </div>
                  </div>
                )}

                {inquiryType === 'consumer' && topic === 'order-status' && (
                  <div className="space-y-2">
                    <Label>Order Number</Label>
                    <Input placeholder="e.g., #HB12345" className="bg-secondary border-border" />
                  </div>
                )}

                <div className="space-y-2">
                  <Label>Message *</Label>
                  <Textarea 
                    placeholder={inquiryType === 'wholesale' 
                      ? "Tell us about your business and how you'd like to partner with us..."
                      : "How can we help you today?"
                    } 
                    required 
                    className="bg-secondary border-border min-h-[160px]" 
                  />
                </div>

                <Button 
                  type="submit" 
                  disabled={isSubmitting || !inquiryType} 
                  className="bg-gradient-fire hover:opacity-90 font-heading text-lg h-12 px-8"
                >
                  {isSubmitting ? 'Sending...' : 'Send Message'}
                </Button>
              </form>
            </div>
          </div>
        </div>
      </section>
    </Layout>
  );
}
