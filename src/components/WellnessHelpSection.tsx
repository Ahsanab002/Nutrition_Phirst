import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

interface WellnessCardData {
  title: string;
  subtitle: string;
  description: string;
  buttonText: string;
  buttonVariant?: "default" | "secondary";
  imageSrc?: string;
  stats?: { percentage: number; description: string }[];
  disclaimerText?: string;
}

const WellnessHelpSection = () => {
  const wellnessCards: WellnessCardData[] = [
    {
      title: "Digestive Support",
      subtitle: "Struggling with digestive wellness?",
      description: "Natural support for optimal digestive health and comfort",
      buttonText: "SHOP DIGESTIVE →",
      buttonVariant: "default",
      stats: [
        { percentage: 86, description: "of participants felt less digestive discomfort" },
        { percentage: 74, description: "of participants reported improved digestive balance" }
      ],
      disclaimerText: "*Based on an independent clinical study of daily use for 8 weeks"
    },
    {
      title: "Metabolic Balance",
      subtitle: "Weight management difficulties?",
      description: "Comprehensive support for healthy metabolism and weight wellness",
      buttonText: "SHOP METABOLISM →",
      buttonVariant: "secondary",
      stats: [
        { percentage: 20, description: "improvement in metabolic markers in as little as 4 weeks*" },
        { percentage: 31, description: "enhancement in energy levels in as little as 4 weeks*" }
      ],
      disclaimerText: "*Based on 3rd party clinical testing"
    }
  ];

  return (
    <section className="py-16 bg-gradient-to-b from-background to-brand-cream">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="font-display text-3xl md:text-4xl font-semibold text-brand-dark mb-4">
            What Do You Need Help With
          </h2>
        </div>

        <div className="grid md:grid-cols-2 gap-8 max-w-6xl mx-auto">
          {wellnessCards.map((card, index) => (
            <Card 
              key={index} 
              className="group relative overflow-hidden border-0 shadow-product hover:shadow-hover transition-all duration-300 bg-gradient-to-br from-white to-brand-warm/30"
            >
              <CardContent className="p-8 h-full">
                <div className="flex flex-col h-full">
                  {/* Header */}
                  <div className="mb-6">
                    <div className="inline-block px-3 py-1 bg-brand-golden/10 text-brand-golden text-sm font-medium rounded-full mb-3">
                      {card.title}
                    </div>
                    <h3 className="font-serif text-xl font-semibold text-brand-dark mb-2">
                      {card.subtitle}
                    </h3>
                    <p className="text-muted-foreground text-sm">
                      {card.description}
                    </p>
                  </div>

                  {/* Product Visualization */}
                  <div className="flex-grow flex items-center justify-center mb-6">
                    <div className="relative">
                      {/* Simulated product container */}
                      <div className="w-32 h-32 bg-gradient-to-br from-brand-golden/20 to-brand-warm/40 rounded-2xl border border-brand-golden/20 flex items-center justify-center shadow-product">
                        <div className="w-20 h-20 bg-gradient-to-br from-brand-golden to-brand-golden/80 rounded-xl flex items-center justify-center">
                          <div className="w-12 h-12 bg-white/90 rounded-lg flex items-center justify-center">
                            <div className="text-brand-golden font-bold text-lg">NP</div>
                          </div>
                        </div>
                      </div>
                      {/* Floating elements */}
                      <div className="absolute -top-2 -right-2 w-6 h-6 bg-brand-green rounded-full animate-float"></div>
                      <div className="absolute -bottom-2 -left-2 w-4 h-4 bg-brand-golden/60 rounded-full animate-float" style={{animationDelay: '1s'}}></div>
                    </div>
                  </div>

                  {/* Clinical Results */}
                  {card.stats && (
                    <div className="mb-6 space-y-3">
                      <h4 className="font-medium text-foreground text-sm mb-3">
                        Clinical Trial Results
                      </h4>
                      {card.stats.map((stat, statIndex) => (
                        <div key={statIndex} className="flex items-center space-x-3">
                          <div className="flex items-center justify-center w-12 h-12 rounded-full bg-accent text-accent-foreground font-bold text-lg">
                            {stat.percentage}%
                          </div>
                          <p className="text-sm text-muted-foreground flex-1">
                            {stat.description}
                          </p>
                        </div>
                      ))}
                      {card.disclaimerText && (
                        <p className="text-xs text-muted-foreground/80 mt-3">
                          {card.disclaimerText}
                        </p>
                      )}
                    </div>
                  )}

                  {/* CTA Button */}
                  <div className="mt-auto">
                    <Button 
                      variant={card.buttonVariant} 
                      className="w-full bg-gradient-product hover:shadow-product transform hover:scale-105 transition-all duration-300 font-medium"
                    >
                      {card.buttonText}
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default WellnessHelpSection;
