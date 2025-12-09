import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";

const Hero = () => {
  const navigate = useNavigate();
  return (
    <>
      {/*
      <section className="relative">
        <div
          role="img"
          aria-label="Ultimate Wellness Collection banner"
          className="w-full bg-cover bg-center rounded-none"
          style={{ minHeight: '70vh', backgroundImage: "url('https://res.cloudinary.com/dvhethden/image/upload/v1764802510/banner_15_bj7yh7.jpg')" }}
        >
          <div className="w-full h-full bg-black/10">
            <div className="container mx-auto px-4 lg:px-8">
              <div className="flex items-center h-[70vh]">
                <div className="bg-transparent backdrop-blur-sm rounded-2xl shadow-none p-4 md:p-8 max-w-xl">
                  <h1 className="text-3xl md:text-4xl lg:text-5xl font-display font-semibold leading-tight tracking-tight text-white">
                    Ultimate Wellness Collection
                  </h1>
                  <p className="mt-3 text-base md:text-lg text-white/90 leading-relaxed font-medium">
                    Premium skincare and supplements designed to elevate your daily routine and support whole-body wellness.
                  </p>

                  <div className="mt-6 flex flex-col sm:flex-row gap-4 items-start sm:items-center">
                    <Button
                      variant="premium"
                      size="sm"
                      className="text-base px-6 py-2 shadow-md bg-gradient-to-r from-emerald-500/95 to-emerald-700/95 text-white"
                      onClick={() => navigate('/products?category=all')}
                    >
                      Shop Now
                    </Button>

                    <Button
                      variant="minimal"
                      size="sm"
                      className="text-base bg-white/10 text-white border border-white/10 px-6 py-2 rounded-lg shadow-sm"
                      onClick={() => navigate('/products?view=open')}
                    >
                      Open View
                    </Button>
                  </div>

                  <p className="mt-4 text-xs muted-text italic font-medium text-white/70">
                    *This statement has not been evaluated by the Food and Drug Administration. This product is not intended to diagnose, treat, cure, or prevent any disease.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Background decoration */}
        <div className="absolute top-0 right-0 w-1/3 h-full bg-gradient-to-l from-brand-cream/30 to-transparent -z-10"></div>
      </section>
      */}
    </>
  );
};

export default Hero;
