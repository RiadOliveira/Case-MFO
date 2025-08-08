import fastify from 'fastify';

import {
  serializerCompiler,
  validatorCompiler,
} from 'fastify-type-provider-zod';

import { prismaPlugin } from './plugins/prisma.ts';
import { jwtPlugin } from './plugins/jwt.ts';
import { swaggerPlugin } from './plugins/swagger.ts';
import { routes } from './routes/index.ts';

export async function build() {
  const app = fastify();

  app.setValidatorCompiler(validatorCompiler);
  app.setSerializerCompiler(serializerCompiler);

  await app.register(prismaPlugin);
  await app.register(jwtPlugin);
  await app.register(swaggerPlugin);

  await app.register(routes);
  return app;
}
