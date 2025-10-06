import Header from "@/components/Header";
import Footer from "@/components/Footer";
import BenefitPageTemplate from "@/components/BenefitPageTemplate";

const Multivitamins = () => {
  const products = [
    {
      id: "multi-1",
      name: "Complete Daily Multivitamin",
      price: 28.99,
      originalPrice: 38.99,
      image: "/backend/Images/13.jpg",
      description: "Comprehensive daily nutrition in one convenient tablet"
    },
    {
      id: "multi-2",
      name: "Senior Multivitamin",
      price: 32.99,
      image: "/backend/Images/13.jpg",
      description: "Age-specific nutrition for adults 50+"
    },
    {
      id: "multi-3",
      name: "Kids Multivitamin Gummies",
      price: 24.99,
      image: "/backend/Images/13.jpg",
      description: "Delicious gummy vitamins kids will love"
    },
    {
      id: "multi-4",
      name: "Prenatal Multivitamin",
      price: 35.99,
      image: "/backend/Images/13.jpg",
      description: "Essential nutrients for expecting and nursing mothers"
    }
  ];

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <BenefitPageTemplate
        title="Multivitamins"
        description="Complete nutritional support with our comprehensive multivitamin formulas designed to fill nutritional gaps and support overall wellness."
        products={products}
      />
      <Footer />
    </div>
  );
};

export default Multivitamins;
