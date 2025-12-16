import { Layout } from '@/components/layout/Layout';
import { SEOHead } from '@/components/seo';
import { Play } from 'lucide-react';

const videos = [
  {
    id: 'wm4MqU1IH9g',
    title: 'HellBound Sauces Featured Video',
    embedUrl: 'https://www.youtube.com/embed/wm4MqU1IH9g',
  },
  {
    id: 'jFIDyPK1tcY',
    title: 'HellBound Sauces Video',
    embedUrl: 'https://www.youtube.com/embed/jFIDyPK1tcY',
  },
  {
    id: 'aEgZLwhKPxc',
    title: 'HellBound Sauces Video',
    embedUrl: 'https://www.youtube.com/embed/aEgZLwhKPxc',
  },
];

export default function VideosPage() {
  return (
    <Layout>
      <SEOHead
        title="Videos | HellBound Sauces"
        description="Watch HellBound Sauces in action. Product reviews, tastings, and more."
        canonical="/videos"
      />

      {/* Hero */}
      <section className="py-16 lg:py-24 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-primary/10 via-transparent to-transparent" />
        <div className="container mx-auto px-4 lg:px-8 relative z-10 text-center">
          <div className="flex items-center justify-center gap-2 text-primary font-heading text-sm uppercase tracking-widest mb-4">
            <Play className="h-4 w-4" />
            Watch
          </div>
          <h1 className="font-display text-5xl lg:text-6xl mb-4">Videos</h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            See HellBound Sauces featured in reviews, tastings, and more.
          </p>
        </div>
      </section>

      {/* Videos Grid */}
      <section className="pb-20 lg:pb-28">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {videos.map((video) => (
              <div
                key={video.id}
                className="group rounded-xl overflow-hidden bg-card border border-border hover:border-primary/50 transition-all duration-300"
              >
                <div className="relative aspect-video">
                  <iframe
                    src={video.embedUrl}
                    title={video.title}
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                    className="w-full h-full"
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </Layout>
  );
}
