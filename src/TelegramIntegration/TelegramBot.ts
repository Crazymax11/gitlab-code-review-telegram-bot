import { Telegraf } from 'telegraf';

import { TelegrafContext } from 'telegraf/typings/context';

export interface ITelegramBot {
  start(): void;

  sendMessage(chatId: number, message: string): void;

  registerCommand(command: string, callback: (ctx: TelegrafContext) => void): void;
}
export class TelegramBot implements ITelegramBot {
  private bot: Telegraf<TelegrafContext>;

  constructor(params: { token: string }) {
    this.bot = new Telegraf(params.token);
  }

  start(): void {
    this.bot.start((ctx) => ctx.reply('Welcome!'));

    this.bot.launch();
  }

  sendMessage(chatId: number, message: string): void {
    // eslint-disable-next-line @typescript-eslint/camelcase
    this.bot.telegram.sendMessage(chatId, message, { parse_mode: 'MarkdownV2' });
  }

  registerCommand(command: string, callback: (ctx: TelegrafContext) => void): void {
    this.bot.command(command, callback);
  }
}
