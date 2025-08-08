import { helloRoutes } from './hello.routes.ts';

import type { FastifyPluginAsync } from 'fastify';

export const routes: FastifyPluginAsync = async (app) => {
  await app.register(helloRoutes, { prefix: '/hello' });
};
