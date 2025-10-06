import Header from "@/components/Header";
import Footer from "@/components/Footer";
import BenefitPageTemplate from "@/components/BenefitPageTemplate";

const Sleep = () => {
  const products = [
    {
      id: "sleep-1",
      name: "Melatonin Sleep Support",
      price: 29.99,
      originalPrice: 39.99,
      image: "/backend/Images/13.jpg",
      description: "Natural melatonin with L-theanine for restful sleep",
      rating: 4.8,
      reviewCount: 324,
      badge: "BEST SELLER"
    },
    {
      id: "sleep-2", 
      name: "Deep Sleep Complex",
      price: 34.99,
      image: "/backend/Images/13.jpg",
      description: "Advanced sleep formula with magnesium and chamomile",
      rating: 4.6,
      reviewCount: 189,
      badge: "NEW"
    },
    {
      id: "sleep-3",
      name: "Sleep Gummies",
      price: 24.99,
      image: "/backend/Images/13.jpg", 
      description: "Delicious gummy supplements for better sleep quality",
      rating: 4.7,
      reviewCount: 256
    },
    {
      id: "sleep-4",
      name: "Nighttime Recovery",
      price: 39.99,
      image: "/backend/Images/13.jpg",
      description: "Comprehensive nighttime wellness support",
      rating: 4.9,
      reviewCount: 142,
      badge: "PREMIUM"
    }
  ];

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <BenefitPageTemplate
        title="Sleep Support"
        description="Premium sleep solutions designed to help you fall asleep faster, stay asleep longer, and wake up feeling refreshed and energized."
        products={products}
      />
      <Footer />
    </div>
  );
};

export default Sleep;
