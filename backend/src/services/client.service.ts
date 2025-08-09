import type { PrismaClient, Client } from '../generated/prisma/index.js';
import type { HttpErrors } from '@fastify/sensible';
import type {
  CreateClientData,
  UpdateClientData,
} from '../types/client.types.ts';

export class ClientService {
  private error: HttpErrors;
  private prisma: PrismaClient;

  constructor(error: HttpErrors, prisma: PrismaClient) {
    this.error = error;
    this.prisma = prisma;
  }

  create = async (data: CreateClientData): Promise<Client> => {
    const clientFound = await this.prisma.client.findUnique({
      where: { email: data.email },
    });
    if (clientFound) throw this.error.badRequest('Email already exists');

    return this.prisma.client.create({ data });
  };

  getAll = async (): Promise<Client[]> => {
    return this.prisma.client.findMany();
  };

  getById = async (id: string): Promise<Client> => {
    const clientFound = await this.prisma.client.findUnique({
      where: { id },
      include: {
        goals: true,
        wallet: true,
        events: true,
        simulations: true,
      },
    });
    if (!clientFound) throw this.error.notFound('Client not found');

    return clientFound;
  };

  update = async (id: string, data: UpdateClientData): Promise<Client> => {
    const clientFound = await this.prisma.client.findUnique({ where: { id } });
    if (!clientFound) throw this.error.notFound('Client not found');

    if (data.email !== clientFound.email) {
      const foundByEmail = await this.prisma.client.findUnique({
        where: { email: data.email },
      });
      if (foundByEmail) throw this.error.badRequest('Email already exists');
    }

    return this.prisma.client.update({
      where: { id },
      data,
    });
  };

  delete = async (id: string): Promise<Client> => {
    const clientFound = await this.prisma.client.findUnique({ where: { id } });
    if (!clientFound) throw this.error.notFound('Client not found');

    return this.prisma.client.delete({
      where: { id },
    });
  };
}
