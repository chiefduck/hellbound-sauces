import { Layout } from '@/components/layout/Layout';
import { Hero } from '@/components/home/Hero';
import { BenefitsGrid } from '@/components/home/BenefitsGrid';
import { FeaturedProducts } from '@/components/home/FeaturedProducts';
import { CollectionsGrid } from '@/components/home/CollectionsGrid';
import { HeatScaleSection } from '@/components/home/HeatScaleSection';
import { ReviewsCarousel } from '@/components/home/ReviewsCarousel';
import { BlogPreview } from '@/components/home/BlogPreview';
import { BrandStory } from '@/components/home/BrandStory';
import { EmailCapture } from '@/components/home/EmailCapture';
import { SEOHead } from '@/components/seo';

export default function Index() {
  return (
    <Layout showFooterNewsletter={false}>
      <SEOHead
        title="Hellbound Hot Sauce | Premium Artisan Hot Sauces & BBQ Rubs"
        description="Handcrafted artisan hot sauces and BBQ rubs made with the world's hottest peppers. From Carolina Reapers to Ghost Peppers, discover bold flavors crafted in small batches."
        canonical="/"
      />
      <Hero />
      <BenefitsGrid />
      <FeaturedProducts />
      <CollectionsGrid />
      <HeatScaleSection />
      <ReviewsCarousel />
      <BrandStory />
      <BlogPreview />
      <EmailCapture />
    </Layout>
  );
}
