import fp from 'fastify-plugin';
import jwt from '@fastify/jwt';

import type { FastifyRequest, FastifyReply, FastifyPluginAsync } from 'fastify';

export const jwtPlugin: FastifyPluginAsync = fp(async (app) => {
  await app.register(jwt, {
    secret: process.env.JWT_SECRET || 'SUPER_SECRET',
    sign: {
      expiresIn: '1d',
    },
    verify: {
      extractToken: (request) => {
        const authHeader = request.headers.authorization;
        if (authHeader && authHeader.startsWith('Bearer ')) {
          return authHeader.substring(7);
        }
        return undefined;
      },
    },
  });

  app.decorate(
    'authenticate',
    async function (request: FastifyRequest, reply: FastifyReply) {
      try {
        await request.jwtVerify();
      } catch {
        reply.code(401).send({ error: 'Invalid or expired token!' });
      }
    },
  );
});
