import { createContext, useContext, useState, useCallback, ReactNode } from 'react';
import { Product } from '@/data/products';
import { createCheckout, redirectToCheckout } from '@/lib/shopifyCheckout';
import { useToast } from '@/hooks/use-toast';

export interface CartItem {
  product: Product;
  quantity: number;
  variantId?: string; // Shopify variant ID
}

interface CartContextType {
  items: CartItem[];
  isOpen: boolean;
  isCheckingOut: boolean;
  addItem: (product: Product, quantity?: number, variantId?: string) => void;
  removeItem: (productId: string) => void;
  updateQuantity: (productId: string, quantity: number) => void;
  clearCart: () => void;
  openCart: () => void;
  closeCart: () => void;
  toggleCart: () => void;
  proceedToCheckout: () => Promise<void>;
  itemCount: number;
  subtotal: number;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export function CartProvider({ children }: { children: ReactNode }) {
  const [items, setItems] = useState<CartItem[]>([]);
  const [isOpen, setIsOpen] = useState(false);
  const [isCheckingOut, setIsCheckingOut] = useState(false);
  const { toast } = useToast();

  const addItem = useCallback((product: Product, quantity: number = 1, variantId?: string) => {
    setItems((prevItems) => {
      const existingItem = prevItems.find((item) => item.product.id === product.id);

      if (existingItem) {
        return prevItems.map((item) =>
          item.product.id === product.id
            ? { ...item, quantity: item.quantity + quantity }
            : item
        );
      }

      // Use provided variantId or fall back to product's shopifyVariantId
      const finalVariantId = variantId || product.shopifyVariantId;

      return [...prevItems, { product, quantity, variantId: finalVariantId }];
    });
    setIsOpen(true);
  }, []);

  const removeItem = useCallback((productId: string) => {
    setItems((prevItems) => prevItems.filter((item) => item.product.id !== productId));
  }, []);

  const updateQuantity = useCallback((productId: string, quantity: number) => {
    if (quantity <= 0) {
      removeItem(productId);
      return;
    }
    
    setItems((prevItems) =>
      prevItems.map((item) =>
        item.product.id === productId ? { ...item, quantity } : item
      )
    );
  }, [removeItem]);

  const clearCart = useCallback(() => {
    setItems([]);
  }, []);

  const openCart = useCallback(() => setIsOpen(true), []);
  const closeCart = useCallback(() => setIsOpen(false), []);
  const toggleCart = useCallback(() => setIsOpen((prev) => !prev), []);

  const proceedToCheckout = useCallback(async () => {
    if (items.length === 0) {
      toast({
        title: "Cart is empty",
        description: "Add some items to your cart before checking out.",
        variant: "destructive",
      });
      return;
    }

    setIsCheckingOut(true);

    try {
      // Map cart items to Shopify line items
      const lineItems = items.map(item => ({
        variantId: item.variantId || '', // Will need to be set when products are loaded from Shopify
        quantity: item.quantity,
        title: item.product.title,
        price: item.product.price,
        image: item.product.images?.[0],
        handle: item.product.handle,
      }));

      // Create checkout
      const checkout = await createCheckout(lineItems);

      if (checkout?.webUrl) {
        // Redirect to Shopify checkout
        redirectToCheckout(checkout.webUrl);
      } else {
        throw new Error('Failed to create checkout');
      }
    } catch (error) {
      console.error('Checkout error:', error);
      toast({
        title: "Checkout failed",
        description: error instanceof Error ? error.message : "Unable to proceed to checkout. Please try again.",
        variant: "destructive",
      });
      setIsCheckingOut(false);
    }
  }, [items, toast]);

  const itemCount = items.reduce((total, item) => total + item.quantity, 0);
  const subtotal = items.reduce((total, item) => total + item.product.price * item.quantity, 0);

  return (
    <CartContext.Provider
      value={{
        items,
        isOpen,
        isCheckingOut,
        addItem,
        removeItem,
        updateQuantity,
        clearCart,
        openCart,
        closeCart,
        toggleCart,
        proceedToCheckout,
        itemCount,
        subtotal,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const context = useContext(CartContext);
  if (context === undefined) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
}
