import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export const updateProductStats = async () => {
  console.log('Updating product statistics...');
  
  try {
    // Update average ratings and review counts for all products
    const products = await prisma.product.findMany({
      select: { id: true },
      where: { isActive: true }
    });

    for (const product of products) {
      const reviews = await prisma.review.findMany({
        where: { productId: product.id },
        select: { rating: true }
      });

      const averageRating = reviews.length > 0 
        ? reviews.reduce((sum, review) => sum + review.rating, 0) / reviews.length 
        : 0;

      await prisma.product.update({
        where: { id: product.id },
        data: {
          // Note: These fields need to be added to the schema
          // averageRating: Math.round(averageRating * 10) / 10,
          // reviewCount: reviews.length
        }
      });
    }

    // Update category product counts
    const categories = await prisma.category.findMany({
      select: { id: true },
      where: { isActive: true }
    });

    for (const category of categories) {
      const productCount = await prisma.product.count({
        where: { 
          categoryId: category.id,
          isActive: true 
        }
      });

      await prisma.category.update({
        where: { id: category.id },
        data: {
          // Note: This field needs to be added to the schema
          // productCount: productCount
        }
      });
    }

    console.log('Product statistics updated successfully');
  } catch (error) {
    console.error('Error updating product statistics:', error);
  }
};

// Run every 10 minutes
let statsInterval: NodeJS.Timeout;

export const startStatsUpdateJob = () => {
  // Run immediately
  updateProductStats();
  
  // Then run every 10 minutes
  statsInterval = setInterval(updateProductStats, 10 * 60 * 1000);
  console.log('Stats update job started - running every 10 minutes');
};

export const stopStatsUpdateJob = () => {
  if (statsInterval) {
    clearInterval(statsInterval);
    console.log('Stats update job stopped');
  }
};