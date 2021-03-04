import { createLoggerMock } from '../Logger.mock';
import { createUsersStorageMock } from '../UsersStorage/UserStorage.mock';
import { createTelegramBotMock } from './TelegramBot.mock';
import { TelegramNotifier } from './TelegramNotifier';

const TELEGRAM_CHAT_ID = 1337;
describe('Notifier', () => {
  describe('notifyReviewerAboutMr', () => {
    it('должен ничего не делать если ревьюер не зарегистрирован', async () => {
      const { notifier, bot } = prepare();
      await notifier.notifyReviewerAboutMr('reviewer', {
        name: 'name',
        link: 'https://link',
        author: 'author',
      });
      expect(bot.sendMessage).not.toHaveBeenCalled();
    });

    it('должен уведомить ревьюера', async () => {
      const { notifier, bot, storage } = prepare();
      storage.getUser = () =>
        Promise.resolve({ gitlabUsername: 'gitlabUsername', telegramChatId: TELEGRAM_CHAT_ID });

      await notifier.notifyReviewerAboutMr('reviewer', {
        name: 'name',
        link: 'https://link',
        author: 'author',
      });

      expect(bot.sendMessage).toHaveBeenCalledWith(
        TELEGRAM_CHAT_ID,
        '🙏🏻 author просит вас посмотреть МР [name](https://link)',
      );
    });
  });

  describe('notifyReviewerAboutFixed', () => {
    it('должен ничего не делать если ревьюер не зарегистрирован', async () => {
      const { notifier, bot } = prepare();
      await notifier.notifyReviewerAboutFixed('reviewer', {
        name: 'name',
        link: 'https://link',
        author: 'author',
      });
      expect(bot.sendMessage).not.toHaveBeenCalled();
    });

    it('должен уведомить ревьюера', async () => {
      const { notifier, bot, storage } = prepare();
      storage.getUser = () =>
        Promise.resolve({ gitlabUsername: 'gitlabUsername', telegramChatId: TELEGRAM_CHAT_ID });
      await notifier.notifyReviewerAboutFixed('reviewer', {
        name: 'name',
        link: 'https://link',
        author: 'author',
      });

      expect(bot.sendMessage).toHaveBeenCalledWith(
        TELEGRAM_CHAT_ID,
        '🙄 author поправил замечания в МР [name](https://link)',
      );
    });
  });

  describe('notifyAuthorAboutApprove', () => {
    it('должен ничего не делать если ревьюер не зарегистрирован', async () => {
      const { notifier, bot } = prepare();
      await notifier.notifyAuthorAboutApprove('reviewer', {
        name: 'name',
        link: 'https://link',
        reviewer: 'reviewer',
      });

      expect(bot.sendMessage).not.toHaveBeenCalled();
    });

    it('должен уведомить автора', async () => {
      const { notifier, bot, storage } = prepare();
      storage.getUser = () =>
        Promise.resolve({ gitlabUsername: 'gitlabUsername', telegramChatId: TELEGRAM_CHAT_ID });
      await notifier.notifyAuthorAboutApprove('reviewer', {
        name: 'name',
        link: 'https://link',
        reviewer: 'reviewer',
      });

      expect(bot.sendMessage).toHaveBeenCalledWith(
        TELEGRAM_CHAT_ID,
        '👍 reviewer апрувнул ваш МР [name](https://link)',
      );
    });
  });

  describe('notifyAuthorAboutWatched', () => {
    it('должен ничего не делать если ревьюер не зарегистрирован', async () => {
      const { notifier, bot } = prepare();
      await notifier.notifyAuthorAboutWatched('reviewer', {
        name: 'name',
        link: 'https://link',
        reviewer: 'reviewer',
      });
      expect(bot.sendMessage).not.toHaveBeenCalled();
    });

    it('должен уведомить автора', async () => {
      const { notifier, bot, storage } = prepare();
      storage.getUser = () =>
        Promise.resolve({ gitlabUsername: 'gitlabUsername', telegramChatId: TELEGRAM_CHAT_ID });
      await notifier.notifyAuthorAboutWatched('reviewer', {
        name: 'name',
        link: 'https://link',
        reviewer: 'reviewer',
      });

      expect(bot.sendMessage).toHaveBeenCalledWith(
        TELEGRAM_CHAT_ID,
        '👀 reviewer посмотрел ваш МР [name](https://link)',
      );
    });
  });
});

function prepare() {
  const storage = createUsersStorageMock();
  const logger = createLoggerMock();
  const bot = createTelegramBotMock();
  const notifier = new TelegramNotifier(storage, logger, bot);
  return { notifier, bot, logger, storage };
}
