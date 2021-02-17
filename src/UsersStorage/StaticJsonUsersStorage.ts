import fs from 'fs';
import { UserData, IUserStorage } from '../types';

type FileSchema = Record<string, UserData>;
export class StaticJsonUsersStorage implements IUserStorage {
  constructor(private filePath: string) {}

  private readFile(): FileSchema {
    if (!fs.existsSync(this.filePath)) {
      return {};
    }

    return JSON.parse(fs.readFileSync(this.filePath, 'utf8'));
  }

  private writeFile(fileData: FileSchema): void {
    fs.writeFileSync(this.filePath, JSON.stringify(fileData), 'utf-8');
  }

  saveUser(data: UserData): Promise<void> {
    const users = this.readFile();

    users[data.gitlabUsername] = data;

    this.writeFile(users);

    return Promise.resolve();
  }

  getUser(gitlabUsername: string): Promise<UserData | undefined> {
    const users = this.readFile();

    return Promise.resolve(users[gitlabUsername]);
  }
}
