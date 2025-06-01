// src/lib/prisma.ts
import { PrismaClient } from '../generated/prisma'; // <-- Use the generated client

// Add PrismaClient to the global type
declare global {
  var prisma: PrismaClient | undefined; // Use var instead of let/const for global
}

let prisma: PrismaClient;

if (process.env.NODE_ENV === 'production') {
  prisma = new PrismaClient();
} else {
  // Prevent multiple instances in development HMR
  if (!global.prisma) {
    global.prisma = new PrismaClient();
  }
  prisma = global.prisma;
}

export default prisma;
