import { LowdbSync } from 'lowdb';

interface UserData {
  gitlabUsername: string;
  telegramChatId: number;
}

export class UsersStorage {
  constructor(private db: LowdbSync<{ [username: string]: UserData }>) {}

  saveUser(data: UserData): Promise<void> {
    this.db.set(['users', data.gitlabUsername], data).write();
    return Promise.resolve();
  }

  getUser(gitlabUsername: string): Promise<UserData | undefined> {
    const user = this.db.get(['users', gitlabUsername]).value();
    console.log('getUser', gitlabUsername, user);
    return Promise.resolve(user);
  }
}
