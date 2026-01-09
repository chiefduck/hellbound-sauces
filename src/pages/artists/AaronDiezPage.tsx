import { Layout } from '@/components/layout/Layout';
import { SEOHead } from '@/components/seo';
import { ArrowLeft, MapPin, Award, ExternalLink, Palette, Brush } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { useState, useEffect } from 'react';
import { getBlogArticlesByTag, ShopifyBlogArticle } from '@/lib/shopifyBlogs';

export default function AaronDiezPage() {
  const [artist, setArtist] = useState<ShopifyBlogArticle | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchArtistData() {
      try {
        setLoading(true);
        const articles = await getBlogArticlesByTag('tattoo-artist', 'Tattoo Artist');
        // Find Aaron Diez's blog post
        const aaronPost = articles.find(article =>
          article.title.toLowerCase().includes('aaron') && article.title.toLowerCase().includes('diez')
        );
        setArtist(aaronPost || null);
      } catch (error) {
        console.error('Error fetching Aaron Diez data:', error);
      } finally {
        setLoading(false);
      }
    }

    fetchArtistData();
  }, []);

  // Helper function to extract metadata
  const extractMetadata = (content: string) => {
    const metadata: any = {};
    const locationMatch = content.match(/Location:\s*([^\n]+)/i);
    if (locationMatch) metadata.location = locationMatch[1].trim();

    const studioMatch = content.match(/Studio:\s*([^\n]+)/i);
    if (studioMatch) metadata.studio = studioMatch[1].trim();

    const seriesMatch = content.match(/Series:\s*([^\n]+)/i);
    if (seriesMatch) metadata.series = seriesMatch[1].trim();

    const experienceMatch = content.match(/Experience:\s*([^\n]+)/i);
    if (experienceMatch) metadata.experience = experienceMatch[1].trim();

    const awardsMatch = content.match(/Awards:\s*([^\n]+)/i);
    if (awardsMatch) metadata.awards = awardsMatch[1].trim();

    const websiteMatch = content.match(/Website:\s*([^\n]+)/i);
    if (websiteMatch) metadata.website = websiteMatch[1].trim();

    const instagramMatch = content.match(/Instagram:\s*([^\n]+)/i);
    if (instagramMatch) metadata.instagram = instagramMatch[1].trim();

    return metadata;
  };

  const metadata = artist ? extractMetadata(artist.content) : {};
  const artistImage = artist?.image?.url || '/assets/artists/default.webp';

  if (loading) {
    return (
      <Layout>
        <div className="container mx-auto px-4 lg:px-8 py-20 text-center">
          <p className="text-muted-foreground">Loading artist information...</p>
        </div>
      </Layout>
    );
  }

  if (!artist) {
    return (
      <Layout>
        <div className="container mx-auto px-4 lg:px-8 py-20 text-center">
          <p className="text-muted-foreground">Artist not found. Please check back later!</p>
          <Button asChild className="mt-4">
            <Link to="/artwork">Back to Artists</Link>
          </Button>
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      <SEOHead
        title={`${artist.title} | Series 1 Artist | HellBound Sauces`}
        description={artist.excerpt || `Meet ${artist.title}, the talented tattoo artist behind HellBound Sauces artwork.`}
        canonical="/artists/aaron-diez"
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
                src={artistImage}
                alt={artist.title}
                className="w-full h-full object-cover"
              />
            </div>

            {/* Header Info */}
            <div>
              {metadata.series && (
                <span className="text-sm font-heading uppercase tracking-widest text-primary">
                  {metadata.series}
                </span>
              )}
              <h1 className="font-display text-5xl lg:text-6xl mt-2 mb-6">
                <span className="text-gradient-fire">{artist.title}</span>
              </h1>

              <div className="flex flex-col gap-3 mb-6">
                {metadata.location && (
                  <div className="flex items-center gap-2 text-muted-foreground">
                    <MapPin className="h-5 w-5 text-primary" />
                    <span>{metadata.location}</span>
                  </div>
                )}
                {metadata.studio && (
                  <div className="flex items-center gap-2 text-muted-foreground">
                    <Palette className="h-5 w-5 text-primary" />
                    <span>{metadata.studio}</span>
                  </div>
                )}
                {metadata.experience && (
                  <div className="flex items-center gap-2 text-muted-foreground">
                    <Brush className="h-5 w-5 text-primary" />
                    <span>{metadata.experience}</span>
                  </div>
                )}
                {metadata.awards && (
                  <div className="flex items-center gap-2 text-muted-foreground">
                    <Award className="h-5 w-5 text-primary" />
                    <span>{metadata.awards}</span>
                  </div>
                )}
              </div>

              <div className="flex flex-wrap gap-4">
                {metadata.website && (
                  <Button asChild variant="default" className="bg-gradient-fire">
                    <a href={metadata.website} target="_blank" rel="noopener noreferrer">
                      Visit Website
                      <ExternalLink className="ml-2 h-4 w-4" />
                    </a>
                  </Button>
                )}
                {metadata.instagram && (
                  <Button asChild variant="outline">
                    <a href={metadata.instagram} target="_blank" rel="noopener noreferrer">
                      Instagram
                      <ExternalLink className="ml-2 h-4 w-4" />
                    </a>
                  </Button>
                )}
                {!metadata.website && !metadata.instagram && (
                  <Button asChild variant="outline">
                    <Link to="/artwork">
                      View All Artists
                    </Link>
                  </Button>
                )}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Biography / Content from Blog */}
      <section className="py-16 lg:py-20">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="max-w-4xl mx-auto">
            <h2 className="font-display text-4xl mb-8">About {artist.title.split(' ')[0]}</h2>
            <div
              className="prose prose-lg max-w-none space-y-6 text-muted-foreground"
              dangerouslySetInnerHTML={{ __html: artist.contentHtml }}
            />
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 lg:py-20 bg-charcoal">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="font-display text-4xl mb-6">Experience {artist.title.split(' ')[0]}'s Artwork</h2>
            <p className="text-lg text-muted-foreground mb-8">
              Explore HellBound Sauces {metadata.series || 'collection'} featuring {artist.title.split(' ')[0]}'s striking label designs.
            </p>
            <div className="flex flex-wrap gap-4 justify-center">
              <Button asChild size="lg" className="bg-gradient-fire">
                <Link to="/collections/all">
                  Shop Now
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
