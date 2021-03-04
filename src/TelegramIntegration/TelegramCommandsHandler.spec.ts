import { createLoggerMock } from '../Logger.mock';
import { createUsersStorageMock } from '../UsersStorage/UserStorage.mock';
import { createTelegramBotMock } from './TelegramBot.mock';
import { TelegramCommandsHandler } from './TelegramCommandsHandler';

describe('TelegramCommandsHandler', () => {
  it('должен вывести chatId если написать echo', () => {
    const { bot } = prepare();
    const spy = jest.fn();
    bot.commands.echo({
      reply: spy,
      update: {
        message: {
          chat: {
            id: 1337,
          },
        },
      },
    } as any);

    expect(spy).toHaveBeenCalledWith('chatid: 1337');
  });
  it('должен сохранить chatId юзера если написать /iam gitlabUser', () => {
    const { bot, storage } = prepare();
    const spy = jest.fn();
    bot.commands.iam({
      reply: spy,
      update: {
        message: {
          text: '/iam gitlabUserName',
          chat: {
            id: 1337,
          },
        },
      },
    } as any);

    expect(spy).toHaveBeenCalledWith(':ok_hand:, chatid: 1337');
    expect(storage.saveUser).toHaveBeenLastCalledWith({
      gitlabUsername: 'gitlabUserName',
      telegramChatId: 1337,
    });
  });
});

function prepare() {
  const bot = createTelegramBotMock();
  const logger = createLoggerMock();
  const storage = createUsersStorageMock();
  const telegramCommandsHandler = new TelegramCommandsHandler(bot, logger, storage);
  return { bot, logger, storage, telegramCommandsHandler };
}
