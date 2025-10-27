import Header from "@/components/Header";
import Footer from "@/components/Footer";
import BenefitPageTemplate from "@/components/BenefitPageTemplate";

const UltraStrength = () => {
  // products removed; banner-only for now

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <BenefitPageTemplate
        title="Ultra Strength Softgels"
        description="Maximum potency supplements in easy-to-swallow softgel form, delivering concentrated nutrients for optimal health and wellness."
      />
      <Footer />
    </div>
  );
};

export default UltraStrength;
