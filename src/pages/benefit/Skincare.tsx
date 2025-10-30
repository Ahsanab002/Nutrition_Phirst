import Header from "@/components/Header";
import Footer from "@/components/Footer";
import BenefitPageTemplate from "@/components/BenefitPageTemplate";

const Skincare = () => {
  const products = [
    {
      id: "kojic-acid-serum",
      name: "Kojic Acid Skin Brightening Serum",
      description: "Brightening serum with kojic acid for dark spots",
      price: 49.99,
      originalPrice: 69.99,
      rating: 5,
      reviewCount: 12,
      image: "/backend/Images/kojic_jpgs/kojic acid serum-min.jpg",
      badge: "Featured",
    },
    {
      id: "multivitamin-complex",
      name: "Multivitamin Complex",
      description: "Complete daily multivitamin",
      price: 24.99,
      rating: 5,
      reviewCount: 12,
      image: "/backend/Images/listings/multivitamin.jpg",
      badge: "Featured",
    },
    {
      id: "retinol-collagen-cream",
      name: "Retinol + Collagen Anti-Aging Cream",
      description: "Anti-aging cream with retinol and collagen",
      price: 59.99,
      originalPrice: 79.99,
      rating: 5,
      reviewCount: 12,
      image: "/backend/Images/retinol/retinoljpgs/1st.jpg",
      badge: "Featured",
    },
  ];

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <BenefitPageTemplate
        title="Skincare"
        description="Transform your skin with our premium skincare collection featuring scientifically-backed ingredients for healthy, radiant skin."
        bannerImage="/Banners/banner 16.jpg"
        products={products}
      />
      <Footer />
    </div>
  );
};

export default Skincare;