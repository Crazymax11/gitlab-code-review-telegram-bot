import winston, { Logger as IWinstonLogger } from 'winston';
import { ILogger } from './types';

export class WinstonLogger implements ILogger {
  private scope: string | undefined;

  private winstonInstance: IWinstonLogger;

  constructor(winstonInstnace: IWinstonLogger, scope?: string) {
    this.scope = scope;
    this.winstonInstance = winstonInstnace;
  }

  static createLogger() {
    const winstonInstance = winston.createLogger({
      format: winston.format.json(),
      transports: [
        new winston.transports.Console({
          format: winston.format.simple(),
        }),
      ],
    });

    return new WinstonLogger(winstonInstance);
  }

  info(message: string) {
    const prefix = this.scope ? `[${this.scope}]:` : '';
    this.winstonInstance.info(`${prefix}${message}`);
  }

  debug(message: string) {
    const prefix = this.scope ? `[${this.scope}]:` : '';
    this.winstonInstance.debug(`${prefix}${message}`);
  }

  error(message: string) {
    const prefix = this.scope ? `[${this.scope}]:` : '';
    this.winstonInstance.error(`${prefix}${message}`);
  }

  createScope(scopeName: string) {
    return new WinstonLogger(this.winstonInstance, scopeName);
  }
}
