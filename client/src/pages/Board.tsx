import { useState } from 'react';
import JiraHeader from '@/components/JiraHeader';
import JiraSidebar from '@/components/JiraSidebar';
import BoardHeader from '@/components/BoardHeader';
import KanbanBoard from '@/components/KanbanBoard';
import IssueModal from '@/components/IssueModal';
import CreateIssueModal from '@/components/CreateIssueModal';
import { JiraIssue } from '@shared/types';
import { mockKanbanColumns, mockProjects } from '@/data/mockData';

export default function Board() {
  const [selectedIssue, setSelectedIssue] = useState<JiraIssue | null>(null);
  const [columns, setColumns] = useState(mockKanbanColumns);
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [createColumnId, setCreateColumnId] = useState<string | undefined>(undefined);

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

  const handleBoardSearch = (query: string) => {
    console.log('Searching board:', query);
    // todo: remove mock functionality - filter issues
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
          <BoardHeader onSearch={handleBoardSearch} />
          <KanbanBoard 
            columns={columns}
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