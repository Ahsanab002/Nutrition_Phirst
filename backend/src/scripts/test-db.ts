import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function testDatabase() {
  try {
    console.log('🔍 Testing database connection...');
    
    // Test categories
    const categories = await prisma.category.findMany();
    console.log(`✅ Found ${categories.length} categories:`);
    categories.forEach(cat => console.log(`  - ${cat.name} (${cat.slug})`));
    
    // Test products
    const products = await prisma.product.findMany({
      include: {
        category: true,
        images: true
      }
    });
    console.log(`\n✅ Found ${products.length} products:`);
    products.forEach(product => {
      console.log(`  - ${product.name} ($${product.price})`);
      console.log(`    Category: ${product.category.name}`);
      console.log(`    Images: ${product.images.length}`);
    });
    
    console.log('\n🎉 Database test completed successfully!');
  } catch (error) {
    console.error('❌ Database test failed:', error);
  } finally {
    await prisma.$disconnect();
  }
}

testDatabase();