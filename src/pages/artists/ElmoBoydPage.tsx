import { Layout } from '@/components/layout/Layout';
import { SEOHead } from '@/components/seo';
import { ArrowLeft, MapPin, Award, ExternalLink, Camera } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import ElmoImage from '@/assets/artists/Elmo_Boyd.webp';

export default function ElmoBoydPage() {
  return (
    <Layout>
      <SEOHead
        title="Elmo Boyd | Series 2 Artist | HellBound Sauces"
        description="Meet Elmo Boyd, the award-winning tattoo artist behind HellBound Sauces Series 2 artwork. Over 20 years of experience and 100+ industry awards."
        canonical="/artists/elmo-boyd"
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
                src={ElmoImage}
                alt="Elmo Boyd"
                className="w-full h-full object-cover"
              />
            </div>

            {/* Header Info */}
            <div>
              <span className="text-sm font-heading uppercase tracking-widest text-primary">
                Series 2 Artist
              </span>
              <h1 className="font-display text-5xl lg:text-6xl mt-2 mb-6">
                <span className="text-gradient-fire">Elmo Boyd</span>
              </h1>

              <div className="flex flex-col gap-3 mb-6">
                <div className="flex items-center gap-2 text-muted-foreground">
                  <MapPin className="h-5 w-5 text-primary" />
                  <span>Independence, Missouri</span>
                </div>
                <div className="flex items-center gap-2 text-muted-foreground">
                  <Award className="h-5 w-5 text-primary" />
                  <span>Over 20 Years Experience</span>
                </div>
                <div className="flex items-center gap-2 text-muted-foreground">
                  <Award className="h-5 w-5 text-primary" />
                  <span>100+ Industry Awards</span>
                </div>
                <div className="flex items-center gap-2 text-muted-foreground">
                  <Camera className="h-5 w-5 text-primary" />
                  <span>Photographer & Graphic Designer</span>
                </div>
              </div>

              <div className="flex flex-wrap gap-4">
                <Button asChild variant="default" className="bg-gradient-fire">
                  <a href="https://tattoocloud.com/elmotattoo" target="_blank" rel="noopener noreferrer">
                    View Portfolio
                    <ExternalLink className="ml-2 h-4 w-4" />
                  </a>
                </Button>
                <Button asChild variant="outline">
                  <a href="https://instagram.com/elmotattoo" target="_blank" rel="noopener noreferrer">
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
            <h2 className="font-display text-4xl mb-8">Career Highlights</h2>
            <div className="prose prose-lg max-w-none space-y-6 text-muted-foreground">
              <p>
                Elmo Boyd is a distinguished tattoo artist, photographer, and graphic designer with over 20 years
                of professional experience. His remarkable career includes more than 100 industry awards and features
                in 6+ magazine publications.
              </p>
              <p>
                As an active participant in major tattoo conventions nationwide, Elmo has built a reputation for
                creating vibrant, dynamic tattoos that demonstrate his exceptional creativity and skill. He specializes
                in designs that emphasize personal meaning and artistic craftsmanship.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Artistic Background */}
      <section className="py-16 lg:py-20 bg-charcoal">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="max-w-4xl mx-auto">
            <h2 className="font-display text-4xl mb-8">Artistic Background</h2>
            <div className="prose prose-lg max-w-none space-y-6 text-muted-foreground">
              <p>
                Elmo demonstrates versatility across multiple creative disciplines. Beyond tattooing, he works as
                a photographer and graphic designer, bringing diverse artistic perspectives to his practice.
              </p>
              <p>
                His portfolio showcases vibrant and dynamic design work that emphasizes personal meaning and artistic
                craftsmanship. Each piece is created as a unique artistic expression tailored to individual client
                significance, reflecting his sustained commitment to excellence within the tattoo community.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* HellBound Partnership */}
      <section className="py-16 lg:py-20">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="max-w-4xl mx-auto">
            <h2 className="font-display text-4xl mb-8">HellBound Collaboration</h2>
            <div className="prose prose-lg max-w-none space-y-6 text-muted-foreground">
              <p>
                Elmo's partnership with HellBound Sauces brings his award-winning artistic vision to the Series 2
                collection. His vibrant, dynamic style perfectly captures the bold flavors and creative spirit of
                HellBound's premium hot sauces.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 lg:py-20 bg-charcoal">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="font-display text-4xl mb-6">Experience Elmo's Artwork</h2>
            <p className="text-lg text-muted-foreground mb-8">
              Explore HellBound Sauces Series 2 featuring Elmo's award-winning label designs.
            </p>
            <div className="flex flex-wrap gap-4 justify-center">
              <Button asChild size="lg" className="bg-gradient-fire">
                <Link to="/collections/hot-sauce?series=series-2">
                  Shop Series 2
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
