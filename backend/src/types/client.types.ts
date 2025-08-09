import type { ClientStatus } from '../generated/prisma/index.js';

export type CreateClientData = {
  name: string;
  email: string;
  age: number;
  status?: ClientStatus;
  familyProfile?: string;
  totalWealth?: number;
};

export type UpdateClientData = {
  name?: string;
  email?: string;
  age?: number;
  status?: ClientStatus;
  familyProfile?: string;
  totalWealth?: number;
};

export type GetClientsParams = {
  status?: ClientStatus;
  search?: string;
};
