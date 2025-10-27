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
    reviewCount: 12,
    image: "/backend/Images/kojic jpgs/1ST.jpg",
    badge: "Best Seller",
  },
  {
    id: "parasite-cleanse",
    name: "Parasite Cleanse Formula",
    description: "Natural parasite cleanse with herbs",
    price: 44.99,
    originalPrice: 59.99,
    rating: 5,
    reviewCount: 12,
    image: "/backend/Images/parasite/parasite jpgs/1st.jpg",
    badge: "Best Seller",
  },
  {
    id: "methylene-blue",
    name: "Methylene Blue Cognitive Enhancement",
    description: "Cognitive enhancement supplement with methylene blue",
    price: 79.99,
    originalPrice: 99.99,
    rating: 5,
    reviewCount: 12,
    image: "/backend/Images/methylene/methylene jpgs/1ST.jpg",
    badge: "Best Seller",
  },
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