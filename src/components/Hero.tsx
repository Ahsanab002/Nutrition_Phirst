import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import heroProducts from "@/assets/hero-supplements.png";

const Hero = () => {
  const navigate = useNavigate();
  return (
    <section className="relative min-h-[80vh] flex items-center bg-gradient-hero overflow-hidden">
      <div className="container mx-auto px-4 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Content */}
          <div className="space-y-8 animate-fade-in relative">
            {/* Subtle radial overlay */}
            <div className="absolute inset-0 pointer-events-none">
              <div className="w-full h-full bg-gradient-radial opacity-30"></div>
            </div>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-display font-semibold leading-tight heading-text tracking-tight">
              Premium Wellness Supplements For Modern Life
            </h1>
            <p className="text-lg md:text-xl body-text leading-relaxed max-w-lg font-medium">
              Discover scientifically-backed supplements designed to enhance your cognitive function, support gut health, and optimize your overall wellness journey.*
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Button
                variant="premium"
                size="lg"
                className="text-base"
                onClick={() => navigate('/products?category=all')}
              >
                Shop Now
              </Button>
              <Button
                variant="minimal"
                size="lg"
                className="text-base"
                onClick={() => navigate("/learn")}
              >
                Learn More
              </Button>
            </div>
            <p className="text-xs muted-text italic font-medium">
              *This statement has not been evaluated by the Food and Drug Administration. 
              This product is not intended to diagnose, treat, cure, or prevent any disease.
            </p>
          </div>
          {/* Hero Image */}
          <div className="relative">
            <img
              src={heroProducts}
              alt="Premium wellness products"
              className="w-full h-auto object-cover rounded-lg shadow-elegant animate-float"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-transparent to-brand-cream/20 rounded-lg"></div>
          </div>
        </div>
      </div>

      {/* Background decoration */}
      <div className="absolute top-0 right-0 w-1/3 h-full bg-gradient-to-l from-brand-cream/30 to-transparent -z-10"></div>
    </section>
  );
};

export default Hero;