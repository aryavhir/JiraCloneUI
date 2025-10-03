import { useState } from 'react';
import JiraHeader from '@/components/JiraHeader';
import JiraSidebar from '@/components/JiraSidebar';
import CreateIssueModal from '@/components/CreateIssueModal';
import IssueModal from '@/components/IssueModal';
import { Button } from '@/components/ui/button';
import { Plus, ChevronRight, MoreHorizontal, GripVertical } from 'lucide-react';
import { JiraIssue } from '@shared/types';
import { mockIssues, mockProjects, mockSprints, mockUsers } from '@/data/mockData';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';

export default function Backlog() {
  const [selectedIssue, setSelectedIssue] = useState<JiraIssue | null>(null);
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [backlogIssues, setBacklogIssues] = useState<JiraIssue[]>(mockIssues);
  const [expandedSprints, setExpandedSprints] = useState<Record<string, boolean>>({
    '1': true,
    backlog: true,
  });

  const currentProject = mockProjects[0];
  const activeSprint = mockSprints.find(s => s.state === 'active');
  const backlogOnlyIssues = backlogIssues.filter(
    issue => !activeSprint?.issues.some(si => si.id === issue.id)
  );

  const handleCreateIssue = () => {
    setShowCreateModal(true);
  };

  const handleIssueCreated = (newIssueData: {
    summary: string;
    description: string;
    type: string;
    priority: string;
    assignee: string;
    storyPoints?: number;
  }) => {
    const assigneeObj = mockUsers.find((u: any) => u.id === newIssueData.assignee || u.name === newIssueData.assignee);
    const reporterObj = mockUsers[0];
    const projectObj = mockProjects[0];
    const newIssue: JiraIssue = {
      id: Date.now().toString() + Math.random().toString(36).substr(2, 9),
      key: projectObj.key + '-' + (Math.floor(Math.random() * 1000) + 1),
      summary: newIssueData.summary,
      description: newIssueData.description,
      type: newIssueData.type as any,
      priority: newIssueData.priority as any,
      status: 'to-do',
      assignee: assigneeObj,
      reporter: reporterObj,
      project: projectObj,
      storyPoints: newIssueData.storyPoints,
      labels: [],
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      comments: []
    };

    setBacklogIssues(prev => [...prev, newIssue]);
    setShowCreateModal(false);
  };

  const toggleSprint = (sprintId: string) => {
    setExpandedSprints(prev => ({ ...prev, [sprintId]: !prev[sprintId] }));
  };

  const getIssueTypeColor = (type: string) => {
    switch (type) {
      case 'story': return 'bg-green-500';
      case 'bug': return 'bg-red-500';
      case 'task': return 'bg-blue-500';
      case 'epic': return 'bg-purple-500';
      default: return 'bg-gray-500';
    }
  };

  const getPriorityIcon = (priority: string) => {
    switch (priority) {
      case 'highest': return '↑↑';
      case 'high': return '↑';
      case 'medium': return '=';
      case 'low': return '↓';
      case 'lowest': return '↓↓';
      default: return '=';
    }
  };

  return (
    <div className="h-screen bg-white flex flex-col overflow-hidden">
      <JiraHeader onCreateIssue={handleCreateIssue} />
      
      <div className="flex flex-1 overflow-hidden">
        <JiraSidebar />
        
        <main className="flex-1 flex flex-col overflow-auto">
          <div className="border-b border-jira-gray-200 bg-white sticky top-0 z-10">
            <div className="px-6 py-4">
              <div className="flex items-center justify-between">
                <div>
                  <h1 className="text-2xl font-semibold text-jira-gray-900">Career Backlog</h1>
                  <p className="text-sm text-jira-gray-500 mt-1">Future goals, projects, and learning objectives for my fullstack development and cybersecurity journey</p>
                </div>
            
              </div>
            </div>
          </div>

          <div className="flex-1 px-6 py-4">
            {activeSprint && (
              <div className="mb-6 border border-jira-gray-200 rounded-lg">
                <div className="bg-jira-gray-50 px-4 py-3 flex items-center justify-between cursor-pointer hover:bg-jira-gray-100" onClick={() => toggleSprint(activeSprint.id)}>
                  <div className="flex items-center space-x-3">
                    {expandedSprints[activeSprint.id] ? <ChevronRight className="h-4 w-4 rotate-90 transition-transform" /> : <ChevronRight className="h-4 w-4 transition-transform" />}
                    <h2 className="font-medium text-jira-gray-900">{activeSprint.name}</h2>
                    <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200">Active</Badge>
                    <span className="text-sm text-jira-gray-500">{activeSprint.issues.length} issues</span>
                  </div>
                  <Button variant="ghost" size="icon" className="h-8 w-8">
                    <MoreHorizontal className="h-4 w-4" />
                  </Button>
                </div>
                
                {expandedSprints[activeSprint.id] && (
                  <div className="p-4">
                    {activeSprint.goal && (
                      <div className="mb-4 p-3 bg-blue-50 border-l-4 border-blue-400 rounded">
                        <p className="text-sm text-blue-900"><span className="font-medium">Sprint </span> {activeSprint.goal}</p>
                      </div>
                    )}
                    <div className="space-y-2">
                      {activeSprint.issues.map(issue => (
                        <div
                          key={issue.id}
                          onClick={() => setSelectedIssue(issue)}
                          className="flex items-center gap-3 p-3 bg-white border border-jira-gray-200 rounded hover:bg-jira-gray-50 cursor-pointer group"
                        >
                          <GripVertical className="h-4 w-4 text-jira-gray-400 opacity-0 group-hover:opacity-100" />
                          <div className={`h-5 w-5 rounded-sm ${getIssueTypeColor(issue.type)} flex items-center justify-center text-white text-xs font-bold`}>
                            {issue.type[0].toUpperCase()}
                          </div>
                          <span className="text-sm font-medium text-jira-gray-700">{issue.key}</span>
                          <span className="flex-1 text-sm text-jira-gray-900">{issue.summary}</span>
                          <span className="text-sm text-jira-gray-500">{getPriorityIcon(issue.priority)}</span>
                          {issue.assignee && (
                            <Avatar className="h-6 w-6">
                              <AvatarImage src={issue.assignee.avatarUrl} />
                              <AvatarFallback className="text-xs bg-jira-blue text-white">{issue.assignee.initials}</AvatarFallback>
                            </Avatar>
                          )}
                          {issue.storyPoints && (
                            <Badge variant="outline" className="text-xs">{issue.storyPoints}</Badge>
                          )}
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            )}

            <div className="border border-jira-gray-200 rounded-lg">
              <div className="bg-jira-gray-50 px-4 py-3 flex items-center justify-between cursor-pointer hover:bg-jira-gray-100" onClick={() => toggleSprint('backlog')}>
                <div className="flex items-center space-x-3">
                  {expandedSprints.backlog ? <ChevronRight className="h-4 w-4 rotate-90 transition-transform" /> : <ChevronRight className="h-4 w-4 transition-transform" />}
                  <h2 className="font-medium text-jira-gray-900">Backlog</h2>
                  <span className="text-sm text-jira-gray-500">{backlogOnlyIssues.length} issues</span>
                </div>
                <Button variant="ghost" size="icon" className="h-8 w-8">
                  <MoreHorizontal className="h-4 w-4" />
                </Button>
              </div>
              
              {expandedSprints.backlog && (
                <div className="p-4">
                  <div className="space-y-2">
                    {backlogOnlyIssues.length === 0 ? (
                      <div className="text-center py-8 text-jira-gray-500">
                        <p className="text-sm">Your backlog is empty</p>
                        <Button variant="ghost" onClick={handleCreateIssue} className="mt-2 text-jira-blue">Create an issue</Button>
                      </div>
                    ) : (
                      backlogOnlyIssues.map(issue => (
                        <div
                          key={issue.id}
                          onClick={() => setSelectedIssue(issue)}
                          className="flex items-center gap-3 p-3 bg-white border border-jira-gray-200 rounded hover:bg-jira-gray-50 cursor-pointer group"
                        >
                          <GripVertical className="h-4 w-4 text-jira-gray-400 opacity-0 group-hover:opacity-100" />
                          <div className={`h-5 w-5 rounded-sm ${getIssueTypeColor(issue.type)} flex items-center justify-center text-white text-xs font-bold`}>
                            {issue.type[0].toUpperCase()}
                          </div>
                          <span className="text-sm font-medium text-jira-gray-700">{issue.key}</span>
                          <span className="flex-1 text-sm text-jira-gray-900">{issue.summary}</span>
                          <span className="text-sm text-jira-gray-500">{getPriorityIcon(issue.priority)}</span>
                          {issue.assignee && (
                            <Avatar className="h-6 w-6">
                              <AvatarImage src={issue.assignee.avatarUrl} />
                              <AvatarFallback className="text-xs bg-jira-blue text-white">{issue.assignee.initials}</AvatarFallback>
                            </Avatar>
                          )}
                          {issue.storyPoints && (
                            <Badge variant="outline" className="text-xs">{issue.storyPoints}</Badge>
                          )}
                        </div>
                      ))
                    )}
                  </div>
                </div>
              )}
            </div>
          </div>
        </main>
      </div>

      <IssueModal 
        issue={selectedIssue}
        isOpen={!!selectedIssue}
        onClose={() => setSelectedIssue(null)}
        onUpdate={(updates) => {
          if (selectedIssue) {
            setSelectedIssue({ ...selectedIssue, ...updates });
          }
        }}
      />

      <CreateIssueModal
        open={showCreateModal}
        onClose={() => setShowCreateModal(false)}
        onSubmit={handleIssueCreated}
      />
    </div>
  );
}
