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
      image: "/backend/Images/kojic_jpgs/1ST.jpg",
      badge: "Featured",
    },
    {
      id: "matrixyl-peptide-complex",
      name: "Matrixyl 3000+ Argireline Peptide Cream",
      price: 69.99,
      originalPrice: 89.99,
      image: "/backend/Images/matrixyl/1st.png",
      description:
        "Professional Matrixyl peptide complex that supports collagen synthesis and helps reduce the appearance of fine lines.",
      rating: 4.8,
      reviewCount: 312
    },
    {
      id: "retinol-collagen-cream",
      name: "Retinol + Collagen Anti-Aging Cream",
      description: "Anti-aging cream with retinol and collagen",
      price: 59.99,
      originalPrice: 79.99,
      rating: 5,
      reviewCount: 12,
      image: "/backend/Images/retinol/retinoljpgs/retinoljpgs/1ST.jpg",
      badge: "Featured",
    },
  ];

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <BenefitPageTemplate
        title="Skincare"
        description="Transform your skin with our premium skincare collection featuring scientifically-backed ingredients for healthy, radiant skin."
        bannerImage="/Banners/banner 10.jpg"
        products={products}
      />
      <Footer />
    </div>
  );
};

export default Skincare;