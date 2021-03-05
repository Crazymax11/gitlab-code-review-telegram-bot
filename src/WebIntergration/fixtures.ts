import { UserData } from '../types';
import { encryptPassword } from './encryptPassword';

export const users: UserData[] = [
  {
    gitlabUsername: 'user1',
    telegramChatId: 1,
  },
  {
    gitlabUsername: 'user2',
    telegramChatId: 2,
  },
];

export const password = 'password';

export const AUTH_COOKIE = encryptPassword(password);
