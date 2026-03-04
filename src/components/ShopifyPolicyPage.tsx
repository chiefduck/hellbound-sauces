import { Layout } from '@/components/layout/Layout';
import { useShopifyPolicy } from '@/hooks/useShopifyPage';
import { ShopifyPolicyKey } from '@/lib/shopify';

interface ShopifyPolicyPageProps {
  policyKey: ShopifyPolicyKey;
  fallbackTitle: string;
}

export default function ShopifyPolicyPage({ policyKey, fallbackTitle }: ShopifyPolicyPageProps) {
  const { data: policy, isLoading, isError } = useShopifyPolicy(policyKey);

  return (
    <Layout>
      <section className="py-20 lg:py-28">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="max-w-3xl mx-auto">
            {isLoading && (
              <div className="animate-pulse space-y-4">
                <div className="h-12 bg-muted rounded w-2/3" />
                <div className="h-4 bg-muted rounded w-full" />
                <div className="h-4 bg-muted rounded w-5/6" />
                <div className="h-4 bg-muted rounded w-full" />
                <div className="h-4 bg-muted rounded w-4/5" />
              </div>
            )}

            {!isLoading && policy && (
              <>
                <h1 className="font-display text-5xl lg:text-6xl mb-10">{policy.title}</h1>
                <div
                  className="prose prose-invert prose-lg max-w-none
                    prose-headings:font-display prose-headings:text-foreground
                    prose-p:text-muted-foreground prose-li:text-muted-foreground
                    prose-a:text-primary prose-a:no-underline hover:prose-a:underline
                    prose-strong:text-foreground"
                  dangerouslySetInnerHTML={{ __html: policy.body }}
                />
              </>
            )}

            {!isLoading && (isError || !policy) && (
              <>
                <h1 className="font-display text-5xl lg:text-6xl mb-10">{fallbackTitle}</h1>
                <p className="text-muted-foreground">
                  This policy is currently unavailable. Please contact us at{' '}
                  <a href="mailto:scott@hellboundsauces.com" className="text-primary hover:underline">
                    scott@hellboundsauces.com
                  </a>{' '}
                  for more information.
                </p>
              </>
            )}
          </div>
        </div>
      </section>
    </Layout>
  );
}
