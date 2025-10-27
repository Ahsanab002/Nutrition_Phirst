import Header from "@/components/Header";
import Footer from "@/components/Footer";
import BenefitPageTemplate from "@/components/BenefitPageTemplate";

const Immunity = () => {
  // products removed; showing banner only

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <BenefitPageTemplate
        title="Immunity Support"
        description="Strengthen your body's natural defenses with our premium immune support supplements designed for year-round wellness."
      />
      <Footer />
    </div>
  );
};

export default Immunity;
