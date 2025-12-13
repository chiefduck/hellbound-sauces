import { Layout } from '@/components/layout/Layout';
import { ChefHat, Clock, Users, Flame } from 'lucide-react';
import { SEOHead } from '@/components/seo';
import { Link } from 'react-router-dom';

// Placeholder recipes - to be populated with real recipes
const recipeCategories = [
  {
    name: 'Appetizers & Snacks',
    description: 'Spice up your starters',
    icon: ChefHat,
    recipes: [
      {
        title: 'Spicy Wings with Sweet Heat',
        description: 'Crispy chicken wings glazed with our Sweet Heat sauce for the perfect balance of sweet and spicy.',
        time: '45 min',
        servings: '4-6',
        difficulty: 'Easy',
        featured: true,
      },
      {
        title: 'Cucumber Madness Salsa',
        description: 'Fresh cucumber salsa featuring our unique Cucumber Madness sauce.',
        time: '15 min',
        servings: '6-8',
        difficulty: 'Easy',
      },
    ],
  },
  {
    name: 'Main Dishes',
    description: 'Bold flavors for your main course',
    icon: Flame,
    recipes: [
      {
        title: 'Pineapple-Mango Glazed Salmon',
        description: 'Grilled salmon with a tropical glaze made with our Pineapple-Mango sauce.',
        time: '30 min',
        servings: '4',
        difficulty: 'Medium',
        featured: true,
      },
      {
        title: 'Wide Awake Breakfast Tacos',
        description: 'Morning tacos with a kick featuring Wide Awake hot sauce.',
        time: '25 min',
        servings: '2-4',
        difficulty: 'Easy',
      },
    ],
  },
  {
    name: 'BBQ & Grilling',
    description: 'Fire up the grill',
    icon: Flame,
    recipes: [
      {
        title: 'Wildwood Maple Ribs',
        description: 'Fall-off-the-bone ribs rubbed with Wildwood Maple BBQ Rub.',
        time: '3 hours',
        servings: '4-6',
        difficulty: 'Medium',
        featured: true,
      },
      {
        title: "Beekeeper's Blend Brisket",
        description: 'Slow-smoked brisket with our honey-based Beekeepers Blend rub.',
        time: '8-10 hours',
        servings: '8-10',
        difficulty: 'Hard',
      },
    ],
  },
];

export default function RecipesPage() {
  return (
    <Layout>
      <SEOHead
        title="Recipes | Cooking with HellBound Sauces"
        description="Discover delicious recipes using HellBound Sauces hot sauces and BBQ rubs. From appetizers to main dishes, explore bold flavors that complement your cooking."
        canonical="/recipes"
      />
      {/* Hero */}
      <section className="py-20 lg:py-28 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-primary/10 via-transparent to-transparent" />
        <div className="container mx-auto px-4 lg:px-8 relative z-10 text-center">
          <ChefHat className="h-12 w-12 text-primary mx-auto mb-6" />
          <h1 className="font-display text-5xl lg:text-7xl mb-6">
            <span className="text-gradient-fire">Recipes</span>
          </h1>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Bold flavors deserve bold recipes. Discover delicious ways to cook with
            HellBound Sauces and take your meals to the next level.
          </p>
        </div>
      </section>

      {/* Coming Soon Notice */}
      <section className="py-12 bg-primary/5 border-y border-primary/20">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="max-w-3xl mx-auto text-center">
            <p className="text-lg">
              <span className="font-heading uppercase tracking-wide text-primary">Coming Soon:</span>{' '}
              <span className="text-muted-foreground">
                We're cooking up an amazing collection of recipes featuring our sauces and rubs.
                Check back soon for detailed recipes, cooking tips, and flavor pairings!
              </span>
            </p>
          </div>
        </div>
      </section>

      {/* Recipe Categories Preview */}
      <section className="py-16 lg:py-24">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="space-y-16">
            {recipeCategories.map((category, categoryIndex) => {
              const Icon = category.icon;
              return (
                <div key={category.name}>
                  <div className="flex items-center gap-3 mb-8">
                    <Icon className="h-8 w-8 text-primary" />
                    <div>
                      <h2 className="font-display text-3xl">{category.name}</h2>
                      <p className="text-muted-foreground">{category.description}</p>
                    </div>
                  </div>

                  <div className="grid md:grid-cols-2 gap-6">
                    {category.recipes.map((recipe, recipeIndex) => (
                      <div
                        key={recipeIndex}
                        className={`rounded-xl border border-border bg-card p-6 hover:border-primary/50 transition-all ${
                          recipe.featured ? 'lg:col-span-2' : ''
                        }`}
                      >
                        <div className="flex flex-wrap items-start justify-between gap-4 mb-4">
                          <div className="flex-1">
                            <h3 className="font-heading text-xl uppercase tracking-wide mb-2">
                              {recipe.title}
                            </h3>
                            <p className="text-muted-foreground">{recipe.description}</p>
                          </div>
                          {recipe.featured && (
                            <span className="px-3 py-1 rounded-full bg-primary/10 text-primary text-xs font-heading uppercase tracking-wider">
                              Featured
                            </span>
                          )}
                        </div>

                        <div className="flex flex-wrap gap-4 text-sm text-muted-foreground">
                          <div className="flex items-center gap-1">
                            <Clock className="h-4 w-4" />
                            <span>{recipe.time}</span>
                          </div>
                          <div className="flex items-center gap-1">
                            <Users className="h-4 w-4" />
                            <span>{recipe.servings}</span>
                          </div>
                          <div className="flex items-center gap-1">
                            <ChefHat className="h-4 w-4" />
                            <span>{recipe.difficulty}</span>
                          </div>
                        </div>

                        <div className="mt-4 pt-4 border-t border-border">
                          <span className="text-sm text-muted-foreground italic">
                            Full recipe coming soon...
                          </span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 lg:py-20 bg-charcoal">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="font-display text-4xl mb-6">Get Cooking</h2>
            <p className="text-lg text-muted-foreground mb-8">
              Stock up on HellBound Sauces and BBQ rubs to create amazing meals.
              Our bold flavors complement any dish.
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
