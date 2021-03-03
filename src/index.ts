import { Core } from './Core';
import { TelegramNotifier } from './TelegramNotifier/Notifier';
import { GitlabEventsListener } from './GitlabWebhookReader/GitlabEventsListener';
import { GitlabClient } from './GitlabWebhookReader/GitlabClient';
import { createStorage } from './UsersStorage/createStorage';

if (!process.env.TG_TOKEN || !process.env.GITLAB_TOKEN || !process.env.FILE_PATH) {
  console.log('provide TG_TOKEN,  GITLAB_TOKEN');
  process.exit(1);
}

const storage = createStorage();
const notifier = new TelegramNotifier(process.env.TG_TOKEN, storage);

const gitlabEventsListener = new GitlabEventsListener(
  new GitlabClient('https://git.skbkontur.ru', process.env.GITLAB_TOKEN),
);

gitlabEventsListener.start(8080);

// eslint-disable-next-line no-new
new Core(notifier, gitlabEventsListener);

console.log('started');
