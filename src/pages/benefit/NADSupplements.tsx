import Header from "@/components/Header";
import Footer from "@/components/Footer";
import BenefitPageTemplate from "@/components/BenefitPageTemplate";

const NADSupplements = () => {
  const products = [
    {
      id: "nad-1",
      name: "NAD+ Nicotinamide Riboside Gummies",
      price: 89.99,
      originalPrice: 119.99,
      image: "/backend/Images/JPGS NAD GUMMIES/nad-1.jpg",
      description: "High-potency NAD+ supplement in delicious gummy form for cellular energy and anti-aging support",
      rating: 4.9,
      reviewCount: 378,
      badge: "BEST SELLER"
    },
    {
      id: "nad-2",
      name: "NMN Longevity Complex",
      price: 79.99,
      originalPrice: 99.99,
      image: "/backend/Images/13.jpg",
      description: "Pure NMN for cellular repair and healthy aging support",
      rating: 4.8,
      reviewCount: 245
    },
    {
      id: "nad-3",
      name: "NAD+ Precursor Formula",
      price: 69.99,
      image: "/backend/Images/13.jpg",
      description: "Advanced NAD+ precursor blend for optimal cellular function",
      rating: 4.7,
      reviewCount: 167,
      badge: "NEW"
    },
    {
      id: "nad-4",
      name: "Cellular Energy Booster",
      price: 64.99,
      image: "/backend/Images/13.jpg",
      description: "Comprehensive cellular energy support with NAD+ boosters",
      rating: 4.6,
      reviewCount: 134
    }
  ];

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <BenefitPageTemplate
        title="NAD+ Supplements"
        description="Enhance your cellular energy and support healthy aging with our premium NAD+ supplements for longevity and vitality."
        products={products}
      />
      <Footer />
    </div>
  );
};

export default NADSupplements;