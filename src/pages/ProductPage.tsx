import { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Minus, Plus, ShoppingCart, Star, Truck, Shield, ArrowLeft } from 'lucide-react';
import { Layout } from '@/components/layout/Layout';
import { Button } from '@/components/ui/button';
import { HeatLevel } from '@/components/ui/HeatLevel';
import { ProductGrid } from '@/components/product/ProductGrid';
import { getProductByHandle, products } from '@/data/products';
import { getReviewsByProductId } from '@/data/reviews';
import { useToast } from '@/hooks/use-toast';

export default function ProductPage() {
  const { handle } = useParams<{ handle: string }>();
  const product = handle ? getProductByHandle(handle) : undefined;
  const reviews = product ? getReviewsByProductId(product.id) : [];
  const relatedProducts = products.filter(p => p.id !== product?.id && p.category === product?.category).slice(0, 4);
  
  const [quantity, setQuantity] = useState(1);
  const { toast } = useToast();

  if (!product) {
    return (
      <Layout>
        <div className="container mx-auto px-4 py-20 text-center">
          <h1 className="font-display text-4xl mb-4">Product Not Found</h1>
          <p className="text-muted-foreground">The product you're looking for doesn't exist.</p>
        </div>
      </Layout>
    );
  }

  const handleAddToCart = () => {
    toast({
      title: "Added to cart!",
      description: `${quantity}x ${product.title} added to your cart.`,
    });
  };

  return (
    <Layout>
      <div className="container mx-auto px-4 lg:px-8 py-8">
        {/* Breadcrumb */}
        <nav className="flex items-center gap-2 text-sm text-muted-foreground mb-8">
          <Link to="/" className="hover:text-foreground transition-colors">Home</Link>
          <span>/</span>
          <Link to={`/collections/${product.category === 'hot-sauce' ? 'hot-sauces' : product.category === 'rub' ? 'bbq-rubs' : 'bundles'}`} className="hover:text-foreground transition-colors capitalize">
            {product.category === 'hot-sauce' ? 'Hot Sauces' : product.category === 'rub' ? 'BBQ Rubs' : 'Bundles'}
          </Link>
          <span>/</span>
          <span className="text-foreground">{product.title}</span>
        </nav>

        <div className="grid lg:grid-cols-2 gap-12 mb-20">
          {/* Images */}
          <div className="relative">
            <div className="aspect-square rounded-xl overflow-hidden border border-border bg-secondary/50">
              <img src={product.images[0]} alt={product.title} className="w-full h-full object-cover" />
            </div>
          </div>

          {/* Product Info */}
          <div>
            <div className="flex items-center gap-4 mb-4">
              <HeatLevel level={product.heatLevel} showLabel size="lg" />
              {product.scoville && (
                <span className="text-sm text-muted-foreground">({product.scoville})</span>
              )}
            </div>

            <h1 className="font-display text-4xl lg:text-5xl mb-4">{product.title}</h1>

            {product.reviews && (
              <div className="flex items-center gap-2 mb-6">
                <div className="flex gap-0.5">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className={`h-4 w-4 ${i < Math.round(product.reviews!.rating) ? 'fill-gold text-gold' : 'text-muted/30'}`} />
                  ))}
                </div>
                <span className="text-sm text-muted-foreground">
                  {product.reviews.rating} ({product.reviews.count} reviews)
                </span>
              </div>
            )}

            <div className="flex items-baseline gap-3 mb-6">
              <span className="font-display text-4xl text-primary">${product.price.toFixed(2)}</span>
              {product.compareAtPrice && (
                <span className="text-xl text-muted-foreground line-through">${product.compareAtPrice.toFixed(2)}</span>
              )}
            </div>

            <p className="text-lg text-muted-foreground mb-8">{product.longDescription || product.description}</p>

            {/* Quantity & Add to Cart */}
            <div className="flex flex-col sm:flex-row gap-4 mb-8">
              <div className="flex items-center border border-border rounded-lg">
                <Button variant="ghost" size="icon" onClick={() => setQuantity(Math.max(1, quantity - 1))}>
                  <Minus className="h-4 w-4" />
                </Button>
                <span className="w-12 text-center font-heading">{quantity}</span>
                <Button variant="ghost" size="icon" onClick={() => setQuantity(quantity + 1)}>
                  <Plus className="h-4 w-4" />
                </Button>
              </div>
              <Button onClick={handleAddToCart} className="flex-1 bg-gradient-fire hover:opacity-90 font-heading text-lg h-12">
                <ShoppingCart className="mr-2 h-5 w-5" />
                Add to Cart
              </Button>
            </div>

            {/* Trust badges */}
            <div className="grid grid-cols-2 gap-4 p-4 rounded-lg bg-secondary/30 border border-border">
              <div className="flex items-center gap-3">
                <Truck className="h-5 w-5 text-primary" />
                <div className="text-sm">
                  <p className="font-medium">Free Shipping</p>
                  <p className="text-muted-foreground">On orders over $50</p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <Shield className="h-5 w-5 text-primary" />
                <div className="text-sm">
                  <p className="font-medium">Quality Guarantee</p>
                  <p className="text-muted-foreground">100% satisfaction</p>
                </div>
              </div>
            </div>

            {/* Ingredients & Pairings */}
            {product.ingredients && (
              <div className="mt-8">
                <h3 className="font-heading text-lg uppercase tracking-wide mb-3">Ingredients</h3>
                <p className="text-muted-foreground">{product.ingredients.join(', ')}</p>
              </div>
            )}

            {product.pairings && (
              <div className="mt-6">
                <h3 className="font-heading text-lg uppercase tracking-wide mb-3">Perfect Pairings</h3>
                <div className="flex flex-wrap gap-2">
                  {product.pairings.map((pairing) => (
                    <span key={pairing} className="px-3 py-1 rounded-full bg-secondary text-sm">
                      {pairing}
                    </span>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Reviews */}
        {reviews.length > 0 && (
          <section className="mb-20">
            <h2 className="font-display text-3xl mb-8">Customer Reviews</h2>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {reviews.map((review) => (
                <div key={review.id} className="p-6 rounded-xl bg-card border border-border">
                  <div className="flex gap-1 mb-3">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className={`h-4 w-4 ${i < review.rating ? 'fill-gold text-gold' : 'text-muted/30'}`} />
                    ))}
                  </div>
                  <h4 className="font-heading uppercase tracking-wide mb-2">{review.title}</h4>
                  <p className="text-muted-foreground text-sm mb-4">{review.content}</p>
                  <div className="flex justify-between items-center pt-4 border-t border-border">
                    <span className="text-sm font-medium">{review.author}</span>
                    {review.verified && <span className="text-xs text-green-500">✓ Verified</span>}
                  </div>
                </div>
              ))}
            </div>
          </section>
        )}

        {/* Related Products */}
        {relatedProducts.length > 0 && (
          <section>
            <h2 className="font-display text-3xl mb-8">You May Also Like</h2>
            <ProductGrid products={relatedProducts} columns={4} />
          </section>
        )}
      </div>
    </Layout>
  );
}
