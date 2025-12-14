import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { ScrollToTop } from "@/components/ScrollToTop";
import { CartProvider } from "@/contexts/CartContext";
import { CartDrawer } from "@/components/cart/CartDrawer";
import Index from "./pages/Index";
import CollectionPage from "./pages/CollectionPage";
import ProductPage from "./pages/ProductPage";
import AboutPage from "./pages/AboutPage";
import ArtworkPage from "./pages/ArtworkPage";
import RecipesPage from "./pages/RecipesPage";
import HeatGuidePage from "./pages/HeatGuidePage";
import BlogPage from "./pages/BlogPage";
import BlogPostPage from "./pages/BlogPostPage";
import WholesalePage from "./pages/WholesalePage";
import ContactPage from "./pages/ContactPage";
import FAQPage from "./pages/FAQPage";
import PrivacyPage from "./pages/PrivacyPage";
import TermsPage from "./pages/TermsPage";
import ShippingPage from "./pages/ShippingPage";
import AldoGallegosPage from "./pages/artists/AldoGallegosPage";
import ElmoBoydPage from "./pages/artists/ElmoBoydPage";
import TonyCiavarroPage from "./pages/artists/TonyCiavarroPage";
import KrisMastersonPage from "./pages/artists/KrisMastersonPage";
import ShopifyTestPage from "./pages/ShopifyTestPage";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <CartProvider>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <CartDrawer />
          <ScrollToTop />
          <Routes>
            <Route path="/" element={<Index />} />
            <Route path="/collections/:handle" element={<CollectionPage />} />
            <Route path="/products/:handle" element={<ProductPage />} />
            <Route path="/about" element={<AboutPage />} />
            <Route path="/artwork" element={<ArtworkPage />} />
            <Route path="/artists/aldo-gallegos" element={<AldoGallegosPage />} />
            <Route path="/artists/elmo-boyd" element={<ElmoBoydPage />} />
            <Route path="/artists/tony-ciavarro" element={<TonyCiavarroPage />} />
            <Route path="/artists/kris-masterson" element={<KrisMastersonPage />} />
            <Route path="/recipes" element={<RecipesPage />} />
            <Route path="/heat-guide" element={<HeatGuidePage />} />
            <Route path="/blog" element={<BlogPage />} />
            <Route path="/blog/:slug" element={<BlogPostPage />} />
            <Route path="/wholesale" element={<WholesalePage />} />
            <Route path="/contact" element={<ContactPage />} />
            <Route path="/faq" element={<FAQPage />} />
            <Route path="/privacy" element={<PrivacyPage />} />
            <Route path="/terms" element={<TermsPage />} />
            <Route path="/shipping" element={<ShippingPage />} />
            <Route path="/shopify-test" element={<ShopifyTestPage />} />
            {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </TooltipProvider>
    </CartProvider>
  </QueryClientProvider>
);

export default App;
