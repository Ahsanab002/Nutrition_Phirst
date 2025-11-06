import Header from "@/components/Header";
import Hero from "@/components/Hero";
// import ProductGrid from "@/components/ProductGrid";
import BestSellers from "@/components/BestSellers";
// import ClinicalResults from "@/components/ClinicalResults";
import FocusBanner from "@/components/FocusBanner";
import LeafDecoration from "@/components/LeafDecoration";
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
        <BestSellers />
        <div className="relative overflow-hidden">
          {/* Decorative leaves for PromoBanner */}
          <div className="pointer-events-none absolute left-1/4 -top-12">
            <LeafDecoration className="opacity-20 scale-90 -rotate-45 animate-leaf-slow" size={160} color="var(--tertiary)" />
          </div>
          <div className="pointer-events-none absolute right-1/3 -bottom-8">
            <LeafDecoration className="opacity-25 scale-75 rotate-90 animate-leaf-slow-reverse" size={140} color="var(--accent)" />
          </div>
          <PromoBanner />
        </div>
        
        {/* <ClinicalResults /> */}
        <div className="relative overflow-hidden">
          {/* Decorative leaves for ProductGrid */}
          <div className="pointer-events-none absolute -left-12 top-1/4">
            <LeafDecoration className="opacity-30 scale-150 -rotate-12 animate-leaf-slow" size={200} color="var(--tertiary)" />
          </div>
          <div className="pointer-events-none absolute right-0 bottom-1/4">
            <LeafDecoration className="opacity-20 scale-125 rotate-45 animate-leaf-slow-reverse" size={180} color="var(--accent)" />
          </div>
          {/* <ProductGrid /> */}
        </div>
        
        {/* Brain Health Banner */}
        <section className="relative py-16 bg-background overflow-hidden">
          {/* Decorative leaves */}
          <div className="pointer-events-none absolute -left-16 top-1/3">
            <LeafDecoration className="opacity-30 scale-150 -rotate-45 animate-leaf-slow" size={220} color="var(--tertiary)" />
          </div>
          <div className="pointer-events-none absolute -right-12 bottom-1/4">
            <LeafDecoration className="opacity-25 scale-125 rotate-12 animate-leaf-slow-reverse" size={180} color="var(--accent)" />
          </div>
          
          <div className="container mx-auto px-4 lg:px-8">
            <div className="relative rounded-2xl overflow-hidden shadow-product">
              <div
                className="w-full h-[400px] md:h-[500px] bg-cover bg-center"
                style={{
                  backgroundImage: "url('/Banners/Banner17.jpg')",
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
        <section className="relative py-16 bg-background overflow-hidden">
          {/* Decorative leaves */}
          <div className="pointer-events-none absolute left-1/4 top-12">
            <LeafDecoration className="opacity-20 scale-90 rotate-180 animate-leaf-slow" size={160} color="var(--tertiary)" />
          </div>
          <div className="pointer-events-none absolute -right-16 top-1/3">
            <LeafDecoration className="opacity-25 scale-150 -rotate-90 animate-leaf-slow-reverse" size={200} color="var(--accent)" />
          </div>
          
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
        <section className="relative py-16 bg-background overflow-hidden">
          {/* Decorative leaves */}
          <div className="pointer-events-none absolute -left-8 bottom-1/4">
            <LeafDecoration className="opacity-25 scale-110 rotate-45 animate-leaf-slow" size={180} color="var(--tertiary)" />
          </div>
          <div className="pointer-events-none absolute right-1/3 top-8">
            <LeafDecoration className="opacity-20 scale-125 -rotate-120 animate-leaf-slow-reverse" size={160} color="var(--accent)" />
          </div>
          
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
