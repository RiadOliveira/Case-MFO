import { HelloService } from '../services/hello.service.ts';
import type { PrismaClient } from '../generated/prisma/index.js';

describe('HelloService', () => {
  let service: HelloService;
  const mockPrisma = {
    user: {
      count: jest.fn(),
    },
  } as unknown as PrismaClient;

  beforeEach(() => {
    service = new HelloService(mockPrisma);
    jest.clearAllMocks();
  });

  it('should return hello message', async () => {
    const result = await service.getHelloMessage();
    expect(result).toEqual({ message: 'Hello world!' });
  });
});
