import request from 'supertest';

import { build } from '../app.ts';
import type { FastifyInstance } from 'fastify';

describe('Hello Routes Integration Tests', () => {
  let app: FastifyInstance;

  beforeAll(async () => {
    app = await build();
    await app.ready();
  });

  afterAll(async () => {
    await app.close();
  });

  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe('GET /hello', () => {
    it('should return hello message with status 200', async () => {
      const response = await request(app.server)
        .get('/hello')
        .expect(200)
        .expect('Content-Type', /application\/json/);

      expect(response.body).toEqual({
        message: 'Hello world!',
      });
    });
  });
});
