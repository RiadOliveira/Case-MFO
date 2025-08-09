import type { FastifyInstance } from 'fastify';
import { ClientController } from '../controllers/client.controller.ts';
import { ClientService } from '../services/client.service.ts';
import { CLIENT_SCHEMAS } from '../schemas/client.schemas.ts';

export async function clientRoutes(app: FastifyInstance) {
  const controller = new ClientController(new ClientService(app.prisma));

  app.post('', CLIENT_SCHEMAS.create, controller.create);
  app.get('', CLIENT_SCHEMAS.getAll, controller.getAll);
  app.get('/:id', CLIENT_SCHEMAS.getById, controller.getById);
  app.put('/:id', CLIENT_SCHEMAS.update, controller.update);
  app.delete('/:id', CLIENT_SCHEMAS.delete, controller.delete);
}
