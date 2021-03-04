import low, { LowdbSync } from 'lowdb';
import FileSync from 'lowdb/adapters/FileSync';
import { ILogger, IUserStorage, UserData } from '../types';

export class LowDbUsersStorage implements IUserStorage {
  private db: LowdbSync<{ [username: string]: UserData }>;

  private logger: ILogger;

  constructor(filePath: string, logger: ILogger) {
    const adapter = new FileSync(filePath);

    this.db = low(adapter);
    this.logger = logger.createScope('LowDbUsersStorage');
  }

  saveUser(data: UserData): Promise<void> {
    this.logger.debug(`saveUser ${JSON.stringify(data)}`);
    this.db.set(['users', data.gitlabUsername], data).write();
    return Promise.resolve();
  }

  getUser(gitlabUsername: string): Promise<UserData | undefined> {
    this.logger.debug(`getUser ${gitlabUsername}`);
    const user = this.db.get(['users', gitlabUsername]).value();
    return Promise.resolve(user);
  }
}
