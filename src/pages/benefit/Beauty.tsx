import Header from "@/components/Header";
import Footer from "@/components/Footer";
import BenefitPageTemplate from "@/components/BenefitPageTemplate";

const Beauty = () => {
  const products = [
    {
      id: "beauty-1",
      name: "Collagen Beauty Complex",
      price: 39.99,
      originalPrice: 49.99,
      image: "/backend/Images/13.jpg",
      description: "Premium collagen with hyaluronic acid for radiant skin",
      rating: 4.9,
      reviewCount: 412,
      badge: "BEST SELLER"
    },
    {
      id: "beauty-2",
      name: "Skin Glow Formula",
      price: 29.99,
      image: "/backend/Images/13.jpg",
      description: "Antioxidant-rich blend for healthy, glowing skin",
      rating: 4.6,
      reviewCount: 234
    },
    {
      id: "beauty-3",
      name: "Hair & Nail Support",
      price: 24.99,
      image: "/backend/Images/13.jpg",
      description: "Biotin and keratin for stronger hair and nails",
      rating: 4.7,
      reviewCount: 189,
      badge: "NEW"
    },
    {
      id: "beauty-4",
      name: "Anti-Aging Complex",
      price: 44.99,
      image: "/backend/Images/13.jpg",
      description: "Advanced anti-aging nutrients for youthful appearance",
      rating: 4.8,
      reviewCount: 156
    }
  ];

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <BenefitPageTemplate
        title="Beauty Support"
        description="Comprehensive beauty supplements designed to enhance your natural radiance, support healthy skin, hair, and nails from within."
        products={products}
      />
      <Footer />
    </div>
  );
};

export default Beauty;
