import { ILogger } from './types';

export const createLoggerMock = (): ILogger => {
  return {
    info: jest.fn(),
    debug: jest.fn(),
    error: jest.fn(),
    createScope() {
      return this;
    },
  };
};
