import Header from "@/components/Header";
import Footer from "@/components/Footer";
import BenefitPageTemplate from "@/components/BenefitPageTemplate";

const Skincare = () => {
  const products = [
    {
      id: "skincare-1",
      name: "Kojic Acid Brightening Serum",
      price: 49.99,
      originalPrice: 69.99,
      image: "/backend/Images/kojic jpgs/kojic-1.jpg",
      description: "Professional-grade kojic acid serum for skin brightening and dark spot reduction",
      rating: 4.8,
      reviewCount: 324,
      badge: "BEST SELLER"
    },
    {
      id: "skincare-2",
      name: "Vitamin C Glow Serum",
      price: 39.99,
      originalPrice: 54.99,
      image: "/backend/Images/13.jpg",
      description: "Potent vitamin C serum for radiant, healthy-looking skin",
      rating: 4.7,
      reviewCount: 267
    },
    {
      id: "skincare-3",
      name: "Hydrating Face Moisturizer",
      price: 34.99,
      image: "/backend/Images/13.jpg",
      description: "Deep hydration moisturizer with hyaluronic acid",
      rating: 4.6,
      reviewCount: 189,
      badge: "NEW"
    },
    {
      id: "skincare-4",
      name: "Gentle Cleansing Oil",
      price: 29.99,
      image: "/backend/Images/13.jpg",
      description: "Nourishing cleansing oil that removes makeup and impurities",
      rating: 4.5,
      reviewCount: 156
    }
  ];

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <BenefitPageTemplate
        title="Skincare"
        description="Transform your skin with our premium skincare collection featuring scientifically-backed ingredients for healthy, radiant skin."
        products={products}
      />
      <Footer />
    </div>
  );
};

export default Skincare;