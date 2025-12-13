import { Layout } from '@/components/layout/Layout';
import { SEOHead } from '@/components/seo';
import { ArrowLeft, MapPin, Award, ExternalLink, Heart } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import KrisImage from '@/assets/artists/Kris_Masterson.webp';

export default function KrisMastersonPage() {
  return (
    <Layout>
      <SEOHead
        title="Kris Masterson | BBQ Rubs Artist | HellBound Sauces"
        description="Meet Kris Masterson, the bold and creative tattoo artist behind HellBound Sauces BBQ Rubs artwork. Specializing in anatomically-detailed custom designs since 2006."
        canonical="/artists/kris-masterson"
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
                src={KrisImage}
                alt="Kris Masterson"
                className="w-full h-full object-cover"
              />
            </div>

            {/* Header Info */}
            <div>
              <span className="text-sm font-heading uppercase tracking-widest text-primary">
                Series 1 Rubs Artist
              </span>
              <h1 className="font-display text-5xl lg:text-6xl mt-2 mb-6">
                <span className="text-gradient-fire">Kris Masterson</span>
              </h1>

              <div className="flex flex-col gap-3 mb-6">
                <div className="flex items-center gap-2 text-muted-foreground">
                  <MapPin className="h-5 w-5 text-primary" />
                  <span>Colorado</span>
                </div>
                <div className="flex items-center gap-2 text-muted-foreground">
                  <Award className="h-5 w-5 text-primary" />
                  <span>Tattooing Since 2006</span>
                </div>
                <div className="flex items-center gap-2 text-muted-foreground">
                  <Heart className="h-5 w-5 text-primary" />
                  <span>Comic Books, RP Games & Nerd Culture</span>
                </div>
              </div>

              <div className="flex flex-wrap gap-4">
                <Button asChild variant="default" className="bg-gradient-fire">
                  <a href="https://krampusssytattoo.com" target="_blank" rel="noopener noreferrer">
                    Visit Website
                    <ExternalLink className="ml-2 h-4 w-4" />
                  </a>
                </Button>
                <Button asChild variant="outline">
                  <a href="https://instagram.com/krampusssytattoo" target="_blank" rel="noopener noreferrer">
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
            <h2 className="font-display text-4xl mb-8">Background</h2>
            <div className="prose prose-lg max-w-none space-y-6 text-muted-foreground">
              <p>
                Kris is a Colorado-born tattoo artist who describes herself as an "antisocial bridge troll" with a
                quirky, unapologetic personality. She has a love for comic books, RP games, and all things nerdy.
                She is known for her bold personality, unmatched creativity, and expertise in anatomy-focused and
                custom tattoo designs.
              </p>
              <p>
                She has lifelong passions for art and nerd culture, having developed her anatomical drawing skills
                through creating original characters for comic books and role-playing games.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Career Journey */}
      <section className="py-16 lg:py-20 bg-charcoal">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="max-w-4xl mx-auto">
            <h2 className="font-display text-4xl mb-8">Career Journey</h2>
            <div className="prose prose-lg max-w-none space-y-6 text-muted-foreground">
              <p>
                Kris began tattooing in 2006 during an era when the industry relied heavily on coil machines, hazing
                practices, and portfolio-based training. Despite minimal formal training initially, she persisted
                through dedication to drawing and continuous skill development.
              </p>
              <p>
                Today, she's recognized as an experienced tattoo artist specializing in anatomically-detailed work.
                Her unique approach combines technical precision with creative storytelling, creating custom designs
                that reflect each client's personality and vision.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Personality */}
      <section className="py-16 lg:py-20">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="max-w-4xl mx-auto">
            <h2 className="font-display text-4xl mb-8">Bold & Authentic</h2>
            <div className="prose prose-lg max-w-none space-y-6 text-muted-foreground">
              <p>
                She's known for her "edgy humor" and "bold personality." Kris cusses freely, maintains teenage
                boy-style humor, and makes peculiar noises that amuse those around her. She dislikes vegetables
                intensely and wears mismatched socks proudly. She affectionately refers to herself using "gremlin"
                terminology.
              </p>
              <p>
                She identifies as a proud comic and RP enthusiast, has lived with Type 1 diabetes since 1992, and
                came out as a lesbian in 2000. Kris embraces her unique identity without reservation, bringing
                authenticity and passion to everything she creates.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Lifestyle */}
      <section className="py-16 lg:py-20 bg-charcoal">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="max-w-4xl mx-auto">
            <h2 className="font-display text-4xl mb-8">Hobbies & Lifestyle</h2>
            <div className="prose prose-lg max-w-none space-y-6 text-muted-foreground">
              <p>
                In her downtime, she performs stunt work (earning her "Krampusssy" nickname), spends time with her
                English Bulldog, and cares for her cats. Her partnership with HellBound Sauces brings her bold,
                creative spirit to the BBQ Rubs collection, creating artwork that perfectly captures the brand's
                edgy and distinctive style.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 lg:py-20">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="font-display text-4xl mb-6">Experience Kris's Artwork</h2>
            <p className="text-lg text-muted-foreground mb-8">
              Explore HellBound BBQ Rubs featuring Kris's bold and creative label designs.
            </p>
            <div className="flex flex-wrap gap-4 justify-center">
              <Button asChild size="lg" className="bg-gradient-fire">
                <Link to="/collections/bbq-rubs">
                  Shop BBQ Rubs
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
