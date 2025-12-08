import { Layout } from '@/components/layout/Layout';
import { Truck, Clock, Globe, Package, RefreshCw, Shield } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';

export default function ShippingPage() {
  return (
    <Layout>
      <section className="py-20 lg:py-28">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-16">
              <h1 className="font-display text-5xl lg:text-6xl mb-6">Shipping & Returns</h1>
              <p className="text-xl text-muted-foreground">
                Fast, reliable shipping and hassle-free returns on all orders.
              </p>
            </div>

            {/* Shipping Options */}
            <div className="mb-16">
              <h2 className="font-display text-3xl mb-8">Shipping Options</h2>
              <div className="grid md:grid-cols-3 gap-6">
                <Card className="bg-card border-border">
                  <CardContent className="p-6 text-center">
                    <Truck className="h-10 w-10 text-primary mx-auto mb-4" />
                    <h3 className="font-heading uppercase tracking-wide mb-2">Standard</h3>
                    <p className="text-muted-foreground text-sm mb-2">3-5 Business Days</p>
                    <p className="text-lg font-bold">$5.99</p>
                    <p className="text-sm text-muted-foreground mt-1">Free over $50</p>
                  </CardContent>
                </Card>
                <Card className="bg-card border-border">
                  <CardContent className="p-6 text-center">
                    <Clock className="h-10 w-10 text-primary mx-auto mb-4" />
                    <h3 className="font-heading uppercase tracking-wide mb-2">Expedited</h3>
                    <p className="text-muted-foreground text-sm mb-2">2-3 Business Days</p>
                    <p className="text-lg font-bold">$12.99</p>
                    <p className="text-sm text-muted-foreground mt-1">Priority handling</p>
                  </CardContent>
                </Card>
                <Card className="bg-card border-border">
                  <CardContent className="p-6 text-center">
                    <Package className="h-10 w-10 text-primary mx-auto mb-4" />
                    <h3 className="font-heading uppercase tracking-wide mb-2">Overnight</h3>
                    <p className="text-muted-foreground text-sm mb-2">1 Business Day</p>
                    <p className="text-lg font-bold">$24.99</p>
                    <p className="text-sm text-muted-foreground mt-1">Order by 2pm CST</p>
                  </CardContent>
                </Card>
              </div>
            </div>

            {/* International Shipping */}
            <div className="mb-16">
              <div className="flex items-center gap-4 mb-6">
                <Globe className="h-8 w-8 text-primary" />
                <h2 className="font-display text-3xl">International Shipping</h2>
              </div>
              <div className="bg-card rounded-xl border border-border p-8">
                <p className="text-muted-foreground mb-6">
                  We ship to over 30 countries worldwide! International shipping rates and delivery 
                  times vary by destination.
                </p>
                <div className="grid md:grid-cols-2 gap-8">
                  <div>
                    <h4 className="font-heading uppercase tracking-wide mb-3">Estimated Delivery Times</h4>
                    <ul className="space-y-2 text-muted-foreground">
                      <li>Canada: 5-7 business days</li>
                      <li>Europe: 7-14 business days</li>
                      <li>Australia/NZ: 10-14 business days</li>
                      <li>Other regions: 14-21 business days</li>
                    </ul>
                  </div>
                  <div>
                    <h4 className="font-heading uppercase tracking-wide mb-3">Important Notes</h4>
                    <ul className="space-y-2 text-muted-foreground">
                      <li>Customs duties may apply</li>
                      <li>Tracking provided for all orders</li>
                      <li>Some restrictions may apply</li>
                      <li>Rates calculated at checkout</li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>

            {/* Returns Policy */}
            <div className="mb-16">
              <div className="flex items-center gap-4 mb-6">
                <RefreshCw className="h-8 w-8 text-primary" />
                <h2 className="font-display text-3xl">Returns & Refunds</h2>
              </div>
              <div className="bg-card rounded-xl border border-border p-8 space-y-6">
                <div>
                  <h4 className="font-heading uppercase tracking-wide mb-2">30-Day Satisfaction Guarantee</h4>
                  <p className="text-muted-foreground">
                    Not happy with your purchase? No problem. We offer full refunds or exchanges 
                    within 30 days of delivery. Simply contact us to start the process.
                  </p>
                </div>
                <div>
                  <h4 className="font-heading uppercase tracking-wide mb-2">How to Return</h4>
                  <ol className="list-decimal pl-6 text-muted-foreground space-y-2">
                    <li>Email hello@hellboundhs.com with your order number</li>
                    <li>Describe the issue or reason for return</li>
                    <li>We'll provide a prepaid return label (for defective items)</li>
                    <li>Ship the product back in its original packaging</li>
                    <li>Refund processed within 5-10 business days of receipt</li>
                  </ol>
                </div>
                <div>
                  <h4 className="font-heading uppercase tracking-wide mb-2">Damaged or Defective Items</h4>
                  <p className="text-muted-foreground">
                    If your order arrives damaged, take photos immediately and contact us within 48 
                    hours. We'll send a replacement at no additional cost.
                  </p>
                </div>
              </div>
            </div>

            {/* Guarantee */}
            <div className="bg-gradient-to-br from-primary/20 to-accent/10 rounded-xl border border-primary/30 p-8 text-center">
              <Shield className="h-12 w-12 text-primary mx-auto mb-4" />
              <h3 className="font-display text-2xl mb-4">Our Promise to You</h3>
              <p className="text-muted-foreground max-w-2xl mx-auto">
                Every bottle of Hellbound Hot Sauce is crafted with care and backed by our commitment 
                to quality. If you're ever unsatisfied with a purchase, we'll make it right. 
                That's the Hellbound guarantee.
              </p>
            </div>
          </div>
        </div>
      </section>
    </Layout>
  );
}
