import low from 'lowdb';
import FileSync from 'lowdb/adapters/FileSync';

import { Core } from 'Core';
import { TelegramNotifier } from 'TelegramNotifier/Notifier';
import { GitlabEventsListener } from 'GitlabWebhookReader/GitlabEventsListener';
import { GitlabClient } from 'GitlabWebhookReader/GitlabClient';

if (!process.env.TG_TOKEN || !process.env.GITLAB_TOKEN || !process.env.FILE_PATH) {
  console.log('provide TG_TOKEN и GITLAB_TOKEN и FILE_PATH');
  process.exit(1);
}

const adapter = new FileSync(process.env.FILE_PATH);

const db = low(adapter);

const notifier = new TelegramNotifier(process.env.TG_TOKEN, db);
const gitlabEventsListener = new GitlabEventsListener(
  new GitlabClient('https://git.skbkontur.ru', process.env.GITLAB_TOKEN),
);

gitlabEventsListener.start(8080);

// eslint-disable-next-line no-new
new Core(notifier, gitlabEventsListener);

console.log('started');
