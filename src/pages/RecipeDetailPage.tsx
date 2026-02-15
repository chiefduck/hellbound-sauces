import { useParams, Link, Navigate } from 'react-router-dom';
import { Layout } from '@/components/layout/Layout';
import { SEOHead } from '@/components/seo';
import { getRecipeById, Recipe } from '@/data/recipes';
import { Clock, Users, ChefHat, ArrowLeft, Flame } from 'lucide-react';
import { useState, useEffect } from 'react';
import { getBlogArticleByHandle, ShopifyBlogArticle } from '@/lib/shopifyBlogs';

// Map recipe product names to product handles (actual Shopify handles)
const PRODUCT_HANDLE_MAP: Record<string, string> = {
  // Hot Sauces
  'Sweet Heat': 'sweet-heat-hot-sauce',
  'Cucumber Madness': 'series-1-cucumber-madness',
  'Pineapple-Mango Hot Sauce': 'pineapple-mango-hot-sauce',
  'Wide Awake Hot Sauce': 'wide-awake',
  'Leprechaun Lava Hot Sauce': 'leprechaun-lava',
  'Clove Keeper': 'series-2-clove-keeper',
  'Sapphire Dragon Hot Sauce': 'series-3-sapphire-dragon',
  'Blazin Bee Mustard': 'series-3-blazin-bee-mustard',
  'Bangkok Burn': 'series-3-bangkok-burn',
  // BBQ Rubs (need to confirm these handles)
  "Beekeeper's Blend": 'beekeepers-blend',
  'Aztec Gold Rub': 'aztec-gold',
  'Wildwood Maple Rub': 'wildwood-maple',
};

const getProductHandle = (productName: string): string | null => {
  return PRODUCT_HANDLE_MAP[productName] || null;
};

export default function RecipeDetailPage() {
  const { id } = useParams<{ id: string }>();
  const [recipe, setRecipe] = useState<Recipe | undefined>(undefined);
  const [loading, setLoading] = useState(true);
  const [notFound, setNotFound] = useState(false);

  useEffect(() => {
    async function loadRecipe() {
      if (!id) {
        setNotFound(true);
        setLoading(false);
        return;
      }

      // First, try to get recipe from static data
      const staticRecipe = getRecipeById(id);

      if (staticRecipe) {
        setRecipe(staticRecipe);
        setLoading(false);
        return;
      }

      // If not found in static data, try fetching from Shopify
      try {
        const blogArticle = await getBlogArticleByHandle('recipes', id);
        if (blogArticle) {
          // Convert blog article to recipe format (simplified version)
          const shopifyRecipe: Recipe = {
            id: blogArticle.handle,
            title: blogArticle.title,
            description: blogArticle.excerpt || '',
            image: blogArticle.image?.url || '/assets/recipes/default-recipe.webp',
            category: 'main-dishes',
            time: '30 min',
            servings: '4',
            difficulty: 'Medium',
            ingredients: [],
            instructions: [],
          };
          setRecipe(shopifyRecipe);
        } else {
          setNotFound(true);
        }
      } catch (error) {
        console.error('Error fetching recipe from Shopify:', error);
        setNotFound(true);
      } finally {
        setLoading(false);
      }
    }

    loadRecipe();
  }, [id]);

  if (loading) {
    return (
      <Layout>
        <div className="container mx-auto px-4 py-16 text-center">
          <p className="text-muted-foreground">Loading recipe...</p>
        </div>
      </Layout>
    );
  }

  if (notFound || !recipe) {
    return <Navigate to="/recipes" replace />;
  }

  return (
    <Layout>
      <SEOHead
        title={`${recipe.title} | HellBound Sauces Recipes`}
        description={recipe.description}
        canonical={`/recipes/${recipe.id}`}
      />

      {/* Hero Section */}
      <section className="py-12 lg:py-16 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-primary/10 via-transparent to-transparent" />
        <div className="container mx-auto px-4 lg:px-8 relative z-10">
          {/* Back Button */}
          <Link
            to="/recipes"
            className="inline-flex items-center gap-2 text-muted-foreground hover:text-primary transition-colors mb-6"
          >
            <ArrowLeft className="h-4 w-4" />
            Back to All Recipes
          </Link>

          <div className="grid lg:grid-cols-2 gap-8 lg:gap-12 items-start">
            {/* Recipe Image */}
            <div className="rounded-2xl overflow-hidden shadow-2xl">
              <img
                src={recipe.image}
                alt={recipe.title}
                className="w-full h-auto object-cover"
              />
            </div>

            {/* Recipe Info */}
            <div>
              {recipe.featured && (
                <span className="inline-block px-3 py-1 rounded-full bg-primary/10 text-primary text-xs font-heading uppercase tracking-wider mb-4">
                  Featured Recipe
                </span>
              )}
              <h1 className="font-display text-4xl lg:text-5xl mb-4">
                {recipe.title}
              </h1>
              <p className="text-lg text-muted-foreground mb-6">
                {recipe.description}
              </p>

              {/* Recipe Meta */}
              <div className="flex flex-wrap gap-6 mb-6 pb-6 border-b border-border">
                <div className="flex items-center gap-2">
                  <Clock className="h-5 w-5 text-primary" />
                  <div>
                    <p className="text-xs text-muted-foreground">Prep + Cook Time</p>
                    <p className="font-medium">{recipe.time}</p>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <Users className="h-5 w-5 text-primary" />
                  <div>
                    <p className="text-xs text-muted-foreground">Servings</p>
                    <p className="font-medium">{recipe.servings}</p>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <ChefHat className="h-5 w-5 text-primary" />
                  <div>
                    <p className="text-xs text-muted-foreground">Difficulty</p>
                    <p className="font-medium">{recipe.difficulty}</p>
                  </div>
                </div>
              </div>

              {/* Hellbound Product */}
              {recipe.hellboundProduct && (() => {
                const productHandle = getProductHandle(recipe.hellboundProduct);
                const content = (
                  <div className="bg-primary/5 border border-primary/20 rounded-lg p-4 mb-6 transition-colors hover:bg-primary/10">
                    <div className="flex items-center gap-2 mb-2">
                      <Flame className="h-5 w-5 text-primary" />
                      <p className="font-heading uppercase tracking-wide text-sm">
                        Featured Product
                      </p>
                    </div>
                    <p className="text-lg font-medium">{recipe.hellboundProduct}</p>
                  </div>
                );

                return productHandle ? (
                  <Link to={`/products/${productHandle}`}>
                    {content}
                  </Link>
                ) : content;
              })()}
            </div>
          </div>
        </div>
      </section>

      {/* Ingredients & Instructions */}
      <section className="py-12 lg:py-16">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="grid lg:grid-cols-3 gap-8 lg:gap-12">
            {/* Ingredients */}
            <div className="lg:col-span-1">
              <div className="sticky top-8">
                <h2 className="font-display text-3xl mb-6">Ingredients</h2>
                <div className="bg-card border border-border rounded-xl p-6">
                  <ul className="space-y-3">
                    {recipe.ingredients.map((ingredient, index) => (
                      <li key={index} className="flex items-start gap-3">
                        <span className="text-primary mt-1">•</span>
                        <span className="flex-1">{ingredient}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>

            {/* Instructions */}
            <div className="lg:col-span-2">
              <h2 className="font-display text-3xl mb-6">Instructions</h2>
              <div className="space-y-6">
                {recipe.instructions.map((instruction) => (
                  <div
                    key={instruction.step}
                    className="bg-card border border-border rounded-xl p-6"
                  >
                    <div className="flex items-start gap-4">
                      <div className="flex-shrink-0 w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
                        <span className="font-heading text-primary font-bold">
                          {instruction.step}
                        </span>
                      </div>
                      <div className="flex-1">
                        <h3 className="font-heading text-xl uppercase tracking-wide mb-3">
                          {instruction.title}
                        </h3>
                        <ul className="space-y-2">
                          {instruction.details.map((detail, index) => (
                            <li key={index} className="text-muted-foreground">
                              {detail}
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Pairing Suggestions */}
      {recipe.pairingSuggestions && (
        <section className="py-12 lg:py-16 bg-charcoal">
          <div className="container mx-auto px-4 lg:px-8">
            <h2 className="font-display text-3xl mb-6 text-center">
              Pairing Suggestions
            </h2>
            <div className="grid md:grid-cols-2 gap-6 max-w-4xl mx-auto">
              {recipe.pairingSuggestions.wine && (
                <div className="bg-card border border-border rounded-xl p-6">
                  <h3 className="font-heading text-lg uppercase tracking-wide mb-3 text-primary">
                    Wine Pairing
                  </h3>
                  <p className="text-muted-foreground">
                    {recipe.pairingSuggestions.wine}
                  </p>
                </div>
              )}
              {recipe.pairingSuggestions.sides && (
                <div className="bg-card border border-border rounded-xl p-6">
                  <h3 className="font-heading text-lg uppercase tracking-wide mb-3 text-primary">
                    Recommended Sides
                  </h3>
                  <p className="text-muted-foreground">
                    {recipe.pairingSuggestions.sides}
                  </p>
                </div>
              )}
            </div>
          </div>
        </section>
      )}

      {/* CTA */}
      <section className="py-16 lg:py-20">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="font-display text-4xl mb-6">Ready to Cook?</h2>
            <p className="text-lg text-muted-foreground mb-8">
              Get the HellBound Sauces products you need to make this recipe.
            </p>
            <Link
              to="/collections/all"
              className="inline-flex items-center justify-center px-8 h-12 rounded-lg bg-gradient-fire hover:opacity-90 font-heading tracking-wide transition-all"
            >
              Shop All Products
            </Link>
          </div>
        </div>
      </section>
    </Layout>
  );
}
