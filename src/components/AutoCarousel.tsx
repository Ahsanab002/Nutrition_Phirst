import { useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import focusImage from '@/assets/06. Spa & Beauty(1).png';
import beautyImage from '@/assets/06. Spa & Beauty.png';
import supplementsImage from '@/assets/product-supplements-new.jpg';
import heroImage from '@/assets/hero-supplements.png';

const AutoCarousel = () => {
  const [currentSlide, setCurrentSlide] = useState(0);

  const slides = [
    {
      id: 1,
      title: "Fuel Focus. Enhance Recall. Stay Sharp.",
      subtitle: "",
      features: [
        "Supports memory, focus, and overall cognitive performance",
        "Enhances mental clarity and alertness without caffeine",
        "Increases blood flow to the brain"
      ],
      stats: [
        { number: "15+", description: "Sharpens memory, focus, and cognitive clarity" },
        { number: "25+", description: "Boosts neurological processing & recall speed" },
        { number: "100%", description: "brain health and neuron protection" }
      ],
      buttonText: "Book Now",
      bgGradient: "bg-gradient-product",
      textColor: "text-foreground",
      image: focusImage
    },
    {
      id: 2,
      title: "Think Sharper. Focus Deeper. Perform Smarter.",
      subtitle: "",
      features: [
        "Smooth fine lines & wrinkles with collagen-boosting peptides.",
        "Hydrate, firm & glow all day."
      ],
      stats: [
        { number: "15+", description: "Improves skin elasticity and smoothness" },
        { number: "25+", description: "Boosts hydration with Hyaluronic Acid" },
        { number: "100%", description: "Herbal Cream Formula" }
      ],
      buttonText: "Book Now",
      bgGradient: "bg-gradient-product",
      textColor: "text-foreground",
      image: beautyImage
    },
    {
      id: 3,
      title: "Premium Wellness Supplements For Modern Life",
      subtitle: "",
      features: [
        "Discover scientifically-backed supplements designed to enhance your cognitive function",
        "Support gut health, and optimize your overall wellness journey"
      ],
      stats: [],
      buttonText: "Shop Now",
      bgGradient: "bg-gradient-product",
      textColor: "text-foreground",
      image: supplementsImage
    },
    {
      id: 4,
      title: "Complete Wellness System",
      subtitle: "Total Body Optimization",
      features: [
        "Comprehensive nutritional support with essential vitamins, minerals, and adaptogens for overall health."
      ],
      stats: [],
      buttonText: "Shop Wellness Bundle",
      bgGradient: "bg-gradient-product",
      textColor: "text-foreground",
      image: heroImage
    }
  ];

  // Auto-advance slides every 5 seconds
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prevSlide) => (prevSlide + 1) % slides.length);
    }, 5000);

    return () => clearInterval(timer);
  }, [slides.length]);

  const goToSlide = (index: number) => {
    setCurrentSlide(index);
  };

  const goToPrevSlide = () => {
    setCurrentSlide((prevSlide) => 
      prevSlide === 0 ? slides.length - 1 : prevSlide - 1
    );
  };

  const goToNextSlide = () => {
    setCurrentSlide((prevSlide) => (prevSlide + 1) % slides.length);
  };

  return (
    <section className="relative overflow-hidden">
      <div className="relative h-[500px] md:h-[600px]">
        {slides.map((slide, index) => (
          <div
            key={slide.id}
            className={`absolute inset-0 transition-all duration-700 ease-in-out ${
              index === currentSlide 
                ? 'opacity-100 translate-x-0' 
                : index < currentSlide 
                  ? 'opacity-0 -translate-x-full'
                  : 'opacity-0 translate-x-full'
            }`}
          >
            {/* Full Image Background */}
            <div className="relative w-full h-full">
              <img
                src={slide.image}
                alt={slide.title}
                className="w-full h-full object-cover"
              />
              
              {/* Book Now Button Overlay */}
              <div className="absolute bottom-8 left-8">
                <Button 
                  variant="premium"
                  className="px-8 py-3 rounded-full font-medium shadow-elegant"
                >
                  Book Now
                </Button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Navigation Arrows */}
      <button
        onClick={goToPrevSlide}
        className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-white/10 backdrop-blur-sm hover:bg-white/20 rounded-full p-3 transition-all duration-200 group"
        aria-label="Previous slide"
      >
        <ChevronLeft className="w-6 h-6 text-amber-800 group-hover:text-amber-900" />
      </button>
      
      <button
        onClick={goToNextSlide}
        className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-white/10 backdrop-blur-sm hover:bg-white/20 rounded-full p-3 transition-all duration-200 group"
        aria-label="Next slide"
      >
        <ChevronRight className="w-6 h-6 text-amber-800 group-hover:text-amber-900" />
      </button>

      {/* Dots Indicator */}
      <div className="absolute bottom-6 left-1/2 transform -translate-x-1/2 flex space-x-3">
        {slides.map((_, index) => (
          <button
            key={index}
            onClick={() => goToSlide(index)}
            className={`w-3 h-3 rounded-full transition-all duration-300 ${
              index === currentSlide
                ? 'bg-amber-600 scale-125'
                : 'bg-white/50 hover:bg-white/70'
            }`}
            aria-label={`Go to slide ${index + 1}`}
          />
        ))}
      </div>

      {/* Progress Bar */}
      <div className="absolute bottom-0 left-0 w-full h-1 bg-white/20">
        <div 
          className="h-full bg-amber-600 transition-all duration-100 ease-linear"
          style={{
            width: `${((currentSlide + 1) / slides.length) * 100}%`
          }}
        />
      </div>

      {/* Background decoration */}
      <div className="absolute top-0 right-0 w-1/3 h-full bg-gradient-to-l from-amber-200/30 to-transparent pointer-events-none"></div>
      <div className="absolute bottom-0 left-0 w-1/3 h-full bg-gradient-to-r from-orange-200/20 to-transparent pointer-events-none"></div>
    </section>
  );
};

export default AutoCarousel;
