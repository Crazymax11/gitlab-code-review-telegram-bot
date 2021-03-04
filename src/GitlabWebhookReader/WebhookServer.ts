import fastify, { FastifyInstance } from 'fastify';
import { ILogger } from '../types';

export class WebhookServer {
  private server: FastifyInstance;

  private logger: ILogger;

  constructor(logger: ILogger, onEvent: (event: any) => any) {
    this.logger = logger.createScope('WebhookServer');

    this.server = fastify();
    this.server.post('/', (request, reply) => {
      this.logger.debug(`incomingEvent ${JSON.stringify(request.body)}`);

      reply.code(204);
      onEvent(request.body);
    });
  }

  serve(port: number) {
    this.logger.info(`listening webhooks`);
    this.server.listen(port, '0.0.0.0');
  }
}
