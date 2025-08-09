import type { PrismaClient, Client } from '../generated/prisma/index.js';
import type {
  CreateClientData,
  UpdateClientData,
} from '../types/client.types.ts';

export class ClientService {
  private prisma: PrismaClient;

  constructor(prisma: PrismaClient) {
    this.prisma = prisma;
  }

  create = async (data: CreateClientData): Promise<Client> => {
    return this.prisma.client.create({ data });
  };

  getAll = async (): Promise<Client[]> => {
    return this.prisma.client.findMany();
  };

  getById = async (id: string): Promise<Client | null> => {
    return this.prisma.client.findUnique({
      where: { id },
      include: {
        goals: true,
        wallet: true,
        events: true,
        simulations: true,
      },
    });
  };

  update = async (id: string, data: UpdateClientData): Promise<Client> => {
    return this.prisma.client.update({
      where: { id },
      data,
    });
  };

  delete = async (id: string): Promise<Client> => {
    return this.prisma.client.delete({
      where: { id },
    });
  };
}
