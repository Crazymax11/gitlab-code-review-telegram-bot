import { IUserStorage } from '../types';

export const createUsersStorageMock = (): IUserStorage => {
  return {
    saveUser: jest.fn(),
    getUser: jest.fn(),
  };
};
