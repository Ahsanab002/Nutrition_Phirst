import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function createSampleOrders() {
  try {
    console.log('Creating sample orders...');

    // Get existing users and products
    const users = await prisma.user.findMany({ take: 3 });
    const products = await prisma.product.findMany({ take: 5 });

    if (users.length === 0 || products.length === 0) {
      console.log('Need users and products to create orders. Please seed the database first.');
      return;
    }

    // Create sample orders
    const orders = [];
    
    for (let i = 0; i < 3; i++) {
      const user = users[i % users.length];
      const orderProducts = products.slice(0, 2 + i); // Different number of products per order
      
      const totalAmount = orderProducts.reduce((sum, product) => sum + Number(product.price), 0);
      
      // First create the address
      const address = await prisma.address.create({
        data: {
          firstName: user.name.split(' ')[0] || 'John',
          lastName: user.name.split(' ')[1] || 'Doe',
          addressLine1: `${123 + i} Main St`,
          city: 'New York',
          state: 'NY',
          postalCode: `1000${i}`,
          country: 'US',
          phone: `+1-555-000${i}`,
          userId: user.id
        }
      });

      const order = await prisma.order.create({
        data: {
          orderNumber: `ORD-2024-${String(1000 + i).padStart(4, '0')}`,
          userId: user.id,
          status: i === 0 ? 'PENDING' : i === 1 ? 'CONFIRMED' : 'DELIVERED',
          paymentStatus: i === 2 ? 'PAID' : 'PENDING',
          subtotal: totalAmount,
          taxAmount: totalAmount * 0.08, // 8% tax
          totalAmount: totalAmount * 1.08,
          currency: 'USD',
          shippingAddressId: address.id,
          items: {
            create: orderProducts.map((product, index) => ({
              productId: product.id,
              quantity: 1 + index,
              price: Number(product.price),
              total: Number(product.price) * (1 + index)
            }))
          },
          payments: {
            create: {
              amount: totalAmount * 1.08,
              currency: 'USD',
              status: i === 2 ? 'PAID' : 'PENDING',
              paymentMethod: 'CARD',
              transactionId: `txn_${Date.now()}_${i}`,
              gatewayResponse: {
                status: 'success',
                transactionId: `txn_${Date.now()}_${i}`
              }
            }
          }
        },
        include: {
          user: true,
          items: {
            include: {
              product: true
            }
          },
          payments: true,
          shippingAddress: true
        }
      });

      orders.push(order);
      console.log(`Created order: ${order.orderNumber} for user: ${user.name}`);
    }

    console.log(`✅ Created ${orders.length} sample orders successfully!`);
    
  } catch (error) {
    console.error('Error creating sample orders:', error);
  } finally {
    await prisma.$disconnect();
  }
}

createSampleOrders();
