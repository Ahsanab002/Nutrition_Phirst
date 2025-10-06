import React, { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import ProductCard from '@/components/ProductCard';
import ProductCardSkeleton from '@/components/ProductCardSkeleton';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { useScrollToTop } from '@/hooks/use-scroll-to-top';
import { 
  Search, 
  Filter, 
  Grid3X3, 
  List,
  Star,
  TrendingUp,
  Heart,
  Zap,
  Loader2
} from 'lucide-react';
import { productService, BackendCategory } from '@/services/productService';
import { Product } from '@/data/products';

const Products = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [products, setProducts] = useState<Product[]>([]);
  const [categories, setCategories] = useState<Array<{id: string, name: string, icon: any}>>([
    { id: 'all', name: 'All Products', icon: Grid3X3 },
  ]);
  const [searchTerm, setSearchTerm] = useState('');
  const [debouncedSearchTerm, setDebouncedSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [sortBy, setSortBy] = useState<string>('featured');
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [pagination, setPagination] = useState({
    currentPage: 1,
    totalPages: 1,
    totalProducts: 0,
    hasNextPage: false,
    hasPrevPage: false
  });
  const PAGE_SIZE = 24;
  
  // Ensure page starts from top when navigated to
  useScrollToTop();

  // Debounce search term
  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedSearchTerm(searchTerm);
      setCurrentPage(1); // Reset to first page when searching
    }, 500);

    return () => clearTimeout(timer);
  }, [searchTerm]);

  // Load categories only once
  useEffect(() => {
    const loadCategories = async () => {
      try {
        const categoriesResponse = await productService.getCategories();
        if (categoriesResponse.success) {
          const backendCategories = categoriesResponse.categories
            .filter(cat => !['supplements', 'wellness', 'beauty', 'health', 'nutrition'].includes(cat.slug))
            .map(cat => ({
              id: cat.slug,
              name: cat.name,
              icon: getIconForCategory(cat.slug)
            }));
          setCategories([
            { id: 'all', name: 'All Products', icon: Grid3X3 },
            ...backendCategories
          ]);
        }
      } catch (err) {
        console.error('Error loading categories:', err);
      }
    };

    loadCategories();
  }, []);

  // Helper function to get icons for categories
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

  useEffect(() => {
    // Get category from URL params
    const categoryParam = searchParams.get('category');
    if (categoryParam) {
      setSelectedCategory(categoryParam);
    }
  }, [searchParams]);

  // Use React Query for products with automatic caching and deduplication
  const productsQuery = useQuery({
    queryKey: ['products', { 
      category: selectedCategory, 
      search: debouncedSearchTerm, 
      page: currentPage,
      limit: PAGE_SIZE 
    }],
    queryFn: async () => {
      const response = await productService.getProducts({
        category: selectedCategory === 'all' ? undefined : selectedCategory,
        search: debouncedSearchTerm || undefined,
        page: currentPage,
        limit: PAGE_SIZE
      });
      
      if (response.success) {
        const frontendProducts = response.products.map(p => 
          productService.convertToFrontendProduct(p)
        );
        
        // Apply client-side sorting
        let sorted = [...frontendProducts];
        switch (sortBy) {
          case 'price-low':
            sorted.sort((a, b) => a.price - b.price);
            break;
          case 'price-high':
            sorted.sort((a, b) => b.price - a.price);
            break;
          case 'rating':
            sorted.sort((a, b) => b.rating - a.rating);
            break;
          case 'newest':
            sorted.sort((a, b) => b.reviewCount - a.reviewCount);
            break;
          default:
            break;
        }
        
        return { products: sorted, pagination: response.pagination };
      }
      throw new Error('Failed to load products');
    },
    placeholderData: (previousData) => previousData, // Keep previous data while loading new data
    staleTime: 1000 * 60 * 2, // 2 minutes
    gcTime: 1000 * 60 * 5, // 5 minutes (formerly cacheTime)
    retry: 1,
  });

  // Update local state when query data changes
  useEffect(() => {
    if (productsQuery.data && 'products' in productsQuery.data) {
      setProducts(productsQuery.data.products);
      setPagination(productsQuery.data.pagination);
      setLoading(false);
      setError(null);
    } else if (productsQuery.isError) {
      setError('Failed to load products. Please try again.');
      setLoading(false);
    } else if (productsQuery.isLoading) {
      setLoading(true);
    }
  }, [productsQuery.data, productsQuery.isError, productsQuery.isLoading]);

  const handleCategoryChange = (category: string) => {
    setSelectedCategory(category);
    setCurrentPage(1); // Reset to first page when changing category
    setSearchParams({ category });
  };

  const getCategoryInfo = (categoryId: string) => {
    const category = categories.find(cat => cat.id === categoryId);
    return category || categories[0];
  };

  const currentCategory = getCategoryInfo(selectedCategory);

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <main className="container mx-auto px-4 lg:px-8 py-8">
        {/* Page Header */}
        <div className="mb-8">
          <div className="flex items-center gap-3 mb-4">
            <currentCategory.icon className="h-6 w-6 icon-accent" />
            <h1 className="text-3xl md:text-4xl font-serif font-bold heading-text">
              {currentCategory.name}
            </h1>
          </div>
          <p className="body-text max-w-2xl">
            Discover our premium wellness supplements designed to support your health and vitality. 
            Each product is carefully formulated with scientifically-backed ingredients.
          </p>
        </div>

        {/* Filters and Search */}
        <div className="flex flex-col lg:flex-row gap-4 mb-8">
          {/* Search */}
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 icon-muted" />
            <Input
              placeholder="Search products..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10"
            />
          </div>

          {/* Sort */}
          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
            className="px-3 py-2 border border-border rounded-md bg-background text-foreground"
          >
            <option value="featured">Featured</option>
            <option value="price-low">Price: Low to High</option>
            <option value="price-high">Price: High to Low</option>
            <option value="rating">Highest Rated</option>
            <option value="newest">Most Popular</option>
          </select>

          {/* View Mode */}
          <div className="flex border border-border rounded-md">
            <Button
              variant={viewMode === 'grid' ? 'default' : 'ghost'}
              size="sm"
              onClick={() => setViewMode('grid')}
              className={`rounded-r-none transition-all duration-200 ${
                viewMode === 'grid' ? 'btn-selected' : ''
              }`}
            >
              <Grid3X3 className="h-4 w-4" />
            </Button>
            <Button
              variant={viewMode === 'list' ? 'default' : 'ghost'}
              size="sm"
              onClick={() => setViewMode('list')}
              className={`rounded-l-none transition-all duration-200 ${
                viewMode === 'list' ? 'btn-selected' : ''
              }`}
            >
              <List className="h-4 w-4" />
            </Button>
          </div>
        </div>

        <div className="flex flex-col lg:flex-row gap-8">
          {/* Sidebar - Categories */}
          <div className="lg:w-64 flex-shrink-0">
            <div className="sticky top-8">
              <h3 className="font-heading text-lg font-semibold mb-4 heading-text">Categories</h3>
              <div className="space-y-2">
                {categories.map((category) => (
                  <Button
                    key={category.id}
                    variant={selectedCategory === category.id ? 'secondary' : 'ghost'}
                    className={`w-full justify-start font-body transition-all duration-200 ${
                      selectedCategory === category.id ? 'category-selected' : 'hover:bg-muted'
                    }`}
                    onClick={() => handleCategoryChange(category.id)}
                  >
                    <category.icon className={`h-4 w-4 mr-2 ${selectedCategory === category.id ? 'selected-icon' : 'icon-primary'}`} />
                    <span className={selectedCategory === category.id ? 'selected-text' : 'category-text'}>
                      {category.name}
                    </span>
                  </Button>
                ))}
              </div>
            </div>
          </div>

          {/* Products Grid */}
          <div className="flex-1">
            {/* Results Header */}
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center gap-2">
                <span className="muted-text">
                  {loading ? 'Loading...' : `${pagination.totalProducts} product${pagination.totalProducts !== 1 ? 's' : ''} found`}
                </span>
                {selectedCategory !== 'all' && (
                  <Badge variant="secondary" className="font-body">
                    {currentCategory.name}
                  </Badge>
                )}
              </div>
            </div>

            {/* Products */}
            {loading ? (
              <div className={`grid gap-6 ${
                viewMode === 'grid' 
                  ? 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-3' 
                  : 'grid-cols-1'
              }`}>
                {Array.from({ length: PAGE_SIZE }).map((_, i) => (
                  <ProductCardSkeleton key={i} />
                ))}
              </div>
            ) : error ? (
              <div className="text-center py-16">
                <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Search className="h-8 w-8 text-red-600" />
                </div>
                <h3 className="font-heading text-xl font-semibold mb-2 text-red-800">Error Loading Products</h3>
                <p className="text-red-600 mb-4">{error}</p>
                <Button 
                  variant="outline" 
                  onClick={() => window.location.reload()}
                >
                  Try Again
                </Button>
              </div>
            ) : products.length > 0 ? (
              <>
                <div className={`grid gap-6 ${
                  viewMode === 'grid' 
                    ? 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-3' 
                    : 'grid-cols-1'
                }`}>
                  {products.map((product: Product) => (
                    <div key={product.id} className={viewMode === 'list' ? 'flex' : ''}>
                      <ProductCard product={product} />
                    </div>
                  ))}
                </div>
                
                {pagination.totalPages > 1 && (
                  <div className="flex justify-center items-center gap-2 mt-8">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => setCurrentPage(currentPage - 1)}
                      disabled={!pagination.hasPrevPage || loading}
                    >
                      Previous
                    </Button>
                    
                    <span className="px-4 py-2 text-sm text-muted-foreground">
                      Page {currentPage} of {pagination.totalPages}
                    </span>
                    
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => setCurrentPage(currentPage + 1)}
                      disabled={!pagination.hasNextPage || loading}
                    >
                      Next
                    </Button>
                  </div>
                )}
              </>
            ) : (
              <div className="text-center py-16">
                <div className="w-16 h-16 bg-muted rounded-full flex items-center justify-center mx-auto mb-4">
                  <Search className="h-8 w-8 icon-muted" />
                </div>
                <h3 className="font-heading text-xl font-semibold mb-2 heading-text">No products found</h3>
                <p className="muted-text mb-4">
                  Try adjusting your search or filter criteria
                </p>
                <Button 
                  variant="outline" 
                  onClick={() => {
                    setSearchTerm('');
                    setSelectedCategory('all');
                    setCurrentPage(1);
                    setSearchParams({});
                  }}
                >
                  Clear Filters
                </Button>
              </div>
            )}
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default Products;