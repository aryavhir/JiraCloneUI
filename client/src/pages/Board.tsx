import { useState } from 'react';
import JiraHeader from '@/components/JiraHeader';
import JiraSidebar from '@/components/JiraSidebar';
import BoardHeader from '@/components/BoardHeader';
import KanbanBoard from '@/components/KanbanBoard';
import IssueModal from '@/components/IssueModal';
import { JiraIssue } from '@shared/types';
import { mockKanbanColumns } from '@/data/mockData';

export default function Board() {
  const [selectedIssue, setSelectedIssue] = useState<JiraIssue | null>(null);
  const [columns, setColumns] = useState(mockKanbanColumns);

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
    // todo: remove mock functionality - show create issue modal
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
      <JiraHeader />
      
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
    </div>
  );
}