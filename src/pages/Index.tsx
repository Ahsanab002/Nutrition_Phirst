import Header from "@/components/Header";
import Hero from "@/components/Hero";
import ProductGrid from "@/components/ProductGrid";
// import ClinicalResults from "@/components/ClinicalResults";
import FocusBanner from "@/components/FocusBanner";
// ...existing code...
import PressLogos from "@/components/PressLogos";
import Footer from "@/components/Footer";
import { useScrollToTop } from "@/hooks/use-scroll-to-top";
import PromoBanner from "@/components/PromoBanner";
import { Link } from "react-router-dom";

const Index = () => {
  // Ensure page starts from top when navigated to
  useScrollToTop();
  
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main>
        <Hero />
        <PressLogos />
        <PromoBanner />
        {/* <ClinicalResults /> */}
        <ProductGrid />
        
        {/* Brain Health Banner */}
        <section className="py-16 bg-background">
          <div className="container mx-auto px-4 lg:px-8">
            <div className="relative rounded-2xl overflow-hidden shadow-product">
              <div
                className="w-full h-[400px] md:h-[500px] bg-cover bg-center"
                style={{
                  backgroundImage: "url('/Banners/banner 3.jpg')",
                }}
              />
              <div className="absolute inset-0 bg-black/20 flex items-center">
                <div className="container mx-auto px-4 lg:px-8">
                  <div className="max-w-2xl">
                    <h2 className="text-3xl md:text-4xl font-display font-bold text-white mb-4">
                      Brain Health
                    </h2>
                    <p className="text-lg text-white/90 mb-6">
                      Optimize your mental performance with our cutting-edge cognitive support supplements designed for enhanced focus, memory, and brain health.
                    </p>
                    <Link 
                      to="/products?category=brain-health" 
                      className="inline-block bg-primary text-white px-8 py-3 rounded-xl font-medium hover:bg-primary/90 transition-colors"
                    >
                      SHOP BRAIN HEALTH →
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Detox & Cleanse Banner */}
        <section className="py-16 bg-background">
          <div className="container mx-auto px-4 lg:px-8">
            <div className="relative rounded-2xl overflow-hidden shadow-product">
              <div
                className="w-full h-[400px] md:h-[500px] bg-cover bg-center"
                style={{
                  backgroundImage: "url('/Banners/banner 6.jpg')",
                }}
              />
              <div className="absolute inset-0 bg-black/20 flex items-center">
                <div className="container mx-auto px-4 lg:px-8">
                  <div className="max-w-2xl">
                    <h2 className="text-3xl md:text-4xl font-display font-bold text-white mb-4">
                      Detox & Cleanse
                    </h2>
                    <p className="text-lg text-white/90 mb-6">
                      Purify and rejuvenate your body with our natural detox and cleanse solutions designed to eliminate toxins and support optimal health.
                    </p>
                    <Link 
                      to="/products?category=detox-cleanse" 
                      className="inline-block bg-primary text-white px-8 py-3 rounded-xl font-medium hover:bg-primary/90 transition-colors"
                    >
                      SHOP DETOX & CLEANSE →
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Anti-Aging Banner */}
        <section className="py-16 bg-background">
          <div className="container mx-auto px-4 lg:px-8">
            <div className="relative rounded-2xl overflow-hidden shadow-product">
              <div
                className="w-full h-[400px] md:h-[500px] bg-cover bg-center"
                style={{
                  backgroundImage: "url('/Banners/banner 7.jpg')",
                }}
              />
              <div className="absolute inset-0 bg-black/20 flex items-center">
                <div className="container mx-auto px-4 lg:px-8">
                  <div className="max-w-2xl">
                    <h2 className="text-3xl md:text-4xl font-display font-bold text-white mb-4">
                      Anti-Aging
                    </h2>
                    <p className="text-lg text-white/90 mb-6">
                      Turn back time with our advanced anti-aging solutions featuring clinically-proven ingredients to reduce wrinkles and restore youthful skin.
                    </p>
                    <Link 
                      to="/products?category=anti-aging-nad-supplement" 
                      className="inline-block bg-primary text-white px-8 py-3 rounded-xl font-medium hover:bg-primary/90 transition-colors"
                    >
                      SHOP ANTI-AGING →
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        <FocusBanner />
  {/* Removed BeautyBanner */}
      </main>
      <Footer />
    </div>
  );
};

export default Index;
