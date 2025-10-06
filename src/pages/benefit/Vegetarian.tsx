import Header from "@/components/Header";
import Footer from "@/components/Footer";
import BenefitPageTemplate from "@/components/BenefitPageTemplate";

const Vegetarian = () => {
  const products = [
    {
      id: "veggie-1",
      name: "Plant-Based Protein",
      price: 32.99,
      originalPrice: 42.99,
      image: "/backend/Images/13.jpg",
      description: "Complete plant protein blend for vegetarians and vegans"
    },
    {
      id: "veggie-2",
      name: "Vegan B12 Complex",
      price: 28.99,
      image: "/backend/Images/13.jpg",
      description: "Essential B12 and B vitamins for plant-based diets"
    },
    {
      id: "veggie-3",
      name: "Plant Omega-3",
      price: 34.99,
      image: "/backend/Images/13.jpg",
      description: "Algae-based omega-3 for heart and brain health"
    },
    {
      id: "veggie-4",
      name: "Vegan Multivitamin",
      price: 29.99,
      image: "/backend/Images/13.jpg",
      description: "Complete vegan nutrition in one convenient capsule"
    }
  ];

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <BenefitPageTemplate
        title="Vegetarian & Vegan"
        description="Plant-based nutrition solutions designed specifically for vegetarians and vegans, ensuring you get all essential nutrients from ethical, sustainable sources."
        products={products}
      />
      <Footer />
    </div>
  );
};

export default Vegetarian;
