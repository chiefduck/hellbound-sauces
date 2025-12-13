import { Layout } from '@/components/layout/Layout';
import { Hero } from '@/components/home/Hero';
import { BenefitsGrid } from '@/components/home/BenefitsGrid';
import { FeaturedProducts } from '@/components/home/FeaturedProducts';
import { CollectionsGrid } from '@/components/home/CollectionsGrid';
import { HeatScaleSection } from '@/components/home/HeatScaleSection';
import { ReviewsCarousel } from '@/components/home/ReviewsCarousel';
import { BlogPreview } from '@/components/home/BlogPreview';
import { BrandStory } from '@/components/home/BrandStory';
import { WholesaleCTA } from '@/components/home/WholesaleCTA';
import { EmailCapture } from '@/components/home/EmailCapture';
import { SEOHead } from '@/components/seo';

export default function Index() {
  return (
    <Layout showFooterNewsletter={false}>
      <SEOHead
        title="HellBound Sauces | Artisan Hot Sauces & BBQ Rubs | Bold Flavors"
        description="Handcrafted hot sauces with bold flavors including Sweet Heat, Cucumber Madness, Pineapple-Mango, Wide Awake, and Bangkok Burn. Premium BBQ rubs: Wildwood Maple and Beekeepers Blend. Small batch craft with striking tattoo-inspired artwork."
        canonical="/"
      />
      <Hero />
      <BenefitsGrid />
      <FeaturedProducts />
      <CollectionsGrid />
      <HeatScaleSection />
      <ReviewsCarousel />
      <BrandStory />
      <WholesaleCTA />
      <BlogPreview />
      <EmailCapture />
    </Layout>
  );
}
