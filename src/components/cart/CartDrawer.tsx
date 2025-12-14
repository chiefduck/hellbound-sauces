import { Minus, Plus, ShoppingBag, Trash2, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useCart } from '@/contexts/CartContext';
import { Button } from '@/components/ui/button';
import { Sheet, SheetContent, SheetHeader, SheetTitle } from '@/components/ui/sheet';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Separator } from '@/components/ui/separator';
import { cn } from '@/lib/utils';

export function CartDrawer() {
  const { items, isOpen, closeCart, removeItem, updateQuantity, itemCount, subtotal, clearCart, proceedToCheckout, isCheckingOut } = useCart();

  return (
    <Sheet open={isOpen} onOpenChange={(open) => !open && closeCart()}>
      <SheetContent className="w-full sm:max-w-lg flex flex-col p-0">
        <SheetHeader className="px-4 sm:px-6 py-4 border-b border-border">
          <SheetTitle className="font-display text-xl sm:text-2xl flex items-center gap-2">
            <ShoppingBag className="h-5 w-5 sm:h-6 sm:w-6 text-primary" />
            Your Cart
            {itemCount > 0 && (
              <span className="text-sm font-heading text-muted-foreground">
                ({itemCount} {itemCount === 1 ? 'item' : 'items'})
              </span>
            )}
          </SheetTitle>
        </SheetHeader>

        {items.length === 0 ? (
          <div className="flex-1 flex flex-col items-center justify-center p-6 text-center">
            <div className="w-20 h-20 rounded-full bg-secondary/50 flex items-center justify-center mb-4">
              <ShoppingBag className="h-10 w-10 text-muted-foreground" />
            </div>
            <h3 className="font-heading text-lg uppercase tracking-wide mb-2">Your cart is empty</h3>
            <p className="text-muted-foreground text-sm mb-6 max-w-[200px]">
              Add some heat to your cart and get ready to spice things up!
            </p>
            <Button asChild onClick={closeCart} className="bg-gradient-fire hover:opacity-90">
              <Link to="/collections/all">
                Browse Products
                <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
          </div>
        ) : (
          <>
            <ScrollArea className="flex-1 px-4 sm:px-6">
              <div className="py-4 space-y-4">
                {items.map((item) => (
                  <CartItem
                    key={item.product.id}
                    item={item}
                    onRemove={() => removeItem(item.product.id)}
                    onUpdateQuantity={(qty) => updateQuantity(item.product.id, qty)}
                  />
                ))}
              </div>
            </ScrollArea>

            <div className="border-t border-border p-4 sm:p-6 space-y-4 bg-background">
              {/* Clear Cart */}
              <Button
                variant="ghost"
                size="sm"
                onClick={clearCart}
                className="text-muted-foreground hover:text-destructive w-full justify-center"
              >
                <Trash2 className="h-4 w-4 mr-2" />
                Clear Cart
              </Button>

              <Separator />

              {/* Subtotal */}
              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Subtotal</span>
                  <span className="font-heading">${subtotal.toFixed(2)}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Shipping</span>
                  <span className="font-heading text-green-500">
                    {subtotal >= 50 ? 'FREE' : '$5.99'}
                  </span>
                </div>
                {subtotal < 50 && (
                  <p className="text-xs text-muted-foreground">
                    Add ${(50 - subtotal).toFixed(2)} more for free shipping!
                  </p>
                )}
              </div>

              <Separator />

              {/* Total */}
              <div className="flex justify-between items-baseline">
                <span className="font-heading uppercase tracking-wide">Total</span>
                <span className="font-display text-2xl text-primary">
                  ${(subtotal + (subtotal >= 50 ? 0 : 5.99)).toFixed(2)}
                </span>
              </div>

              {/* Checkout Button */}
              <Button
                className="w-full h-12 sm:h-14 bg-gradient-fire hover:opacity-90 font-heading text-base sm:text-lg uppercase tracking-wider"
                onClick={proceedToCheckout}
                disabled={isCheckingOut}
              >
                {isCheckingOut ? 'Processing...' : 'Proceed to Checkout'}
              </Button>

              {/* Continue Shopping */}
              <Button
                variant="outline"
                className="w-full"
                onClick={closeCart}
                asChild
              >
                <Link to="/collections/all">
                  Continue Shopping
                </Link>
              </Button>
            </div>
          </>
        )}
      </SheetContent>
    </Sheet>
  );
}

interface CartItemProps {
  item: { product: { id: string; title: string; price: number; handle: string }; quantity: number };
  onRemove: () => void;
  onUpdateQuantity: (quantity: number) => void;
}

function CartItem({ item, onRemove, onUpdateQuantity }: CartItemProps) {
  // Use Shopify image if available, fallback to placeholder
  const productImage = item.product.images?.[0] || '/placeholder.svg';

  return (
    <div className="flex gap-3 sm:gap-4 p-3 sm:p-4 rounded-lg bg-secondary/30 border border-border">
      {/* Image */}
      <Link
        to={`/products/${item.product.handle}`}
        className="flex-shrink-0 w-20 h-20 sm:w-24 sm:h-24 rounded-md overflow-hidden border border-border"
      >
        <img
          src={productImage}
          alt={item.product.title}
          className="w-full h-full object-cover hover:scale-105 transition-transform"
        />
      </Link>

      {/* Details */}
      <div className="flex-1 min-w-0">
        <Link
          to={`/products/${item.product.handle}`}
          className="font-heading text-sm sm:text-base uppercase tracking-wide hover:text-primary transition-colors line-clamp-2"
        >
          {item.product.title}
        </Link>
        
        <p className="text-primary font-heading text-base sm:text-lg mt-1">
          ${item.product.price.toFixed(2)}
        </p>

        {/* Quantity Controls */}
        <div className="flex items-center justify-between mt-2 sm:mt-3">
          <div className="flex items-center border border-border rounded-md">
            <Button
              variant="ghost"
              size="icon"
              className="h-7 w-7 sm:h-8 sm:w-8"
              onClick={() => onUpdateQuantity(item.quantity - 1)}
            >
              <Minus className="h-3 w-3 sm:h-4 sm:w-4" />
            </Button>
            <span className="w-8 text-center text-sm font-heading">{item.quantity}</span>
            <Button
              variant="ghost"
              size="icon"
              className="h-7 w-7 sm:h-8 sm:w-8"
              onClick={() => onUpdateQuantity(item.quantity + 1)}
            >
              <Plus className="h-3 w-3 sm:h-4 sm:w-4" />
            </Button>
          </div>

          <Button
            variant="ghost"
            size="icon"
            className="h-7 w-7 sm:h-8 sm:w-8 text-muted-foreground hover:text-destructive"
            onClick={onRemove}
          >
            <Trash2 className="h-4 w-4" />
          </Button>
        </div>
      </div>
    </div>
  );
}
