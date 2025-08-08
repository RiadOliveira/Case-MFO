import type { PrismaClient } from '../generated/prisma/index.js';

export class HelloService {
  private prisma: PrismaClient;

  constructor(prisma: PrismaClient) {
    this.prisma = prisma;
  }

  getHelloMessage = async () => {
    return { message: 'Hello world!' };
  };
}
