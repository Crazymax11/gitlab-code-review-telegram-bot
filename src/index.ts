import { Core } from './Core';
import { TelegramNotifier } from './TelegramNotifier/Notifier';
import { GitlabEventsListener } from './GitlabWebhookReader/GitlabEventsListener';
import { GitlabClient } from './GitlabWebhookReader/GitlabClient';
import { createStorage } from './UsersStorage/createStorage';
import { WinstonLogger } from './Logger';

const logger = WinstonLogger.createLogger();
if (!process.env.TG_TOKEN || !process.env.GITLAB_TOKEN || !process.env.FILE_PATH) {
  logger.error('provide TG_TOKEN, GITLAB_TOKEN');
  process.exit(1);
}

const storage = createStorage(logger);
const notifier = new TelegramNotifier(process.env.TG_TOKEN, storage, logger);

const gitlabEventsListener = new GitlabEventsListener(
  new GitlabClient('https://git.skbkontur.ru', process.env.GITLAB_TOKEN, logger),
  logger,
);

gitlabEventsListener.start(8080);

// eslint-disable-next-line no-new
new Core(notifier, gitlabEventsListener);

logger.info('started');
