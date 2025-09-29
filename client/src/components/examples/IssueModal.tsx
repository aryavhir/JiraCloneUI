import { useState } from 'react';
import IssueModal from '../IssueModal';
import { Button } from '@/components/ui/button';
import { mockIssues } from '@/data/mockData';

export default function IssueModalExample() {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedIssue, setSelectedIssue] = useState(mockIssues[0]);

  return (
    <div className="p-4 space-y-4">
      <div className="space-x-2">
        <Button onClick={() => { setSelectedIssue(mockIssues[0]); setIsOpen(true); }}>
          Open Story Issue
        </Button>
        <Button onClick={() => { setSelectedIssue(mockIssues[2]); setIsOpen(true); }}>
          Open Bug Issue
        </Button>
      </div>
      
      <IssueModal 
        issue={selectedIssue}
        isOpen={isOpen}
        onClose={() => setIsOpen(false)}
      />
    </div>
  );
}