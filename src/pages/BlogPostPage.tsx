import { useParams, Link } from 'react-router-dom';
import { Layout } from '@/components/layout/Layout';
import { Clock, ArrowLeft, Share2, Facebook, Twitter } from 'lucide-react';
import { getBlogPostBySlug, getRecentPosts } from '@/data/blog';
import { Button } from '@/components/ui/button';
import ReactMarkdown from 'react-markdown';

export default function BlogPostPage() {
  const { slug } = useParams<{ slug: string }>();
  const post = slug ? getBlogPostBySlug(slug) : undefined;
  const recentPosts = getRecentPosts(3).filter(p => p.slug !== slug);

  if (!post) {
    return (
      <Layout>
        <div className="container mx-auto px-4 py-20 text-center">
          <h1 className="font-display text-4xl mb-4">Post Not Found</h1>
          <p className="text-muted-foreground mb-8">The article you're looking for doesn't exist.</p>
          <Button asChild>
            <Link to="/blog">Back to Blog</Link>
          </Button>
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      <article className="py-12 lg:py-20">
        <div className="container mx-auto px-4 lg:px-8">
          {/* Back link */}
          <Link to="/blog" className="inline-flex items-center gap-2 text-muted-foreground hover:text-foreground mb-8 transition-colors">
            <ArrowLeft className="h-4 w-4" />
            Back to Blog
          </Link>

          {/* Header */}
          <header className="max-w-3xl mb-12">
            <div className="flex items-center gap-4 text-sm text-muted-foreground mb-4">
              <span className="text-primary font-heading uppercase">{post.category}</span>
              <span>{new Date(post.date).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}</span>
              <span className="flex items-center gap-1"><Clock className="h-4 w-4" />{post.readTime} min read</span>
            </div>
            <h1 className="font-display text-4xl lg:text-5xl mb-4">{post.title}</h1>
            <p className="text-xl text-muted-foreground">{post.excerpt}</p>
            <div className="flex items-center justify-between mt-6">
              <p className="text-sm text-muted-foreground">By <span className="text-foreground">{post.author}</span></p>
              <div className="flex items-center gap-2">
                <span className="text-sm text-muted-foreground mr-2">Share:</span>
                <Button variant="ghost" size="icon" className="h-8 w-8">
                  <Facebook className="h-4 w-4" />
                </Button>
                <Button variant="ghost" size="icon" className="h-8 w-8">
                  <Twitter className="h-4 w-4" />
                </Button>
                <Button variant="ghost" size="icon" className="h-8 w-8">
                  <Share2 className="h-4 w-4" />
                </Button>
              </div>
            </div>
          </header>

          {/* Featured Image */}
          <div className="aspect-video max-w-4xl rounded-xl overflow-hidden border border-border mb-12">
            <img src={post.image} alt={post.title} className="w-full h-full object-cover" />
          </div>

          {/* Content */}
          <div className="max-w-3xl prose prose-invert prose-lg prose-headings:font-display prose-headings:tracking-wide prose-h2:text-2xl prose-h3:text-xl prose-p:text-muted-foreground prose-li:text-muted-foreground prose-strong:text-foreground prose-a:text-primary prose-a:no-underline hover:prose-a:underline">
            <ReactMarkdown>{post.content}</ReactMarkdown>
          </div>

          {/* Tags */}
          {post.tags && post.tags.length > 0 && (
            <div className="max-w-3xl mt-12 pt-8 border-t border-border">
              <div className="flex flex-wrap gap-2">
                <span className="text-sm text-muted-foreground mr-2">Tags:</span>
                {post.tags.map((tag) => (
                  <span key={tag} className="px-3 py-1 bg-secondary rounded-full text-sm">
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          )}
        </div>
      </article>

      {/* Related Posts */}
      {recentPosts.length > 0 && (
        <section className="py-16 bg-charcoal">
          <div className="container mx-auto px-4 lg:px-8">
            <h2 className="font-display text-3xl mb-8">More Articles</h2>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {recentPosts.map((p) => (
                <Link
                  key={p.id}
                  to={`/blog/${p.slug}`}
                  className="group block bg-card rounded-xl overflow-hidden border border-border hover:border-primary/50 transition-all"
                >
                  <div className="aspect-video relative overflow-hidden">
                    <img src={p.image} alt={p.title} className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" />
                  </div>
                  <div className="p-5">
                    <div className="flex items-center gap-4 text-xs text-muted-foreground mb-2">
                      <span className="text-primary font-heading uppercase">{p.category}</span>
                      <span className="flex items-center gap-1"><Clock className="h-3 w-3" />{p.readTime} min</span>
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
      <section className="py-16">
        <div className="container mx-auto px-4 lg:px-8 text-center">
          <h2 className="font-display text-3xl mb-4">Ready to Experience Hellbound?</h2>
          <p className="text-muted-foreground mb-8 max-w-xl mx-auto">
            Explore our artisan hot sauces and BBQ rubs crafted for true heat seekers.
          </p>
          <Button asChild className="bg-gradient-fire hover:opacity-90 font-heading text-lg h-12 px-8">
            <Link to="/collections/all">Shop All Products</Link>
          </Button>
        </div>
      </section>
    </Layout>
  );
}
