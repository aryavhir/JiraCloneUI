// Mock data for Jira UI clone
//todo: remove mock functionality
import { JiraUser, JiraProject, JiraIssue, JiraSprint, KanbanColumn } from '@shared/types';

export const mockUsers: JiraUser[] = [
  {
    id: '1',
    name: 'Sarah Johnson',
    email: 'sarah.johnson@company.com',
    initials: 'SJ',
    avatarUrl: undefined
  },
  {
    id: '2', 
    name: 'Mike Chen',
    email: 'mike.chen@company.com',
    initials: 'MC',
    avatarUrl: undefined
  },
  {
    id: '3',
    name: 'Jessica Williams',
    email: 'jessica.williams@company.com', 
    initials: 'JW',
    avatarUrl: undefined
  },
  {
    id: '4',
    name: 'David Rodriguez',
    email: 'david.rodriguez@company.com',
    initials: 'DR',
    avatarUrl: undefined
  },
  {
    id: '5',
    name: 'Emma Davis',
    email: 'emma.davis@company.com',
    initials: 'ED',
    avatarUrl: undefined
  }
];

export const mockProjects: JiraProject[] = [
  {
    id: '1',
    key: 'PROJ',
    name: 'Project Management Tool',
    description: 'Internal project management and tracking system',
    lead: mockUsers[0],
    category: 'Development',
    type: 'software'
  },
  {
    id: '2', 
    key: 'WEB',
    name: 'Website Redesign',
    description: 'Company website modernization project',
    lead: mockUsers[1],
    category: 'Marketing',
    type: 'business'
  }
];

export const mockIssues: JiraIssue[] = [
  {
    id: '1',
    key: 'PROJ-1',
    summary: 'Set up user authentication system',
    description: 'Implement OAuth 2.0 authentication with Google and GitHub providers',
    type: 'story',
    priority: 'high',
    status: 'in-progress',
    assignee: mockUsers[1],
    reporter: mockUsers[0],
    project: mockProjects[0],
    storyPoints: 8,
    createdAt: '2024-01-15T10:00:00Z',
    updatedAt: '2024-01-20T14:30:00Z',
    labels: ['backend', 'security'],
    comments: [
      {
        id: '1',
        author: mockUsers[0],
        body: 'Started working on the Google OAuth integration',
        createdAt: '2024-01-18T09:15:00Z',
        updatedAt: '2024-01-18T09:15:00Z'
      }
    ]
  },
  {
    id: '2',
    key: 'PROJ-2', 
    summary: 'Design dashboard wireframes',
    description: 'Create low-fi and high-fi wireframes for the main dashboard',
    type: 'task',
    priority: 'medium',
    status: 'done',
    assignee: mockUsers[2],
    reporter: mockUsers[0],
    project: mockProjects[0],
    storyPoints: 3,
    createdAt: '2024-01-10T08:00:00Z',
    updatedAt: '2024-01-25T16:45:00Z',
    labels: ['design', 'ux'],
    comments: []
  },
  {
    id: '3',
    key: 'PROJ-3',
    summary: 'Database connection timeout',
    description: 'Users experiencing timeout errors when accessing large datasets',
    type: 'bug',
    priority: 'highest',
    status: 'to-do',
    assignee: mockUsers[3],
    reporter: mockUsers[4],
    project: mockProjects[0],
    storyPoints: 5,
    createdAt: '2024-01-22T11:30:00Z',
    updatedAt: '2024-01-22T11:30:00Z',
    labels: ['database', 'performance'],
    comments: [
      {
        id: '2',
        author: mockUsers[4],
        body: 'This is affecting multiple users in production',
        createdAt: '2024-01-22T11:32:00Z',
        updatedAt: '2024-01-22T11:32:00Z'
      }
    ]
  },
  {
    id: '4',
    key: 'WEB-1',
    summary: 'Update homepage hero section',
    description: 'Refresh the hero section with new messaging and visuals',
    type: 'story',
    priority: 'medium',
    status: 'in-progress',
    assignee: mockUsers[2],
    reporter: mockUsers[1],
    project: mockProjects[1],
    storyPoints: 5,
    createdAt: '2024-01-20T14:00:00Z',
    updatedAt: '2024-01-24T10:15:00Z',
    labels: ['frontend', 'design'],
    comments: []
  },
  {
    id: '5',
    key: 'PROJ-4',
    summary: 'API rate limiting implementation',
    description: 'Add rate limiting to prevent API abuse and ensure fair usage',
    type: 'story',
    priority: 'low',
    status: 'to-do',
    assignee: undefined,
    reporter: mockUsers[0],
    project: mockProjects[0],
    storyPoints: 13,
    createdAt: '2024-01-25T16:00:00Z',
    updatedAt: '2024-01-25T16:00:00Z',
    labels: ['backend', 'api'],
    comments: []
  }
];

export const mockSprints: JiraSprint[] = [
  {
    id: '1',
    name: 'Sprint 1 - Foundation',
    state: 'active',
    startDate: '2024-01-15T00:00:00Z',
    endDate: '2024-01-29T00:00:00Z',
    goal: 'Set up core authentication and user management features',
    issues: [mockIssues[0], mockIssues[1], mockIssues[2]]
  },
  {
    id: '2',
    name: 'Sprint 2 - Features',
    state: 'future',
    startDate: '2024-01-29T00:00:00Z',
    endDate: '2024-02-12T00:00:00Z',
    goal: 'Implement core project management features',
    issues: [mockIssues[4]]
  }
];

export const mockKanbanColumns: KanbanColumn[] = [
  {
    id: '1',
    title: 'TO DO',
    status: 'to-do',
    issues: mockIssues.filter(issue => issue.status === 'to-do'),
    limit: 10
  },
  {
    id: '2', 
    title: 'IN PROGRESS',
    status: 'in-progress', 
    issues: mockIssues.filter(issue => issue.status === 'in-progress'),
    limit: 3
  },
  {
    id: '3',
    title: 'DONE',
    status: 'done',
    issues: mockIssues.filter(issue => issue.status === 'done'),
    limit: undefined
  }
];