-- AlterTable
ALTER TABLE "public"."categories" ADD COLUMN     "productCount" INTEGER NOT NULL DEFAULT 0;

-- AlterTable
ALTER TABLE "public"."product_images" ADD COLUMN     "isPrimary" BOOLEAN NOT NULL DEFAULT false;

-- AlterTable
ALTER TABLE "public"."products" ADD COLUMN     "averageRating" DECIMAL(3,2) DEFAULT 0,
ADD COLUMN     "reviewCount" INTEGER NOT NULL DEFAULT 0;

-- CreateIndex
CREATE INDEX "products_categoryId_idx" ON "public"."products"("categoryId");

-- CreateIndex
CREATE INDEX "products_isFeatured_createdAt_idx" ON "public"."products"("isFeatured", "createdAt");

-- CreateIndex
CREATE INDEX "products_isActive_idx" ON "public"."products"("isActive");

-- CreateIndex
CREATE INDEX "products_slug_idx" ON "public"."products"("slug");
