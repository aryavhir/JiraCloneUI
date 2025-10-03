// Jira data types for frontend-only mock data
export interface JiraUser {
  id: string;
  name: string;
  email: string;
  avatarUrl?: string;
  initials: string;
}

export interface JiraProject {
  id: string;
  key: string;
  name: string;
  description: string;
  lead: JiraUser;
  category: string;
  type: 'software' | 'business';
  avatarUrl?: string;
  githubUrl?: string;
  ProjectUrl?: string;
}

export type IssueType = 'story' | 'bug' | 'task' | 'epic';
export type IssuePriority = 'highest' | 'high' | 'medium' | 'low' | 'lowest';
export type IssueStatus = 'to-do' | 'in-progress' | 'done';

export interface JiraIssue {
  id: string;
  key: string;
  summary: string;
  description: string;
  type: IssueType;
  priority: IssuePriority;
  status: IssueStatus;
  assignee?: JiraUser;
  reporter: JiraUser;
  project: JiraProject;
  storyPoints?: number;
  createdAt: string;
  updatedAt: string;
  labels: string[];
  comments: JiraComment[];
}

export interface JiraComment {
  id: string;
  author: JiraUser;
  body: string;
  createdAt: string;
  updatedAt: string;
}

export interface JiraSprint {
  id: string;
  name: string;
  state: 'future' | 'active' | 'closed';
  startDate?: string;
  endDate?: string;
  completeDate?: string;
  goal?: string;
  issues: JiraIssue[];
}

export interface KanbanColumn {
  id: string;
  title: string;
  status: IssueStatus;
  issues: JiraIssue[];
  limit?: number;
}