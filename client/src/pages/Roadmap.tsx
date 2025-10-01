import { useState } from 'react';
import JiraHeader from '@/components/JiraHeader';
import JiraSidebar from '@/components/JiraSidebar';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Plus, Calendar, ChevronLeft, ChevronRight } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { mockProjects, mockIssues } from '@/data/mockData';

interface Epic {
  id: string;
  key: string;
  summary: string;
  startDate: string;
  endDate: string;
  progress: number;
  status: string;
  issues: any[];
}

const quarters2024 = [
  { id: 'Q1-2024', label: 'Q1 2024', months: ['Jan', 'Feb', 'Mar'], year: 2024 },
  { id: 'Q2-2024', label: 'Q2 2024', months: ['Apr', 'May', 'Jun'], year: 2024 },
  { id: 'Q3-2024', label: 'Q3 2024', months: ['Jul', 'Aug', 'Sep'], year: 2024 },
  { id: 'Q4-2024', label: 'Q4 2024', months: ['Oct', 'Nov', 'Dec'], year: 2024 },
];

const quarters2025 = [
  { id: 'Q1-2025', label: 'Q1 2025', months: ['Jan', 'Feb', 'Mar'], year: 2025 },
  { id: 'Q2-2025', label: 'Q2 2025', months: ['Apr', 'May', 'Jun'], year: 2025 },
  { id: 'Q3-2025', label: 'Q3 2025', months: ['Jul', 'Aug', 'Sep'], year: 2025 },
  { id: 'Q4-2025', label: 'Q4 2025', months: ['Oct', 'Nov', 'Dec'], year: 2025 },
];

const quarters2026 = [
  { id: 'Q1-2026', label: 'Q1 2026', months: ['Jan', 'Feb', 'Mar'], year: 2026 },
  { id: 'Q2-2026', label: 'Q2 2026', months: ['Apr', 'May', 'Jun'], year: 2026 },
  { id: 'Q3-2026', label: 'Q3 2026', months: ['Jul', 'Aug', 'Sep'], year: 2026 },
  { id: 'Q4-2026', label: 'Q4 2026', months: ['Oct', 'Nov', 'Dec'], year: 2026 },
];

const initialEpics: Epic[] = [
  {
    id: '1',
    key: 'CYBER-FOUNDATION',
    summary: 'Cybersecurity Foundation & Certifications',
    startDate: '2024-01-01',
    endDate: '2024-06-30',
    progress: 100,
    status: 'completed',
    issues: [],
  },
  {
    id: '2',
    key: 'FULLSTACK-MASTERY',
    summary: 'Full-Stack Development Mastery',
    startDate: '2024-03-01',
    endDate: '2024-08-31',
    progress: 100,
    status: 'completed',
    issues: [],
  },
  {
    id: '3',
    key: 'HYDRO-ADTECH',
    summary: 'Hydro Online AdTech Platform Development',
    startDate: '2024-08-01',
    endDate: '2024-12-31',
    progress: 75,
    status: 'in-progress',
    issues: [],
  },
  {
    id: '4',
    key: 'BLOCKCHAIN-VOTING',
    summary: 'Blockchain Voting Application',
    startDate: '2024-06-01',
    endDate: '2024-09-30',
    progress: 100,
    status: 'completed',
    issues: [],
  },
  {
    id: '5',
    key: 'ADVANCED-SECURITY',
    summary: 'Advanced Security Certifications (OSCP)',
    startDate: '2025-01-01',
    endDate: '2025-06-30',
    progress: 0,
    status: 'planned',
    issues: [],
  },
  {
    id: '6',
    key: 'SECURITY-CONSULTING',
    summary: 'Cybersecurity Consulting Business Launch',
    startDate: '2025-03-01',
    endDate: '2025-12-31',
    progress: 0,
    status: 'planned',
    issues: [],
  },
  {
    id: '7',
    key: 'AI-SECURITY',
    summary: 'AI & Machine Learning Security Research',
    startDate: '2025-07-01',
    endDate: '2026-06-30',
    progress: 0,
    status: 'planned',
    issues: [],
  },
  {
    id: '8',
    key: 'SECURITY-LEADERSHIP',
    summary: 'Cybersecurity Leadership & Team Management',
    startDate: '2026-01-01',
    endDate: '2026-12-31',
    progress: 0,
    status: 'planned',
    issues: [],
  },
];

export default function Roadmap() {
  const currentProject = mockProjects[0];
  const [selectedYear, setSelectedYear] = useState(2024);
  const [epics, setEpics] = useState<Epic[]>(initialEpics);
  const [showCreateEpic, setShowCreateEpic] = useState(false);
  const [newEpic, setNewEpic] = useState({
    summary: '',
    description: '',
    startDate: '',
    endDate: ''
  });

  const getQuarters = (year: number) => {
    switch(year) {
      case 2024: return quarters2024;
      case 2025: return quarters2025;
      case 2026: return quarters2026;
      default: return quarters2024;
    }
  };

  const quarters = getQuarters(selectedYear);

  const getEpicPosition = (startDate: string, endDate: string) => {
    const start = new Date(startDate);
    const end = new Date(endDate);
    const yearStart = new Date(`${selectedYear}-01-01`);
    
    const startMonth = (start.getFullYear() - selectedYear) * 12 + start.getMonth();
    const endMonth = (end.getFullYear() - selectedYear) * 12 + end.getMonth();
    const duration = endMonth - startMonth + 1;
    
    return {
      gridColumn: `${startMonth + 1} / span ${Math.max(1, duration)}`,
    };
  };

  const handlePreviousYear = () => {
    if (selectedYear > 2024) {
      setSelectedYear(selectedYear - 1);
    }
  };

  const handleNextYear = () => {
    if (selectedYear < 2026) {
      setSelectedYear(selectedYear + 1);
    }
  };

  const handleCreateEpic = () => {
    const epic: Epic = {
      id: Date.now().toString(),
      key: `${currentProject.key}-${100 + epics.length}`,
      summary: newEpic.summary,
      startDate: newEpic.startDate,
      endDate: newEpic.endDate,
      progress: 0,
      status: 'planned',
      issues: []
    };

    setEpics([...epics, epic]);
    setShowCreateEpic(false);
    setNewEpic({ summary: '', description: '', startDate: '', endDate: '' });
  };

  const filteredEpics = epics.filter(epic => {
    const epicYear = new Date(epic.startDate).getFullYear();
    return epicYear === selectedYear;
  });

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
                  <h1 className="text-2xl font-semibold text-jira-gray-900">Career Roadmap</h1>
                  <p className="text-sm text-jira-gray-500 mt-1">Aryavhir's professional journey and future milestones in cybersecurity and development</p>
                </div>
                <div className="flex items-center gap-2">
                  <Button variant="outline" size="sm">
                    <Calendar className="h-4 w-4 mr-2" />
                    {selectedYear}
                  </Button>
                  <Button 
                    className="bg-jira-blue hover:bg-jira-blue-dark text-white"
                    onClick={() => setShowCreateEpic(true)}
                    data-testid="button-create-epic"
                  >
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
                  <Button 
                    variant="ghost" 
                    size="icon" 
                    className="h-8 w-8"
                    onClick={handlePreviousYear}
                    disabled={selectedYear <= 2024}
                  >
                    <ChevronLeft className="h-4 w-4" />
                  </Button>
                  <h2 className="text-lg font-medium text-jira-gray-900">{selectedYear}</h2>
                  <Button 
                    variant="ghost" 
                    size="icon" 
                    className="h-8 w-8"
                    onClick={handleNextYear}
                    disabled={selectedYear >= 2026}
                  >
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
                  {filteredEpics.map(epic => (
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

      {/* Create Epic Dialog */}
      <Dialog open={showCreateEpic} onOpenChange={setShowCreateEpic}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle>Create Epic</DialogTitle>
            <DialogDescription>
              Create a new epic for your roadmap
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4 py-4">
            <div className="space-y-2">
              <Label htmlFor="epic-summary">Epic Summary *</Label>
              <Input
                id="epic-summary"
                placeholder="e.g., Payment Integration"
                value={newEpic.summary}
                onChange={(e) => setNewEpic({ ...newEpic, summary: e.target.value })}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="epic-description">Description</Label>
              <Textarea
                id="epic-description"
                placeholder="Describe the epic..."
                rows={3}
                value={newEpic.description}
                onChange={(e) => setNewEpic({ ...newEpic, description: e.target.value })}
              />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="start-date">Start Date *</Label>
                <Input
                  id="start-date"
                  type="date"
                  value={newEpic.startDate}
                  onChange={(e) => setNewEpic({ ...newEpic, startDate: e.target.value })}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="end-date">End Date *</Label>
                <Input
                  id="end-date"
                  type="date"
                  value={newEpic.endDate}
                  onChange={(e) => setNewEpic({ ...newEpic, endDate: e.target.value })}
                />
              </div>
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setShowCreateEpic(false)}>Cancel</Button>
            <Button onClick={handleCreateEpic}>Create Epic</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
