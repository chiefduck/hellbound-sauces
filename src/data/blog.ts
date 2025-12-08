export interface BlogPost {
  id: string;
  slug: string;
  title: string;
  excerpt: string;
  content: string;
  image: string;
  author: string;
  date: string;
  category: string;
  readTime: number;
  featured?: boolean;
  tags?: string[];
}

export const blogPosts: BlogPost[] = [
  {
    id: '1',
    slug: 'ultimate-guide-to-carolina-reapers',
    title: 'The Ultimate Guide to Carolina Reapers',
    excerpt: 'Everything you need to know about the world\'s hottest pepper and how we use it in our sauces.',
    content: `The Carolina Reaper has held the Guinness World Record for the world's hottest pepper since 2013, and for good reason. With an average Scoville Heat Unit (SHU) rating of 1,641,183 and peaks over 2.2 million SHU, this pepper isn't just hot—it's legendary.

## The Origin Story

The Carolina Reaper was created by Ed Currie of the PuckerButt Pepper Company in Fort Mill, South Carolina. It's a crossbreed between a Pakistani Naga pepper and a Red Habanero. What makes it unique isn't just its heat, but its distinctive scorpion-like tail and wrinkled, bumpy skin.

## What Makes It So Hot?

The secret lies in capsaicin concentration. Capsaicin is the chemical compound responsible for the burning sensation when you eat spicy food. The Reaper contains exceptionally high levels of capsaicin, particularly concentrated in its placental tissue—the white membrane that holds the seeds.

## Flavor Profile

Contrary to what you might expect, the Carolina Reaper actually has a pleasant fruity, almost sweet initial flavor. Many describe notes of cherry, chocolate, and even cinnamon. Of course, this sweetness is quickly followed by an intense, building heat that can last for 20 minutes or more.

## How We Use Reapers at Hellbound

At Hellbound Hot Sauce, we source our Carolina Reapers from certified organic farms in South Carolina. We ferment them for a minimum of 6 weeks to develop complex flavors that complement the heat. Our Devil's Tongue Reaper sauce showcases the pepper's natural fruitiness while delivering the extreme heat that thrill-seekers crave.

## Safety Tips

If you're brave enough to try a raw Reaper, here are some tips:
- Always wear gloves when handling
- Never touch your eyes or face
- Have dairy products nearby (milk, yogurt, or ice cream)
- Start with a tiny piece—a sliver of the tail is plenty for beginners
- Don't drink water—it spreads the capsaicin

## The Experience

Eating a Carolina Reaper is an experience unlike any other. The heat builds slowly over about 30 seconds, peaks intensely for several minutes, and then gradually subsides over 15-30 minutes. Many people experience hiccups, sweating, and an endorphin rush often described as a "runner's high."

Ready to experience the Reaper? Try our Devil's Tongue Reaper sauce—all the thrill with the artisan flavor Hellbound is known for.`,
    image: '/placeholder.svg',
    author: 'Chef Marcus',
    date: '2024-11-20',
    category: 'Pepper Guide',
    readTime: 8,
    featured: true,
    tags: ['carolina reaper', 'extreme heat', 'peppers', 'education'],
  },
  {
    id: '2',
    slug: 'perfect-bbq-brisket-guide',
    title: 'The Perfect BBQ Brisket: A Complete Guide',
    excerpt: 'Master the art of smoking brisket with our step-by-step guide and signature rub.',
    content: `Brisket is the king of BBQ, and mastering it is a rite of passage for any serious pitmaster. With our signature Hellbound BBQ rub and these techniques, you'll create competition-worthy results in your own backyard.

## Choosing Your Brisket

Start with a quality cut. Look for:
- **USDA Choice or Prime grade** - More marbling means more flavor
- **12-15 pounds** - Gives you a good ratio of flat to point
- **Good fat cap** - About 1/4 inch thick
- **Flexible meat** - Should bend easily when held

## The Prep Work

### Trimming
1. Remove the hard fat from the fat cap—it won't render
2. Square off the edges for even cooking
3. Remove the silver skin from the flat
4. Leave about 1/4 inch of fat cap for moisture

### Seasoning with Hellbound Signature Rub
Our Signature BBQ Rub is designed specifically for beef. Apply generously—about 1 tablespoon per pound. Let it sit uncovered in the refrigerator overnight for the salt to penetrate and form a pellicle.

## The Cook

### Temperature
- Smoker temp: 225-250°F
- Target internal temp: 195-205°F
- Plan for 1-1.5 hours per pound

### Wood Selection
Post oak is traditional for Texas-style brisket. Hickory and mesquite also work well but are stronger—use them sparingly.

### The Stall
Around 150-170°F internal temp, the brisket will "stall" as evaporative cooling takes over. You have two options:
1. **Wait it out** - Can add 2-4 hours but develops a better bark
2. **Texas Crutch** - Wrap in butcher paper or foil to push through

We recommend butcher paper—it speeds things up while still allowing bark formation.

## The Rest

This is crucial. Rest your brisket for at least 1 hour, ideally 2-4 hours. Wrap it in butcher paper, then towels, and place in a cooler. This allows the juices to redistribute and the collagen to set.

## Slicing

- Slice against the grain
- The grain changes direction between the flat and point
- About pencil-thickness slices for the flat
- Cubes or thicker slices for the point

## Our Secret: The Hellbound Finish

Just before serving, lightly brush slices with our Smoky Chipotle sauce thinned with a bit of beef broth. The chipotle adds depth without overwhelming the smoky beef flavor.

Master this technique and you'll be the legend of your neighborhood cookouts. Tag us @HellboundHS when you nail it!`,
    image: '/placeholder.svg',
    author: 'Pitmaster John',
    date: '2024-11-15',
    category: 'BBQ Tips',
    readTime: 12,
    featured: true,
    tags: ['brisket', 'bbq', 'smoking', 'recipe'],
  },
  {
    id: '3',
    slug: 'scoville-scale-explained',
    title: 'The Scoville Scale Explained',
    excerpt: 'Understanding heat levels and what makes peppers so hot.',
    content: `If you've ever wondered why some peppers make your eyes water while others barely register, the answer lies in the Scoville scale. This guide breaks down everything you need to know about measuring heat.

## What is the Scoville Scale?

The Scoville scale measures the pungency (spiciness) of chili peppers and other spicy foods. It was created in 1912 by American pharmacist Wilbur Scoville and is measured in Scoville Heat Units (SHU).

## How It Works

Originally, the test involved diluting pepper extract with sugar water until a panel of tasters could no longer detect heat. The number of dilutions needed became the SHU rating. Today, we use high-performance liquid chromatography (HPLC) for more accurate measurements.

## The Scale Breakdown

### 0-5,000 SHU: Mild
- Bell Pepper: 0 SHU
- Banana Pepper: 0-500 SHU
- Poblano: 1,000-2,000 SHU
- Anaheim: 500-2,500 SHU

### 5,000-50,000 SHU: Medium
- Jalapeño: 2,500-8,000 SHU
- Serrano: 10,000-25,000 SHU
- Cayenne: 30,000-50,000 SHU

### 50,000-350,000 SHU: Hot
- Tabasco: 30,000-50,000 SHU
- Thai Chili: 50,000-100,000 SHU
- Habanero: 100,000-350,000 SHU

### 350,000-1,000,000 SHU: Extra Hot
- Scotch Bonnet: 100,000-350,000 SHU
- Ghost Pepper (Bhut Jolokia): 855,000-1,041,427 SHU

### 1,000,000+ SHU: Extreme
- Trinidad Scorpion: 1,200,000-2,000,000 SHU
- Carolina Reaper: 1,400,000-2,200,000 SHU
- Pepper X: 2,693,000+ SHU

## What Causes the Heat?

Capsaicin is the compound responsible for the burning sensation. It binds to pain receptors in your mouth called TRPV1 receptors—the same ones that respond to actual heat. That's why spicy food literally feels "hot."

## Building Tolerance

Your capsaicin receptors can become desensitized with regular exposure. This is why spice lovers can handle more heat over time. The receptors never fully reset, so tolerance is relatively permanent (though it can decrease with abstinence).

## Finding Your Level

At Hellbound, we rate all our sauces on a 1-5 flame scale:
- 🔥 Mild: Everyday heat
- 🔥🔥 Medium: Noticeable kick
- 🔥🔥🔥 Hot: For heat seekers
- 🔥🔥🔥🔥 Extra Hot: Serious heat
- 🔥🔥🔥🔥🔥 Extreme: Enter at your own risk

Take our Heat Quiz on the Heat Guide page to find your perfect level!`,
    image: '/placeholder.svg',
    author: 'Dr. Spice',
    date: '2024-11-10',
    category: 'Education',
    readTime: 6,
    tags: ['scoville', 'education', 'peppers', 'heat levels'],
  },
  {
    id: '4',
    slug: 'hot-sauce-food-pairings',
    title: 'Hot Sauce Food Pairings: A Flavor Guide',
    excerpt: 'Learn which sauces pair best with different foods to elevate your meals.',
    content: `Hot sauce isn't one-size-fits-all. Different flavor profiles complement different dishes, and knowing which sauce to reach for can transform a good meal into an extraordinary one.

## The Art of Pairing

Just like wine pairing, hot sauce pairing considers acidity, sweetness, smoke, and heat. The goal is to enhance the dish, not overpower it.

## Breakfast Pairings

### Eggs
- **Scrambled/Fried**: Our Original Cayenne adds brightness without masking the egg flavor
- **Omelettes**: Smoky Chipotle complements cheese and vegetables
- **Huevos Rancheros**: Go bold with Hellfire Habanero

### Bacon & Sausage
Rich, fatty proteins can handle more heat. Try our medium-hot sauces to cut through the fat.

## Lunch Pairings

### Sandwiches & Burgers
- **Classic Burger**: Smoky Chipotle or Original Cayenne
- **Chicken Sandwich**: Hellfire Habanero for that Nashville hot vibe
- **BLT**: A few drops of mild sauce to brighten the mayo

### Tacos
Match the protein:
- **Carnitas**: Smoky, earthy sauces
- **Fish**: Citrus-forward mild sauces
- **Al Pastor**: Fruity hot sauces complement the pineapple

## Dinner Pairings

### Pizza
Hot sauce on pizza is controversial but delicious:
- **Pepperoni**: Cayenne-based sauces
- **Hawaiian**: Our Habanero's fruitiness works magic
- **Meat Lovers**: Go smoky

### Wings
This is where you can go all out. Match your sauce to the wing style:
- **Buffalo**: Classic cayenne
- **Dry Rub**: Pair with a dipping sauce on the side
- **BBQ**: Chipotle-based adds depth

### Steak
Yes, hot sauce on steak! A few drops of our mild sauce can enhance without overwhelming quality beef.

## Snacks

### Chips & Dips
Mix hot sauce into:
- Guacamole
- Ranch dressing
- Cream cheese

### Popcorn
Toss with melted butter and a tablespoon of your favorite sauce for addictive movie snacking.

## The Universal Rule

When in doubt, start with less. You can always add more hot sauce, but you can't take it away. And remember—the best pairing is the one you enjoy most!`,
    image: '/placeholder.svg',
    author: 'Chef Marcus',
    date: '2024-11-05',
    category: 'Food Pairing',
    readTime: 7,
    tags: ['pairing', 'recipes', 'tips', 'cooking'],
  },
  {
    id: '5',
    slug: 'fermentation-process',
    title: 'The Art of Fermentation in Hot Sauce',
    excerpt: 'How we ferment our peppers for months to develop complex flavors.',
    content: `At Hellbound, fermentation isn't just a process—it's our philosophy. While mass-produced hot sauces rely on vinegar and heat treatment, we take the slow road to develop flavors you simply can't get any other way.

## Why Ferment?

Fermentation transforms the raw heat of peppers into something more nuanced. The process:

1. **Develops complex flavors** - Natural sugars convert to acids, creating depth
2. **Mellows harsh heat** - Makes the burn more approachable
3. **Creates umami** - Adds savory richness
4. **Preserves naturally** - No artificial preservatives needed
5. **Increases nutrition** - Produces beneficial probiotics and vitamins

## Our Process

### Harvest
We source peppers at peak ripeness from partner farms. Timing matters—too early and you miss sugars; too late and you lose brightness.

### Preparation
Peppers are washed, stemmed, and roughly chopped. We keep the seeds and membranes—that's where the heat and flavor concentrate.

### The Mash
Peppers are ground with 2-3% sea salt by weight. Salt draws out moisture, creates brine, and controls bacterial growth. This mash goes into food-grade fermentation vessels.

### The Wait
Here's where patience pays off. Our sauces ferment for 4-6 weeks minimum, some for 6 months or more. During this time:

- Lactobacillus bacteria convert sugars to lactic acid
- pH drops, creating that characteristic tang
- Complex flavor compounds develop
- Colors deepen and intensify

We monitor pH, temperature, and taste throughout. Every batch is unique.

### Finishing
After fermentation, we blend with other ingredients—vinegar for stability, additional peppers for heat adjustment, spices for complexity. Then slow cooking melds everything together.

## Fermented vs. Cooked

Most commercial hot sauces are made by cooking peppers with vinegar. It's fast but sacrifices complexity. Compare:

**Cooked Sauce:**
- Bright, sharp acidity
- One-dimensional heat
- Shelf-stable quickly
- Consistent but flat flavor

**Fermented Sauce:**
- Rounded, complex acidity
- Layered, building heat
- Natural preservation
- Depth that keeps you coming back

## The Proof is in the Taste

Pick up any Hellbound sauce and you'll notice the difference immediately. That depth, that complexity, that "what is that delicious thing?"—that's fermentation at work.

It takes longer. It costs more. It's worth it.`,
    image: '/placeholder.svg',
    author: 'Chef Marcus',
    date: '2024-10-28',
    category: 'Behind the Scenes',
    readTime: 9,
    tags: ['fermentation', 'process', 'craft', 'education'],
  },
  {
    id: '6',
    slug: 'building-hot-sauce-tolerance',
    title: 'Building Your Spice Tolerance',
    excerpt: 'Tips for gradually increasing your heat tolerance and enjoying hotter sauces.',
    content: `Want to enjoy spicier foods but feel like your tolerance is stuck at "mild salsa"? Good news—spice tolerance is something you can absolutely build. Here's how to train your palate like a pro.

## Understanding Tolerance

When you eat capsaicin (the compound that makes peppers hot), it binds to TRPV1 receptors in your mouth. These are the same receptors that detect actual heat, which is why spicy food "burns."

With repeated exposure, these receptors become desensitized. They don't disappear—you just need more capsaicin to trigger the same response. This is why regular spice eaters can handle more heat.

## The Gradual Approach

### Week 1-2: Foundation
Start with foods that have subtle heat:
- Black pepper on everything
- Mild jarred salsa
- Banana peppers on sandwiches
- Our Mild sauces (1 flame rating)

### Week 3-4: Building
Increase frequency and intensity:
- Jalapeño slices on nachos
- Medium hot sauce on eggs
- Spicy Thai basil dishes
- Our Medium sauces (2 flame rating)

### Week 5-6: Pushing Boundaries
Start challenging yourself:
- Fresh serrano peppers in cooking
- Hot wings (not the hottest, but real heat)
- Indian or Thai "medium spicy"
- Our Hot sauces (3 flame rating)

### Week 7+: The Fun Zone
Now you're ready to explore:
- Habanero-based sauces
- Ghost pepper products (carefully!)
- "Spicy" options at restaurants
- Our Extra Hot sauces (4 flame rating)

## Pro Tips

### Eat Regularly
Tolerance builds with consistent exposure. Aim for something spicy at least once daily during your training phase.

### Don't Skip Meals
Spicy food on an empty stomach is more intense. Always have some food as a buffer.

### Embrace the Burn
Some discomfort is part of the process. If you're not sweating occasionally, you're not pushing enough.

### Know Your Limits
There's challenging yourself, and there's hurting yourself. Stop if you experience extreme discomfort, stomach pain, or prolonged burning.

### Recovery Foods
Keep these nearby:
- Milk or yogurt (casein binds to capsaicin)
- Bread or rice (absorbs oils)
- Sugar (can help in a pinch)
- NOT water (spreads the burn)

## The Benefits

Building spice tolerance isn't just about bragging rights:
- **Endorphin release** - Spicy food triggers feel-good chemicals
- **Flavor unlocked** - You'll taste nuances you missed before
- **Metabolic boost** - Capsaicin may increase metabolism
- **More menu options** - The world of food opens up

## Maintenance

Once you've built tolerance, maintain it with regular spicy meals. Skip spice for a few weeks and you'll notice some regression—though you'll rebuild faster the second time.

Ready to start your journey? Begin with our Smoky Chipotle sauce—approachable heat with incredible flavor to keep you motivated.`,
    image: '/placeholder.svg',
    author: 'Dr. Spice',
    date: '2024-10-20',
    category: 'Education',
    readTime: 5,
    tags: ['tolerance', 'tips', 'beginner', 'education'],
  },
  {
    id: '7',
    slug: 'history-of-hot-sauce',
    title: 'The Fiery History of Hot Sauce',
    excerpt: 'From ancient Aztecs to modern craft sauces—the story of humanity\'s love affair with heat.',
    content: `Hot sauce has been heating up meals for thousands of years. From ancient civilizations to today's craft hot sauce boom, the story of spicy condiments is as rich as the flavors themselves.

## Ancient Origins

### The Americas (7000 BCE)
Chili peppers were first cultivated in what is now Mexico around 7000 BCE. The Aztecs and Mayans created the earliest known hot sauces by grinding peppers with water—a simple but effective formula.

### Global Spread
When Columbus reached the Americas in 1492, he encountered chili peppers and brought them back to Europe. Within 50 years, peppers had spread along trade routes to Africa, India, and Asia.

## The Birth of Bottled Hot Sauce

### 1807: First Commercial Hot Sauce
A Massachusetts farmer began selling bottled cayenne sauce, making it the first commercially available hot sauce in America.

### 1868: Tabasco
Edmund McIlhenny created Tabasco sauce in Louisiana, establishing what would become the most iconic American hot sauce brand. The original recipe remains largely unchanged today.

### Early 1900s: Regional Styles Emerge
- **Louisiana**: Cayenne-vinegar sauces (Crystal, Louisiana Hot Sauce)
- **Mexico**: Diverse regional salsas
- **Caribbean**: Scotch bonnet and habanero bases
- **Asia**: Sriracha, sambal, gochujang

## The Craft Revolution

### 2000s-2010s: Small Batch Explosion
The farm-to-table movement extended to condiments. Small producers began creating artisan sauces with unique ingredients and careful fermentation.

### Hot Ones Effect
The YouTube show "Hot Ones" (launched 2015) brought craft hot sauce to mainstream attention. Suddenly, everyone wanted to try the sauces that made celebrities cry.

### Today: Golden Age of Hot Sauce
We're living in the best time ever for hot sauce lovers:
- Thousands of craft producers worldwide
- Every heat level imaginable
- Innovative ingredients (fruits, chocolate, coffee)
- Fermentation renaissance
- Direct-to-consumer access

## Hellbound's Place in History

We founded Hellbound in Austin, Texas in 2019, joining a proud tradition of Texas sauce makers. Our focus on fermentation connects us to ancient practices while our flavor innovation pushes the art form forward.

Every bottle we make continues a story that spans 9,000 years. That's the history you're tasting with every drop.`,
    image: '/placeholder.svg',
    author: 'Chef Marcus',
    date: '2024-10-12',
    category: 'Behind the Scenes',
    readTime: 7,
    tags: ['history', 'culture', 'education'],
  },
  {
    id: '8',
    slug: 'growing-peppers-at-home',
    title: 'Growing Hot Peppers at Home: A Beginner\'s Guide',
    excerpt: 'Start your own pepper garden with these expert tips for growing everything from jalapeños to reapers.',
    content: `Growing your own peppers is one of the most rewarding hobbies for hot sauce enthusiasts. Fresh peppers have flavors that dried or processed peppers simply can't match. Here's how to get started.

## Choosing Your Peppers

### For Beginners
- **Jalapeño**: Reliable, productive, versatile
- **Cayenne**: Easy to grow, great for drying
- **Serrano**: Similar to jalapeño but hotter
- **Poblano**: Large, mild, perfect for stuffing

### Intermediate
- **Habanero**: Needs longer growing season
- **Thai Chili**: Compact plants, prolific producers
- **Ghost Pepper**: Challenging but rewarding

### Advanced
- **Carolina Reaper**: 120+ day growing season
- **Trinidad Scorpion**: Similar requirements to Reaper
- **7 Pot varieties**: Need consistent conditions

## Getting Started

### Seeds vs. Transplants
Transplants are easier for beginners. If starting from seed:
- Begin 8-10 weeks before last frost
- Use seed-starting mix
- Keep soil at 80-85°F for germination
- Superhots may take 2-4 weeks to sprout

### Soil Requirements
- Well-draining soil is essential
- pH between 6.0-6.8
- Add compost for nutrients
- Avoid over-fertilizing (leads to leaves, not fruit)

### Light Needs
- Full sun: 6-8 hours minimum
- South-facing location is ideal
- Supplement with grow lights if needed

## Growing Season Care

### Watering
- Consistent moisture, not soggy
- Water deeply but less frequently
- Mulch to retain moisture
- Reduce watering when fruits ripen (concentrates heat)

### Fertilizing
- Balanced fertilizer at planting
- Switch to low-nitrogen once flowering begins
- Too much nitrogen = bushy plants, few peppers

### Common Problems
- **Blossom drop**: Usually heat stress; provide afternoon shade
- **Pests**: Aphids love peppers; use insecticidal soap
- **Disease**: Avoid overhead watering to prevent fungal issues

## Harvesting

### When to Pick
- Jalapeños: Green or red (sweeter when red)
- Habaneros: Orange, yellow, or red depending on variety
- Superhots: Wait for full color and slight wrinkling

### How to Harvest
- Use scissors or pruners
- Don't pull—you can damage the plant
- Wear gloves for hot varieties!

## Preserving Your Harvest

- **Fresh**: Refrigerate for 1-2 weeks
- **Frozen**: Freeze whole or chopped
- **Dried**: Dehydrate or air dry in warm, dry conditions
- **Fermented**: Make your own hot sauce!

Growing your own peppers connects you to the source of everything we do at Hellbound. There's nothing quite like sauce made from peppers you grew yourself.`,
    image: '/placeholder.svg',
    author: 'Garden Team',
    date: '2024-10-05',
    category: 'Tips & Tricks',
    readTime: 10,
    tags: ['gardening', 'peppers', 'diy', 'growing'],
  },
];

export const getBlogPostBySlug = (slug: string): BlogPost | undefined => {
  return blogPosts.find(p => p.slug === slug);
};

export const getFeaturedPosts = (): BlogPost[] => {
  return blogPosts.filter(p => p.featured);
};

export const getPostsByCategory = (category: string): BlogPost[] => {
  return blogPosts.filter(p => p.category === category);
};

export const getCategories = (): string[] => {
  return [...new Set(blogPosts.map(p => p.category))];
};

export const getRecentPosts = (limit: number = 3): BlogPost[] => {
  return [...blogPosts].sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()).slice(0, limit);
};

export const getAllTags = (): string[] => {
  const tags = blogPosts.flatMap(p => p.tags || []);
  return [...new Set(tags)];
};
