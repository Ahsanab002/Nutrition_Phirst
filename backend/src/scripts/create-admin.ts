import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcrypt';

const prisma = new PrismaClient();

async function createAdminUser() {
  try {
    const adminEmail = 'admin@yourshop.com';
    const adminPassword = 'Admin#2025!';
    
    // Check if admin already exists
    const existingAdmin = await prisma.user.findUnique({
      where: { email: adminEmail }
    });

    if (existingAdmin) {
      console.log('Admin user already exists');
      
      // Update to admin role if needed
      if (existingAdmin.role !== 'ADMIN') {
        await prisma.user.update({
          where: { email: adminEmail },
          data: { role: 'ADMIN', isActive: true }
        });
        console.log('Updated existing user to admin role');
      }
      
      return;
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(adminPassword, 12);

    // Create admin user
    const adminUser = await prisma.user.create({
      data: {
        name: 'System Administrator',
        email: adminEmail,
        password: hashedPassword,
        role: 'ADMIN',
        isActive: true
      }
    });

    console.log('Admin user created successfully:');
    console.log(`Email: ${adminUser.email}`);
    console.log(`Password: ${adminPassword}`);
    console.log(`Role: ${adminUser.role}`);
    
    // Create a super admin as well
    const superAdminEmail = 'superadmin@yourshop.com';
    const superAdminPassword = 'SuperAdmin#2025!';
    
    const existingSuperAdmin = await prisma.user.findUnique({
      where: { email: superAdminEmail }
    });

    if (!existingSuperAdmin) {
      const hashedSuperAdminPassword = await bcrypt.hash(superAdminPassword, 12);
      
      const superAdminUser = await prisma.user.create({
        data: {
          name: 'Super Administrator',
          email: superAdminEmail,
          password: hashedSuperAdminPassword,
          role: 'SUPER_ADMIN',
          isActive: true
        }
      });

      console.log('\nSuper admin user created successfully:');
      console.log(`Email: ${superAdminUser.email}`);
      console.log(`Password: ${superAdminPassword}`);
      console.log(`Role: ${superAdminUser.role}`);
    } else if (existingSuperAdmin.role !== 'SUPER_ADMIN') {
      await prisma.user.update({
        where: { email: superAdminEmail },
        data: { role: 'SUPER_ADMIN', isActive: true }
      });
      console.log('Updated existing user to super admin role');
    }

  } catch (error) {
    console.error('Error creating admin user:', error);
  } finally {
    await prisma.$disconnect();
  }
}

createAdminUser();
