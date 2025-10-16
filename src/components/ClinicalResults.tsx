import { Button } from "@/components/ui/button";

const ClinicalResults = () => {
  const results = [
    {
      id: "digestive",
      title: "Digestive Wellness",
      subtitle: "Struggling with digestive issues?",
      description: "*Based on an independent clinical study of daily use for 2 months",
      stats: [
        {
          percentage: "86%",
          description: "of participants felt less bloat and discomfort"
        },
        {
          percentage: "74%", 
          description: "of participants reported less digestive symptoms + improved regularity"
        }
      ],
      buttonText: "SHOP DIGESTIVE →",
      bgGradient: "from-brand-cream to-brand-warm",
      textColor: "text-primary",
      buttonVariant: "premium" as const
    },
    {
      id: "cognitive",
      title: "Results From Cognitive Enhancement Trials", 
      subtitle: "",
      description: "",
      stats: [
        {
          percentage: "92%",
          description: "improvement in focus and mental clarity"
        },
        {
          percentage: "78%",
          description: "enhancement in memory retention and recall"
        }
      ],
      buttonText: "SHOP FOCUS →",
      bgGradient: "from-brand-cream to-brand-warm", 
      textColor: "text-primary",
      buttonVariant: "minimal" as const
    },
    {
      id: "metabolic",
      title: "Metabolic Support",
      subtitle: "Weight management difficulties?",
      description: "*Based on 3rd party clinical testing",
      stats: [
        {
          percentage: "20%",
          description: "decrease in body fat in little as 3 months*"
        },
        {
          percentage: "31%",
          description: "decrease in blood glucose levels in as little as 3 months*"
        }
      ],
      buttonText: "SHOP METABOLISM →",
      bgGradient: "from-brand-cream to-brand-warm",
      textColor: "text-primary", 
      buttonVariant: "premium" as const
    },
    {
      id: "wellness",
      title: "Results From Comprehensive Wellness Testing",
      subtitle: "",
      description: "*Based on 6-month longitudinal study",
      stats: [
        {
          percentage: "89%",
          description: "reported improved overall energy levels"
        },
        {
          percentage: "76%", 
          description: "showed enhanced sleep quality and recovery"
        }
      ],
      buttonText: "SHOP WELLNESS →",
      bgGradient: "from-brand-cream to-brand-warm",
      textColor: "text-primary",
      buttonVariant: "minimal" as const
    }
  ];

  return (
    <section className="py-16 bg-background">
      <div className="container mx-auto px-4 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-display font-semibold text-foreground tracking-tight mb-4">
            What Do You Need Help With?
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Clinically proven results from our premium wellness solutions
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {results.map((result) => (
            <div
              key={result.id}
              className={`relative rounded-2xl p-6 bg-gradient-to-br ${result.bgGradient} shadow-product hover:shadow-hover transition-elegant group`}
            >
              {/* Category Badge */}
              <div className="inline-flex items-center px-3 py-1 rounded-full bg-white/80 backdrop-blur-sm mb-4">
                <span className="text-xs font-medium text-primary uppercase tracking-wide">
                  {result.id === "digestive" && "Digestive"}
                  {result.id === "cognitive" && "Cognitive"} 
                  {result.id === "metabolic" && "Metabolic Burn"}
                  {result.id === "wellness" && "Wellness"}
                </span>
              </div>

              {/* Content */}
              <div className="space-y-4 mb-6">
                {result.subtitle && (
                  <h3 className={`text-base font-medium ${result.textColor}`}>
                    {result.subtitle}
                  </h3>
                )}
                
                <h4 className={`text-lg font-semibold ${result.textColor} leading-tight`}>
                  {result.title}
                </h4>

                {/* Statistics */}
                <div className="space-y-3">
                  {result.stats.map((stat, index) => (
                    <div key={index} className="flex items-start gap-3">
                      <div className="flex-shrink-0">
                        <div className={`w-12 h-12 rounded-full border-4 border-current ${result.textColor} flex items-center justify-center relative`}>
                          <span className="text-sm font-bold">{stat.percentage}</span>
                          {/* Progress circle decoration */}
                          <svg className="absolute inset-0 w-full h-full -rotate-90" viewBox="0 0 40 40">
                            <circle
                              cx="20"
                              cy="20"
                              r="16"
                              fill="none"
                              stroke="currentColor"
                              strokeWidth="2"
                              strokeDasharray={`${parseInt(stat.percentage)} 100`}
                              opacity="0.3"
                            />
                          </svg>
                        </div>
                      </div>
                      <div className="flex-1">
                        <p className={`text-sm ${result.textColor} leading-snug`}>
                          {stat.description}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>

                {result.description && (
                  <p className={`text-xs ${result.textColor} opacity-75 italic`}>
                    {result.description}
                  </p>
                )}
              </div>

              {/* CTA Button */}
              <Button
                variant={result.buttonVariant}
                size="sm"
                className="w-full rounded-xl font-medium text-xs tracking-wide group-hover:scale-105 transition-transform"
              >
                {result.buttonText}
              </Button>

              {/* Product Image Placeholder */}
              <div className="absolute top-4 right-4 w-16 h-16 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center opacity-60">
                <div className={`w-8 h-8 rounded-full ${result.textColor.replace('text-', 'bg-')} opacity-60`}></div>
              </div>
            </div>
          ))}
        </div>

        {/* Bottom CTA */}
        <div className="text-center mt-12">
          <p className="text-muted-foreground mb-4">
            All results based on independent clinical studies and third-party testing
          </p>
          <Button variant="luxury" size="lg" className="min-w-48">
            VIEW ALL RESEARCH
          </Button>
        </div>
      </div>
    </section>
  );
};

export default ClinicalResults;
