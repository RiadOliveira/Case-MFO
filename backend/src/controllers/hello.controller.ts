import type { FastifyRequest, FastifyReply } from 'fastify';
import type { HelloService } from '../services/hello.service.ts';

export class HelloController {
  private helloService: HelloService;

  constructor(helloService: HelloService) {
    this.helloService = helloService;
  }

  getHello = async (request: FastifyRequest, reply: FastifyReply) => {
    const result = await this.helloService.getHelloMessage();
    return reply.code(200).send(result);
  };
}
