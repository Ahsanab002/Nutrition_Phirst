// src/routes/categoryCuratedRoutes.ts
import { Router, Request, Response, NextFunction } from 'express';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();
const router = Router();

/**
 * GET /api/categories/:slug/curated-products
 * Returns products curated for a category, in the curated order.
 */
router.get(
  '/api/categories/:slug/curated-products',
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { slug } = req.params;

      // 1) Get curated slugs in order
      const curated = await prisma.curatedCategoryProduct.findMany({
        where: { categorySlug: slug },
        orderBy: { displayOrder: 'asc' },
        select: { productSlug: true, displayOrder: true },
      });

      if (!curated.length) {
        return res.json({ products: [] });
      }

      const slugs = curated.map(c => c.productSlug);

      // 2) Fetch matching products (keep this in sync with your grid needs)
      const products = await prisma.product.findMany({
        where: { slug: { in: slugs }, isActive: true, published: true },
        include: {
          images: true,         // grid usually needs images
          category: true,       // optional
        },
      });

      // 3) Preserve curated order
      const bySlug = new Map(products.map(p => [p.slug, p]));
      const ordered = curated.map(c => bySlug.get(c.productSlug)).filter(Boolean);

      return res.json({ products: ordered });
    } catch (err) {
      next(err);
    }
  }
);

export default router;
