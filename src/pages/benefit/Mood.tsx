import Header from "@/components/Header";
import Footer from "@/components/Footer";
import BenefitPageTemplate from "@/components/BenefitPageTemplate";

const Mood = () => {
  // products removed; page will show banner only

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <BenefitPageTemplate
        title="Mood Support"
        description="Natural mood enhancement solutions to help you feel balanced, positive, and emotionally resilient throughout your day."
      />
      <Footer />
    </div>
  );
};

export default Mood;
