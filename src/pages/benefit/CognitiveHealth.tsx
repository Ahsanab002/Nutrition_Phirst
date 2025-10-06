import Header from "@/components/Header";
import Footer from "@/components/Footer";
import BenefitPageTemplate from "@/components/BenefitPageTemplate";

const CognitiveHealth = () => {
  const products = [
    {
      id: "cognitive-1",
      name: "Brain Focus Complex",
      price: 39.99,
      originalPrice: 49.99,
      image: "/backend/Images/13.jpg",
      description: "Advanced nootropics for enhanced focus and mental clarity"
    },
    {
      id: "cognitive-2",
      name: "Memory Support",
      price: 32.99,
      image: "/backend/Images/13.jpg",
      description: "Natural memory enhancement with ginkgo and phosphatidylserine"
    },
    {
      id: "cognitive-3",
      name: "Mental Performance",
      price: 35.99,
      image: "/backend/Images/13.jpg",
      description: "Cognitive enhancement for peak mental performance"
    },
    {
      id: "cognitive-4",
      name: "Neuroprotective Blend",
      price: 42.99,
      image: "/backend/Images/13.jpg",
      description: "Protective nutrients for long-term brain health"
    }
  ];

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <BenefitPageTemplate
        title="Cognitive Health"
        description="Optimize your mental performance with our cutting-edge cognitive support supplements designed for enhanced focus, memory, and brain health."
        products={products}
      />
      <Footer />
    </div>
  );
};

export default CognitiveHealth;
