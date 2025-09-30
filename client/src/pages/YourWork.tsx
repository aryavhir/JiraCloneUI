import JiraHeader from '@/components/JiraHeader';
import JiraSidebar from '@/components/JiraSidebar';
import { Clock, User, Star, Eye } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { mockIssues, mockUsers } from '@/data/mockData';
import { JiraIssue } from '@shared/types';

const ISSUE_TYPE_CONFIG = {
  story: { icon: '📖', label: 'Story', color: 'bg-green-100 text-green-800' },
  bug: { icon: '🐛', label: 'Bug', color: 'bg-red-100 text-red-800' },
  task: { icon: '✓', label: 'Task', color: 'bg-blue-100 text-blue-800' },
  epic: { icon: '⚡', label: 'Epic', color: 'bg-purple-100 text-purple-800' },
};

const PRIORITY_ICONS = {
  highest: '🔴',
  high: '🟠',
  medium: '🟡',
  low: '🟢',
  lowest: '⚪',
};

function IssueRow({ issue }: { issue: JiraIssue }) {
  return (
    <div
      className="p-4 border border-jira-gray-200 rounded-lg hover:shadow-sm transition-shadow bg-white cursor-pointer"
      data-testid={`issue-${issue.key}`}
    >
      <div className="flex items-start gap-4">
        <div className="flex-1">
          <div className="flex items-center gap-2 mb-2">
            <span className="text-sm font-medium text-jira-blue">{issue.key}</span>
            <Badge variant="secondary" className="text-xs">
              {ISSUE_TYPE_CONFIG[issue.type].label}
            </Badge>
            <span className="text-sm">{PRIORITY_ICONS[issue.priority]}</span>
          </div>
          <h4 className="font-medium text-jira-gray-900 mb-2">{issue.summary}</h4>
          <div className="flex items-center gap-3 text-sm text-jira-gray-600">
            <span>{issue.project.name}</span>
            <span>•</span>
            <span className="capitalize">{issue.status.replace('-', ' ')}</span>
            {issue.labels.length > 0 && (
              <>
                <span>•</span>
                <div className="flex gap-1">
                  {issue.labels.slice(0, 2).map(label => (
                    <Badge key={label} variant="secondary" className="text-xs">
                      {label}
                    </Badge>
                  ))}
                </div>
              </>
            )}
          </div>
        </div>
        {issue.assignee && (
          <Avatar className="h-8 w-8">
            <AvatarImage src={issue.assignee.avatarUrl} alt={issue.assignee.name} />
            <AvatarFallback className="bg-jira-blue text-white text-xs">
              {issue.assignee.initials}
            </AvatarFallback>
          </Avatar>
        )}
      </div>
    </div>
  );
}

export default function YourWork() {
  const currentUser = mockUsers[0];
  
  // Filter issues for different views
  const workedOnIssues = mockIssues;
  const assignedIssues = mockIssues.filter(issue => issue.assignee?.id === currentUser.id);
  const viewedIssues = mockIssues.slice(0, 3); // Recent viewed
  const starredIssues = mockIssues.slice(0, 2); // Starred

  return (
    <div className="h-screen bg-jira-gray-50 flex flex-col overflow-hidden">
      <JiraHeader />
      
      <div className="flex flex-1 overflow-hidden">
        <JiraSidebar />
        
        <main className="flex-1 overflow-y-auto">
          <div className="max-w-6xl mx-auto p-6">
            <div className="mb-6">
              <h1 className="text-2xl font-semibold text-jira-gray-900 mb-2" data-testid="text-your-work-title">
                Your Work
              </h1>
              <p className="text-sm text-jira-gray-600">
                View and manage all your assigned tasks and recently viewed issues
              </p>
            </div>

            <Tabs defaultValue="worked-on" className="w-full">
              <TabsList className="mb-6" data-testid="tabs-your-work">
                <TabsTrigger value="worked-on" data-testid="tab-worked-on">
                  <Clock className="h-4 w-4 mr-2" />
                  Worked on
                </TabsTrigger>
                <TabsTrigger value="assigned" data-testid="tab-assigned">
                  <User className="h-4 w-4 mr-2" />
                  Assigned to me
                </TabsTrigger>
                <TabsTrigger value="viewed" data-testid="tab-viewed">
                  <Eye className="h-4 w-4 mr-2" />
                  Viewed
                </TabsTrigger>
                <TabsTrigger value="starred" data-testid="tab-starred">
                  <Star className="h-4 w-4 mr-2" />
                  Starred
                </TabsTrigger>
              </TabsList>

              <TabsContent value="worked-on" className="space-y-3">
                <div className="mb-4">
                  <h3 className="text-sm font-medium text-jira-gray-700 mb-2">
                    Recently updated issues you've worked on
                  </h3>
                </div>
                {workedOnIssues.length === 0 ? (
                  <div className="text-center py-12">
                    <Clock className="h-12 w-12 text-jira-gray-400 mx-auto mb-4" />
                    <p className="text-jira-gray-600">No recent work</p>
                  </div>
                ) : (
                  workedOnIssues.map(issue => (
                    <IssueRow key={issue.id} issue={issue} />
                  ))
                )}
              </TabsContent>

              <TabsContent value="assigned" className="space-y-3">
                <div className="mb-4">
                  <h3 className="text-sm font-medium text-jira-gray-700 mb-2">
                    Issues currently assigned to you ({assignedIssues.length})
                  </h3>
                </div>
                {assignedIssues.length === 0 ? (
                  <div className="text-center py-12">
                    <User className="h-12 w-12 text-jira-gray-400 mx-auto mb-4" />
                    <p className="text-jira-gray-600">No issues assigned to you</p>
                  </div>
                ) : (
                  assignedIssues.map(issue => (
                    <IssueRow key={issue.id} issue={issue} />
                  ))
                )}
              </TabsContent>

              <TabsContent value="viewed" className="space-y-3">
                <div className="mb-4">
                  <h3 className="text-sm font-medium text-jira-gray-700 mb-2">
                    Issues you've recently viewed
                  </h3>
                </div>
                {viewedIssues.length === 0 ? (
                  <div className="text-center py-12">
                    <Eye className="h-12 w-12 text-jira-gray-400 mx-auto mb-4" />
                    <p className="text-jira-gray-600">No recently viewed issues</p>
                  </div>
                ) : (
                  viewedIssues.map(issue => (
                    <IssueRow key={issue.id} issue={issue} />
                  ))
                )}
              </TabsContent>

              <TabsContent value="starred" className="space-y-3">
                <div className="mb-4">
                  <h3 className="text-sm font-medium text-jira-gray-700 mb-2">
                    Issues you've starred for quick access
                  </h3>
                </div>
                {starredIssues.length === 0 ? (
                  <div className="text-center py-12">
                    <Star className="h-12 w-12 text-jira-gray-400 mx-auto mb-4" />
                    <p className="text-jira-gray-600">No starred issues yet</p>
                    <p className="text-sm text-jira-gray-500 mt-2">
                      Star issues to quickly find them here
                    </p>
                  </div>
                ) : (
                  starredIssues.map(issue => (
                    <IssueRow key={issue.id} issue={issue} />
                  ))
                )}
              </TabsContent>
            </Tabs>
          </div>
        </main>
      </div>
    </div>
  );
}
