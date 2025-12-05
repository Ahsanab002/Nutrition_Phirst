import Header from "@/components/Header";
import Footer from "@/components/Footer";
import BenefitPageTemplate from "@/components/BenefitPageTemplate";

const GutHealth = () => {
  const products = [
    {
      id: "parasite-cleanse",
      name: "Parasite Cleanse Formula",
      description: "Natural parasite cleanse with herbs",
      price: 44.99,
      originalPrice: 59.99,
      rating: 5,
      reviewCount: 12,
      image: "/backend/Images/parasite/parasite_jpgs/1st.jpg",
      badge: "Featured",
    },
    {
      id: "methylene-blue",
      name: "Methylene Blue Cognitive Enhancement",
      description: "Cognitive enhancement supplement with methylene blue",
      price: 79.99,
      originalPrice: 99.99,
      rating: 5,
      reviewCount: 12,
      image: "https://res.cloudinary.com/dvhethden/image/upload/v1764802405/Images/MB.png",
      badge: "Featured",
    },
  ];

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <BenefitPageTemplate
        title="Gut Health"
        description="Advanced digestive wellness solutions to support your gut microbiome, improve digestion, and enhance overall digestive comfort."
        bannerImage="https://res.cloudinary.com/dvhethden/image/upload/v1764802509/banner_2_dunrip.jpg"
        products={products}
      />
      <Footer />
    </div>
  );
};

export default GutHealth;
