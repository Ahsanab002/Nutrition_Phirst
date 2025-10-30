// import { useState, useEffect } from "react";
// import { Link, useNavigate } from "react-router-dom";
// import { ShoppingCart, User, Menu, X, Search, Grid3X3, Heart, Star, Zap, TrendingUp } from "lucide-react";
// import { Button } from "@/components/ui/button";
// import { Badge } from "@/components/ui/badge";
// import { useCart } from "@/contexts/CartContext";
// import {
//   DropdownMenu,
//   DropdownMenuContent,
//   DropdownMenuItem,
//   DropdownMenuTrigger,
// } from "@/components/ui/dropdown-menu";
// import { productService, BackendCategory } from '@/services/productService';


// Optional: Rename categories for nicer display titles
const CATEGORY_NAME_MAP: Record<string, string> = {
  'anti-aging': 'Anti Aging NAD+ Supplement',
  'cognitive-health': 'Brain Health',
  'detox-cleanse': 'Digestive',
  'nad-supplements': 'NAD+ Gummies Energy',
};

// const Header = () => {
//   const [isMenuOpen, setIsMenuOpen] = useState(false);
//   const navigate = useNavigate();
//   const { itemCount } = useCart();

//   const menuItems = [
//     { name: "Best Sellers", href: "/products?category=bestsellers" },
//     { name: "Gut Health", href: "/products?category=gut-health" },
//     { name: "Sleep & Mood", href: "/products?category=sleep-mood" },
//     { name: "Bundles", href: "/products?category=bundles" },
//   ];

//   const [categories, setCategories] = useState<Array<{id: string, name: string, icon: any}>>([
//     { id: 'all', name: 'All Products', icon: Grid3X3 },
//   ]);

//   // Load categories for the dropdown (mirror shop categories)
//   useEffect(() => {
//     let mounted = true;
//     const loadCategories = async () => {
//       try {
//         const categoriesResponse = await productService.getCategories();
//         if (categoriesResponse && categoriesResponse.success && mounted) {
//           const backendCategories = categoriesResponse.categories.map((cat: BackendCategory) => ({
//             id: cat.slug,
//             name: cat.name,
//             icon: getIconForCategory(cat.slug),
//           }));
//           setCategories([
//             { id: 'all', name: 'All Products', icon: Grid3X3 },
//             ...backendCategories.filter(cat => !['supplements', 'beauty', 'nutrition', 'wellness', 'health'].includes(cat.id))
//           ]);
//         }
//       } catch (err) {
//         console.error('Error loading header categories:', err);
//       }
//     };

//     loadCategories();
//     return () => { mounted = false; };
//   }, []);

//   // Helper function to get icons for categories (kept in sync with Products.tsx)
//   const getIconForCategory = (slug: string) => {
//     switch (slug) {
//       case 'skincare': return Heart;
//       case 'anti-aging': return Star;
//       case 'wellness-supplements': return Zap;
//       case 'cognitive-health': return Zap;
//       case 'detox-cleanse': return Star;
//       case 'nad-supplements': return TrendingUp;
//       default: return Grid3X3;
//     }
//   };

//   // Map known category slugs to their dedicated benefit pages.
//   // If a category doesn't have a benefit page, we'll fallback to the shop view for that category.
//   const BENEFIT_ROUTE_MAP: Record<string, string> = {
//     // Backend categories (from seed database)
//     'skincare': '/benefit/skincare',
//     'anti-aging': '/benefit/anti-aging',
//     'wellness-supplements': '/benefit/wellness-supplements',
//     'cognitive-health': '/benefit/cognitive-health',
//     'detox-cleanse': '/benefit/detox-cleanse',
//     'nad-supplements': '/benefit/nad-supplements',
//     // Legacy/existing benefit pages
//     'ultra-strength': '/benefit/ultra-strength',
//     'sleep': '/benefit/sleep',
//     'sleep-mood': '/benefit/sleep',
//     'mood': '/benefit/mood',
//     'beauty': '/benefit/beauty',
//     'womens-health': '/benefit/womens-health',
//     'gut-health': '/benefit/gut-health',
//     'immunity': '/benefit/immunity',
//     'multivitamins': '/benefit/multivitamins',
//     'kids': '/benefit/kids',
//     'energy': '/benefit/energy',
//     'adaptogens': '/benefit/adaptogens',
//     'foundational-wellness': '/benefit/foundational-wellness',
//     'vegetarian': '/benefit/vegetarian',
//   };

//   const getBenefitRoute = (slug: string) => {
//     // direct match
//     if (BENEFIT_ROUTE_MAP[slug]) return BENEFIT_ROUTE_MAP[slug];
//     // some backend slugs might use different naming (try normalizing)
//     const normalized = slug.toLowerCase().replace(/\s+/g, '-');
//     return BENEFIT_ROUTE_MAP[normalized] ?? null;
//   };

//   return (
//     <header className="sticky top-0 z-50 w-full bg-white/95 backdrop-blur supports-[backdrop-filter]:bg-white/80 border-b border-tertiary shadow-elegant">
//       <div className="container mx-auto px-4 lg:px-8">
//         <div className="flex h-16 items-center justify-between">
//           {/* Mobile menu button */}
//           <Button
//             variant="ghost"
//             size="icon"
//             className="lg:hidden"
//             onClick={() => setIsMenuOpen(!isMenuOpen)}
//           >
//             {isMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
//           </Button>

//           {/* Logo */}
//           <Link
//             to="/"
//             className="flex items-center space-x-2 font-display text-xl font-medium tracking-tight"
//           >
//             <span className="heading-text">Nutrition pHirst</span>
//           </Link>

//           {/* Desktop Navigation */}
//           <nav className="hidden lg:flex items-center space-x-8">
//             <DropdownMenu>
//               <DropdownMenuTrigger className="flex items-center space-x-1 text-base font-serif nav-text transition-colors hover:text-primary">
//                 NUTRIENT BY BENEFIT
//                 <svg className="w-4 h-4 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                   <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
//                 </svg>
//               </DropdownMenuTrigger>
//               <DropdownMenuContent className="w-screen max-w-none left-0 right-0 p-8 bg-white border-0 shadow-product rounded-none mt-4">
//                 <div className="max-w-7xl mx-auto">
//                   {/*
//                     The original static mega-menu (categories + showcases) is kept below commented
//                     so we don't remove any code per the request. We're replacing the visible
//                     UI with a categories-only grid that mirrors the shop categories.
//                   */}
//                   <div className="grid grid-cols-3 gap-8">
//                     {/* Categories Column (full-width of left area) */}
//                     <div className="col-span-2">
//                       <div className="grid grid-cols-2 gap-4">
//                         {/** Dynamic categories from backend (click navigates to shop with category) */}
//                         {categories.map((cat) => (
//                           <button
//                             key={cat.id}
//                             onClick={() => {
//                               const benefitRoute = getBenefitRoute(cat.id);
//                               if (benefitRoute) {
//                                 navigate(benefitRoute);
//                               } else {
//                                 navigate(`/products?category=${cat.id}`);
//                               }
//                             }}
//                             className="flex items-center space-x-3 text-sm hover:text-primary transition-colors py-2 w-full text-left"
//                           >
//                             <div className="w-8 h-8 rounded-full bg-muted flex items-center justify-center">
//                               <cat.icon className="h-4 w-4 text-foreground" />
//                             </div>
//                             <span className="font-medium">{cat.name}</span>
//                           </button>
//                         ))}
//                       </div>
//                     </div>

//                     {/* Right Column placeholder to preserve layout */}
//                     <div className="col-span-1">
//                       {/* Intentionally left minimal to match the shop UX of showing categories only */}
//                       <div className="h-full flex items-center justify-center">
//                         <p className="muted-text text-sm">Select a category to shop related nutrients</p>
//                       </div>
//                     </div>
//                   </div>
//                 </div>
//               </DropdownMenuContent>
//             </DropdownMenu>
            
//             <Link
//               to="/products?category=all"
//               className="flex items-center space-x-1 text-base font-serif nav-text transition-colors"
//             >
//               SHOP
//             </Link>
            
//             <Link
//               to="/learn"
//               className="text-base font-serif nav-text transition-colors"
//             >
//               LEARN
//             </Link>
//           </nav>

//           {/* Right side icons */}
//           <div className="flex items-center space-x-3">
//             <Button variant="ghost" size="icon" className="hidden sm:flex">
//               <Search className="h-4 w-4 icon-primary" />
//             </Button>
            
//             <Button variant="ghost" size="icon" onClick={() => navigate("/account")}>
//               <User className="h-4 w-4 icon-primary" />
//             </Button>
            
//             <Button
//               variant="ghost"
//               size="icon"
//               className="relative"
//               onClick={() => navigate("/cart")}
//             >
//               <ShoppingCart className="h-4 w-4 icon-primary" />
//               {itemCount > 0 && (
//                 <Badge
//                   variant="destructive"
//                   className="absolute -top-1 -right-1 h-5 w-5 flex items-center justify-center text-xs"
//                 >
//                   {itemCount}
//                 </Badge>
//               )}
//             </Button>
//           </div>
//         </div>

//         {/* Mobile Navigation */}
//         {isMenuOpen && (
//           <div className="lg:hidden border-t border-tertiary bg-white shadow-elegant">
//             <nav className="flex flex-col space-y-4 p-4">
//               {menuItems.map((item) => (
//                 <Link
//                   key={item.name}
//                   to={item.href}
//                   className="text-sm font-medium nav-text transition-colors"
//                   onClick={() => setIsMenuOpen(false)}
//                 >
//                   {item.name}
//                 </Link>
//               ))}
//               <Link
//                 to="/learn"
//                 className="text-sm font-medium nav-text transition-colors"
//                 onClick={() => setIsMenuOpen(false)}
//               >
//                 LEARN
//               </Link>
//             </nav>
//           </div>
//         )}
//       </div>
//     </header>
//   );
// };

// export default Header;


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
import logo from "@/assets/Logooo.png";
import LeafDecoration from "@/components/LeafDecoration";

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [hasScrolled, setHasScrolled] = useState(false);
  const navigate = useNavigate();
  const { itemCount } = useCart();

  // Add scroll event listener
  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
      setHasScrolled(scrollTop > 10);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

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
              name: CATEGORY_NAME_MAP[cat.slug] || cat.name, // ✅ rename if mapped
              icon: getIconForCategory(cat.slug),
                        }));

          setCategories([
            { id: 'all', name: 'All Products', icon: Grid3X3 },
            ...backendCategories.filter(cat => !['supplements', 'beauty', 'nutrition', 'wellness', 'health', 'anti-aging', 'cognitive-health', 'nad-supplements'].includes(cat.id))
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
      case 'anti-aging-nad-supplement': return Star;
      case 'digestive': return Star;
      case 'brain-health': return Zap;
      case 'nad-gummies-energy': return TrendingUp;
      case 'detox-cleanse': return Star;
      default: return Grid3X3;
    }
  };

  // Map known category slugs to their dedicated benefit pages.
  // If a category doesn't have a benefit page, we'll fallback to the shop view for that category.
  const BENEFIT_ROUTE_MAP: Record<string, string> = {
    // Backend categories (from seed database)
    'skincare': '/benefit/skincare',
    'anti-aging-nad-supplement': '/benefit/anti-aging',
    'digestive': '/benefit/gut-health',
    'brain-health': '/benefit/cognitive-health',
    'nad-gummies-energy': '/benefit/nad-supplements',
    'detox-cleanse': '/benefit/detox-cleanse',
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
    <header style={{ height: 'clamp(56px, 8vh, 72px)' }} className={`sticky top-0 z-50 w-full relative overflow-hidden transition-all duration-300 ${
      hasScrolled 
        ? 'bg-gradient-to-b from-white/80 via-white/70 to-white/60 backdrop-blur-xl supports-[backdrop-filter]:from-white/70 supports-[backdrop-filter]:to-white/50 border-b border-primary/10 shadow-lg py-0 before:absolute before:inset-0 before:bg-gradient-to-r before:from-primary/5 before:via-accent/5 before:to-primary/5 before:-z-10' 
        : 'bg-white/30 backdrop-blur-2xl supports-[backdrop-filter]:bg-white/20 border-y border-primary/20 py-2 before:absolute before:inset-0 before:bg-gradient-to-r before:from-primary/10 before:via-accent/10 before:to-primary/10 before:-z-10'
  }`}>
  <div className="container mx-auto px-4 lg:px-8 py-0">
        {/* Decorative leaves behind the header */}
        <div className="pointer-events-none absolute inset-0 -z-10 overflow-hidden">
          <LeafDecoration className="absolute -left-8 -top-6 opacity-80 animate-leaf-slow transform hover:scale-110 transition-transform duration-700" size={120} color="var(--tertiary)" />
          <LeafDecoration className="absolute -right-12 top-6 opacity-70 rotate-12 animate-leaf-slow transform hover:scale-110 transition-transform duration-700" size={160} color="var(--accent)" />
        </div>
  <div className="flex h-full items-center justify-between">
          {/* Mobile menu button */}
          <Button
            variant="ghost"
            size="icon"
            className="lg:hidden hover:scale-110 transition-transform duration-300"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            {isMenuOpen ? (
              <X className="h-5 w-5 text-primary/80 transform rotate-0 transition-all duration-300" />
            ) : (
              <Menu className="h-5 w-5 text-primary/80 transform rotate-0 transition-all duration-300" />
            )}
          </Button>

          {/* Logo */}
          <Link
            to="/"
            className="flex items-center space-x-2 font-display text-xl font-medium tracking-tight transform hover:scale-105 transition-transform duration-300"
          >
            <img
              src={logo}
              alt="Nutrition pHirst"
              style={{ transform: 'scale(5) translateX(10px)' }}
              className="h-10 w-auto object-contain drop-shadow-lg shrink-0 filter brightness-105"
              loading="eager"
              decoding="async"
            />
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center space-x-12 font-medium">
            <DropdownMenu>
              <DropdownMenuTrigger className="flex items-center space-x-1 text-base font-serif nav-text transition-all duration-300 hover:text-primary relative group py-2">
                <span className="relative">
                  NUTRIENT BY BENEFIT
                  <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-primary transition-all duration-300 group-hover:w-full"></span>
                </span>
                <svg className="w-4 h-4 ml-1 transition-transform duration-300 group-hover:rotate-180" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </DropdownMenuTrigger>
              <DropdownMenuContent className="w-screen max-w-none left-0 right-0 p-8 bg-gradient-to-b from-white/90 via-white/85 to-white/80 backdrop-blur-xl border-0 shadow-2xl rounded-b-2xl mt-0 before:absolute before:inset-0 before:bg-gradient-to-r before:from-primary/5 before:via-accent/5 before:to-primary/5 before:-z-10 relative overflow-hidden">
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
                            className="flex items-center space-x-3 text-sm hover:text-primary transition-all duration-300 py-3 px-4 w-full text-left rounded-xl hover:bg-gradient-to-r hover:from-primary/5 hover:to-accent/5 group relative overflow-hidden backdrop-blur-sm"
                          >
                            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-primary/20 to-accent/20 flex items-center justify-center transform transition-all duration-300 group-hover:scale-110 group-hover:shadow-lg before:absolute before:inset-0 before:bg-gradient-to-r before:from-white/20 before:to-transparent before:rotate-45 before:translate-x-[-200%] group-hover:before:translate-x-[200%] before:transition-transform before:duration-700">
                              <cat.icon className="h-5 w-5 text-primary transform transition-all duration-300 group-hover:text-primary group-hover:scale-110 drop-shadow-md" />
                            </div>
                            <span className="font-medium tracking-wide">
                              {cat.name.replace(/NAD\+?\s*Supplement/gi, "").trim() || cat.name}
                            </span>
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
              to="/social"
              className="text-base font-serif nav-text transition-colors"
            >
              SOCIAL
            </Link>
            
            <Link
              to="/learn"
              className="text-base font-serif nav-text transition-colors"
            >
              LEARN
            </Link>
          </nav>

          {/* Right side icons */}
          <div className="flex items-center space-x-4">
            <Button variant="ghost" size="icon" className="hidden sm:flex hover:scale-110 transition-all duration-300 relative overflow-hidden rounded-xl hover:bg-gradient-to-r hover:from-primary/10 hover:to-accent/10 before:absolute before:inset-0 before:bg-gradient-to-r before:from-white/20 before:to-transparent before:rotate-45 before:translate-x-[-200%] hover:before:translate-x-[200%] before:transition-transform before:duration-700">
              <Search className="h-5 w-5 text-primary transition-all duration-300 drop-shadow-md" />
            </Button>
            
            <Button variant="ghost" size="icon" onClick={() => navigate("/account")} className="hover:scale-110 transition-all duration-300 relative overflow-hidden rounded-xl hover:bg-gradient-to-r hover:from-primary/10 hover:to-accent/10 before:absolute before:inset-0 before:bg-gradient-to-r before:from-white/20 before:to-transparent before:rotate-45 before:translate-x-[-200%] hover:before:translate-x-[200%] before:transition-transform before:duration-700">
              <User className="h-5 w-5 text-primary transition-all duration-300 drop-shadow-md" />
            </Button>
            
            <Button
              variant="ghost"
              size="icon"
              className="relative hover:scale-110 transition-all duration-300 overflow-hidden rounded-xl hover:bg-gradient-to-r hover:from-primary/10 hover:to-accent/10 before:absolute before:inset-0 before:bg-gradient-to-r before:from-white/20 before:to-transparent before:rotate-45 before:translate-x-[-200%] hover:before:translate-x-[200%] before:transition-transform before:duration-700"
              onClick={() => navigate("/cart")}
            >
              <ShoppingCart className="h-5 w-5 text-primary transition-all duration-300 drop-shadow-md" />
              {itemCount > 0 && (
                <Badge
                  variant="destructive"
                  className="absolute -top-1 -right-1 h-5 w-5 flex items-center justify-center text-[0.65rem] font-bold bg-primary animate-pulse"
                >
                  {itemCount}
                </Badge>
              )}
            </Button>
          </div>
        </div>

        {/* Mobile Navigation */}
        <div className={`lg:hidden border-t border-primary/10 bg-gradient-to-b from-white/90 via-white/85 to-white/80 backdrop-blur-xl shadow-2xl transform transition-all duration-300 ease-in-out relative overflow-hidden ${
          isMenuOpen ? 'translate-y-0 opacity-100' : '-translate-y-2 opacity-0 pointer-events-none'
        } before:absolute before:inset-0 before:bg-gradient-to-r before:from-primary/5 before:via-accent/5 before:to-primary/5 before:-z-10`}>
          <nav className="flex flex-col space-y-2 p-6">
            {menuItems.map((item) => (
              <Link
                key={item.name}
                to={item.href}
                className="text-sm font-medium nav-text transition-all duration-300 py-3 px-4 rounded-xl hover:bg-gradient-to-r hover:from-primary/10 hover:to-accent/10 hover:text-primary flex items-center space-x-3 group relative overflow-hidden backdrop-blur-sm"
                onClick={() => setIsMenuOpen(false)}
              >
                <div className="w-8 h-8 rounded-xl bg-gradient-to-br from-primary/20 to-accent/20 flex items-center justify-center group-hover:shadow-lg relative overflow-hidden">
                  <Grid3X3 className="h-4 w-4 text-primary drop-shadow-md" />
                </div>
                <span>{item.name}</span>
              </Link>
            ))}
            <Link
              to="/social"
              className="text-sm font-medium nav-text transition-all duration-300 py-3 px-4 rounded-lg hover:bg-primary/5 hover:text-primary flex items-center space-x-3"
              onClick={() => setIsMenuOpen(false)}
            >
              <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-primary/10 to-accent/10 flex items-center justify-center">
                <Heart className="h-4 w-4 text-primary/80" />
              </div>
              <span>SOCIAL</span>
            </Link>
            <Link
              to="/learn"
              className="text-sm font-medium nav-text transition-all duration-300 py-3 px-4 rounded-lg hover:bg-primary/5 hover:text-primary flex items-center space-x-3"
              onClick={() => setIsMenuOpen(false)}
            >
              <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-primary/10 to-accent/10 flex items-center justify-center">
                <Zap className="h-4 w-4 text-primary/80" />
              </div>
              <span>LEARN</span>
            </Link>
          </nav>
        </div>
      </div>
    </header>
  );
};

export default Header;
