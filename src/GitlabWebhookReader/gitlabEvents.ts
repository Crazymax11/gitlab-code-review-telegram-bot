/* eslint-disable max-lines */
/* eslint-disable @typescript-eslint/camelcase */
import _ from 'lodash';
import { GitlabEvent, IGitlabMergeRequestNoteEvent } from './RawGitlabEvent';

export const gitlabMrOpenedEvent: GitlabEvent = {
  object_kind: 'merge_request',
  event_type: 'merge_request',
  user: {
    name: 'Шабанов Артем Андреевич',
    username: 'artem.shabanov',
    avatar_url:
      'https://secure.gravatar.com/avatar/e19766b8cc10f8056ffcda87065ae22b?s=80\u0026d=identicon',
    email: 'artem.shabanov@skbkontur.ru',
  },
  project: {
    id: 10832,
    name: 'randy-bot',
    description: '',
    web_url: 'https://git.skbkontur.ru/artem.shabanov/randy-bot',
    avatar_url:
      'https://git.skbkontur.ru/uploads/-/system/project/avatar/10832/raf_750x1000_075_t_FFFFFF_97ab1c12de.u2.jpg',
    git_ssh_url: 'git@git.skbkontur.ru:artem.shabanov/randy-bot.git',
    git_http_url: 'https://git.skbkontur.ru/artem.shabanov/randy-bot.git',
    namespace: 'Шабанов Артем Андреевич',
    visibility_level: 10,
    path_with_namespace: 'artem.shabanov/randy-bot',
    default_branch: 'master',
    ci_config_path: null,
    homepage: 'https://git.skbkontur.ru/artem.shabanov/randy-bot',
    url: 'git@git.skbkontur.ru:artem.shabanov/randy-bot.git',
    ssh_url: 'git@git.skbkontur.ru:artem.shabanov/randy-bot.git',
    http_url: 'https://git.skbkontur.ru/artem.shabanov/randy-bot.git',
  },
  object_attributes: {
    assignee_id: null,
    author_id: 1179,
    created_at: '2020-04-12 12:02:01 +0500',
    description: '@artem.shabanov 😀',
    head_pipeline_id: null,
    id: 76501,
    iid: 5,
    last_edited_at: null,
    last_edited_by_id: null,
    merge_commit_sha: null,
    merge_error: null,
    merge_params: { force_remove_source_branch: '0' },
    merge_status: 'unchecked',
    merge_user_id: null,
    merge_when_pipeline_succeeds: false,
    milestone_id: null,
    source_branch: 'feature/awesome-thing',
    source_project_id: 10832,
    state_id: 1,
    target_branch: 'master',
    target_project_id: 10832,
    time_estimate: 0,
    title: 'Тестирую ивенты при работе с MR',
    updated_at: '2020-04-12 12:02:01 +0500',
    updated_by_id: null,
    url: 'https://git.skbkontur.ru/artem.shabanov/randy-bot/-/merge_requests/5',
    source: {
      id: 10832,
      name: 'randy-bot',
      description: '',
      web_url: 'https://git.skbkontur.ru/artem.shabanov/randy-bot',
      avatar_url:
        'https://git.skbkontur.ru/uploads/-/system/project/avatar/10832/raf_750x1000_075_t_FFFFFF_97ab1c12de.u2.jpg',
      git_ssh_url: 'git@git.skbkontur.ru:artem.shabanov/randy-bot.git',
      git_http_url: 'https://git.skbkontur.ru/artem.shabanov/randy-bot.git',
      namespace: 'Шабанов Артем Андреевич',
      visibility_level: 10,
      path_with_namespace: 'artem.shabanov/randy-bot',
      default_branch: 'master',
      ci_config_path: null,
      homepage: 'https://git.skbkontur.ru/artem.shabanov/randy-bot',
      url: 'git@git.skbkontur.ru:artem.shabanov/randy-bot.git',
      ssh_url: 'git@git.skbkontur.ru:artem.shabanov/randy-bot.git',
      http_url: 'https://git.skbkontur.ru/artem.shabanov/randy-bot.git',
    },
    target: {
      id: 10832,
      name: 'randy-bot',
      description: '',
      web_url: 'https://git.skbkontur.ru/artem.shabanov/randy-bot',
      avatar_url:
        'https://git.skbkontur.ru/uploads/-/system/project/avatar/10832/raf_750x1000_075_t_FFFFFF_97ab1c12de.u2.jpg',
      git_ssh_url: 'git@git.skbkontur.ru:artem.shabanov/randy-bot.git',
      git_http_url: 'https://git.skbkontur.ru/artem.shabanov/randy-bot.git',
      namespace: 'Шабанов Артем Андреевич',
      visibility_level: 10,
      path_with_namespace: 'artem.shabanov/randy-bot',
      default_branch: 'master',
      ci_config_path: null,
      homepage: 'https://git.skbkontur.ru/artem.shabanov/randy-bot',
      url: 'git@git.skbkontur.ru:artem.shabanov/randy-bot.git',
      ssh_url: 'git@git.skbkontur.ru:artem.shabanov/randy-bot.git',
      http_url: 'https://git.skbkontur.ru/artem.shabanov/randy-bot.git',
    },
    last_commit: {
      id: '1d173ea7aee04e665b789a63a65f1b6920d40b99',
      message: 'feat: implemented awesome feature\n',
      timestamp: '2020-04-05T18:13:21+07:00',
      url:
        'https://git.skbkontur.ru/artem.shabanov/randy-bot/-/commit/1d173ea7aee04e665b789a63a65f1b6920d40b99',
      author: { name: 'Artem Shabanov', email: 'artem.shabanov@skbkontur.ru' },
    },
    work_in_progress: false,
    total_time_spent: 0,
    human_total_time_spent: null,
    human_time_estimate: null,
    assignee_ids: [],
    state: 'opened',
    action: 'open',
  },
  labels: [],
  changes: {
    author_id: { previous: null, current: 1179 },
    created_at: { previous: null, current: '2020-04-12 12:02:01 +0500' },
    description: { previous: null, current: '@artem.shabanov 😀' },
    id: { previous: null, current: 76501 },
    iid: { previous: null, current: 5 },
    merge_params: {
      previous: {},
      current: { force_remove_source_branch: '0' },
    },
    source_branch: { previous: null, current: 'feature/awesome-thing' },
    source_project_id: { previous: null, current: 10832 },
    target_branch: { previous: null, current: 'master' },
    target_project_id: { previous: null, current: 10832 },
    title: { previous: null, current: 'Тестирую ивенты при работе с MR' },
    updated_at: { previous: null, current: '2020-04-12 12:02:01 +0500' },
    total_time_spent: { previous: null, current: 0 },
  },
  repository: {
    name: 'randy-bot',
    url: 'git@git.skbkontur.ru:artem.shabanov/randy-bot.git',
    description: '',
    homepage: 'https://git.skbkontur.ru/artem.shabanov/randy-bot',
  },
};

export const newMrWithTwoReviewers = _.merge({}, gitlabMrOpenedEvent, {
  object_attributes: {
    description: 'reviewers: @someuser, @anotheruser',
  },
});

export const gitlabMrUpdatedEvent: GitlabEvent = {
  object_kind: 'merge_request',
  event_type: 'merge_request',
  user: {
    name: 'Шабанов Артем Андреевич',
    username: 'artem.shabanov',
    avatar_url:
      'https://secure.gravatar.com/avatar/e19766b8cc10f8056ffcda87065ae22b?s=80\u0026d=identicon',
    email: 'artem.shabanov@skbkontur.ru',
  },
  project: {
    id: 10832,
    name: 'randy-bot',
    description: '',
    web_url: 'https://git.skbkontur.ru/artem.shabanov/randy-bot',
    avatar_url:
      'https://git.skbkontur.ru/uploads/-/system/project/avatar/10832/raf_750x1000_075_t_FFFFFF_97ab1c12de.u2.jpg',
    git_ssh_url: 'git@git.skbkontur.ru:artem.shabanov/randy-bot.git',
    git_http_url: 'https://git.skbkontur.ru/artem.shabanov/randy-bot.git',
    namespace: 'Шабанов Артем Андреевич',
    visibility_level: 10,
    path_with_namespace: 'artem.shabanov/randy-bot',
    default_branch: 'master',
    ci_config_path: null,
    homepage: 'https://git.skbkontur.ru/artem.shabanov/randy-bot',
    url: 'git@git.skbkontur.ru:artem.shabanov/randy-bot.git',
    ssh_url: 'git@git.skbkontur.ru:artem.shabanov/randy-bot.git',
    http_url: 'https://git.skbkontur.ru/artem.shabanov/randy-bot.git',
  },
  object_attributes: {
    assignee_id: null,
    author_id: 1179,
    created_at: '2020-04-12 12:02:01 +0500',
    description: '@artem.shabanov 😀\r\n\r\nupdate description\r\n',
    head_pipeline_id: null,
    id: 76501,
    iid: 5,
    last_edited_at: '2020-04-12 12:56:37 +0500',
    last_edited_by_id: 1179,
    merge_commit_sha: null,
    merge_error: null,
    merge_params: { force_remove_source_branch: '0' },
    merge_status: 'can_be_merged',
    merge_user_id: null,
    merge_when_pipeline_succeeds: false,
    milestone_id: null,
    source_branch: 'feature/awesome-thing',
    source_project_id: 10832,
    state_id: 1,
    target_branch: 'master',
    target_project_id: 10832,
    time_estimate: 0,
    title: 'Тестирую ивенты при работе с MR',
    updated_at: '2020-04-12 12:56:37 +0500',
    updated_by_id: 1179,
    url: 'https://git.skbkontur.ru/artem.shabanov/randy-bot/-/merge_requests/5',
    source: {
      id: 10832,
      name: 'randy-bot',
      description: '',
      web_url: 'https://git.skbkontur.ru/artem.shabanov/randy-bot',
      avatar_url:
        'https://git.skbkontur.ru/uploads/-/system/project/avatar/10832/raf_750x1000_075_t_FFFFFF_97ab1c12de.u2.jpg',
      git_ssh_url: 'git@git.skbkontur.ru:artem.shabanov/randy-bot.git',
      git_http_url: 'https://git.skbkontur.ru/artem.shabanov/randy-bot.git',
      namespace: 'Шабанов Артем Андреевич',
      visibility_level: 10,
      path_with_namespace: 'artem.shabanov/randy-bot',
      default_branch: 'master',
      ci_config_path: null,
      homepage: 'https://git.skbkontur.ru/artem.shabanov/randy-bot',
      url: 'git@git.skbkontur.ru:artem.shabanov/randy-bot.git',
      ssh_url: 'git@git.skbkontur.ru:artem.shabanov/randy-bot.git',
      http_url: 'https://git.skbkontur.ru/artem.shabanov/randy-bot.git',
    },
    target: {
      id: 10832,
      name: 'randy-bot',
      description: '',
      web_url: 'https://git.skbkontur.ru/artem.shabanov/randy-bot',
      avatar_url:
        'https://git.skbkontur.ru/uploads/-/system/project/avatar/10832/raf_750x1000_075_t_FFFFFF_97ab1c12de.u2.jpg',
      git_ssh_url: 'git@git.skbkontur.ru:artem.shabanov/randy-bot.git',
      git_http_url: 'https://git.skbkontur.ru/artem.shabanov/randy-bot.git',
      namespace: 'Шабанов Артем Андреевич',
      visibility_level: 10,
      path_with_namespace: 'artem.shabanov/randy-bot',
      default_branch: 'master',
      ci_config_path: null,
      homepage: 'https://git.skbkontur.ru/artem.shabanov/randy-bot',
      url: 'git@git.skbkontur.ru:artem.shabanov/randy-bot.git',
      ssh_url: 'git@git.skbkontur.ru:artem.shabanov/randy-bot.git',
      http_url: 'https://git.skbkontur.ru/artem.shabanov/randy-bot.git',
    },
    last_commit: {
      id: '1d173ea7aee04e665b789a63a65f1b6920d40b99',
      message: 'feat: implemented awesome feature\n',
      timestamp: '2020-04-05T18:13:21+07:00',
      url:
        'https://git.skbkontur.ru/artem.shabanov/randy-bot/-/commit/1d173ea7aee04e665b789a63a65f1b6920d40b99',
      author: { name: 'Artem Shabanov', email: 'artem.shabanov@skbkontur.ru' },
    },
    work_in_progress: false,
    total_time_spent: 0,
    human_total_time_spent: null,
    human_time_estimate: null,
    assignee_ids: [],
    state: 'opened',
    action: 'update',
  },
  labels: [],
  changes: {
    description: {
      previous: '@artem.shabanov 😀',
      current: '@artem.shabanov 😀\r\n\r\nupdate description\r\n',
    },
    last_edited_at: { previous: null, current: '2020-04-12 12:56:37 +0500' },
    last_edited_by_id: { previous: null, current: 1179 },
    updated_at: {
      previous: '2020-04-12 12:02:01 +0500',
      current: '2020-04-12 12:56:37 +0500',
    },
    updated_by_id: { previous: null, current: 1179 },
  },
  repository: {
    name: 'randy-bot',
    url: 'git@git.skbkontur.ru:artem.shabanov/randy-bot.git',
    description: '',
    homepage: 'https://git.skbkontur.ru/artem.shabanov/randy-bot',
  },
};

export const addReviewersInMrUpdate = _.merge({}, gitlabMrUpdatedEvent, {
  object_attributes: {
    description: 'reviewers: @someuser, @anotheruser',
  },
  changes: {
    description: {
      previous: 'ну тут описание',
      current: 'reviewers: @someuser, @anotheruser',
    },
  },
});

export const addNewReviewerInMrUpdate = _.merge({}, gitlabMrUpdatedEvent, {
  object_attributes: {
    description: 'reviewers: @someuser, @anotheruser',
  },
  changes: {
    description: {
      previous: 'reviewers: @someuser',
      current: 'reviewers: @someuser, @anotheruser',
    },
  },
});

export const gitlabNewCommentInMREvent: IGitlabMergeRequestNoteEvent = {
  object_kind: 'note',
  event_type: 'note',
  user: {
    name: 'Соснов Максим Евгеньевич',
    username: 'someuser',
    avatar_url:
      'https://secure.gravatar.com/avatar/01041ae6b457636b8d8b538aba514670?s=80&d=identicon',
    email: 'm.sosnov@skbkontur.ru',
  },
  project_id: 10832,
  project: {
    id: 10832,
    name: 'randy-bot',
    description: '',
    web_url: 'https://git.skbkontur.ru/artem.shabanov/randy-bot',
    avatar_url:
      'https://git.skbkontur.ru/uploads/-/system/project/avatar/10832/raf_750x1000_075_t_FFFFFF_97ab1c12de....',
    git_ssh_url: 'git@git.skbkontur.ru:artem.shabanov/randy-bot.git',
    git_http_url: 'https://git.skbkontur.ru/artem.shabanov/randy-bot.git',
    namespace: 'Шабанов Артем Андреевич',
    visibility_level: 10,
    path_with_namespace: 'artem.shabanov/randy-bot',
    default_branch: 'master',
    ci_config_path: null,
    homepage: 'https://git.skbkontur.ru/artem.shabanov/randy-bot',
    url: 'git@git.skbkontur.ru:artem.shabanov/randy-bot.git',
    ssh_url: 'git@git.skbkontur.ru:artem.shabanov/randy-bot.git',
    http_url: 'https://git.skbkontur.ru/artem.shabanov/randy-bot.git',
  },
  object_attributes: {
    attachment: null,
    author_id: 3096,
    change_position: null,
    commit_id: null,
    created_at: '2020-04-15 14:47:40 UTC',
    discussion_id: '4e0a9c0a6af3cffe208fdf3ae334d839c0419e45',
    id: 1017218,
    line_code: null,
    note: 'kek',
    noteable_id: 76823,
    noteable_type: 'MergeRequest',
    original_position: null,
    position: null,
    project_id: 10832,
    resolved_at: null,
    resolved_by_id: null,
    resolved_by_push: null,
    st_diff: null,
    system: false,
    type: null,
    updated_at: '2020-04-15 14:47:40 UTC',
    updated_by_id: null,
    description: 'kek',
    url: 'https://git.skbkontur.ru/artem.shabanov/randy-bot/-/merge_requests/8#note_1017218',
  },
  repository: {
    name: 'randy-bot',
    url: 'git@git.skbkontur.ru:artem.shabanov/randy-bot.git',
    description: '',
    homepage: 'https://git.skbkontur.ru/artem.shabanov/randy-bot',
  },
  merge_request: {
    assignee_id: null,
    author_id: 3096,
    created_at: '2020-04-14 15:18:41 UTC',
    description: 'reviewers: @someuser, @anotheruser',
    head_pipeline_id: null,
    id: 76823,
    iid: 123,
    last_edited_at: null,
    last_edited_by_id: null,
    merge_commit_sha: '0b1706e66d63b8e3608d087d9a945a7e04253e7d',
    merge_error: null,
    merge_params: { force_remove_source_branch: '1' },
    merge_status: 'can_be_merged',
    merge_user_id: null,
    merge_when_pipeline_succeeds: false,
    milestone_id: null,
    source_branch: 'first-test',
    source_project_id: 10832,
    state_id: 3,
    target_branch: 'master',
    target_project_id: 10832,
    time_estimate: 0,
    title: 'Добавляет первый тест',
    updated_at: '2020-04-15 14:47:40 UTC',
    updated_by_id: null,
    url: 'https://git.skbkontur.ru/artem.shabanov/randy-bot/-/merge_requests/8',
    source: {
      id: 10832,
      name: 'randy-bot',
      description: '',
      web_url: 'https://git.skbkontur.ru/artem.shabanov/randy-bot',
      avatar_url:
        'https://git.skbkontur.ru/uploads/-/system/project/avatar/10832/raf_750x1000_075_t_FFFFFF_97ab1c12de....',
      git_ssh_url: 'git@git.skbkontur.ru:artem.shabanov/randy-bot.git',
      git_http_url: 'https://git.skbkontur.ru/artem.shabanov/randy-bot.git',
      namespace: 'Шабанов Артем Андреевич',
      visibility_level: 10,
      path_with_namespace: 'artem.shabanov/randy-bot',
      default_branch: 'master',
      ci_config_path: null,
      homepage: 'https://git.skbkontur.ru/artem.shabanov/randy-bot',
      url: 'git@git.skbkontur.ru:artem.shabanov/randy-bot.git',
      ssh_url: 'git@git.skbkontur.ru:artem.shabanov/randy-bot.git',
      http_url: 'https://git.skbkontur.ru/artem.shabanov/randy-bot.git',
    },
    target: {
      id: 10832,
      name: 'randy-bot',
      description: '',
      web_url: 'https://git.skbkontur.ru/artem.shabanov/randy-bot',
      avatar_url:
        'https://git.skbkontur.ru/uploads/-/system/project/avatar/10832/raf_750x1000_075_t_FFFFFF_97ab1c12de....',
      git_ssh_url: 'git@git.skbkontur.ru:artem.shabanov/randy-bot.git',
      git_http_url: 'https://git.skbkontur.ru/artem.shabanov/randy-bot.git',
      namespace: 'Шабанов Артем Андреевич',
      visibility_level: 10,
      path_with_namespace: 'artem.shabanov/randy-bot',
      default_branch: 'master',
      ci_config_path: null,
      homepage: 'https://git.skbkontur.ru/artem.shabanov/randy-bot',
      url: 'git@git.skbkontur.ru:artem.shabanov/randy-bot.git',
      ssh_url: 'git@git.skbkontur.ru:artem.shabanov/randy-bot.git',
      http_url: 'https://git.skbkontur.ru/artem.shabanov/randy-bot.git',
    },
    last_commit: {
      id: '54b97a2c69d930ce954cfc450bc68af3ae4c6201',
      message: 'Добавляет первый тест\n',
      title: 'Добавляет первый тест',
      timestamp: '2020-04-15T21:22:54+07:00',
      url:
        'https://git.skbkontur.ru/artem.shabanov/randy-bot/-/commit/54b97a2c69d930ce954cfc450bc68af3ae4c6201',
      author: { name: 'Max Sosnov', email: 'm.sosnov@skbkontur.ru' },
    },
    work_in_progress: false,
    total_time_spent: 0,
    human_total_time_spent: null,
    human_time_estimate: null,
    assignee_ids: [],
    state: 'merged',
  },
};

export const reviewerApprovedMr = _.merge(_.cloneDeep(gitlabNewCommentInMREvent), {
  object_attributes: {
    note: 'approve',
  },
});

export const reviewerApprovedMrNotTopLevel = _.merge(_.cloneDeep(reviewerApprovedMr), {
  object_attributes: {
    type: 'DiscussionNote',
  },
});

export const notReviewerApprovedMr = _.merge(_.cloneDeep(reviewerApprovedMr), {
  user: {
    username: 'notreviewer',
  },
});

export const reviewerWatchedMr = _.merge(_.cloneDeep(reviewerApprovedMr), {
  object_attributes: {
    note: 'watched',
  },
});

export const reviewerWatchedMrNotTopLevel = _.merge(_.cloneDeep(reviewerWatchedMr), {
  object_attributes: {
    type: 'DiscussionNote',
  },
});

export const notReviewerWatchedMr = _.merge(_.cloneDeep(reviewerWatchedMr), {
  user: {
    username: 'notreviewer',
  },
});

export const authorFixedReviewerNotes = _.merge(_.cloneDeep(gitlabNewCommentInMREvent), {
  object_attributes: {
    note: 'fixed',
    type: 'DiscussionNote',
    author_id: 1337,
  },
  user: {
    username: 'author',
  },
  merge_request: {
    author_id: 1337,
  },
});

export const notAuthorFixedReviewerNotes = _.merge(_.cloneDeep(gitlabNewCommentInMREvent), {
  object_attributes: {
    note: 'fixed',
    type: 'DiscussionNote',
    author_id: 1338,
  },
  user: {
    username: 'notauthor',
  },
  merge_request: {
    author_id: 1337,
  },
});

/* eslint-enable @typescript-eslint/camelcase */

/* eslint-enable max-lines */
