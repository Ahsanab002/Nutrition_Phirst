import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcrypt';

const prisma = new PrismaClient();

async function seedCategories() {
  console.log('🌱 Starting category seeding...');

  try {
    // Create categories
    const categories = await prisma.category.createMany({
      data: [
        {
          name: 'Skincare',
          slug: 'skincare',
          description: 'Premium skincare products for healthy skin',
          sortOrder: 1
        },
        {
          name: 'Anti Aging NAD+ Supplement',
          slug: 'anti-aging-nad-supplement',
          description: 'Advanced anti-aging NAD+ solutions',
          sortOrder: 2
        },
        {
          name: 'Digestive',
          slug: 'digestive',
          description: 'Digestive health and gut wellness products',
          sortOrder: 3
        },
        {
          name: 'Brain Health',
          slug: 'brain-health',
          description: 'Brain health and cognitive function',
          sortOrder: 4
        },
        {
          name: 'NAD+ Gummies Energy',
          slug: 'nad-gummies-energy',
          description: 'NAD+ energy gummies for vitality',
          sortOrder: 5
        },
        {
          name: 'Detox & Cleanse',
          slug: 'detox-cleanse',
          description: 'Detoxification and cleansing products',
          sortOrder: 6
        }
      ],
      skipDuplicates: true
    });

    console.log(`✅ Created ${categories.count} categories`);

    // Create an admin user if it doesn't exist
    const adminEmail = 'admin@yourshop.com';
    const existingAdmin = await prisma.user.findUnique({
      where: { email: adminEmail }
    });

    if (!existingAdmin) {
      const hashedPassword = await bcrypt.hash('Admin#2025!', 10);
      
      const admin = await prisma.user.create({
        data: {
          email: adminEmail,
          name: 'Admin User',
          password: hashedPassword,
          role: 'ADMIN'
        }
      });

      console.log(`✅ Created admin user: ${admin.email}`);
    } else {
      console.log('✅ Admin user already exists');
    }

    // Create some sample products
    const sampleProducts = [
      {
        name: 'Premium Vitamin D3',
        slug: 'premium-vitamin-d3',
        description: 'High-quality Vitamin D3 supplement for bone health and immune support',
        shortDescription: 'Premium Vitamin D3 for optimal health',
        sku: 'VIT-D3-001',
        price: 29.99,
        comparePrice: 39.99,
        quantity: 100,
        isFeatured: true,
        metaTitle: 'Premium Vitamin D3 - Essential Vitamin Supplement',
        metaDescription: 'Get the highest quality Vitamin D3 supplement for bone health and immune support.'
      },
      {
        name: 'Omega-3 Fish Oil',
        slug: 'omega-3-fish-oil',
        description: 'Pure Omega-3 fish oil capsules for heart and brain health',
        shortDescription: 'Pure Omega-3 for heart and brain health',
        sku: 'OMEGA3-001',
        price: 34.99,
        quantity: 75,
        isFeatured: true,
        metaTitle: 'Omega-3 Fish Oil - Heart & Brain Health',
        metaDescription: 'Premium Omega-3 fish oil capsules for cardiovascular and cognitive support.'
      },
      {
        name: 'Multivitamin Complex',
        slug: 'multivitamin-complex',
        description: 'Complete daily multivitamin with essential vitamins and minerals',
        shortDescription: 'Complete daily multivitamin',
        sku: 'MULTI-001',
        price: 24.99,
        quantity: 150,
        metaTitle: 'Daily Multivitamin Complex - Complete Nutrition',
        metaDescription: 'Get all your daily vitamins and minerals in one convenient supplement.'
      }
    ];

    // Get the Skincare category ID
    const skincareCategory = await prisma.category.findUnique({
      where: { slug: 'skincare' }
    });

    if (skincareCategory) {
      for (const productData of sampleProducts) {
        await prisma.product.upsert({
          where: { sku: productData.sku },
          update: {},
          create: {
            ...productData,
            categoryId: skincareCategory.id,
            images: {
              create: [
                {
                  url: '/images/placeholder-product.jpg',
                  altText: productData.name,
                  sortOrder: 0,
                  isPrimary: true
                }
              ]
            }
          }
        });
      }

      console.log(`✅ Created ${sampleProducts.length} sample products`);
    }

    console.log('✅ Database seeding completed successfully!');
    
  } catch (error) {
    console.error('❌ Error seeding database:', error);
    throw error;
  }
}

async function main() {
  try {
    await seedCategories();
  } catch (error) {
    console.error(error);
    process.exit(1);
  } finally {
    await prisma.$disconnect();
  }
}

if (require.main === module) {
  main();
}

