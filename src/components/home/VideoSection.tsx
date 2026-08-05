import { useState } from 'react';
import { Play } from 'lucide-react';

const VIDEO_ID = '9lNQb34Lehk';

export function VideoSection() {
  const [isPlaying, setIsPlaying] = useState(false);

  return (
    <section className="py-20 lg:py-28 relative overflow-hidden">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_hsl(var(--primary)/0.08)_0%,_transparent_60%)]" />

      <div className="container mx-auto px-4 lg:px-8 relative z-10">
        <div className="text-center mb-12 animate-fade-in-up">
          <span className="text-primary font-heading text-sm uppercase tracking-widest">Watch</span>
          <h2 className="font-display text-4xl lg:text-5xl mt-2">See HellBound in Action</h2>
        </div>

        <div className="max-w-4xl mx-auto animate-fade-in-up" style={{ animationDelay: '150ms' }}>
          <div className="relative aspect-video rounded-xl overflow-hidden border border-border bg-secondary/40 shadow-2xl">
            {isPlaying ? (
              <iframe
                src={`https://www.youtube.com/embed/${VIDEO_ID}?autoplay=1`}
                title="HellBound Sauces"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
                className="w-full h-full"
              />
            ) : (
              <button
                type="button"
                onClick={() => setIsPlaying(true)}
                aria-label="Play video"
                className="group absolute inset-0 w-full h-full"
              >
                <img
                  src={`https://img.youtube.com/vi/${VIDEO_ID}/maxresdefault.jpg`}
                  alt="HellBound Sauces video"
                  loading="lazy"
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-background/40 group-hover:bg-background/30 transition-colors" />
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="flex items-center justify-center w-20 h-20 rounded-full bg-gradient-fire shadow-lg transition-transform group-hover:scale-110">
                    <Play className="h-8 w-8 text-white fill-white ml-1" />
                  </div>
                </div>
              </button>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
