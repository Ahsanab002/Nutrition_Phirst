import React from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { Star } from "lucide-react";
import { useCart } from "@/contexts/CartContext";

interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  originalPrice?: number;
  rating: number;
  reviewCount: number;
  image: string;
  imageSrcSet?: string;
  fullImage?: string;
  slug?: string;
  badge?: string;
}

interface ProductCardProps {
  product: Product;
  onAddToCart?: (product: Product) => void;
}

const ProductCard = ({ product, onAddToCart }: ProductCardProps) => {
  const { addItem, isInCart, getItemQuantity } = useCart();
  const navigate = useNavigate();

  const discountPercentage = product.originalPrice
    ? Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)
    : 0;

  const handleAddToCart = () => {
    if (onAddToCart) onAddToCart(product);
    else addItem(product);
  };

  // ...existing code...

  return (
    <Card className="group overflow-hidden border-0 shadow-leaf hover:shadow-hover transition-elegant bg-gradient-product h-full flex flex-col rounded-leaflet">
      <div className="relative">
        <img
          src={product.image}
          {...(product.imageSrcSet ? { srcSet: product.imageSrcSet } : {})}
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
          alt={product.name}
          className="w-full h-64 object-cover group-hover:scale-105 transition-elegant"
          loading="lazy"
          decoding="async"
          width={400}
          height={256}
          onError={(e) => {
            e.currentTarget.src = '/placeholder.svg';
          }}
        />
        {product.badge && (
          <Badge className="absolute top-3 left-3 chip rounded-full">
            {product.badge}
          </Badge>
        )}
        {discountPercentage > 0 && (
          <Badge className="absolute top-3 right-3 chip rounded-full">
            {discountPercentage}% OFF
          </Badge>
        )}
      </div>

      <CardContent className="p-6 space-y-4 flex-1 flex flex-col">
        {/* Reviews */}
        <div className="flex items-center gap-2">
          <div className="flex items-center gap-1">
            {[...Array(5)].map((_, i) => (
              <Star
                key={i}
                className={`w-4 h-4 ${
                  i < Math.floor(product.rating)
                    ? "fill-primary text-primary"
                    : "text-muted-foreground"
                }`}
              />
            ))}
          </div>
          <span className="text-sm text-muted-foreground">
            {product.reviewCount} Reviews
          </span>
        </div>

        {/* Info */}
        <div className="space-y-2">
          <h3 className="font-serif text-xl font-semibold text-foreground">
            {product.name}
          </h3>
          <p className="text-sm text-muted-foreground line-clamp-2">
            {product.description}
          </p>
        </div>

        {/* Pricing */}
        <div className="flex items-center gap-2">
          <span className="text-2xl font-bold text-foreground">${product.price}</span>
          {product.originalPrice && (
            <span className="text-lg text-muted-foreground line-through">
              ${product.originalPrice}
            </span>
          )}
        </div>

        {/* Actions */}
        <div className="mt-auto flex flex-col gap-2">
          {isInCart(product.id) ? (
            <div className="space-y-2">
              <div className="text-center text-sm text-green-600 font-medium">
                ✓ In Cart ({getItemQuantity(product.id)})
              </div>
              <Button variant="outline" size="lg" className="w-full" onClick={handleAddToCart}>
                ADD MORE
              </Button>
            </div>
          ) : (
            <Button variant="premium" size="lg" className="w-full" onClick={handleAddToCart}>
              ADD TO CART
            </Button>
          )}
          <Button
            variant="minimal"
            size="sm"
            className="w-full"
            onClick={() => navigate(`/product/${product.slug ?? product.id}`)}
          >
            Open View
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default React.memo(ProductCard);
