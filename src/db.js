import { PrismaClient } from '@prisma/client';

// Initialize Prisma Client
const prisma = new PrismaClient();

// Function to connect to the database
export async function connectDB() {
    try {
        console.log('Attempting to connect to the database...');

        // Explicitly connect to the database
        await prisma.$connect();

        console.log('✅ Database connection successful!');
    } catch (error) {
        console.error('❌ Failed to connect to the database:');
        console.error(error);
        process.exit(1); // Exit the process if the connection fails
    }
}