import { Link } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import ProductCard from "./ProductCard";
import { Button } from "@/components/ui/button";
import { productService } from "@/services/productService";
import { Product } from "@/data/products";
import { Loader2 } from "lucide-react";

const ProductGrid = () => {
  const { data: products = [], isLoading } = useQuery({
    queryKey: ['featured-products'],
    queryFn: async () => {
      const response = await productService.getProducts({ limit: 6 });
      if (response.success) {
        return response.products
          .filter(p => p.isFeatured)
          .slice(0, 3)
          .map(p => productService.convertToFrontendProduct(p));
      }
      return [];
    },
    staleTime: 1000 * 60 * 5, // 5 minutes
    gcTime: 1000 * 60 * 10, // 10 minutes (formerly cacheTime)
    retry: 1,
  }) as { data: Product[], isLoading: boolean };

  return (
    <section className="py-16">
      <div className="container mx-auto px-4 lg:px-8">
        <div className="text-center mb-10">
          <h2 className="text-3xl md:text-4xl font-serif font-bold text-foreground">
            Targeted Formulas. Real Results.
          </h2>
          <p className="text-muted-foreground mt-3 max-w-2xl mx-auto">
            Thoughtfully designed products to help you focus better, feel calmer, and look your best.
          </p>
        </div>

        {/* Product Grid */}
        {isLoading ? (
          <div className="flex justify-center py-12">
            <Loader2 className="h-8 w-8 animate-spin text-muted-foreground" />
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 items-stretch">
            {products.map((product) => (
              <div className="h-full" key={product.id}>
                <ProductCard product={product} />
              </div>
            ))}
          </div>
        )}

        <div className="text-center mt-10">
          <Link to="/products">
            <Button variant="luxury" size="lg" className="min-w-48">
              VIEW ALL PRODUCTS
            </Button>
          </Link>
        </div>
      </div>
    </section>
  );
};
export default ProductGrid;
