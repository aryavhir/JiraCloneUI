import React, { createContext, useContext, useState, ReactNode } from 'react';
import { KanbanColumn } from '@shared/types';
import { mockKanbanColumns } from '@/data/mockData';

interface WorkflowContextType {
  columns: KanbanColumn[];
  setColumns: React.Dispatch<React.SetStateAction<KanbanColumn[]>>;
  addColumn: (column: KanbanColumn) => void;
}

const WorkflowContext = createContext<WorkflowContextType | undefined>(undefined);

export function WorkflowProvider({ children }: { children: ReactNode }) {
  const [columns, setColumns] = useState<KanbanColumn[]>(mockKanbanColumns);

  const addColumn = (column: KanbanColumn) => {
    setColumns(prev => [...prev, column]);
  };

  return (
    <WorkflowContext.Provider value={{ columns, setColumns, addColumn }}>
      {children}
    </WorkflowContext.Provider>
  );
}

export function useWorkflow() {
  const context = useContext(WorkflowContext);
  if (context === undefined) {
    throw new Error('useWorkflow must be used within a WorkflowProvider');
  }
  return context;
}

