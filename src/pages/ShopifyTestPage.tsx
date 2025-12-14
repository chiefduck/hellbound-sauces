import { useEffect, useState } from 'react';
import { Layout } from '@/components/layout/Layout';
import { CheckCircle, XCircle, AlertCircle } from 'lucide-react';
import { shopifyFetch } from '@/lib/shopify';

export default function ShopifyTestPage() {
  const [config, setConfig] = useState({
    domain: '',
    hasToken: false,
    version: '',
  });
  const [testResult, setTestResult] = useState<{
    success: boolean;
    message: string;
    data?: any;
  } | null>(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setConfig({
      domain: import.meta.env.VITE_SHOPIFY_STORE_DOMAIN || 'NOT SET',
      hasToken: !!import.meta.env.VITE_SHOPIFY_STOREFRONT_TOKEN,
      version: '2024-10',
    });
  }, []);

  const testConnection = async () => {
    setLoading(true);
    setTestResult(null);

    try {
      // Simple query to test connection
      const query = `
        {
          shop {
            name
            description
            primaryDomain {
              url
            }
          }
        }
      `;

      const response = await shopifyFetch(query);

      if (response.data?.shop) {
        setTestResult({
          success: true,
          message: 'Successfully connected to Shopify!',
          data: response.data.shop,
        });
      } else if (response.errors) {
        setTestResult({
          success: false,
          message: 'API Error: ' + JSON.stringify(response.errors),
        });
      } else {
        setTestResult({
          success: false,
          message: 'Unexpected response format',
          data: response,
        });
      }
    } catch (error) {
      setTestResult({
        success: false,
        message: error instanceof Error ? error.message : 'Unknown error',
      });
    } finally {
      setLoading(false);
    }
  };

  const testProducts = async () => {
    setLoading(true);
    setTestResult(null);

    try {
      const query = `
        {
          products(first: 5) {
            edges {
              node {
                id
                title
                handle
                variants(first: 1) {
                  edges {
                    node {
                      id
                      price {
                        amount
                      }
                    }
                  }
                }
              }
            }
          }
        }
      `;

      const response = await shopifyFetch(query);

      if (response.data?.products) {
        const products = response.data.products.edges;
        setTestResult({
          success: true,
          message: `Found ${products.length} products`,
          data: products,
        });
      } else if (response.errors) {
        setTestResult({
          success: false,
          message: 'API Error: ' + JSON.stringify(response.errors),
        });
      } else {
        setTestResult({
          success: false,
          message: 'No products found or unexpected response',
          data: response,
        });
      }
    } catch (error) {
      setTestResult({
        success: false,
        message: error instanceof Error ? error.message : 'Unknown error',
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <Layout>
      <div className="container mx-auto px-4 py-20">
        <h1 className="font-display text-4xl mb-8">Shopify Integration Test</h1>

        {/* Configuration Check */}
        <div className="bg-card border border-border rounded-lg p-6 mb-6">
          <h2 className="font-heading text-2xl mb-4">Configuration</h2>
          <div className="space-y-2">
            <div className="flex items-center gap-2">
              {config.domain && config.domain !== 'NOT SET' ? (
                <CheckCircle className="h-5 w-5 text-green-500" />
              ) : (
                <XCircle className="h-5 w-5 text-red-500" />
              )}
              <span className="text-muted-foreground">Domain:</span>
              <span className="font-mono">{config.domain}</span>
            </div>
            <div className="flex items-center gap-2">
              {config.hasToken ? (
                <CheckCircle className="h-5 w-5 text-green-500" />
              ) : (
                <XCircle className="h-5 w-5 text-red-500" />
              )}
              <span className="text-muted-foreground">Storefront Token:</span>
              <span className="font-mono">{config.hasToken ? 'SET' : 'NOT SET'}</span>
            </div>
            <div className="flex items-center gap-2">
              {config.version && config.version !== 'NOT SET' ? (
                <CheckCircle className="h-5 w-5 text-green-500" />
              ) : (
                <XCircle className="h-5 w-5 text-red-500" />
              )}
              <span className="text-muted-foreground">API Version:</span>
              <span className="font-mono">{config.version}</span>
            </div>
          </div>

          {!config.hasToken && (
            <div className="mt-4 p-4 bg-yellow-500/10 border border-yellow-500/20 rounded-lg">
              <div className="flex gap-2">
                <AlertCircle className="h-5 w-5 text-yellow-500 flex-shrink-0 mt-0.5" />
                <div>
                  <p className="text-sm font-medium text-yellow-500 mb-1">
                    Storefront API Token Not Set
                  </p>
                  <p className="text-sm text-muted-foreground">
                    You need to create a Storefront API access token in Shopify Admin and add it
                    to your .env file as VITE_SHOPIFY_STOREFRONT_TOKEN.
                  </p>
                  <p className="text-sm text-muted-foreground mt-2">
                    See <code className="bg-secondary px-1 rounded">SHOPIFY_SETUP.md</code> for
                    detailed instructions.
                  </p>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Test Buttons */}
        <div className="bg-card border border-border rounded-lg p-6 mb-6">
          <h2 className="font-heading text-2xl mb-4">Connection Tests</h2>
          <div className="flex flex-wrap gap-4">
            <button
              onClick={testConnection}
              disabled={loading || !config.hasToken}
              className="px-6 py-3 bg-primary text-primary-foreground rounded-lg font-heading uppercase tracking-wide hover:opacity-90 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {loading ? 'Testing...' : 'Test Shop Connection'}
            </button>
            <button
              onClick={testProducts}
              disabled={loading || !config.hasToken}
              className="px-6 py-3 bg-secondary text-secondary-foreground rounded-lg font-heading uppercase tracking-wide hover:bg-secondary/80 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {loading ? 'Testing...' : 'Test Product Fetching'}
            </button>
          </div>
        </div>

        {/* Test Results */}
        {testResult && (
          <div className="bg-card border border-border rounded-lg p-6">
            <h2 className="font-heading text-2xl mb-4">Test Results</h2>
            <div className="flex items-start gap-3 mb-4">
              {testResult.success ? (
                <CheckCircle className="h-6 w-6 text-green-500 flex-shrink-0" />
              ) : (
                <XCircle className="h-6 w-6 text-red-500 flex-shrink-0" />
              )}
              <div>
                <p className={testResult.success ? 'text-green-500' : 'text-red-500'}>
                  {testResult.message}
                </p>
              </div>
            </div>

            {testResult.data && (
              <div className="mt-4">
                <p className="text-sm text-muted-foreground mb-2">Response Data:</p>
                <pre className="bg-secondary p-4 rounded-lg overflow-x-auto text-xs">
                  {JSON.stringify(testResult.data, null, 2)}
                </pre>
              </div>
            )}
          </div>
        )}

        {/* Instructions */}
        <div className="mt-8 p-6 bg-secondary/30 border border-border rounded-lg">
          <h3 className="font-heading text-xl mb-3">Next Steps:</h3>
          <ol className="list-decimal list-inside space-y-2 text-muted-foreground">
            <li>
              Create a Storefront API access token in Shopify Admin (see{' '}
              <code className="bg-secondary px-1 rounded">SHOPIFY_SETUP.md</code>)
            </li>
            <li>
              Add the token to your <code className="bg-secondary px-1 rounded">.env</code> file as{' '}
              <code className="bg-secondary px-1 rounded">VITE_SHOPIFY_STOREFRONT_TOKEN</code>
            </li>
            <li>Restart your dev server</li>
            <li>Run the connection tests above</li>
            <li>If tests pass, products will load on your collection pages</li>
          </ol>
        </div>
      </div>
    </Layout>
  );
}
