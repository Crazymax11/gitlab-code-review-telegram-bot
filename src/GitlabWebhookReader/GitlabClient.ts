import axios, { AxiosInstance, AxiosResponse } from 'axios';
import { ILogger } from '../types';

interface User {
  id: number;
  username: string;
  name: string;
  state: string;
  avatar_url: string;
  web_url: string;
  created_at: string;
  bio: null;
  location: null;
  public_email: string;
  skype: string;
  linkedin: string;
  twitter: string;
  website_url: string;
  organization: string;
  job_title: string;
}

export interface IDiscussion {
  id: string;
  individual_note: boolean;
  notes: {
    id: number;
    type: 'DiscussionNote' | null;
    body: string;
    attachment: null;
    author: {
      id: number;
      name: string;
      username: string;
      state: 'active';
      avatar_url: string;
      web_url: string;
    };
    created_at: string;
    updated_at: string;
    system: boolean;
    noteable_id: number;
    noteable_type: string;
    noteable_iid: null | number;
    resolvable: boolean;
    resolved: boolean;
    resolved_by: null;
    confidential: null;
    commands_changes: {};
  }[];
}

export class GitlabClient {
  private axiosClient: AxiosInstance;

  private token: string;

  private logger: ILogger;

  constructor(gitlabHost: string, token: string, logger: ILogger) {
    this.token = token;
    this.logger = logger.createScope('GitlabClient');
    this.axiosClient = axios.create({
      baseURL: `${gitlabHost}/api/v4`,
    });
  }

  getUsernameById(userId: number) {
    this.logger.debug(`getUsernameById ${userId}`);

    return this.axiosClient
      .get(`/users/${userId}`, {
        headers: {
          'Private-Token': this.token,
        },
      })
      .then((res: AxiosResponse<User>) => res.data.username);
  }

  getDiscussion(
    projectId: string | number,
    mergeReqiestIid: number,
    discussionId: string,
  ): Promise<IDiscussion> {
    this.logger.debug(
      `getDiscussion ${JSON.stringify({ projectId, mergeReqiestIid, discussionId })}`,
    );

    return this.axiosClient
      .get(`/projects/${projectId}/merge_requests/${mergeReqiestIid}/discussions/${discussionId}`, {
        headers: {
          'Private-Token': this.token,
        },
      })
      .then((res: AxiosResponse<IDiscussion>) => res.data);
  }
}
