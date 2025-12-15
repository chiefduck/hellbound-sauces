import { Layout } from '@/components/layout/Layout';
import { RefreshCw, Package, ShoppingBag, Clock, Mail, AlertCircle, CheckCircle } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';

export default function CancellationPage() {
  return (
    <Layout>
      <section className="py-20 lg:py-28">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-16">
              <h1 className="font-display text-5xl lg:text-6xl mb-6">Cancellation Policy</h1>
              <p className="text-xl text-muted-foreground">
                Some items in our store may be offered to you as a subscription, a pre-order or try before you buy. This cancellation policy lays out how you can change or cancel these kinds of purchases.
              </p>
            </div>

            {/* Subscriptions */}
            <div className="mb-16">
              <div className="flex items-center gap-4 mb-6">
                <RefreshCw className="h-8 w-8 text-primary" />
                <h2 className="font-display text-3xl">Subscriptions</h2>
              </div>
              <div className="bg-card rounded-xl border border-border p-8 space-y-4">
                <p className="text-muted-foreground">
                  When you purchase a subscription you'll receive repeat deliveries. These are based on the subscription preferences you selected at the time of purchase.
                </p>
                <div className="bg-secondary/30 rounded-lg p-6">
                  <h3 className="font-heading uppercase tracking-wide mb-3 flex items-center gap-2">
                    <CheckCircle className="h-5 w-5 text-primary" />
                    Your Rights
                  </h3>
                  <p className="text-muted-foreground mb-3">
                    You have the right to cancel your subscription at any time. To do this, you can:
                  </p>
                  <ul className="list-disc list-inside text-muted-foreground space-y-2 ml-4">
                    <li>Log into your account and manage your subscriptions</li>
                    <li>Contact us directly at{' '}
                      <a href="mailto:Scott@HellBoundSauces.com" className="text-primary hover:underline font-medium">
                        Scott@HellBoundSauces.com
                      </a>
                    </li>
                  </ul>
                </div>
                <div className="bg-secondary/30 rounded-lg p-6">
                  <h3 className="font-heading uppercase tracking-wide mb-3 flex items-center gap-2">
                    <Clock className="h-5 w-5 text-primary" />
                    Timing
                  </h3>
                  <p className="text-muted-foreground">
                    To ensure your cancellation is processed in time, please submit your request at least{' '}
                    <strong className="text-foreground">48 hours before your next scheduled delivery</strong>.
                  </p>
                </div>
                <p className="text-muted-foreground">
                  Once cancelled, you will not be charged for any future deliveries. Any deliveries already processed or in transit will still be fulfilled.
                </p>
              </div>
            </div>

            {/* Pre-orders */}
            <div className="mb-16">
              <div className="flex items-center gap-4 mb-6">
                <Package className="h-8 w-8 text-primary" />
                <h2 className="font-display text-3xl">Pre-orders</h2>
              </div>
              <div className="bg-card rounded-xl border border-border p-8 space-y-4">
                <p className="text-muted-foreground">
                  When you pre-order a product, you're securing your spot for an upcoming release. Pre-orders allow us to gauge interest and ensure we have enough inventory for our customers.
                </p>
                <div className="bg-secondary/30 rounded-lg p-6">
                  <h3 className="font-heading uppercase tracking-wide mb-3 flex items-center gap-2">
                    <CheckCircle className="h-5 w-5 text-primary" />
                    Cancellation Window
                  </h3>
                  <p className="text-muted-foreground">
                    You may cancel your pre-order at any time <strong className="text-foreground">before the product ships</strong>. Once the item has been prepared for shipment or dispatched, the cancellation window has closed.
                  </p>
                </div>
                <div className="bg-secondary/30 rounded-lg p-6">
                  <h3 className="font-heading uppercase tracking-wide mb-3 flex items-center gap-2">
                    <Mail className="h-5 w-5 text-primary" />
                    How to Cancel
                  </h3>
                  <p className="text-muted-foreground">
                    To cancel a pre-order, please contact us at{' '}
                    <a href="mailto:Scott@HellBoundSauces.com" className="text-primary hover:underline font-medium">
                      Scott@HellBoundSauces.com
                    </a>{' '}
                    with your order number. We'll process your cancellation and issue a full refund to your original payment method.
                  </p>
                </div>
                <div className="mt-6 bg-primary/10 rounded-lg border border-primary/30 p-6">
                  <h4 className="font-heading uppercase tracking-wide mb-3 flex items-center gap-2">
                    <AlertCircle className="h-5 w-5 text-primary" />
                    Important Note
                  </h4>
                  <p className="text-muted-foreground">
                    If your pre-order has already shipped, it cannot be cancelled. However, you may return it according to our Return and Refund Policy once you receive it.
                  </p>
                </div>
              </div>
            </div>

            {/* Try Before You Buy */}
            <div className="mb-16">
              <div className="flex items-center gap-4 mb-6">
                <ShoppingBag className="h-8 w-8 text-primary" />
                <h2 className="font-display text-3xl">Try Before You Buy</h2>
              </div>
              <div className="bg-card rounded-xl border border-border p-8 space-y-4">
                <p className="text-muted-foreground">
                  Our "Try Before You Buy" program allows you to sample products before committing to a full purchase. Here's how it works:
                </p>
                <div className="bg-secondary/30 rounded-lg p-6">
                  <h3 className="font-heading uppercase tracking-wide mb-3 flex items-center gap-2">
                    <CheckCircle className="h-5 w-5 text-primary" />
                    Trial Period
                  </h3>
                  <p className="text-muted-foreground">
                    You'll receive your trial product to evaluate. During this period, you can decide whether to keep it or return it at no additional cost.
                  </p>
                </div>
                <div className="bg-secondary/30 rounded-lg p-6">
                  <h3 className="font-heading uppercase tracking-wide mb-3 flex items-center gap-2">
                    <Clock className="h-5 w-5 text-primary" />
                    Cancellation Timeframe
                  </h3>
                  <p className="text-muted-foreground">
                    If you decide the product isn't for you, you can cancel within the trial period specified in your order confirmation. Simply return the unused product and you won't be charged.
                  </p>
                </div>
                <div className="bg-secondary/30 rounded-lg p-6">
                  <h3 className="font-heading uppercase tracking-wide mb-3 flex items-center gap-2">
                    <Mail className="h-5 w-5 text-primary" />
                    How to Cancel
                  </h3>
                  <p className="text-muted-foreground">
                    Contact us at{' '}
                    <a href="mailto:Scott@HellBoundSauces.com" className="text-primary hover:underline font-medium">
                      Scott@HellBoundSauces.com
                    </a>{' '}
                    to initiate your return. We'll provide you with return instructions and ensure no charges are applied to your account.
                  </p>
                </div>
              </div>
            </div>

            {/* Returns Reference */}
            <div className="mb-16">
              <div className="bg-secondary/30 rounded-xl border border-border p-8">
                <h3 className="font-heading uppercase tracking-wide mb-4 flex items-center gap-2 text-lg">
                  <RefreshCw className="h-6 w-6 text-primary" />
                  Returns and Refunds
                </h3>
                <p className="text-muted-foreground">
                  For standard orders and general return inquiries, please refer to our Return and Refund Policy. That policy covers items purchased outside of subscriptions, pre-orders, or try-before-you-buy programs.
                </p>
              </div>
            </div>

            {/* Contact Us */}
            <div className="bg-gradient-to-br from-primary/20 to-accent/10 rounded-xl border border-primary/30 p-8 text-center">
              <h3 className="font-display text-2xl mb-4">Questions About Cancellations?</h3>
              <p className="text-muted-foreground max-w-2xl mx-auto mb-6">
                If you have any questions about cancelling a subscription, pre-order, or try-before-you-buy purchase, please don't hesitate to contact us at{' '}
                <a href="mailto:Scott@HellBoundSauces.com" className="text-primary hover:underline font-medium">
                  Scott@HellBoundSauces.com
                </a>
                .
              </p>
              <p className="text-foreground font-medium">
                We're here to help make your HellBound Sauces experience as smooth as possible.
              </p>
            </div>
          </div>
        </div>
      </section>
    </Layout>
  );
}
