import { Notifier, Core } from './Core';
import { GitlabEventsListener } from './GitlabWebhookReader/GitlabEventsListener';
import { GitlabClient, IDiscussion } from './GitlabWebhookReader/GitlabClient';
import * as fixtures from './GitlabWebhookReader/gitlabEvents';
import { ILogger, IUserCommandsHandler } from './types';

describe('Core', () => {
  it('Должен уведомить двух ревьюеров при открытии МР', async () => {
    const { gitlabEventListener, notifier } = prepare();

    gitlabEventListener.handle(fixtures.newMrWithTwoReviewers);

    await wait();

    expect(notifier.notifyReviewerAboutMr).toHaveBeenCalledWith('someuser', {
      author: 'artem.shabanov',
      link: 'https://git.skbkontur.ru/artem.shabanov/randy-bot/-/merge_requests/5',
      name: 'Тестирую ивенты при работе с MR',
    });
    expect(notifier.notifyReviewerAboutMr).toHaveBeenCalledWith('anotheruser', {
      author: 'artem.shabanov',
      link: 'https://git.skbkontur.ru/artem.shabanov/randy-bot/-/merge_requests/5',
      name: 'Тестирую ивенты при работе с MR',
    });
  });

  it('Должен уведомить двух ревьюеров при открытии редактировании МР', async () => {
    const { gitlabEventListener, notifier } = prepare();

    gitlabEventListener.handle(fixtures.addReviewersInMrUpdate);

    await wait();

    expect(notifier.notifyReviewerAboutMr).toHaveBeenCalledWith('someuser', {
      author: 'artem.shabanov',
      link: 'https://git.skbkontur.ru/artem.shabanov/randy-bot/-/merge_requests/5',
      name: 'Тестирую ивенты при работе с MR',
    });
    expect(notifier.notifyReviewerAboutMr).toHaveBeenCalledWith('anotheruser', {
      author: 'artem.shabanov',
      link: 'https://git.skbkontur.ru/artem.shabanov/randy-bot/-/merge_requests/5',
      name: 'Тестирую ивенты при работе с MR',
    });
  });

  it('Должен уведомить только новых ревьюеров при добавлении ревьюеров при редактировании МР', async () => {
    const { gitlabEventListener, notifier } = prepare();

    gitlabEventListener.handle(fixtures.addNewReviewerInMrUpdate);

    await wait();

    expect(notifier.notifyReviewerAboutMr).toHaveBeenCalledWith('anotheruser', {
      author: 'artem.shabanov',
      link: 'https://git.skbkontur.ru/artem.shabanov/randy-bot/-/merge_requests/5',
      name: 'Тестирую ивенты при работе с MR',
    });
    expect(notifier.notifyReviewerAboutMr).toBeCalledTimes(1);
  });

  it('должен уведомить автора МР о том, что ревьюер поставил апрув', async () => {
    const { gitlabClient, gitlabEventListener, notifier } = prepare();

    gitlabClient.getUsernameById.mockImplementation(() => Promise.resolve('author'));
    gitlabEventListener.handle(fixtures.reviewerApprovedMr);

    await wait();

    expect(notifier.notifyAuthorAboutApprove).toHaveBeenCalledWith('author', {
      link: 'https://git.skbkontur.ru/artem.shabanov/randy-bot/-/merge_requests/8',
      name: 'Добавляет первый тест',
      reviewer: 'someuser',
    });
  });

  it('не должен уведомить автора МР если approve написал левый чувак', async () => {
    const { gitlabClient, gitlabEventListener, notifier } = prepare();

    gitlabClient.getUsernameById.mockImplementation(() => Promise.resolve('author'));
    gitlabEventListener.handle(fixtures.notReviewerApprovedMr);

    await wait();

    expect(notifier.notifyReviewerAboutMr).toBeCalledTimes(0);
  });

  it('не должен уведомить автора если approve не top-level', async () => {
    const { gitlabClient, gitlabEventListener, notifier } = prepare();

    gitlabClient.getUsernameById.mockImplementation(() => Promise.resolve('author'));
    gitlabEventListener.handle(fixtures.reviewerApprovedMrNotTopLevel);

    await wait();

    expect(notifier.notifyAuthorAboutApprove).toHaveBeenCalledTimes(0);
  });

  it('должен уведомить автора МР если watched написал ревьюер', async () => {
    const { gitlabClient, gitlabEventListener, notifier } = prepare();

    gitlabClient.getUsernameById.mockImplementation(() => Promise.resolve('author'));
    gitlabEventListener.handle(fixtures.reviewerWatchedMr);

    await wait();

    expect(notifier.notifyAuthorAboutWatched).toHaveBeenCalledWith('author', {
      link: 'https://git.skbkontur.ru/artem.shabanov/randy-bot/-/merge_requests/8',
      name: 'Добавляет первый тест',
      reviewer: 'someuser',
    });
  });

  it('не должен уведомить автора МР если watched написал левый чувак', async () => {
    const { gitlabClient, gitlabEventListener, notifier } = prepare();

    gitlabClient.getUsernameById.mockImplementation(() => Promise.resolve('author'));
    gitlabEventListener.handle(fixtures.notReviewerWatchedMr);

    await wait();

    expect(notifier.notifyAuthorAboutWatched).toHaveBeenCalledTimes(0);
  });

  it('не должен уведомить автора если wathced не top-level', async () => {
    const { gitlabClient, gitlabEventListener, notifier } = prepare();

    gitlabClient.getUsernameById.mockImplementation(() => Promise.resolve('author'));
    gitlabEventListener.handle(fixtures.reviewerWatchedMrNotTopLevel);

    await wait();

    expect(notifier.notifyAuthorAboutWatched).toHaveBeenCalledTimes(0);
  });

  it('должен уведомить ревьюера если автора написал fixed в ответ на watched', async () => {
    const { gitlabClient, gitlabEventListener, notifier } = prepare();

    gitlabClient.getDiscussion.mockImplementation(() => {
      const discussion: IDiscussion = {
        // @ts-ignore
        notes: [{ body: 'watched', author: { username: 'someuser' } }, { body: 'kek' }],
      };
      return Promise.resolve(discussion);
    });
    gitlabEventListener.handle(fixtures.authorFixedReviewerNotes);

    await wait();

    expect(notifier.notifyReviewerAboutFixed).toHaveBeenCalledWith('someuser', {
      author: 'author',
      link: 'https://git.skbkontur.ru/artem.shabanov/randy-bot/-/merge_requests/8',
      name: 'Добавляет первый тест',
    });
  });
  it('не должен уведомить, если автор написал fixed в ответ на watched левого чувака', async () => {
    const { gitlabClient, gitlabEventListener, notifier } = prepare();

    gitlabClient.getDiscussion.mockImplementation(() => {
      const discussion: IDiscussion = {
        // @ts-ignore
        notes: [{ body: 'watched', author: { username: 'notreviewer' } }, { body: 'kek' }],
      };
      return Promise.resolve(discussion);
    });
    gitlabEventListener.handle(fixtures.authorFixedReviewerNotes);

    await wait();

    expect(notifier.notifyReviewerAboutFixed).toHaveBeenCalledTimes(0);
  });
  it('не должен уведомить ревьюера, если неавтор написал fixed в ответ на watched', async () => {
    const { gitlabClient, gitlabEventListener, notifier } = prepare();

    gitlabClient.getDiscussion.mockImplementation(() => {
      const discussion: IDiscussion = {
        // @ts-ignore
        notes: [{ body: 'watched', author: { username: 'someuser' } }, { body: 'kek' }],
      };
      return Promise.resolve(discussion);
    });
    gitlabEventListener.handle(fixtures.notAuthorFixedReviewerNotes);

    await wait();

    expect(notifier.notifyReviewerAboutFixed).toHaveBeenCalledTimes(0);
  });

  it('должен стартануть хендлер команд', () => {
    const { core, userCommandsHandler } = prepare();
    core.start();

    expect(userCommandsHandler.start).toHaveBeenCalled();
  });
});

function wait() {
  return new Promise((res) => setTimeout(res, 10));
}

function prepare() {
  const notifier: Notifier = {
    notifyAuthorAboutApprove: jest.fn(),
    notifyAuthorAboutWatched: jest.fn(),
    notifyReviewerAboutFixed: jest.fn(),
    notifyReviewerAboutMr: jest.fn(),
  };

  const gitlabClient = {
    getUsernameById: jest.fn(),
    getDiscussion: jest.fn(),
  };

  const userCommandsHandler: IUserCommandsHandler = {
    start: jest.fn(),
  };

  const logger: ILogger = {
    info: jest.fn(),
    error: jest.fn(),
    debug: jest.fn(),
    createScope() {
      return this;
    },
  } as ILogger;

  const gitlabEventListener = new GitlabEventsListener(
    (gitlabClient as any) as GitlabClient,
    logger,
  );

  const core = new Core(notifier, gitlabEventListener, userCommandsHandler);

  return { notifier, gitlabClient, gitlabEventListener, core, userCommandsHandler };
}
