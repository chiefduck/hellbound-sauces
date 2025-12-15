import { Layout } from '@/components/layout/Layout';
import { Truck, Clock, Globe, Package, RefreshCw, Shield, MapPin, AlertCircle } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';

export default function ShippingPage() {
  return (
    <Layout>
      <section className="py-20 lg:py-28">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-16">
              <h1 className="font-display text-5xl lg:text-6xl mb-6">Shipping Policy</h1>
              <p className="text-xl text-muted-foreground">
                We're dedicated to delivering our fiery hot sauces to your doorstep quickly and efficiently.
              </p>
            </div>

            {/* Processing Time */}
            <div className="mb-16">
              <div className="flex items-center gap-4 mb-6">
                <Clock className="h-8 w-8 text-primary" />
                <h2 className="font-display text-3xl">Processing Time</h2>
              </div>
              <div className="bg-card rounded-xl border border-border p-8">
                <p className="text-muted-foreground">
                  Orders are typically processed within <strong className="text-foreground">1-2 business days</strong>. Note that during peak seasons or promotional events, processing times may be longer.
                </p>
              </div>
            </div>

            {/* Shipping Methods */}
            <div className="mb-16">
              <h2 className="font-display text-3xl mb-6">Shipping Methods and Timelines</h2>
              <p className="text-muted-foreground mb-8">
                We offer various shipping options to suit your needs. Delivery times can vary depending on location and other factors.
              </p>
              <div className="grid md:grid-cols-2 gap-6">
                <Card className="bg-card border-border">
                  <CardContent className="p-6">
                    <Truck className="h-10 w-10 text-primary mb-4" />
                    <h3 className="font-heading uppercase tracking-wide mb-2 text-lg">Standard Shipping</h3>
                    <p className="text-muted-foreground mb-4">Expected delivery in <strong className="text-foreground">3-5 business days</strong> post-processing.</p>
                    <p className="text-sm text-primary font-medium">Free Standard Shipping available for orders surpassing a certain amount.</p>
                  </CardContent>
                </Card>
                <Card className="bg-card border-border">
                  <CardContent className="p-6">
                    <Package className="h-10 w-10 text-primary mb-4" />
                    <h3 className="font-heading uppercase tracking-wide mb-2 text-lg">Expedited Shipping</h3>
                    <p className="text-muted-foreground mb-4">Expected delivery in <strong className="text-foreground">1-3 business days</strong> post-processing.</p>
                    <p className="text-sm text-muted-foreground">For faster delivery when you need it.</p>
                  </CardContent>
                </Card>
              </div>
              <div className="mt-6 bg-secondary/30 rounded-xl border border-border p-6">
                <h4 className="font-heading uppercase tracking-wide mb-3 flex items-center gap-2">
                  <AlertCircle className="h-5 w-5 text-primary" />
                  Shipping Costs
                </h4>
                <p className="text-muted-foreground">
                  Shipping fees are determined based on your order's weight and the chosen shipping method.
                </p>
              </div>
            </div>

            {/* International Shipping */}
            <div className="mb-16">
              <div className="flex items-center gap-4 mb-6">
                <Globe className="h-8 w-8 text-primary" />
                <h2 className="font-display text-3xl">International Shipping</h2>
              </div>
              <div className="bg-card rounded-xl border border-border p-8">
                <p className="text-muted-foreground">
                  Delivery times may vary based on destination.
                </p>
              </div>
            </div>

            {/* Order Tracking */}
            <div className="mb-16">
              <div className="flex items-center gap-4 mb-6">
                <MapPin className="h-8 w-8 text-primary" />
                <h2 className="font-display text-3xl">Order Tracking</h2>
              </div>
              <div className="bg-card rounded-xl border border-border p-8">
                <p className="text-muted-foreground">
                  You will receive a tracking number via email once your order is dispatched.
                </p>
              </div>
            </div>

            {/* Delivery Issues */}
            <div className="mb-16">
              <div className="flex items-center gap-4 mb-6">
                <AlertCircle className="h-8 w-8 text-primary" />
                <h2 className="font-display text-3xl">Delivery Issues</h2>
              </div>
              <div className="bg-card rounded-xl border border-border p-8">
                <p className="text-muted-foreground">
                  In case of delivery issues, such as missing or damaged packages, contact us right away at{' '}
                  <a href="mailto:Scott@HellBoundSauces.com" className="text-primary hover:underline font-medium">
                    Scott@HellBoundSauces.com
                  </a>
                  . We'll strive to resolve the issue promptly.
                </p>
              </div>
            </div>

            {/* Address Accuracy */}
            <div className="mb-16">
              <div className="bg-secondary/30 rounded-xl border border-border p-8">
                <h3 className="font-heading uppercase tracking-wide mb-4 flex items-center gap-2 text-lg">
                  <Shield className="h-6 w-6 text-primary" />
                  Address Accuracy
                </h3>
                <p className="text-muted-foreground">
                  Please verify your shipping address before order confirmation. We are not accountable for orders sent to incorrect addresses provided by the customer.
                </p>
              </div>
            </div>

            {/* Returns and Exchanges */}
            <div className="mb-16">
              <div className="flex items-center gap-4 mb-6">
                <RefreshCw className="h-8 w-8 text-primary" />
                <h2 className="font-display text-3xl">Returns and Exchanges</h2>
              </div>
              <div className="bg-card rounded-xl border border-border p-8">
                <p className="text-muted-foreground">
                  For returns or exchanges, kindly refer to our Return and Refund Policy.
                </p>
              </div>
            </div>

            {/* Contact Us */}
            <div className="bg-gradient-to-br from-primary/20 to-accent/10 rounded-xl border border-primary/30 p-8 text-center">
              <h3 className="font-display text-2xl mb-4">Contact Us</h3>
              <p className="text-muted-foreground max-w-2xl mx-auto mb-6">
                For any inquiries regarding your order or our shipping policies, please contact us at{' '}
                <a href="mailto:Scott@HellBoundSauces.com" className="text-primary hover:underline font-medium">
                  Scott@HellBoundSauces.com
                </a>
                .
              </p>
              <p className="text-foreground font-medium">
                Thank you for choosing HellBound Sauces for your hot sauce adventure. We can't wait to spice up your meals! 🌶️
              </p>
            </div>
          </div>
        </div>
      </section>
    </Layout>
  );
}
