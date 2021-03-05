import { Core } from './Core';
import { GitlabEventsListener } from './GitlabWebhookReader/GitlabEventsListener';
import { GitlabClient } from './GitlabWebhookReader/GitlabClient';
import { createStorage } from './UsersStorage/createStorage';
import { WinstonLogger } from './Logger';
import { createTelegramIntegration } from './TelegramIntegration/createTelegramIntegration';
import { WebCommandsHandler } from './WebIntergration/WebCommandsHandler';
import { IUserCommandsHandler } from './types';

const logger = WinstonLogger.createLogger();
if (!process.env.GITLAB_TOKEN || !process.env.FILE_PATH) {
  logger.error('provide GITLAB_TOKEN');
  process.exit(1);
}

const storage = createStorage(logger);
const { notifier, userCommandsHandler } = createTelegramIntegration({ storage, logger });
const webCommand = new WebCommandsHandler(storage);

const pppproxy: IUserCommandsHandler = {
  async start() {
    await userCommandsHandler.start();
    await webCommand.start();
  },
};

const gitlabEventsListener = new GitlabEventsListener(
  new GitlabClient('https://git.skbkontur.ru', process.env.GITLAB_TOKEN, logger),
  logger,
);

gitlabEventsListener.start(8080);

const core = new Core(notifier, gitlabEventsListener, pppproxy);

core.start();

logger.info('started');
