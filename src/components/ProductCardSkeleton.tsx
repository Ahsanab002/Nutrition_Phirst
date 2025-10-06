import { Card, CardContent } from "@/components/ui/card";

const ProductCardSkeleton = () => {
  return (
    <Card className="overflow-hidden border-0 shadow-leaf bg-gradient-product h-full flex flex-col rounded-leaflet animate-pulse">
      <div className="relative">
        {/* Image skeleton */}
        <div className="w-full h-64 bg-muted" />
        
        {/* Badge skeleton */}
        <div className="absolute top-3 left-3 w-16 h-6 bg-muted rounded-full" />
      </div>

      <CardContent className="p-6 space-y-4 flex-1 flex flex-col">
        {/* Rating skeleton */}
        <div className="flex items-center gap-2">
          <div className="flex items-center gap-1">
            {[...Array(5)].map((_, i) => (
              <div key={i} className="w-4 h-4 bg-muted rounded-sm" />
            ))}
          </div>
          <div className="w-20 h-4 bg-muted rounded" />
        </div>

        {/* Title and description skeleton */}
        <div className="space-y-2">
          <div className="w-3/4 h-6 bg-muted rounded" />
          <div className="w-full h-4 bg-muted rounded" />
          <div className="w-2/3 h-4 bg-muted rounded" />
        </div>

        {/* Price skeleton */}
        <div className="flex items-center gap-2">
          <div className="w-16 h-8 bg-muted rounded" />
          <div className="w-12 h-6 bg-muted rounded" />
        </div>

        {/* Button skeleton */}
        <div className="mt-auto">
          <div className="w-full h-10 bg-muted rounded" />
        </div>
      </CardContent>
    </Card>
  );
};

export default ProductCardSkeleton;