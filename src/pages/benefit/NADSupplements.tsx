import Header from "@/components/Header";
import Footer from "@/components/Footer";
import BenefitPageTemplate from "@/components/BenefitPageTemplate";

const NADSupplements = () => {
  const products = [
    {
      id: "nad-gummies",
      name: "NAD+ Nicotinamide Riboside ",
      description: "NAD+ anti-aging for longevity",
      price: 89.99,
      originalPrice: 119.99,
      rating: 5,
      reviewCount: 12,
      image: "/backend/Images/nad_jpgs/1st.jpg",
      badge: "Featured",
    }
  ];

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <BenefitPageTemplate
        title="Energy"
        description="Enhance your cellular energy and support healthy aging with our premium NAD+ supplements for longevity and vitality."
        bannerImage="https://res.cloudinary.com/dvhethden/image/upload/v1764802510/banner_9_r9xptp.jpg"
        products={products}
      />
      <Footer />
    </div>
  );
};

export default NADSupplements;