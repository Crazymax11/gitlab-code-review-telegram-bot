import { Notifier } from '../Core';
import { IUserStorage } from '../types';
import { TelegramBot, escapeMarkdown } from './TelegramBot';

export class TelegramNotifier implements Notifier {
  private store: IUserStorage;

  private bot: TelegramBot;

  constructor(token: string, storage: IUserStorage) {
    this.store = storage;
    this.bot = new TelegramBot({
      token,
      onStore: (params) => {
        console.log('savedUser', params);
        this.store.saveUser({ gitlabUsername: params.username, telegramChatId: params.chatId });
        return Promise.resolve();
      },
    });
    this.bot.start();
    console.log('TgbotStarted');
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
    console.log('notifyReviewerAboutMr');
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
    console.log('notifyReviewerAboutFixed');
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
    console.log('notifyAuthorAboutApprove');
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
    console.log('notifyAuthorAboutWatched');
    this.bot.sendMessage(user.telegramChatId, message);
  }

  private makeMarkdownLinktoMr(name: string, link: string): string {
    return `[${escapeMarkdown(name)}](${escapeMarkdown(link)})`;
  }
}
