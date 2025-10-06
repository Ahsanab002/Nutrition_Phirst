import { Button } from "@/components/ui/button";
import { Brain, Zap, Target } from "lucide-react";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselPrevious,
  CarouselNext,
} from "@/components/ui/carousel";
import banner1 from "@/assets/BANNER 1.jpg";
import banner2 from "@/assets/BANNER 2.jpg";
import banner3 from "@/assets/BANNER 3.jpg";
import banner4 from "@/assets/BANNER 4.jpg";
import banner5 from "@/assets/BANNER 5.jpg";

const FocusBanner = () => {
  const benefits = [
    {
      icon: Brain,
      title: "15+",
      description: "Sharpens memory, focus, and cognitive clarity"
    },
    {
      icon: Zap,
      title: "25+",
      description: "Boosts neurological processing & recall speed"
    },
    {
      icon: Target,
      title: "100%",
      description: "Brain health and neuron protection"
    }
  ];

  return (
    <section className="py-16 bg-gradient-to-br from-brand-cream via-background to-brand-warm">
      <div className="container mx-auto px-4 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Content */}
          <div className="space-y-8">
            <div className="space-y-4">
              <h2 className="text-4xl md:text-5xl font-serif font-bold text-brand-golden leading-tight">
                Fuel Focus. Enhance Recall. Stay Sharp.
              </h2>
              <div className="space-y-3 text-muted-foreground">
                <p>• Supports memory, focus, and overall cognitive performance</p>
                <p>• Enhances mental clarity and alertness without caffeine</p>
                <p>• Increases blood flow to the brain</p>
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

          {/* Carousel Image */}
          <div className="relative">
            <Carousel className="w-full max-w-xl mx-auto" opts={{ loop: true }}>
              <CarouselContent>
                <CarouselItem>
                  <img src={banner1} alt="Banner 1" className="rounded-lg w-full h-auto object-cover shadow-elegant" />
                </CarouselItem>
                <CarouselItem>
                  <img src={banner2} alt="Banner 2" className="rounded-lg w-full h-auto object-cover shadow-elegant" />
                </CarouselItem>
                <CarouselItem>
                  <img src={banner3} alt="Banner 3" className="rounded-lg w-full h-auto object-cover shadow-elegant" />
                </CarouselItem>
                <CarouselItem>
                  <img src={banner4} alt="Banner 4" className="rounded-lg w-full h-auto object-cover shadow-elegant" />
                </CarouselItem>
                <CarouselItem>
                  <img src={banner5} alt="Banner 5" className="rounded-lg w-full h-auto object-cover shadow-elegant" />
                </CarouselItem>
              </CarouselContent>
              <CarouselPrevious />
              <CarouselNext />
            </Carousel>
          </div>
        </div>
      </div>
    </section>
  );
};

export default FocusBanner;