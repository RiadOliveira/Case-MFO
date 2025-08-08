import fp from 'fastify-plugin';

import { PrismaClient } from '../generated/prisma/index.js';
import type { FastifyPluginAsync } from 'fastify';

export const prismaPlugin: FastifyPluginAsync = fp(async (app) => {
  const prisma = new PrismaClient();
  app.decorate('prisma', prisma);

  app.addHook('onClose', async (server) => {
    await server.prisma.$disconnect();
  });
});
