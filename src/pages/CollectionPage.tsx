import { useParams } from 'react-router-dom';
import { Layout } from '@/components/layout/Layout';
import { ProductGrid } from '@/components/product/ProductGrid';
import { getCollectionByHandle, getProductsInCollection } from '@/data/products';
import { Flame } from 'lucide-react';

export default function CollectionPage() {
  const { handle } = useParams<{ handle: string }>();
  const collection = handle ? getCollectionByHandle(handle) : undefined;
  const products = handle ? getProductsInCollection(handle) : [];

  if (!collection) {
    return (
      <Layout>
        <div className="container mx-auto px-4 py-20 text-center">
          <h1 className="font-display text-4xl mb-4">Collection Not Found</h1>
          <p className="text-muted-foreground">The collection you're looking for doesn't exist.</p>
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      {/* Hero */}
      <section className="py-16 lg:py-24 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-primary/10 via-transparent to-transparent" />
        <div className="container mx-auto px-4 lg:px-8 relative z-10">
          <div className="flex items-center gap-2 text-primary font-heading text-sm uppercase tracking-widest mb-4">
            <Flame className="h-4 w-4" />
            Shop Collection
          </div>
          <h1 className="font-display text-5xl lg:text-6xl mb-4">{collection.title}</h1>
          <p className="text-xl text-muted-foreground max-w-2xl">{collection.description}</p>
        </div>
      </section>

      {/* Products */}
      <section className="pb-20 lg:pb-28">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="flex justify-between items-center mb-8">
            <p className="text-muted-foreground">{products.length} products</p>
            {/* Filter/Sort placeholder */}
          </div>
          <ProductGrid products={products} columns={3} />
        </div>
      </section>
    </Layout>
  );
}
