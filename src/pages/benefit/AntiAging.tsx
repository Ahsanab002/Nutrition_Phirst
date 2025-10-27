// import Header from "@/components/Header";
// import Footer from "@/components/Footer";
// import BenefitPageTemplate from "@/components/BenefitPageTemplate";

// const AntiAging = () => {
//   const products = [
//     {
//       id: "anti-aging-1",
//       name: "Retinol + Collagen Anti-Aging Cream",
//       price: 59.99,
//       originalPrice: 79.99,
//       image: "/backend/Images/retinol/retinol jpgs/retinol jpgs/1ST.jpg",
//       description: "Advanced retinol and collagen cream for wrinkle reduction and skin renewal",
//       rating: 4.9,
//       reviewCount: 445,
//       badge: "BEST SELLER"
//     },
//     {
//       id: "anti-aging-2",
//       name: "Matrixyl Peptide Complex Serum",
//       price: 69.99,
//       originalPrice: 89.99,
//       image: "/backend/Images/nad + jpgs/1ST.jpg",
//       description: "Professional matrixyl peptide complex for skin repair and collagen synthesis",
//       rating: 4.8,
//       reviewCount: 312
//     },
//     {
//       id: "anti-aging-3",
//       name: "Hyaluronic Acid Plumping Serum",
//       price: 44.99,
//       image: "/backend/Images/matrixyl/matrixyl jpgs/1ST.jpg",
//       description: "Deep hydration serum that plumps and smooths fine lines",
//       rating: 4.7,
//       reviewCount: 234,
//       badge: "NEW"
//     },
//     {
//       id: "anti-aging-4",
//       name: "Vitamin C + E Age Defense",
//       price: 52.99,
//       image: "/backend/Images/kojic jpgs/1ST.jpg",
//       description: "Powerful antioxidant blend to protect against aging",
//       rating: 4.6,
//       reviewCount: 189
//     }
//   ];

//   return (
//     <div className="min-h-screen bg-background">
//       <Header />
//       <BenefitPageTemplate
//         title="Anti-Aging"
//         description="Turn back time with our advanced anti-aging solutions featuring clinically-proven ingredients to reduce wrinkles and restore youthful skin."
//         bannerImage="/Banners/banner 7.jpg"
//         products={products}
//       />
//       <Footer />
//     </div>
//   );
// };

// export default AntiAging;

import Header from "@/components/Header";
import Footer from "@/components/Footer";
import BenefitPageTemplate from "@/components/BenefitPageTemplate";

const AntiAging = () => {
  // Only these two products on this page
  const products: any[] = [
    {
      id: "matrixyl-peptide-complex",
      name: "Matrixyl Peptide Complex Serum",
      price: 69.99,
      originalPrice: 89.99,
      image: "/backend/Images/matrixyl/matrixyl jpgs/1ST.jpg",
      description:
        "Professional Matrixyl peptide complex that supports collagen synthesis and helps reduce the appearance of fine lines.",
      rating: 4.8,
      reviewCount: 312
    },
    {
      id: "nad-nicotinamide-riboside-gummies",
      name: "NAD+ Nicotinamide Riboside Gummies",
      price: 69.99,
      originalPrice: 89.99,
      image: "/backend/Images/nad + jpgs/1ST.jpg",
      description:
        "Supports healthy aging and cellular energy by helping raise NAD+ levels.",
      rating: 4.9,
      reviewCount: 445
    }
  ];

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <BenefitPageTemplate
        title="Anti-Aging"
        description="Turn back time with our advanced anti-aging solutions featuring clinically-proven ingredients to reduce wrinkles and restore youthful skin."
        bannerImage="/Banners/banner 7.jpg"
        products={products}
      />
      <Footer />
    </div>
  );
};

export default AntiAging;
