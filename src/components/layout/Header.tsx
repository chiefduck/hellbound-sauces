import { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X, ShoppingCart, User, ChevronDown } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useCart } from '@/contexts/CartContext';
import { cn } from '@/lib/utils';

const navigation = [
  {
    name: 'Shop',
    href: '/collections/all',
    submenu: [
      { name: 'All Products', href: '/collections/all' },
      { name: 'Hot Sauces', href: '/collections/hot-sauce' },
      { name: 'BBQ Rubs', href: '/collections/bbq-rubs' },
      { name: 'Merch', href: '/collections/merch-and-apparel' },
    ]
  },
  { name: 'Artwork', href: '/artwork' },
  { name: 'Recipes', href: '/recipes' },
  { name: 'Heat Guide', href: '/heat-guide' },
  {
    name: 'About',
    href: '/about',
    submenu: [
      { name: 'Our Story', href: '/about' },
      { name: 'Videos', href: '/videos' },
      { name: 'Blog', href: '/blog' },
    ]
  },
  { name: 'Wholesale', href: '/wholesale' },
  { name: 'Contact', href: '/contact' },
];

export function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [openSubmenu, setOpenSubmenu] = useState<string | null>(null);
  const [hoverTimeout, setHoverTimeout] = useState<NodeJS.Timeout | null>(null);
  const location = useLocation();
  const { openCart, itemCount } = useCart();

  const handleMouseEnter = (itemName: string) => {
    if (hoverTimeout) {
      clearTimeout(hoverTimeout);
      setHoverTimeout(null);
    }
    setOpenSubmenu(itemName);
  };

  const handleMouseLeave = () => {
    const timeout = setTimeout(() => {
      setOpenSubmenu(null);
    }, 150); // Small delay before closing
    setHoverTimeout(timeout);
  };

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-background/95 backdrop-blur-md border-b border-border/50">
      <nav className="container mx-auto px-4 lg:px-8">
        <div className="flex items-center justify-between h-16 lg:h-20">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-2 group">
            <div className="relative">
              <img
                src="/logo.png"
                alt="Hellbound Hot Sauce Logo"
                className="h-10 w-10 lg:h-12 lg:w-12 transition-all duration-300 group-hover:scale-110 object-contain"
              />
              <div className="absolute inset-0 blur-lg bg-primary/30 opacity-0 group-hover:opacity-100 transition-opacity" />
            </div>
            <span className="font-display text-2xl lg:text-3xl tracking-wider text-foreground">
              HELLBOUND SAUCES
            </span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center gap-6">
            {navigation.map((item) => (
              <div
                key={item.name}
                className="relative group"
                onMouseEnter={() => item.submenu && handleMouseEnter(item.name)}
                onMouseLeave={() => item.submenu && handleMouseLeave()}
              >
                <Link
                  to={item.href}
                  className={cn(
                    "font-heading text-sm tracking-wide uppercase transition-colors duration-200 flex items-center gap-1",
                    location.pathname === item.href
                      ? "text-primary"
                      : "text-muted-foreground hover:text-foreground"
                  )}
                >
                  {item.name}
                  {item.submenu && <ChevronDown className="h-3 w-3" />}
                </Link>

                {/* Submenu */}
                {item.submenu && openSubmenu === item.name && (
                  <div className="absolute top-full left-0 pt-2 w-48 z-50">
                    <div className="bg-card border border-border rounded-lg shadow-lg py-2">
                      {item.submenu.map((subitem) => (
                        <Link
                          key={subitem.name}
                          to={subitem.href}
                          className="block px-4 py-2 text-sm text-muted-foreground hover:text-foreground hover:bg-secondary transition-colors"
                          onClick={() => setOpenSubmenu(null)}
                        >
                          {subitem.name}
                        </Link>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>

          {/* Actions */}
          <div className="flex items-center gap-2">
            <Button variant="ghost" size="icon" asChild>
              <a
                href="https://shopify.com/67414655227/account"
                aria-label="Customer Account"
              >
                <User className="h-5 w-5" />
              </a>
            </Button>
            <Button
              variant="ghost"
              size="icon"
              className="relative"
              onClick={openCart}
              aria-label={`Open cart with ${itemCount} items`}
            >
              <ShoppingCart className="h-5 w-5" />
              <span
                className={cn(
                  "absolute -top-1 -right-1 h-4 w-4 rounded-full bg-primary text-[10px] font-bold flex items-center justify-center text-primary-foreground transition-transform",
                  itemCount > 0 ? "scale-100" : "scale-0"
                )}
              >
                {itemCount > 99 ? '99+' : itemCount}
              </span>
            </Button>
            
            {/* Mobile menu button */}
            <Button
              variant="ghost"
              size="icon"
              className="lg:hidden"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            >
              {mobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </Button>
          </div>
        </div>

        {/* Mobile Navigation */}
        <div
          className={cn(
            "lg:hidden overflow-hidden transition-all duration-300 ease-in-out",
            mobileMenuOpen ? "max-h-[600px] pb-6" : "max-h-0"
          )}
        >
          <div className="flex flex-col gap-2 pt-4 border-t border-border">
            {navigation.map((item) => (
              <div key={item.name}>
                <Link
                  to={item.href}
                  className={cn(
                    "font-heading text-lg tracking-wide uppercase transition-colors flex items-center justify-between py-2",
                    location.pathname === item.href
                      ? "text-primary"
                      : "text-muted-foreground"
                  )}
                  onClick={(e) => {
                    if (item.submenu) {
                      e.preventDefault();
                      setOpenSubmenu(openSubmenu === item.name ? null : item.name);
                    } else {
                      setMobileMenuOpen(false);
                    }
                  }}
                >
                  {item.name}
                  {item.submenu && <ChevronDown className={cn("h-4 w-4 transition-transform", openSubmenu === item.name && "rotate-180")} />}
                </Link>
                {item.submenu && openSubmenu === item.name && (
                  <div className="pl-4 flex flex-col gap-2 mt-2">
                    {item.submenu.map((subitem) => (
                      <Link
                        key={subitem.name}
                        to={subitem.href}
                        className="text-sm text-muted-foreground hover:text-foreground py-1"
                        onClick={() => setMobileMenuOpen(false)}
                      >
                        {subitem.name}
                      </Link>
                    ))}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </nav>
    </header>
  );
}
