import z from 'zod';

export const getHelloSchema = {
  schema: {
    tags: ['Test'],
    response: {
      200: z.object({
        message: z.string(),
      }),
    },
  },
};
