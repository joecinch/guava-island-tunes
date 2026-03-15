import { useAuth } from "@/_core/hooks/useAuth";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Music, Sparkles, Heart, Video, Users, ArrowRight } from "lucide-react";

/**
 * Guava Island Tunes — Home Page
 * Landing page focused on custom song creation
 * Design: Soft Celebration Studio (Warm Minimalism + Boutique)
 */

export default function Home() {
  const { user, loading, error, isAuthenticated, logout } = useAuth();

  const features = [
    {
      icon: <Heart className="w-8 h-8" />,
      title: "Personalized Stories",
      description: "Tell us your unique story and we'll weave it into a beautiful custom song",
      color: "#D4A0A0",
    },
    {
      icon: <Sparkles className="w-8 h-8" />,
      title: "Professional Quality",
      description: "Studio-quality production crafted specifically for your special occasion",
      color: "#F0C040",
    },
    {
      icon: <Video className="w-8 h-8" />,
      title: "Video Options",
      description: "Add a professional music video with your photos to bring your song to life",
      color: "#E8614A",
    },
    {
      icon: <Users className="w-8 h-8" />,
      title: "Expert Guidance",
      description: "Get one-on-one creative consultation for our premium package",
      color: "#6B7FA3",
    },
  ];

  const pricingTiers = [
    {
      name: "Custom Song",
      price: "$100",
      description: "Perfect for personal celebrations",
      features: ["2 song versions", "Personalized lyrics", "MP3 delivery"],
      color: "#E8614A",
    },
    {
      name: "Song + Slideshow",
      price: "$450",
      description: "Bring your story to life",
      features: ["2 song versions", "Custom photo slideshow", "MP3 + MP4 delivery"],
      color: "#F0C040",
      featured: true,
    },
    {
      name: "Premium Package",
      price: "$1,000",
      description: "Full creative partnership",
      features: ["2 song versions", "Custom photo slideshow", "Professional video", "One-on-one consultation", "Unlimited revisions"],
      color: "#D4A0A0",
    },
  ];

  return (
    <div className="min-h-screen bg-background">
      {/* Navigation */}
      <nav className="sticky top-0 z-40 bg-background/95 backdrop-blur border-b border-border">
        <div className="container flex items-center justify-between py-4">
          <div className="flex items-center gap-2">
            <Music className="w-6 h-6" style={{ color: "#E8614A" }} />
            <h1 className="text-2xl font-bold text-foreground" style={{ fontFamily: "'Cormorant Garamond', serif" }}>
              Guava Island Tunes
            </h1>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative overflow-hidden py-20 md:py-32">
        <div className="container">
          <div className="max-w-3xl mx-auto text-center space-y-8">
            <div>
              <h1
                className="text-6xl md:text-7xl font-bold text-foreground leading-tight mb-6"
                style={{ fontFamily: "'Cormorant Garamond', serif", fontStyle: "italic" }}
              >
                Your Story, Your Song
              </h1>
              <p className="text-xl md:text-2xl text-muted-foreground mb-4">
                Custom-crafted songs for weddings, birthdays, memorials, anniversaries, and every special moment that matters.
              </p>
              <p className="text-lg text-muted-foreground">
                Tell us your story. We'll create a beautiful, personalized song just for you.
              </p>
            </div>

            <div className="flex flex-col sm:flex-row gap-4 justify-center pt-4">
              <a href="/custom">
                <Button
                  size="lg"
                  className="bg-primary hover:bg-primary/90 text-primary-foreground flex items-center gap-2"
                >
                  Create Your Custom Song
                  <ArrowRight className="w-5 h-5" />
                </Button>
              </a>
            </div>
          </div>

          {/* Hero Image */}
          <div className="mt-16 rounded-2xl overflow-hidden shadow-xl max-w-4xl mx-auto">
            <img
              src="https://d2xsxph8kpxj0f.cloudfront.net/310519663436294948/NrCBehFefPzQZg5uwpDk64/hero-banner-aSY4SNMjSRbHn9kmgTaUxP.webp"
              alt="Guava Island Tunes Hero"
              className="w-full h-auto object-cover"
            />
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-card border-y border-border">
        <div className="container">
          <h2
            className="text-4xl md:text-5xl font-bold text-center mb-16 text-foreground"
            style={{ fontFamily: "'Cormorant Garamond', serif" }}
          >
            Why Choose Guava Island Tunes?
          </h2>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, idx) => (
              <div key={idx} className="space-y-4">
                <div
                  className="w-16 h-16 rounded-full flex items-center justify-center text-white"
                  style={{ backgroundColor: feature.color }}
                >
                  {feature.icon}
                </div>
                <h3 className="text-xl font-bold text-foreground">{feature.title}</h3>
                <p className="text-muted-foreground">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Pricing Section */}
      <section className="py-20">
        <div className="container">
          <h2
            className="text-4xl md:text-5xl font-bold text-center mb-4 text-foreground"
            style={{ fontFamily: "'Cormorant Garamond', serif" }}
          >
            Simple, Transparent Pricing
          </h2>
          <p className="text-center text-lg text-muted-foreground mb-16 max-w-2xl mx-auto">
            Choose the perfect package for your needs. All packages include personalized lyrics and professional production.
          </p>

          <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            {pricingTiers.map((tier, idx) => (
              <Card
                key={idx}
                className={`overflow-hidden border-0 flex flex-col transition-all duration-300 ${
                  tier.featured ? "ring-2 ring-primary shadow-2xl scale-105" : "hover:shadow-lg"
                }`}
              >
                <div
                  className="p-8 text-white"
                  style={{ backgroundColor: tier.color }}
                >
                  <h3 className="text-2xl font-bold mb-2" style={{ fontFamily: "'Cormorant Garamond', serif" }}>
                    {tier.name}
                  </h3>
                  <p className="text-sm opacity-90">{tier.description}</p>
                </div>

                <div className="p-8 flex-1 flex flex-col">
                  <div className="mb-8">
                    <div className="text-5xl font-bold text-foreground mb-2">{tier.price}</div>
                    <p className="text-sm text-muted-foreground">one-time payment</p>
                  </div>

                  <ul className="space-y-3 mb-8 flex-1">
                    {tier.features.map((feature, fidx) => (
                      <li key={fidx} className="flex items-start gap-3">
                        <span className="text-primary font-bold mt-1">✓</span>
                        <span className="text-foreground">{feature}</span>
                      </li>
                    ))}
                  </ul>

                  <a href="/custom">
                    <Button
                      size="lg"
                      className="w-full text-white"
                      style={{ backgroundColor: tier.color }}
                    >
                      Get Started
                    </Button>
                  </a>
                </div>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Meet the Owner Section */}
      <section className="py-20 bg-card border-t border-border">
        <div className="container">
          <div className="max-w-4xl mx-auto flex flex-col md:flex-row items-center gap-12">
            {/* Photo */}
            <div className="flex-shrink-0">
              <div
                className="w-52 h-52 rounded-full overflow-hidden shadow-xl border-4"
                style={{ borderColor: "#E8614A" }}
              >
                <img
                  src="/joey-kim.png"
                  alt="Joey Kim — Founder of Guava Island Tunes"
                  className="w-full h-full object-cover object-top"
                />
              </div>
            </div>

            {/* Bio */}
            <div className="text-center md:text-left space-y-4">
              <div>
                <p className="text-sm font-semibold uppercase tracking-widest" style={{ color: "#E8614A" }}>
                  Meet the Founder
                </p>
                <h2
                  className="text-4xl font-bold text-foreground mt-1"
                  style={{ fontFamily: "'Cormorant Garamond', serif" }}
                >
                  Joey Kim
                </h2>
                <p className="text-muted-foreground font-medium">Owner &amp; Creative Director, Guava Island Tunes</p>
              </div>
              <div className="space-y-3 text-foreground/80 leading-relaxed">
                <p>
                  Music has always been the language of the heart. I started Guava Island Tunes because I believe every love story, every milestone, and every goodbye deserves its own song — something personal, something that lasts forever.
                </p>
                <p>
                  A custom song isn't just a gift. It's a moment frozen in time. It's the first dance at a wedding that makes everyone in the room tear up. It's the birthday surprise that leaves your parent speechless. It's the memorial that turns grief into something beautiful. These songs become heirlooms — played at anniversaries, passed down through families, and treasured for generations.
                </p>
                <p>
                  Every song we create is crafted with your story at its core. No templates, no shortcuts — just music made with love, for the people who matter most to you.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-primary/10 to-primary/5">
        <div className="container text-center space-y-6">
          <h2
            className="text-4xl md:text-5xl font-bold text-foreground"
            style={{ fontFamily: "'Cormorant Garamond', serif" }}
          >
            Ready to Create Your Perfect Song?
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Let's turn your story into music. Start the process today and tell us what makes your moment special.
          </p>
          <a href="/custom">
            <Button
              size="lg"
              className="bg-primary hover:bg-primary/90 text-primary-foreground flex items-center gap-2 mx-auto"
            >
              Create Your Custom Song
              <ArrowRight className="w-5 h-5" />
            </Button>
          </a>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-card border-t border-border py-12">
        <div className="container">
          <div className="text-center text-muted-foreground text-sm space-y-2">
            <p>© 2024 Guava Island Tunes. All rights reserved.</p>
            <p>Crafted with care for your special moments.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
