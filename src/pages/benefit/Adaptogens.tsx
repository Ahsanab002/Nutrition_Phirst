import Header from "@/components/Header";
import Footer from "@/components/Footer";
import BenefitPageTemplate from "@/components/BenefitPageTemplate";

const Adaptogens = () => {
  const products = [
    {
      id: "adapt-1",
      name: "Ashwagandha Complex",
      price: 32.99,
      originalPrice: 42.99,
      image: "/backend/Images/13.jpg",
      description: "Ancient adaptogenic herb for stress resilience and energy"
    },
    {
      id: "adapt-2",
      name: "Rhodiola Rosea",
      price: 28.99,
      image: "/backend/Images/13.jpg",
      description: "Mountain adaptogen for mental performance and endurance"
    },
    {
      id: "adapt-3",
      name: "Holy Basil Extract",
      price: 26.99,
      image: "/backend/Images/13.jpg",
      description: "Sacred herb for stress relief and emotional balance"
    },
    {
      id: "adapt-4",
      name: "Adaptogen Blend",
      price: 35.99,
      image: "/backend/Images/13.jpg",
      description: "Synergistic blend of powerful adaptogenic herbs"
    }
  ];

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <BenefitPageTemplate
        title="Adaptogens"
        description="Ancient herbal wisdom meets modern science with our premium adaptogenic supplements designed to help your body adapt to stress and maintain balance."
        products={products}
      />
      <Footer />
    </div>
  );
};

export default Adaptogens;
