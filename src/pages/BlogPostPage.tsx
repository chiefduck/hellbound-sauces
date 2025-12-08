import { useParams, Link } from 'react-router-dom';
import { Layout } from '@/components/layout/Layout';
import { Clock, ArrowLeft, ArrowRight } from 'lucide-react';
import { getBlogPostBySlug, getRecentPosts } from '@/data/blog';
import { Button } from '@/components/ui/button';

export default function BlogPostPage() {
  const { slug } = useParams<{ slug: string }>();
  const post = slug ? getBlogPostBySlug(slug) : undefined;
  const recentPosts = getRecentPosts(3).filter(p => p.slug !== slug);

  if (!post) {
    return (
      <Layout>
        <div className="container mx-auto px-4 py-20 text-center">
          <h1 className="font-display text-4xl mb-4">Post Not Found</h1>
          <p className="text-muted-foreground">The article you're looking for doesn't exist.</p>
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      <article className="py-12 lg:py-20">
        <div className="container mx-auto px-4 lg:px-8">
          {/* Back link */}
          <Link to="/blog" className="inline-flex items-center gap-2 text-muted-foreground hover:text-foreground mb-8">
            <ArrowLeft className="h-4 w-4" />
            Back to Blog
          </Link>

          {/* Header */}
          <header className="max-w-3xl mb-12">
            <div className="flex items-center gap-4 text-sm text-muted-foreground mb-4">
              <span className="text-primary font-heading uppercase">{post.category}</span>
              <span>{post.date}</span>
              <span className="flex items-center gap-1"><Clock className="h-4 w-4" />{post.readTime} min read</span>
            </div>
            <h1 className="font-display text-4xl lg:text-5xl mb-4">{post.title}</h1>
            <p className="text-xl text-muted-foreground">{post.excerpt}</p>
            <p className="text-sm text-muted-foreground mt-4">By {post.author}</p>
          </header>

          {/* Featured Image */}
          <div className="aspect-video max-w-4xl rounded-xl overflow-hidden border border-border mb-12">
            <img src={post.image} alt={post.title} className="w-full h-full object-cover" />
          </div>

          {/* Content */}
          <div className="max-w-3xl prose prose-invert prose-lg">
            <p className="text-muted-foreground">{post.content}</p>
            <p className="text-muted-foreground">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor 
              incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud 
              exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
            </p>
          </div>
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
    </Layout>
  );
}
