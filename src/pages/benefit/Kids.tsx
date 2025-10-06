import Header from "@/components/Header";
import Footer from "@/components/Footer";
import BenefitPageTemplate from "@/components/BenefitPageTemplate";

const Kids = () => {
  const products = [
    {
      id: "kids-1",
      name: "Kids Daily Multivitamin",
      price: 19.99,
      originalPrice: 29.99,
      image: "/backend/Images/13.jpg",
      description: "Complete nutrition for growing kids in fun gummy form"
    },
    {
      id: "kids-2",
      name: "Kids Omega-3 Gummies",
      price: 22.99,
      image: "/backend/Images/13.jpg",
      description: "Brain-boosting omega-3s in kid-friendly gummies"
    },
    {
      id: "kids-3",
      name: "Kids Probiotic",
      price: 24.99,
      image: "/backend/Images/13.jpg",
      description: "Gentle probiotic support for kids' digestive health"
    },
    {
      id: "kids-4",
      name: "Kids Vitamin D3",
      price: 18.99,
      image: "/backend/Images/13.jpg",
      description: "Essential vitamin D for strong bones and immunity"
    }
  ];

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <BenefitPageTemplate
        title="Kids Nutrition"
        description="Fun and effective nutritional supplements designed specifically for children, supporting their growth, development, and overall health."
        products={products}
      />
      <Footer />
    </div>
  );
};

export default Kids;
