import { Request, Response } from 'express';
import prisma from '../config/database';
import { clearCachePrefix } from '../utils/cache';
import { AdminRequest } from '../middleware/adminAuth';

// Dashboard Analytics
export const getDashboardStats = async (req: AdminRequest, res: Response) => {
  try {
    const [
      totalUsers,
      totalProducts,
      totalOrders,
      totalRevenue,
      pendingOrders,
      lowStockProducts,
      recentOrders,
      topProducts
    ] = await Promise.all([
      // Total active users
      prisma.user.count({
        where: { isActive: true }
      }),
      
      // Total active products
      prisma.product.count({
        where: { isActive: true }
      }),
      
      // Total orders
      prisma.order.count(),
      
      // Total revenue
      prisma.order.aggregate({
        _sum: { totalAmount: true },
        where: {
          paymentStatus: 'PAID'
        }
      }),
      
      // Pending orders
      prisma.order.count({
        where: {
          status: { in: ['PENDING', 'CONFIRMED'] }
        }
      }),
      
      // Low stock products (less than 10 units)
      prisma.product.count({
        where: {
          isActive: true,
          trackQuantity: true,
          quantity: { lt: 10 }
        }
      }),
      
      // Recent orders (last 10)
      prisma.order.findMany({
        take: 10,
        orderBy: { createdAt: 'desc' },
        include: {
          user: {
            select: { name: true, email: true }
          },
          items: {
            include: {
              product: {
                select: { name: true }
              }
            }
          }
        }
      }),
      
      // Top selling products
      prisma.orderItem.groupBy({
        by: ['productId'],
        _sum: { quantity: true },
        _count: { productId: true },
        orderBy: {
          _sum: { quantity: 'desc' }
        },
        take: 5
      })
    ]);

    // Get product details for top products
    const topProductIds = topProducts.map(item => item.productId);
    const topProductDetails = await prisma.product.findMany({
      where: { id: { in: topProductIds } },
      select: { id: true, name: true, price: true, images: { take: 1 } }
    });

    const topProductsWithDetails = topProducts.map(item => {
      const product = topProductDetails.find(p => p.id === item.productId);
      return {
        product,
        totalSold: item._sum.quantity,
        orderCount: item._count.productId
      };
    });

    res.json({
      success: true,
      data: {
        overview: {
          totalUsers,
          totalProducts,
          totalOrders,
          totalRevenue: totalRevenue._sum.totalAmount || 0,
          pendingOrders,
          lowStockProducts
        },
        recentOrders: recentOrders.map(order => ({
          id: order.id,
          orderNumber: order.orderNumber,
          customerName: order.user.name,
          customerEmail: order.user.email,
          status: order.status,
          paymentStatus: order.paymentStatus,
          totalAmount: order.totalAmount,
          itemCount: order.items.length,
          createdAt: order.createdAt
        })),
        topProducts: topProductsWithDetails
      }
    });
  } catch (error) {
    console.error('Dashboard stats error:', error);
    res.status(500).json({
      success: false,
      message: 'Internal server error'
    });
  }
};

// Order Management
export const getAllOrders = async (req: AdminRequest, res: Response) => {
  try {
    const { page = 1, limit = 20, status, paymentStatus, search } = req.query;
    const skip = (Number(page) - 1) * Number(limit);

    let whereClause: any = {};

    if (status) {
      whereClause.status = status;
    }
    
    if (paymentStatus) {
      whereClause.paymentStatus = paymentStatus;
    }
    
    if (search) {
      whereClause.OR = [
        { orderNumber: { contains: search as string, mode: 'insensitive' } },
        { user: { name: { contains: search as string, mode: 'insensitive' } } },
        { user: { email: { contains: search as string, mode: 'insensitive' } } }
      ];
    }

    const [orders, total] = await Promise.all([
      prisma.order.findMany({
        where: whereClause,
        include: {
          user: {
            select: { id: true, name: true, email: true }
          },
          shippingAddress: true,
          items: {
            include: {
              product: {
                select: { id: true, name: true, images: { take: 1 } }
              }
            }
          },
          payments: true
        },
        skip,
        take: Number(limit),
        orderBy: { createdAt: 'desc' }
      }),
      prisma.order.count({ where: whereClause })
    ]);

    res.json({
      success: true,
      data: {
        orders,
        pagination: {
          currentPage: Number(page),
          totalPages: Math.ceil(total / Number(limit)),
          totalOrders: total,
          hasNextPage: skip + Number(limit) < total,
          hasPrevPage: Number(page) > 1
        }
      }
    });
  } catch (error) {
    console.error('Get orders error:', error);
    res.status(500).json({
      success: false,
      message: 'Internal server error'
    });
  }
};

export const updateOrderStatus = async (req: AdminRequest, res: Response) => {
  try {
    const { orderId } = req.params;
    const { status, paymentStatus, notes } = req.body;

    const updateData: any = {};
    
    if (status) updateData.status = status;
    if (paymentStatus) updateData.paymentStatus = paymentStatus;
    if (notes !== undefined) updateData.notes = notes;

    const order = await prisma.order.update({
      where: { id: orderId },
      data: updateData,
      include: {
        user: {
          select: { name: true, email: true }
        },
        items: {
          include: {
            product: {
              select: { name: true }
            }
          }
        }
      }
    });

    res.json({
      success: true,
      message: 'Order updated successfully',
      data: { order }
    });
  } catch (error) {
    console.error('Update order error:', error);
    res.status(500).json({
      success: false,
      message: 'Internal server error'
    });
  }
};

// User Management
export const getAllUsers = async (req: AdminRequest, res: Response) => {
  try {
    const { page = 1, limit = 20, role, search, isActive } = req.query;
    const skip = (Number(page) - 1) * Number(limit);

    let whereClause: any = {};

    if (role) {
      whereClause.role = role;
    }
    
    if (isActive !== undefined) {
      whereClause.isActive = isActive === 'true';
    }
    
    if (search) {
      whereClause.OR = [
        { name: { contains: search as string, mode: 'insensitive' } },
        { email: { contains: search as string, mode: 'insensitive' } }
      ];
    }

    const [users, total] = await Promise.all([
      prisma.user.findMany({
        where: whereClause,
        select: {
          id: true,
          name: true,
          email: true,
          role: true,
          isActive: true,
          createdAt: true,
          _count: {
            select: {
              orders: true,
              reviews: true
            }
          }
        },
        skip,
        take: Number(limit),
        orderBy: { createdAt: 'desc' }
      }),
      prisma.user.count({ where: whereClause })
    ]);

    res.json({
      success: true,
      data: {
        users: users.map(user => ({
          ...user,
          orderCount: user._count.orders,
          reviewCount: user._count.reviews
        })),
        pagination: {
          currentPage: Number(page),
          totalPages: Math.ceil(total / Number(limit)),
          totalUsers: total,
          hasNextPage: skip + Number(limit) < total,
          hasPrevPage: Number(page) > 1
        }
      }
    });
  } catch (error) {
    console.error('Get users error:', error);
    res.status(500).json({
      success: false,
      message: 'Internal server error'
    });
  }
};

export const updateUserStatus = async (req: AdminRequest, res: Response) => {
  try {
    const { userId } = req.params;
    const { isActive, role } = req.body;

    // Prevent super admins from being deactivated by regular admins
    if (req.user?.role === 'ADMIN') {
      const targetUser = await prisma.user.findUnique({
        where: { id: userId },
        select: { role: true }
      });
      
      if (targetUser?.role === 'SUPER_ADMIN') {
        return res.status(403).json({
          success: false,
          message: 'Cannot modify super admin users'
        });
      }
    }

    const updateData: any = {};
    if (isActive !== undefined) updateData.isActive = isActive;
    if (role) updateData.role = role;

    const user = await prisma.user.update({
      where: { id: userId },
      data: updateData,
      select: {
        id: true,
        name: true,
        email: true,
        role: true,
        isActive: true,
        createdAt: true
      }
    });

    res.json({
      success: true,
      message: 'User updated successfully',
      data: { user }
    });
  } catch (error) {
    console.error('Update user error:', error);
    res.status(500).json({
      success: false,
      message: 'Internal server error'
    });
  }
};

// Enhanced Product Management
export const createProduct = async (req: AdminRequest, res: Response) => {
  try {
    const {
      name,
      slug,
      description,
      shortDescription,
      sku,
      price,
      comparePrice,
      costPrice,
      categoryId,
      quantity,
      minQuantity,
      weight,
      dimensions,
      isFeatured,
      metaTitle,
      metaDescription,
      tags,
      images
    } = req.body;

    const product = await prisma.product.create({
      data: {
        name,
        slug,
        description,
        shortDescription,
        sku,
        price,
        comparePrice,
        costPrice,
        categoryId,
        quantity: quantity || 0,
        minQuantity: minQuantity || 0,
        weight,
        dimensions,
        isFeatured: isFeatured || false,
        metaTitle,
        metaDescription,
        tags: tags || [],
        images: images ? {
          create: images.map((img: any, index: number) => ({
            url: img.url,
            altText: img.altText,
            sortOrder: index,
            isPrimary: index === 0
          }))
        } : undefined
      },
      include: {
        category: true,
        images: true
      }
    });

    res.status(201).json({
      success: true,
      message: 'Product created successfully',
      data: { product }
    });
    // Audit log for creation
    await createAuditLog(req.user?.id, 'Product', product.id, { action: 'create', product });
    // Invalidate product listing cache
    clearCachePrefix('products:');
  } catch (error) {
    console.error('Create product error:', error);
    res.status(500).json({
      success: false,
      message: 'Internal server error'
    });
  }
};

export const updateProduct = async (req: AdminRequest, res: Response) => {
  try {
    const { productId } = req.params;
    const updateData = req.body;

    // Handle images separately if provided
    const { images, ...productData } = updateData;

    const product = await prisma.product.update({
      where: { id: productId },
      data: {
        ...productData,
        ...(images && {
          images: {
            deleteMany: {},
            create: images.map((img: any, index: number) => ({
              url: img.url,
              altText: img.altText,
              sortOrder: index,
              isPrimary: index === 0
            }))
          }
        })
      },
      include: {
        category: true,
        images: true
      }
    });

    res.json({
      success: true,
      message: 'Product updated successfully',
      data: { product }
    });
    // Audit log for update
    await createAuditLog(req.user?.id, 'Product', product.id, { action: 'update', product });
    // Invalidate product listing cache
    clearCachePrefix('products:');
  } catch (error) {
    console.error('Update product error:', error);
    res.status(500).json({
      success: false,
      message: 'Internal server error'
    });
  }
};

export const deleteProduct = async (req: AdminRequest, res: Response) => {
  try {
    const { productId } = req.params;

    await prisma.product.update({
      where: { id: productId },
      data: { isActive: false }
    });

    res.json({
      success: true,
      message: 'Product deactivated successfully'
    });
    // Audit log for deactivation
    await createAuditLog(req.user?.id, 'Product', productId, { action: 'deactivate' });
    // Invalidate product listing cache
    clearCachePrefix('products:');
  } catch (error) {
    console.error('Delete product error:', error);
    res.status(500).json({
      success: false,
      message: 'Internal server error'
    });
  }
};

// Helper to create audit log entries
const createAuditLog = async (userId: string | undefined, entityType: string, entityId: string, changes: any) => {
  try {
    await prisma.auditLog.create({
      data: {
        entityType,
        entityId,
        changes,
        editedBy: userId
      }
    });
  } catch (err) {
    console.error('Failed to create audit log:', err);
  }
};

// Publish / Unpublish Product
export const publishProduct = async (req: AdminRequest, res: Response) => {
  try {
    const { productId } = req.params;

    const product = await prisma.product.update({
      where: { id: productId },
      data: {
        published: true,
        publishedAt: new Date(),
        publishedBy: req.user?.id
      }
    });

    // Create audit log
    await createAuditLog(req.user?.id, 'Product', productId, { action: 'publish', product });

    res.json({ success: true, message: 'Product published', data: { product } });
    // Invalidate product listing cache
    clearCachePrefix('products:');
  } catch (error) {
    console.error('Publish product error:', error);
    res.status(500).json({ success: false, message: 'Internal server error' });
  }
};

export const unpublishProduct = async (req: AdminRequest, res: Response) => {
  try {
    const { productId } = req.params;

    const product = await prisma.product.update({
      where: { id: productId },
      data: {
        published: false,
        publishedAt: null,
        publishedBy: null
      }
    });

    await createAuditLog(req.user?.id, 'Product', productId, { action: 'unpublish', product });

    res.json({ success: true, message: 'Product unpublished', data: { product } });
    // Invalidate product listing cache
    clearCachePrefix('products:');
  } catch (error) {
    console.error('Unpublish product error:', error);
    res.status(500).json({ success: false, message: 'Internal server error' });
  }
};

// Publish / Unpublish Category
export const publishCategory = async (req: AdminRequest, res: Response) => {
  try {
    const { categoryId } = req.params;

    const category = await prisma.category.update({
      where: { id: categoryId },
      data: {
        published: true,
        publishedAt: new Date(),
        publishedBy: req.user?.id
      }
    });

    await createAuditLog(req.user?.id, 'Category', categoryId, { action: 'publish', category });

    res.json({ success: true, message: 'Category published', data: { category } });
    // Invalidate categories and product listing cache
    clearCachePrefix('categories:');
    clearCachePrefix('products:');
  } catch (error) {
    console.error('Publish category error:', error);
    res.status(500).json({ success: false, message: 'Internal server error' });
  }
};

export const unpublishCategory = async (req: AdminRequest, res: Response) => {
  try {
    const { categoryId } = req.params;

    const category = await prisma.category.update({
      where: { id: categoryId },
      data: {
        published: false,
        publishedAt: null,
        publishedBy: null
      }
    });

    await createAuditLog(req.user?.id, 'Category', categoryId, { action: 'unpublish', category });

    res.json({ success: true, message: 'Category unpublished', data: { category } });
    // Invalidate categories and product listing cache
    clearCachePrefix('categories:');
    clearCachePrefix('products:');
  } catch (error) {
    console.error('Unpublish category error:', error);
    res.status(500).json({ success: false, message: 'Internal server error' });
  }
};

export const getAdminProducts = async (req: AdminRequest, res: Response) => {
  try {
    const { page = 1, limit = 20, category, search, status } = req.query;
    const skip = (Number(page) - 1) * Number(limit);

    let whereClause: any = {};

    if (category) {
      whereClause.categoryId = category;
    }
    
    if (status) {
      // Support filtering by published/unpublished or active
      if (status === 'published') whereClause.published = true;
      else if (status === 'unpublished') whereClause.published = false;
      else whereClause.isActive = status === 'active';
    }
    
    if (search) {
      whereClause.OR = [
        { name: { contains: search as string, mode: 'insensitive' } },
        { sku: { contains: search as string, mode: 'insensitive' } }
      ];
    }

    const [products, total] = await Promise.all([
      prisma.product.findMany({
        where: whereClause,
        include: {
          category: {
            select: { id: true, name: true }
          },
          images: {
            take: 1,
            orderBy: { sortOrder: 'asc' }
          },
          _count: {
            select: { 
              orderItems: true,
              reviews: true 
            }
          }
        },
        skip,
        take: Number(limit),
        orderBy: { createdAt: 'desc' }
      }),
      prisma.product.count({ where: whereClause })
    ]);

    res.json({
      success: true,
      data: {
        products: products.map(product => ({
          ...product,
          orderCount: product._count.orderItems,
          reviewCount: product._count.reviews
        })),
        pagination: {
          currentPage: Number(page),
          totalPages: Math.ceil(total / Number(limit)),
          totalProducts: total,
          hasNextPage: skip + Number(limit) < total,
          hasPrevPage: Number(page) > 1
        }
      }
    });
  } catch (error) {
    console.error('Get admin products error:', error);
    res.status(500).json({
      success: false,
      message: 'Internal server error'
    });
  }
};

// Categories Management
export const getAllCategories = async (req: AdminRequest, res: Response) => {
  try {
    const categories = await prisma.category.findMany({
      where: { isActive: true },
      select: {
        id: true,
        name: true,
        slug: true,
        description: true,
        productCount: true
      },
      orderBy: { sortOrder: 'asc' }
    });

    res.json({
      success: true,
      data: { categories }
    });
  } catch (error) {
    console.error('Get categories error:', error);
    res.status(500).json({
      success: false,
      message: 'Internal server error'
    });
  }
};
