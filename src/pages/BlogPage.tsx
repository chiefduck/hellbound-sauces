import { Link } from 'react-router-dom';
import { Layout } from '@/components/layout/Layout';
import { Clock, ArrowRight } from 'lucide-react';
import { blogPosts, getCategories, getFeaturedPosts } from '@/data/blog';
import { Button } from '@/components/ui/button';

export default function BlogPage() {
  const categories = getCategories();
  const featuredPosts = getFeaturedPosts();

  return (
    <Layout>
      {/* Hero */}
      <section className="py-16 lg:py-24 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-primary/10 via-transparent to-transparent" />
        <div className="container mx-auto px-4 lg:px-8 relative z-10">
          <h1 className="font-display text-5xl lg:text-6xl mb-4">The Hellbound Blog</h1>
          <p className="text-xl text-muted-foreground max-w-2xl">
            Recipes, heat education, BBQ tips, and stories from the Hellbound kitchen.
          </p>
        </div>
      </section>

      {/* Featured Posts */}
      {featuredPosts.length > 0 && (
        <section className="pb-16">
          <div className="container mx-auto px-4 lg:px-8">
            <h2 className="font-display text-3xl mb-8">Featured Articles</h2>
            <div className="grid md:grid-cols-2 gap-8">
              {featuredPosts.map((post) => (
                <Link
                  key={post.id}
                  to={`/blog/${post.slug}`}
                  className="group block bg-card rounded-xl overflow-hidden border border-border hover:border-primary/50 transition-all"
                >
                  <div className="aspect-video relative overflow-hidden">
                    <img src={post.image} alt={post.title} className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" />
                    <div className="absolute inset-0 bg-gradient-to-t from-background/80 to-transparent" />
                    <span className="absolute bottom-3 left-3 px-2 py-1 bg-primary text-primary-foreground text-xs font-heading uppercase rounded">
                      {post.category}
                    </span>
                  </div>
                  <div className="p-6">
                    <div className="flex items-center gap-4 text-xs text-muted-foreground mb-3">
                      <span>{post.author}</span>
                      <span className="flex items-center gap-1"><Clock className="h-3 w-3" />{post.readTime} min</span>
                    </div>
                    <h3 className="font-heading text-xl uppercase tracking-wide group-hover:text-primary transition-colors">
                      {post.title}
                    </h3>
                    <p className="text-muted-foreground mt-2">{post.excerpt}</p>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* All Posts */}
      <section className="pb-20 lg:pb-28">
        <div className="container mx-auto px-4 lg:px-8">
          {/* Category filter */}
          <div className="flex flex-wrap gap-2 mb-8">
            <Button variant="secondary" size="sm" className="font-heading">All</Button>
            {categories.map((cat) => (
              <Button key={cat} variant="ghost" size="sm" className="font-heading">{cat}</Button>
            ))}
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {blogPosts.map((post) => (
              <Link
                key={post.id}
                to={`/blog/${post.slug}`}
                className="group block bg-card rounded-xl overflow-hidden border border-border hover:border-primary/50 transition-all"
              >
                <div className="aspect-video relative overflow-hidden">
                  <img src={post.image} alt={post.title} className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" />
                </div>
                <div className="p-5">
                  <div className="flex items-center gap-4 text-xs text-muted-foreground mb-2">
                    <span className="text-primary font-heading uppercase">{post.category}</span>
                    <span className="flex items-center gap-1"><Clock className="h-3 w-3" />{post.readTime} min</span>
                  </div>
                  <h3 className="font-heading text-lg uppercase tracking-wide group-hover:text-primary transition-colors line-clamp-2">
                    {post.title}
                  </h3>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>
    </Layout>
  );
}
