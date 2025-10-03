import { useState } from 'react';
import { DndContext, DragOverlay, closestCenter, DragStartEvent, DragEndEvent, PointerSensor, useSensor, useSensors } from '@dnd-kit/core';
import { SortableContext, arrayMove, verticalListSortingStrategy } from '@dnd-kit/sortable';
import { useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Plus } from 'lucide-react';
import IssueCard from './IssueCard';
import { JiraIssue, KanbanColumn, IssueStatus } from '@shared/types';

interface SortableIssueCardProps {
  issue: JiraIssue;
  onClick?: (issue: JiraIssue) => void;
}

function SortableIssueCard({ issue, onClick }: SortableIssueCardProps) {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({ id: issue.id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  };

  return (
    <div
      ref={setNodeRef}
      style={style}
      {...attributes}
      {...listeners}
    >
      <IssueCard 
        issue={issue} 
        onClick={onClick} 
        isDragging={isDragging}
      />
    </div>
  );
}

interface KanbanColumnComponentProps {
  column: KanbanColumn;
  onAddIssue: (columnId: string) => void;
  onIssueClick: (issue: JiraIssue) => void;
}

function KanbanColumnComponent({ column, onAddIssue, onIssueClick }: KanbanColumnComponentProps) {
  const issueCount = column.issues.length;
  const isOverLimit = column.limit && issueCount > column.limit;
  
  const { setNodeRef } = useSortable({
    id: column.id,
    data: {
      type: 'column',
      column
    }
  });

  return (
    <Card 
      ref={setNodeRef}
      className="bg-jira-gray-50 border-jira-gray-200 h-full flex flex-col" 
      data-testid={`column-${column.status}`}
    >
      {/* Column Header */}
      <div className="p-3 border-b border-jira-gray-200 bg-white flex-shrink-0">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <h3 className="text-xs font-semibold text-jira-gray-600 uppercase tracking-wide" data-testid={`text-column-title-${column.id}`}>
              {column.title}
            </h3>
            <span className={`text-xs px-1.5 py-0.5 rounded ${
              isOverLimit ? 'bg-red-100 text-red-700' : 'bg-jira-gray-100 text-jira-gray-600'
            }`} data-testid={`text-column-count-${column.id}`}>
              {issueCount}
              {column.limit && ` / ${column.limit}`}
            </span>
          </div>
          <Button 
            variant="ghost" 
            size="icon" 
            className="h-6 w-6 text-jira-gray-500 hover:text-jira-gray-700 hover:bg-jira-gray-200"
            onClick={() => onAddIssue(column.id)}
            data-testid={`button-add-issue-${column.id}`}
          >
            <Plus className="h-3 w-3" />
          </Button>
        </div>
      </div>

      {/* Column Content */}
      <div className="flex-1 p-3">
        <SortableContext items={column.issues.map(issue => issue.id)} strategy={verticalListSortingStrategy}>
          <div className="space-y-2">
            {column.issues.map((issue) => (
              <SortableIssueCard
                key={issue.id}
                issue={issue}
                onClick={onIssueClick}
              />
            ))}
          </div>
        </SortableContext>

        {/* Empty state */}
        {column.issues.length === 0 && (
          <div className="text-center py-8" data-testid={`empty-state-${column.id}`}>
            <p className="text-sm text-jira-gray-500">No issues</p>
            <Button 
              variant="ghost" 
              size="sm" 
              className="mt-2 text-jira-gray-600 hover:text-jira-blue"
              onClick={() => onAddIssue(column.id)}
            >
              <Plus className="h-4 w-4 mr-1" />
              Create issue
            </Button>
          </div>
        )}
      </div>
    </Card>
  );
}

interface KanbanBoardProps {
  columns: KanbanColumn[];
  onIssueMove?: (issueId: string, fromStatus: IssueStatus, toStatus: IssueStatus) => void;
  onIssueClick?: (issue: JiraIssue) => void;
  onAddIssue?: (columnId: string) => void;
}

export default function KanbanBoard({ columns: initialColumns, onIssueMove, onIssueClick, onAddIssue }: KanbanBoardProps) {
  const [activeIssue, setActiveIssue] = useState<JiraIssue | null>(null);

  // Configure pointer sensor with distance threshold
  // This allows clicks to work while requiring a small drag distance to start dragging
  const sensors = useSensors(
    useSensor(PointerSensor, {
      activationConstraint: {
        distance: 8, // Require 8px movement before drag starts
      },
    })
  );

  const handleDragStart = (event: DragStartEvent) => {
    const { active } = event;
    const issue = findIssueById(active.id as string);
    setActiveIssue(issue);
  };

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;
    setActiveIssue(null);

    if (!over) return;

    const activeIssueId = active.id as string;
    const overId = over.id as string;

    // Find which column the issue is being dropped into
    // Check if dropped on a column directly or on an issue within a column
    let overColumn = findColumnById(overId);
    if (!overColumn) {
      overColumn = findColumnByIssueId(overId);
    }
    
    if (!overColumn) return;

    const activeIssue = findIssueById(activeIssueId);
    if (!activeIssue) return;

    const activeColumn = findColumnByIssueId(activeIssueId);
    if (!activeColumn) return;

    // Only handle drag and drop - don't maintain local state
    // The parent component will handle the state update
    if (activeColumn.id !== overColumn.id) {
      console.log(`Issue moved: ${activeIssueId} from ${activeColumn.status} to ${overColumn.status}`);
      onIssueMove?.(activeIssueId, activeColumn.status, overColumn.status);
    }
  };

  const findIssueById = (id: string): JiraIssue | null => {
    for (const column of initialColumns) {
      const issue = column.issues.find(issue => issue.id === id);
      if (issue) return issue;
    }
    return null;
  };

  const findColumnByIssueId = (issueId: string): KanbanColumn | null => {
    return initialColumns.find(column => 
      column.issues.some(issue => issue.id === issueId)
    ) || null;
  };

  const findColumnById = (id: string): KanbanColumn | null => {
    return initialColumns.find(column => column.id === id) || null;
  };

  const handleIssueClick = (issue: JiraIssue) => {
    console.log('Opening issue:', issue.key);
    onIssueClick?.(issue);
  };

  const handleAddIssue = (columnId: string) => {
    console.log('Adding issue to column:', columnId);
    onAddIssue?.(columnId);
  };

  // Get all sortable IDs (issues + columns)
  const sortableIds = [
    ...initialColumns.map(col => col.id),
    ...initialColumns.flatMap(col => col.issues.map(issue => issue.id))
  ];

  return (
    <div className="flex-1 overflow-x-auto overflow-y-auto" data-testid="kanban-board">
      <DndContext
        sensors={sensors}
        collisionDetection={closestCenter}
        onDragStart={handleDragStart}
        onDragEnd={handleDragEnd}
      >
        <SortableContext items={sortableIds} strategy={verticalListSortingStrategy}>
          <div className="flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-4 lg:space-x-6 min-h-full sm:min-w-max">
            {initialColumns.map((column) => (
              <div key={column.id} className="flex-shrink-0 w-full sm:w-72 lg:w-80 max-w-full">
                <KanbanColumnComponent
                  column={column}
                  onAddIssue={handleAddIssue}
                  onIssueClick={handleIssueClick}
                />
              </div>
            ))}
          </div>
        </SortableContext>

        <DragOverlay>
          {activeIssue && (
            <IssueCard issue={activeIssue} isDragging />
          )}
        </DragOverlay>
      </DndContext>
    </div>
  );
}