import { useParams, Link } from 'react-router-dom';
import { Layout } from '@/components/layout/Layout';
import { Clock, ArrowLeft, Share2, Facebook, Twitter, User, ChevronLeft, ChevronRight } from 'lucide-react';
import { getBlogPostBySlug, getRecentPosts, blogPosts } from '@/data/blog';
import { Button } from '@/components/ui/button';
import ReactMarkdown from 'react-markdown';
import { useState, useEffect } from 'react';

export default function BlogPostPage() {
  const { slug } = useParams<{ slug: string }>();
  const post = slug ? getBlogPostBySlug(slug) : undefined;
  const recentPosts = getRecentPosts(3).filter(p => p.slug !== slug);
  const [readProgress, setReadProgress] = useState(0);

  // Get prev/next posts for navigation
  const currentIndex = blogPosts.findIndex(p => p.slug === slug);
  const prevPost = currentIndex > 0 ? blogPosts[currentIndex - 1] : null;
  const nextPost = currentIndex < blogPosts.length - 1 ? blogPosts[currentIndex + 1] : null;

  useEffect(() => {
    const handleScroll = () => {
      const article = document.getElementById('article-content');
      if (article) {
        const { top, height } = article.getBoundingClientRect();
        const windowHeight = window.innerHeight;
        const progress = Math.min(Math.max((windowHeight - top) / height, 0), 1);
        setReadProgress(progress * 100);
      }
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  if (!post) {
    return (
      <Layout>
        <div className="container mx-auto px-4 py-20 text-center">
          <h1 className="font-display text-3xl md:text-4xl mb-4">Post Not Found</h1>
          <p className="text-muted-foreground mb-8">The article you're looking for doesn't exist.</p>
          <Button asChild>
            <Link to="/blog">Back to Blog</Link>
          </Button>
        </div>
      </Layout>
    );
  }

  const handleShare = async () => {
    if (navigator.share) {
      await navigator.share({
        title: post.title,
        text: post.excerpt,
        url: window.location.href,
      });
    }
  };

  return (
    <Layout>
      {/* Reading Progress Bar */}
      <div className="fixed top-0 left-0 right-0 h-1 bg-background/50 z-50">
        <div 
          className="h-full bg-gradient-fire transition-all duration-150"
          style={{ width: `${readProgress}%` }}
        />
      </div>

      <article className="pt-4 pb-12 lg:pt-8 lg:pb-20">
        <div className="container mx-auto px-4 lg:px-8">
          {/* Back link - Mobile */}
          <Link 
            to="/blog" 
            className="inline-flex items-center gap-1.5 text-sm text-muted-foreground hover:text-foreground mb-6 transition-colors"
          >
            <ArrowLeft className="h-4 w-4" />
            <span className="hidden sm:inline">Back to Blog</span>
            <span className="sm:hidden">Blog</span>
          </Link>

          {/* Featured Image - Full width on mobile */}
          <div className="relative -mx-4 sm:mx-0 mb-6 lg:mb-10">
            <div className="aspect-[16/10] sm:aspect-video lg:max-w-4xl lg:mx-auto sm:rounded-xl overflow-hidden">
              <img 
                src={post.image} 
                alt={post.title} 
                className="w-full h-full object-cover"
              />
            </div>
            {/* Category badge on image */}
            <div className="absolute bottom-4 left-4 sm:left-4 lg:left-auto lg:bottom-6">
              <span className="px-3 py-1.5 bg-primary text-primary-foreground text-xs font-heading uppercase tracking-wider rounded-full">
                {post.category}
              </span>
            </div>
          </div>

          {/* Header */}
          <header className="max-w-3xl mx-auto mb-8 lg:mb-12">
            {/* Meta info */}
            <div className="flex flex-wrap items-center gap-3 text-sm text-muted-foreground mb-4">
              <span className="flex items-center gap-1.5">
                <Clock className="h-4 w-4" />
                {post.readTime} min read
              </span>
              <span className="hidden sm:inline">•</span>
              <span>
                {new Date(post.date).toLocaleDateString('en-US', { 
                  month: 'short', 
                  day: 'numeric', 
                  year: 'numeric' 
                })}
              </span>
            </div>

            {/* Title */}
            <h1 className="font-display text-2xl sm:text-3xl lg:text-5xl leading-tight mb-4 lg:mb-6">
              {post.title}
            </h1>

            {/* Excerpt */}
            <p className="text-base sm:text-lg lg:text-xl text-muted-foreground leading-relaxed mb-6">
              {post.excerpt}
            </p>

            {/* Author & Share Row */}
            <div className="flex items-center justify-between pt-4 border-t border-border">
              <div className="flex items-center gap-3">
                <div className="h-10 w-10 rounded-full bg-secondary flex items-center justify-center">
                  <User className="h-5 w-5 text-muted-foreground" />
                </div>
                <div>
                  <p className="text-sm font-medium">{post.author}</p>
                  <p className="text-xs text-muted-foreground">Hellbound Team</p>
                </div>
              </div>
              
              {/* Share buttons */}
              <div className="flex items-center gap-1">
                <Button 
                  variant="ghost" 
                  size="icon" 
                  className="h-9 w-9 rounded-full"
                  onClick={handleShare}
                >
                  <Share2 className="h-4 w-4" />
                </Button>
                <Button 
                  variant="ghost" 
                  size="icon" 
                  className="h-9 w-9 rounded-full hidden sm:flex"
                  asChild
                >
                  <a href={`https://facebook.com/sharer/sharer.php?u=${encodeURIComponent(window.location.href)}`} target="_blank" rel="noopener noreferrer">
                    <Facebook className="h-4 w-4" />
                  </a>
                </Button>
                <Button 
                  variant="ghost" 
                  size="icon" 
                  className="h-9 w-9 rounded-full hidden sm:flex"
                  asChild
                >
                  <a href={`https://twitter.com/intent/tweet?url=${encodeURIComponent(window.location.href)}&text=${encodeURIComponent(post.title)}`} target="_blank" rel="noopener noreferrer">
                    <Twitter className="h-4 w-4" />
                  </a>
                </Button>
              </div>
            </div>
          </header>

          {/* Content */}
          <div 
            id="article-content"
            className="max-w-3xl mx-auto prose prose-invert prose-base lg:prose-lg 
              prose-headings:font-display prose-headings:tracking-wide 
              prose-h2:text-xl prose-h2:lg:text-2xl prose-h2:mt-8 prose-h2:mb-4
              prose-h3:text-lg prose-h3:lg:text-xl prose-h3:mt-6 prose-h3:mb-3
              prose-p:text-muted-foreground prose-p:leading-relaxed prose-p:mb-4
              prose-li:text-muted-foreground prose-li:leading-relaxed
              prose-strong:text-foreground prose-strong:font-semibold
              prose-a:text-primary prose-a:no-underline hover:prose-a:underline
              prose-blockquote:border-l-primary prose-blockquote:bg-secondary/30 
              prose-blockquote:py-1 prose-blockquote:px-4 prose-blockquote:rounded-r-lg
              prose-blockquote:not-italic prose-blockquote:text-foreground"
          >
            <ReactMarkdown>{post.content}</ReactMarkdown>
          </div>

          {/* Tags */}
          {post.tags && post.tags.length > 0 && (
            <div className="max-w-3xl mx-auto mt-10 pt-6 border-t border-border">
              <div className="flex flex-wrap gap-2">
                {post.tags.map((tag) => (
                  <span 
                    key={tag} 
                    className="px-3 py-1.5 bg-secondary/50 hover:bg-secondary rounded-full text-sm transition-colors cursor-default"
                  >
                    #{tag}
                  </span>
                ))}
              </div>
            </div>
          )}

          {/* Post Navigation */}
          <nav className="max-w-3xl mx-auto mt-10 pt-6 border-t border-border">
            <div className="grid grid-cols-2 gap-4">
              {prevPost ? (
                <Link 
                  to={`/blog/${prevPost.slug}`}
                  className="group p-4 rounded-lg bg-secondary/30 hover:bg-secondary/50 transition-colors"
                >
                  <div className="flex items-center gap-2 text-sm text-muted-foreground mb-2">
                    <ChevronLeft className="h-4 w-4" />
                    Previous
                  </div>
                  <p className="font-heading text-sm sm:text-base line-clamp-2 group-hover:text-primary transition-colors">
                    {prevPost.title}
                  </p>
                </Link>
              ) : <div />}
              
              {nextPost ? (
                <Link 
                  to={`/blog/${nextPost.slug}`}
                  className="group p-4 rounded-lg bg-secondary/30 hover:bg-secondary/50 transition-colors text-right"
                >
                  <div className="flex items-center justify-end gap-2 text-sm text-muted-foreground mb-2">
                    Next
                    <ChevronRight className="h-4 w-4" />
                  </div>
                  <p className="font-heading text-sm sm:text-base line-clamp-2 group-hover:text-primary transition-colors">
                    {nextPost.title}
                  </p>
                </Link>
              ) : <div />}
            </div>
          </nav>
        </div>
      </article>

      {/* Related Posts */}
      {recentPosts.length > 0 && (
        <section className="py-12 lg:py-16 bg-charcoal">
          <div className="container mx-auto px-4 lg:px-8">
            <h2 className="font-display text-2xl lg:text-3xl mb-6 lg:mb-8">More Articles</h2>
            
            {/* Mobile: Horizontal scroll */}
            <div className="lg:hidden -mx-4 px-4">
              <div className="flex gap-4 overflow-x-auto pb-4 snap-x snap-mandatory scrollbar-hide">
                {recentPosts.map((p) => (
                  <Link
                    key={p.id}
                    to={`/blog/${p.slug}`}
                    className="group flex-shrink-0 w-[280px] snap-start bg-card rounded-xl overflow-hidden border border-border hover:border-primary/50 transition-all"
                  >
                    <div className="aspect-video relative overflow-hidden">
                      <img 
                        src={p.image} 
                        alt={p.title} 
                        className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" 
                      />
                    </div>
                    <div className="p-4">
                      <div className="flex items-center gap-3 text-xs text-muted-foreground mb-2">
                        <span className="text-primary font-heading uppercase">{p.category}</span>
                        <span className="flex items-center gap-1">
                          <Clock className="h-3 w-3" />{p.readTime} min
                        </span>
                      </div>
                      <h3 className="font-heading text-base uppercase tracking-wide group-hover:text-primary transition-colors line-clamp-2">
                        {p.title}
                      </h3>
                    </div>
                  </Link>
                ))}
              </div>
            </div>

            {/* Desktop: Grid */}
            <div className="hidden lg:grid lg:grid-cols-3 gap-6">
              {recentPosts.map((p) => (
                <Link
                  key={p.id}
                  to={`/blog/${p.slug}`}
                  className="group block bg-card rounded-xl overflow-hidden border border-border hover:border-primary/50 transition-all"
                >
                  <div className="aspect-video relative overflow-hidden">
                    <img 
                      src={p.image} 
                      alt={p.title} 
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" 
                    />
                  </div>
                  <div className="p-5">
                    <div className="flex items-center gap-4 text-xs text-muted-foreground mb-2">
                      <span className="text-primary font-heading uppercase">{p.category}</span>
                      <span className="flex items-center gap-1">
                        <Clock className="h-3 w-3" />{p.readTime} min
                      </span>
                    </div>
                    <h3 className="font-heading text-lg uppercase tracking-wide group-hover:text-primary transition-colors line-clamp-2">
                      {p.title}
                    </h3>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* CTA */}
      <section className="py-12 lg:py-16">
        <div className="container mx-auto px-4 lg:px-8 text-center">
          <h2 className="font-display text-2xl lg:text-3xl mb-4">Ready to Experience Hellbound?</h2>
          <p className="text-muted-foreground mb-6 max-w-xl mx-auto text-sm sm:text-base">
            Explore our artisan hot sauces and BBQ rubs crafted for true heat seekers.
          </p>
          <Button asChild className="bg-gradient-fire hover:opacity-90 font-heading text-base lg:text-lg h-11 lg:h-12 px-6 lg:px-8">
            <Link to="/collections/all">Shop All Products</Link>
          </Button>
        </div>
      </section>
    </Layout>
  );
}
