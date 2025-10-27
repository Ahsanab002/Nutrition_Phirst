import Header from "@/components/Header";
import Footer from "@/components/Footer";
import BenefitPageTemplate from "@/components/BenefitPageTemplate";

const Sleep = () => {
  // products removed; banner-only display for now

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <BenefitPageTemplate
        title="Sleep Support"
        description="Premium sleep solutions designed to help you fall asleep faster, stay asleep longer, and wake up feeling refreshed and energized."
      />
      <Footer />
    </div>
  );
};

export default Sleep;
