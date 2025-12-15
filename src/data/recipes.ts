export interface Recipe {
  id: string;
  title: string;
  description: string;
  image: string;
  category: 'appetizers' | 'main-dishes' | 'bbq-grilling' | 'breakfast' | 'sides';
  time: string;
  servings: string;
  difficulty: 'Easy' | 'Medium' | 'Hard';
  featured?: boolean;
  ingredients: string[];
  instructions: {
    step: number;
    title: string;
    details: string[];
  }[];
  hellboundProduct?: string; // The hot sauce or rub featured in the recipe
  pairingSuggestions?: {
    wine?: string;
    sides?: string;
  };
}

export const recipes: Recipe[] = [
  {
    id: 'sapphire-dragon-spicy-coconut-shrimp',
    title: 'Sapphire Dragon Spicy Coconut Shrimp',
    description: 'Create a tantalizing shrimp dish that perfectly complements the unique flavors of Hellbound Sauces\' Sapphire Dragon Hot Sauce. This recipe combines the sweetness of blueberries and coconut with the fiery kick of Dragons\' Breath peppers, resulting in a dish that\'s both bold and delicious.',
    image: '/assets/recipes/sapphire-dragon-spicy-coconut-shrimp.webp',
    category: 'main-dishes',
    time: '20 min',
    servings: '4',
    difficulty: 'Easy',
    featured: true,
    hellboundProduct: 'Sapphire Dragon Hot Sauce',
    ingredients: [
      '1 lb large shrimp, peeled and deveined',
      '2 tablespoons coconut oil',
      '1/2 cup fresh blueberries',
      '1/4 cup unsweetened shredded coconut',
      '1/4 cup coconut cream',
      '2 tablespoons Hellbound Sauces\' Sapphire Dragon Hot Sauce',
      '1 tablespoon agave syrup',
      '1 tablespoon fresh lime juice',
      '1 teaspoon lime zest',
      '2 cloves garlic, minced',
      '1/2 teaspoon salt',
      '1/4 teaspoon black pepper',
      'Fresh cilantro leaves for garnish',
      'Cooked jasmine rice, for serving',
    ],
    instructions: [
      {
        step: 1,
        title: 'Prepare the Blueberry Coconut Sauce',
        details: [
          'In a blender, combine fresh blueberries, coconut cream, Hellbound Sauces\' Sapphire Dragon Hot Sauce, agave syrup, lime juice, lime zest, and minced garlic.',
          'Blend until smooth.',
        ],
      },
      {
        step: 2,
        title: 'Cook the Shrimp',
        details: [
          'In a large skillet, heat coconut oil over medium heat.',
          'Season the shrimp with salt and black pepper.',
          'Add the shrimp to the skillet and cook for 2-3 minutes on each side, or until they turn pink and opaque.',
        ],
      },
      {
        step: 3,
        title: 'Combine and Serve',
        details: [
          'Reduce the heat to low and pour the blueberry coconut sauce over the cooked shrimp.',
          'Stir to coat the shrimp evenly and simmer for an additional 2 minutes to heat the sauce through.',
          'Remove from heat and stir in the shredded coconut.',
          'Serve the spicy coconut shrimp over a bed of jasmine rice.',
          'Garnish with fresh cilantro leaves.',
        ],
      },
    ],
  },
  {
    id: 'blazin-bee-mustard-glazed-lamb-chops',
    title: 'Blazin Bee Mustard-Glazed Lamb Chops',
    description: 'Indulge in these mouthwatering Blazin Bee Mustard-Glazed Lamb Chops — a bold and fiery twist on a classic dish. Featuring HellBound Sauces\' Blazin Bee Mustard, this lamb recipe delivers layers of sweet honey, smoky paprika, aromatic rosemary, and the intense heat of peach ghost pepper puree. Perfectly grilled to medium-rare and finished with a sticky, golden glaze, these chops are ideal for backyard BBQs, summer dinner parties, or gourmet weeknight meals.',
    image: '/assets/recipes/blazin-bee-mustard-glazed-lamb-chops.webp',
    category: 'bbq-grilling',
    time: '35 min',
    servings: '4',
    difficulty: 'Medium',
    featured: true,
    hellboundProduct: 'Blazin Bee Mustard',
    ingredients: [
      '8 lamb chops, about 1-inch thick',
      '2 tablespoons olive oil',
      '3 teaspoon kosher salt',
      '1 teaspoon freshly ground black pepper',
      '2 teaspoon garlic powder',
      '2 teaspoon smoked paprika',
      '4 tablespoons HellBound Sauces\' Blazin Bee Mustard',
      '1 tablespoon honey',
      '1 tablespoon apple cider vinegar',
      '1 teaspoon fresh rosemary, finely chopped',
      '3 teaspoon Worcestershire sauce',
      '1 teaspoon lemon zest',
    ],
    instructions: [
      {
        step: 1,
        title: 'Prepare the Lamb Chops',
        details: [
          'Pat the lamb chops dry with paper towels.',
          'In a small bowl, mix together olive oil, kosher salt, black pepper, garlic powder, and smoked paprika.',
          'Rub this mixture evenly over both sides of the lamb chops.',
        ],
      },
      {
        step: 2,
        title: 'Make the Blazin Bee Mustard Glaze',
        details: [
          'In another bowl, whisk together HellBound Sauces\' Blazin Bee Mustard, honey, apple cider vinegar, chopped rosemary, Worcestershire sauce, and lemon zest until well combined.',
        ],
      },
      {
        step: 3,
        title: 'Grill the Lamb Chops',
        details: [
          'Preheat your grill to medium-high heat.',
          'Place the lamb chops on the grill and cook for about 3-4 minutes on each side for medium-rare, or until they reach your desired level of doneness.',
          'During the last minute of grilling on each side, brush the Blazin Bee Mustard Glaze generously over the chops.',
        ],
      },
      {
        step: 4,
        title: 'Rest and Serve',
        details: [
          'Remove the lamb chops from the grill and let them rest for 5 minutes to allow the juices to redistribute.',
          'Serve with your favorite sides, such as roasted vegetables or a fresh salad, and drizzle any remaining glaze over the top.',
        ],
      },
    ],
    pairingSuggestions: {
      wine: 'A medium-bodied red wine like a Syrah or Zinfandel complements the spicy sweetness of the glaze and the richness of the lamb.',
      sides: 'Grilled asparagus, garlic mashed potatoes, or a quinoa salad with dried fruits and nuts would balance the flavors beautifully.',
    },
  },
  {
    id: 'bangkok-burn-thai-bbq-chicken-skewers',
    title: 'Bangkok Burn Thai BBQ Chicken Skewers',
    description: 'Turn up the heat with these bold and flavorful Bangkok Burn Thai BBQ Chicken Skewers, made with the fiery kick of HellBound Sauces\' Bangkok Burn hot sauce. This Thai-inspired grilled chicken recipe is layered with sweet, tangy, spicy, and umami-rich flavors thanks to a marinade packed with rice wine vinegar, calamansi juice, tamarind paste, fish sauce, ginger, and kaffir lime. Sweet, smoky, citrusy, and spicy—just like a Bangkok night market.',
    image: '/assets/recipes/bangkok-burn-thai-bbq-chicken-skewers.webp',
    category: 'bbq-grilling',
    time: '2 hours 20 min (includes marinating)',
    servings: '4',
    difficulty: 'Medium',
    featured: true,
    hellboundProduct: 'Bangkok Burn',
    ingredients: [
      '4 tbsp HellBound Bangkok Burn hot sauce',
      '2 tbsp rice wine vinegar',
      '1 tbsp agave',
      '2 tbsp calamansi juice (or substitute with a mix of lime and orange juice)',
      '2 tsp fish sauce',
      '1 tbsp tamari soy sauce',
      '1 tsp tamarind paste',
      '2 tbsp palm sugar (grated or dissolved)',
      '2 cloves garlic, minced',
      '1 tsp ginger, grated',
      '1 shallot, finely minced',
      '1 tbsp sesame oil',
      '1/4 tsp dried kaffir lime leaves, crushed',
      '1 tbsp cilantro, finely chopped',
      '1.5 lbs chicken thighs, boneless and skinless, cut into 1.5-inch chunks',
      'Extra cilantro, chopped (for garnish)',
      'Thin-sliced Thai chilis (optional)',
      'Lime wedges',
      'Crushed peanuts or toasted sesame seeds (optional)',
    ],
    instructions: [
      {
        step: 1,
        title: 'Make the Marinade',
        details: [
          'In a mixing bowl, combine all marinade ingredients.',
          'Whisk until smooth.',
          'Taste and adjust the balance—sweet, sour, salty, and spicy should all be hitting hard but harmonized.',
        ],
      },
      {
        step: 2,
        title: 'Marinate the Chicken',
        details: [
          'Add chicken chunks to the marinade. Toss to coat.',
          'Cover and refrigerate for at least 2 hours, ideally overnight.',
        ],
      },
      {
        step: 3,
        title: 'Skewer & Grill',
        details: [
          'Thread the marinated chicken onto soaked bamboo or metal skewers.',
          'Grill over medium-high heat (or broil) for 4–5 minutes per side, until nicely charred and cooked through.',
        ],
      },
      {
        step: 4,
        title: 'Optional Glaze',
        details: [
          'Mix 1 tbsp Bangkok Burn with 1 tsp agave and brush onto the chicken during the last minute of grilling for extra heat.',
        ],
      },
      {
        step: 5,
        title: 'Serve',
        details: [
          'Plate over jasmine rice or sticky rice.',
          'Garnish with cilantro, lime wedges, and optional toppings.',
        ],
      },
    ],
    pairingSuggestions: {
      sides: 'Pair with a quick Thai cucumber salad (cukes, vinegar, sugar, chili, sesame) or grilled pineapple for that cool-down balance.',
    },
  },
  {
    id: 'beekeepers-blend-smoked-honey-brisket',
    title: 'BeeKeepers Blend Smoked Honey Brisket',
    description: 'Smoked Brisket Recipe with Sweet & Smoky Honey Dry Rub — Perfectly tender brisket smoked low and slow using HellBound Sauces Beekeeper\'s Blend. This honey-based BBQ rub forms a deep golden crust packed with flavor. Ideal for backyard smokers and BBQ competitions.',
    image: '/assets/recipes/beekeepers-blend-smoked-honey-brisket.webp',
    category: 'bbq-grilling',
    time: '10-12 hours',
    servings: '10-12',
    difficulty: 'Hard',
    featured: true,
    hellboundProduct: 'Beekeeper\'s Blend',
    ingredients: [
      '10–14 lb whole packer brisket (point + flat)',
      '1/2 cup Beekeeper\'s Blend dry rub (by HellBound Sauces)',
      '4 tbsp yellow mustard or olive oil (binder)',
      '1/2 cup apple cider vinegar or apple juice (for spritzing)',
      'Butcher paper or foil for wrapping',
      'Optional: honey drizzle or glaze (for finishing)',
      'Fresh herbs for garnish (optional)',
    ],
    instructions: [
      {
        step: 1,
        title: 'Trim & Prep',
        details: [
          'Trim excess fat from the brisket, leaving about 1/4" of fat cap.',
          'Remove silver skin.',
          'Rub with mustard or oil as a binder.',
        ],
      },
      {
        step: 2,
        title: 'Generous Rubdown',
        details: [
          'Liberally apply Beekeeper\'s Blend on all sides, ensuring full and even coverage.',
          'Let sit for 24 hours (for best results).',
        ],
      },
      {
        step: 3,
        title: 'Smoke It Slow',
        details: [
          'Preheat smoker to 225–250°F.',
          'Place brisket fat-side down (or up, depending on smoker style).',
          'Smoke uncovered for 6–8 hours, spritzing with apple cider vinegar every 60–90 mins to keep moist and help bark develop.',
        ],
      },
      {
        step: 4,
        title: 'Wrap & Finish',
        details: [
          'Once internal temp reaches ~165°F and bark is well-set, wrap brisket in butcher paper or foil.',
          'Continue cooking until internal temp hits 200–205°F and it feels soft like butter when probed.',
        ],
      },
      {
        step: 5,
        title: 'Rest is Key',
        details: [
          'Rest wrapped brisket in a cooler or warming box for 1–2 hours before slicing.',
        ],
      },
      {
        step: 6,
        title: 'Optional Glaze',
        details: [
          'Lightly brush with warmed honey before slicing to highlight the rub\'s natural sweetness.',
        ],
      },
      {
        step: 7,
        title: 'Slice & Serve',
        details: [
          'Slice against the grain and serve with BBQ sides like slaw, cornbread, and pickles.',
        ],
      },
    ],
  },
  {
    id: 'sweet-heat-spicy-breakfast-scramble',
    title: 'Sweet Heat Spicy Breakfast Scramble',
    description: 'Start your day with a bold twist. This fiery yet sweet breakfast scramble is loaded with vibrant flavors that balance heat and sweetness in every bite. Featuring perfectly cooked eggs, sautéed veggies, and a kick of spice from our signature HellBound sauce, it\'s the ultimate way to wake up your taste buds and power through the morning.',
    image: '/assets/recipes/sweet-heat-spicy-breakfast-scramble.webp',
    category: 'breakfast',
    time: '15 min',
    servings: '2',
    difficulty: 'Easy',
    hellboundProduct: 'Sweet Heat',
    ingredients: [
      '4 large eggs',
      '2 tbsp milk (or plant-based alternative)',
      '1 tbsp butter or olive oil',
      '1/2 cup diced bell peppers (red & yellow)',
      '1/2 cup chopped onions',
      '1/2 cup cooked breakfast sausage or plant-based alternative',
      '1 tbsp smoked paprika',
      '1/2 cup Hellhound Sauces Sweet Heat',
      '1/2 cup shredded cheddar cheese (or dairy-free alternative)',
      '2 tbsp fresh cilantro, chopped',
      'Salt & pepper to taste',
    ],
    instructions: [
      {
        step: 1,
        title: 'Whisk Eggs',
        details: [
          'In a bowl, whisk eggs with milk, salt, and pepper. Set aside.',
        ],
      },
      {
        step: 2,
        title: 'Sauté Veggies',
        details: [
          'Heat butter or oil in a pan over medium heat.',
          'Add onions and bell peppers, cooking until soft (about 3 minutes).',
        ],
      },
      {
        step: 3,
        title: 'Cook Protein',
        details: [
          'Add sausage (or plant-based alternative) and smoked paprika.',
          'Stir until heated through.',
        ],
      },
      {
        step: 4,
        title: 'Scramble It',
        details: [
          'Pour in the egg mixture, letting it set slightly before gently stirring.',
        ],
      },
      {
        step: 5,
        title: 'Add the Heat',
        details: [
          'Drizzle Hellhound Sauces Sweet Heat over the eggs and mix in.',
        ],
      },
      {
        step: 6,
        title: 'Melt Cheese',
        details: [
          'Sprinkle shredded cheese over the scramble and let it melt.',
        ],
      },
      {
        step: 7,
        title: 'Garnish & Serve',
        details: [
          'Remove from heat, top with fresh cilantro, and enjoy!',
        ],
      },
    ],
    pairingSuggestions: {
      sides: 'Pair with toasted sourdough or avocado slices for extra flavor.',
    },
  },
  {
    id: 'spicy-pineapple-mango-glazed-salmon',
    title: 'Spicy Pineapple Mango Glazed Salmon',
    description: 'Indulge in the perfect balance of sweet, spicy, and savory flavors with this Hellbound Pineapple Mango Salmon recipe. Featuring the fiery kick of Hellbound Sauces Pineapple-Mango Hot Sauce, this baked salmon dish is paired with the umami richness of soy sauce and miso paste. This quick, healthy, and flavor-packed recipe is ideal for weeknight dinners or when you want to impress your guests.',
    image: '/assets/recipes/spicy-pineapple-mango-glazed-salmon.webp',
    category: 'main-dishes',
    time: '1 hour (includes marinating)',
    servings: '4',
    difficulty: 'Easy',
    hellboundProduct: 'Pineapple-Mango Hot Sauce',
    ingredients: [
      '4 salmon fillets (skin-on or skinless, ~6 oz each)',
      '1/4 cup Hellbound Pineapple-Mango Hot Sauce',
      '2 tbsp soy sauce (low sodium recommended)',
      '2 tbsp white miso paste',
      '2 tbsp honey or maple syrup',
      '1 tbsp fresh lime juice',
      '1 tbsp sesame oil or olive oil',
      '2 cloves garlic, minced',
      '1 tsp grated ginger',
      'Salt and pepper to taste',
      'Optional garnish: Chopped cilantro, sesame seeds, lime wedges',
    ],
    instructions: [
      {
        step: 1,
        title: 'Prepare the Marinade',
        details: [
          'In a medium bowl, whisk together the Hellbound Pineapple-Mango Hot Sauce, soy sauce, miso paste, honey, lime juice, sesame oil, garlic, and ginger.',
          'Mix until smooth.',
        ],
      },
      {
        step: 2,
        title: 'Marinate the Salmon',
        details: [
          'Pat the salmon fillets dry with a paper towel and season lightly with salt and pepper.',
          'Place the salmon in a resealable plastic bag or shallow dish.',
          'Pour the marinade over the salmon, ensuring each fillet is evenly coated.',
          'Cover and refrigerate for 30 minutes to 1 hour.',
        ],
      },
      {
        step: 3,
        title: 'Preheat and Prep',
        details: [
          'Preheat your oven to 375°F (190°C).',
          'Line a baking sheet with parchment paper or foil for easy cleanup.',
          'Remove the salmon from the marinade and place it on the prepared baking sheet, skin-side down.',
          'Reserve the leftover marinade.',
        ],
      },
      {
        step: 4,
        title: 'Bake the Salmon',
        details: [
          'Brush the salmon with a bit of the reserved marinade.',
          'Bake for 12-15 minutes, or until the salmon flakes easily with a fork.',
          'Optional: Broil on high for 1-2 minutes for a caramelized finish.',
        ],
      },
      {
        step: 5,
        title: 'Serve and Garnish',
        details: [
          'Transfer the baked salmon to plates and drizzle with any remaining sauce (heated for safety).',
          'Garnish with chopped cilantro, sesame seeds, and lime wedges for an extra burst of flavor.',
        ],
      },
    ],
    pairingSuggestions: {
      sides: 'Serve with steamed jasmine rice, quinoa, or roasted vegetables to complete your meal.',
    },
  },
  {
    id: 'spicy-honey-glazed-chicken-with-wide-awake',
    title: 'Spicy Honey Glazed Chicken with Wide Awake',
    description: 'Elevate your chicken game with this irresistible Spicy Honey Glazed Chicken, featuring Hellbound Sauces\' Wide Awake Hot Sauce. This recipe blends the perfect amount of heat, sweetness, and tanginess, making it a standout dish for any occasion. The marinade, made with honey, soy sauce, garlic, and the bold flavors of Wide Awake Hot Sauce, infuses the chicken with intense flavor.',
    image: '/assets/recipes/spicy-honey-glazed-chicken-with-wide-awake.webp',
    category: 'main-dishes',
    time: '1 hour 30 min (includes marinating)',
    servings: '4',
    difficulty: 'Easy',
    hellboundProduct: 'Wide Awake Hot Sauce',
    ingredients: [
      '1/4 cup Hellbound Sauces\' Wide Awake Hot Sauce',
      '2 tablespoons honey',
      '2 tablespoons soy sauce (Tamari for a Gluten Free Option)',
      '1 tablespoon olive oil',
      '1 clove garlic, minced',
      '1 pound chicken thighs or wings',
      'Salt and pepper to taste',
      'Sesame seeds and chopped green onions (for garnish, optional)',
    ],
    instructions: [
      {
        step: 1,
        title: 'Prepare the Marinade',
        details: [
          'In a small bowl, mix Wide Awake Hot Sauce, honey, soy sauce or tamari, olive oil, and minced garlic.',
          'Stir until well combined.',
        ],
      },
      {
        step: 2,
        title: 'Marinate the Chicken',
        details: [
          'Place the chicken in a large zip-top bag or shallow dish.',
          'Pour the marinade over the chicken, ensuring all pieces are evenly coated.',
          'Cover and refrigerate for at least 1 hour, or overnight for more intense flavor.',
        ],
      },
      {
        step: 3,
        title: 'Cook the Chicken',
        details: [
          'Grill Option: Preheat your grill to medium heat. Grill the chicken for 5-7 minutes per side, brushing with leftover marinade during the cooking process.',
          'Oven Option: Preheat your oven to 400°F (200°C). Place the chicken on a lined baking sheet and bake for 25-30 minutes, flipping halfway through.',
        ],
      },
      {
        step: 4,
        title: 'Serve and Garnish',
        details: [
          'Once cooked, transfer the chicken to a serving plate.',
          'Sprinkle with sesame seeds and chopped green onions for a finishing touch.',
          'Serve hot and enjoy!',
        ],
      },
    ],
  },
  {
    id: 'cucumber-madness-fiery-summer-salad',
    title: 'Cucumber Madness Fiery Summer Salad',
    description: 'Summer is here, and so is the perfect time to spice up your fresh, crisp salads. Introducing the Cucumber Madness Fiery Summer Salad, a dish that combines cooling cucumbers with the bold, fiery kick of Hellbound Sauces. This salad is easy to make, packed with fresh flavors, and guaranteed to light up your taste buds.',
    image: '/assets/recipes/cucumber-madness-fiery-summer-salad.webp',
    category: 'sides',
    time: '15 min',
    servings: '4-6',
    difficulty: 'Easy',
    hellboundProduct: 'Cucumber Madness',
    ingredients: [
      '2 large cucumbers, thinly sliced',
      '1 cup cherry tomatoes, halved',
      '1 small red onion, thinly sliced',
      '1/4 cup fresh cilantro, chopped',
      '1/4 cup fresh mint leaves, torn',
      '1/2 cup feta cheese, crumbled (optional)',
      '2 tbsp Cucumber Madness',
      '1 tbsp lime juice',
      '2 tbsp rice vinegar',
      '1 tbsp honey or agave',
      '1 tsp sesame oil',
      '1 clove garlic, minced',
      'Salt and pepper to taste',
    ],
    instructions: [
      {
        step: 1,
        title: 'Prepare the Vegetables',
        details: [
          'Wash and thinly slice the cucumbers and red onion.',
          'Halve the cherry tomatoes and toss all the vegetables together in a large salad bowl.',
          'Add the chopped cilantro and torn mint leaves for a fresh, aromatic base.',
        ],
      },
      {
        step: 2,
        title: 'Make the Dressing',
        details: [
          'In a small bowl or jar, whisk together Cucumber Madness, lime juice, rice vinegar, honey or agave, sesame oil, and minced garlic.',
          'Season with a pinch of salt and pepper, adjusting the heat level with more Cucumber Madness Sauce if desired.',
        ],
      },
      {
        step: 3,
        title: 'Toss and Serve',
        details: [
          'Pour the dressing over the salad and toss to coat evenly.',
          'Top with crumbled feta cheese if desired.',
          'Serve immediately and enjoy!',
        ],
      },
    ],
  },
  {
    id: 'fiery-leprechaun-lava-tacos',
    title: 'Fiery Leprechaun Lava Tacos',
    description: 'Looking to spice up your taco night? These Fiery Leprechaun Lava Tacos bring bold flavors, vibrant colors, and a kick of heat with the unique magic of Hellbound Sauces\' Leprechaun Lava Hot Sauce. Whether you\'re a fan of fiery food or just love trying creative recipes, this dish is guaranteed to satisfy your taste buds.',
    image: '/assets/recipes/fiery-leprechaun-lava-tacos.webp',
    category: 'main-dishes',
    time: '30 min',
    servings: '4',
    difficulty: 'Easy',
    hellboundProduct: 'Leprechaun Lava Hot Sauce',
    ingredients: [
      '1 lb boneless chicken thighs or shrimp (vegetarian alternatives: portobello mushrooms or firm tofu)',
      '2 tbsp olive oil',
      '1/3 cup Aztec Gold BBQ Rub from HellBound Sauces',
      '1/2 tsp sea salt',
      '1/4 cup Hellbound Sauces Leprechaun Lava Hot Sauce',
      '2 cups shredded red cabbage',
      '1 cup shredded carrots',
      '1/4 cup fresh cilantro, chopped',
      '4 tbsp fresh lime juice',
      '2 tbsp olive oil',
      '2 tbsp raw agave syrup',
      'Pinch of sea salt',
      '8 small corn or flour tortillas',
      '1 ripe avocado, sliced',
      '1/2 cup crumbled queso fresco or cotija cheese',
      'Extra Leprechaun Lava Hot Sauce (for heat lovers)',
      'Edible glitter (optional)',
    ],
    instructions: [
      {
        step: 1,
        title: 'Prepare the Protein',
        details: [
          'In a large mixing bowl, add Aztec Gold BBQ Rub and salt to taste.',
          'Add your chosen protein: chicken, shrimp, mushrooms, or tofu. Toss until evenly coated.',
          'Heat a large skillet over medium-high heat. Cook the protein, stirring occasionally, until fully cooked and slightly caramelized (6-8 minutes for chicken or shrimp, 4-6 minutes for mushrooms or tofu).',
          'Remove from heat and toss the cooked protein in Hellbound Sauces Leprechaun Lava Hot Sauce to infuse it with spicy, tangy, and sweet notes.',
        ],
      },
      {
        step: 2,
        title: 'Make the Slaw',
        details: [
          'In a medium bowl, combine shredded red cabbage, carrots, and fresh cilantro.',
          'In a small bowl, whisk together lime juice, olive oil, agave syrup, and a pinch of sea salt.',
          'Drizzle the dressing over the slaw and toss to combine.',
        ],
      },
      {
        step: 3,
        title: 'Warm the Tortillas',
        details: [
          'Heat the tortillas in a dry skillet over medium heat for 30 seconds on each side, or wrap them in foil and warm in a 350°F oven for 5 minutes.',
        ],
      },
      {
        step: 4,
        title: 'Assemble the Tacos',
        details: [
          'Lay each tortilla flat and start with a scoop of the vibrant slaw.',
          'Add your spicy, sauce-coated protein on top of the slaw.',
          'Garnish with slices of creamy avocado and a sprinkle of crumbled queso fresco or cotija cheese.',
        ],
      },
      {
        step: 5,
        title: 'Add the Magical Finish',
        details: [
          'Drizzle extra Leprechaun Lava Hot Sauce over the tacos for an extra burst of heat.',
          'For a whimsical touch, sprinkle edible glitter on top to give your tacos a magical, shimmering appearance.',
        ],
      },
      {
        step: 6,
        title: 'Serve and Enjoy',
        details: [
          'Serve these fiery tacos immediately with your favorite sides, such as Mexican rice, refried beans, or a zesty margarita.',
        ],
      },
    ],
  },
  {
    id: 'hellbound-garlic-reaper-glazed-pork-tenderloin',
    title: 'HellBound Garlic Reaper Glazed Pork Tenderloin',
    description: 'A bold, flavorful pork tenderloin glazed with HellBound\'s Garlic Reaper sauce, creating a perfect balance of heat, sweetness, and smokiness. ***WARNING SPICY***',
    image: '/assets/recipes/hellbound-garlic-reaper-glazed-pork-tenderloin.webp',
    category: 'main-dishes',
    time: '1 hour',
    servings: '4-6',
    difficulty: 'Medium',
    hellboundProduct: 'Garlic Reaper',
    ingredients: [
      '1 pork tenderloin (1.5 lbs)',
      '1/2 cup HellBound Garlic Reaper sauce',
      '1 tbsp olive oil',
      '1 medium onion, sliced',
      '1 small red bell pepper, sliced',
      '2 shallots, minced',
      '4 garlic cloves, minced',
      '1/2 cup carrots, julienned',
      '1/4 cup fresh cilantro, chopped (for garnish)',
      '1 tsp sea salt',
      '1 tbsp black pepper',
      '1 tbsp ground cumin',
      '2 tbsp maple syrup',
      '1 tbsp agave syrup',
      'Juice of 1 lime',
    ],
    instructions: [
      {
        step: 1,
        title: 'Preheat oven',
        details: [
          'Preheat your oven to 375°F (190°C).',
        ],
      },
      {
        step: 2,
        title: 'Season the pork',
        details: [
          'Rub the pork tenderloin with sea salt, black pepper, and ground cumin.',
          'Let it sit for 10-15 minutes to absorb the flavors.',
        ],
      },
      {
        step: 3,
        title: 'Sear the pork',
        details: [
          'Heat 1 tbsp of olive oil in a large ovenproof skillet over medium-high heat.',
          'Sear the pork on all sides for about 3-4 minutes per side until browned.',
        ],
      },
      {
        step: 4,
        title: 'Prepare the vegetable base',
        details: [
          'In the same skillet, sauté onions, bell peppers, shallots, garlic, and carrots for 5-6 minutes until softened and fragrant.',
        ],
      },
      {
        step: 5,
        title: 'Apply the glaze',
        details: [
          'In a small bowl, mix 1/2 cup HellBound Garlic Reaper sauce with 1 tbsp maple syrup and 1 tbsp agave syrup.',
          'Brush half of the glaze over the pork tenderloin.',
        ],
      },
      {
        step: 6,
        title: 'Roast the pork',
        details: [
          'Transfer the skillet to the oven and roast for 20-25 minutes, or until the internal temperature of the pork reaches 145°F (63°C).',
          'Halfway through roasting, brush the remaining glaze over the pork for a caramelized finish.',
        ],
      },
      {
        step: 7,
        title: 'Rest and slice',
        details: [
          'Once cooked, remove the pork from the oven and let it rest for 5-10 minutes before slicing.',
        ],
      },
      {
        step: 8,
        title: 'Serve',
        details: [
          'Plate the sliced pork over the sautéed vegetables and drizzle with any remaining sauce from the pan.',
          'Garnish with fresh cilantro and a squeeze of lime juice.',
        ],
      },
    ],
  },
  {
    id: 'aztec-gold-fire-grilled-chicken-thighs',
    title: 'Aztec Gold Fire-Grilled Chicken Thighs',
    description: 'Bold. Earthy. Legendary. These fire-grilled chicken thighs get a rich, smoky kick from HellBound Sauces\' Aztec Gold Rub—a deep blend of chili peppers, cumin, roasted garlic, and citrusy lime crystals. A nod to ancient Mesoamerican flavors, this easy BBQ recipe is perfect for weeknight grilling or weekend feasts.',
    image: '/assets/recipes/aztec-gold-fire-grilled-chicken-thighs.webp',
    category: 'bbq-grilling',
    time: '2-4 hours (includes marinating)',
    servings: '4-6',
    difficulty: 'Easy',
    hellboundProduct: 'Aztec Gold Rub',
    ingredients: [
      '2 lbs bone-in, skin-on chicken thighs',
      '1/4 cup HellBound Sauces Aztec Gold Rub',
      '2 tbsp olive oil',
      'Juice of 1 lime',
      '1 tbsp honey (optional for caramelization)',
      'Chopped fresh cilantro (for garnish)',
      'Lime wedges (for serving)',
    ],
    instructions: [
      {
        step: 1,
        title: 'Prep the Chicken',
        details: [
          'Pat chicken thighs dry with paper towels.',
          'In a bowl, toss them with olive oil, lime juice, and Aztec Gold Rub until fully coated.',
          'For extra flavor, marinate 2–4 hours (or overnight).',
        ],
      },
      {
        step: 2,
        title: 'Grill Time',
        details: [
          'Preheat grill to medium-high heat (about 400°F).',
          'Grill chicken thighs skin-side down for 5–6 minutes until crispy and charred.',
          'Flip and cook for another 6–8 minutes or until internal temperature reaches 165°F.',
        ],
      },
      {
        step: 3,
        title: 'Caramelize (Optional)',
        details: [
          'For a touch of sweet heat, brush with honey during the last 2 minutes of grilling.',
        ],
      },
      {
        step: 4,
        title: 'Serve',
        details: [
          'Remove from heat, rest for 5 minutes.',
          'Garnish with chopped cilantro and serve with lime wedges.',
          'Pairs perfectly with grilled corn, black beans, or a spicy slaw.',
        ],
      },
    ],
  },
  {
    id: 'wildwood-maple-glazed-bbq-ribs',
    title: 'Wildwood Maple-Glazed BBQ Ribs',
    description: 'Wildwood Maple-Glazed BBQ Ribs are slow-smoked, fall-off-the-bone pork ribs coated in HellBound Sauces\' bold maple rub. Finished with a sticky glaze and kissed by the grill, they deliver deep smoky-sweet flavor with a spicy maple kick—perfect for cookouts, BBQ lovers, and fans of handcrafted rubs.',
    image: '/assets/recipes/wildwood-maple-glazed-bbq-ribs.webp',
    category: 'bbq-grilling',
    time: '5-6 hours',
    servings: '4-6',
    difficulty: 'Hard',
    featured: true,
    hellboundProduct: 'Wildwood Maple Rub',
    ingredients: [
      '2 racks of St. Louis-style pork ribs',
      '3 tbsp olive oil',
      '1/4 cup HellBound Wildwood Maple Rub (generously applied)',
      '1/2 cup apple juice (for moisture during grilling)',
      '1/2 cup ketchup',
      '1/3 cup pure maple syrup',
      '1/3 cup Brown Sugar',
      '2 tbsp apple cider vinegar',
      '4 tbsp HellBound Wildwood Maple Rub',
      '3 tbsp Worcestershire sauce',
      'Optional: splash of bourbon for extra edge',
    ],
    instructions: [
      {
        step: 1,
        title: 'Prep the Ribs',
        details: [
          'Remove the silver skin from the back of the ribs.',
          'Rub ribs lightly with olive oil.',
          'Generously apply Wildwood Maple Rub to all sides.',
          'Let rest for at least 1 hour (or overnight for deep flavor).',
        ],
      },
      {
        step: 2,
        title: 'Grill \'Em or Smoke\'Em Low & Slow',
        details: [
          'Preheat your grill or smoker to 250°F.',
          'Set up for indirect heat. Add soaked wood chips (hickory or applewood) for smoke.',
          'Place ribs on the grill bone-side down.',
          'Spritz with apple juice every 45 minutes to keep moist.',
          'Smoke for 3 hours.',
        ],
      },
      {
        step: 3,
        title: 'Wrap & Tenderize',
        details: [
          'Wrap ribs tightly in foil. Add a splash of apple juice inside the foil.',
          'Return to grill for 2 hours.',
        ],
      },
      {
        step: 4,
        title: 'Glaze & Finish',
        details: [
          'While ribs are cooking, combine glaze ingredients in a saucepan and simmer until thickened (about 10 min).',
          'Unwrap ribs and brush generously with glaze.',
          'Grill uncovered over medium heat for 20–30 minutes, basting occasionally until caramelized.',
        ],
      },
    ],
    pairingSuggestions: {
      sides: 'Serve with roasted corn on the cob, coleslaw with a vinegar kick, and a cold beer or bourbon cocktail.',
    },
  },
];

export function getRecipeById(id: string): Recipe | undefined {
  return recipes.find((recipe) => recipe.id === id);
}

export function getRecipesByCategory(category: Recipe['category']): Recipe[] {
  return recipes.filter((recipe) => recipe.category === category);
}

export function getFeaturedRecipes(): Recipe[] {
  return recipes.filter((recipe) => recipe.featured);
}
