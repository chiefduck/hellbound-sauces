import { Layout } from '@/components/layout/Layout';
import { SEOHead } from '@/components/seo';
import { ArrowLeft, MapPin, Award, ExternalLink } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import AldoImage from '@/assets/artists/Aldo_G.webp';

export default function AldoGallegosPage() {
  return (
    <Layout>
      <SEOHead
        title="Aldo Gallegos | Series 1 Artist | HellBound Sauces"
        description="Meet Aldo Gallegos, the renowned new school tattoo artist behind HellBound Sauces Series 1 artwork. Owner of High Chroma Tattoo in Albuquerque, New Mexico."
        canonical="/artists/aldo-gallegos"
      />

      {/* Hero */}
      <section className="py-20 lg:py-28 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-primary/10 via-transparent to-transparent" />
        <div className="container mx-auto px-4 lg:px-8 relative z-10">
          <Link to="/artwork" className="inline-flex items-center gap-2 text-muted-foreground hover:text-foreground mb-8 transition-colors">
            <ArrowLeft className="h-4 w-4" />
            Back to Artists
          </Link>

          <div className="grid lg:grid-cols-2 gap-12 items-start">
            {/* Image */}
            <div className="relative aspect-square rounded-xl overflow-hidden border-2 border-primary/20">
              <img
                src={AldoImage}
                alt="Aldo Gallegos"
                className="w-full h-full object-cover"
              />
            </div>

            {/* Header Info */}
            <div>
              <span className="text-sm font-heading uppercase tracking-widest text-primary">
                Series 1 Artist
              </span>
              <h1 className="font-display text-5xl lg:text-6xl mt-2 mb-6">
                <span className="text-gradient-fire">Aldo Gallegos</span>
              </h1>

              <div className="flex flex-col gap-3 mb-6">
                <div className="flex items-center gap-2 text-muted-foreground">
                  <MapPin className="h-5 w-5 text-primary" />
                  <span>Albuquerque, New Mexico</span>
                </div>
                <div className="flex items-center gap-2 text-muted-foreground">
                  <Award className="h-5 w-5 text-primary" />
                  <span>Owner of High Chroma Tattoo</span>
                </div>
                <div className="flex items-center gap-2 text-muted-foreground">
                  <Award className="h-5 w-5 text-primary" />
                  <span>Reigning Best of City Tattoo Artist Champion</span>
                </div>
              </div>

              <div className="flex flex-wrap gap-4">
                <Button asChild variant="default" className="bg-gradient-fire">
                  <a href="https://highchromatattoo.com" target="_blank" rel="noopener noreferrer">
                    Visit Website
                    <ExternalLink className="ml-2 h-4 w-4" />
                  </a>
                </Button>
                <Button asChild variant="outline">
                  <a href="https://instagram.com/highchromatattoo" target="_blank" rel="noopener noreferrer">
                    Instagram
                    <ExternalLink className="ml-2 h-4 w-4" />
                  </a>
                </Button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Biography */}
      <section className="py-16 lg:py-20">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="max-w-4xl mx-auto">
            <h2 className="font-display text-4xl mb-8">Background & Career</h2>
            <div className="prose prose-lg max-w-none space-y-6 text-muted-foreground">
              <p>
                Aldo Gallegos comes from a family of artists and musicians that shaped his artistic direction.
                He has been a professional tattoo artist since 2006, developing expertise across multiple styles
                including black work, portraits, and realism, with a specialization in illustrative new school tattoos.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Artistic Philosophy */}
      <section className="py-16 lg:py-20 bg-charcoal">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="max-w-4xl mx-auto">
            <h2 className="font-display text-4xl mb-8">Artistic Philosophy</h2>
            <div className="prose prose-lg max-w-none space-y-6 text-muted-foreground">
              <p>
                His work creates visual narratives that guide viewers through emotional experiences. While rooted
                in cartoon-based imagery, his technical skills enable him to render textures, surfaces, and details
                with such precision that subjects appear potentially real.
              </p>
              <p>
                He values creative freedom in all aspects—subject matter, lighting, dimension, and atmosphere—and
                consistently pushes artistic boundaries. Aldo is renowned for his ability to blend cartoon-inspired
                creativity with lifelike details, creating bold, story-driven designs that captivate tattoo
                enthusiasts nationwide.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Current Role */}
      <section className="py-16 lg:py-20">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="max-w-4xl mx-auto">
            <h2 className="font-display text-4xl mb-8">Current Role & Recognition</h2>
            <div className="prose prose-lg max-w-none space-y-6 text-muted-foreground">
              <p>
                Based in Albuquerque, New Mexico, Gallegos is the owner of High Chroma Tattoo. He holds the title
                of reigning Best of City Tattoo Artist champion and conducts multiple yearly tattoo tour stops
                across different cities.
              </p>
              <p>
                Aldo extends gratitude to prospective clients and expresses enthusiasm for collaborating on future
                tattoo projects. His partnership with HellBound Sauces brings his striking visual style to the
                Series 1 collection, perfectly capturing the brand's daring and creative essence.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 lg:py-20 bg-charcoal">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="font-display text-4xl mb-6">Experience Aldo's Artwork</h2>
            <p className="text-lg text-muted-foreground mb-8">
              Explore HellBound Sauces Series 1 featuring Aldo's striking label designs.
            </p>
            <div className="flex flex-wrap gap-4 justify-center">
              <Button asChild size="lg" className="bg-gradient-fire">
                <Link to="/collections/hot-sauces">
                  Shop Series 1
                </Link>
              </Button>
              <Button asChild variant="outline" size="lg">
                <Link to="/artwork">
                  View All Artists
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </section>
    </Layout>
  );
}
