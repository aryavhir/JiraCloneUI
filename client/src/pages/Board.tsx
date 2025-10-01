import { useState, useMemo } from 'react';
import JiraHeader from '@/components/JiraHeader';
import JiraSidebar from '@/components/JiraSidebar';
import BoardHeader from '@/components/BoardHeader';
import KanbanBoard from '@/components/KanbanBoard';
import IssueModal from '@/components/IssueModal';
import CreateIssueModal from '@/components/CreateIssueModal';
import { FilterOptions } from '@/components/FilterDropdown';
import { JiraIssue } from '@shared/types';
import { mockProjects } from '@/data/mockData';
import { mockUsers } from '@/data/mockData';
import { useWorkflow } from '@/contexts/WorkflowContext';

export default function Board() {
  const [selectedIssue, setSelectedIssue] = useState<JiraIssue | null>(null);
  const { columns, setColumns } = useWorkflow();
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [createColumnId, setCreateColumnId] = useState<string | undefined>(undefined);
  const [searchQuery, setSearchQuery] = useState('');
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
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
    
    // Update the columns state with the moved issue
    setColumns(prevColumns => {
      let movedIssue: JiraIssue | null = null;
      
      // Find and remove the issue from the source column
      const updatedColumns = prevColumns.map(column => {
        if (column.status === fromStatus) {
          const issue = column.issues.find(i => i.id === issueId);
          if (issue) {
            movedIssue = { ...issue, status: toStatus };
            return { ...column, issues: column.issues.filter(i => i.id !== issueId) };
          }
        }
        return column;
      });
      
      // Add the issue to the destination column
      if (movedIssue) {
        return updatedColumns.map(column => {
          if (column.status === toStatus) {
            return { ...column, issues: [...column.issues, movedIssue!] };
          }
          return column;
        });
      }
      
      return updatedColumns;
    });
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

  const handleIssueCreated = (newIssueData: {
    summary: string;
    description: string;
    type: string;
    priority: string;
    assignee: string;
    storyPoints?: number;
  }) => {
    const modalData = newIssueData;
    const assigneeObj = mockUsers.find((u: any) => u.id === modalData.assignee || u.name === modalData.assignee);
    const reporterObj = mockUsers[0]; // Default to first user for demo
    const projectObj = mockProjects[0]; // Default to first project for demo
    
    // Determine the target column and status
    const targetColumnId = createColumnId || '1'; // Default to "TO DO" column
    let targetStatus: 'to-do' | 'in-progress' | 'done' = 'to-do';
    
    if (targetColumnId === '1') targetStatus = 'to-do';
    else if (targetColumnId === '2') targetStatus = 'in-progress';
    else if (targetColumnId === '3') targetStatus = 'done';
    
    const newIssue: JiraIssue = {
      id: Date.now().toString() + Math.random().toString(36).substr(2, 9),
      key: projectObj.key + '-' + (Math.floor(Math.random() * 1000) + 1),
      summary: modalData.summary || '',
      description: modalData.description || '',
      type: modalData.type as any || 'task',
      priority: modalData.priority as any || 'medium',
      status: targetStatus,
      assignee: assigneeObj,
      reporter: reporterObj,
      project: projectObj,
      storyPoints: modalData.storyPoints,
      labels: [],
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      comments: []
    };

    // Add issue to the appropriate column
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

        // Assignee and Unassigned filter
        if (filters.assignees.length > 0 || filters.unassigned) {
          let matchesAssignee = false;
          
          // Check if matches specific assignees
          if (filters.assignees.length > 0 && issue.assignee && filters.assignees.includes(issue.assignee.id)) {
            matchesAssignee = true;
          }
          
          // Check if matches unassigned filter
          if (filters.unassigned && !issue.assignee) {
            matchesAssignee = true;
          }
          
          if (!matchesAssignee) return false;
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
    
    // Check if status is being updated (which means moving between columns)
    if (updates.status && updates.status !== selectedIssue.status) {
      setColumns(prevColumns => {
        let issueToMove: JiraIssue | null = null;
        
        // Remove from current column and update the issue
        const columnsAfterRemoval = prevColumns.map(column => {
          if (column.issues.find(i => i.id === selectedIssue.id)) {
            const issue = column.issues.find(i => i.id === selectedIssue.id);
            if (issue) {
              issueToMove = { ...issue, ...updates };
              return { ...column, issues: column.issues.filter(i => i.id !== selectedIssue.id) };
            }
          }
          return column;
        });
        
        // Add to new column
        if (issueToMove) {
          return columnsAfterRemoval.map(column => {
            if (column.status === updates.status) {
              return { ...column, issues: [...column.issues, issueToMove!] };
            }
            return column;
          });
        }
        
        return columnsAfterRemoval;
      });
    } else {
      // Update issue in place (no status change)
      setColumns(prevColumns => 
        prevColumns.map(column => ({
          ...column,
          issues: column.issues.map(issue => 
            issue.id === selectedIssue.id 
              ? { ...issue, ...updates }
              : issue
          )
        }))
      );
    }
    
    // Update local state for the modal
    const updatedIssue = { ...selectedIssue, ...updates };
    setSelectedIssue(updatedIssue);
  };

  return (
    <div className="min-h-screen bg-jira-gray-50 flex flex-col overflow-x-hidden">
      <JiraHeader 
        onCreateIssue={handleCreateIssue} 
        onMobileMenuToggle={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
      />
      
      <div className="flex flex-1 overflow-x-hidden">
        <JiraSidebar 
          isMobileMenuOpen={isMobileMenuOpen}
          onMobileMenuClose={() => setIsMobileMenuOpen(false)}
        />
        
        <main className="flex-1 flex flex-col overflow-x-hidden">
          <BoardHeader 
            onSearch={handleBoardSearch}
            onFilterChange={handleFilterChange}
            filters={filters}
            issues={allIssues}
            onCreateIssue={handleCreateIssue}
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
        open={showCreateModal}
        onClose={() => setShowCreateModal(false)}
        onSubmit={handleIssueCreated}
      />
    </div>
  );
}