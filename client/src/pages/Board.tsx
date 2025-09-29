import { useState, useMemo } from 'react';
import JiraHeader from '@/components/JiraHeader';
import JiraSidebar from '@/components/JiraSidebar';
import BoardHeader from '@/components/BoardHeader';
import KanbanBoard from '@/components/KanbanBoard';
import IssueModal from '@/components/IssueModal';
import CreateIssueModal from '@/components/CreateIssueModal';
import { FilterOptions } from '@/components/FilterDropdown';
import { JiraIssue } from '@shared/types';
import { mockKanbanColumns, mockProjects } from '@/data/mockData';

export default function Board() {
  const [selectedIssue, setSelectedIssue] = useState<JiraIssue | null>(null);
  const [columns, setColumns] = useState(mockKanbanColumns);
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [createColumnId, setCreateColumnId] = useState<string | undefined>(undefined);
  const [searchQuery, setSearchQuery] = useState('');
  const [filters, setFilters] = useState<FilterOptions>({
    assignees: [],
    unassigned: false,
    issueTypes: [],
    priorities: [],
    statuses: [],
    labels: [],
    reporters: [],
  });

  const handleIssueClick = (issue: JiraIssue) => {
    console.log('Opening issue:', issue.key);
    setSelectedIssue(issue);
  };

  const handleIssueMove = (issueId: string, fromStatus: any, toStatus: any) => {
    console.log(`Issue ${issueId} moved from ${fromStatus} to ${toStatus}`);
    // todo: remove mock functionality - update issue status
  };

  const handleAddIssue = (columnId: string) => {
    console.log('Add issue to column:', columnId);
    setCreateColumnId(columnId);
    setShowCreateModal(true);
  };

  const handleCreateIssue = () => {
    setCreateColumnId(undefined);
    setShowCreateModal(true);
  };

  const handleIssueCreated = (newIssueData: Partial<JiraIssue>) => {
    // Generate unique ID for frontend
    const newIssue = {
      ...newIssueData,
      id: Date.now().toString() + Math.random().toString(36).substr(2, 9),
    } as JiraIssue;

    console.log('New issue created:', newIssue);

    // Add issue to the appropriate column
    const targetColumnId = createColumnId || '1'; // Default to "TO DO" column
    setColumns(prevColumns =>
      prevColumns.map(column =>
        column.id === targetColumnId
          ? { ...column, issues: [...column.issues, newIssue] }
          : column
      )
    );

    setShowCreateModal(false);
    setCreateColumnId(undefined);
  };

  // Get all issues from columns for filtering
  const allIssues = useMemo(() => {
    return columns.flatMap(column => column.issues);
  }, [columns]);

  // Apply filters and search to issues
  const filteredColumns = useMemo(() => {
    return columns.map(column => ({
      ...column,
      issues: column.issues.filter(issue => {
        // Search filter
        if (searchQuery) {
          const searchLower = searchQuery.toLowerCase();
          const matchesSearch = 
            issue.key.toLowerCase().includes(searchLower) ||
            issue.summary.toLowerCase().includes(searchLower) ||
            issue.description.toLowerCase().includes(searchLower) ||
            issue.assignee?.name.toLowerCase().includes(searchLower) ||
            issue.reporter.name.toLowerCase().includes(searchLower) ||
            issue.labels.some(label => label.toLowerCase().includes(searchLower));
          
          if (!matchesSearch) return false;
        }

        // Assignee filter
        if (filters.assignees.length > 0) {
          const hasMatchingAssignee = issue.assignee && filters.assignees.includes(issue.assignee.id);
          if (!hasMatchingAssignee) return false;
        }

        // Unassigned filter
        if (filters.unassigned && issue.assignee) {
          return false;
        }

        // Issue type filter
        if (filters.issueTypes.length > 0 && !filters.issueTypes.includes(issue.type)) {
          return false;
        }

        // Priority filter
        if (filters.priorities.length > 0 && !filters.priorities.includes(issue.priority)) {
          return false;
        }

        // Status filter
        if (filters.statuses.length > 0 && !filters.statuses.includes(issue.status)) {
          return false;
        }

        // Labels filter
        if (filters.labels.length > 0) {
          const hasMatchingLabel = filters.labels.some(label => issue.labels.includes(label));
          if (!hasMatchingLabel) return false;
        }

        // Reporter filter
        if (filters.reporters.length > 0 && !filters.reporters.includes(issue.reporter.id)) {
          return false;
        }

        return true;
      })
    }));
  }, [columns, searchQuery, filters]);

  const handleBoardSearch = (query: string) => {
    console.log('Searching board:', query);
    setSearchQuery(query);
  };

  const handleFilterChange = (newFilters: FilterOptions) => {
    console.log('Filters changed:', newFilters);
    setFilters(newFilters);
  };

  const handleIssueUpdate = (updates: Partial<JiraIssue>) => {
    if (!selectedIssue) return;
    
    console.log('Updating issue:', selectedIssue.key, updates);
    // todo: remove mock functionality - update issue in backend
    
    // Update local state for demo purposes
    const updatedIssue = { ...selectedIssue, ...updates };
    setSelectedIssue(updatedIssue);
  };

  return (
    <div className="h-screen bg-jira-gray-50 flex flex-col overflow-hidden">
      <JiraHeader onCreateIssue={handleCreateIssue} />
      
      <div className="flex flex-1 overflow-hidden">
        <JiraSidebar />
        
        <main className="flex-1 flex flex-col overflow-hidden">
          <BoardHeader 
            onSearch={handleBoardSearch}
            onFilterChange={handleFilterChange}
            filters={filters}
            issues={allIssues}
          />
          <KanbanBoard 
            columns={filteredColumns}
            onIssueMove={handleIssueMove}
            onIssueClick={handleIssueClick}
            onAddIssue={handleAddIssue}
          />
        </main>
      </div>

      <IssueModal 
        issue={selectedIssue}
        isOpen={!!selectedIssue}
        onClose={() => setSelectedIssue(null)}
        onUpdate={handleIssueUpdate}
      />

      <CreateIssueModal
        isOpen={showCreateModal}
        onClose={() => setShowCreateModal(false)}
        onCreateIssue={handleIssueCreated}
        defaultProject={mockProjects[0]}
        defaultColumn={createColumnId}
      />
    </div>
  );
}