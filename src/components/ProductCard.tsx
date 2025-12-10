import React from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { Star } from "lucide-react";
import { useCart } from "@/contexts/CartContext";
import { EnhancedImage } from "@/components/ui/enhanced-image";

export interface Product {
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

  return (
    <div className="group overflow-hidden h-full flex flex-col">
      <div className="relative">
        <EnhancedImage
          src={product.image}
          /* {...(product.imageSrcSet ? { srcSet: product.imageSrcSet } : {})} */
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
          alt={product.name}
          className="w-full h-56 object-contain group-hover:scale-105 transition-elegant p-6"
          width={400}
          height={256}
          quality={85}
          loading="lazy"
          blur
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

      <div className="flex-1 flex flex-col items-center text-center mt-4 bg-gradient-product px-6 py-4 rounded-t-3xl">
        {/* Title */}
        <h3 className="font-serif text-2xl font-semibold text-foreground mb-3">
          {product.name}
        </h3>

        {/* Reviews - centered and magenta stars */}
        <div className="flex flex-col items-center gap-2 mb-3">
          <div className="flex items-center gap-2">
            {(() => {
              const rounded = Math.round(product.rating * 2) / 2; // nearest 0.5
              const full = Math.floor(rounded);
              const hasHalf = rounded - full === 0.5;
              return [...Array(5)].map((_, i) => {
                if (i < full) {
                  return (
                    <svg key={i} className="w-5 h-5" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" aria-hidden="true" style={{ color: '#d63384' }}>
                      <path fill="currentColor" d="M12 .587l3.668 7.431 8.064 1.17-5.832 5.686 1.376 8.02L12 18.897l-7.276 3.997 1.376-8.02L.268 9.188l8.064-1.17z" />
                    </svg>
                  );
                }
                if (i === full && hasHalf) {
                  return (
                    <span key={i} className="relative w-5 h-5 inline-block">
                      <Star className="absolute inset-0 w-5 h-5 text-muted-foreground" fill="none" />
                      <svg className="absolute inset-0 w-5 h-5" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" aria-hidden="true" style={{ clipPath: 'inset(0 50% 0 0)', color: '#d63384' }}>
                        <path fill="currentColor" d="M12 .587l3.668 7.431 8.064 1.17-5.832 5.686 1.376 8.02L12 18.897l-7.276 3.997 1.376-8.02L.268 9.188l8.064-1.17z" />
                      </svg>
                    </span>
                  );
                }
                return <Star key={i} className="w-5 h-5 text-muted-foreground" fill="none" />;
              });
            })()}
          </div>
          <span className="text-sm text-muted-foreground">{product.reviewCount} Reviews</span>
        </div>

        {/* Description */}
        <p className="text-sm text-muted-foreground mb-4 line-clamp-3">
          {product.description}
        </p>

        {/* Price */}
        <div className="mb-4">
          <div className="text-2xl font-semibold text-foreground">${product.price}</div>
          {product.originalPrice && (
            <div className="text-sm text-muted-foreground line-through">${product.originalPrice}</div>
          )}
        </div>

        {/* Learn more link */}
        <a
          className="text-[#c81b6a] underline font-medium hover:text-[#a01554] transition-colors"
          href={`/product/${product.slug ?? product.id}`}
          onClick={(e) => {
            e.preventDefault();
            navigate(`/product/${product.slug ?? product.id}`);
          }}
        >
          LEARN MORE
        </a>
      </div>
    </div>
  );
};

export default React.memo(ProductCard);
