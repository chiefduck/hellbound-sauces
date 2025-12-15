import { Layout } from '@/components/layout/Layout';
import { SEOHead } from '@/components/seo';
import { ArrowLeft, Award, ExternalLink, BookOpen, Video } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import TonyImage from '@/assets/artists/Tony_C.webp';

export default function TonyCiavarroPage() {
  return (
    <Layout>
      <SEOHead
        title="Tony Ciavarro | Series 3 Artist | HellBound Sauces"
        description="Meet Tony Ciavarro, the celebrated New School tattoo artist behind HellBound Sauces Series 3 artwork. Nearly 25 years of experience pushing artistic boundaries."
        canonical="/artists/tony-ciavarro"
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
                src={TonyImage}
                alt="Tony Ciavarro"
                className="w-full h-full object-cover"
              />
            </div>

            {/* Header Info */}
            <div>
              <span className="text-sm font-heading uppercase tracking-widest text-primary">
                Series 3 Artist
              </span>
              <h1 className="font-display text-5xl lg:text-6xl mt-2 mb-6">
                <span className="text-gradient-fire">Tony Ciavarro</span>
              </h1>

              <div className="flex flex-col gap-3 mb-6">
                <div className="flex items-center gap-2 text-muted-foreground">
                  <Award className="h-5 w-5 text-primary" />
                  <span>Nearly 25 Years Experience</span>
                </div>
                <div className="flex items-center gap-2 text-muted-foreground">
                  <Award className="h-5 w-5 text-primary" />
                  <span>Founder of Stinky Monkey Tattoos (2001)</span>
                </div>
                <div className="flex items-center gap-2 text-muted-foreground">
                  <BookOpen className="h-5 w-5 text-primary" />
                  <span>Published ~20 Art Books</span>
                </div>
                <div className="flex items-center gap-2 text-muted-foreground">
                  <Video className="h-5 w-5 text-primary" />
                  <span>Creator of "Shut Up and Draw" DVD Series</span>
                </div>
              </div>

              <div className="flex flex-wrap gap-4">
                <Button asChild variant="default" className="bg-gradient-fire">
                  <a href="https://instagram.com/tonyciavarro" target="_blank" rel="noopener noreferrer">
                    Instagram
                    <ExternalLink className="ml-2 h-4 w-4" />
                  </a>
                </Button>
                <Button asChild variant="outline">
                  <a href="https://instagram.com/slowdownclothing" target="_blank" rel="noopener noreferrer">
                    Slowdown Clothing
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
            <h2 className="font-display text-4xl mb-8">Creative Pioneer</h2>
            <div className="prose prose-lg max-w-none space-y-6 text-muted-foreground">
              <p>
                Tony Ciavarro is a celebrated tattoo artist with nearly 25 years of experience, specializing in
                New School tattoo designs that feature bold lines, vibrant colors, and imaginative themes. He has
                become a significant figure in the tattoo industry, known for pushing artistic boundaries and
                inspiring both colleagues and enthusiasts.
              </p>
              <p>
                His expertise in New School tattoo designs has made him a pioneer in the movement, combining technical
                mastery with boundless creativity to produce truly unique works of art.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Professional Achievements */}
      <section className="py-16 lg:py-20 bg-charcoal">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="max-w-4xl mx-auto">
            <h2 className="font-display text-4xl mb-8">Professional Achievements</h2>
            <div className="prose prose-lg max-w-none space-y-6 text-muted-foreground">
              <div>
                <h3 className="font-display text-2xl text-foreground mb-4">Stinky Monkey Tattoos (Founded 2001)</h3>
                <p>
                  A top-rated tattoo studio in Kingston, Massachusetts, recognized for its welcoming environment and
                  commitment to high-quality artistry. The studio has become a destination for clients seeking
                  cutting-edge, unique designs.
                </p>
              </div>

              <div>
                <h3 className="font-display text-2xl text-foreground mb-4">Slowdown Clothing (Founded 2011)</h3>
                <p>
                  A lifestyle brand featuring Tony's distinctive artwork on apparel and accessories, reflecting his
                  philosophy of embracing creativity and intentional living.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Creative Output */}
      <section className="py-16 lg:py-20">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="max-w-4xl mx-auto">
            <h2 className="font-display text-4xl mb-8">Creative Output & Education</h2>
            <div className="prose prose-lg max-w-none space-y-6 text-muted-foreground">
              <p>
                Tony has self-published approximately 20 art books showcasing his designs and creative process,
                sharing his knowledge and passion with the global tattoo community.
              </p>
              <p>
                He created the "Shut Up and Draw" DVD series, sharing techniques and inspiration with aspiring
                artists worldwide. His regular appearances at international tattoo conventions have established
                him as a respected educator and mentor to the next generation of tattoo artists.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 lg:py-20 bg-charcoal">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="font-display text-4xl mb-6">Experience Tony's Artwork</h2>
            <p className="text-lg text-muted-foreground mb-8">
              Explore HellBound Sauces Series 3 featuring Tony's innovative label designs.
            </p>
            <div className="flex flex-wrap gap-4 justify-center">
              <Button asChild size="lg" className="bg-gradient-fire">
                <Link to="/collections/hot-sauce">
                  Shop Series 3
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
