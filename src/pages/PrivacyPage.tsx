import { Layout } from '@/components/layout/Layout';

export default function PrivacyPage() {
  return (
    <Layout>
      <section className="py-20 lg:py-28">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="max-w-3xl mx-auto">
            <h1 className="font-display text-5xl lg:text-6xl mb-6">Privacy Policy</h1>
            <p className="text-muted-foreground mb-8">Last updated: January 1, 2024</p>

            <div className="prose prose-invert prose-lg max-w-none space-y-8">
              <section>
                <h2 className="font-display text-2xl mb-4">1. Information We Collect</h2>
                <p className="text-muted-foreground">
                  We collect information you provide directly to us, such as when you create an account, 
                  make a purchase, subscribe to our newsletter, or contact us for support.
                </p>
                <h3 className="font-heading text-lg uppercase tracking-wide mt-4 mb-2">Personal Information</h3>
                <ul className="list-disc pl-6 text-muted-foreground space-y-2">
                  <li>Name and contact information (email address, phone number, shipping address)</li>
                  <li>Payment information (processed securely through our payment providers)</li>
                  <li>Order history and preferences</li>
                  <li>Communications with our customer service team</li>
                </ul>
                <h3 className="font-heading text-lg uppercase tracking-wide mt-4 mb-2">Automatically Collected Information</h3>
                <ul className="list-disc pl-6 text-muted-foreground space-y-2">
                  <li>Device and browser information</li>
                  <li>IP address and location data</li>
                  <li>Browsing behavior on our website</li>
                  <li>Cookies and similar tracking technologies</li>
                </ul>
              </section>

              <section>
                <h2 className="font-display text-2xl mb-4">2. How We Use Your Information</h2>
                <p className="text-muted-foreground">We use the information we collect to:</p>
                <ul className="list-disc pl-6 text-muted-foreground space-y-2">
                  <li>Process and fulfill your orders</li>
                  <li>Send order confirmations and shipping updates</li>
                  <li>Respond to your questions and provide customer support</li>
                  <li>Send marketing communications (with your consent)</li>
                  <li>Improve our website and products</li>
                  <li>Detect and prevent fraud</li>
                  <li>Comply with legal obligations</li>
                </ul>
              </section>

              <section>
                <h2 className="font-display text-2xl mb-4">3. Information Sharing</h2>
                <p className="text-muted-foreground">
                  We do not sell your personal information. We may share your information with:
                </p>
                <ul className="list-disc pl-6 text-muted-foreground space-y-2">
                  <li>Service providers who assist in our operations (shipping, payment processing)</li>
                  <li>Legal authorities when required by law</li>
                  <li>Business partners with your explicit consent</li>
                </ul>
              </section>

              <section>
                <h2 className="font-display text-2xl mb-4">4. Data Security</h2>
                <p className="text-muted-foreground">
                  We implement industry-standard security measures to protect your personal information. 
                  This includes SSL encryption, secure payment processing, and regular security audits. 
                  However, no method of transmission over the Internet is 100% secure.
                </p>
              </section>

              <section>
                <h2 className="font-display text-2xl mb-4">5. Your Rights</h2>
                <p className="text-muted-foreground">You have the right to:</p>
                <ul className="list-disc pl-6 text-muted-foreground space-y-2">
                  <li>Access the personal information we hold about you</li>
                  <li>Request correction of inaccurate information</li>
                  <li>Request deletion of your information</li>
                  <li>Opt out of marketing communications</li>
                  <li>Data portability (receive your data in a structured format)</li>
                </ul>
              </section>

              <section>
                <h2 className="font-display text-2xl mb-4">6. Cookies</h2>
                <p className="text-muted-foreground">
                  We use cookies and similar technologies to enhance your experience, analyze site usage, 
                  and assist in our marketing efforts. You can control cookie preferences through your 
                  browser settings.
                </p>
              </section>

              <section>
                <h2 className="font-display text-2xl mb-4">7. Children's Privacy</h2>
                <p className="text-muted-foreground">
                  Our services are not directed to individuals under 18. We do not knowingly collect 
                  personal information from children. If we learn we have collected information from a 
                  child, we will delete it promptly.
                </p>
              </section>

              <section>
                <h2 className="font-display text-2xl mb-4">8. Changes to This Policy</h2>
                <p className="text-muted-foreground">
                  We may update this privacy policy from time to time. We will notify you of any material 
                  changes by posting the new policy on this page and updating the "Last updated" date.
                </p>
              </section>

              <section>
                <h2 className="font-display text-2xl mb-4">9. Contact Us</h2>
                <p className="text-muted-foreground">
                  If you have questions about this privacy policy or our practices, please contact us at:
                </p>
                <p className="text-muted-foreground mt-2">
                  Email: privacy@hellboundhs.com<br />
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
