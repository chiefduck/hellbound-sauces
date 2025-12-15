import { Layout } from '@/components/layout/Layout';
import { RotateCcw, Package, CheckCircle, AlertCircle, Gift, Mail } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';

export default function RefundPage() {
  return (
    <Layout>
      <section className="py-20 lg:py-28">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-16">
              <h1 className="font-display text-5xl lg:text-6xl mb-6">Return and Refund Policy</h1>
              <p className="text-xl text-muted-foreground">
                Your Satisfaction is Our Heat!
              </p>
              <p className="text-lg text-muted-foreground mt-4">
                At HellBound Sauces, we stand behind the quality and flavor of our hot sauces. If you're not entirely satisfied with your purchase, we're here to help.
              </p>
            </div>

            {/* Returns */}
            <div className="mb-16">
              <div className="flex items-center gap-4 mb-6">
                <RotateCcw className="h-8 w-8 text-primary" />
                <h2 className="font-display text-3xl">Returns</h2>
              </div>
              <div className="bg-card rounded-xl border border-border p-8 space-y-6">
                <div>
                  <h3 className="font-heading uppercase tracking-wide mb-3 flex items-center gap-2 text-lg">
                    <CheckCircle className="h-5 w-5 text-primary" />
                    Eligibility
                  </h3>
                  <p className="text-muted-foreground">
                    You have <strong className="text-foreground">30 days from the date of purchase</strong> to return your product.
                  </p>
                </div>

                <div>
                  <h3 className="font-heading uppercase tracking-wide mb-3 flex items-center gap-2 text-lg">
                    <Package className="h-5 w-5 text-primary" />
                    Condition
                  </h3>
                  <p className="text-muted-foreground">
                    To be eligible for a return, the item must be <strong className="text-foreground">unused and in the same condition that you received it</strong>. It must also be in the original packaging.
                  </p>
                </div>

                <div>
                  <h3 className="font-heading uppercase tracking-wide mb-3 flex items-center gap-2 text-lg">
                    <Mail className="h-5 w-5 text-primary" />
                    Process
                  </h3>
                  <p className="text-muted-foreground">
                    To initiate a return, please contact us at{' '}
                    <a href="mailto:Scott@HellBoundSauces.com" className="text-primary hover:underline font-medium">
                      Scott@HellBoundSauces.com
                    </a>{' '}
                    with your order number and reason for the return. We will provide you with instructions on how and where to send your package.
                  </p>
                </div>

                <div className="bg-secondary/30 rounded-lg p-6">
                  <h3 className="font-heading uppercase tracking-wide mb-3 flex items-center gap-2">
                    <AlertCircle className="h-5 w-5 text-primary" />
                    Return Shipping
                  </h3>
                  <p className="text-muted-foreground">
                    Customers are responsible for return shipping costs. These costs are non-refundable. If you receive a refund, the cost of return shipping will be deducted from your refund.
                  </p>
                </div>
              </div>
            </div>

            {/* Refunds */}
            <div className="mb-16">
              <h2 className="font-display text-3xl mb-6">Refunds</h2>
              <div className="space-y-6">
                <Card className="bg-card border-border">
                  <CardContent className="p-6">
                    <h3 className="font-heading uppercase tracking-wide mb-3 text-lg">Inspection</h3>
                    <p className="text-muted-foreground">
                      Once we receive your returned item, we will inspect it and notify you of the status of your refund.
                    </p>
                  </CardContent>
                </Card>

                <Card className="bg-card border-border">
                  <CardContent className="p-6">
                    <h3 className="font-heading uppercase tracking-wide mb-3 text-lg">Approval</h3>
                    <p className="text-muted-foreground">
                      If your return is approved, we will initiate a refund to your original method of payment.
                    </p>
                  </CardContent>
                </Card>

                <Card className="bg-card border-border">
                  <CardContent className="p-6">
                    <h3 className="font-heading uppercase tracking-wide mb-3 text-lg">Timing</h3>
                    <p className="text-muted-foreground">
                      You will receive the credit within a certain amount of days, depending on your card issuer's policies.
                    </p>
                  </CardContent>
                </Card>
              </div>
            </div>

            {/* Exchanges */}
            <div className="mb-16">
              <h2 className="font-display text-3xl mb-6">Exchanges</h2>
              <div className="bg-card rounded-xl border border-border p-8">
                <h3 className="font-heading uppercase tracking-wide mb-3 flex items-center gap-2 text-lg">
                  <RotateCcw className="h-5 w-5 text-primary" />
                  Defective or Damaged Products
                </h3>
                <p className="text-muted-foreground">
                  If you receive a defective or damaged product, we are happy to exchange it for the same item. Please email us at{' '}
                  <a href="mailto:Scott@HellBoundSauces.com" className="text-primary hover:underline font-medium">
                    Scott@HellBoundSauces.com
                  </a>{' '}
                  to arrange an exchange.
                </p>
              </div>
            </div>

            {/* Gifts */}
            <div className="mb-16">
              <div className="flex items-center gap-4 mb-6">
                <Gift className="h-8 w-8 text-primary" />
                <h2 className="font-display text-3xl">Gifts</h2>
              </div>
              <div className="bg-card rounded-xl border border-border p-8">
                <p className="text-muted-foreground">
                  If the item was marked as a gift when purchased and shipped directly to you, you'll receive a gift credit for the value of your return.
                </p>
              </div>
            </div>

            {/* Contact Us */}
            <div className="bg-gradient-to-br from-primary/20 to-accent/10 rounded-xl border border-primary/30 p-8 text-center">
              <h3 className="font-display text-2xl mb-4">Contact Us</h3>
              <p className="text-muted-foreground max-w-2xl mx-auto mb-6">
                If you have any questions on how to return your item to us, contact us at{' '}
                <a href="mailto:Scott@HellBoundSauces.com" className="text-primary hover:underline font-medium">
                  Scott@HellBoundSauces.com
                </a>
                .
              </p>
              <p className="text-foreground font-medium">
                Thank you for choosing HellBound Sauces, where every drop is an adventure in flavor!
              </p>
            </div>
          </div>
        </div>
      </section>
    </Layout>
  );
}
