import Header from "@/components/Header";
import Footer from "@/components/Footer";
import BenefitPageTemplate from "@/components/BenefitPageTemplate";

const NADSupplements = () => {
  const products = [
    {
      id: "nad-gummies",
      name: "NAD+ Nicotinamide Riboside Gummies",
      description: "NAD+ anti-aging gummies for longevity",
      price: 89.99,
      originalPrice: 119.99,
      rating: 5,
      reviewCount: 12,
      image: "/backend/Images/nad + jpgs/nad+gummies-min.jpg",
      badge: "Featured",
    }
  ];

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <BenefitPageTemplate
        title="NAD+ Supplements"
        description="Enhance your cellular energy and support healthy aging with our premium NAD+ supplements for longevity and vitality."
        bannerImage="/Banners/banner 9.jpg"
        products={products}
      />
      <Footer />
    </div>
  );
};

export default NADSupplements;