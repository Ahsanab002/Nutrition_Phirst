import Header from "@/components/Header";
import Footer from "@/components/Footer";
import BenefitPageTemplate from "@/components/BenefitPageTemplate";

const FoundationalWellness = () => {
  // products removed temporarily; banner-only

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <BenefitPageTemplate
        title="Foundational Wellness"
        description="Build a strong foundation for lifelong health with our comprehensive wellness supplements designed to support your body's natural healing and maintenance processes."
      />
      <Footer />
    </div>
  );
};

export default FoundationalWellness;
