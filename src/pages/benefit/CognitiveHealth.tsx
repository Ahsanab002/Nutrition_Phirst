import Header from "@/components/Header";
import Footer from "@/components/Footer";
import BenefitPageTemplate from "@/components/BenefitPageTemplate";

const CognitiveHealth = () => {
  const products = [
    // {
    //   id: "cognitive-1",
    //   name: "Methylene Blue Cognitive Enhancement",
    //   price: 79.99,
    //   originalPrice: 99.99,
    //   image: "/backend/Images/methylene/methylene jpgs/1ST.jpg",
    //   description: "Cognitive enhancement supplement with methylene blue",
    //   rating: 5.0,
    //   reviewCount: 12,
    //   badge: "FEATURED"
    // },
    {
      id: "cognitive-2",
      name: "Neuro Phirst Methylene Blue Capsules",
      price: 74.99,
      originalPrice: 94.99,
      image: "https://res.cloudinary.com/dvhethden/image/upload/v1764966090/1st_zblcts.jpg",
      description: "Nootropic blend for brain enhancement",
      rating: 5.0,
      reviewCount: 12
    }
  ];

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <BenefitPageTemplate
        title="Brain Health"
        description="Optimize your mental performance with our cutting-edge cognitive support supplements designed for enhanced focus, memory, and brain health."
        bannerImage="/Banners/Banner17.jpg"
        products={products}
      />
      <Footer />
    </div>
  );
};

export default CognitiveHealth;
