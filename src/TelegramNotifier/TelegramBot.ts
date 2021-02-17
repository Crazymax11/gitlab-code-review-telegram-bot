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

      const echoRe = /^\/echo$/;
      if (!echoRe.test(text)) {
        ctx.reply(`chatid: ${ctx.update.message?.chat.id}`);
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

      ctx.reply(`:ok_hand:, chatid: ${chatId}`);
      this.onStore({
        username,
        chatId,
      });
    });
    this.bot.launch();
  }

  sendMessage(chatId: number, message: string) {
    // eslint-disable-next-line @typescript-eslint/camelcase
    this.bot.telegram.sendMessage(chatId, message, { parse_mode: 'MarkdownV2' });
  }
}

export function escapeMarkdown(text: string): string {
  // @see https://core.telegram.org/bots/api#markdownv2-style
  const escapedChars = [
    '_',
    '*',
    '[',
    ']',
    '(',
    ')',
    '~',
    '`',
    '>',
    '#',
    '+',
    '-',
    '=',
    '|',
    '{',
    '}',
    '.',
    '!',
  ];
  return escapedChars.reduce((msg, char) => msg.split(char).join(`\\${char}`), text);
}
