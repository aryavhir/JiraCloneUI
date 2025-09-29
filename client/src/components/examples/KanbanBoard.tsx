import KanbanBoard from '../KanbanBoard';
import { mockKanbanColumns } from '@/data/mockData';

export default function KanbanBoardExample() {
  return (
    <div className="h-screen bg-white">
      <KanbanBoard columns={mockKanbanColumns} />
    </div>
  );
}