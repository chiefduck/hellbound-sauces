import { Layout } from '@/components/layout/Layout';
import { Flame, Award, Users, Heart } from 'lucide-react';
import { SEOHead } from '@/components/seo';
import OwnerPic from '@/assets/owner_pic.webp';
import NyxPic from '@/assets/nyx_dog_480x480.webp';

export default function AboutPage() {
  return (
    <Layout>
      <SEOHead
        title="About Us | Our Story & Mission"
        description="Learn about HellBound Sauces - from Scott's kitchen experiments to a thriving hot sauce business. Discover how our partnership creates bold flavors with striking tattoo-inspired artwork that balances heat and taste."
        canonical="/about"
      />
      {/* Hero */}
      <section className="py-20 lg:py-28 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-primary/10 via-transparent to-transparent" />
        <div className="container mx-auto px-4 lg:px-8 relative z-10 text-center">
          <Flame className="h-12 w-12 text-primary mx-auto mb-6" />
          <h1 className="font-display text-5xl lg:text-7xl mb-6">
            <span className="text-gradient-fire">Our Story</span>
          </h1>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            HellBound Sauces began as Scott's kitchen passion project, creating flavorful sauces
            that balance bold flavors with just the right heat.
          </p>
        </div>
      </section>

      {/* Story */}
      <section className="py-20 lg:py-28">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div>
              <h2 className="font-display text-4xl mb-6">Our Story</h2>
              <div className="space-y-4 text-muted-foreground text-lg">
                <p>
                  At HellBound Sauces, our journey is rooted in a simple love for flavor and heat. For Scott,
                  it all started in his kitchen, experimenting with ingredients to create sauces that brought
                  meals to life. What began as a passion project—sharing small-batch creations with family and
                  friends—quickly grew into something much bigger. The feedback was undeniable: people couldn't
                  get enough, and the requests started pouring in.
                </p>
                <p>
                  It wasn't about revolutionizing the hot sauce industry; it was about creating something personal,
                  authentic, and deeply flavorful. Scott's vision wasn't just about heat—it was about balance. He
                  wanted to craft sauces that complemented food, delivering bold flavors with just the right kick.
                </p>
              </div>
            </div>
            <div className="relative aspect-square rounded-xl overflow-hidden border-2 border-primary/20">
              <img
                src={OwnerPic}
                alt="Scott - Founder of HellBound Sauces"
                className="w-full h-full object-cover"
              />
            </div>
          </div>
        </div>
      </section>

      {/* From Hobby to HellBound */}
      <section className="py-16 lg:py-20 bg-charcoal">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="max-w-4xl mx-auto">
            <h2 className="font-display text-4xl mb-8 text-center">From Hobby to HellBound</h2>
            <div className="space-y-4 text-muted-foreground text-lg">
              <p>
                As demand grew, Scott realized this wasn't just a hobby anymore—it was an opportunity to turn
                his passion into something more. But he didn't want HellBound Sauces to be just another hot
                sauce brand. He wanted it to stand out, not only for its flavors but for its personality.
              </p>
              <p>
                That's where Aldo Gallegos stepped in. A gifted artist and lifelong friend, Aldo shared Scott's
                passion for bold, innovative ideas. After sampling the sauces, he was immediately hooked and eager
                to become part of the journey. Together, they crafted HellBound's signature aesthetic: striking,
                tattoo-inspired artwork that perfectly captures the brand's daring and creative essence. This unique
                collaboration quickly resonated within the tattoo industry, attracting numerous artists who are now
                eager to contribute their talents to the project.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Passion and Dedication */}
      <section className="py-16 lg:py-20">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="max-w-4xl mx-auto">
            <h2 className="font-display text-4xl mb-8 text-center">Passion and Dedication</h2>
            <div className="space-y-4 text-muted-foreground text-lg">
              <p>
                Building HellBound Sauces wasn't without its challenges. Balancing a full-time job, family
                responsibilities, and a growing business meant long hours and constant learning. But Scott's
                dedication never wavered. From perfecting recipes to ensuring every bottle captured the essence
                of his vision, he poured his heart into every step of the process.
              </p>
              <p>
                By the 2022 holiday season, the hard work began to pay off. Orders were rolling in, and HellBound
                Sauces was officially on the map.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* The HellBound Difference */}
      <section className="py-16 lg:py-20 bg-charcoal">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="max-w-4xl mx-auto">
            <h2 className="font-display text-4xl mb-8 text-center">The HellBound Difference</h2>
            <div className="space-y-4 text-muted-foreground text-lg">
              <p>
                Today, HellBound Sauces is known for its unique blend of flavor and heat, offering a range of
                sauces that cater to all spice levels. From the sweetness of Pineapple Mango to the cool kick of
                Cucumber Madness and the balanced heat of Sweet Heat, each bottle is crafted with care and passion.
              </p>
              <p>
                But HellBound is more than just hot sauce. It's a reflection of the creativity, hard work, and
                authenticity that Scott brings to the table. It's about the stories shared over meals, the community
                of spice lovers who appreciate bold flavors, and the joy of creating something truly special.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Join Our Journey */}
      <section className="py-16 lg:py-20">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="font-display text-4xl mb-6">Join Our Journey</h2>
            <div className="space-y-4 text-muted-foreground text-lg">
              <p>
                At HellBound Sauces, we're not just selling hot sauce—we're sharing a piece of our story, one
                bottle at a time. Whether you're a die-hard spice enthusiast or just exploring the world of heat,
                we invite you to join us on this flavorful journey.
              </p>
              <p className="text-xl text-foreground font-heading">
                From our kitchen to your table, HellBound Sauces is about more than heat—it's about passion,
                creativity, and the love of great food.
              </p>
              <p className="text-2xl text-primary font-heading tracking-wide mt-6">
                Welcome to the HellBound family. Let's turn up the heat together.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Meet Pup */}
      <section className="py-16 lg:py-20 bg-charcoal">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="max-w-5xl mx-auto">
            <div className="grid lg:grid-cols-2 gap-12 items-center">
              <div className="relative aspect-square rounded-xl overflow-hidden border-2 border-primary/20 lg:order-2">
                <img
                  src={NyxPic}
                  alt="Nyx - The Hell Hound"
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="lg:order-1">
                <h2 className="font-display text-4xl mb-6">Meet Pup</h2>
                <p className="text-muted-foreground text-lg leading-relaxed">
                  Nyx, our HellBound Hell Hound, may not indulge in the heat of peppers, but she's an essential
                  part of our team. With her spirited personality and unwavering loyalty, she brings a unique charm
                  to our hot sauce journey. Nyx's playful energy adds a spark of excitement to everything we do,
                  making her a valued companion in our spicy adventures. While she might not taste the sauces, her
                  vibrant presence is a key ingredient in the HellBound story.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </Layout>
  );
}
