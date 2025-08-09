import { clientRoutes } from './client.routes.ts';
import type { FastifyPluginAsync } from 'fastify';

export const routes: FastifyPluginAsync = async (app) => {
  await app.register(clientRoutes, { prefix: '/client' });
};
