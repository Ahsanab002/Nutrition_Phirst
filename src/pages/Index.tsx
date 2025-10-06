import Header from "@/components/Header";
import Hero from "@/components/Hero";
import ProductGrid from "@/components/ProductGrid";
import ClinicalResults from "@/components/ClinicalResults";
import FocusBanner from "@/components/FocusBanner";
// ...existing code...
import PressLogos from "@/components/PressLogos";
import Footer from "@/components/Footer";
import { useScrollToTop } from "@/hooks/use-scroll-to-top";
import PromoBanner from "@/components/PromoBanner";

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
        <ClinicalResults />
        <ProductGrid />
        <FocusBanner />
  {/* Removed BeautyBanner */}
      </main>
      <Footer />
    </div>
  );
};

export default Index;
