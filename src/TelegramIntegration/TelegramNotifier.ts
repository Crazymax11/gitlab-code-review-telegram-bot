import { Notifier } from '../Core';
import { IUserStorage, ILogger } from '../types';
import { ITelegramBot } from './TelegramBot';

export class TelegramNotifier implements Notifier {
  private store: IUserStorage;

  private bot: ITelegramBot;

  private logger: ILogger;

  constructor(storage: IUserStorage, logger: ILogger, bot: ITelegramBot) {
    this.store = storage;
    this.logger = logger.createScope('TelegramNotifier');
    this.bot = bot;
  }

  async notifyReviewerAboutMr(
    reviewer: string,
    mrInfo: {
      name: string;
      link: string;
      author: string;
    },
  ): Promise<void> {
    const user = await this.store.getUser(reviewer);

    if (!user) {
      return;
    }

    this.logger.debug(`notify reviewer about mr. ${JSON.stringify({ reviewer, mrInfo })}`);

    const message = `🙏🏻 ${escapeMarkdown(
      mrInfo.author,
    )} просит вас посмотреть МР ${this.makeMarkdownLinktoMr(mrInfo.name, mrInfo.link)}`;

    this.bot.sendMessage(user.telegramChatId, message);
  }

  async notifyReviewerAboutFixed(
    reviewer: string,
    mrInfo: {
      name: string;
      link: string;
      author: string;
    },
  ): Promise<void> {
    const user = await this.store.getUser(reviewer);

    const message = `🙄 ${escapeMarkdown(
      mrInfo.author,
    )} поправил замечания в МР ${this.makeMarkdownLinktoMr(mrInfo.name, mrInfo.link)}`;
    if (!user) {
      return;
    }

    this.logger.debug(`notify reviewer about fixed. ${JSON.stringify({ reviewer, mrInfo })}`);

    this.bot.sendMessage(user.telegramChatId, message);
  }

  async notifyAuthorAboutApprove(
    author: string,
    mrInfo: {
      name: string;
      link: string;
      reviewer: string;
    },
  ): Promise<void> {
    const user = await this.store.getUser(author);
    const message = `👍 ${escapeMarkdown(
      mrInfo.reviewer,
    )} апрувнул ваш МР ${this.makeMarkdownLinktoMr(mrInfo.name, mrInfo.link)}`;
    if (!user) {
      return;
    }

    this.logger.debug(`notify author about approve. ${JSON.stringify({ author, mrInfo })}`);

    this.bot.sendMessage(user.telegramChatId, message);
  }

  async notifyAuthorAboutWatched(
    author: string,
    mrInfo: {
      name: string;
      link: string;
      reviewer: string;
    },
  ): Promise<void> {
    const user = await this.store.getUser(author);
    const message = `👀 ${escapeMarkdown(
      mrInfo.reviewer,
    )} посмотрел ваш МР ${this.makeMarkdownLinktoMr(mrInfo.name, mrInfo.link)}`;
    if (!user) {
      return;
    }

    this.logger.debug(`notify author about watched. ${JSON.stringify({ author, mrInfo })}`);

    this.bot.sendMessage(user.telegramChatId, message);
  }

  private makeMarkdownLinktoMr(name: string, link: string): string {
    return `[${escapeMarkdown(name)}](${escapeMarkdown(link)})`;
  }
}

function escapeMarkdown(text: string): string {
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
