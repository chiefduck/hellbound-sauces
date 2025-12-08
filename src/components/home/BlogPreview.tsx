import { Link } from 'react-router-dom';
import { ArrowRight, Clock } from 'lucide-react';
import { getRecentPosts } from '@/data/blog';
import { Button } from '@/components/ui/button';

export function BlogPreview() {
  const posts = getRecentPosts(3);

  return (
    <section className="py-20 lg:py-28 bg-secondary/30">
      <div className="container mx-auto px-4 lg:px-8">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-end gap-4 mb-12">
          <div>
            <span className="text-primary font-heading text-sm uppercase tracking-widest">From the Blog</span>
            <h2 className="font-display text-4xl lg:text-5xl mt-2">Latest Articles</h2>
          </div>
          <Button asChild variant="ghost" className="font-heading tracking-wide group">
            <Link to="/blog">
              View All
              <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
            </Link>
          </Button>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {posts.map((post, index) => (
            <Link
              key={post.id}
              to={`/blog/${post.slug}`}
              className="group block bg-card rounded-xl overflow-hidden border border-border hover:border-primary/50 transition-all duration-300 animate-fade-in-up"
              style={{ animationDelay: `${index * 100}ms` }}
            >
              <div className="aspect-video relative overflow-hidden">
                <img
                  src={post.image}
                  alt={post.title}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-background/80 to-transparent" />
                <span className="absolute bottom-3 left-3 px-2 py-1 bg-primary/90 text-primary-foreground text-xs font-heading uppercase rounded">
                  {post.category}
                </span>
              </div>
              
              <div className="p-5">
                <div className="flex items-center gap-4 text-xs text-muted-foreground mb-3">
                  <span>{post.author}</span>
                  <span className="flex items-center gap-1">
                    <Clock className="h-3 w-3" />
                    {post.readTime} min read
                  </span>
                </div>
                
                <h3 className="font-heading text-lg uppercase tracking-wide group-hover:text-primary transition-colors line-clamp-2">
                  {post.title}
                </h3>
                <p className="text-muted-foreground text-sm mt-2 line-clamp-2">{post.excerpt}</p>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
