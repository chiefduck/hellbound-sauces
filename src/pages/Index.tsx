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

export default function Index() {
  return (
    <Layout showFooterNewsletter={false}>
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
