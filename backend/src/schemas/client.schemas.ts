import { z } from 'zod';
import { ClientStatus, Prisma } from '../generated/prisma/index.js';

const ClientStatusEnum = z.enum(Object.values(ClientStatus));

export const CLIENT_SCHEMAS = {
  create: {
    schema: {
      tags: ['Clients'],
      summary: 'Create a new client',
      body: z.object({
        name: z
          .string()
          .min(1, 'Nome é obrigatório')
          .max(255, 'Nome muito longo'),
        email: z.email('Email inválido').max(255, 'Email muito longo'),
        age: z
          .number()
          .int()
          .min(0, 'Idade deve ser positiva')
          .max(150, 'Idade inválida'),
        status: ClientStatusEnum.optional(),
        familyProfile: z
          .string()
          .max(500, 'Perfil familiar muito longo')
          .optional(),
        totalWealth: z
          .number()
          .min(0, 'Patrimônio deve ser positivo')
          .optional(),
      }),
      response: {
        201: z
          .object({
            id: z.string(),
            name: z.string(),
            email: z.string(),
            age: z.number(),
            status: ClientStatusEnum,
            familyProfile: z.string().nullable(),
            totalWealth: z.instanceof(Prisma.Decimal),
            createdAt: z.date(),
            updatedAt: z.date(),
          })
          .describe('Client successfully created'),
        409: z
          .object({
            error: z.string(),
          })
          .describe('Email already exists'),
        500: z
          .object({
            error: z.string(),
          })
          .describe('Internal server error'),
      },
    },
  },
  getAll: {
    schema: {
      tags: ['Clients'],
      summary: 'Get all clients',
      response: {
        200: z
          .array(
            z.object({
              id: z.string(),
              name: z.string(),
              email: z.string(),
              age: z.number(),
              status: ClientStatusEnum,
              familyProfile: z.string().nullable(),
              totalWealth: z.instanceof(Prisma.Decimal),
              createdAt: z.date(),
              updatedAt: z.date(),
            }),
          )
          .describe('List of all clients'),
      },
    },
  },
  getById: {
    schema: {
      tags: ['Clients'],
      summary: 'Get client by ID',
      params: z.object({
        id: z.uuid('ID deve ser um UUID válido'),
      }),
      response: {
        200: z
          .object({
            id: z.string(),
            name: z.string(),
            email: z.string(),
            age: z.number(),
            status: ClientStatusEnum,
            familyProfile: z.string().nullable(),
            totalWealth: z.instanceof(Prisma.Decimal),
            createdAt: z.date(),
            updatedAt: z.date(),
            goals: z.array(
              z.object({
                id: z.string(),
                name: z.string(),
                type: z.string(),
                targetValue: z.number(),
                targetDate: z.string(),
              }),
            ),
            wallet: z.array(
              z.object({
                id: z.string(),
                assetClass: z.string(),
                percentage: z.number(),
                value: z.number(),
              }),
            ),
            events: z.array(
              z.object({
                id: z.string(),
                type: z.string(),
                value: z.number(),
                frequency: z.string(),
                date: z.string(),
                description: z.string().nullable(),
              }),
            ),
            simulations: z.array(
              z.object({
                id: z.string(),
                name: z.string().nullable(),
                initialWealth: z.number(),
                projectionRate: z.number(),
                createdAt: z.date(),
              }),
            ),
          })
          .describe('Client details with related data'),
        404: z
          .object({
            error: z.string(),
          })
          .describe('Client not found'),
      },
    },
  },
  update: {
    schema: {
      tags: ['Clients'],
      summary: 'Update client',
      params: z.object({
        id: z.uuid('ID deve ser um UUID válido'),
      }),
      body: z.object({
        name: z
          .string()
          .min(1, 'Nome é obrigatório')
          .max(255, 'Nome muito longo')
          .optional(),
        email: z
          .email('Email inválido')
          .max(255, 'Email muito longo')
          .optional(),
        age: z
          .number()
          .int()
          .min(0, 'Idade deve ser positiva')
          .max(150, 'Idade inválida')
          .optional(),
        status: ClientStatusEnum.optional(),
        familyProfile: z
          .string()
          .max(500, 'Perfil familiar muito longo')
          .optional(),
        totalWealth: z
          .number()
          .min(0, 'Patrimônio deve ser positivo')
          .optional(),
      }),
      response: {
        200: z
          .object({
            id: z.string(),
            name: z.string(),
            email: z.string(),
            age: z.number(),
            status: ClientStatusEnum,
            familyProfile: z.string().nullable(),
            totalWealth: z.instanceof(Prisma.Decimal),
            createdAt: z.date(),
            updatedAt: z.date(),
          })
          .describe('Client successfully updated'),
        404: z
          .object({
            error: z.string(),
          })
          .describe('Client not found'),
        409: z
          .object({
            error: z.string(),
          })
          .describe('Email already exists'),
      },
    },
  },
  delete: {
    schema: {
      tags: ['Clients'],
      summary: 'Delete client',
      params: z.object({
        id: z.uuid('ID deve ser um UUID válido'),
      }),
      response: {
        204: z.null().describe('Client successfully deleted'),
        404: z
          .object({
            error: z.string(),
          })
          .describe('Client not found'),
      },
    },
  },
};
