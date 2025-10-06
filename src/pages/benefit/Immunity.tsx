import Header from "@/components/Header";
import Footer from "@/components/Footer";
import BenefitPageTemplate from "@/components/BenefitPageTemplate";

const Immunity = () => {
  const products = [
    {
      id: "immunity-1",
      name: "Immune Defense Complex",
      price: 32.99,
      originalPrice: 42.99,
      image: "/backend/Images/13.jpg",
      description: "Comprehensive immune support with vitamin C, D, and zinc"
    },
    {
      id: "immunity-2",
      name: "Elderberry Extract",
      price: 26.99,
      image: "/backend/Images/13.jpg",
      description: "Pure elderberry for natural immune system support"
    },
    {
      id: "immunity-3",
      name: "Vitamin D3 + K2",
      price: 28.99,
      image: "/backend/Images/13.jpg",
      description: "Essential vitamins for immune and bone health"
    },
    {
      id: "immunity-4",
      name: "Antioxidant Power",
      price: 34.99,
      image: "/backend/Images/13.jpg",
      description: "High-potency antioxidants for cellular protection"
    }
  ];

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <BenefitPageTemplate
        title="Immunity Support"
        description="Strengthen your body's natural defenses with our premium immune support supplements designed for year-round wellness."
        products={products}
      />
      <Footer />
    </div>
  );
};

export default Immunity;
