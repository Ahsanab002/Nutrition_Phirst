import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

async function main() {
  // ⚠️ Use EXACT slugs from your DB
  const items = [
    { productSlug: 'matrixyl-peptide-complex', displayOrder: 1 },
    { productSlug: 'nad-nicotinamide-riboside-gummies', displayOrder: 2 },
  ];

  for (const item of items) {
    await prisma.curatedCategoryProduct.upsert({
      where: {
        categorySlug_productSlug: {
          categorySlug: 'anti-aging',
          productSlug: item.productSlug,
        },
      },
      update: { displayOrder: item.displayOrder },
      create: {
        categorySlug: 'anti-aging',
        productSlug: item.productSlug,
        displayOrder: item.displayOrder,
      },
    });
  }

  console.log('✅ Seeded curation for Anti-Aging');
}

main()
  .catch((e) => {
    console.error('❌ Seed failed:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
