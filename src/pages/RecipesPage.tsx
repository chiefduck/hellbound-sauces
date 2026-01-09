import { Layout } from '@/components/layout/Layout';
import { ChefHat, Clock, Users, Flame, Utensils, Egg, Salad, ArrowRight } from 'lucide-react';
import { SEOHead } from '@/components/seo';
import { Link } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { getBlogArticlesByTag, ShopifyBlogArticle } from '@/lib/shopifyBlogs';

interface Recipe {
  id: string;
  title: string;
  image: string;
  category: 'appetizers' | 'main-dishes' | 'bbq-grilling' | 'breakfast' | 'sides' | string;
  time: string;
  servings: string;
  difficulty: 'Easy' | 'Medium' | 'Hard';
  featured?: boolean;
  hellboundProduct?: string;
  handle: string;
  blogHandle: string;
}

// Helper function to strip HTML tags from text
function stripHtml(html: string): string {
  return html.replace(/<[^>]*>/g, '').trim();
}

// Helper function to extract recipe metadata from blog article
function parseRecipeMetadata(content: string, tags: string[]): Partial<Recipe> {
  const metadata: Partial<Recipe> = {};

  // Extract category from tags
  const categoryTags = ['appetizers', 'main-dishes', 'bbq-grilling', 'breakfast', 'sides'];
  const foundCategory = tags.find(tag => categoryTags.includes(tag.toLowerCase()));
  metadata.category = foundCategory || 'main-dishes';

  // Extract time
  const timeMatch = content.match(/(?:Time|Prep Time|Cook Time):\s*([^\n]+)/i);
  if (timeMatch) {
    metadata.time = stripHtml(timeMatch[1].trim());
  } else {
    // Try to find patterns like "30 min" or "2 hours"
    const timePattern = content.match(/(\d+\s*(?:min|minutes|hour|hours|hr|hrs))/i);
    metadata.time = timePattern ? stripHtml(timePattern[1]) : '30 min';
  }

  // Extract servings
  const servingsMatch = content.match(/Servings?:\s*([^\n]+)/i);
  metadata.servings = servingsMatch ? stripHtml(servingsMatch[1].trim()) : '4';

  // Extract difficulty
  const difficultyMatch = content.match(/Difficulty:\s*(Easy|Medium|Hard)/i);
  if (difficultyMatch) {
    metadata.difficulty = difficultyMatch[1] as 'Easy' | 'Medium' | 'Hard';
  } else {
    metadata.difficulty = 'Medium';
  }

  // Check if featured
  metadata.featured = tags.some(tag => tag.toLowerCase() === 'featured');

  // Extract Hellbound product
  const productMatch = content.match(/(?:Product|Hellbound Product|Featured Product):\s*([^\n]+)/i);
  if (productMatch) {
    metadata.hellboundProduct = stripHtml(productMatch[1].trim());
  } else {
    // Try to find Hellbound sauce mentions in content
    const saucePattern = content.match(/(?:Hellbound|HellBound)\s+(?:Sauces?\s+)?([^.,\n]+(?:Sauce|Rub|Mustard))/i);
    if (saucePattern) {
      metadata.hellboundProduct = stripHtml(saucePattern[1].trim());
    }
  }

  return metadata;
}

// Convert Shopify blog article to Recipe format
function blogArticleToRecipe(article: ShopifyBlogArticle): Recipe {
  const metadata = parseRecipeMetadata(article.content, article.tags);

  return {
    id: article.handle,
    title: stripHtml(article.title),
    image: article.image?.url || '/assets/recipes/default-recipe.webp',
    category: metadata.category || 'main-dishes',
    time: stripHtml(metadata.time || '30 min'),
    servings: stripHtml(metadata.servings || '4'),
    difficulty: metadata.difficulty || 'Medium',
    featured: metadata.featured,
    hellboundProduct: metadata.hellboundProduct ? stripHtml(metadata.hellboundProduct) : undefined,
    handle: article.handle,
    blogHandle: article.blog.handle,
  };
}

const recipeCategories = [
  {
    name: 'BBQ & Grilling',
    description: 'Fire up the grill',
    icon: Flame,
    category: 'bbq-grilling' as const,
  },
  {
    name: 'Main Dishes',
    description: 'Bold flavors for your main course',
    icon: Utensils,
    category: 'main-dishes' as const,
  },
  {
    name: 'Breakfast',
    description: 'Start your day with heat',
    icon: Egg,
    category: 'breakfast' as const,
  },
  {
    name: 'Sides & Salads',
    description: 'Perfect accompaniments',
    icon: Salad,
    category: 'sides' as const,
  },
];

export default function RecipesPage() {
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [recipes, setRecipes] = useState<Recipe[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchRecipes() {
      try {
        setLoading(true);
        // Fetch blog articles tagged with "Recipes" from the "recipes" blog
        const articles = await getBlogArticlesByTag('recipes', 'Recipes');
        console.log('Recipes found:', articles.length);
        if (articles.length === 0) {
          console.log('No recipes found - check that blog posts are published and tagged with "Recipes"');
        }
        const recipesData = articles.map(blogArticleToRecipe);
        setRecipes(recipesData);
      } catch (error) {
        console.error('Error fetching recipes from Shopify:', error);
      } finally {
        setLoading(false);
      }
    }

    fetchRecipes();
  }, []);

  const getFilteredRecipes = () => {
    if (selectedCategory === 'all') return recipes;
    return recipes.filter(recipe => recipe.category === selectedCategory);
  };

  const getRecipesByCategory = (category: string) => {
    return recipes.filter(recipe => recipe.category === category);
  };

  const filteredRecipes = getFilteredRecipes();
  const totalRecipes = recipes.length;

  return (
    <Layout>
      <SEOHead
        title="Recipes | Cooking with HellBound Sauces"
        description="Discover delicious recipes using HellBound Sauces hot sauces and BBQ rubs. From appetizers to main dishes, explore bold flavors that complement your cooking."
        canonical="/recipes"
      />

      {/* Hero */}
      <section className="py-12 sm:py-16 lg:py-20">
        <div className="container mx-auto px-4 lg:px-8 text-center max-w-4xl">
          <h1 className="font-display text-3xl sm:text-4xl lg:text-6xl mb-3 sm:mb-4">
            <span className="text-gradient-fire">Recipes</span>
          </h1>
          <p className="text-base sm:text-lg text-muted-foreground">
            {loading ? 'Loading recipes...' : `Explore ${totalRecipes} bold recipes featuring HellBound Sauces`}
          </p>
        </div>
      </section>

      {/* Category Filter */}
      <section className="border-y border-border bg-card/50">
        <div className="container mx-auto px-4 lg:px-8 py-4 sm:py-6">
          <div className="flex items-center justify-center gap-2 flex-wrap">
            <button
              onClick={() => setSelectedCategory('all')}
              className={`px-3 sm:px-4 py-2 rounded-lg font-medium text-xs sm:text-sm transition-all ${
                selectedCategory === 'all'
                  ? 'bg-primary text-primary-foreground'
                  : 'bg-background border border-border hover:border-primary/50'
              }`}
            >
              All
            </button>
            {recipeCategories.map((category) => {
              const Icon = category.icon;
              const count = getRecipesByCategory(category.category).length;
              return (
                <button
                  key={category.category}
                  onClick={() => setSelectedCategory(category.category)}
                  className={`inline-flex items-center gap-1.5 sm:gap-2 px-3 sm:px-4 py-2 rounded-lg font-medium text-xs sm:text-sm transition-all ${
                    selectedCategory === category.category
                      ? 'bg-primary text-primary-foreground'
                      : 'bg-background border border-border hover:border-primary/50'
                  }`}
                >
                  <Icon className="h-3.5 w-3.5 sm:h-4 sm:w-4" />
                  <span className="hidden xs:inline">{category.name}</span>
                  <span className="xs:hidden">{category.name.split(' ')[0]}</span>
                  <span className="opacity-60">({count})</span>
                </button>
              );
            })}
          </div>
        </div>
      </section>

      {/* Recipes Grid */}
      <section className="py-12 lg:py-16">
        <div className="container mx-auto px-4 lg:px-8">
          {loading ? (
            <div className="text-center py-16">
              <p className="text-muted-foreground">Loading recipes...</p>
            </div>
          ) : filteredRecipes.length === 0 ? (
            <div className="text-center py-16">
              <ChefHat className="h-16 w-16 text-muted-foreground/30 mx-auto mb-4" />
              <p className="text-lg text-muted-foreground">No recipes found in this category</p>
            </div>
          ) : (
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredRecipes.map((recipe) => (
                <Link
                  key={recipe.id}
                  to={`/recipes/${recipe.handle}`}
                  className="group rounded-xl border border-border bg-card overflow-hidden hover:border-primary/50 hover:shadow-xl transition-all flex flex-col"
                >
                  {/* Recipe Image */}
                  <div className="aspect-[4/3] overflow-hidden bg-muted relative flex-shrink-0">
                    <img
                      src={recipe.image}
                      alt={recipe.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                    {recipe.featured && (
                      <span className="absolute top-3 right-3 px-2.5 py-1 rounded-full bg-primary text-white text-xs font-heading uppercase tracking-wider">
                        Featured
                      </span>
                    )}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/0 to-black/0 opacity-0 group-hover:opacity-100 transition-opacity" />
                  </div>

                  {/* Recipe Content */}
                  <div className="p-5 flex flex-col flex-1 min-h-[160px] max-h-[200px]">
                    <h3 className="font-heading text-lg mb-2 group-hover:text-primary transition-colors line-clamp-2 min-h-[3.5rem]">
                      {recipe.title}
                    </h3>

                    {/* Recipe Meta */}
                    <div className="flex items-center gap-4 text-xs text-muted-foreground mb-3">
                      <div className="flex items-center gap-1">
                        <Clock className="h-3.5 w-3.5 flex-shrink-0" />
                        <span className="truncate">{recipe.time}</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <Users className="h-3.5 w-3.5 flex-shrink-0" />
                        <span className="truncate">{recipe.servings}</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <ChefHat className="h-3.5 w-3.5 flex-shrink-0" />
                        <span className="truncate">{recipe.difficulty}</span>
                      </div>
                    </div>

                    {/* Hellbound Product */}
                    {recipe.hellboundProduct && (
                      <div className="flex items-center gap-1.5 text-xs text-primary font-medium mb-3">
                        <Flame className="h-3.5 w-3.5 flex-shrink-0" />
                        <span className="truncate">{recipe.hellboundProduct}</span>
                      </div>
                    )}

                    {/* View Recipe Link */}
                    <div className="flex items-center gap-1 text-sm font-medium text-primary group-hover:gap-2 transition-all mt-auto">
                      <span>View Recipe</span>
                      <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 lg:py-20 bg-muted/30">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="max-w-2xl mx-auto text-center">
            <h2 className="font-display text-3xl lg:text-4xl mb-4">
              Ready to Cook?
            </h2>
            <p className="text-muted-foreground mb-8">
              Get the HellBound Sauces products featured in these recipes
            </p>
            <Link
              to="/collections/all"
              className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-lg bg-gradient-fire hover:opacity-90 font-heading tracking-wide transition-all"
            >
              Shop All Products
              <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </div>
      </section>
    </Layout>
  );
}
