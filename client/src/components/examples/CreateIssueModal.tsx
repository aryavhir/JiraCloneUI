import { useState } from 'react';
import CreateIssueModal from '../CreateIssueModal';
import { Button } from '@/components/ui/button';
import { mockProjects } from '@/data/mockData';

export default function CreateIssueModalExample() {
  const [isOpen, setIsOpen] = useState(false);

  const handleCreateIssue = (issue: any) => {
    console.log('New issue created:', issue);
    setIsOpen(false);
  };

  return (
    <div className="p-4 space-y-4">
      <Button onClick={() => setIsOpen(true)}>
        Open Create Issue Modal
      </Button>
      
      <CreateIssueModal 
        isOpen={isOpen}
        onClose={() => setIsOpen(false)}
        onCreateIssue={handleCreateIssue}
        defaultProject={mockProjects[0]}
      />
    </div>
  );
}