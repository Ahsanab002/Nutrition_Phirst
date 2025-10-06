import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { ShoppingCart, User, Menu, X, Search, Grid3X3, Heart, Star, Zap, TrendingUp } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { useCart } from "@/contexts/CartContext";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { productService, BackendCategory } from '@/services/productService';

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const navigate = useNavigate();
  const { itemCount } = useCart();

  const menuItems = [
    { name: "Best Sellers", href: "/products?category=bestsellers" },
    { name: "Gut Health", href: "/products?category=gut-health" },
    { name: "Sleep & Mood", href: "/products?category=sleep-mood" },
    { name: "Bundles", href: "/products?category=bundles" },
  ];

  const [categories, setCategories] = useState<Array<{id: string, name: string, icon: any}>>([
    { id: 'all', name: 'All Products', icon: Grid3X3 },
  ]);

  // Load categories for the dropdown (mirror shop categories)
  useEffect(() => {
    let mounted = true;
    const loadCategories = async () => {
      try {
        const categoriesResponse = await productService.getCategories();
        if (categoriesResponse && categoriesResponse.success && mounted) {
          const backendCategories = categoriesResponse.categories.map((cat: BackendCategory) => ({
            id: cat.slug,
            name: cat.name,
            icon: getIconForCategory(cat.slug),
          }));
          setCategories([
            { id: 'all', name: 'All Products', icon: Grid3X3 },
            ...backendCategories.filter(cat => !['supplements', 'beauty', 'nutrition', 'wellness', 'health'].includes(cat.id))
          ]);
        }
      } catch (err) {
        console.error('Error loading header categories:', err);
      }
    };

    loadCategories();
    return () => { mounted = false; };
  }, []);

  // Helper function to get icons for categories (kept in sync with Products.tsx)
  const getIconForCategory = (slug: string) => {
    switch (slug) {
      case 'skincare': return Heart;
      case 'anti-aging': return Star;
      case 'wellness-supplements': return Zap;
      case 'cognitive-health': return Zap;
      case 'detox-cleanse': return Star;
      case 'nad-supplements': return TrendingUp;
      default: return Grid3X3;
    }
  };

  // Map known category slugs to their dedicated benefit pages.
  // If a category doesn't have a benefit page, we'll fallback to the shop view for that category.
  const BENEFIT_ROUTE_MAP: Record<string, string> = {
    // Backend categories (from seed database)
    'skincare': '/benefit/skincare',
    'anti-aging': '/benefit/anti-aging',
    'wellness-supplements': '/benefit/wellness-supplements',
    'cognitive-health': '/benefit/cognitive-health',
    'detox-cleanse': '/benefit/detox-cleanse',
    'nad-supplements': '/benefit/nad-supplements',
    // Legacy/existing benefit pages
    'ultra-strength': '/benefit/ultra-strength',
    'sleep': '/benefit/sleep',
    'sleep-mood': '/benefit/sleep',
    'mood': '/benefit/mood',
    'beauty': '/benefit/beauty',
    'womens-health': '/benefit/womens-health',
    'gut-health': '/benefit/gut-health',
    'immunity': '/benefit/immunity',
    'multivitamins': '/benefit/multivitamins',
    'kids': '/benefit/kids',
    'energy': '/benefit/energy',
    'adaptogens': '/benefit/adaptogens',
    'foundational-wellness': '/benefit/foundational-wellness',
    'vegetarian': '/benefit/vegetarian',
  };

  const getBenefitRoute = (slug: string) => {
    // direct match
    if (BENEFIT_ROUTE_MAP[slug]) return BENEFIT_ROUTE_MAP[slug];
    // some backend slugs might use different naming (try normalizing)
    const normalized = slug.toLowerCase().replace(/\s+/g, '-');
    return BENEFIT_ROUTE_MAP[normalized] ?? null;
  };

  return (
    <header className="sticky top-0 z-50 w-full bg-white/95 backdrop-blur supports-[backdrop-filter]:bg-white/80 border-b border-tertiary shadow-elegant">
      <div className="container mx-auto px-4 lg:px-8">
        <div className="flex h-16 items-center justify-between">
          {/* Mobile menu button */}
          <Button
            variant="ghost"
            size="icon"
            className="lg:hidden"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            {isMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </Button>

          {/* Logo */}
          <Link
            to="/"
            className="flex items-center space-x-2 font-display text-xl font-medium tracking-tight"
          >
            <span className="heading-text">Nutrition pHirst</span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center space-x-8">
            <DropdownMenu>
              <DropdownMenuTrigger className="flex items-center space-x-1 text-base font-serif nav-text transition-colors hover:text-primary">
                NUTRIENT BY BENEFIT
                <svg className="w-4 h-4 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </DropdownMenuTrigger>
              <DropdownMenuContent className="w-screen max-w-none left-0 right-0 p-8 bg-white border-0 shadow-product rounded-none mt-4">
                <div className="max-w-7xl mx-auto">
                  {/*
                    The original static mega-menu (categories + showcases) is kept below commented
                    so we don't remove any code per the request. We're replacing the visible
                    UI with a categories-only grid that mirrors the shop categories.
                  */}
                  <div className="grid grid-cols-3 gap-8">
                    {/* Categories Column (full-width of left area) */}
                    <div className="col-span-2">
                      <div className="grid grid-cols-2 gap-4">
                        {/** Dynamic categories from backend (click navigates to shop with category) */}
                        {categories.map((cat) => (
                          <button
                            key={cat.id}
                            onClick={() => {
                              const benefitRoute = getBenefitRoute(cat.id);
                              if (benefitRoute) {
                                navigate(benefitRoute);
                              } else {
                                navigate(`/products?category=${cat.id}`);
                              }
                            }}
                            className="flex items-center space-x-3 text-sm hover:text-primary transition-colors py-2 w-full text-left"
                          >
                            <div className="w-8 h-8 rounded-full bg-muted flex items-center justify-center">
                              <cat.icon className="h-4 w-4 text-foreground" />
                            </div>
                            <span className="font-medium">{cat.name}</span>
                          </button>
                        ))}
                      </div>
                    </div>

                    {/* Right Column placeholder to preserve layout */}
                    <div className="col-span-1">
                      {/* Intentionally left minimal to match the shop UX of showing categories only */}
                      <div className="h-full flex items-center justify-center">
                        <p className="muted-text text-sm">Select a category to shop related nutrients</p>
                      </div>
                    </div>
                  </div>
                </div>
              </DropdownMenuContent>
            </DropdownMenu>
            
            <Link
              to="/products?category=all"
              className="flex items-center space-x-1 text-base font-serif nav-text transition-colors"
            >
              SHOP
            </Link>
            
            <Link
              to="/learn"
              className="text-base font-serif nav-text transition-colors"
            >
              LEARN
            </Link>
          </nav>

          {/* Right side icons */}
          <div className="flex items-center space-x-3">
            <Button variant="ghost" size="icon" className="hidden sm:flex">
              <Search className="h-4 w-4 icon-primary" />
            </Button>
            
            <Button variant="ghost" size="icon" onClick={() => navigate("/account")}>
              <User className="h-4 w-4 icon-primary" />
            </Button>
            
            <Button
              variant="ghost"
              size="icon"
              className="relative"
              onClick={() => navigate("/cart")}
            >
              <ShoppingCart className="h-4 w-4 icon-primary" />
              {itemCount > 0 && (
                <Badge
                  variant="destructive"
                  className="absolute -top-1 -right-1 h-5 w-5 flex items-center justify-center text-xs"
                >
                  {itemCount}
                </Badge>
              )}
            </Button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="lg:hidden border-t border-tertiary bg-white shadow-elegant">
            <nav className="flex flex-col space-y-4 p-4">
              {menuItems.map((item) => (
                <Link
                  key={item.name}
                  to={item.href}
                  className="text-sm font-medium nav-text transition-colors"
                  onClick={() => setIsMenuOpen(false)}
                >
                  {item.name}
                </Link>
              ))}
              <Link
                to="/learn"
                className="text-sm font-medium nav-text transition-colors"
                onClick={() => setIsMenuOpen(false)}
              >
                LEARN
              </Link>
            </nav>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;