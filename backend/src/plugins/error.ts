import fp from 'fastify-plugin';

import type { FastifyPluginAsync } from 'fastify';

export const errorPlugin: FastifyPluginAsync = fp(async (app) => {
  app.setErrorHandler((error, _request, reply) => {
    const { validation, statusCode } = error;

    if (validation) {
      return reply.status(400).send({
        error: 'Validation Error',
        message: 'Invalid request data',
        details: validation,
      });
    }

    if (!statusCode || statusCode >= 500) {
      return reply.status(500).send({
        error: 'Internal Server Error',
      });
    }

    return reply.status(statusCode).send({
      error: error.message || 'Client Error',
    });
  });
});
