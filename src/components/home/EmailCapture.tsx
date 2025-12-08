import { useState } from 'react';
import { Flame, Gift } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { useToast } from '@/hooks/use-toast';

export function EmailCapture() {
  const [email, setEmail] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    toast({
      title: "Welcome to the family!",
      description: "Check your inbox for your 15% discount code.",
    });
    
    setEmail('');
    setIsLoading(false);
  };

  return (
    <section className="py-20 lg:py-28 relative overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-r from-primary/20 via-accent/10 to-primary/20" />
      <div className="absolute inset-0 bg-charcoal/90" />
      
      <div className="container mx-auto px-4 lg:px-8 relative z-10">
        <div className="max-w-3xl mx-auto text-center">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-primary/20 mb-6">
            <Gift className="h-8 w-8 text-primary" />
          </div>
          
          <h2 className="font-display text-4xl lg:text-5xl mb-4">
            <span className="text-gradient-fire">Get 15% Off</span>
            <br />
            Your First Order
          </h2>
          
          <p className="text-muted-foreground text-lg mb-8">
            Sign up for exclusive access to new products, recipes, and special offers.
          </p>

          <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-4 max-w-lg mx-auto">
            <Input
              type="email"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="bg-secondary/50 border-border focus:border-primary text-lg h-12"
            />
            <Button
              type="submit"
              disabled={isLoading}
              className="bg-gradient-fire hover:opacity-90 font-heading tracking-wide text-lg h-12 px-8 whitespace-nowrap"
            >
              {isLoading ? (
                <Flame className="h-5 w-5 animate-spin" />
              ) : (
                'Get My Discount'
              )}
            </Button>
          </form>

          <p className="text-xs text-muted-foreground mt-4">
            By signing up, you agree to our Privacy Policy. Unsubscribe anytime.
          </p>
        </div>
      </div>
    </section>
  );
}
