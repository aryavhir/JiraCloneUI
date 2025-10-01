import { useState } from 'react';
import JiraHeader from '@/components/JiraHeader';
import JiraSidebar from '@/components/JiraSidebar';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Plus, Calendar, Package, CheckCircle, AlertCircle, Clock, X } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { mockProjects, mockUsers } from '@/data/mockData';
import { Progress } from '@/components/ui/progress';

interface Release {
  id: string;
  version: string;
  name: string;
  status: 'planned' | 'in-progress' | 'released';
  releaseDate: string;
  description: string;
  manager: typeof mockUsers[0];
  issues: {
    total: number;
    completed: number;
    inProgress: number;
    todo: number;
  };
  progress: number;
}

const initialReleases: Release[] = [
  {
    id: '1',
    version: 'v2.0.0',
    name: 'Major Feature Release',
    status: 'in-progress',
    releaseDate: '2024-02-15',
    description: 'Major update with new authentication system and performance improvements',
    manager: mockUsers[0],
    issues: {
      total: 45,
      completed: 32,
      inProgress: 8,
      todo: 5,
    },
    progress: 71,
  },
  {
    id: '2',
    version: 'v1.9.2',
    name: 'Bug Fix Release',
    status: 'released',
    releaseDate: '2024-01-28',
    description: 'Critical bug fixes and stability improvements',
    manager: mockUsers[1],
    issues: {
      total: 12,
      completed: 12,
      inProgress: 0,
      todo: 0,
    },
    progress: 100,
  },
  {
    id: '3',
    version: 'v2.1.0',
    name: 'Q2 Feature Release',
    status: 'planned',
    releaseDate: '2024-04-01',
    description: 'Planned features for Q2 2024 including dashboard redesign',
    manager: mockUsers[2],
    issues: {
      total: 28,
      completed: 0,
      inProgress: 0,
      todo: 28,
    },
    progress: 0,
  },
];

const getStatusIcon = (status: string) => {
  switch (status) {
    case 'released':
      return <CheckCircle className="h-5 w-5 text-green-500" />;
    case 'in-progress':
      return <Clock className="h-5 w-5 text-blue-500" />;
    case 'planned':
      return <AlertCircle className="h-5 w-5 text-jira-gray-400" />;
    default:
      return <Package className="h-5 w-5 text-jira-gray-400" />;
  }
};

const getStatusBadge = (status: string) => {
  switch (status) {
    case 'released':
      return <Badge className="bg-green-100 text-green-700 border-green-200">Released</Badge>;
    case 'in-progress':
      return <Badge className="bg-blue-100 text-blue-700 border-blue-200">In Progress</Badge>;
    case 'planned':
      return <Badge variant="outline" className="text-jira-gray-600">Planned</Badge>;
    default:
      return <Badge variant="outline">{status}</Badge>;
  }
};

export default function Releases() {
  const currentProject = mockProjects[0];
  const [releases, setReleases] = useState<Release[]>(initialReleases);
  const [showCreateDialog, setShowCreateDialog] = useState(false);
  const [showDetailsDialog, setShowDetailsDialog] = useState(false);
  const [selectedRelease, setSelectedRelease] = useState<Release | null>(null);
  
  const [newRelease, setNewRelease] = useState({
    version: '',
    name: '',
    description: '',
    releaseDate: '',
    managerId: '',
    status: 'planned' as const
  });

  const handleCreateRelease = () => {
    const manager = mockUsers.find(u => u.id === newRelease.managerId) || mockUsers[0];
    
    const release: Release = {
      id: Date.now().toString(),
      version: newRelease.version,
      name: newRelease.name,
      description: newRelease.description,
      releaseDate: newRelease.releaseDate,
      status: newRelease.status,
      manager: manager,
      issues: {
        total: 0,
        completed: 0,
        inProgress: 0,
        todo: 0,
      },
      progress: 0,
    };

    setReleases([release, ...releases]);
    setShowCreateDialog(false);
    setNewRelease({
      version: '',
      name: '',
      description: '',
      releaseDate: '',
      managerId: '',
      status: 'planned'
    });
  };

  const handleViewDetails = (release: Release) => {
    setSelectedRelease(release);
    setShowDetailsDialog(true);
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
                  <h1 className="text-2xl font-semibold text-jira-gray-900">Releases</h1>
                  <p className="text-sm text-jira-gray-500 mt-1">{currentProject.name}</p>
                </div>
                <Button 
                  className="bg-jira-blue hover:bg-jira-blue-dark text-white"
                  onClick={() => setShowCreateDialog(true)}
                  data-testid="button-create-release"
                >
                  <Plus className="h-4 w-4 mr-2" />
                  Create release
                </Button>
              </div>
            </div>
          </div>

          <div className="flex-1 px-6 py-6">
            <div className="grid gap-6">
              {releases.map(release => (
                <div key={release.id} className="bg-white border border-jira-gray-200 rounded-lg hover:border-jira-blue transition-colors">
                  <div className="p-6">
                    <div className="flex items-start justify-between mb-4">
                      <div className="flex items-start gap-3 flex-1">
                        {getStatusIcon(release.status)}
                        <div className="flex-1">
                          <div className="flex items-center gap-3 mb-1">
                            <h3 className="text-lg font-semibold text-jira-gray-900">{release.version}</h3>
                            {getStatusBadge(release.status)}
                          </div>
                          <p className="text-base text-jira-gray-900 mb-2">{release.name}</p>
                          <p className="text-sm text-jira-gray-500">{release.description}</p>
                        </div>
                      </div>
                    </div>

                    <div className="grid grid-cols-4 gap-4 mb-4 pt-4 border-t border-jira-gray-200">
                      <div>
                        <p className="text-xs text-jira-gray-500 mb-1">Release Date</p>
                        <div className="flex items-center gap-2">
                          <Calendar className="h-4 w-4 text-jira-gray-400" />
                          <span className="text-sm text-jira-gray-900">{new Date(release.releaseDate).toLocaleDateString()}</span>
                        </div>
                      </div>
                      <div>
                        <p className="text-xs text-jira-gray-500 mb-1">Release Manager</p>
                        <div className="flex items-center gap-2">
                          <Avatar className="h-5 w-5">
                            <AvatarImage src={release.manager.avatarUrl} />
                            <AvatarFallback className="text-xs bg-jira-blue text-white">{release.manager.initials}</AvatarFallback>
                          </Avatar>
                          <span className="text-sm text-jira-gray-900">{release.manager.name}</span>
                        </div>
                      </div>
                      <div>
                        <p className="text-xs text-jira-gray-500 mb-1">Issues</p>
                        <div className="text-sm text-jira-gray-900">
                          {release.issues.completed}/{release.issues.total} completed
                        </div>
                      </div>
                      <div>
                        <p className="text-xs text-jira-gray-500 mb-1">Progress</p>
                        <div className="text-sm text-jira-gray-900">{release.progress}%</div>
                      </div>
                    </div>

                    <div className="mb-3">
                      <Progress value={release.progress} className="h-2" />
                    </div>

                    <div className="flex items-center gap-6 text-sm">
                      <div className="flex items-center gap-2">
                        <div className="h-3 w-3 bg-green-500 rounded-full"></div>
                        <span className="text-jira-gray-700">{release.issues.completed} Done</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <div className="h-3 w-3 bg-blue-500 rounded-full"></div>
                        <span className="text-jira-gray-700">{release.issues.inProgress} In Progress</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <div className="h-3 w-3 bg-jira-gray-300 rounded-full"></div>
                        <span className="text-jira-gray-700">{release.issues.todo} To Do</span>
                      </div>
                    </div>

                    <div className="flex items-center gap-2 mt-4 pt-4 border-t border-jira-gray-200">
                      <Button 
                        variant="outline" 
                        size="sm"
                        onClick={() => handleViewDetails(release)}
                        data-testid={`button-view-details-${release.id}`}
                      >
                        View details
                      </Button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </main>
      </div>

      {/* Create Release Dialog */}
      <Dialog open={showCreateDialog} onOpenChange={setShowCreateDialog}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle>Create Release</DialogTitle>
            <DialogDescription>
              Create a new release for your project
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4 py-4">
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="version">Version *</Label>
                <Input
                  id="version"
                  placeholder="e.g., v1.0.0"
                  value={newRelease.version}
                  onChange={(e) => setNewRelease({ ...newRelease, version: e.target.value })}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="release-date">Release Date *</Label>
                <Input
                  id="release-date"
                  type="date"
                  value={newRelease.releaseDate}
                  onChange={(e) => setNewRelease({ ...newRelease, releaseDate: e.target.value })}
                />
              </div>
            </div>
            <div className="space-y-2">
              <Label htmlFor="name">Release Name *</Label>
              <Input
                id="name"
                placeholder="e.g., Major Feature Release"
                value={newRelease.name}
                onChange={(e) => setNewRelease({ ...newRelease, name: e.target.value })}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="description">Description</Label>
              <Textarea
                id="description"
                placeholder="Describe this release..."
                rows={3}
                value={newRelease.description}
                onChange={(e) => setNewRelease({ ...newRelease, description: e.target.value })}
              />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="status">Status</Label>
                <Select 
                  value={newRelease.status} 
                  onValueChange={(value: any) => setNewRelease({ ...newRelease, status: value })}
                >
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="planned">Planned</SelectItem>
                    <SelectItem value="in-progress">In Progress</SelectItem>
                    <SelectItem value="released">Released</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label htmlFor="manager">Release Manager</Label>
                <Select 
                  value={newRelease.managerId} 
                  onValueChange={(value) => setNewRelease({ ...newRelease, managerId: value })}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select manager" />
                  </SelectTrigger>
                  <SelectContent>
                    {mockUsers.map((user) => (
                      <SelectItem key={user.id} value={user.id}>
                        {user.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setShowCreateDialog(false)}>Cancel</Button>
            <Button onClick={handleCreateRelease}>Create Release</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* View Details Dialog */}
      <Dialog open={showDetailsDialog} onOpenChange={setShowDetailsDialog}>
        <DialogContent className="max-w-3xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-3">
              {selectedRelease && getStatusIcon(selectedRelease.status)}
              <span>{selectedRelease?.version} - {selectedRelease?.name}</span>
            </DialogTitle>
          </DialogHeader>
          {selectedRelease && (
            <div className="space-y-6 py-4">
              <div>
                {getStatusBadge(selectedRelease.status)}
              </div>
              
              <div>
                <h4 className="text-sm font-medium text-jira-gray-900 mb-2">Description</h4>
                <p className="text-sm text-jira-gray-700">{selectedRelease.description}</p>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <h4 className="text-sm font-medium text-jira-gray-900 mb-2">Release Date</h4>
                  <div className="flex items-center gap-2">
                    <Calendar className="h-4 w-4 text-jira-gray-400" />
                    <span className="text-sm text-jira-gray-700">
                      {new Date(selectedRelease.releaseDate).toLocaleDateString('en-US', { 
                        year: 'numeric', 
                        month: 'long', 
                        day: 'numeric' 
                      })}
                    </span>
                  </div>
                </div>
                <div>
                  <h4 className="text-sm font-medium text-jira-gray-900 mb-2">Release Manager</h4>
                  <div className="flex items-center gap-2">
                    <Avatar className="h-6 w-6">
                      <AvatarImage src={selectedRelease.manager.avatarUrl} />
                      <AvatarFallback className="text-xs bg-jira-blue text-white">
                        {selectedRelease.manager.initials}
                      </AvatarFallback>
                    </Avatar>
                    <span className="text-sm text-jira-gray-700">{selectedRelease.manager.name}</span>
                  </div>
                </div>
              </div>

              <div>
                <h4 className="text-sm font-medium text-jira-gray-900 mb-3">Progress</h4>
                <Progress value={selectedRelease.progress} className="h-3 mb-3" />
                <div className="grid grid-cols-4 gap-4 text-sm">
                  <div>
                    <p className="text-jira-gray-500">Total Issues</p>
                    <p className="text-xl font-semibold text-jira-gray-900">{selectedRelease.issues.total}</p>
                  </div>
                  <div>
                    <p className="text-jira-gray-500">Completed</p>
                    <p className="text-xl font-semibold text-green-600">{selectedRelease.issues.completed}</p>
                  </div>
                  <div>
                    <p className="text-jira-gray-500">In Progress</p>
                    <p className="text-xl font-semibold text-blue-600">{selectedRelease.issues.inProgress}</p>
                  </div>
                  <div>
                    <p className="text-jira-gray-500">To Do</p>
                    <p className="text-xl font-semibold text-jira-gray-600">{selectedRelease.issues.todo}</p>
                  </div>
                </div>
              </div>
            </div>
          )}
          <DialogFooter>
            <Button variant="outline" onClick={() => setShowDetailsDialog(false)}>Close</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
