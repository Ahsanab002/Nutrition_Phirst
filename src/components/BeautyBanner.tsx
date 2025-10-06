import { Button } from "@/components/ui/button";
import { Sparkles, Heart, Shield } from "lucide-react";
import beautyBanner from "@/assets/beauty-banner.jpg";

const BeautyBanner = () => {
  const benefits = [
    {
      icon: Sparkles,
      title: "15+",
      description: "Improves skin elasticity and smoothness"
    },
    {
      icon: Heart,
      title: "25+",
      description: "Boosts hydration with Hyaluronic Acid"
    },
    {
      icon: Shield,
      title: "100%",
      description: "Herbal Cream Formula"
    }
  ];

  return (
    <section className="py-16 bg-gradient-to-br from-brand-warm via-background to-brand-cream">
      <div className="container mx-auto px-4 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Image */}
          <div className="relative order-2 lg:order-1">
            <img
              src={beautyBanner}
              alt="Nutrition pHirst beauty and skincare products"
              className="w-full h-auto object-cover rounded-lg shadow-elegant"
            />
          </div>

          {/* Content */}
          <div className="space-y-8 order-1 lg:order-2">
            <div className="space-y-4">
              <h2 className="text-4xl md:text-5xl font-serif font-bold text-brand-golden leading-tight">
                Think Sharper. Focus Deeper. Perform Smarter.
              </h2>
              <div className="space-y-3 text-muted-foreground">
                <p>• Smooth fine lines & wrinkles with collagen-boosting peptides</p>
                <p>• Hydrate, firm & glow all day</p>
              </div>
            </div>

            <Button variant="premium" size="lg" className="bg-brand-golden hover:bg-brand-golden/90">
              Book Now
            </Button>

            <div className="grid grid-cols-3 gap-8">
              {benefits.map((benefit, index) => (
                <div key={index} className="text-center space-y-3">
                  <div className="w-12 h-12 bg-brand-golden rounded-full flex items-center justify-center mx-auto">
                    <benefit.icon className="w-6 h-6 text-white" />
                  </div>
                  <div className="space-y-1">
                    <div className="text-2xl font-bold text-brand-golden">{benefit.title}</div>
                    <p className="text-xs text-muted-foreground leading-relaxed">
                      {benefit.description}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default BeautyBanner;