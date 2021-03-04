import { Telegraf } from 'telegraf';

import { TelegrafContext } from 'telegraf/typings/context';

export class TelegramBot {
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

  registerCommand(command: string, callback: (ctx: TelegrafContext) => void) {
    this.bot.command(command, callback);
  }
}
