import { useState } from 'react';
import JiraHeader from '@/components/JiraHeader';
import JiraSidebar from '@/components/JiraSidebar';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { GitBranch, GitMerge, GitPullRequest, Plus, Search, Filter, ExternalLink } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { mockProjects, mockUsers } from '@/data/mockData';

interface Repository {
  id: string;
  name: string;
  description: string;
  branches: number;
  pullRequests: number;
  lastCommit: string;
  githubUrl: string;
}

interface PullRequest {
  id: string;
  title: string;
  number: number;
  author: typeof mockUsers[0];
  status: string;
  branch: string;
  targetBranch: string;
  createdAt: string;
  comments: number;
  approvals: number;
  githubUrl: string;
}

const initialRepositories: Repository[] = [
  {
    id: '1',
    name: 'frontend',
    description: 'Main frontend application repository',
    branches: 12,
    pullRequests: 3,
    lastCommit: '2 hours ago',
    githubUrl: 'https://github.com/example/frontend',
  },
  {
    id: '2',
    name: 'backend-api',
    description: 'RESTful API backend service',
    branches: 8,
    pullRequests: 1,
    lastCommit: '5 hours ago',
    githubUrl: 'https://github.com/example/backend-api',
  },
];

const initialPullRequests: PullRequest[] = [
  {
    id: '1',
    title: 'Add user authentication flow',
    number: 42,
    author: mockUsers[1],
    status: 'open',
    branch: 'feature/auth-flow',
    targetBranch: 'main',
    createdAt: '2 days ago',
    comments: 5,
    approvals: 2,
    githubUrl: 'https://github.com/example/frontend/pull/42',
  },
  {
    id: '2',
    title: 'Fix database connection timeout',
    number: 41,
    author: mockUsers[3],
    status: 'open',
    branch: 'fix/db-timeout',
    targetBranch: 'main',
    createdAt: '1 day ago',
    comments: 3,
    approvals: 1,
    githubUrl: 'https://github.com/example/backend-api/pull/41',
  },
];

export default function Code() {
  const currentProject = mockProjects[0];
  const [repositories, setRepositories] = useState<Repository[]>(initialRepositories);
  const [searchQuery, setSearchQuery] = useState('');
  const [showAddRepo, setShowAddRepo] = useState(false);
  const [newRepo, setNewRepo] = useState({
    name: '',
    description: '',
    githubUrl: ''
  });

  const filteredRepos = repositories.filter(repo =>
    repo.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    repo.description.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleAddRepository = () => {
    const repo: Repository = {
      id: Date.now().toString(),
      name: newRepo.name,
      description: newRepo.description,
      branches: 1,
      pullRequests: 0,
      lastCommit: 'Just now',
      githubUrl: newRepo.githubUrl || `https://github.com/example/${newRepo.name}`,
    };

    setRepositories([...repositories, repo]);
    setShowAddRepo(false);
    setNewRepo({ name: '', description: '', githubUrl: '' });
  };

  const handleViewRepo = (repo: Repository) => {
    window.open(repo.githubUrl, '_blank');
  };

  const handleReviewPR = (pr: PullRequest) => {
    window.open(pr.githubUrl, '_blank');
  };

  return (
    <div className="h-screen bg-jira-gray-50 flex flex-col overflow-hidden">
      <JiraHeader />
      
      <div className="flex flex-1 overflow-hidden">
        <JiraSidebar />
        
        <main className="flex-1 flex flex-col overflow-auto">
          <div className="border-b border-jira-gray-200 bg-white sticky top-0 z-10">
            <div className="px-6 py-4">
              <div className="flex items-center justify-between">
                <div>
                  <h1 className="text-2xl font-semibold text-jira-gray-900">Code</h1>
                  <p className="text-sm text-jira-gray-500 mt-1">{currentProject.name}</p>
                </div>
                <Button 
                  className="bg-jira-blue hover:bg-jira-blue-dark text-white"
                  onClick={() => setShowAddRepo(true)}
                  data-testid="button-add-repository"
                >
                  <Plus className="h-4 w-4 mr-2" />
                  Add repository
                </Button>
              </div>
            </div>
          </div>

          <div className="flex-1 px-6 py-6">
            <div className="mb-8">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-lg font-medium text-jira-gray-900">Repositories</h2>
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-jira-gray-400 h-4 w-4" />
                  <Input
                    type="search"
                    placeholder="Search repositories"
                    className="pl-10 w-64 h-9 bg-white border-jira-gray-200"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    data-testid="input-search-repos"
                  />
                </div>
              </div>
              
              <div className="space-y-3">
                {filteredRepos.map(repo => (
                  <div key={repo.id} className="bg-white border border-jira-gray-200 rounded-lg p-4 hover:border-jira-blue transition-colors">
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <div className="flex items-center gap-2">
                          <GitBranch className="h-4 w-4 text-jira-gray-500" />
                          <h3 className="font-medium text-jira-gray-900">{repo.name}</h3>
                        </div>
                        <p className="text-sm text-jira-gray-500 mt-1">{repo.description}</p>
                        <div className="flex items-center gap-6 mt-3 text-sm text-jira-gray-500">
                          <span className="flex items-center gap-1">
                            <GitBranch className="h-3 w-3" />
                            {repo.branches} branches
                          </span>
                          <span className="flex items-center gap-1">
                            <GitPullRequest className="h-3 w-3" />
                            {repo.pullRequests} pull requests
                          </span>
                          <span>Last commit {repo.lastCommit}</span>
                        </div>
                      </div>
                      <Button 
                        variant="outline" 
                        size="sm"
                        onClick={() => handleViewRepo(repo)}
                        data-testid={`button-view-repo-${repo.id}`}
                      >
                        <ExternalLink className="h-4 w-4 mr-1" />
                        View repository
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div>
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-lg font-medium text-jira-gray-900">Pull Requests</h2>
            
              </div>
              
              <div className="space-y-3">
                {initialPullRequests.map(pr => (
                  <div key={pr.id} className="bg-white border border-jira-gray-200 rounded-lg p-4 hover:border-jira-blue transition-colors">
                    <div className="flex items-start gap-3">
                      <GitPullRequest className="h-5 w-5 text-green-500 mt-0.5" />
                      <div className="flex-1">
                        <div className="flex items-center gap-2">
                          <h3 className="font-medium text-jira-gray-900">{pr.title}</h3>
                          <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200">#{pr.number}</Badge>
                        </div>
                        <div className="flex items-center gap-2 mt-2 text-sm text-jira-gray-500">
                          <Avatar className="h-5 w-5">
                            <AvatarImage src={pr.author.avatarUrl} />
                            <AvatarFallback className="text-xs bg-jira-blue text-white">{pr.author.initials}</AvatarFallback>
                          </Avatar>
                          <span>{pr.author.name}</span>
                          <span>wants to merge</span>
                          <code className="px-2 py-0.5 bg-jira-gray-100 rounded text-xs">{pr.branch}</code>
                          <GitMerge className="h-3 w-3" />
                          <code className="px-2 py-0.5 bg-jira-gray-100 rounded text-xs">{pr.targetBranch}</code>
                        </div>
                        <div className="flex items-center gap-4 mt-3 text-sm text-jira-gray-500">
                          <span>{pr.createdAt}</span>
                          <span>{pr.comments} comments</span>
                          <span className="flex items-center gap-1 text-green-600">
                            ✓ {pr.approvals} approvals
                          </span>
                        </div>
                      </div>
                      <Button 
                        variant="outline" 
                        size="sm"
                        onClick={() => handleReviewPR(pr)}
                        data-testid={`button-review-pr-${pr.id}`}
                      >
                        <ExternalLink className="h-4 w-4 mr-1" />
                        Review
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </main>
      </div>

      {/* Add Repository Dialog */}
      <Dialog open={showAddRepo} onOpenChange={setShowAddRepo}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Add Repository</DialogTitle>
            <DialogDescription>
              Connect a GitHub repository to your project
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4 py-4">
            <div className="space-y-2">
              <Label htmlFor="repo-name">Repository Name *</Label>
              <Input
                id="repo-name"
                placeholder="e.g., my-awesome-repo"
                value={newRepo.name}
                onChange={(e) => setNewRepo({ ...newRepo, name: e.target.value })}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="repo-description">Description</Label>
              <Input
                id="repo-description"
                placeholder="Brief description of the repository"
                value={newRepo.description}
                onChange={(e) => setNewRepo({ ...newRepo, description: e.target.value })}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="repo-url">GitHub URL</Label>
              <Input
                id="repo-url"
                placeholder="https://github.com/username/repo"
                value={newRepo.githubUrl}
                onChange={(e) => setNewRepo({ ...newRepo, githubUrl: e.target.value })}
              />
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setShowAddRepo(false)}>Cancel</Button>
            <Button onClick={handleAddRepository}>Add Repository</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
