import Header from "@/components/Header";
import Footer from "@/components/Footer";
import BenefitPageTemplate from "@/components/BenefitPageTemplate";

const WellnessSupplements = () => {
  const products = [
    {
      id: "wellness-1",
      name: "Daily Multivitamin Complex",
      price: 29.99,
      originalPrice: 39.99,
      image: "/backend/Images/13.jpg",
      description: "Complete daily nutrition with essential vitamins and minerals",
      rating: 4.8,
      reviewCount: 567,
      badge: "BEST SELLER"
    },
    {
      id: "wellness-2",
      name: "Omega-3 Fish Oil",
      price: 24.99,
      image: "/backend/Images/13.jpg",
      description: "High-purity omega-3 fatty acids for heart and brain health",
      rating: 4.7,
      reviewCount: 423
    },
    {
      id: "wellness-3",
      name: "Probiotic Immune Support",
      price: 34.99,
      image: "/backend/Images/13.jpg",
      description: "Advanced probiotic blend for digestive and immune health",
      rating: 4.6,
      reviewCount: 298,
      badge: "NEW"
    },
    {
      id: "wellness-4",
      name: "Vitamin D3 + K2",
      price: 19.99,
      image: "/backend/Images/13.jpg",
      description: "Optimal bone health support with vitamin D3 and K2",
      rating: 4.5,
      reviewCount: 234
    }
  ];

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <BenefitPageTemplate
        title="Wellness Supplements"
        description="Support your overall health and vitality with our comprehensive collection of premium wellness supplements for daily nutrition."
        products={products}
      />
      <Footer />
    </div>
  );
};

export default WellnessSupplements;