import { Telegraf } from 'telegraf';

import { TelegrafContext } from 'telegraf/typings/context';

type OnStoreCallback = (params: { username: string; chatId: number }) => Promise<void>;

export class TelegramBot {
  private bot: Telegraf<TelegrafContext>;

  // @ts-ignore
  private onStore: OnStoreCallback;

  constructor(params: { token: string; onStore: OnStoreCallback }) {
    this.onStore = params.onStore;
    this.bot = new Telegraf(params.token);
  }

  start() {
    this.bot.start((ctx) => ctx.reply('Welcome!'));
    this.bot.command('iam', (ctx) => {
      const text = ctx.update.message?.text;

      if (!text) {
        return;
      }
      const usernameRe = /iam ([^\s]+)$/;
      if (!usernameRe.test(text)) {
        return;
      }

      const match = usernameRe.exec(text);

      if (!match) {
        return;
      }
      const username = match[1];
      const chatId = ctx.update.message?.chat.id;

      if (!chatId) {
        return;
      }

      ctx.reply(':ok_hand:');
      this.onStore({
        username,
        chatId,
      });
    });
    this.bot.launch();
  }

  sendMessage(chatId: number, message: string) {
    // @see https://core.telegram.org/bots/api#markdownv2-style
    const escapedChars = ['.'];
    const escapedMessage = escapedChars.reduce(
      (msg, char) => msg.split(char).join(`\\${char}`),
      message,
    );
    // eslint-disable-next-line @typescript-eslint/camelcase
    this.bot.telegram.sendMessage(chatId, escapedMessage, { parse_mode: 'MarkdownV2' });
  }
}
