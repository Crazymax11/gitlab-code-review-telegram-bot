export interface UserData {
  gitlabUsername: string;
  telegramChatId: number;
}

export interface IUserStorage {
  saveUser(data: UserData): Promise<void>;

  getUser(gitlabUsername: string): Promise<UserData | undefined>;
  getUsers(): Promise<UserData[]>;
}

export interface ILogger {
  error(message: string): void;
  info(message: string): void;
  debug(message: string): void;
  createScope(scopeName: string): ILogger;
}

export interface IUserCommandsHandler {
  start(): Promise<void>;
}
