import { TelegrafContext } from 'telegraf/typings/context';
import { ITelegramBot } from './TelegramBot';

interface ITelegramBotMock extends ITelegramBot {
  commands: Record<string, (ctx: TelegrafContext) => void>;
}
export const createTelegramBotMock = (): ITelegramBotMock => {
  const mock = {
    commands: {} as Record<string, (ctx: TelegrafContext) => void>,
    start: jest.fn(),
    sendMessage: jest.fn(),
    registerCommand(command: string, cb: (ctx: TelegrafContext) => void) {
      this.commands[command] = cb;
    },
  };

  return mock;
};
