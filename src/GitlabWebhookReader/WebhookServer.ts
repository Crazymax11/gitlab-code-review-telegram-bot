import fastify, { FastifyInstance } from 'fastify';

export class WebhookServer {
  private server: FastifyInstance;

  constructor(onEvent: (event: any) => any) {
    this.server = fastify();
    this.server.post('/', (request, reply) => {
      console.log('incomingEvent', request.body);
      reply.code(204);
      onEvent(request.body);
    });
  }

  serve(port: number) {
    console.log('start listening webhooks');
    this.server.listen(port, '0.0.0.0');
  }
}
