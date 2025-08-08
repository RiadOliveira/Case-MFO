import { getHelloSchema } from '../schemas/hello.schemas.ts';
import { HelloService } from '../services/hello.service.ts';
import { HelloController } from '../controllers/hello.controller.ts';

import type { FastifyPluginAsync } from 'fastify';
import type { ZodTypeProvider } from 'fastify-type-provider-zod';

export const helloRoutes: FastifyPluginAsync = async (app) => {
  const controller = new HelloController(new HelloService(app.prisma));

  app
    .withTypeProvider<ZodTypeProvider>()
    .get('/', getHelloSchema, controller.getHello);
};
