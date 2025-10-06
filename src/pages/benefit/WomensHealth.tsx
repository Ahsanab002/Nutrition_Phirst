import Header from "@/components/Header";
import Footer from "@/components/Footer";
import BenefitPageTemplate from "@/components/BenefitPageTemplate";

const WomensHealth = () => {
  const products = [
    {
      id: "womens-1",
      name: "Women's Multivitamin",
      price: 34.99,
      originalPrice: 44.99,
      image: "/backend/Images/13.jpg",
      description: "Comprehensive nutrition specifically formulated for women"
    },
    {
      id: "womens-2",
      name: "Hormone Balance Complex",
      price: 39.99,
      image: "/backend/Images/13.jpg",
      description: "Natural hormone support with chasteberry and maca"
    },
    {
      id: "womens-3",
      name: "Prenatal Plus",
      price: 32.99,
      image: "/backend/Images/13.jpg",
      description: "Essential nutrients for pregnancy and breastfeeding"
    },
    {
      id: "womens-4",
      name: "Menopause Support",
      price: 36.99,
      image: "/backend/Images/13.jpg",
      description: "Natural relief for menopause symptoms and transitions"
    }
  ];

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <BenefitPageTemplate
        title="Women's Health"
        description="Specialized wellness solutions designed to support women's unique nutritional needs throughout all life stages."
        products={products}
      />
      <Footer />
    </div>
  );
};

export default WomensHealth;
