import { useParams, Link } from 'react-router-dom';
import { Layout } from '@/components/layout/Layout';
import { Clock, ArrowLeft, ArrowRight, Share2, Facebook, Twitter, User, ChevronLeft, ChevronRight } from 'lucide-react';
import { getBlogPostBySlug, getRecentPosts, blogPosts } from '@/data/blog';
import { Button } from '@/components/ui/button';
import ReactMarkdown from 'react-markdown';
import { useState, useEffect } from 'react';
import { SEOHead, ArticleSchema, BreadcrumbSchema } from '@/components/seo';

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
      <SEOHead
        title={post.title}
        description={post.excerpt}
        canonical={`/blog/${post.slug}`}
        type="article"
        image={post.image}
        publishedTime={post.date}
        author={post.author}
        section={post.category}
        tags={post.tags}
      />
      <ArticleSchema post={post} />
      <BreadcrumbSchema items={[
        { name: 'Home', url: '/' },
        { name: 'Blog', url: '/blog' },
        { name: post.title, url: `/blog/${post.slug}` }
      ]} />
      {/* Reading Progress Bar */}
      <div className="fixed top-0 left-0 right-0 h-1 bg-background/50 z-50">
        <div 
          className="h-full bg-gradient-fire transition-all duration-150"
          style={{ width: `${readProgress}%` }}
        />
      </div>

      <article className="pt-6 pb-16 lg:pt-12 lg:pb-24">
        <div className="container mx-auto px-4 lg:px-8">
          {/* Back link */}
          <Link
            to="/blog"
            className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-primary transition-colors mb-8 group"
          >
            <ArrowLeft className="h-4 w-4 transition-transform group-hover:-translate-x-1" />
            <span>Back to Blog</span>
          </Link>

          {/* Featured Image - Enhanced */}
          <div className="relative mb-8 lg:mb-12">
            <div className="aspect-video lg:max-w-5xl lg:mx-auto rounded-xl overflow-hidden shadow-2xl">
              <img
                src={post.image}
                alt={post.title}
                className="w-full h-full object-cover"
              />
            </div>
            {/* Category badge on image */}
            <div className="absolute top-4 left-4 lg:top-6 lg:left-6">
              <span className="px-4 py-2 bg-primary text-primary-foreground text-xs font-heading uppercase tracking-wider rounded-lg shadow-lg">
                {post.category}
              </span>
            </div>
          </div>

          {/* Header */}
          <header className="max-w-4xl mx-auto mb-12 lg:mb-16">
            {/* Title */}
            <h1 className="font-display text-3xl sm:text-4xl lg:text-6xl leading-tight mb-6 lg:mb-8 text-center">
              {post.title}
            </h1>

            {/* Excerpt */}
            <p className="text-lg sm:text-xl lg:text-2xl text-muted-foreground leading-relaxed mb-8 text-center max-w-3xl mx-auto">
              {post.excerpt}
            </p>

            {/* Meta info bar */}
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4 sm:gap-6 py-6 border-y border-border">
              {/* Author */}
              <div className="flex items-center gap-3">
                <div className="h-12 w-12 rounded-full bg-gradient-fire flex items-center justify-center">
                  <User className="h-6 w-6 text-white" />
                </div>
                <div>
                  <p className="text-sm font-medium text-foreground">{post.author}</p>
                  <p className="text-xs text-muted-foreground">Hellbound Team</p>
                </div>
              </div>

              <span className="hidden sm:block text-muted-foreground">•</span>

              {/* Date & Read time */}
              <div className="flex items-center gap-4 text-sm text-muted-foreground">
                <span>
                  {new Date(post.date).toLocaleDateString('en-US', {
                    month: 'long',
                    day: 'numeric',
                    year: 'numeric'
                  })}
                </span>
                <span className="flex items-center gap-1.5">
                  <Clock className="h-4 w-4" />
                  {post.readTime} min read
                </span>
              </div>

              <span className="hidden sm:block text-muted-foreground">•</span>

              {/* Share buttons */}
              <div className="flex items-center gap-2">
                <span className="text-xs text-muted-foreground uppercase tracking-wide mr-1">Share</span>
                <Button
                  variant="outline"
                  size="icon"
                  className="h-9 w-9 rounded-full"
                  onClick={handleShare}
                >
                  <Share2 className="h-4 w-4" />
                </Button>
                <Button
                  variant="outline"
                  size="icon"
                  className="h-9 w-9 rounded-full"
                  asChild
                >
                  <a href={`https://facebook.com/sharer/sharer.php?u=${encodeURIComponent(window.location.href)}`} target="_blank" rel="noopener noreferrer">
                    <Facebook className="h-4 w-4" />
                  </a>
                </Button>
                <Button
                  variant="outline"
                  size="icon"
                  className="h-9 w-9 rounded-full"
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
            className="max-w-3xl mx-auto prose prose-invert prose-lg
              prose-headings:font-display prose-headings:tracking-wide prose-headings:text-foreground
              prose-h2:text-2xl prose-h2:lg:text-3xl prose-h2:mt-12 prose-h2:mb-6 prose-h2:font-bold
              prose-h3:text-xl prose-h3:lg:text-2xl prose-h3:mt-10 prose-h3:mb-4 prose-h3:font-semibold
              prose-h4:text-lg prose-h4:lg:text-xl prose-h4:mt-8 prose-h4:mb-3
              prose-p:text-muted-foreground prose-p:leading-relaxed prose-p:mb-6 prose-p:text-base prose-p:lg:text-lg
              prose-li:text-muted-foreground prose-li:leading-relaxed prose-li:my-2
              prose-ul:my-6 prose-ol:my-6
              prose-strong:text-foreground prose-strong:font-semibold
              prose-a:text-primary prose-a:font-medium prose-a:no-underline hover:prose-a:underline prose-a:transition-colors
              prose-blockquote:border-l-4 prose-blockquote:border-primary prose-blockquote:bg-primary/5
              prose-blockquote:py-4 prose-blockquote:px-6 prose-blockquote:rounded-r-xl
              prose-blockquote:not-italic prose-blockquote:text-foreground prose-blockquote:my-8
              prose-code:text-primary prose-code:bg-secondary prose-code:px-1.5 prose-code:py-0.5 prose-code:rounded prose-code:text-sm
              prose-pre:bg-secondary prose-pre:border prose-pre:border-border prose-pre:rounded-xl prose-pre:p-4
              prose-img:rounded-xl prose-img:shadow-lg prose-img:my-8"
          >
            <ReactMarkdown>{post.content}</ReactMarkdown>
          </div>

          {/* Tags */}
          {post.tags && post.tags.length > 0 && (
            <div className="max-w-3xl mx-auto mt-12 pt-8 border-t border-border">
              <h3 className="text-sm font-heading uppercase tracking-wide text-muted-foreground mb-4">Tagged in</h3>
              <div className="flex flex-wrap gap-3">
                {post.tags.map((tag) => (
                  <Link
                    key={tag}
                    to={`/blog?tag=${encodeURIComponent(tag)}`}
                    className="px-4 py-2 bg-secondary hover:bg-primary/10 hover:text-primary border border-border hover:border-primary/50 rounded-lg text-sm font-medium transition-all"
                  >
                    #{tag}
                  </Link>
                ))}
              </div>
            </div>
          )}

          {/* Post Navigation */}
          <nav className="max-w-3xl mx-auto mt-12 pt-8 border-t border-border">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              {prevPost ? (
                <Link
                  to={`/blog/${prevPost.slug}`}
                  className="group p-6 rounded-xl bg-card border border-border hover:border-primary/50 transition-all"
                >
                  <div className="flex items-center gap-2 text-xs font-heading uppercase tracking-wide text-muted-foreground mb-3">
                    <ChevronLeft className="h-4 w-4" />
                    Previous Article
                  </div>
                  <p className="font-heading text-base sm:text-lg uppercase tracking-wide line-clamp-2 group-hover:text-primary transition-colors">
                    {prevPost.title}
                  </p>
                </Link>
              ) : <div />}

              {nextPost ? (
                <Link
                  to={`/blog/${nextPost.slug}`}
                  className="group p-6 rounded-xl bg-card border border-border hover:border-primary/50 transition-all sm:text-right"
                >
                  <div className="flex items-center justify-start sm:justify-end gap-2 text-xs font-heading uppercase tracking-wide text-muted-foreground mb-3">
                    Next Article
                    <ChevronRight className="h-4 w-4" />
                  </div>
                  <p className="font-heading text-base sm:text-lg uppercase tracking-wide line-clamp-2 group-hover:text-primary transition-colors">
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
        <section className="py-16 lg:py-20 bg-secondary/30">
          <div className="container mx-auto px-4 lg:px-8">
            <div className="max-w-6xl mx-auto">
              <h2 className="font-display text-3xl lg:text-4xl mb-8 lg:mb-12 text-center">
                Continue Reading
              </h2>

              {/* Grid - Responsive */}
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                {recentPosts.map((p) => (
                  <Link
                    key={p.id}
                    to={`/blog/${p.slug}`}
                    className="group block bg-card rounded-xl overflow-hidden border border-border hover:border-primary/50 hover:shadow-xl transition-all"
                  >
                    <div className="aspect-video relative overflow-hidden">
                      <img
                        src={p.image}
                        alt={p.title}
                        className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-background/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                    </div>
                    <div className="p-5">
                      <div className="flex items-center gap-3 text-xs text-muted-foreground mb-3">
                        <span className="text-primary font-heading uppercase">{p.category}</span>
                        <span>•</span>
                        <span className="flex items-center gap-1">
                          <Clock className="h-3 w-3" />{p.readTime} min
                        </span>
                      </div>
                      <h3 className="font-heading text-base lg:text-lg uppercase tracking-wide group-hover:text-primary transition-colors line-clamp-2 mb-2">
                        {p.title}
                      </h3>
                      <p className="text-sm text-muted-foreground line-clamp-2">
                        {p.excerpt}
                      </p>
                    </div>
                  </Link>
                ))}
              </div>

              {/* View All Link */}
              <div className="text-center mt-10">
                <Button asChild variant="outline" size="lg" className="font-heading">
                  <Link to="/blog">
                    View All Articles
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Link>
                </Button>
              </div>
            </div>
          </div>
        </section>
      )}

      {/* CTA */}
      <section className="py-16 lg:py-24 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-primary/5 to-transparent" />
        <div className="container mx-auto px-4 lg:px-8 relative z-10">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="font-display text-3xl lg:text-5xl mb-6">
              Ready to Experience <span className="text-gradient-fire">HellBound</span>?
            </h2>
            <p className="text-lg lg:text-xl text-muted-foreground mb-10 leading-relaxed">
              Explore our artisan hot sauces and BBQ rubs crafted for true heat seekers.
              Every bottle features bold flavors and striking tattoo-inspired artwork.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <Button asChild size="lg" className="bg-gradient-fire hover:opacity-90 font-heading text-lg h-12 px-8 w-full sm:w-auto">
                <Link to="/collections/all">
                  Shop All Products
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Link>
              </Button>
              <Button asChild size="lg" variant="outline" className="font-heading text-lg h-12 px-8 w-full sm:w-auto">
                <Link to="/heat-guide">Find Your Heat Level</Link>
              </Button>
            </div>
          </div>
        </div>
      </section>
    </Layout>
  );
}
