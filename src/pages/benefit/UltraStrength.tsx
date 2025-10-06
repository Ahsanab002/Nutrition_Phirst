import Header from "@/components/Header";
import Footer from "@/components/Footer";
import BenefitPageTemplate from "@/components/BenefitPageTemplate";

const UltraStrength = () => {
  const products = [
    {
      id: "ultra-1",
      name: "Ultra Strength Multivitamin",
      price: 44.99,
      originalPrice: 54.99,
      image: "/backend/Images/13.jpg",
      description: "Maximum potency multivitamin for comprehensive nutrition"
    },
    {
      id: "ultra-2",
      name: "Mega Vitamin D3",
      price: 29.99,
      image: "/backend/Images/13.jpg",
      description: "High-dose vitamin D3 for optimal bone and immune health"
    },
    {
      id: "ultra-3",
      name: "Super B-Complex",
      price: 32.99,
      image: "/backend/Images/13.jpg",
      description: "Advanced B-vitamin complex for energy and metabolism"
    },
    {
      id: "ultra-4",
      name: "Ultra Omega-3",
      price: 39.99,
      image: "/backend/Images/13.jpg",
      description: "Concentrated omega-3 fatty acids for heart and brain health"
    }
  ];

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <BenefitPageTemplate
        title="Ultra Strength Softgels"
        description="Maximum potency supplements in easy-to-swallow softgel form, delivering concentrated nutrients for optimal health and wellness."
        products={products}
      />
      <Footer />
    </div>
  );
};

export default UltraStrength;
