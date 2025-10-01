// Mock data for Jira UI clone
//todo: remove mock functionality
import { JiraUser, JiraProject, JiraIssue, JiraSprint, KanbanColumn } from '@shared/types';

export const mockUsers: JiraUser[] = [
  {
    id: '1',
    name: 'Aryavhir koul',
    email: 'aryavhirkoul1@gmail.com',
    initials: 'AK',
    avatarUrl: undefined
  },
  {
    id: '2', 
    name: 'Aryavhir koul',
    email: 'aryavhirkoul1@gmail.com',
    initials: 'A',
    avatarUrl: undefined
  },
  {
    id: '3',
    name: ' Aggarwal',
    email: 'nihit6129@gmail.com', 
    initials: 'N',
    avatarUrl: undefined
  }
];

export const mockProjects: JiraProject[] = [
  {
    id: '1',
    key: 'JIRA',
    name: 'JiraCloneUI',
    description: 'Frontend repository for this project',
    lead: mockUsers[0],
    category: 'Development',
    type: 'software',
    avatarUrl: '/assets/jira-logo.jpg',
    githubUrl: 'https://github.com/aryavhir/JiraCloneUI',
    ProjectUrl: ''
  },
  {
    id: '2', 
    key: 'PORT',
    name: 'Portfolio-Website',
    description: 'Portfolio website for showcasing projects',
    lead: mockUsers[0],
    category: 'Personal',
    type: 'software',
    avatarUrl: '/assets/portfolio.png',
    githubUrl: 'https://github.com/aryavhir/portfolio-resume',
    ProjectUrl: 'https://aryavhir.in/'
  },
  {
    id: '3',
    key: 'AI',
    name: 'AI-studio',
    description: 'AI-powered design tool for converting images to web pages',
    lead: mockUsers[0],
    category: 'Development',
    type: 'software',
    avatarUrl: '/assets/ai-studio.png',
    githubUrl: 'https://github.com/aryavhir/AI-studio',
    ProjectUrl: 'https://modelia-project.vercel.app/'
  },
  {
    id: '4',
    key: 'VID',
    name: 'Video to site',
    description: 'Converting a video for project to a 1-1 webpage',
    lead: mockUsers[0],
    category: 'Development',
    type: 'software',
    avatarUrl: '/assets/dots.png',
    githubUrl: 'https://github.com/aryavhir/project-getdots.in',
    ProjectUrl: 'https://project-getdots.vercel.app/'
  },
  {
    id: '5',
    key: 'CYBER',
    name: 'Google Cybersecurity Certificate',
    description: 'Portfolio exercises for Google Cybersecurity Professional Certificate (credly)',
    lead: mockUsers[0],
    category: 'Education',
    type: 'business',
    avatarUrl: undefined,
    githubUrl: 'https://github.com/aryavhir/Google-Cybersecurity-Professional-Certificate-coursera-',
    ProjectUrl: 'https://github.com/aryavhir/Google-Cybersecurity-Professional-Certificate-coursera-'
  }
];

export const mockIssues: JiraIssue[] = [
  {
    id: '1',
    key: 'HYDRO-1',
    summary: 'OpenRTB Compliant Ad Banner Development',
    description: 'Create JavaScript ad banner that tracks impressions and dynamically places in real-time for Hydro Online adtech platform',
    type: 'story',
    priority: 'highest',
    status: 'done',
    assignee: mockUsers[0],
    reporter: mockUsers[0],
    project: mockProjects[0],
    storyPoints: 13,
    createdAt: '2024-08-01T10:00:00Z',
    updatedAt: '2024-08-15T14:30:00Z',
    labels: ['javascript', 'adtech', 'openrtb', 'real-time'],
    comments: [
      {
        id: '1',
        author: mockUsers[0],
        body: 'Successfully implemented impression tracking and real-time placement functionality',
        createdAt: '2024-08-10T09:15:00Z',
        updatedAt: '2024-08-10T09:15:00Z'
      }
    ]
  },
  {
    id: '2',
    key: 'HYDRO-2', 
    summary: 'Advertisers Portal for Campaign Management',
    description: 'Develop comprehensive portal using React.js, Go, and TypeScript for managing advertising campaigns',
    type: 'epic',
    priority: 'high',
    status: 'in-progress',
    assignee: mockUsers[0],
    reporter: mockUsers[0],
    project: mockProjects[0],
    storyPoints: 21,
    createdAt: '2024-08-05T08:00:00Z',
    updatedAt: '2024-08-20T16:45:00Z',
    labels: ['react', 'go', 'typescript', 'campaign-management'],
    comments: [
      {
        id: '2',
        author: mockUsers[0],
        body: 'Frontend components completed. Working on Go backend API integration.',
        createdAt: '2024-08-15T14:20:00Z',
        updatedAt: '2024-08-15T14:20:00Z'
      }
    ]
  },
  {
    id: '3',
    key: 'HYDRO-3',
    summary: 'Publisher Rewards Calculation System',
    description: 'Design and implement transparent and automated compensation system for publishers',
    type: 'story',
    priority: 'high',
    status: 'done',
    assignee: mockUsers[0],
    reporter: mockUsers[0],
    project: mockProjects[0],
    storyPoints: 8,
    createdAt: '2024-07-20T14:00:00Z',
    updatedAt: '2024-08-10T10:15:00Z',
    labels: ['backend', 'payments', 'automation', 'publishers'],
    comments: []
  },
  {
    id: '4',
    key: 'HYDRO-4',
    summary: 'MetaMask Crypto Purchase Integration',
    description: 'Create web app for purchasing cryptocurrency through MetaMask with Web3 integration',
    type: 'story',
    priority: 'high',
    status: 'in-progress',
    assignee: mockUsers[0],
    reporter: mockUsers[0],
    project: mockProjects[0],
    storyPoints: 13,
    createdAt: '2024-08-10T16:00:00Z',
    updatedAt: '2024-08-22T11:30:00Z',
    labels: ['web3', 'metamask', 'crypto', 'blockchain'],
    comments: [
      {
        id: '3',
        author: mockUsers[0],
        body: 'Web3 integration completed. Testing transaction flows with testnet.',
        createdAt: '2024-08-20T09:45:00Z',
        updatedAt: '2024-08-20T09:45:00Z'
      }
    ]
  },
  {
    id: '5',
    key: 'CYBER-1',
    summary: 'Security Audit and Compliance Assessment',
    description: 'Conduct comprehensive security audit for Hydro Online platform. Perform vulnerability assessment and penetration testing',
    type: 'story',
    priority: 'high',
    status: 'in-progress',
    assignee: mockUsers[0],
    reporter: mockUsers[0],
    project: mockProjects[2],
    storyPoints: 13,
    createdAt: '2024-08-01T09:00:00Z',
    updatedAt: '2024-08-25T16:30:00Z',
    labels: ['security', 'audit', 'compliance', 'penetration-testing'],
    comments: [
      {
        id: '4',
        author: mockUsers[0],
        body: 'Completed initial vulnerability scan. Found 3 medium-risk issues that need addressing.',
        createdAt: '2024-08-20T11:15:00Z',
        updatedAt: '2024-08-20T11:15:00Z'
      }
    ]
  },
  {
    id: '6',
    key: 'VOTE-1',
    summary: 'Blockchain Voting App Development',
    description: 'Implement secure voting mechanism using Solidity smart contracts deployed on Sepolia ETH testnet',
    type: 'story',
    priority: 'medium',
    status: 'done',
    assignee: mockUsers[0],
    reporter: mockUsers[0],
    project: mockProjects[3],
    storyPoints: 13,
    createdAt: '2024-06-01T10:00:00Z',
    updatedAt: '2024-06-20T15:30:00Z',
    labels: ['solidity', 'blockchain', 'voting', 'smart-contracts'],
    comments: []
  },
  {
    id: '7',
    key: 'PORT-1',
    summary: 'Portfolio Website Redesign',
    description: 'Update portfolio website with new design showcasing cybersecurity and development projects',
    type: 'story',
    priority: 'medium',
    status: 'in-progress',
    assignee: mockUsers[0],
    reporter: mockUsers[0],
    project: mockProjects[1],
    storyPoints: 8,
    createdAt: '2024-08-15T16:00:00Z',
    updatedAt: '2024-08-25T14:20:00Z',
    labels: ['portfolio', 'design', 'frontend', 'showcase'],
    comments: [
      {
        id: '5',
        author: mockUsers[0],
        body: 'New design mockups completed. Starting implementation with React and Tailwind CSS.',
        createdAt: '2024-08-22T10:30:00Z',
        updatedAt: '2024-08-22T10:30:00Z'
      }
    ]
  },
  {
    id: '8',
    key: 'AI-1',
    summary: 'AI Image to Web Page Conversion Tool',
    description: 'Develop AI-powered tool for converting design images to functional web pages',
    type: 'epic',
    priority: 'medium',
    status: 'to-do',
    assignee: undefined,
    reporter: mockUsers[0],
    project: mockProjects[4],
    storyPoints: 21,
    createdAt: '2024-08-20T12:00:00Z',
    updatedAt: '2024-08-20T12:00:00Z',
    labels: ['ai', 'machine-learning', 'design-to-code', 'automation'],
    comments: []
  }
];

export const mockSprints: JiraSprint[] = [
  {
    id: '1',
    name: 'Sprint 1 - Hydro Online Core Features',
    state: 'active',
    startDate: '2024-08-01T00:00:00Z',
    endDate: '2024-08-31T00:00:00Z',
    goal: 'Complete core adtech platform features including OpenRTB compliance and payment integrations',
    issues: [mockIssues[0], mockIssues[1], mockIssues[2], mockIssues[3]]
  },
  {
    id: '2',
    name: 'Sprint 2 - Security & Personal Projects',
    state: 'future',
    startDate: '2024-09-01T00:00:00Z',
    endDate: '2024-09-30T00:00:00Z',
    goal: 'Focus on cybersecurity projects and personal portfolio development',
    issues: [mockIssues[4], mockIssues[5], mockIssues[6]]
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