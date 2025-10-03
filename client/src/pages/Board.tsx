import { useState, useMemo } from 'react';
import JiraHeader from '@/components/JiraHeader';
import JiraSidebar from '@/components/JiraSidebar';
import BoardHeader from '@/components/BoardHeader';
import KanbanBoard from '@/components/KanbanBoard';
import IssueModal from '@/components/IssueModal';
import CreateIssueModal from '@/components/CreateIssueModal';
import { FilterOptions } from '@/components/FilterDropdown';
import { JiraIssue, JiraSprint } from '@shared/types';
import { mockProjects, mockSprints } from '@/data/mockData';
import { mockUsers } from '@/data/mockData';
import { useWorkflow } from '@/contexts/WorkflowContext';
import { ChevronDown, ChevronRight, Calendar, Target } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';

export default function Board() {
  const [selectedIssue, setSelectedIssue] = useState<JiraIssue | null>(null);
  const { columns, setColumns } = useWorkflow();
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [createColumnId, setCreateColumnId] = useState<string | undefined>(undefined);
  const [searchQuery, setSearchQuery] = useState('');
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [expandedSprints, setExpandedSprints] = useState<Record<string, boolean>>({
    '1': true, // First sprint expanded by default
    '2': false,
    '3': false,
  });
  const [filters, setFilters] = useState<FilterOptions>({
    statuses: [],
    labels: [],
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

        // Status filter
        if (filters.statuses.length > 0 && !filters.statuses.includes(issue.status)) {
          return false;
        }

        // Labels filter (Skills)
        if (filters.labels.length > 0) {
          const hasMatchingLabel = filters.labels.some(label => issue.labels.includes(label));
          if (!hasMatchingLabel) return false;
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

  const toggleSprintExpansion = (sprintId: string) => {
    setExpandedSprints(prev => ({
      ...prev,
      [sprintId]: !prev[sprintId]
    }));
  };

  // Get active sprints
  const activeSprints = mockSprints.filter(sprint => sprint.state === 'active');

  // Function to get columns for a specific sprint (applying filters)
  const getColumnsForSprint = (sprint: JiraSprint) => {
    const sprintIssues = sprint.issues || [];
    return filteredColumns.map(column => ({
      ...column,
      issues: column.issues.filter(issue => 
        sprintIssues.some(sprintIssue => sprintIssue && sprintIssue.id === issue.id)
      )
    }));
  };

  return (
    <div className="min-h-screen bg-jira-gray-50 flex flex-col overflow-hidden">
      <JiraHeader 
        onMobileMenuToggle={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
      />
      
      <div className="flex flex-1 overflow-hidden">
        <JiraSidebar 
          isMobileMenuOpen={isMobileMenuOpen}
          onMobileMenuClose={() => setIsMobileMenuOpen(false)}
        />
        
        <main className="flex-1 flex flex-col overflow-hidden">
          <BoardHeader 
            onSearch={handleBoardSearch}
            onFilterChange={handleFilterChange}
            onCreateIssue={handleCreateIssue}
            filters={filters}
            issues={allIssues}
          />
          
          <div className="flex-1 overflow-y-auto">
            <div className="md:p-4">
              {activeSprints.map((sprint) => {
                const isExpanded = expandedSprints[sprint.id];
                const sprintColumns = getColumnsForSprint(sprint);
                const totalIssues = sprintColumns.reduce((sum, col) => sum + col.issues.length, 0);
                
                return (
                  <div key={sprint.id} className="bg-white border-b md:border md:border-jira-gray-200 md:rounded-lg md:mb-4 overflow-hidden">
                    {/* Sprint Header */}
                    <div 
                      className="p-3 sm:p-4 border-b border-jira-gray-200 cursor-pointer hover:bg-jira-gray-50 active:bg-jira-gray-100 transition-colors"
                      onClick={() => toggleSprintExpansion(sprint.id)}
                      data-testid={`sprint-header-${sprint.id}`}
                    >
                      <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-2 sm:space-x-3 flex-1 min-w-0">
                          {isExpanded ? (
                            <ChevronDown className="h-5 w-5 text-jira-gray-500 flex-shrink-0 transition-transform duration-200" />
                          ) : (
                            <ChevronRight className="h-5 w-5 text-jira-gray-500 flex-shrink-0 transition-transform duration-200" />
                          )}
                          <div className="flex-1 min-w-0">
                            <h3 className="text-base sm:text-lg font-semibold text-jira-gray-900 truncate">
                              {sprint.name}
                            </h3>
                            <div className="flex flex-wrap items-center gap-x-3 gap-y-1 text-xs sm:text-sm text-jira-gray-500 mt-1">
                              <div className="flex items-center space-x-1">
                                <Calendar className="h-3 w-3 sm:h-4 sm:w-4" />
                                <span className="truncate">
                                  {sprint.startDate ? new Date(sprint.startDate).toLocaleDateString() : 'TBD'} - 
                                  {sprint.endDate === 'Current' ? ' Current' : (sprint.endDate ? new Date(sprint.endDate).toLocaleDateString() : 'TBD')}
                                </span>
                              </div>
                              <div className="flex items-center space-x-1">
                                <Target className="h-3 w-3 sm:h-4 sm:w-4" />
                                <span>{totalIssues} issues</span>
                              </div>
                            </div>
                          </div>
                        </div>
                        <div className="flex items-center space-x-2 flex-shrink-0 ml-2">
                          <Badge variant="outline" className="bg-green-100 text-green-800 border-green-200 text-xs">
                            Active
                          </Badge>
                        </div>
                      </div>
                      
                      {sprint.goal && (
                        <div className="mt-3 p-2 sm:p-3 bg-blue-50 border-l-4 border-blue-400 rounded">
                          <p className="text-xs sm:text-sm text-blue-900">
                            <span className="font-medium">Sprint Goal:</span> {sprint.goal}
                          </p>
                        </div>
                      )}
                    </div>
                    
                    {/* Sprint Content */}
                    {isExpanded && (
                      <div className="p-2 sm:p-4 animate-in slide-in-from-top-2 duration-200">
                        <KanbanBoard 
                          columns={sprintColumns}
                          onIssueMove={handleIssueMove}
                          onIssueClick={handleIssueClick}
                          onAddIssue={handleAddIssue}
                        />
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
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