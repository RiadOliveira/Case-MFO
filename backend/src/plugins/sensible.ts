import fp from 'fastify-plugin';
import sensible from '@fastify/sensible';

import type { FastifyPluginAsync } from 'fastify';

export const sensiblePlugin: FastifyPluginAsync = fp(async (app) => {
  await app.register(sensible);
});
