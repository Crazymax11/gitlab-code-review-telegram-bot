import { Notifier } from '../Core';
import { ILogger, IUserCommandsHandler, IUserStorage } from '../types';
import { TelegramNotifier } from './Notifier';
import { TelegramBot } from './TelegramBot';
import { TelegramCommandsHandler } from './TelegramCommandsHandler';

export function createTelegramIntegration(params: {
  storage: IUserStorage;
  logger: ILogger;
}): { notifier: Notifier; userCommandsHandler: IUserCommandsHandler } {
  if (!process.env.TG_TOKEN) {
    params.logger.error('provide TG_TOKEN');
    process.exit(1);
  }
  const bot = new TelegramBot({ token: process.env.TG_TOKEN });
  const notifier = new TelegramNotifier(params.storage, params.logger, bot);
  const userCommandsHandler = new TelegramCommandsHandler(bot, params.logger, params.storage);
  return { notifier, userCommandsHandler };
}
