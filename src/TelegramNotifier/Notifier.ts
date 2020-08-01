import { LowdbSync } from 'lowdb';
import { UsersStorage } from 'UsersStorage';
import { Notifier } from 'Core';
import { TelegramBot } from './TelegramBot';

export class TelegramNotifier implements Notifier {
  private store: UsersStorage;

  private bot: TelegramBot;

  constructor(token: string, lowdb: LowdbSync<any>) {
    this.store = new UsersStorage(lowdb);
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
  ) {
    const user = await this.store.getUser(reviewer);
    if (!user) {
      return;
    }
    console.log('notifyReviewerAboutMr');
    const message = `🙏🏻 ${mrInfo.author} просит вас посмотреть МР [${mrInfo.name}](${mrInfo.link})`;
    this.bot.sendMessage(user.telegramChatId, message);
  }

  async notifyReviewerAboutFixed(
    reviewer: string,
    mrInfo: {
      name: string;
      link: string;
      author: string;
    },
  ) {
    const user = await this.store.getUser(reviewer);
    const message = `🙄 ${mrInfo.author} поправил замечания в МР [${mrInfo.name}](${mrInfo.link})`;
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
  ) {
    const user = await this.store.getUser(author);
    const message = `👍 ${mrInfo.reviewer} апрувнул ваш МР [${mrInfo.name}](${mrInfo.link})`;
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
  ) {
    const user = await this.store.getUser(author);
    const message = `👀 ${mrInfo.reviewer} посмотрел ваш МР [${mrInfo.name}](${mrInfo.link})`;
    if (!user) {
      return;
    }
    console.log('notifyAuthorAboutWatched');
    this.bot.sendMessage(user.telegramChatId, message);
  }
}
