import JiraHeader from '@/components/JiraHeader';
import JiraSidebar from '@/components/JiraSidebar';
import { Button } from '@/components/ui/button';
import { Plus, Calendar, ChevronLeft, ChevronRight } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { mockProjects, mockIssues } from '@/data/mockData';

const quarters = [
  { id: 'Q1', label: 'Q1 2024', months: ['Jan', 'Feb', 'Mar'] },
  { id: 'Q2', label: 'Q2 2024', months: ['Apr', 'May', 'Jun'] },
  { id: 'Q3', label: 'Q3 2024', months: ['Jul', 'Aug', 'Sep'] },
  { id: 'Q4', label: 'Q4 2024', months: ['Oct', 'Nov', 'Dec'] },
];

const mockEpics = [
  {
    id: '1',
    key: 'PROJ-100',
    summary: 'User Authentication System',
    startDate: '2024-01-01',
    endDate: '2024-03-31',
    progress: 75,
    status: 'in-progress',
    issues: mockIssues.slice(0, 3),
  },
  {
    id: '2',
    key: 'PROJ-101',
    summary: 'Dashboard Redesign',
    startDate: '2024-02-15',
    endDate: '2024-05-30',
    progress: 30,
    status: 'in-progress',
    issues: mockIssues.slice(1, 3),
  },
  {
    id: '3',
    key: 'PROJ-102',
    summary: 'API Performance Optimization',
    startDate: '2024-04-01',
    endDate: '2024-06-30',
    progress: 0,
    status: 'planned',
    issues: mockIssues.slice(3, 5),
  },
];

export default function Roadmap() {
  const currentProject = mockProjects[0];

  const getEpicPosition = (startDate: string, endDate: string) => {
    const start = new Date(startDate);
    const end = new Date(endDate);
    const yearStart = new Date('2024-01-01');
    
    const startMonth = (start.getFullYear() - 2024) * 12 + start.getMonth();
    const endMonth = (end.getFullYear() - 2024) * 12 + end.getMonth();
    const duration = endMonth - startMonth + 1;
    
    return {
      gridColumn: `${startMonth + 1} / span ${duration}`,
    };
  };

  return (
    <div className="h-screen bg-white flex flex-col overflow-hidden">
      <JiraHeader />
      
      <div className="flex flex-1 overflow-hidden">
        <JiraSidebar />
        
        <main className="flex-1 flex flex-col overflow-auto">
          <div className="border-b border-jira-gray-200 bg-white sticky top-0 z-10">
            <div className="px-6 py-4">
              <div className="flex items-center justify-between">
                <div>
                  <h1 className="text-2xl font-semibold text-jira-gray-900">Roadmap</h1>
                  <p className="text-sm text-jira-gray-500 mt-1">{currentProject.name}</p>
                </div>
                <div className="flex items-center gap-2">
                  <Button variant="outline" size="sm">
                    <Calendar className="h-4 w-4 mr-2" />
                    2024
                  </Button>
                  <Button className="bg-jira-blue hover:bg-jira-blue-dark text-white">
                    <Plus className="h-4 w-4 mr-2" />
                    Create epic
                  </Button>
                </div>
              </div>
            </div>
          </div>

          <div className="flex-1 px-6 py-6 overflow-auto">
            <div className="mb-6">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-4">
                  <Button variant="ghost" size="icon" className="h-8 w-8">
                    <ChevronLeft className="h-4 w-4" />
                  </Button>
                  <h2 className="text-lg font-medium text-jira-gray-900">2024</h2>
                  <Button variant="ghost" size="icon" className="h-8 w-8">
                    <ChevronRight className="h-4 w-4" />
                  </Button>
                </div>
              </div>

              <div className="relative">
                <div className="grid grid-cols-12 gap-0 border-t border-l border-jira-gray-200">
                  {quarters.map(quarter => (
                    <div key={quarter.id} className="col-span-3 border-r border-jira-gray-200">
                      <div className="bg-jira-gray-50 border-b border-jira-gray-200 p-2 text-center">
                        <span className="text-sm font-medium text-jira-gray-700">{quarter.label}</span>
                      </div>
                      <div className="grid grid-cols-3">
                        {quarter.months.map(month => (
                          <div key={month} className="border-r border-b border-jira-gray-200 p-2 text-center last:border-r-0">
                            <span className="text-xs text-jira-gray-500">{month}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>

                <div className="mt-6 space-y-4">
                  {mockEpics.map(epic => (
                    <div key={epic.id} className="relative">
                      <div className="grid grid-cols-12 gap-0 relative h-20">
                        <div 
                          className="absolute h-16 bg-jira-blue rounded-lg p-3 cursor-pointer hover:bg-jira-blue-dark transition-colors z-10"
                          style={getEpicPosition(epic.startDate, epic.endDate)}
                        >
                          <div className="flex items-center justify-between mb-1">
                            <div className="flex items-center gap-2">
                              <span className="text-xs font-medium text-white">{epic.key}</span>
                              <Badge variant="outline" className="bg-white/20 text-white border-white/40 text-xs">
                                {epic.issues.length} issues
                              </Badge>
                            </div>
                            <span className="text-xs text-white">{epic.progress}%</span>
                          </div>
                          <p className="text-sm font-medium text-white truncate">{epic.summary}</p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <div className="mt-8 border-t border-jira-gray-200 pt-6">
              <h3 className="text-lg font-medium text-jira-gray-900 mb-4">Timeline Legend</h3>
              <div className="flex items-center gap-6">
                <div className="flex items-center gap-2">
                  <div className="h-4 w-12 bg-jira-blue rounded"></div>
                  <span className="text-sm text-jira-gray-700">In Progress</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="h-4 w-12 bg-jira-gray-300 rounded"></div>
                  <span className="text-sm text-jira-gray-700">Planned</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="h-4 w-12 bg-green-500 rounded"></div>
                  <span className="text-sm text-jira-gray-700">Completed</span>
                </div>
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}
