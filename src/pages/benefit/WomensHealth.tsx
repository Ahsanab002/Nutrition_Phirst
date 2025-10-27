import Header from "@/components/Header";
import Footer from "@/components/Footer";
import BenefitPageTemplate from "@/components/BenefitPageTemplate";

const WomensHealth = () => {

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <BenefitPageTemplate
        title="Women's Health"
        description="Specialized wellness solutions designed to support women's unique nutritional needs throughout all life stages."
      />
      <Footer />
    </div>
  );
};

export default WomensHealth;
