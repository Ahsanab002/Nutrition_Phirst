-- Performance optimization fields migration
-- Run this SQL against your database to add the optimization fields

-- Add computed fields to Product table
ALTER TABLE "Product" ADD COLUMN IF NOT EXISTS "averageRating" DECIMAL(3,2) DEFAULT 0;
ALTER TABLE "Product" ADD COLUMN IF NOT EXISTS "reviewCount" INTEGER DEFAULT 0;

-- Add computed field to Category table  
ALTER TABLE "Category" ADD COLUMN IF NOT EXISTS "productCount" INTEGER DEFAULT 0;

-- Add isPrimary field to ProductImage table
ALTER TABLE "ProductImage" ADD COLUMN IF NOT EXISTS "isPrimary" BOOLEAN DEFAULT false;

-- Create indexes for better query performance
CREATE INDEX CONCURRENTLY IF NOT EXISTS "idx_products_category_active" ON "Product"("categoryId", "isActive");
CREATE INDEX CONCURRENTLY IF NOT EXISTS "idx_products_featured_created" ON "Product"("isFeatured", "createdAt");
CREATE INDEX CONCURRENTLY IF NOT EXISTS "idx_product_images_primary" ON "ProductImage"("productId", "isPrimary");
CREATE INDEX CONCURRENTLY IF NOT EXISTS "idx_categories_slug" ON "Category"("slug");

-- Update existing data with computed values
-- Update product average ratings and review counts
UPDATE "Product" SET 
  "averageRating" = (
    SELECT COALESCE(ROUND(AVG("rating")::numeric, 2), 0) 
    FROM "Review" 
    WHERE "productId" = "Product"."id"
  ),
  "reviewCount" = (
    SELECT COUNT(*)::INTEGER 
    FROM "Review" 
    WHERE "productId" = "Product"."id"
  );

-- Update category product counts
UPDATE "Category" SET 
  "productCount" = (
    SELECT COUNT(*)::INTEGER 
    FROM "Product" 
    WHERE "categoryId" = "Category"."id" AND "isActive" = true
  );

-- Mark first image as primary for each product
UPDATE "ProductImage" SET "isPrimary" = true 
WHERE "id" IN (
  SELECT DISTINCT ON ("productId") "id" 
  FROM "ProductImage" 
  ORDER BY "productId", "sortOrder" ASC, "id" ASC
);