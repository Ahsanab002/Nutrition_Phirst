import Header from "@/components/Header";
import Footer from "@/components/Footer";
import BenefitPageTemplate from "@/components/BenefitPageTemplate";

const FoundationalWellness = () => {
  const products = [
    {
      id: "foundation-1",
      name: "Core Wellness Complex",
      price: 39.99,
      originalPrice: 49.99,
      image: "/backend/Images/13.jpg",
      description: "Foundation of essential nutrients for daily wellness"
    },
    {
      id: "foundation-2",
      name: "Daily Detox Support",
      price: 29.99,
      image: "/backend/Images/13.jpg",
      description: "Gentle daily detoxification for optimal health"
    },
    {
      id: "foundation-3",
      name: "Wellness Essentials",
      price: 34.99,
      image: "/backend/Images/13.jpg",
      description: "Core nutrients for foundational health and vitality"
    },
    {
      id: "foundation-4",
      name: "Holistic Health Blend",
      price: 42.99,
      image: "/backend/Images/13.jpg",
      description: "Comprehensive wellness support for whole-body health"
    }
  ];

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <BenefitPageTemplate
        title="Foundational Wellness"
        description="Build a strong foundation for lifelong health with our comprehensive wellness supplements designed to support your body's natural healing and maintenance processes."
        products={products}
      />
      <Footer />
    </div>
  );
};

export default FoundationalWellness;
