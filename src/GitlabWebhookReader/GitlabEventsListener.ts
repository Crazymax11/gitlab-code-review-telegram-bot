import { GitlabEventsListener as GitlabEventsListenerI, GitlabEvent } from '../Core';
import { WebhookServer } from './WebhookServer';
import { GitlabEventsReader } from './GitlabEventsReader';
import { GitlabClient } from './GitlabClient';
import { GitlabEvent as RawGitlabEvent } from './RawGitlabEvent';

export class GitlabEventsListener implements GitlabEventsListenerI {
  private eventHandler: (event: GitlabEvent) => any = () => {};

  private eventsReader: GitlabEventsReader;

  private server: WebhookServer;

  constructor(gitlabClient: GitlabClient) {
    this.eventsReader = new GitlabEventsReader(gitlabClient);
    this.server = new WebhookServer(async (event) => {
      const handledEvent = await this.eventsReader.handleEvent(event);
      console.log(handledEvent);
      if (!handledEvent) {
        return;
      }
      this.eventHandler(handledEvent);
    });
  }

  onEvent(cb: (event: GitlabEvent) => any) {
    this.eventHandler = cb;
  }

  start(port: number) {
    this.server.serve(port);
  }

  async handle(event: RawGitlabEvent) {
    const handledEvent = await this.eventsReader.handleEvent(event);
    if (!handledEvent) {
      return;
    }
    this.eventHandler(handledEvent);
  }
}
