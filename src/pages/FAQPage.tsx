import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Layout } from '@/components/layout/Layout';
import { Search, ChevronDown, MessageCircle } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { SEOHead, FAQSchema } from '@/components/seo';

interface FAQItem {
  question: string;
  answer: string;
}

interface FAQCategory {
  name: string;
  icon: string;
  items: FAQItem[];
}

const faqData: FAQCategory[] = [
  {
    name: 'Orders & Shipping',
    icon: '📦',
    items: [
      {
        question: 'How long does shipping take?',
        answer: 'Standard shipping within the US typically takes 3-5 business days. Expedited shipping options are available at checkout for 1-2 business day delivery. International shipping varies by destination, usually 7-14 business days.'
      },
      {
        question: 'Do you ship internationally?',
        answer: 'Yes! We ship to over 30 countries worldwide. International shipping rates and times vary by location. You can see exact shipping costs at checkout once you enter your address.'
      },
      {
        question: 'How can I track my order?',
        answer: 'Once your order ships, you\'ll receive an email with tracking information. You can also log into your account to view your order status and tracking details at any time.'
      },
      {
        question: 'What is your shipping policy for hot sauces?',
        answer: 'Our hot sauces are carefully packaged to prevent breakage. We use insulated packaging for temperature-sensitive shipments during extreme weather. All bottles are sealed and wrapped individually.'
      },
      {
        question: 'Can I change or cancel my order?',
        answer: 'Orders can be modified or cancelled within 1 hour of placement. After that, our team begins processing your order. Contact us immediately at hello@hellboundhs.com if you need to make changes.'
      },
    ],
  },
  {
    name: 'Products & Ingredients',
    icon: '🌶️',
    items: [
      {
        question: 'Are your hot sauces gluten-free?',
        answer: 'Yes! All of our hot sauces are naturally gluten-free. We do not use any wheat, barley, or rye ingredients in our products. Our facility does not process gluten-containing products.'
      },
      {
        question: 'Are your products vegan?',
        answer: 'Most of our hot sauces are vegan-friendly. Some products, like certain BBQ rubs, may contain honey. Check individual product pages for complete ingredient lists and dietary information.'
      },
      {
        question: 'What is the shelf life of your hot sauces?',
        answer: 'Unopened, our hot sauces have a shelf life of 2 years from the production date. Once opened, we recommend consuming within 6-12 months and storing in the refrigerator to maintain optimal flavor.'
      },
      {
        question: 'Do I need to refrigerate after opening?',
        answer: 'We recommend refrigerating after opening for best quality, though it\'s not strictly necessary due to the natural preservative properties of vinegar and capsaicin. Refrigeration helps maintain optimal flavor and color.'
      },
      {
        question: 'Where are your peppers sourced?',
        answer: 'We source our peppers from trusted local farms in Texas and select international growers. Our Carolina Reapers come from certified growers in South Carolina. We prioritize organic and sustainable farming practices.'
      },
      {
        question: 'What makes your hot sauces different?',
        answer: 'Every Hellbound sauce is crafted in small batches with premium ingredients and bold flavor profiles. We focus on developing complex flavors that complement food, not just heat. No artificial preservatives, colors, or flavors—ever.'
      },
    ],
  },
  {
    name: 'Heat Levels & Recommendations',
    icon: '🔥',
    items: [
      {
        question: 'How do I know which heat level is right for me?',
        answer: 'Take our Heat Level Quiz on the Heat Guide page! It asks simple questions about your spice tolerance and recommends products perfectly suited to your palate. You can also start with our Mild sauces and work your way up.'
      },
      {
        question: 'What is the Scoville scale?',
        answer: 'The Scoville scale measures the pungency (spiciness) of peppers based on capsaicin concentration. Our mild sauces are 0-5,000 SHU, while our extreme sauces exceed 1,000,000 SHU. Visit our Heat Guide for a complete breakdown.'
      },
      {
        question: 'Which sauce is best for beginners?',
        answer: 'We recommend starting with our Smoky Chipotle or Original Cayenne sauces. They offer great flavor with manageable heat, perfect for those new to artisan hot sauces or building their tolerance.'
      },
      {
        question: 'What is your hottest sauce?',
        answer: 'Our Devil\'s Tongue Reaper is our hottest offering, featuring Carolina Reaper and Trinidad Scorpion peppers. It exceeds 2 million Scoville units. Only for experienced heat seekers—use extreme caution!'
      },
      {
        question: 'Can spicy food damage your stomach?',
        answer: 'For most healthy adults, spicy food won\'t cause damage. Capsaicin may cause temporary discomfort if you\'re not used to it. Start mild and build tolerance gradually. If you have digestive issues, consult your doctor.'
      },
    ],
  },
  {
    name: 'Returns & Refunds',
    icon: '↩️',
    items: [
      {
        question: 'What is your return policy?',
        answer: 'We offer a 30-day satisfaction guarantee. If you\'re not completely satisfied with your purchase, contact us for a full refund or exchange. Products must be unused for returns on non-opened items.'
      },
      {
        question: 'What if my order arrives damaged?',
        answer: 'We\'re so sorry if that happens! Take photos of the damage and contact us within 48 hours of delivery. We\'ll send a replacement right away at no cost. Email hello@hellboundhs.com with your order number and photos.'
      },
      {
        question: 'Can I get a refund if I don\'t like the taste?',
        answer: 'Absolutely! We stand behind our products. If a sauce doesn\'t meet your expectations, reach out to us and we\'ll make it right with a refund or suggest an alternative that might suit your taste better.'
      },
      {
        question: 'How long do refunds take to process?',
        answer: 'Refunds are processed within 3-5 business days of receiving your return or approval. It may take an additional 5-10 business days for the refund to appear on your statement, depending on your bank.'
      },
    ],
  },
  {
    name: 'Subscriptions & Bundles',
    icon: '📬',
    items: [
      {
        question: 'Do you offer subscriptions?',
        answer: 'Yes! Our Hot Sauce of the Month club delivers a curated selection to your door monthly. Subscribers save 15% on all orders plus get exclusive early access to limited releases and seasonal flavors.'
      },
      {
        question: 'Can I pause or cancel my subscription?',
        answer: 'You can pause, skip, or cancel your subscription at any time from your account dashboard. Changes must be made at least 3 days before your next billing date to take effect for that cycle.'
      },
      {
        question: 'What\'s included in the bundles?',
        answer: 'Our bundles are curated collections at discounted prices. The Starter Pack includes 3 sauces across heat levels. The Heat Seeker Bundle features our hottest offerings. Each bundle page shows exactly what\'s included.'
      },
      {
        question: 'Can I customize my subscription box?',
        answer: 'Our curated subscription features chef-selected sauces, but you can set preferences like "mild only" or "extra hot" in your subscription settings. We\'ll tailor your box accordingly.'
      },
    ],
  },
  {
    name: 'Wholesale & Business',
    icon: '🏪',
    items: [
      {
        question: 'Do you offer wholesale pricing?',
        answer: 'Yes! We partner with restaurants, specialty food stores, and distributors. Wholesale accounts receive 40-50% off retail pricing with minimum order requirements. Apply on our Wholesale page.'
      },
      {
        question: 'What are the minimum order requirements?',
        answer: 'Minimum wholesale orders start at $250 or 24 units. Larger volume discounts are available. Contact wholesale@hellboundhs.com for custom pricing on large orders.'
      },
      {
        question: 'Do you offer co-packing or private label?',
        answer: 'We offer limited private label and co-packing services for qualified partners. Minimum runs apply. Contact us with your requirements for a custom quote and timeline.'
      },
      {
        question: 'Can you create custom sauces for my restaurant?',
        answer: 'Yes! We love collaborating with chefs and restaurants on custom hot sauce creations. Share your vision with us and we\'ll work together to bring it to life. Custom orders require minimum quantities.'
      },
    ],
  },
  {
    name: 'Account & Technical',
    icon: '⚙️',
    items: [
      {
        question: 'How do I create an account?',
        answer: 'Click "Account" in the top navigation and select "Create Account." You can also create an account during checkout. Accounts let you track orders, save addresses, and access exclusive member perks.'
      },
      {
        question: 'I forgot my password. How do I reset it?',
        answer: 'Click "Account" then "Forgot Password." Enter your email address and we\'ll send you a secure link to reset your password. Links expire after 24 hours for security.'
      },
      {
        question: 'Is my payment information secure?',
        answer: 'Absolutely. We use industry-standard SSL encryption and never store your full credit card information. All payments are processed securely through Stripe, a PCI-compliant payment processor.'
      },
      {
        question: 'How do I update my shipping address?',
        answer: 'Log into your account and navigate to "Addresses" to add, edit, or remove saved shipping addresses. You can also update your address at checkout for individual orders.'
      },
    ],
  },
];

export default function FAQPage() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);

  const filteredFAQs = faqData.map(category => ({
    ...category,
    items: category.items.filter(item =>
      item.question.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.answer.toLowerCase().includes(searchQuery.toLowerCase())
    ),
  })).filter(category => 
    (selectedCategory === null || category.name === selectedCategory) && 
    category.items.length > 0
  );

  const totalQuestions = faqData.reduce((sum, cat) => sum + cat.items.length, 0);

  // Flatten all FAQs for schema
  const allFAQItems = faqData.flatMap(cat => cat.items);

  return (
    <Layout>
      <SEOHead
        title="FAQ | Frequently Asked Questions"
        description="Find answers to common questions about Hellbound Hot Sauce products, shipping, returns, heat levels, and more. Get help with orders and learn about our artisan hot sauces."
        canonical="/faq"
      />
      <FAQSchema items={allFAQItems} />
      {/* Hero */}
      <section className="py-20 lg:py-28 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-primary/10 via-transparent to-transparent" />
        <div className="container mx-auto px-4 lg:px-8 relative z-10 text-center">
          <h1 className="font-display text-5xl lg:text-7xl mb-6">Frequently Asked Questions</h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto mb-8">
            Find answers to common questions about our products, orders, and more.
          </p>
          
          {/* Search */}
          <div className="max-w-md mx-auto relative">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
            <Input
              placeholder="Search questions..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-12 h-12 bg-secondary border-border text-lg"
            />
          </div>

          <p className="text-sm text-muted-foreground mt-4">{totalQuestions} questions answered</p>
        </div>
      </section>

      {/* Category Filter */}
      <section className="pb-8">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="flex flex-wrap gap-2 justify-center">
            <Button
              variant={selectedCategory === null ? 'default' : 'outline'}
              size="sm"
              onClick={() => setSelectedCategory(null)}
              className="font-heading"
            >
              All Categories
            </Button>
            {faqData.map((category) => (
              <Button
                key={category.name}
                variant={selectedCategory === category.name ? 'default' : 'outline'}
                size="sm"
                onClick={() => setSelectedCategory(category.name)}
                className="font-heading"
              >
                <span className="mr-1">{category.icon}</span>
                {category.name}
              </Button>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ Content */}
      <section className="pb-20 lg:pb-28">
        <div className="container mx-auto px-4 lg:px-8">
          {filteredFAQs.length === 0 ? (
            <div className="text-center py-16">
              <p className="text-xl text-muted-foreground mb-4">No questions found matching "{searchQuery}"</p>
              <Button variant="outline" onClick={() => setSearchQuery('')}>Clear Search</Button>
            </div>
          ) : (
            <div className="max-w-3xl mx-auto space-y-12">
              {filteredFAQs.map((category) => (
                <div key={category.name}>
                  <h2 className="font-display text-2xl mb-6 flex items-center gap-3">
                    <span>{category.icon}</span>
                    {category.name}
                  </h2>
                  <Accordion type="single" collapsible className="space-y-3">
                    {category.items.map((item, index) => (
                      <AccordionItem 
                        key={index} 
                        value={`${category.name}-${index}`}
                        className="bg-card border border-border rounded-lg px-6 data-[state=open]:border-primary/50"
                      >
                        <AccordionTrigger className="hover:no-underline py-4">
                          <span className="text-left font-heading uppercase tracking-wide text-sm">
                            {item.question}
                          </span>
                        </AccordionTrigger>
                        <AccordionContent className="text-muted-foreground pb-4">
                          {item.answer}
                        </AccordionContent>
                      </AccordionItem>
                    ))}
                  </Accordion>
                </div>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* Still Have Questions CTA */}
      <section className="py-16 bg-charcoal">
        <div className="container mx-auto px-4 lg:px-8 text-center">
          <MessageCircle className="h-12 w-12 text-primary mx-auto mb-4" />
          <h2 className="font-display text-3xl mb-4">Still Have Questions?</h2>
          <p className="text-muted-foreground mb-8 max-w-xl mx-auto">
            Can't find what you're looking for? Our team is here to help. 
            Reach out and we'll get back to you within 24 hours.
          </p>
          <Button asChild className="bg-gradient-fire hover:opacity-90 font-heading text-lg h-12 px-8">
            <Link to="/contact">Contact Us</Link>
          </Button>
        </div>
      </section>
    </Layout>
  );
}
