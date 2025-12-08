import { Layout } from '@/components/layout/Layout';

export default function TermsPage() {
  return (
    <Layout>
      <section className="py-20 lg:py-28">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="max-w-3xl mx-auto">
            <h1 className="font-display text-5xl lg:text-6xl mb-6">Terms of Service</h1>
            <p className="text-muted-foreground mb-8">Last updated: January 1, 2024</p>

            <div className="prose prose-invert prose-lg max-w-none space-y-8">
              <section>
                <h2 className="font-display text-2xl mb-4">1. Acceptance of Terms</h2>
                <p className="text-muted-foreground">
                  By accessing or using the Hellbound Hot Sauce website and services, you agree to be 
                  bound by these Terms of Service. If you do not agree to these terms, please do not 
                  use our services.
                </p>
              </section>

              <section>
                <h2 className="font-display text-2xl mb-4">2. Products and Orders</h2>
                <h3 className="font-heading text-lg uppercase tracking-wide mt-4 mb-2">Product Descriptions</h3>
                <p className="text-muted-foreground">
                  We strive to accurately describe our products. However, we do not warrant that product 
                  descriptions, images, or other content are accurate, complete, or error-free. Colors 
                  may vary due to monitor settings.
                </p>
                <h3 className="font-heading text-lg uppercase tracking-wide mt-4 mb-2">Pricing</h3>
                <p className="text-muted-foreground">
                  All prices are in USD unless otherwise stated. We reserve the right to change prices 
                  at any time. Promotional prices are valid only during the promotion period.
                </p>
                <h3 className="font-heading text-lg uppercase tracking-wide mt-4 mb-2">Order Acceptance</h3>
                <p className="text-muted-foreground">
                  We reserve the right to refuse or cancel any order for any reason, including 
                  suspected fraud, product unavailability, or pricing errors.
                </p>
              </section>

              <section>
                <h2 className="font-display text-2xl mb-4">3. Shipping and Delivery</h2>
                <p className="text-muted-foreground">
                  Shipping times are estimates and not guaranteed. We are not responsible for delays 
                  caused by carriers, customs, or events beyond our control. Risk of loss passes to you 
                  upon delivery to the carrier.
                </p>
              </section>

              <section>
                <h2 className="font-display text-2xl mb-4">4. Returns and Refunds</h2>
                <p className="text-muted-foreground">
                  We offer a 30-day satisfaction guarantee on all products. To initiate a return, 
                  contact us at hello@hellboundhs.com. Refunds will be processed within 5-10 business 
                  days of approval. Shipping costs are non-refundable unless the return is due to our error.
                </p>
              </section>

              <section>
                <h2 className="font-display text-2xl mb-4">5. User Accounts</h2>
                <p className="text-muted-foreground">
                  You are responsible for maintaining the confidentiality of your account credentials 
                  and for all activities under your account. You must provide accurate and complete 
                  information when creating an account.
                </p>
              </section>

              <section>
                <h2 className="font-display text-2xl mb-4">6. Intellectual Property</h2>
                <p className="text-muted-foreground">
                  All content on this website, including text, graphics, logos, images, and software, 
                  is the property of Hellbound Hot Sauce and protected by copyright and trademark laws. 
                  You may not reproduce, distribute, or create derivative works without our written permission.
                </p>
              </section>

              <section>
                <h2 className="font-display text-2xl mb-4">7. User Conduct</h2>
                <p className="text-muted-foreground">You agree not to:</p>
                <ul className="list-disc pl-6 text-muted-foreground space-y-2">
                  <li>Use our services for any unlawful purpose</li>
                  <li>Interfere with or disrupt our services</li>
                  <li>Attempt to gain unauthorized access to our systems</li>
                  <li>Submit false or misleading information</li>
                  <li>Violate any applicable laws or regulations</li>
                </ul>
              </section>

              <section>
                <h2 className="font-display text-2xl mb-4">8. Disclaimer of Warranties</h2>
                <p className="text-muted-foreground">
                  OUR SERVICES ARE PROVIDED "AS IS" WITHOUT WARRANTIES OF ANY KIND, EXPRESS OR IMPLIED. 
                  WE DO NOT WARRANT THAT OUR SERVICES WILL BE UNINTERRUPTED OR ERROR-FREE.
                </p>
                <p className="text-muted-foreground mt-4">
                  <strong>Hot Sauce Warning:</strong> Our products contain capsaicin and are extremely 
                  spicy. Use at your own risk. We are not responsible for any adverse reactions. 
                  Consult a physician if you have concerns about consuming spicy foods.
                </p>
              </section>

              <section>
                <h2 className="font-display text-2xl mb-4">9. Limitation of Liability</h2>
                <p className="text-muted-foreground">
                  TO THE MAXIMUM EXTENT PERMITTED BY LAW, HELLBOUND HOT SAUCE SHALL NOT BE LIABLE FOR 
                  ANY INDIRECT, INCIDENTAL, SPECIAL, CONSEQUENTIAL, OR PUNITIVE DAMAGES ARISING FROM 
                  YOUR USE OF OUR SERVICES.
                </p>
              </section>

              <section>
                <h2 className="font-display text-2xl mb-4">10. Indemnification</h2>
                <p className="text-muted-foreground">
                  You agree to indemnify and hold harmless Hellbound Hot Sauce, its officers, directors, 
                  employees, and agents from any claims, damages, or expenses arising from your use of 
                  our services or violation of these terms.
                </p>
              </section>

              <section>
                <h2 className="font-display text-2xl mb-4">11. Governing Law</h2>
                <p className="text-muted-foreground">
                  These terms are governed by the laws of the State of Texas, without regard to conflict 
                  of law provisions. Any disputes shall be resolved in the courts of Travis County, Texas.
                </p>
              </section>

              <section>
                <h2 className="font-display text-2xl mb-4">12. Changes to Terms</h2>
                <p className="text-muted-foreground">
                  We reserve the right to modify these terms at any time. Changes will be effective 
                  immediately upon posting. Your continued use of our services constitutes acceptance 
                  of the modified terms.
                </p>
              </section>

              <section>
                <h2 className="font-display text-2xl mb-4">13. Contact</h2>
                <p className="text-muted-foreground">
                  For questions about these terms, contact us at:<br />
                  Email: legal@hellboundhs.com<br />
                  Address: Austin, Texas, United States
                </p>
              </section>
            </div>
          </div>
        </div>
      </section>
    </Layout>
  );
}
