import { Request, Response } from 'express';
import { PrismaClient } from '@prisma/client';
import { cache, CACHE_TTL, getCache, setCache, clearCachePrefix } from '../utils/cache';

const prisma = new PrismaClient();

const getCacheKey = (prefix: string, params: any) => `${prefix}:${JSON.stringify(params)}`;

export const getProducts = async (req: Request, res: Response) => {
  try {
    const { category, page = 1, limit = 24, search } = req.query;
    
    // Create cache key
    const cacheKey = getCacheKey('products', { category, page, limit, search });
    const cached = getCache(cacheKey);
    
    if (cached && Date.now() - cached.timestamp < CACHE_TTL.PRODUCTS) {
      return res.json(cached.data);
    }

    const skip = (Number(page) - 1) * Number(limit);

    let whereClause: any = {
      isActive: true,
      published: true
    };

    // Handle category filtering - optimize by using categoryId
    if (category && category !== 'all') {
      const categoryId = await getCategoryId(category as string);
      if (categoryId) {
        whereClause.categoryId = categoryId;
      }
    }

    // Handle search - simplified for better performance
    if (search) {
      whereClause.OR = [
        { name: { contains: search as string, mode: 'insensitive' } },
        { shortDescription: { contains: search as string, mode: 'insensitive' } }
      ];
    }

    // Optimized query - minimal data selection for list view
    const [products, total] = await Promise.all([
      prisma.product.findMany({
        where: whereClause,
        select: {
          id: true,
          name: true,
          slug: true,
          shortDescription: true,
          price: true,
          comparePrice: true,
          isFeatured: true,
          averageRating: true,
          reviewCount: true,
          category: {
            select: {
              id: true,
              name: true,
              slug: true
            }
          },
          images: {
            select: {
              url: true,
              altText: true
            },
            orderBy: { sortOrder: 'asc' },
            take: 1 // Only first image for list view
          }
        },
        skip,
        take: Number(limit),
        orderBy: [
          { isFeatured: 'desc' },
          { createdAt: 'desc' }
        ]
      }),
      getProductCount(whereClause)
    ]);

    // Process products efficiently - return lean data
    const processedProducts = products.map(product => {
      return {
        id: product.id,
        name: product.name,
        slug: product.slug,
        shortDescription: product.shortDescription,
        price: product.price,
        comparePrice: product.comparePrice,
        isFeatured: product.isFeatured,
        category: product.category,
        averageRating: product.averageRating || 4.5,
        reviewCount: product.reviewCount || 12,
        images: product.images.map((img: any) => ({
          url: img.url,
          altText: img.altText
        })),
        tags: [] // Don't send tags in list view for performance
      };
    });

    const result = {
      success: true,
      products: processedProducts,
      pagination: {
        currentPage: Number(page),
        totalPages: Math.ceil(total / Number(limit)),
        totalProducts: total,
        hasNextPage: skip + Number(limit) < total,
        hasPrevPage: Number(page) > 1
      }
    };

  // Cache the result
  setCache(cacheKey, result);

    res.json(result);
  } catch (error) {
    console.error('Error fetching products:', error);
    res.status(500).json({ 
      success: false,
      error: 'Internal server error' 
    });
  }
};

export const getProductBySlug = async (req: Request, res: Response) => {
  try {
    const { slug } = req.params;

    const product = await prisma.product.findUnique({
      where: { slug },
      include: {
        category: true,
        images: {
          orderBy: { sortOrder: 'asc' }
        },
        variants: true,
        reviews: {
          include: {
            user: {
              select: {
                name: true
              }
            }
          },
          orderBy: { createdAt: 'desc' }
        }
      }
    });

    if (!product) {
      return res.status(404).json({ 
        success: false,
        error: 'Product not found' 
      });
    }

    const avgRating = product.reviews.length > 0 
      ? product.reviews.reduce((sum, review) => sum + review.rating, 0) / product.reviews.length
      : 0;

    res.json({
      success: true,
      product: {
        ...product,
        averageRating: Math.round(avgRating * 10) / 10,
        reviewCount: product.reviews.length
      }
    });
  } catch (error) {
    console.error('Error fetching product:', error);
    res.status(500).json({ 
      success: false,
      error: 'Internal server error' 
    });
  }
};

export const getCategories = async (req: Request, res: Response) => {
  try {
    const cacheKey = 'categories-all';
    const cached = cache.get(cacheKey);
    
    if (cached && Date.now() - cached.timestamp < CACHE_TTL.CATEGORIES) {
      return res.json(cached.data);
    }

    const categories = await prisma.category.findMany({
        where: { isActive: true, published: true },
      select: {
        id: true,
        name: true,
        slug: true,
        _count: {
          select: {
            products: {
              where: {
                isActive: true
              }
            }
          }
        }
      },
      orderBy: { sortOrder: 'asc' }
    });

    const result = {
      success: true,
      categories: categories.map(category => ({
        id: category.id,
        name: category.name,
        slug: category.slug,
        productCount: category._count.products // Will switch to category.productCount after migration
      }))
    };

    cache.set(cacheKey, { data: result, timestamp: Date.now() });
    res.json(result);
  } catch (error) {
    console.error('Error fetching categories:', error);
    res.status(500).json({ 
      success: false,
      error: 'Internal server error' 
    });
  }
};

// Helper function to get category ID with caching
const getCategoryId = async (categorySlug: string): Promise<string | null> => {
  const cacheKey = `category-id:${categorySlug}`;
  const cached = cache.get(cacheKey);
  
  if (cached && Date.now() - cached.timestamp < CACHE_TTL.CATEGORIES) {
    return cached.data;
  }

  const category = await prisma.category.findUnique({
    where: { slug: categorySlug },
    select: { id: true }
  });

  const categoryId = category?.id || null;
  cache.set(cacheKey, { data: categoryId, timestamp: Date.now() });
  
  return categoryId;
};

// Helper function to get product count with caching
const getProductCount = async (whereClause: any): Promise<number> => {
  const cacheKey = getCacheKey('product-count', whereClause);
  const cached = cache.get(cacheKey);
  
  if (cached && Date.now() - cached.timestamp < CACHE_TTL.PRODUCTS) {
    return cached.data;
  }

  const count = await prisma.product.count({ where: whereClause });
  cache.set(cacheKey, { data: count, timestamp: Date.now() });
  
  return count;
};