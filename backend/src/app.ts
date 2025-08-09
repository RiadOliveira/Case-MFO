import fastify from 'fastify';

import {
  serializerCompiler,
  validatorCompiler,
} from 'fastify-type-provider-zod';

import { errorPlugin } from './plugins/error.ts';
import { prismaPlugin } from './plugins/prisma.ts';
import { jwtPlugin } from './plugins/jwt.ts';
import { swaggerPlugin } from './plugins/swagger.ts';
import { sensiblePlugin } from './plugins/sensible.ts';
import { routes } from './routes/index.ts';

const LOGGER_CONFIG = {
  logger: {
    transport: {
      target: 'pino-pretty',
    },
  },
} as const;

export async function build(logger = false) {
  const app = fastify(logger ? LOGGER_CONFIG : undefined);

  app.setValidatorCompiler(validatorCompiler);
  app.setSerializerCompiler(serializerCompiler);

  await app.register(errorPlugin);
  await app.register(prismaPlugin);
  await app.register(jwtPlugin);
  await app.register(swaggerPlugin);
  await app.register(sensiblePlugin);

  await app.register(routes);
  return app;
}
