import { PrismaClient } from '@prisma/client';
import path from 'path';
import fs from 'fs';

const prisma = new PrismaClient();

const categories = [
  { name: 'Skincare', slug: 'skincare', description: 'Premium skincare products for healthy skin' },
  { name: 'Anti-Aging', slug: 'anti-aging', description: 'Advanced anti-aging solutions' },
  { name: 'Cognitive Health', slug: 'cognitive-health', description: 'Brain health and cognitive function' },
  { name: 'Detox & Cleanse', slug: 'detox-cleanse', description: 'Detoxification and cleansing products' },
  { name: 'NAD+ Supplements', slug: 'nad-supplements', description: 'NAD+ and longevity supplements' }
];

const products = [
  {
    name: 'Kojic Acid Skin Brightening Serum',
    slug: 'kojic-acid-serum',
    description: 'Professional-grade kojic acid serum for skin brightening and dark spot reduction. This powerful serum helps even skin tone, reduce hyperpigmentation, and reveal a more radiant complexion.',
    shortDescription: 'Brightening serum with kojic acid for dark spots',
    sku: 'KAS001',
    price: 49.99,
    comparePrice: 69.99,
    categorySlug: 'skincare',
    tags: ['kojic-acid', 'brightening', 'dark-spots', 'serum', 'hyperpigmentation'],
    imageFolder: 'kojic jpgs',
    isFeatured: true,
    weight: 1.0
  },
  {
    name: 'Methylene Blue Cognitive Enhancement',
    slug: 'methylene-blue-cognitive',
    description: 'Premium methylene blue supplement for cognitive enhancement and mitochondrial support. Supports brain function, mental clarity, and cellular energy production.',
    shortDescription: 'Cognitive enhancement supplement with methylene blue',
    sku: 'MBC001',
    price: 79.99,
    comparePrice: 99.99,
    categorySlug: 'cognitive-health',
    tags: ['methylene-blue', 'cognitive', 'brain-health', 'mitochondrial', 'nootropic'],
    imageFolder: 'methylene/methylene jpgs',
    isFeatured: true,
    weight: 0.2
  },
  {
    name: 'NAD+ Nicotinamide Riboside Gummies',
    slug: 'nad-nicotinamide-riboside',
    description: 'High-potency NAD+ supplement in delicious gummy form for cellular energy and anti-aging support. Supports healthy aging, energy metabolism, and cellular repair.',
    shortDescription: 'NAD+ anti-aging gummies for longevity',
    sku: 'NAD001',
    price: 89.99,
    comparePrice: 119.99,
    categorySlug: 'nad-supplements',
    tags: ['nad+', 'anti-aging', 'cellular-energy', 'longevity', 'gummies'],
    imageFolder: 'JPGS NAD GUMMIES',
    isFeatured: true,
    weight: 0.3
  },
  {
    name: 'Retinol + Collagen Anti-Aging Cream',
    slug: 'retinol-collagen-cream',
    description: 'Advanced retinol and collagen cream for wrinkle reduction and skin renewal. Combines the power of retinol with collagen peptides to smooth fine lines and improve skin texture.',
    shortDescription: 'Anti-aging cream with retinol and collagen',
    sku: 'RCC001',
    price: 59.99,
    comparePrice: 79.99,
    categorySlug: 'anti-aging',
    tags: ['retinol', 'collagen', 'anti-aging', 'wrinkles', 'peptides'],
    imageFolder: 'retinol/retinol jpgs/retinol jpgs',
    isFeatured: true,
    weight: 1.5
  },
  {
    name: 'Matrixyl Peptide Complex Serum',
    slug: 'matrixyl-peptide-complex',
    description: 'Professional matrixyl peptide complex for skin repair and collagen synthesis. Features advanced peptides that stimulate collagen production and improve skin firmness.',
    shortDescription: 'Peptide complex serum for skin repair',
    sku: 'MPC001',
    price: 69.99,
    comparePrice: 89.99,
    categorySlug: 'anti-aging',
    tags: ['matrixyl', 'peptides', 'skin-repair', 'collagen', 'firming'],
    imageFolder: 'matrixyl/matrixyl jpgs',
    isFeatured: false,
    weight: 1.0
  },
  {
    name: 'EDTA Chelation Therapy Supplement',
    slug: 'edta-chelation-therapy',
    description: 'EDTA chelation supplement for heavy metal detoxification and cardiovascular support. Helps remove toxic metals from the body while supporting heart health.',
    shortDescription: 'Heavy metal detox with EDTA chelation',
    sku: 'EDT001',
    price: 54.99,
    comparePrice: 74.99,
    categorySlug: 'detox-cleanse',
    tags: ['edta', 'chelation', 'detox', 'heavy-metals', 'cardiovascular'],
    imageFolder: 'Edta/edta jpgs',
    isFeatured: false,
    weight: 0.25
  },
  {
    name: 'Neuro Enhancement Complex',
    slug: 'neuro-enhancement-complex',
    description: 'Advanced nootropic blend for cognitive enhancement and brain health. Contains research-backed ingredients to support memory, focus, and mental performance.',
    shortDescription: 'Nootropic blend for brain enhancement',
    sku: 'NEC001',
    price: 74.99,
    comparePrice: 94.99,
    categorySlug: 'cognitive-health',
    tags: ['nootropics', 'brain-health', 'cognitive', 'enhancement', 'memory'],
    imageFolder: 'neuro/neuro jpgs',
    isFeatured: false,
    weight: 0.2
  },
  {
    name: 'Parasite Cleanse Formula',
    slug: 'parasite-cleanse-formula',
    description: 'Natural parasite cleanse formula with powerful herbal ingredients. Supports digestive health and helps eliminate unwanted organisms from the body.',
    shortDescription: 'Natural parasite cleanse with herbs',
    sku: 'PCF001',
    price: 44.99,
    comparePrice: 59.99,
    categorySlug: 'detox-cleanse',
    tags: ['parasite-cleanse', 'detox', 'herbal', 'natural', 'digestive'],
    imageFolder: 'parasite/parasite jpgs',
    isFeatured: false,
    weight: 0.3
  }
];

async function seedDatabase() {
  try {
    console.log('🌱 Starting database seeding...');

    // Create categories
    console.log('📁 Creating categories...');
    for (const category of categories) {
      await prisma.category.upsert({
        where: { slug: category.slug },
        update: {},
        create: category
      });
      console.log(`  ✅ Created category: ${category.name}`);
    }

    // Create products with images
    console.log('📦 Creating products...');
    for (const productData of products) {
      const { imageFolder, categorySlug, ...productInfo } = productData;
      
      const category = await prisma.category.findUnique({
        where: { slug: categorySlug }
      });

      if (!category) {
        console.log(`⚠️  Category ${categorySlug} not found, skipping product ${productInfo.name}`);
        continue;
      }

      const product = await prisma.product.upsert({
        where: { slug: productInfo.slug },
        update: {},
        create: {
          ...productInfo,
          categoryId: category.id,
          quantity: 100,
          minQuantity: 10,
          price: productInfo.price
        }
      });

      console.log(`  ✅ Created product: ${product.name}`);

      // Add images
      const imagesPath = path.join(__dirname, '../../Images', imageFolder);
      if (fs.existsSync(imagesPath)) {
        // First, delete existing images for this product
        await prisma.productImage.deleteMany({
          where: { productId: product.id }
        });

        const imageFiles = fs.readdirSync(imagesPath)
          .filter(file => /\.(jpg|jpeg|png|webp)$/i.test(file))
          .slice(0, 8); // Limit to 8 images per product

        for (let i = 0; i < imageFiles.length; i++) {
          const imageFile = imageFiles[i];
          await prisma.productImage.create({
            data: {
              productId: product.id,
              url: `/images/${imageFolder}/${imageFile}`,
              altText: `${product.name} - Image ${i + 1}`,
              sortOrder: i
            }
          });
        }
        console.log(`    📸 Added ${imageFiles.length} images`);
      } else {
        console.log(`    ⚠️  Image folder not found: ${imagesPath}`);
      }
    }

    // Add some sample reviews
    console.log('⭐ Adding sample reviews...');
    const users = await prisma.user.findMany({ take: 3 });
    const allProducts = await prisma.product.findMany();

    if (users.length > 0) {
      for (const product of allProducts.slice(0, 5)) {
        for (let i = 0; i < Math.min(users.length, 2); i++) {
          await prisma.review.upsert({
            where: {
              userId_productId: {
                userId: users[i].id,
                productId: product.id
              }
            },
            update: {},
            create: {
              userId: users[i].id,
              productId: product.id,
              rating: Math.floor(Math.random() * 2) + 4, // 4-5 stars
              title: 'Great product!',
              comment: 'Really happy with the quality and results.',
              isVerified: true
            }
          });
        }
      }
      console.log('  ✅ Added sample reviews');
    }

    console.log('✨ Database seeding completed successfully!');
    console.log(`📊 Created ${categories.length} categories and ${products.length} products`);
  } catch (error) {
    console.error('❌ Error seeding database:', error);
    throw error;
  } finally {
    await prisma.$disconnect();
  }
}

// Run the seeder
if (require.main === module) {
  seedDatabase()
    .then(() => {
      console.log('🎉 Seeding process completed!');
      process.exit(0);
    })
    .catch((error) => {
      console.error('💥 Seeding failed:', error);
      process.exit(1);
    });
}