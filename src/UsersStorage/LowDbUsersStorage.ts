import low, { LowdbSync } from 'lowdb';
import FileSync from 'lowdb/adapters/FileSync';
import { IUserStorage, UserData } from '../types';

export class LowDbUsersStorage implements IUserStorage {
  private db: LowdbSync<{ [username: string]: UserData }>;

  constructor(filePath: string) {
    const adapter = new FileSync(filePath);

    this.db = low(adapter);
  }

  saveUser(data: UserData): Promise<void> {
    this.db.set(['users', data.gitlabUsername], data).write();
    return Promise.resolve();
  }

  getUser(gitlabUsername: string): Promise<UserData | undefined> {
    const user = this.db.get(['users', gitlabUsername]).value();
    return Promise.resolve(user);
  }
}
