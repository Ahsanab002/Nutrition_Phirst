import Header from "@/components/Header";
import Footer from "@/components/Footer";
import BenefitPageTemplate from "@/components/BenefitPageTemplate";

const Multivitamins = () => {
  // products removed; banner-only display for now

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <BenefitPageTemplate
        title="Multivitamins"
        description="Complete nutritional support with our comprehensive multivitamin formulas designed to fill nutritional gaps and support overall wellness."
      />
      <Footer />
    </div>
  );
};

export default Multivitamins;
