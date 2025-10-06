import Header from "@/components/Header";
import Footer from "@/components/Footer";
import BenefitPageTemplate from "@/components/BenefitPageTemplate";

const Mood = () => {
  const products = [
    {
      id: "mood-1",
      name: "Mood Balance Complex",
      price: 32.99,
      originalPrice: 42.99,
      image: "/backend/Images/13.jpg",
      description: "Natural mood support with St. John's Wort and B vitamins",
      rating: 4.7,
      reviewCount: 298,
      badge: "BEST SELLER"
    },
    {
      id: "mood-2",
      name: "Stress Relief Formula",
      price: 28.99,
      image: "/backend/Images/13.jpg",
      description: "Adaptogenic herbs for daily stress management",
      rating: 4.5,
      reviewCount: 156
    },
    {
      id: "mood-3",
      name: "Happy Gummies",
      price: 26.99,
      image: "/backend/Images/13.jpg",
      description: "Cheerful gummy supplements for mood enhancement",
      rating: 4.6,
      reviewCount: 203,
      badge: "NEW"
    },
    {
      id: "mood-4",
      name: "Anxiety Support",
      price: 35.99,
      image: "/backend/Images/13.jpg",
      description: "Gentle anxiety relief with passionflower and valerian",
      rating: 4.8,
      reviewCount: 187
    }
  ];

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <BenefitPageTemplate
        title="Mood Support"
        description="Natural mood enhancement solutions to help you feel balanced, positive, and emotionally resilient throughout your day."
        products={products}
      />
      <Footer />
    </div>
  );
};

export default Mood;
