import fp from 'fastify-plugin';
import swagger from '@fastify/swagger';
import swaggerUi from '@fastify/swagger-ui';

import { jsonSchemaTransform } from 'fastify-type-provider-zod';
import type { FastifyPluginAsync } from 'fastify';

export const swaggerPlugin: FastifyPluginAsync = fp(async (app) => {
  await app.register(swagger, {
    openapi: {
      info: {
        title: 'API Case MFO',
        description: 'Documentação da API Case MFO',
        version: '1.0.0',
      },
      tags: [{ name: 'Test', description: 'Rotas de teste' }],
    },
    transform: jsonSchemaTransform,
  });

  await app.register(swaggerUi, {
    routePrefix: '/docs',
  });
});
