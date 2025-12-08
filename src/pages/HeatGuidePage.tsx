import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Layout } from '@/components/layout/Layout';
import { Flame, ChevronRight, Thermometer, Beaker, Award, AlertTriangle, CheckCircle, ArrowRight } from 'lucide-react';
import { products } from '@/data/products';
import { ProductCard } from '@/components/product/ProductCard';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';

const heatLevels = [
  {
    level: 1,
    name: 'Mild',
    scoville: '0-5,000 SHU',
    color: 'bg-green-500',
    borderColor: 'border-green-500',
    textColor: 'text-green-500',
    description: 'Perfect for everyday use. A gentle warmth that enhances flavor without overwhelming. Great for those new to hot sauce or who prefer subtle heat.',
    peppers: ['Poblano', 'Anaheim', 'Banana Pepper', 'Pimento'],
    bestFor: ['Eggs', 'Sandwiches', 'Salads', 'Pizza'],
    sensation: 'Slight tingle on the tongue',
  },
  {
    level: 2,
    name: 'Medium',
    scoville: '5,000-50,000 SHU',
    color: 'bg-yellow-500',
    borderColor: 'border-yellow-500',
    textColor: 'text-yellow-500',
    description: 'A noticeable kick that adds excitement without overpowering. Great for those building their heat tolerance.',
    peppers: ['Jalapeño', 'Serrano', 'Chipotle', 'Fresno'],
    bestFor: ['Tacos', 'Wings', 'Burgers', 'Stir-fry'],
    sensation: 'Warming heat that builds',
  },
  {
    level: 3,
    name: 'Hot',
    scoville: '50,000-350,000 SHU',
    color: 'bg-orange-500',
    borderColor: 'border-orange-500',
    textColor: 'text-orange-500',
    description: 'For dedicated heat seekers. Intense but still allows flavor appreciation. You\'ll feel this one.',
    peppers: ['Cayenne', 'Tabasco', 'Habanero', 'Bird\'s Eye'],
    bestFor: ['Curry', 'Chili', 'Hot Wings', 'Jerk Chicken'],
    sensation: 'Significant heat with some sweating',
  },
  {
    level: 4,
    name: 'Extra Hot',
    scoville: '350,000-1,000,000 SHU',
    color: 'bg-red-500',
    borderColor: 'border-red-500',
    textColor: 'text-red-500',
    description: 'Serious heat warning. Not for the faint of heart. Endorphin rush guaranteed. Use sparingly.',
    peppers: ['Ghost Pepper', 'Scotch Bonnet', '7 Pot', 'Naga Viper'],
    bestFor: ['Extreme wings', 'Challenges', 'Marinades (diluted)'],
    sensation: 'Intense burning, possible hiccups',
  },
  {
    level: 5,
    name: 'Extreme',
    scoville: '1,000,000+ SHU',
    color: 'bg-red-700',
    borderColor: 'border-red-700',
    textColor: 'text-red-700',
    description: 'Enter at your own risk. The world\'s hottest peppers. Legendary heat levels for true capsaicin warriors.',
    peppers: ['Carolina Reaper', 'Trinidad Scorpion', 'Pepper X', 'Dragon\'s Breath'],
    bestFor: ['Extreme challenges', 'Bragging rights', 'Tiny drops in large dishes'],
    sensation: 'Overwhelming heat, endorphin explosion',
  },
];

// Heat Quiz Component
interface QuizQuestion {
  id: string;
  question: string;
  options: { value: string; label: string; points: number }[];
}

const quizQuestions: QuizQuestion[] = [
  {
    id: 'experience',
    question: 'How would you describe your hot sauce experience?',
    options: [
      { value: 'none', label: 'I\'m new to hot sauce', points: 0 },
      { value: 'casual', label: 'I use Tabasco or Sriracha regularly', points: 1 },
      { value: 'enthusiast', label: 'I seek out hot sauces wherever I go', points: 2 },
      { value: 'extreme', label: 'I eat ghost peppers for fun', points: 3 },
    ],
  },
  {
    id: 'reaction',
    question: 'How do you react to spicy food?',
    options: [
      { value: 'avoid', label: 'I tend to avoid spicy food', points: 0 },
      { value: 'mild', label: 'I enjoy a little kick', points: 1 },
      { value: 'love', label: 'I love when my mouth is on fire', points: 2 },
      { value: 'need', label: 'Nothing is ever hot enough for me', points: 3 },
    ],
  },
  {
    id: 'purpose',
    question: 'What\'s your main goal with hot sauce?',
    options: [
      { value: 'flavor', label: 'Add flavor without too much heat', points: 0 },
      { value: 'balance', label: 'Balance of flavor and heat', points: 1 },
      { value: 'heat', label: 'Primarily for the heat', points: 2 },
      { value: 'extreme', label: 'Maximum heat, always', points: 3 },
    ],
  },
  {
    id: 'tolerance',
    question: 'What happens when you eat a jalapeño?',
    options: [
      { value: 'hot', label: 'That\'s pretty hot for me', points: 0 },
      { value: 'warm', label: 'Nice warmth, very manageable', points: 1 },
      { value: 'mild', label: 'I can eat them raw like candy', points: 2 },
      { value: 'nothing', label: 'Jalapeños are basically bell peppers to me', points: 3 },
    ],
  },
];

function HeatQuiz() {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState<number[]>([]);
  const [showResult, setShowResult] = useState(false);
  const [quizStarted, setQuizStarted] = useState(false);

  const handleAnswer = (points: number) => {
    const newAnswers = [...answers, points];
    setAnswers(newAnswers);

    if (currentQuestion < quizQuestions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
    } else {
      setShowResult(true);
    }
  };

  const getRecommendation = () => {
    const totalPoints = answers.reduce((sum, points) => sum + points, 0);
    const maxPoints = quizQuestions.length * 3;
    const percentage = (totalPoints / maxPoints) * 100;

    if (percentage <= 20) return { level: 1, name: 'Mild' };
    if (percentage <= 40) return { level: 2, name: 'Medium' };
    if (percentage <= 60) return { level: 3, name: 'Hot' };
    if (percentage <= 80) return { level: 4, name: 'Extra Hot' };
    return { level: 5, name: 'Extreme' };
  };

  const resetQuiz = () => {
    setCurrentQuestion(0);
    setAnswers([]);
    setShowResult(false);
    setQuizStarted(false);
  };

  const recommendation = showResult ? getRecommendation() : null;
  const recommendedProducts = recommendation 
    ? products.filter(p => p.heatLevel === recommendation.level).slice(0, 3)
    : [];

  if (!quizStarted) {
    return (
      <Card className="bg-gradient-to-br from-primary/20 to-accent/10 border-primary/30">
        <CardContent className="p-8 text-center">
          <Thermometer className="h-16 w-16 text-primary mx-auto mb-4" />
          <h3 className="font-display text-3xl mb-4">Find Your Heat Level</h3>
          <p className="text-muted-foreground mb-6 max-w-md mx-auto">
            Take our quick quiz to discover which heat level is perfect for your palate. 
            Answer 4 simple questions and we'll recommend the best sauces for you.
          </p>
          <Button 
            onClick={() => setQuizStarted(true)}
            className="bg-gradient-fire hover:opacity-90 font-heading text-lg h-12 px-8"
          >
            Start Quiz
          </Button>
        </CardContent>
      </Card>
    );
  }

  if (showResult && recommendation) {
    const levelData = heatLevels.find(l => l.level === recommendation.level)!;
    
    return (
      <Card className="bg-gradient-to-br from-primary/20 to-accent/10 border-primary/30">
        <CardContent className="p-8">
          <div className="text-center mb-8">
            <CheckCircle className="h-16 w-16 text-primary mx-auto mb-4" />
            <h3 className="font-display text-3xl mb-2">Your Heat Level</h3>
            <div className={`inline-flex items-center gap-2 px-4 py-2 rounded-full ${levelData.color}`}>
              {Array.from({ length: recommendation.level }).map((_, i) => (
                <Flame key={i} className="h-5 w-5 text-white" fill="white" />
              ))}
              <span className="font-heading uppercase text-white ml-1">{recommendation.name}</span>
            </div>
            <p className="text-muted-foreground mt-4 max-w-lg mx-auto">{levelData.description}</p>
          </div>

          {recommendedProducts.length > 0 && (
            <div className="mb-8">
              <h4 className="font-heading text-lg uppercase tracking-wide mb-4 text-center">Recommended For You</h4>
              <div className="grid sm:grid-cols-3 gap-4">
                {recommendedProducts.map((product) => (
                  <ProductCard key={product.id} product={product} />
                ))}
              </div>
            </div>
          )}

          <div className="text-center">
            <Button onClick={resetQuiz} variant="outline" className="font-heading">
              Take Quiz Again
            </Button>
          </div>
        </CardContent>
      </Card>
    );
  }

  const question = quizQuestions[currentQuestion];
  const progress = ((currentQuestion + 1) / quizQuestions.length) * 100;

  return (
    <Card className="bg-card border-border">
      <CardContent className="p-8">
        <div className="mb-6">
          <div className="flex items-center justify-between text-sm text-muted-foreground mb-2">
            <span>Question {currentQuestion + 1} of {quizQuestions.length}</span>
            <span>{Math.round(progress)}%</span>
          </div>
          <Progress value={progress} className="h-2" />
        </div>

        <h3 className="font-heading text-xl uppercase tracking-wide mb-6">{question.question}</h3>

        <div className="space-y-3">
          {question.options.map((option) => (
            <button
              key={option.value}
              onClick={() => handleAnswer(option.points)}
              className="w-full p-4 rounded-lg border border-border bg-secondary hover:border-primary/50 hover:bg-primary/5 transition-all text-left flex items-center justify-between group"
            >
              <span>{option.label}</span>
              <ChevronRight className="h-5 w-5 text-muted-foreground group-hover:text-primary transition-colors" />
            </button>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}

export default function HeatGuidePage() {
  return (
    <Layout>
      {/* Hero */}
      <section className="py-20 lg:py-28 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-primary/10 via-transparent to-transparent" />
        <div className="container mx-auto px-4 lg:px-8 relative z-10 text-center">
          <Flame className="h-12 w-12 text-primary mx-auto mb-6" />
          <h1 className="font-display text-5xl lg:text-7xl mb-6">Heat Guide</h1>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Understanding the Scoville scale and finding your perfect heat level. 
            From mild everyday sauces to extreme heat challenges.
          </p>
        </div>
      </section>

      {/* Heat Quiz */}
      <section className="pb-16">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="max-w-2xl mx-auto">
            <HeatQuiz />
          </div>
        </div>
      </section>

      {/* What is Scoville */}
      <section className="py-16 bg-charcoal">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <Beaker className="h-10 w-10 text-primary mb-4" />
              <h2 className="font-display text-4xl mb-6">What is the Scoville Scale?</h2>
              <div className="space-y-4 text-muted-foreground">
                <p>
                  The Scoville scale measures the pungency (spiciness) of chili peppers and other spicy foods. 
                  It's based on the concentration of capsaicin, the chemical compound that creates the burning sensation.
                </p>
                <p>
                  Created by Wilbur Scoville in 1912, the Scoville Heat Unit (SHU) scale ranges from 0 (no heat) 
                  to over 2 million for the world's hottest peppers.
                </p>
                <p>
                  For reference, a bell pepper rates 0 SHU, a jalapeño is around 5,000 SHU, and the Carolina 
                  Reaper tops out at over 2.2 million SHU.
                </p>
              </div>
            </div>
            <div className="space-y-4">
              <div className="p-4 rounded-lg bg-secondary border border-border">
                <div className="flex items-center justify-between mb-2">
                  <span className="font-heading uppercase">Bell Pepper</span>
                  <span className="text-muted-foreground">0 SHU</span>
                </div>
                <div className="h-2 rounded-full bg-muted overflow-hidden">
                  <div className="h-full w-0 bg-green-500" />
                </div>
              </div>
              <div className="p-4 rounded-lg bg-secondary border border-border">
                <div className="flex items-center justify-between mb-2">
                  <span className="font-heading uppercase">Jalapeño</span>
                  <span className="text-muted-foreground">5,000 SHU</span>
                </div>
                <div className="h-2 rounded-full bg-muted overflow-hidden">
                  <div className="h-full w-[5%] bg-yellow-500" />
                </div>
              </div>
              <div className="p-4 rounded-lg bg-secondary border border-border">
                <div className="flex items-center justify-between mb-2">
                  <span className="font-heading uppercase">Habanero</span>
                  <span className="text-muted-foreground">350,000 SHU</span>
                </div>
                <div className="h-2 rounded-full bg-muted overflow-hidden">
                  <div className="h-full w-[20%] bg-orange-500" />
                </div>
              </div>
              <div className="p-4 rounded-lg bg-secondary border border-border">
                <div className="flex items-center justify-between mb-2">
                  <span className="font-heading uppercase">Ghost Pepper</span>
                  <span className="text-muted-foreground">1,000,000 SHU</span>
                </div>
                <div className="h-2 rounded-full bg-muted overflow-hidden">
                  <div className="h-full w-[50%] bg-red-500" />
                </div>
              </div>
              <div className="p-4 rounded-lg bg-secondary border border-border">
                <div className="flex items-center justify-between mb-2">
                  <span className="font-heading uppercase">Carolina Reaper</span>
                  <span className="text-muted-foreground">2,200,000 SHU</span>
                </div>
                <div className="h-2 rounded-full bg-muted overflow-hidden">
                  <div className="h-full w-full bg-gradient-to-r from-red-500 to-red-700" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Scale Visualization */}
      <section className="py-16">
        <div className="container mx-auto px-4 lg:px-8">
          <h2 className="font-display text-4xl text-center mb-8">The Heat Spectrum</h2>
          <div className="h-8 rounded-full bg-gradient-to-r from-green-500 via-yellow-500 via-orange-500 via-red-500 to-red-700 mb-4 shadow-lg" />
          <div className="flex justify-between text-sm text-muted-foreground">
            <span>Mild</span>
            <span>Medium</span>
            <span>Hot</span>
            <span>Extra Hot</span>
            <span>Extreme</span>
          </div>
        </div>
      </section>

      {/* Safety Tips */}
      <section className="py-16 bg-charcoal">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="text-center mb-12">
            <AlertTriangle className="h-10 w-10 text-accent mx-auto mb-4" />
            <h2 className="font-display text-4xl mb-4">Hot Sauce Safety Tips</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Whether you're a beginner or a seasoned heat seeker, keep these tips in mind.
            </p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { title: 'Start Low', tip: 'Begin with milder sauces and work your way up gradually.' },
              { title: 'Dairy Helps', tip: 'Milk, yogurt, or cheese can neutralize capsaicin burn.' },
              { title: 'No Water', tip: 'Water spreads capsaicin. Reach for dairy or bread instead.' },
              { title: 'Wash Hands', tip: 'Always wash hands after handling hot peppers or sauces.' },
            ].map((item) => (
              <Card key={item.title} className="bg-card border-border">
                <CardContent className="p-6">
                  <h4 className="font-heading uppercase tracking-wide text-primary mb-2">{item.title}</h4>
                  <p className="text-sm text-muted-foreground">{item.tip}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Heat Levels Detail */}
      <section className="py-20 lg:py-28">
        <div className="container mx-auto px-4 lg:px-8">
          <h2 className="font-display text-4xl text-center mb-12">Heat Levels Explained</h2>
          <div className="space-y-16">
            {heatLevels.map((level) => {
              const levelProducts = products.filter(p => p.heatLevel === level.level && p.category === 'hot-sauce');
              
              return (
                <div key={level.level} className={`p-8 rounded-xl bg-card border-l-4 ${level.borderColor}`}>
                  <div className="flex flex-wrap items-center gap-4 mb-6">
                    <div className={`w-12 h-12 rounded-full ${level.color} flex items-center justify-center`}>
                      <Flame className="h-6 w-6 text-white" fill="white" />
                    </div>
                    <div>
                      <h3 className="font-display text-3xl">{level.name}</h3>
                      <p className="text-muted-foreground">{level.scoville}</p>
                    </div>
                    <div className="ml-auto flex gap-1">
                      {Array.from({ length: level.level }).map((_, i) => (
                        <Flame key={i} className={`h-5 w-5 ${level.textColor}`} fill="currentColor" />
                      ))}
                    </div>
                  </div>
                  
                  <p className="text-lg text-muted-foreground mb-6">{level.description}</p>
                  
                  <div className="grid sm:grid-cols-3 gap-6 mb-8">
                    <div>
                      <h4 className="font-heading text-sm uppercase tracking-wide mb-3">Common Peppers</h4>
                      <div className="flex flex-wrap gap-2">
                        {level.peppers.map((pepper) => (
                          <span key={pepper} className="px-3 py-1 rounded-full bg-secondary text-sm">{pepper}</span>
                        ))}
                      </div>
                    </div>
                    <div>
                      <h4 className="font-heading text-sm uppercase tracking-wide mb-3">Best For</h4>
                      <div className="flex flex-wrap gap-2">
                        {level.bestFor.map((food) => (
                          <span key={food} className="px-3 py-1 rounded-full bg-primary/10 text-primary text-sm">{food}</span>
                        ))}
                      </div>
                    </div>
                    <div>
                      <h4 className="font-heading text-sm uppercase tracking-wide mb-3">Sensation</h4>
                      <p className="text-muted-foreground text-sm">{level.sensation}</p>
                    </div>
                  </div>

                  {levelProducts.length > 0 && (
                    <div>
                      <h4 className="font-heading text-sm uppercase tracking-wide mb-4">Our Sauces at This Level</h4>
                      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
                        {levelProducts.map((product) => (
                          <ProductCard key={product.id} product={product} />
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 bg-gradient-fire">
        <div className="container mx-auto px-4 lg:px-8 text-center">
          <h2 className="font-display text-4xl text-white mb-4">Ready to Find Your Heat?</h2>
          <p className="text-white/80 mb-8 max-w-2xl mx-auto">
            Explore our full collection of handcrafted hot sauces and find your perfect match.
          </p>
          <Button asChild size="lg" variant="secondary" className="font-heading text-lg">
            <Link to="/collections/hot-sauces">
              Shop Hot Sauces <ArrowRight className="ml-2 h-5 w-5" />
            </Link>
          </Button>
        </div>
      </section>
    </Layout>
  );
}
