import Header from "@/components/Header";
import Footer from "@/components/Footer";
import BenefitPageTemplate from "@/components/BenefitPageTemplate";

const GutHealth = () => {
  const products = [
    {
      id: "gut-1",
      name: "Probiotic Complex",
      price: 34.99,
      originalPrice: 44.99,
      image: "/backend/Images/13.jpg",
      description: "50 billion CFU probiotic blend for digestive wellness"
    },
    {
      id: "gut-2",
      name: "Digestive Enzymes",
      price: 28.99,
      image: "/backend/Images/13.jpg",
      description: "Comprehensive enzyme formula for better digestion"
    },
    {
      id: "gut-3",
      name: "Fiber Support",
      price: 22.99,
      image: "/backend/Images/13.jpg",
      description: "Prebiotic fiber blend for gut microbiome health"
    },
    {
      id: "gut-4",
      name: "Gut Repair Formula",
      price: 39.99,
      image: "/backend/Images/13.jpg",
      description: "Healing nutrients for digestive tract repair"
    }
  ];

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <BenefitPageTemplate
        title="Gut Health"
        description="Advanced digestive wellness solutions to support your gut microbiome, improve digestion, and enhance overall digestive comfort."
        products={products}
      />
      <Footer />
    </div>
  );
};

export default GutHealth;
