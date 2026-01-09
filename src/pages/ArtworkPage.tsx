import { useState, useEffect } from 'react';
import { Layout } from '@/components/layout/Layout';
import { Palette, MapPin, Award, Brush, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { SEOHead } from '@/components/seo';
import { getBlogArticlesByTag, ShopifyBlogArticle } from '@/lib/shopifyBlogs';

interface Artist {
  name: string;
  series?: string;
  location?: string;
  studio?: string;
  experience?: string;
  awards?: string;
  bio: string;
  image: string;
  icon: typeof Palette;
  link: string;
}

// Helper function to extract metadata from blog article content
function parseArtistMetadata(content: string, excerpt?: string): Partial<Artist> {
  const metadata: Partial<Artist> = {};

  // Try to extract location (looks for patterns like "Location: City, State")
  const locationMatch = content.match(/Location:\s*([^\n]+)/i);
  if (locationMatch) metadata.location = locationMatch[1].trim();

  // Try to extract studio
  const studioMatch = content.match(/Studio:\s*([^\n]+)/i);
  if (studioMatch) metadata.studio = studioMatch[1].trim();

  // Try to extract series
  const seriesMatch = content.match(/Series:\s*([^\n]+)/i);
  if (seriesMatch) metadata.series = seriesMatch[1].trim();

  // Try to extract experience
  const experienceMatch = content.match(/Experience:\s*([^\n]+)/i);
  if (experienceMatch) metadata.experience = experienceMatch[1].trim();

  // Try to extract awards
  const awardsMatch = content.match(/Awards:\s*([^\n]+)/i);
  if (awardsMatch) metadata.awards = awardsMatch[1].trim();

  // Use excerpt or first paragraph as bio
  if (excerpt) {
    metadata.bio = excerpt;
  } else {
    const bioMatch = content.match(/Bio:\s*([^\n]+(?:\n(?!##)[^\n]+)*)/i);
    if (bioMatch) {
      metadata.bio = bioMatch[1].trim();
    } else {
      // Fall back to first paragraph
      const firstPara = content.split('\n\n')[0];
      metadata.bio = firstPara?.replace(/^#+\s*/, '').trim() || '';
    }
  }

  return metadata;
}

// Convert Shopify blog article to Artist format
function blogArticleToArtist(article: ShopifyBlogArticle): Artist {
  const metadata = parseArtistMetadata(article.content, article.excerpt);

  // Determine icon based on series or default
  let icon = Palette;
  if (metadata.awards) icon = Award;
  else if (metadata.experience) icon = Brush;

  return {
    name: article.title,
    series: metadata.series,
    location: metadata.location,
    studio: metadata.studio,
    experience: metadata.experience,
    awards: metadata.awards,
    bio: metadata.bio || article.excerpt || 'Featured artist',
    image: article.image?.url || '/assets/artists/default.webp',
    icon,
    link: `/artists/${article.handle}`,
  };
}

function ArtistCard({ artist }: { artist: Artist }) {
  const [isFlipped, setIsFlipped] = useState(false);
  const Icon = artist.icon;

  return (
    <div
      className="group h-[500px] cursor-pointer"
      onMouseEnter={() => setIsFlipped(true)}
      onMouseLeave={() => setIsFlipped(false)}
      onClick={() => setIsFlipped(!isFlipped)}
    >
      <div className="relative w-full h-full transition-transform duration-700 preserve-3d" style={{ transformStyle: 'preserve-3d', transform: isFlipped ? 'rotateY(180deg)' : 'rotateY(0)' }}>

        {/* Front of card */}
        <div className="absolute inset-0 backface-hidden rounded-xl overflow-hidden border-2 border-primary/20 shadow-lg" style={{ backfaceVisibility: 'hidden' }}>
          <div className="relative w-full h-full">
            <img
              src={artist.image}
              alt={artist.name}
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent" />

            {/* Corner flip indicator */}
            <div className="absolute top-0 right-0 bg-primary/90 text-primary-foreground text-xs font-heading uppercase tracking-wider px-3 py-2 rounded-bl-lg shadow-lg backdrop-blur-sm">
              Click to Flip
            </div>

            <div className="absolute bottom-0 left-0 right-0 p-6">
              <div className="flex items-center gap-2 mb-2">
                <Icon className="h-5 w-5 text-primary" />
                <span className="text-sm font-heading uppercase tracking-widest text-primary">
                  {artist.series}
                </span>
              </div>
              <h3 className="font-display text-2xl text-white mb-1">{artist.name}</h3>
              {artist.location && (
                <div className="flex items-center gap-1 text-sm text-gray-300">
                  <MapPin className="h-3 w-3" />
                  <span>{artist.location}</span>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Back of card */}
        <div className="absolute inset-0 backface-hidden rounded-xl overflow-hidden border-2 border-primary/20 bg-card shadow-lg p-6 flex flex-col" style={{ backfaceVisibility: 'hidden', transform: 'rotateY(180deg)' }}>
          <div className="flex items-center gap-2 mb-4">
            <Icon className="h-6 w-6 text-primary" />
            <div>
              <h3 className="font-display text-xl">{artist.name}</h3>
              <span className="text-xs font-heading uppercase tracking-widest text-primary">
                {artist.series}
              </span>
            </div>
          </div>

          <div className="space-y-2 mb-4 text-sm text-muted-foreground">
            {artist.location && (
              <div className="flex items-center gap-2">
                <MapPin className="h-4 w-4 text-primary flex-shrink-0" />
                <span>{artist.location}</span>
              </div>
            )}
            {artist.studio && (
              <div className="flex items-center gap-2">
                <Palette className="h-4 w-4 text-primary flex-shrink-0" />
                <span>{artist.studio}</span>
              </div>
            )}
            {artist.experience && (
              <div className="flex items-center gap-2">
                <Brush className="h-4 w-4 text-primary flex-shrink-0" />
                <span>{artist.experience}</span>
              </div>
            )}
            {artist.awards && (
              <div className="flex items-center gap-2">
                <Award className="h-4 w-4 text-primary flex-shrink-0" />
                <span>{artist.awards}</span>
              </div>
            )}
          </div>

          <p className="text-sm text-muted-foreground leading-relaxed overflow-y-auto mb-4">
            {artist.bio}
          </p>

          <Button asChild className="w-full bg-gradient-fire mt-auto">
            <Link to={artist.link}>
              About {artist.name.split(' ')[0]}
              <ArrowRight className="ml-2 h-4 w-4" />
            </Link>
          </Button>
        </div>
      </div>
    </div>
  );
}

export default function ArtworkPage() {
  const [artists, setArtists] = useState<Artist[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchArtists() {
      try {
        setLoading(true);
        console.log('🎨 ArtworkPage: Starting to fetch artists...');
        console.log('🎨 Environment:', {
          isDev: import.meta.env.DEV,
          mode: import.meta.env.MODE,
          hasShopifyDomain: !!import.meta.env.VITE_SHOPIFY_STORE_DOMAIN,
          hasShopifyToken: !!import.meta.env.VITE_SHOPIFY_STOREFRONT_TOKEN,
        });

        // Fetch blog articles tagged with "Tattoo Artist" from the "tattoo-artist" blog
        const articles = await getBlogArticlesByTag('tattoo-artist', 'Tattoo Artist');
        console.log('🎨 ArtworkPage: Articles received:', articles.length);

        if (articles.length === 0) {
          console.warn('⚠️ No artists found - check that blog posts are published and tagged with "Tattoo Artist"');
        } else {
          console.log('✅ Artists loaded:', articles.map(a => a.title).join(', '));
        }

        const artistsData = articles.map(blogArticleToArtist);
        console.log('🎨 ArtworkPage: Transformed artists:', artistsData.map(a => a.name).join(', '));
        setArtists(artistsData);
      } catch (error) {
        console.error('❌ Error fetching artists from Shopify:', error);
      } finally {
        setLoading(false);
      }
    }

    fetchArtists();
  }, []);

  return (
    <Layout>
      <SEOHead
        title="Artwork | Tattoo-Inspired Labels by Acclaimed Artists"
        description="Discover the striking tattoo-inspired artwork behind HellBound Sauces. Each label is designed by acclaimed new school tattoo artists including Aldo Gallegos, Elmo Boyd, Tony Ciavarro, and Kris Masterson."
        canonical="/artwork"
      />
      {/* Hero */}
      <section className="py-20 lg:py-28 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-primary/10 via-transparent to-transparent" />
        <div className="container mx-auto px-4 lg:px-8 relative z-10 text-center">
          <Palette className="h-12 w-12 text-primary mx-auto mb-6" />
          <h1 className="font-display text-5xl lg:text-7xl mb-6">
            <span className="text-gradient-fire">HellBound Sauces Artwork!</span>
          </h1>
          <p className="text-xl text-muted-foreground max-w-4xl mx-auto">
            Hellbound Sauces brings more than just bold flavors to your table—they deliver an unforgettable visual experience by partnering with some of the world's most renowned new school tattoo artists. Known for their vibrant colors, striking details, and edgy designs, these talented tattoo artists create the stunning artwork featured on every Hellbound Sauces Label. Each label tells its own unique story, perfectly complementing the fiery heat and creative flavor combinations inside. Whether you're a fan of hot sauces, rubs, or tattoo culture, or all 3, Hellbound Sauces blends art and spice like no other. Explore the perfect fusion of flavor and design today!
          </p>
        </div>
      </section>

      {/* Featured Artists - Flip Cards */}
      <section className="py-16 lg:py-24">
        <div className="container mx-auto px-4 lg:px-8">
          <h2 className="font-display text-4xl text-center mb-4">Featured Artists</h2>
          <p className="text-center text-muted-foreground mb-12">Hover or tap to learn more</p>
          {loading ? (
            <div className="text-center py-16">
              <p className="text-muted-foreground">Loading artists...</p>
            </div>
          ) : artists.length === 0 ? (
            <div className="text-center py-16">
              <p className="text-muted-foreground">No artists found. Check back soon!</p>
            </div>
          ) : (
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 max-w-7xl mx-auto">
              {artists.map((artist) => (
                <ArtistCard key={artist.name} artist={artist} />
              ))}
            </div>
          )}
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 lg:py-20">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="font-display text-4xl mb-6">Experience the Art</h2>
            <p className="text-lg text-muted-foreground mb-8">
              Every bottle of HellBound Sauces is a canvas of bold flavors and striking visuals.
              Explore our collections and discover the perfect fusion of taste and artistry.
            </p>
            <div className="flex flex-wrap gap-4 justify-center">
              <a
                href="/collections/all"
                className="inline-flex items-center justify-center px-8 h-12 rounded-lg bg-gradient-fire hover:opacity-90 font-heading tracking-wide transition-all"
              >
                Shop All Products
              </a>
              <a
                href="/about"
                className="inline-flex items-center justify-center px-8 h-12 rounded-lg border-2 border-primary hover:bg-primary/10 font-heading tracking-wide transition-all"
              >
                Our Story
              </a>
            </div>
          </div>
        </div>
      </section>
    </Layout>
  );
}
