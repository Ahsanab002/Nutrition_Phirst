import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import ProductCard from "@/components/ProductCard";
import { useScrollToTop } from "@/hooks/use-scroll-to-top";

interface BenefitPageTemplateProps {
  title: string;
  description: string;
  products: Array<{
    id: string;
    name: string;
    price: number;
    originalPrice?: number;
    image: string;
    description: string;
    rating: number;
    reviewCount: number;
    badge?: string;
  }>;
}

const BenefitPageTemplate = ({ title, description, products }: BenefitPageTemplateProps) => {
  useScrollToTop();

  return (
    <div className="min-h-screen bg-background">
      {/* Hero Banner */}
      <section className="relative w-full">
        {/* Background image */}
        <div
          className="w-full h-[360px] md:h-[460px] lg:h-[520px] bg-cover bg-center"
          style={{
            backgroundImage: "url('/backend/Images/13.jpg')",
          }}
        />

        {/* Overlay content */}
        <div className="absolute inset-0 flex items-center">
          <div className="container mx-auto px-4 lg:px-8">
            <div
              className="max-w-xl bg-black/10 backdrop-blur-[2px] rounded-xl p-6 md:p-8 md:pb-12 lg:pb-16 shadow-product translate-x-[-8px] md:translate-x-[-16px] lg:translate-x-[-24px]"
            >
              <h1 className="text-3xl md:text-4xl font-serif font-bold text-foreground mb-3">
                {title}
              </h1>
              <p className="text-base md:text-lg text-muted-foreground mb-6">
                {description}
              </p>
              <div className="flex flex-wrap gap-3">
                <Link to="/products">
                  <Button variant="premium" size="lg">Shop All Products</Button>
                </Link>
                <a href="/backend/Images/13.jpg" target="_blank" rel="noreferrer">
                  <Button variant="minimal" size="lg">View Collection</Button>
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Products Section */}
      <section className="py-16 bg-background">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-display font-semibold text-foreground tracking-tight mb-4">
              {title} Products
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Discover our premium {title.toLowerCase()} solutions designed to support your wellness journey.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {products.map((product) => (
              <ProductCard
                key={product.id}
                product={product}
              />
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default BenefitPageTemplate;
