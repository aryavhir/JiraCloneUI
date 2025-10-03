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
    labels: ['javascript', 'adtech', 'openrtb', 'real-time','cross-browser','html','css'],
    comments: [
      {
        id: '1',
        author: mockUsers[0],
        body: 'Implemented cross-browser compatible ad banner with impression tracking based on percentage of banner visible.',
        createdAt: '2024-09-10T09:15:00Z',
        updatedAt: '2024-09-10T09:15:00Z'
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
    status: 'done',
    assignee: mockUsers[0],
    reporter: mockUsers[0],
    project: mockProjects[0],
    storyPoints: 21,
    createdAt: '2024-08-05T08:00:00Z',
    updatedAt: '2024-08-20T16:45:00Z',
    labels: ['react', 'go', 'typescript', 'campaign-management'],
    comments: [
  
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
    labels: ['backend', 'payments', 'automation', 'RestAPI', 'sql'],
    comments: []
  },
  {
    id: '3',
    key: 'HYDRO-3',
    summary: 'Enterprise Website Architecture & Performance Optimization',
    description: 'Enhanced and managed Hydro Online’s website using Webflow by adding new pages and improved usability',
    type: 'story',
    priority: 'high',
    status: 'done',
    assignee: mockUsers[0],
    reporter: mockUsers[0],
    project: mockProjects[0],
    storyPoints: 8,
    createdAt: '2024-07-20T14:00:00Z',
    updatedAt: '2024-08-10T10:15:00Z',
    labels: ['frontend', 'wordpress', 'UI/UX', 'animations'],
    comments: [
       {
        id: '3',
        author: mockUsers[0],
        body: 'Improved the website’s structure and navigation to increase user accessibility and engagement',
        createdAt: '2024-08-20T09:45:00Z',
        updatedAt: '2024-08-20T09:45:00Z'
      },
      {
        id: '4',
        author: mockUsers[0],
        body: 'Worked alongside designers and content teams to maintain brand consistency and smooth user interactions.',
        createdAt: '2024-08-20T09:45:00Z',
        updatedAt: '2024-08-20T09:45:00Z'
      }
    ]
  },
  {
    id: '5',
    key: 'HYDRO-4',
    summary: 'Decentralized File Transfer Project',
    description: 'Implementation of decentralized file transfer system with a functional spec on secure, distributed, and peer-to-peer data sharing',
    type: 'story',
    priority: 'high',
    status: 'to-do',
    assignee: mockUsers[0],
    reporter: mockUsers[0],
    project: mockProjects[0],
    storyPoints: 13,
    createdAt: '2025-09-10T16:00:00Z',
    updatedAt: '2025-09-22T11:30:00Z',
    labels: ['authentication', 'file-transfer', 'decentralized'],
    comments: [
 
    ]
  },
   {
    id: '19',
    key: 'HYDRO-4',
    summary: 'Actively Interviewing For Job Switch',
    description: 'Actively interviewing for new job opportunities to advance my career as fullstack developer/React developer',
    type: 'story',
    priority: 'high',
    status: 'in-progress',
    assignee: mockUsers[0],
    reporter: mockUsers[0],
    project: mockProjects[0],
    storyPoints: 13,
    createdAt: '2024-08-10T16:00:00Z',
    updatedAt: '2024-08-22T11:30:00Z',
    labels: ['developer'],
    comments: [
 
    ]
  },
  {
    id: '4',
    key: 'HYDRO-4',
    summary: 'Multi-Chain Crypto & Fiat Payment Infrastructure',
    description: 'Integrated MoonPay and developed methods for the onramp functionality as a crypto payment gateway',
    type: 'story',
    priority: 'high',
    status: 'done',
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
        body: 'Designed and implemented seamless PayPal payment processor via webhook and frontend SDK..',
        createdAt: '2024-08-20T09:45:00Z',
        updatedAt: '2024-08-20T09:45:00Z'
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
    description: 'Created portfolio website using React(including three.js and typescript) containing interactive 3d animations. Kept the site simple but interactive to showcase simplicity with design.',
    type: 'story',
    priority: 'medium',
    status: 'done',
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
        body: 'A website to give some insight who i am and how i work.',
        createdAt: '2024-08-22T10:30:00Z',
        updatedAt: '2024-08-22T10:30:00Z'
      }
    ]
  },
  {
    id: '8',
    key: 'AI-1',
    summary: 'AI Image Theme  Conversion Tool',
    description: 'Develop AI-powered tool for converting  images themes to different styles',
    type: 'epic',
    priority: 'medium',
    status: 'in-progress',
    assignee: undefined,
    reporter: mockUsers[0],
    project: mockProjects[4],
    storyPoints: 21,
    createdAt: '2024-08-20T12:00:00Z',
    updatedAt: '2024-08-20T12:00:00Z',
    labels: ['ai', 'machine-learning', 'design-to-code', 'automation'],
    comments: []
  },
  // Project-based issues for Sprint 2
  {
    id: '9',
    key: 'JIRA-1',
    summary: 'JiraCloneUI Development',
    description: 'Frontend repository for this project - React-based Jira clone with modern UI components',
    type: 'story',
    priority: 'high',
    status: 'done',
    assignee: mockUsers[0],
    reporter: mockUsers[0],
    project: mockProjects[0],
    storyPoints: 13,
    createdAt: '2024-08-01T10:00:00Z',
    updatedAt: '2024-08-25T14:30:00Z',
    labels: ['react', 'typescript', 'frontend', 'jira-clone'],
    comments: []
  },
  {
    id: '9',
    key: 'JIRA-2',
    summary: 'JiraCloneUI Development Stage 2',
    description: 'BBackend repository for this project - Setting up live updates and database integration',
    type: 'story',
    priority: 'high',
    status: 'to-do',
    assignee: mockUsers[0],
    reporter: mockUsers[0],
    project: mockProjects[0],
    storyPoints: 13,
    createdAt: '2024-08-01T10:00:00Z',
    updatedAt: '2024-08-25T14:30:00Z',
    labels: ['react', 'typescript', 'frontend', 'jira-clone'],
    comments: []
  },
  {
    id: '10',
    key: 'PORT-2',
    summary: 'Portfolio Website Development',
    description: 'Portfolio website for showcasing projects with modern design and responsive layout',
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
    comments: []
  },
 
  {
    id: '12',
    key: 'VID-1',
    summary: 'Video to WebPage ',
    description: 'Converting a video for an Interview project to a 1-1 webpage with interactive elements and responsive design',
    type: 'story',
    priority: 'medium',
    status: 'done',
    assignee: undefined,
    reporter: mockUsers[0],
    project: mockProjects[3],
    storyPoints: 13,
    createdAt: '2024-08-20T12:00:00Z',
    updatedAt: '2024-08-20T12:00:00Z',
    labels: ['figma', 'conversion', 'webpage', 'UI/UX','react'],
    comments: []
  },
  {
    id: '13',
    key: 'CYBER-1',
    summary: 'Cybersecurity Certificate (tryhackme)',
    description: 'Tools and skills implementation  - tryhackme rooms and projects',
    type: 'story',
    priority: 'medium',
    status: 'in-progress',
    assignee: mockUsers[0],
    reporter: mockUsers[0],
    project: mockProjects[4],
    storyPoints: 8,
    createdAt: '2024-08-01T09:00:00Z',
    updatedAt: '2024-08-25T16:30:00Z',
    labels: ['cybersecurity', 'education', 'certification', 'portfolio'],
    comments: []
  },
    {
    id: '15',
    key: 'CYBER-1',
    summary: 'Jr.Penetration Tester (tryhackme)',
    description: 'Preparation for the Jr.Penetration Tester exam ',
    type: 'story',
    priority: 'medium',
    status: 'to-do',
    assignee: mockUsers[0],
    reporter: mockUsers[0],
    project: mockProjects[4],
    storyPoints: 8,
    createdAt: '2024-08-01T09:00:00Z',
    updatedAt: '2024-08-25T16:30:00Z',
    labels: ['cybersecurity', 'education', 'certification', 'portfolio'],
    comments: []
  },
   {
    id: '14',
    key: 'CYBER-2',
    summary: 'Google Cybersecurity Certificate',
    description: 'Portfolio exercises for Google Cybersecurity Professional Certificate with practical implementations',
    type: 'story',
    priority: 'medium',
    status: 'done',
    assignee: mockUsers[0],
    reporter: mockUsers[0],
    project: mockProjects[4],
    storyPoints: 8,
    createdAt: '2025-08-01T09:00:00Z',
    updatedAt: '2025-08-25T16:30:00Z',
    labels: ['cybersecurity', 'wireshark', 'certification', 'john the ripper'],
    comments: [
       {
        id: '5',
        author: mockUsers[0],
        body: 'https://www.credly.com/badges/32b4553e-244d-433d-b608-087634ca2f96/public_url to verify the credly batch',
        createdAt: '2025-08-22T10:30:00Z',
        updatedAt: '2025-08-22T10:30:00Z'
      }
    ]
  }
];

export const mockSprints: JiraSprint[] = [
  {
    id: '1',
    name: 'Sprint 1 - Work Experience',
    state: 'active',
    startDate: '2024-07-01T00:00:00Z',
    endDate: '2025-10-01T00:00:00Z',
    goal: 'Keep track of my work experience and projects',
    issues: [mockIssues.find(issue => issue.id === '1'), mockIssues.find(issue => issue.id === '2'), mockIssues.find(issue => issue.id === '3'), mockIssues.find(issue => issue.id === '4'), mockIssues.find(issue => issue.id === '5')].filter((issue): issue is JiraIssue => issue !== undefined)
  },
   {
    id: '2',
    name: 'Sprint 2 - Open Source/Personal  Projects',
    state: 'active',
    startDate: '2024-09-01T00:00:00Z',
    endDate: 'Current',
    goal: 'Connect all my projects and create a clear system to track personal and professional progress going forward.',
    issues: [mockIssues.find(issue => issue.id === '6'), mockIssues.find(issue => issue.id === '7'), mockIssues.find(issue => issue.id === '8'), mockIssues.find(issue => issue.id === '9'), mockIssues.find(issue => issue.id === '10'), mockIssues.find(issue => issue.id === '12')].filter((issue): issue is JiraIssue => issue !== undefined)
  },
  {
    id: '3',
    name: 'Sprint 3 - Cybersecurity Projects',
    state: 'active',
    startDate: '2024-09-01T00:00:00Z',
    endDate: 'Current',
    goal: 'Focus on cybersecurity projects and Skill development',
    issues: [mockIssues.find(issue => issue.id === '13'), mockIssues.find(issue => issue.id === '14'), mockIssues.find(issue => issue.id === '15')].filter((issue): issue is JiraIssue => issue !== undefined)
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