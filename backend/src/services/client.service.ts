import type { PrismaClient, Client } from '../generated/prisma/index.js';
import type {
  CreateClientData,
  GetClientsParams,
  UpdateClientData,
} from '../types/client.types.ts';

export class ClientService {
  private prisma: PrismaClient;

  constructor(prisma: PrismaClient) {
    this.prisma = prisma;
  }

  createClient = async (data: CreateClientData): Promise<Client> => {
    return this.prisma.client.create({ data });
  };

  getClients = async ({
    status,
    search,
  }: GetClientsParams): Promise<Client[]> => {
    return this.prisma.client.findMany({
      where: {
        status,
        OR: [
          { name: { contains: search, mode: 'insensitive' } },
          { email: { contains: search, mode: 'insensitive' } },
        ],
      },
      orderBy: { createdAt: 'desc' },
    });
  };

  getClientById = async (id: string): Promise<Client | null> => {
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

  updateClient = async (
    id: string,
    data: UpdateClientData,
  ): Promise<Client> => {
    return this.prisma.client.update({
      where: { id },
      data,
    });
  };

  deleteClient = async (id: string): Promise<Client> => {
    return this.prisma.client.delete({
      where: { id },
    });
  };
}
