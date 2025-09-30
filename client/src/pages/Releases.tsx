import JiraHeader from '@/components/JiraHeader';
import JiraSidebar from '@/components/JiraSidebar';
import { Button } from '@/components/ui/button';
import { Plus, Calendar, Package, CheckCircle, AlertCircle, Clock } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { mockProjects, mockUsers } from '@/data/mockData';
import { Progress } from '@/components/ui/progress';

const mockReleases = [
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
                <Button className="bg-jira-blue hover:bg-jira-blue-dark text-white">
                  <Plus className="h-4 w-4 mr-2" />
                  Create release
                </Button>
              </div>
            </div>
          </div>

          <div className="flex-1 px-6 py-6">
            <div className="grid gap-6">
              {mockReleases.map(release => (
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
                      <Button variant="outline" size="sm">View details</Button>
                      <Button variant="outline" size="sm">View issues</Button>
                      {release.status === 'released' && (
                        <Button variant="outline" size="sm">Release notes</Button>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}
