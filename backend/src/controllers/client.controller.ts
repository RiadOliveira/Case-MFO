import type { FastifyRequest, FastifyReply } from 'fastify';
import type { ClientService } from '../services/client.service.ts';
import type {
  CreateClientData,
  UpdateClientData,
} from '../types/client.types.ts';
import type { ResourceId } from '../types/common.types.ts';

export class ClientController {
  private clientService: ClientService;

  constructor(clientService: ClientService) {
    this.clientService = clientService;
  }

  create = async (
    { body }: FastifyRequest<{ Body: CreateClientData }>,
    reply: FastifyReply,
  ) => {
    const client = await this.clientService.create(body);
    return reply.code(201).send(client);
  };

  getAll = async (_request: FastifyRequest, reply: FastifyReply) => {
    const result = await this.clientService.getAll();
    return reply.code(200).send(result);
  };

  getById = async (
    { params: { id } }: FastifyRequest<{ Params: ResourceId }>,
    reply: FastifyReply,
  ) => {
    const client = await this.clientService.getById(id);
    return reply.code(200).send(client);
  };

  update = async (
    {
      params: { id },
      body,
    }: FastifyRequest<{ Params: ResourceId; Body: UpdateClientData }>,
    reply: FastifyReply,
  ) => {
    const client = await this.clientService.update(id, body);
    return reply.code(200).send(client);
  };

  delete = async (
    { params: { id } }: FastifyRequest<{ Params: ResourceId }>,
    reply: FastifyReply,
  ) => {
    await this.clientService.delete(id);
    return reply.code(204).send();
  };
}
