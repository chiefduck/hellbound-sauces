import { Link } from 'react-router-dom';
import { ShoppingCart, Star } from 'lucide-react';
import { Product } from '@/data/products';
import { HeatLevel } from '@/components/ui/HeatLevel';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { useCart } from '@/contexts/CartContext';
import { useToast } from '@/hooks/use-toast';
import { cn } from '@/lib/utils';

interface ProductCardProps {
  product: Product;
  className?: string;
}

export function ProductCard({ product, className }: ProductCardProps) {
  // Use Shopify image if available, fallback to placeholder
  const productImage = product.images?.[0] || '/placeholder.svg';
  const { addItem } = useCart();
  const { toast } = useToast();

  // Check if product has any available variants
  const hasAvailableVariants = product.variants?.some(v => v.availableForSale !== false) ?? true;

  const handleQuickAdd = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();

    if (!hasAvailableVariants) {
      toast({
        title: "Product unavailable",
        description: "This product is currently sold out.",
        variant: "destructive",
      });
      return;
    }

    addItem(product, 1);
    toast({
      title: "Added to cart!",
      description: `${product.title} added to your cart.`,
    });
  };

  return (
    <div
      className={cn(
        "group relative bg-card rounded-lg overflow-hidden border border-border hover:border-primary/50 transition-all duration-300",
        className
      )}
    >
      {/* Badges */}
      <div className="absolute top-3 left-3 z-10 flex flex-col gap-2">
        {!hasAvailableVariants && (
          <Badge className="bg-red-500 text-white font-heading text-xs">SOLD OUT</Badge>
        )}
        {product.new && hasAvailableVariants && (
          <Badge className="bg-accent text-accent-foreground font-heading text-xs">NEW</Badge>
        )}
        {product.bestSeller && hasAvailableVariants && (
          <Badge className="bg-gold text-background font-heading text-xs">BEST SELLER</Badge>
        )}
        {product.compareAtPrice && hasAvailableVariants && (
          <Badge className="bg-destructive text-destructive-foreground font-heading text-xs">
            SAVE ${(product.compareAtPrice - product.price).toFixed(0)}
          </Badge>
        )}
      </div>

      {/* Image */}
      <Link to={`/products/${product.handle}`} className="block relative aspect-square overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-t from-background/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-10" />
        <img
          src={productImage}
          alt={product.title}
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
        />
        <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-20">
          <Button
            size="sm"
            className="bg-gradient-fire hover:opacity-90 disabled:opacity-50"
            onClick={handleQuickAdd}
            disabled={!hasAvailableVariants}
          >
            <ShoppingCart className="h-4 w-4 mr-2" />
            {hasAvailableVariants ? 'Quick Add' : 'Sold Out'}
          </Button>
        </div>
      </Link>

      {/* Mobile Quick Add Button */}
      <Button
        size="icon"
        className="absolute bottom-20 right-3 z-10 lg:hidden bg-gradient-fire hover:opacity-90 h-10 w-10 rounded-full shadow-lg disabled:opacity-50"
        onClick={handleQuickAdd}
        disabled={!hasAvailableVariants}
        aria-label={hasAvailableVariants ? `Add ${product.title} to cart` : `${product.title} - Sold Out`}
      >
        <ShoppingCart className="h-4 w-4" />
      </Button>

      {/* Content */}
      <div className="p-4">
        <div className="flex items-center justify-between mb-2">
          {product.heatLevel ? (
            <HeatLevel level={product.heatLevel} size="sm" />
          ) : (
            <div className="h-6" />
          )}
          {product.reviews && (
            <div className="flex items-center gap-1 text-sm text-muted-foreground">
              <Star className="h-3.5 w-3.5 fill-gold text-gold" />
              <span>{product.reviews.rating}</span>
              <span className="text-xs">({product.reviews.count})</span>
            </div>
          )}
        </div>

        <Link to={`/products/${product.handle}`}>
          <h3 className="font-heading text-lg uppercase tracking-wide hover:text-primary transition-colors line-clamp-1">
            {product.title}
          </h3>
        </Link>

        {product.description && product.description.trim() && (
          <p className="text-muted-foreground text-sm mt-1 line-clamp-2 whitespace-pre-line leading-relaxed">
            {product.description}
          </p>
        )}

        <div className="flex items-center justify-between mt-4">
          <div className="flex items-baseline gap-2">
            <span className="font-heading text-xl text-primary">${product.price.toFixed(2)}</span>
            {product.compareAtPrice && (
              <span className="text-muted-foreground text-sm line-through">
                ${product.compareAtPrice.toFixed(2)}
              </span>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
