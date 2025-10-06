import { useParams, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { Star } from "lucide-react";
import { Button } from "@/components/ui/button";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { useCart } from "@/contexts/CartContext";
import { productService } from "@/services/productService";

const ProductDetailsPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { addItem } = useCart();
  const [quantity, setQuantity] = useState(1);
  const { data: productData, isLoading, isError } = useQuery<any>({
    queryKey: ['product', id],
    queryFn: async () => {
      if (!id) throw new Error('Missing id');
      const resp = await productService.getProductBySlug(id as string);
      if (!resp.success) throw new Error('Product not found');
      return productService.convertToFrontendProduct(resp.product);
    },
    staleTime: 1000 * 60 * 5, // 5 minutes
    retry: 1,
  });

  const product = productData || null;

  if (isLoading) {
    return (
      <div className="min-h-screen bg-background">
        <Header />
        <main className="container mx-auto px-4 md:px-0 py-16">
          <div className="flex flex-col items-center justify-center min-h-[40vh]">
            <p className="text-lg text-muted-foreground mb-4">Loading product...</p>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  if (isError || !product) {
    return (
      <div className="min-h-screen bg-background">
        <Header />
        <main className="container mx-auto px-4 md:px-0 py-16">
          <div className="flex flex-col items-center justify-center min-h-[40vh]">
            <p className="text-lg text-muted-foreground mb-4">Product not found.</p>
            <Button onClick={() => navigate(-1)}>Go Back</Button>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  const discountPercentage = product.originalPrice
    ? Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)
    : 0;

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main>
        <div className="container mx-auto py-10 px-4 md:px-0">
          <div className="flex flex-col md:flex-row gap-10 bg-white dark:bg-background rounded-lg shadow-lg p-8">
            {/* Image */}
            <div className="flex-shrink-0 w-full md:w-1/2 flex items-center justify-center">
              <img src={product.image} alt={product.name} className="w-80 h-80 object-cover rounded border shadow" />
            </div>

            {/* Details */}
            <div className="flex-1 flex flex-col justify-between">
              <div>
                <h2 className="text-3xl font-bold mb-2 text-foreground">{product.name}</h2>

                <div className="flex items-center gap-2 mb-3">
                  <div className="flex items-center gap-1">
                    {[...Array(5)].map((_, i) => (
                      <Star
                        key={i}
                        className={`w-5 h-5 ${i < Math.floor(product.rating) ? "fill-yellow-400 text-yellow-400" : "text-gray-300 dark:text-muted"}`}
                      />
                    ))}
                  </div>
                  <span className="text-base text-muted-foreground">{product.rating} / 5</span>
                  <span className="text-sm text-muted-foreground ml-2">({product.reviewCount} Reviews)</span>
                </div>

                <div className="flex items-center gap-4 mb-4">
                  <span className="text-3xl font-bold text-primary">${product.price}</span>
                  {product.originalPrice && (
                    <span className="text-lg text-muted-foreground line-through">${product.originalPrice}</span>
                  )}
                  {discountPercentage > 0 && (
                    <span className="text-green-600 font-semibold">-{discountPercentage}%</span>
                  )}
                </div>

                <div className="mb-4">
                  <h3 className="font-semibold text-lg mb-1 text-foreground">Description</h3>
                  <p className="text-base text-muted-foreground">{product.description}</p>
                </div>

                {/* Dummy benefits to match style */}
                <div className="mb-4">
                  <h3 className="font-semibold text-lg mb-1 text-foreground">Benefits</h3>
                  <ul className="list-disc list-inside text-base text-muted-foreground space-y-1">
                    <li>Spacious storage for shirts, clothes, and blankets</li>
                    <li>Durable double zipper for secure closure</li>
                    <li>Transparent window for easy viewing</li>
                    <li>Lightweight and easy to carry</li>
                    <li>Protects from dust and moisture</li>
                  </ul>
                </div>

                <div className="flex items-center gap-4 mb-4">
                  <span className="text-gray-600 dark:text-muted">Quantity:</span>
                  <div className="flex items-center border rounded px-2 py-1 bg-muted">
                    <button className="px-2 text-lg font-bold text-primary disabled:opacity-50" onClick={() => setQuantity(q => Math.max(1, q - 1))} disabled={quantity === 1}>-</button>
                    <span className="px-3 text-base text-foreground">{quantity}</span>
                    <button className="px-2 text-lg font-bold text-primary" onClick={() => setQuantity(q => q + 1)}>+</button>
                  </div>
                </div>
              </div>

              <div className="flex gap-4 mt-4">
                <Button variant="premium" size="lg" className="flex-1" onClick={() => { for (let i = 0; i < quantity; i++) addItem(product); }}>
                  Buy Now
                </Button>
                <Button variant="outline" size="lg" className="flex-1" onClick={() => { for (let i = 0; i < quantity; i++) addItem(product); }}>
                  Add to Cart
                </Button>
              </div>

              <div className="mt-8">
                <Button variant="ghost" onClick={() => navigate(-1)}>Back to Products</Button>
              </div>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default ProductDetailsPage;
