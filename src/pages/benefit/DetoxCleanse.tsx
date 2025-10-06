import Header from "@/components/Header";
import Footer from "@/components/Footer";
import BenefitPageTemplate from "@/components/BenefitPageTemplate";

const DetoxCleanse = () => {
  const products = [
    {
      id: "detox-1",
      name: "EDTA Chelation Therapy Supplement",
      price: 54.99,
      originalPrice: 74.99,
      image: "/backend/Images/Edta/edta-1.jpg",
      description: "EDTA chelation supplement for heavy metal detoxification and cardiovascular support",
      rating: 4.7,
      reviewCount: 189,
      badge: "BEST SELLER"
    },
    {
      id: "detox-2",
      name: "Parasite Cleanse Formula",
      price: 44.99,
      originalPrice: 59.99,
      image: "/backend/Images/parasite/parasite-1.jpg",
      description: "Natural parasite cleanse formula with powerful herbal ingredients",
      rating: 4.6,
      reviewCount: 156
    },
    {
      id: "detox-3",
      name: "Liver Detox Support",
      price: 39.99,
      image: "/backend/Images/13.jpg",
      description: "Comprehensive liver support with milk thistle and NAC",
      rating: 4.5,
      reviewCount: 234,
      badge: "NEW"
    },
    {
      id: "detox-4",
      name: "Colon Cleanse Formula",
      price: 32.99,
      image: "/backend/Images/13.jpg",
      description: "Gentle colon cleanse with natural fiber and herbs",
      rating: 4.4,
      reviewCount: 123
    }
  ];

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <BenefitPageTemplate
        title="Detox & Cleanse"
        description="Purify and rejuvenate your body with our natural detox and cleanse solutions designed to eliminate toxins and support optimal health."
        products={products}
      />
      <Footer />
    </div>
  );
};

export default DetoxCleanse;