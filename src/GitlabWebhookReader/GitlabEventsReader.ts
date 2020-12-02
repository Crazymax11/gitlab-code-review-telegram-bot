import _ from 'lodash';
import { GitlabEvent } from '../Core';
import { GitlabClient } from './GitlabClient';
import {
  GitlabEvent as RawGitlabEvent,
  IGitlabMergeRequestNoteEvent,
  IGitlabMergeRequestEvent,
} from './RawGitlabEvent';

const reviewersRe = /reviewers: ([\w.@,\s]+)/;
export class GitlabEventsReader {
  constructor(private gitlabClient: GitlabClient) {}

  // eslint-disable-next-line max-statements
  async handleEvent(event: RawGitlabEvent): Promise<GitlabEvent | null> {
    if (this.isGitlabMergeRequestEvent(event)) {
      if (this.isMrOpenEvent(event)) {
        const reviewers = this.extractReviewersFromDescription(event.object_attributes.description);

        if (reviewers && reviewers.length) {
          return this.makeAddReviewersEvent(reviewers, event);
        }

        return null;
      }

      if (this.isMrUpdateEvent(event)) {
        const oldReviewers =
          this.extractReviewersFromDescription(event.changes?.description?.previous || '') || [];

        const newReviewers =
          this.extractReviewersFromDescription(event.changes?.description?.current || '') || [];

        const reviewers = _.difference(newReviewers, oldReviewers);
        if (reviewers.length) {
          return this.makeAddReviewersEvent(reviewers, event);
        }

        return null;
      }
    }

    if (this.isApprovedEvent(event)) {
      const mergeRequestAuthorId = event.merge_request.author_id;
      const authorUsername = await this.gitlabClient.getUsernameById(mergeRequestAuthorId);

      const handledEvent: GitlabEvent = {
        type: 'approvedEvent',
        reviewer: event.user.username,
        mrInfo: {
          link: event.merge_request.url,
          name: event.merge_request.title,
          author: authorUsername,
        },
      };
      return handledEvent;
    }

    if (this.isWatchedEvent(event)) {
      const mergeRequestAuthorId = event.merge_request.author_id;
      const authorUsername = await this.gitlabClient.getUsernameById(mergeRequestAuthorId);
      const handledEvent: GitlabEvent = {
        type: 'watchedEvent',
        reviewer: event.user.username,
        mrInfo: {
          link: event.merge_request.url,
          name: event.merge_request.title,
          author: authorUsername,
        },
      };

      return handledEvent;
    }

    if (this.isFixedEvent(event)) {
      if (!event.merge_request.iid) {
        return null;
      }

      const discussion = await this.gitlabClient.getDiscussion(
        event.project_id,
        event.merge_request.iid,
        event.object_attributes.discussion_id,
      );

      if (discussion.notes.length === 1) {
        return null;
      }

      const watchedNote = discussion.notes.find((note: any) => note.body === 'watched');

      if (!watchedNote) {
        return null;
      }

      const reviewers = this.extractReviewersFromDescription(event.merge_request.description);

      if (!reviewers) {
        return null;
      }

      if (!reviewers.includes(watchedNote.author.username)) {
        return null;
      }

      const handledEvent: GitlabEvent = {
        type: 'fixedEvent',
        reviewer: watchedNote.author.username,
        mrInfo: {
          link: event.merge_request.url,
          name: event.merge_request.title,
          author: event.user.username,
        },
      };
      return handledEvent;
    }

    return null;
  }

  private extractReviewersFromDescription(description: string): string[] | undefined {
    return description
      .match(reviewersRe)?.[1]
      .split(',')
      .map((r: string) => r.trim())
      .map((r: string) => r.slice(1));
  }

  private isMrOpenEvent(event: RawGitlabEvent): boolean {
    return event.object_kind === 'merge_request' && event.object_attributes.action === 'open';
  }

  private makeAddReviewersEvent(reviewers: string[], event: IGitlabMergeRequestEvent): GitlabEvent {
    const authorUsername = event.user.username;

    const handledEvent: GitlabEvent = {
      type: 'addReviewersEvent',
      reviewers,
      mrInfo: {
        link: event.object_attributes.url,
        name: event.object_attributes.title,
        author: authorUsername,
      },
    };
    return handledEvent;
  }

  private isMrUpdateEvent(event: RawGitlabEvent): event is IGitlabMergeRequestEvent {
    return (
      event.object_kind === 'merge_request' &&
      event.object_attributes.action === 'update' &&
      !!event.changes &&
      !!event.changes.description
    );
  }

  private isApprovedEvent(event: RawGitlabEvent): event is IGitlabMergeRequestNoteEvent {
    const {
      user: { username },
    } = event;
    if (!this.isGitlabNoteEvent(event)) {
      return false;
    }

    const reviewers = this.extractReviewersFromDescription(event.merge_request.description);

    return (
      event.object_kind === 'note' &&
      event.object_attributes.type === null &&
      'merge_request' in event &&
      event.object_attributes.note === 'approve' &&
      !!reviewers?.includes(username)
    );
  }

  private isWatchedEvent(event: RawGitlabEvent): event is IGitlabMergeRequestNoteEvent {
    const {
      user: { username },
    } = event;

    if (!this.isGitlabNoteEvent(event)) {
      return false;
    }
    const reviewers = this.extractReviewersFromDescription(event.merge_request.description);

    return (
      event.object_kind === 'note' &&
      event.object_attributes.type === null &&
      'merge_request' in event &&
      event.object_attributes.note === 'watched' &&
      !!reviewers?.includes(username)
    );
  }

  private isFixedEvent(event: RawGitlabEvent): event is IGitlabMergeRequestNoteEvent {
    if (!this.isGitlabNoteEvent(event)) {
      return false;
    }

    return (
      event.object_kind === 'note' &&
      event.object_attributes.type === 'DiscussionNote' &&
      'merge_request' in event &&
      event.object_attributes.note === 'fixed' &&
      event.merge_request.author_id === event.object_attributes.author_id
    );
  }

  private isGitlabNoteEvent(event: RawGitlabEvent): event is IGitlabMergeRequestNoteEvent {
    return event.object_kind === 'note' && !('commit' in event);
  }

  private isGitlabMergeRequestEvent(event: RawGitlabEvent): event is IGitlabMergeRequestEvent {
    return event.object_kind === 'merge_request';
  }
}
