import { ILogger, IUserCommandsHandler, IUserStorage } from '../types';
import { ITelegramBot } from './TelegramBot';

export class TelegramCommandsHandler implements IUserCommandsHandler {
  private bot: ITelegramBot;

  private logger: ILogger;

  private storage: IUserStorage;

  constructor(bot: ITelegramBot, logger: ILogger, storage: IUserStorage) {
    this.logger = logger.createScope('TelegramCommandsHandler');
    this.bot = bot;
    this.storage = storage;

    this.bot.registerCommand('echo', (ctx) => {
      ctx.reply(`chatid: ${ctx.update.message?.chat.id}`);
    });

    // eslint-disable-next-line max-statements
    this.bot.registerCommand('iam', (ctx) => {
      this.logger.debug('start /iam');
      const text = ctx.update.message?.text;

      if (!text) {
        this.logger.debug('no text');
        return;
      }

      const usernameRe = /iam ([^\s]+)$/;
      if (!usernameRe.test(text)) {
        this.logger.debug('wrong message format');
        return;
      }

      const match = usernameRe.exec(text);

      if (!match) {
        this.logger.debug('wrong message format');
        return;
      }
      const username = match[1];
      const chatId = ctx.update.message?.chat.id;

      if (!chatId) {
        this.logger.debug('no chatId');
        return;
      }

      ctx.reply(`:ok_hand:, chatid: ${chatId}`);
      this.logger.debug(
        `registerUser ${JSON.stringify({ gitlabUsername: username, telegramChatId: chatId })}`,
      );
      this.storage.saveUser({ gitlabUsername: username, telegramChatId: chatId });
    });
  }

  start(): Promise<void> {
    this.bot.start();
    return Promise.resolve();
  }
}
