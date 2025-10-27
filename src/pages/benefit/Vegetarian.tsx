import Header from "@/components/Header";
import Footer from "@/components/Footer";
import BenefitPageTemplate from "@/components/BenefitPageTemplate";

const Vegetarian = () => {
  // products removed; banner-only view

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <BenefitPageTemplate
        title="Vegetarian & Vegan"
        description="Plant-based nutrition solutions designed specifically for vegetarians and vegans, ensuring you get all essential nutrients from ethical, sustainable sources."
      />
      <Footer />
    </div>
  );
};

export default Vegetarian;
