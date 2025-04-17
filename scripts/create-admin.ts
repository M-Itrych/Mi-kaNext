// scripts/create-admin-user.ts
import { PrismaClient } from '@prisma/client';
import * as bcrypt from 'bcrypt';

const prisma = new PrismaClient();

async function main() {
  const email = 'dasasdasasd';
  const password = 'saddaads';
  const firstName = 'Admin';
  const lastName = 'User';
  
  const hashedPassword = await bcrypt.hash(password, 10);
  
  try {
    const existingUser = await prisma.user.findUnique({
      where: {
        email,
      },
    });

    if (existingUser) {
      console.log(`User with email ${email} already exists.`);
      return;
    }
    
    // Create the admin user
    const user = await prisma.user.create({
      data: {
        email,
        password: hashedPassword,
        firstName,
        lastName,
        role: 'ADMIN', // Set role to ADMIN
      },
    });
    
    console.log(`Admin user created successfully: ${user.id}`);
  } catch (error) {
    console.error('Error creating admin user:', error);
  } finally {
    await prisma.$disconnect();
  }
}

main()
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });