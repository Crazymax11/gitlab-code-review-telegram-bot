export interface UserData {
  gitlabUsername: string;
  telegramChatId: number;
}

export interface IUserStorage {
  saveUser(data: UserData): Promise<void>;

  getUser(gitlabUsername: string): Promise<UserData | undefined>;
}
