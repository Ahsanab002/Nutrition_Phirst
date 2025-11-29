import { useParams, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import clsx from 'clsx';
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
  
  // Tabs: 0 = Details, 1 = How to take it, 2 = Ingredients
  const [activeTab, setActiveTab] = useState(0);

  // Gallery state: initialize to placeholder then update when product is available
  const [gallery, setGallery] = useState<string[]>([product ? (product.image || '/placeholder.svg') : '/placeholder.svg']);
  const [mainImage, setMainImage] = useState<string>(gallery[0]);

  useEffect(() => {
    if (!product) return;
    // product.images may be an array of URLs or objects depending on API shape
    const imgs: string[] = Array.isArray(product.images)
      ? product.images.map((i: any) => (typeof i === 'string' ? i : i.url)).filter(Boolean)
      : [];

    const finalGallery = imgs.length > 0 ? imgs : [product.image || '/placeholder.svg'];
    setGallery(finalGallery);
    setMainImage(finalGallery[0]);
  }, [product]);
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
            {/* Image / Gallery */}
            <div className="flex-shrink-0 w-full md:w-1/2 flex flex-col items-center md:items-start">
              <div className="w-full flex items-center justify-center">
                <img src={mainImage} alt={product.name} className="w-80 h-80 object-cover rounded border shadow" />
              </div>
              <div className="mt-4 flex gap-3 overflow-x-auto w-full">
                {gallery.map((src: string, idx: number) => (
                  <button key={idx} onClick={() => setMainImage(src)} className={clsx('flex-shrink-0 rounded-lg overflow-hidden border', mainImage === src ? 'ring-2 ring-primary' : 'opacity-80') }>
                    <img src={src} alt={`${product.name} ${idx + 1}`} className="w-20 h-20 object-cover" />
                  </button>
                ))}
              </div>
            </div>

            {/* Details */}
            <div className="flex-1 flex flex-col justify-between">
              <div>
                <h2 className="text-3xl font-bold mb-2 text-foreground">{product.name}</h2>

                <div className="flex items-center gap-2 mb-3">
                  <div className="flex items-center gap-1">
                    {(() => {
                      const rounded = Math.round(product.rating * 2) / 2;
                      const full = Math.floor(rounded);
                      const hasHalf = rounded - full === 0.5;
                      return [...Array(5)].map((_, i) => {
                        if (i < full) return <svg key={i} className="w-5 h-5" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" aria-hidden="true" style={{ color: '#f6c945' }}><path fill="currentColor" d="M12 .587l3.668 7.431 8.064 1.17-5.832 5.686 1.376 8.02L12 18.897l-7.276 3.997 1.376-8.02L.268 9.188l8.064-1.17z"/></svg>;
                        if (i === full && hasHalf) {
                          return (
                            <span key={i} className="relative w-5 h-5 inline-block">
                              <Star className="absolute inset-0 w-5 h-5 text-gray-300 dark:text-muted" />
                              <svg className="absolute inset-0 w-5 h-5" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" aria-hidden="true" style={{ clipPath: 'inset(0 50% 0 0)', color: '#f6c945' }}>
                                <path fill="currentColor" d="M12 .587l3.668 7.431 8.064 1.17-5.832 5.686 1.376 8.02L12 18.897l-7.276 3.997 1.376-8.02L.268 9.188l8.064-1.17z" />
                              </svg>
                            </span>
                          );
                        }
                        return <Star key={i} className="w-5 h-5 text-gray-300 dark:text-muted" />;
                      });
                    })()}
                  </div>
                  <span className="text-base text-muted-foreground">{(Math.round(product.rating*10)/10).toFixed(1)} / 5</span>
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
                  <p className="text-base text-muted-foreground">{product.description || 'High-quality supplement formulated to support your daily wellness routine. Contains premium ingredients selected for efficacy and purity.'}</p>
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

          {/* Tabs & Extended Content */}
          <div className="container mx-auto px-4 md:px-0 mt-8">
            <div className="bg-white dark:bg-background rounded-lg shadow p-6">
              <nav className="flex flex-wrap justify-center md:justify-start gap-4 mb-6">
                {['Details', 'How to Take It', 'Ingredients'].map((t, i) => (
                  <button
                    key={t}
                    onClick={() => setActiveTab(i)}
                    className={clsx(
                      'rounded-full px-6 py-3 text-lg font-medium transition-shadow duration-150 focus:outline-none',
                      activeTab === i
                        ? 'bg-primary text-white shadow-lg'
                        : 'bg-emerald-100 text-foreground hover:bg-emerald-200'
                    )}
                  >
                    {t}
                  </button>
                ))}
              </nav>

              <div className="mt-6">
                {activeTab === 0 && (
                  <div>
                    <h3 className="text-2xl font-semibold mb-3">Product Details</h3>
                    <p className="text-muted-foreground mb-4">{product.description || 'Professional-grade formula designed to support overall wellness.'}</p>
                    <h4 className="font-semibold mb-2">Key Benefits</h4>
                    <p className="text-muted-foreground mb-4">
                      Supports Healthy Digestion, Promotes Gut Wellness, Assists Natural Detox Processes, and Boosts Daily Vitality. This professional-grade formula is designed to support your overall wellness through a carefully balanced blend of nutrients and botanicals.
                    </p>
                  </div>
                )}

                {activeTab === 1 && (
                  <div>
                    <h3 className="text-2xl font-semibold mb-3">How to Take It</h3>
                    <p className="text-muted-foreground mb-4">Take ½ to 2 droppers daily. Mix in juice or water before meals or at bedtime. Start low and increase gradually for a gentle cleanse. Use for 2 weeks, then take a 1-week break and repeat if needed.</p>
                    <h4 className="font-semibold mb-2">Tips</h4>
                    <p className="text-muted-foreground">
                      Start with the lowest recommended dose. Take with food if you experience sensitivity. Consult healthcare practitioner if pregnant or nursing.
                    </p>
                  </div>
                )}

                {activeTab === 2 && (
                  <div>
                    <h3 className="text-2xl font-semibold mb-3">Ingredients</h3>
                    <p className="text-muted-foreground mb-4">Black Walnut Hulls, Wormwood Herb, Clove Bud Extract, Pumpkin Seed Oil, Garlic Extract, Turmeric Root, Oregano Oil, Fennel Seed, Soursop Leaf, Pau D'Arco Bark, Vegetable Glycerin, Distilled Water.</p>
                    <p className="text-sm text-muted-foreground italic">Allergen Information: Contains tree nuts (Black Walnut). Free From: Gluten, Soy, Yeast, Milk, Lactose, Artificial Flavors, or Preservatives.</p>
                  </div>
                )}
              </div>
            </div>

            {/* How It Works & The Goods Inside */}
            <div className="grid md:grid-cols-2 gap-8 mt-8">
              <div className="bg-white dark:bg-background rounded-lg shadow p-8">
                <h3 className="text-2xl font-semibold mb-4">How It Works</h3>
                <p className="text-muted-foreground mb-4">Our liquid herbal formula is absorbed quickly, delivering concentrated botanicals to support digestive balance and natural detox pathways. A targeted blend of herbs works synergistically to assist the body’s cleansing mechanisms while supporting gut comfort and nutrient absorption.</p>
                <ul className="list-disc list-inside text-muted-foreground">
                  <li>Fast absorption for quicker results</li>
                  <li>Synergistic herbal blend to support gut balance</li>
                  <li>Gentle, plant-based cleansing approach</li>
                </ul>
              </div>

              <div className="bg-white dark:bg-background rounded-lg shadow p-8">
                <h3 className="text-2xl font-semibold mb-4">The Goods Inside</h3>
                <div className="grid grid-cols-3 gap-4">
                  <div className="text-center">
                    <div className="w-16 h-16 mx-auto rounded-full bg-emerald-100 flex items-center justify-center mb-2">🌿</div>
                    <h4 className="font-semibold">Black Walnut</h4>
                  </div>
                  <div className="text-center">
                    <div className="w-16 h-16 mx-auto rounded-full bg-emerald-100 flex items-center justify-center mb-2">⚕️</div>
                    <h4 className="font-semibold">Wormwood</h4>
                  </div>
                  <div className="text-center">
                    <div className="w-16 h-16 mx-auto rounded-full bg-emerald-100 flex items-center justify-center mb-2">🧪</div>
                    <h4 className="font-semibold">Oregano Oil</h4>
                  </div>
                </div>
                <p className="mt-4 text-muted-foreground">Vegan • Non‑GMO • Gluten‑Free • Crafted in a GMP‑Certified Facility</p>
              </div>
            </div>

            {/* Reviews summary */}
            <div className="bg-white dark:bg-background rounded-lg shadow p-6 mt-8">
              <h3 className="text-2xl font-semibold mb-4">Reviews</h3>
              <div className="grid md:grid-cols-3 gap-6">
                <div>
                  <div className="text-4xl font-bold text-foreground">{(Math.round((product.rating||4)*10)/10).toFixed(1)}</div>
                  <div className="text-sm text-muted-foreground">{product.reviewCount || 120} Reviews</div>
                </div>
                <div className="md:col-span-2">
                  {[5,4,3,2,1].map((star) => {
                    const count = Math.round((star/5) * (product.reviewCount || 120));
                    const pct = Math.round((count / (product.reviewCount || 120)) * 100);
                    return (
                      <div key={star} className="flex items-center gap-3 mb-2">
                        <div className="w-10 text-sm">{star} stars</div>
                        <div className="flex-1 bg-muted h-3 rounded overflow-hidden">
                          <div className="bg-primary h-3" style={{ width: `${pct}%` }} />
                        </div>
                        <div className="w-12 text-sm text-muted-foreground">{count}</div>
                      </div>
                    )
                  })}
                </div>
              </div>

              <div className="mt-6">
                <div className="flex gap-3 overflow-x-auto">
                  {Array.from({length:6}).map((_,i)=> (
                    <img key={i} src="/placeholder.svg" alt={`review-${i}`} className="w-24 h-24 object-cover rounded" />
                  ))}
                </div>
              </div>
            </div>

            {/* Footer features */}
            <div className="grid md:grid-cols-3 gap-6 mt-8 text-center">
              <div className="bg-white dark:bg-background rounded-lg shadow p-6">
                <div className="text-3xl mb-2">🚚</div>
                <h4 className="font-semibold">Fast Shipping</h4>
                <p className="text-sm text-muted-foreground">Delivered within 2-3 business days for a flat rate of $6.99 and free shipping over $49.</p>
              </div>
              <div className="bg-white dark:bg-background rounded-lg shadow p-6">
                <div className="text-3xl mb-2">🔁</div>
                <h4 className="font-semibold">Easy Returns</h4>
                <p className="text-sm text-muted-foreground">If you're not satisfied, you can return the product anytime within 30 days.</p>
              </div>
              <div className="bg-white dark:bg-background rounded-lg shadow p-6">
                <div className="text-3xl mb-2">✉️</div>
                <h4 className="font-semibold">Questions?</h4>
                <p className="text-sm text-muted-foreground">Email us at <a href="mailto:hello@nutritionphirst.com" className="text-primary underline">hello@nutritionphirst.com</a> and we'll be happy to help you.</p>
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
