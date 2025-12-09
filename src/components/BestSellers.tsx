import React from 'react';
import { useQuery } from '@tanstack/react-query';
import ProductCard from './ProductCard';
import ProductCardSkeleton from './ProductCardSkeleton';
import { useImagePreload } from '@/hooks/useImagePreload';
import type { Product } from './ProductCard';

const bestSellerData: Product[] = [
  {
    id: "kojic-acid-serum",
    name: "Kojic Acid Skin Brightening Serum",
    description: "Brightening serum with kojic acid for dark spots",
    price: 49.99,
    originalPrice: 69.99,
    rating: 5,
    reviewCount: 200,
    image: "https://res.cloudinary.com/dvhethden/image/upload/v1765319112/Kojic_uqxjs1.png",
    badge: "Best Seller",
  },
  {
    id: "parasite-cleanse",
    name: "Herbal Parasite Cleanse Drops",
    description: "Natural parasite cleanse with herbs",
    price: 44.99,
    originalPrice: 59.99,
    rating: 5,
    reviewCount: 32,
    image: "https://res.cloudinary.com/dvhethden/image/upload/v1765314862/Parasite_din944.png",
    badge: "Best Seller",
  },
  {
      id: "cognitive-2",
      name: "Neuro Phirst Methylene Blue",
      price: 34.00,
      originalPrice: 40.00,
      image: "https://res.cloudinary.com/dvhethden/image/upload/v1765321019/NeuroP_bzv53p.png",
      description: "Nootropic blend for brain enhancement",
      rating: 5.0,
      reviewCount: 50
    }
];

const BestSellers = () => {
  // Using React Query for caching and loading states
  const { data: bestSellerProducts, isLoading } = useQuery<Product[]>({
    queryKey: ['bestSellers'],
    queryFn: async () => bestSellerData,
    gcTime: 30 * 60 * 1000, // Cache for 30 minutes
  });

  // Preload images
  useImagePreload(bestSellerData.map(product => product.image));

  return (
    <section className="py-16 bg-background">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-[#c81b6a] text-3xl md:text-4xl font-serif mb-3">Best Sellers</h2>
          <p className="text-muted-foreground text-lg">Our most-loved products</p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {isLoading ? (
            <>
              <ProductCardSkeleton />
              <ProductCardSkeleton />
              <ProductCardSkeleton />
            </>
          ) : (
            bestSellerProducts?.map((product) => (
              <ProductCard 
                key={product.id} 
                product={product}
              />
            ))
          )}
        </div>
      </div>
    </section>
  );
};

export default BestSellers;
