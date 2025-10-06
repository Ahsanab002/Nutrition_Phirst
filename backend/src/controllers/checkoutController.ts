import { Request, Response } from 'express';
import prisma from '../config/database';

// Create an order (public endpoint). This supports guest checkout by creating a user if email not found.
export const createOrder = async (req: Request, res: Response) => {
  try {
    const payload = req.body;

    // Basic validation
    const { email, firstName, lastName, address, apartment, city, state, zipCode, country = 'PK', phone, items, subtotal, taxAmount = 0, shippingAmount = 0, totalAmount, paymentMethod = 'COD', notes } = payload;

    if (!email || !items || !Array.isArray(items) || items.length === 0) {
      return res.status(400).json({ success: false, message: 'Missing required fields (email, items).' });
    }

    // Find or create user (guest)
    let user = await prisma.user.findUnique({ where: { email } });
    if (!user) {
      user = await prisma.user.create({
        data: {
          email,
          name: `${firstName || ''} ${lastName || ''}`.trim() || email.split('@')[0],
          password: '', // guest account, password empty
          phone: phone || null
        }
      });
    }

    // Create shipping address
    const shippingAddress = await prisma.address.create({
      data: {
        userId: user.id,
        firstName: firstName || user.name.split(' ')[0] || '',
        lastName: lastName || user.name.split(' ')[1] || '',
        addressLine1: address || '',
        addressLine2: apartment || '',
        city: city || '',
        state: state || '',
        postalCode: zipCode || '',
        country: country || 'PK',
        phone: phone || null
      }
    });

    // Generate an order number
    const now = new Date();
    const seq = Math.floor(Math.random() * 9000) + 1000;
    const orderNumber = `ORD-${now.getFullYear()}-${seq}`;

    // Create order with items and payment (COD)
    const order = await prisma.order.create({
      data: {
        orderNumber,
        userId: user.id,
        status: 'PENDING',
        paymentStatus: 'PENDING',
        paymentMethod,
        subtotal: subtotal ?? 0,
        taxAmount: taxAmount ?? 0,
        shippingAmount: shippingAmount ?? 0,
        totalAmount: totalAmount ?? 0,
        currency: 'PKR',
        notes: notes ?? null,
        shippingAddressId: shippingAddress.id,
        items: {
          create: items.map((it: any) => ({
            productId: it.productId,
            quantity: it.quantity || 1,
            price: it.price ?? 0,
            total: (it.price ?? 0) * (it.quantity || 1)
          }))
        },
        payments: {
          create: {
            amount: totalAmount ?? 0,
            currency: 'PKR',
            status: 'PENDING',
            paymentMethod,
            isCashOnDelivery: true,
            codNotes: notes ?? null
          }
        }
      },
      include: {
        user: true,
        items: true,
        payments: true,
        shippingAddress: true
      }
    });

    return res.status(201).json({ success: true, message: 'Order created', data: { order } });
  } catch (error: any) {
    console.error('Create order error:', error);
    return res.status(500).json({ success: false, message: 'Internal server error', error: error.message });
  }
};
