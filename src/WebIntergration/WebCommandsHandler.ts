import { IUserCommandsHandler } from '../types';
import { server } from './server';

export class WebCommandsHandler implements IUserCommandsHandler {
  async start(): Promise<void> {
    await server.listen('8080');
  }
}
