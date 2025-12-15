import { Layout } from '@/components/layout/Layout';
import { ChefHat, Clock, Users, Flame, Utensils, Egg, Salad, ArrowRight } from 'lucide-react';
import { SEOHead } from '@/components/seo';
import { Link } from 'react-router-dom';
import { recipes, getRecipesByCategory, getFeaturedRecipes } from '@/data/recipes';
import { useState } from 'react';

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
  const featuredRecipes = getFeaturedRecipes();
  const totalRecipes = recipes.length;

  const getFilteredRecipes = () => {
    if (selectedCategory === 'all') return recipes;
    return getRecipesByCategory(selectedCategory as any);
  };

  const filteredRecipes = getFilteredRecipes();

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
            Explore {totalRecipes} bold recipes featuring HellBound Sauces
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
          {filteredRecipes.length === 0 ? (
            <div className="text-center py-16">
              <ChefHat className="h-16 w-16 text-muted-foreground/30 mx-auto mb-4" />
              <p className="text-lg text-muted-foreground">No recipes found in this category</p>
            </div>
          ) : (
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredRecipes.map((recipe) => (
                <Link
                  key={recipe.id}
                  to={`/recipes/${recipe.id}`}
                  className="group rounded-xl border border-border bg-card overflow-hidden hover:border-primary/50 hover:shadow-xl transition-all block"
                >
                  {/* Recipe Image */}
                  <div className="aspect-[4/3] overflow-hidden bg-muted relative">
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
                  <div className="p-5">
                    <h3 className="font-heading text-lg mb-2 group-hover:text-primary transition-colors line-clamp-2">
                      {recipe.title}
                    </h3>

                    {/* Recipe Meta */}
                    <div className="flex items-center gap-4 text-xs text-muted-foreground mb-3">
                      <div className="flex items-center gap-1">
                        <Clock className="h-3.5 w-3.5" />
                        <span>{recipe.time}</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <Users className="h-3.5 w-3.5" />
                        <span>{recipe.servings}</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <ChefHat className="h-3.5 w-3.5" />
                        <span>{recipe.difficulty}</span>
                      </div>
                    </div>

                    {/* Hellbound Product */}
                    {recipe.hellboundProduct && (
                      <div className="flex items-center gap-1.5 text-xs text-primary font-medium mb-3">
                        <Flame className="h-3.5 w-3.5" />
                        <span>{recipe.hellboundProduct}</span>
                      </div>
                    )}

                    {/* View Recipe Link */}
                    <div className="flex items-center gap-1 text-sm font-medium text-primary group-hover:gap-2 transition-all">
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
