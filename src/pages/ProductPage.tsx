import { useState, useEffect, useMemo } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Minus, Plus, ShoppingCart, Star, Truck, Shield, Loader2, ExternalLink } from 'lucide-react';
import { Layout } from '@/components/layout/Layout';
import { Button } from '@/components/ui/button';
import { HeatLevel } from '@/components/ui/HeatLevel';
import { ProductGrid } from '@/components/product/ProductGrid';
import { useShopifyProduct, useShopifyProducts } from '@/hooks/useShopifyProducts';
import { getProductReviews, getProductRatingStats } from '@/lib/judgeme';
import { useCart } from '@/contexts/CartContext';
import { useToast } from '@/hooks/use-toast';
import { SEOHead, ProductSchema, BreadcrumbSchema } from '@/components/seo';

export default function ProductPage() {
  const { handle } = useParams<{ handle: string }>();
  const { product, loading, error } = useShopifyProduct(handle || '');
  const { products: allProducts } = useShopifyProducts();

  // Get Judge.me reviews for this specific product
  const judgemeReviews = product ? getProductReviews(product.handle) : [];
  const ratingStats = product ? getProductRatingStats(product.handle) : { rating: 0, count: 0 };

  const relatedProducts = allProducts.filter(p => p.id !== product?.id && p.category === product?.category).slice(0, 4);

  const [quantity, setQuantity] = useState(1);
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);
  const [selectedOptions, setSelectedOptions] = useState<Record<string, string>>({});
  const { addItem } = useCart();
  const { toast } = useToast();

  // Extract unique option types from variants (e.g., "Color", "Size")
  const optionTypes = useMemo(() => {
    if (!product?.variants || product.variants.length <= 1) return [];

    const types = new Set<string>();
    product.variants.forEach(variant => {
      variant.selectedOptions?.forEach(option => {
        types.add(option.name);
      });
    });

    return Array.from(types);
  }, [product?.variants]);

  // Get available values for a specific option type
  const getOptionValues = (optionName: string) => {
    if (!product?.variants) return [];

    const values = new Set<string>();
    product.variants.forEach(variant => {
      const option = variant.selectedOptions?.find(opt => opt.name === optionName);
      if (option) values.add(option.value);
    });

    return Array.from(values);
  };

  // Check if a specific option value combination results in an out-of-stock variant
  const isOptionValueAvailable = (optionName: string, value: string) => {
    if (!product?.variants) return true;

    // Create temporary selected options with this value
    const tempOptions = { ...selectedOptions, [optionName]: value };

    // Find variant matching these options
    const matchingVariant = product.variants.find(variant => {
      return variant.selectedOptions?.every(option =>
        tempOptions[option.name] === option.value
      );
    });

    return matchingVariant?.availableForSale !== false;
  };

  // Find variant that matches all selected options
  const selectedVariant = useMemo(() => {
    if (!product?.variants) return product?.variants?.[0];

    // If no options selected yet, default to first variant
    if (Object.keys(selectedOptions).length === 0) {
      return product.variants[0];
    }

    // Find variant matching all selected options
    return product.variants.find(variant => {
      return variant.selectedOptions?.every(option =>
        selectedOptions[option.name] === option.value
      );
    }) || product.variants[0];
  }, [product?.variants, selectedOptions]);

  const displayPrice = selectedVariant?.price || product?.price || 0;
  const isSelectedVariantAvailable = selectedVariant?.availableForSale !== false;

  // Initialize selected options with first variant's options
  useEffect(() => {
    if (product?.variants && product.variants.length > 0 && Object.keys(selectedOptions).length === 0) {
      const firstVariant = product.variants[0];
      if (firstVariant.selectedOptions) {
        const initialOptions: Record<string, string> = {};
        firstVariant.selectedOptions.forEach(option => {
          initialOptions[option.name] = option.value;
        });
        setSelectedOptions(initialOptions);
      }
    }
  }, [product?.variants]);

  // Update image when variant changes
  useEffect(() => {
    if (selectedVariant?.image && productImages.includes(selectedVariant.image)) {
      const imageIndex = productImages.findIndex(img => img === selectedVariant.image);
      if (imageIndex !== -1) {
        setSelectedImageIndex(imageIndex);
      }
    }
  }, [selectedVariant]);

  // Handle option selection
  const handleOptionChange = (optionName: string, value: string) => {
    setSelectedOptions(prev => ({
      ...prev,
      [optionName]: value
    }));
  };

  if (loading) {
    return (
      <Layout>
        <div className="container mx-auto px-4 py-20 flex flex-col items-center justify-center min-h-[60vh]">
          <Loader2 className="h-12 w-12 text-primary animate-spin mb-4" />
          <p className="text-muted-foreground">Loading product from Shopify...</p>
        </div>
      </Layout>
    );
  }

  if (error) {
    return (
      <Layout>
        <div className="container mx-auto px-4 py-20 text-center">
          <h1 className="font-display text-4xl mb-4 text-red-500">Error Loading Product</h1>
          <p className="text-muted-foreground mb-4">{error.message}</p>
          <p className="text-sm text-muted-foreground">Check browser console for details</p>
        </div>
      </Layout>
    );
  }

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

  // Use Shopify images
  const productImages = product.images || ['/placeholder.svg'];
  const mainImage = productImages[selectedImageIndex];

  const handleAddToCart = () => {
    // Create product with selected variant info
    const productToAdd = {
      ...product,
      price: displayPrice,
      shopifyVariantId: selectedVariant?.id || product.shopifyVariantId,
      // Add variant title to product title if it's not "Default Title"
      title: selectedVariant && selectedVariant.title !== 'Default Title'
        ? `${product.title} - ${selectedVariant.title}`
        : product.title
    };

    addItem(productToAdd, quantity);
    toast({
      title: "Added to cart!",
      description: `${quantity}x ${productToAdd.title} added to your cart.`,
    });
    setQuantity(1);
  };

  const categoryLabel = product.category === 'hot-sauce' ? 'Hot Sauces'
    : product.category === 'rub' ? 'BBQ Rubs'
    : product.category === 'merch' ? 'Merch and Apparel'
    : 'Bundles';
  const categoryHandle = product.category === 'hot-sauce' ? 'hot-sauce'
    : product.category === 'rub' ? 'bbq-rubs'
    : product.category === 'merch' ? 'merch-and-apparel'
    : 'bundles';

  return (
    <Layout>
      <SEOHead
        title={`${product.title} | ${categoryLabel}`}
        description={product.longDescription || product.description}
        canonical={`/products/${product.handle}`}
        type="product"
        image={mainImage}
      />
      <ProductSchema product={product} />
      <BreadcrumbSchema items={[
        { name: 'Home', url: '/' },
        { name: categoryLabel, url: `/collections/${categoryHandle}` },
        { name: product.title, url: `/products/${product.handle}` }
      ]} />
      <div className="container mx-auto px-4 lg:px-8 py-8">
        {/* Breadcrumb */}
        <nav className="flex items-center gap-2 text-sm text-muted-foreground mb-8">
          <Link to="/" className="hover:text-foreground transition-colors">Home</Link>
          <span>/</span>
          <Link to={`/collections/${categoryHandle}`} className="hover:text-foreground transition-colors capitalize">
            {categoryLabel}
          </Link>
          <span>/</span>
          <span className="text-foreground">{product.title}</span>
        </nav>

        <div className="grid lg:grid-cols-2 gap-12 mb-20">
          {/* Images */}
          <div className="relative">
            <div className="aspect-square rounded-xl overflow-hidden border border-border mb-4">
              <img src={mainImage} alt={product.title} className="w-full h-full object-cover" />
            </div>

            {/* Thumbnail Gallery */}
            {productImages.length > 1 && (
              <div className="grid grid-cols-4 gap-3">
                {productImages.map((image, index) => (
                  <button
                    key={index}
                    onClick={() => setSelectedImageIndex(index)}
                    className={`aspect-square rounded-lg overflow-hidden border-2 transition-all ${
                      selectedImageIndex === index
                        ? 'border-primary ring-2 ring-primary/20'
                        : 'border-border hover:border-primary/50'
                    }`}
                  >
                    <img
                      src={image}
                      alt={`${product.title} - Image ${index + 1}`}
                      className="w-full h-full object-cover"
                    />
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Product Info */}
          <div>
            {product.heatLevel && (
              <div className="flex items-center gap-4 mb-4">
                <HeatLevel level={product.heatLevel} showLabel size="lg" />
                {product.scoville && (
                  <span className="text-sm text-muted-foreground">({product.scoville})</span>
                )}
              </div>
            )}

            <h1 className="font-display text-4xl lg:text-5xl mb-4">{product.title}</h1>

            {ratingStats.count > 0 && (
              <div className="flex items-center gap-2 mb-6">
                <div className="flex gap-0.5">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className={`h-4 w-4 ${i < Math.round(ratingStats.rating) ? 'fill-gold text-gold' : 'text-muted/30'}`} />
                  ))}
                </div>
                <span className="text-sm text-muted-foreground">
                  {ratingStats.rating} ({ratingStats.count} {ratingStats.count === 1 ? 'review' : 'reviews'})
                </span>
              </div>
            )}

            <div className="flex items-baseline gap-3 mb-6">
              <span className="font-display text-4xl text-primary">${displayPrice.toFixed(2)}</span>
              {product.compareAtPrice && (
                <span className="text-xl text-muted-foreground line-through">${product.compareAtPrice.toFixed(2)}</span>
              )}
            </div>

            {/* Description - render HTML for merch products (size charts), plain text for others */}
            <div className="text-lg text-muted-foreground mb-8 leading-relaxed">
              {product.category === 'merch' && (product as any).descriptionHtml ? (
                <div
                  dangerouslySetInnerHTML={{ __html: (product as any).descriptionHtml }}
                  className="prose prose-invert max-w-none [&_table]:w-full [&_table]:border-collapse [&_table]:my-4 [&_th]:border [&_th]:border-border [&_th]:bg-secondary/30 [&_th]:p-2 [&_th]:text-left [&_td]:border [&_td]:border-border [&_td]:p-2"
                />
              ) : (
                <div className="whitespace-pre-line">{product.longDescription || product.description}</div>
              )}
            </div>

            {/* Variant Selectors - Separate selectors for each option type (Color, Size, etc.) */}
            {optionTypes.length > 0 && (
              <div className="mb-6 space-y-6">
                {optionTypes.map((optionType) => {
                  const values = getOptionValues(optionType);
                  const isColorOption = optionType.toLowerCase() === 'color';

                  return (
                    <div key={optionType}>
                      <h3 className="font-heading text-sm uppercase tracking-wide mb-3">
                        {optionType}
                        {selectedOptions[optionType] && (
                          <span className="text-muted-foreground ml-2">
                            : {selectedOptions[optionType]}
                          </span>
                        )}
                      </h3>
                      <div className="flex flex-wrap gap-2">
                        {values.map((value) => {
                          const isSelected = selectedOptions[optionType] === value;
                          const isAvailable = isOptionValueAvailable(optionType, value);

                          return (
                            <button
                              key={value}
                              onClick={() => handleOptionChange(optionType, value)}
                              disabled={!isAvailable}
                              className={`px-4 py-2 rounded-lg border-2 font-heading text-sm uppercase tracking-wide transition-all relative ${
                                isSelected
                                  ? 'border-primary bg-primary/10 text-primary'
                                  : !isAvailable
                                  ? 'border-border/50 text-muted-foreground/50 cursor-not-allowed opacity-60'
                                  : 'border-border hover:border-primary/50'
                              }`}
                              title={!isAvailable ? `${value} - Sold Out` : value}
                            >
                              {value}
                              {!isAvailable && (
                                <span className="block text-[10px] text-red-500 font-normal mt-0.5">SOLD OUT</span>
                              )}
                            </button>
                          );
                        })}
                      </div>
                    </div>
                  );
                })}
              </div>
            )}

            {/* Quantity & Add to Cart */}
            <div className="flex flex-col sm:flex-row gap-4 mb-8">
              <div className="flex items-center border border-border rounded-lg">
                <Button variant="ghost" size="icon" onClick={() => setQuantity(Math.max(1, quantity - 1))} disabled={!isSelectedVariantAvailable}>
                  <Minus className="h-4 w-4" />
                </Button>
                <span className="w-12 text-center font-heading">{quantity}</span>
                <Button variant="ghost" size="icon" onClick={() => setQuantity(quantity + 1)} disabled={!isSelectedVariantAvailable}>
                  <Plus className="h-4 w-4" />
                </Button>
              </div>
              <Button
                onClick={handleAddToCart}
                disabled={!isSelectedVariantAvailable}
                className="flex-1 bg-gradient-fire hover:opacity-90 font-heading text-lg h-12 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <ShoppingCart className="mr-2 h-5 w-5" />
                {isSelectedVariantAvailable ? 'Add to Cart' : 'Sold Out'}
              </Button>
            </div>

            {/* Sold Out Message */}
            {!isSelectedVariantAvailable && (
              <div className="mb-6 p-4 rounded-lg bg-red-500/10 border border-red-500/30">
                <p className="text-red-500 text-sm font-medium">
                  This variant is currently sold out. Please select a different option or check back later.
                </p>
              </div>
            )}

            {/* Trust badges */}
            <div className="grid grid-cols-2 gap-4 p-4 rounded-lg bg-secondary/30 border border-border">
              <div className="flex items-center gap-3">
                <Truck className="h-5 w-5 text-primary" />
                <div className="text-sm">
                  <p className="font-medium">Shipping</p>
                  <p className="text-muted-foreground">Calculated at checkout</p>
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
        <section className="mb-20">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-8 gap-4">
            <h2 className="font-display text-3xl">Customer Reviews</h2>
            <Button asChild size="lg" className="bg-gradient-fire hover:opacity-90 font-heading tracking-wide group">
              <a
                href="https://maps.app.goo.gl/uvBTRmeT7HRJyN4h8"
                target="_blank"
                rel="noopener noreferrer"
              >
                Leave a Review
                <ExternalLink className="ml-2 h-5 w-5 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
              </a>
            </Button>
          </div>

          {judgemeReviews.length > 0 ? (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {judgemeReviews.map((review) => (
                <div key={review.id} className="p-6 rounded-xl bg-card border border-border">
                  <div className="flex gap-1 mb-3">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className={`h-4 w-4 ${i < review.rating ? 'fill-gold text-gold' : 'text-muted/30'}`} />
                    ))}
                  </div>
                  {review.title && (
                    <h4 className="font-heading uppercase tracking-wide mb-2">{review.title}</h4>
                  )}
                  <p className="text-muted-foreground text-sm mb-4">{review.content}</p>
                  <div className="flex justify-between items-center pt-4 border-t border-border">
                    <div>
                      <span className="text-sm font-medium">{review.author}</span>
                      <p className="text-xs text-muted-foreground">{new Date(review.date).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}</p>
                    </div>
                    {review.verified && <span className="text-xs text-green-500">✓ Verified</span>}
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-12 px-6 rounded-xl border-2 border-dashed border-border bg-secondary/30">
              <Star className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
              <h3 className="font-heading text-xl mb-2">Be the First to Review!</h3>
              <p className="text-muted-foreground mb-6">
                Share your experience with {product.title} and help others make informed decisions.
              </p>
              <Button asChild size="lg" className="bg-gradient-fire hover:opacity-90 font-heading tracking-wide group">
                <a
                  href="https://maps.app.goo.gl/uvBTRmeT7HRJyN4h8"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Write the First Review
                  <ExternalLink className="ml-2 h-5 w-5 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                </a>
              </Button>
            </div>
          )}
        </section>

        {/* Related Products */}
        {relatedProducts.length > 0 && (
          <section>
            <h2 className="font-display text-3xl mb-8">You May Also Like</h2>
            <ProductGrid products={relatedProducts} columns={4} />
          </section>
        )}
      </div>

      {/* Mobile Sticky Add to Cart */}
      <div className="fixed bottom-0 left-0 right-0 lg:hidden bg-background/95 backdrop-blur-md border-t border-border p-4 z-40">
        <div className="flex items-center gap-3">
          <div className="flex items-center border border-border rounded-lg">
            <Button 
              variant="ghost" 
              size="icon" 
              className="h-10 w-10"
              onClick={() => setQuantity(Math.max(1, quantity - 1))}
            >
              <Minus className="h-4 w-4" />
            </Button>
            <span className="w-10 text-center font-heading">{quantity}</span>
            <Button 
              variant="ghost" 
              size="icon" 
              className="h-10 w-10"
              onClick={() => setQuantity(quantity + 1)}
            >
              <Plus className="h-4 w-4" />
            </Button>
          </div>
          <Button
            onClick={handleAddToCart}
            className="flex-1 bg-gradient-fire hover:opacity-90 font-heading text-base h-12"
          >
            <ShoppingCart className="mr-2 h-5 w-5" />
            Add to Cart - ${(displayPrice * quantity).toFixed(2)}
          </Button>
        </div>
      </div>

      {/* Spacer for mobile sticky bar */}
      <div className="h-20 lg:hidden" />
    </Layout>
  );
}
