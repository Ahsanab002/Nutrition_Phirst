import Header from "@/components/Header";
import Footer from "@/components/Footer";
import BenefitPageTemplate from "@/components/BenefitPageTemplate";

const WellnessSupplements = () => {
  // products removed; show banner only for now

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <BenefitPageTemplate
        title="Wellness Supplements"
        description="Support your overall health and vitality with our comprehensive collection of premium wellness supplements for daily nutrition."
      />
      <Footer />
    </div>
  );
};

export default WellnessSupplements;