import Header from "@/components/Header";
import Footer from "@/components/Footer";
import BenefitPageTemplate from "@/components/BenefitPageTemplate";

const Adaptogens = () => {

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <BenefitPageTemplate
        title="Adaptogens"
        description="Ancient herbal wisdom meets modern science with our premium adaptogenic supplements designed to help your body adapt to stress and maintain balance."
      />
      <Footer />
    </div>
  );
};

export default Adaptogens;
