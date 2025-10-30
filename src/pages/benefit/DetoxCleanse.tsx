import Header from "@/components/Header";
import Footer from "@/components/Footer";
import BenefitPageTemplate from "@/components/BenefitPageTemplate";

const DetoxCleanse = () => {
  const products = [
    {
      id: "detox-1",
      name: "EDTA Chelation Therapy Supplement",
      price: 54.99,
      originalPrice: 74.99,  
      image: "/backend/Images/Edta/edta_jpgs/1st.jpg",
      description: "EDTA chelation supplement for heavy metal detoxification and cardiovascular support",
      rating: 4.7,
      reviewCount: 189,
      badge: "BEST SELLER"
    },
    {
      id: "detox-2",
      name: "Parasite Cleanse Formula",
      price: 44.99,
      originalPrice: 59.99,
      image: "/backend/Images/parasite/parasite_jpgs/1st.jpg",
      description: "Natural parasite cleanse formula with powerful herbal ingredients",
      rating: 4.6,
      reviewCount: 156
    }
  ];

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <BenefitPageTemplate
        title="Detox & Cleanse"
        description="Purify and rejuvenate your body with our natural detox and cleanse solutions designed to eliminate toxins and support optimal health."
        bannerImage="/Banners/banner 6.jpg"
        products={products}
      />
      <Footer />
    </div>
  );
};

export default DetoxCleanse;