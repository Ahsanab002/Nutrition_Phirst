// API service for backend communication
import { productCache } from '@/utils/cache';
import { getThumbnailUrl, generateSrcSet, getFullSizeUrl } from '@/utils/imageUtils';

const API_BASE_URL = 'http://localhost:5000/api';

export interface BackendProduct {
  id: string;
  name: string;
  slug: string;
  description: string;
  shortDescription?: string;
  price: number;
  comparePrice?: number;
  quantity: number;
  isActive: boolean;
  isFeatured: boolean;
  tags: string[];
  averageRating: number;
  reviewCount: number;
  category: {
    id: string;
    name: string;
    slug: string;
  };
  images: Array<{
    id: string;
    url: string;
    altText: string;
    sortOrder: number;
  }>;
}

export interface BackendCategory {
  id: string;
  name: string;
  slug: string;
  description?: string;
  productCount: number;
}

export interface ProductsResponse {
  success: boolean;
  products: BackendProduct[];
  pagination: {
    currentPage: number;
    totalPages: number;
    totalProducts: number;
    hasNextPage: boolean;
    hasPrevPage: boolean;
  };
}

export interface CategoriesResponse {
  success: boolean;
  categories: BackendCategory[];
}

export interface SingleProductResponse {
  success: boolean;
  product: BackendProduct;
}

class ProductService {
  private baseUrl = API_BASE_URL;
  private abortControllers = new Map<string, AbortController>();

  async getProducts(params?: {
    category?: string;
    page?: number;
    limit?: number;
    search?: string;
  }): Promise<ProductsResponse> {
    const queryParams = new URLSearchParams();
    
    if (params?.category && params.category !== 'all') {
      queryParams.append('category', params.category);
    }
    if (params?.page) {
      queryParams.append('page', params.page.toString());
    }
    if (params?.limit) {
      queryParams.append('limit', params.limit.toString());
    }
    if (params?.search) {
      queryParams.append('search', params.search);
    }

    const url = `${this.baseUrl}/products${queryParams.toString() ? '?' + queryParams.toString() : ''}`;
    
    // Check cache first (cache everything including search for 2 minutes)
    const cached = productCache.get(url);
    if (cached) {
      return cached;
    }
    
    // Cancel any previous request for the same endpoint
    const requestKey = 'products';
    if (this.abortControllers.has(requestKey)) {
      this.abortControllers.get(requestKey)?.abort();
    }
    
    const abortController = new AbortController();
    this.abortControllers.set(requestKey, abortController);
    
    try {
      const response = await fetch(url, {
        signal: abortController.signal,
      });
      
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const data = await response.json();
      
      // Cache all responses for 2 minutes
      productCache.set(url, data, 2 * 60 * 1000);
      
      this.abortControllers.delete(requestKey);
      return data;
    } catch (error: any) {
      if (error.name === 'AbortError') {
        throw new Error('Request cancelled');
      }
      console.error('Error fetching products:', error);
      throw error;
    }
  }

  async getProductBySlug(slug: string): Promise<SingleProductResponse> {
    try {
      const response = await fetch(`${this.baseUrl}/products/${slug}`);
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      return await response.json();
    } catch (error) {
      console.error('Error fetching product:', error);
      throw error;
    }
  }

  async getCategories(): Promise<CategoriesResponse> {
    const cacheKey = 'categories';
    
    // Check cache first
    const cached = productCache.get(cacheKey);
    if (cached) {
      return cached;
    }
    
    try {
      const response = await fetch(`${this.baseUrl}/products/categories`);
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const data = await response.json();
      
      // Cache categories for 10 minutes (they change less frequently)
      productCache.set(cacheKey, data, 10 * 60 * 1000);
      
      return data;
    } catch (error) {
      console.error('Error fetching categories:', error);
      throw error;
    }
  }

  // Convert backend product to frontend format (simplified for performance)
  convertToFrontendProduct(backendProduct: BackendProduct) {
    const getImageUrl = (url: string) => {
      if (!url) return '/placeholder.svg';
      // If URL is absolute, return as is
      if (url.startsWith('http')) return url;
      // Use thumbnail for list images
      return getThumbnailUrl(url);
    };

    return {
      id: backendProduct.id,
      name: backendProduct.name,
      description: backendProduct.description || backendProduct.shortDescription || '',
      price: Number(backendProduct.price),
      originalPrice: backendProduct.comparePrice ? Number(backendProduct.comparePrice) : undefined,
      rating: backendProduct.averageRating,
      reviewCount: backendProduct.reviewCount,
      image: backendProduct.images.length > 0 
        ? getImageUrl(backendProduct.images[0].url)
        : '/placeholder.svg',
      imageSrcSet: backendProduct.images.length > 0 ? generateSrcSet(backendProduct.images[0].url) : undefined,
      fullImage: backendProduct.images.length > 0 ? getFullSizeUrl(backendProduct.images[0].url) : undefined,
      badge: backendProduct.isFeatured ? 'FEATURED' : undefined,
      category: backendProduct.category.slug,
      slug: backendProduct.slug,
      tags: backendProduct.tags,
      images: backendProduct.images.map(img => getFullSizeUrl(img.url))
    };
  }
}

export const productService = new ProductService();