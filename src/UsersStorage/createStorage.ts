import { ILogger, IUserStorage } from '../types';
import { LowDbUsersStorage } from './LowDbUsersStorage';
import { StaticJsonUsersStorage } from './StaticJsonUsersStorage';

export function createStorage(logger: ILogger): IUserStorage {
  const storageType = process.env.STORAGE || 'lowdb';

  if (storageType === 'lowdb') {
    if (!process.env.FILE_PATH) {
      throw new Error('provide FILE_PATH to use lowdb storage');
    }

    return new LowDbUsersStorage(process.env.FILE_PATH, logger);
  }

  if (storageType === 'staticjson') {
    if (!process.env.FILE_PATH) {
      throw new Error('provide FILE_PATH to use lowdb storage');
    }

    return new StaticJsonUsersStorage(process.env.FILE_PATH, logger);
  }

  throw new Error('provide STORAGE lowdb or staticjson');
}
