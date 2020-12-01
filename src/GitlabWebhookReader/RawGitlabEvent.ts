interface IGitlabProject {
  id: number;
  name: string;
  description: string;
  web_url: string;
  avatar_url: string;
  git_ssh_url: string;
  git_http_url: string;
  namespace: string;
  visibility_level: number;
  path_with_namespace: string;
  default_branch: string;
  ci_config_path: null | string;
  homepage: string;
  url: string;
  ssh_url: string;
  http_url: string;
}

interface IGitlabRepository {
  name: string;
  url: string;
  description: string;
  homepage: string;
}

interface IGitlabUser {
  name: string;
  username: string;
  avatar_url: string;
  email: string;
}

interface IGitlabLabel {
  id: number;
  title: string;
  color: string;
  project_id: number;
  created_at: string;
  updated_at: string;
  template: boolean;
  description: null | string;
  type: string;
  group_id: null | number;
}

type GitlabMergeRequestAction = 'close' | 'merge' | 'update' | 'open';

type GitlabMergeRequestState = 'closed' | 'merged' | 'opened';

interface IGitlabMergeRequestAttributes {
  assignee_id: null | number;
  author_id: number;
  created_at: string;
  description: string;
  head_pipeline_id: null | number;
  id: number;
  iid: number;
  last_edited_at: string | null;
  last_edited_by_id: number | null;
  merge_commit_sha: null | string;
  merge_error: null;
  merge_params: {
    force_remove_source_branch: string;
  };
  merge_status: string;
  merge_user_id: null | string;
  merge_when_pipeline_succeeds: boolean;
  milestone_id: null | number;
  source_branch: string;
  source_project_id: number;
  state_id: number;
  target_branch: string;
  target_project_id: number;
  time_estimate: number;
  title: string;
  updated_at: string | null;
  updated_by_id: number | null;
  url: string;
  source: IGitlabProject;
  target: IGitlabProject;
  last_commit: {
    id: string;
    message: string;
    timestamp: string;
    url: string;
    author: {
      name: string;
      email: string;
    };
  };
  work_in_progress: boolean;
  total_time_spent: number;
  human_total_time_spent: null | number;
  human_time_estimate: null | number;
  assignee_ids: number[];
  state: GitlabMergeRequestState;
  action: GitlabMergeRequestAction;
  oldrev?: string;
}

interface IGitlabNoteAttributes {
  attachment: null;
  author_id: number;
  change_position: null;
  commit_id: null;
  created_at: string;
  discussion_id: string;
  id: number;
  line_code: null;
  note: string;
  noteable_id: number;
  noteable_type: string;
  original_position: null;
  position: null;
  project_id: number;
  resolved_at: null;
  resolved_by_id: null;
  resolved_by_push: null;
  st_diff: null;
  system: false;
  type: null | string;
  updated_at: string;
  updated_by_id: null;
  description: string;
  url: string;
}
interface IGitlabMergeRequestEventChange<T> {
  previous: T | null;
  current: T | null;
}
export interface IGitlabMergeRequestEvent {
  object_kind: 'merge_request';
  event_type: string;
  user: IGitlabUser;
  project: IGitlabProject;
  object_attributes: IGitlabMergeRequestAttributes;
  changes: {
    description?: IGitlabMergeRequestEventChange<string>;
    author_id?: IGitlabMergeRequestEventChange<number>;
    created_at?: IGitlabMergeRequestEventChange<string>;
    id?: IGitlabMergeRequestEventChange<number>;
    iid?: IGitlabMergeRequestEventChange<number>;
    merge_params?: IGitlabMergeRequestEventChange<{ force_remove_source_branch?: string }>;

    source_branch?: IGitlabMergeRequestEventChange<string>;
    source_project_id?: IGitlabMergeRequestEventChange<number>;
    target_branch?: IGitlabMergeRequestEventChange<string>;
    target_project_id?: IGitlabMergeRequestEventChange<number>;
    title?: IGitlabMergeRequestEventChange<string>;
    updated_at?: IGitlabMergeRequestEventChange<string>;
    total_time_spent?: IGitlabMergeRequestEventChange<number>;
    last_edited_at?: IGitlabMergeRequestEventChange<string>;
    last_edited_by_id?: IGitlabMergeRequestEventChange<number>;
    updated_by_id?: IGitlabMergeRequestEventChange<number>;
  };
  repository: IGitlabRepository;
  labels: IGitlabLabel[];
  assignees?: IGitlabUser[];
}

// @ts-ignore
interface IGitlabMergeRequestOpenedEvent extends IGitlabMergeRequestEvent {
  object_attributes: IGitlabMergeRequestAttributes & { action: 'open' };
}
// @ts-ignore
interface IGitlabMergeRequestUpdatedEvent extends IGitlabMergeRequestEvent {
  object_attributes: IGitlabMergeRequestAttributes & { action: 'update' };
}

interface IGitlabNoteEvent {
  object_kind: 'note';
  event_type: 'note';
  user: IGitlabUser;
  project_id: number;
  project: IGitlabProject;
  object_attributes: IGitlabNoteAttributes;
  repository: IGitlabRepository;
}

export interface IGitlabMergeRequestNoteEvent extends IGitlabNoteEvent {
  merge_request: {
    assignee_id: null;
    author_id: number;
    created_at: string;
    description: string;
    head_pipeline_id: null;
    id: number;
    iid?: number;
    last_edited_at: null;
    last_edited_by_id: null;
    merge_commit_sha: string;
    merge_error: null;
    merge_params: { force_remove_source_branch: string };
    merge_status: string;
    merge_user_id: null;
    merge_when_pipeline_succeeds: false;
    milestone_id: null;
    source_branch: string;
    source_project_id: 10832;
    state_id: 3;
    target_branch: string;
    target_project_id: 10832;
    time_estimate: 0;
    title: string;
    updated_at: string;
    updated_by_id: null;
    url: string;
    source: {
      id: 10832;
      name: string;
      description: string;
      web_url: string;
      avatar_url: string;
      git_ssh_url: string;
      git_http_url: string;
      namespace: string;
      visibility_level: 10;
      path_with_namespace: string;
      default_branch: string;
      ci_config_path: null;
      homepage: string;
      url: string;
      ssh_url: string;
      http_url: string;
    };
    target: {
      id: 10832;
      name: string;
      description: string;
      web_url: string;
      avatar_url: string;
      git_ssh_url: string;
      git_http_url: string;
      namespace: string;
      visibility_level: 10;
      path_with_namespace: string;
      default_branch: string;
      ci_config_path: null;
      homepage: string;
      url: string;
      ssh_url: string;
      http_url: string;
    };
    last_commit: {
      id: string;
      message: string;
      title: string;
      timestamp: string;
      url: string;
      author: { name: string; email: string };
    };
    work_in_progress: false;
    total_time_spent: number;
    human_total_time_spent: null;
    human_time_estimate: null;
    assignee_ids: [];
    state: string;
  };
}

interface IGitlabCommitNoteEvent extends IGitlabNoteEvent {
  commit: any;
}

export type GitlabNoteEvent = IGitlabMergeRequestNoteEvent | IGitlabCommitNoteEvent;

export type GitlabEvent = IGitlabMergeRequestEvent | GitlabNoteEvent;
