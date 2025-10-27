import Header from "@/components/Header";
import Footer from "@/components/Footer";
import BenefitPageTemplate from "@/components/BenefitPageTemplate";

const Kids = () => {
  // product list removed; page will display banner only

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <BenefitPageTemplate
        title="Kids Nutrition"
        description="Fun and effective nutritional supplements designed specifically for children, supporting their growth, development, and overall health."
      />
      <Footer />
    </div>
  );
};

export default Kids;
