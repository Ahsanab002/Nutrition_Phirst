import Header from "@/components/Header";
import Footer from "@/components/Footer";
import BenefitPageTemplate from "@/components/BenefitPageTemplate";

const Energy = () => {
  const products = [
    {
      id: "energy-1",
      name: "Natural Energy Boost",
      price: 29.99,
      originalPrice: 39.99,
      image: "/backend/Images/13.jpg",
      description: "Sustained energy with B vitamins and natural caffeine"
    },
    {
      id: "energy-2",
      name: "Mitochondrial Support",
      price: 35.99,
      image: "/backend/Images/13.jpg",
      description: "Cellular energy production with CoQ10 and NAD+"
    },
    {
      id: "energy-3",
      name: "Energy Gummies",
      price: 24.99,
      image: "/backend/Images/13.jpg",
      description: "Delicious energy gummies for on-the-go vitality"
    },
    {
      id: "energy-4",
      name: "Adrenal Support",
      price: 32.99,
      image: "/backend/Images/13.jpg",
      description: "Adaptogenic herbs for stress-related fatigue"
    }
  ];

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <BenefitPageTemplate
        title="Energy Support"
        description="Natural energy enhancement solutions to help you feel energized, focused, and ready to tackle your day with sustained vitality."
        products={products}
      />
      <Footer />
    </div>
  );
};

export default Energy;
