import { ArrowUp, ArrowDown, Minus, Bug, CheckSquare, BookOpen, Zap, GripVertical } from 'lucide-react';
import { Card } from '@/components/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { JiraIssue, IssuePriority, IssueType } from '@shared/types';

interface IssueCardProps {
  issue: JiraIssue;
  onClick?: (issue: JiraIssue) => void;
  isDragging?: boolean;
}

const priorityIcons: Record<IssuePriority, { icon: React.ComponentType<any>; color: string; }> = {
  highest: { icon: ArrowUp, color: 'text-red-500' },
  high: { icon: ArrowUp, color: 'text-orange-500' }, 
  medium: { icon: Minus, color: 'text-green-500' },
  low: { icon: ArrowDown, color: 'text-green-500' },
  lowest: { icon: ArrowDown, color: 'text-gray-400' }
};

const typeIcons: Record<IssueType, { icon: React.ComponentType<any>; color: string; }> = {
  story: { icon: BookOpen, color: 'text-green-500' },
  bug: { icon: Bug, color: 'text-red-500' },
  task: { icon: CheckSquare, color: 'text-blue-500' },
  epic: { icon: Zap, color: 'text-purple-500' }
};

export default function IssueCard({ issue, onClick, isDragging = false }: IssueCardProps) {
  const PriorityIcon = priorityIcons[issue.priority].icon;
  const TypeIcon = typeIcons[issue.type].icon;

  const handleClick = (e: React.MouseEvent) => {
    // Prevent click event during drag
    if (isDragging) {
      e.preventDefault();
      e.stopPropagation();
      return;
    }
    console.log('Issue card clicked:', issue.key);
    onClick?.(issue);
  };

  return (
    <Card 
      onClick={handleClick}
      className={`group p-3 mb-3 bg-white border border-jira-gray-200 hover:bg-jira-gray-50 transition-all duration-200 cursor-pointer ${
        isDragging ? 'opacity-50 cursor-grabbing' : 'shadow-sm hover:shadow-md'
      }`}
      data-testid={`card-issue-${issue.key}`}
    >
      <div>
        {/* Issue Summary */}
        <h3 className="text-xs sm:text-sm font-medium text-jira-gray-900 mb-2 leading-tight" data-testid={`text-issue-summary-${issue.id}`}>
          {issue.summary}
        </h3>

        {/* Labels */}
        {issue.labels.length > 0 && (
          <div className="flex flex-wrap gap-1 mb-2 sm:mb-3">
            {issue.labels.slice(0, 2).map((label) => (
              <Badge 
                key={label} 
                variant="secondary" 
                className="text-xs px-1.5 sm:px-2 py-0.5 bg-jira-gray-100 text-jira-gray-700 hover:bg-jira-gray-200"
                data-testid={`badge-label-${label}`}
              >
                {label}
              </Badge>
            ))}
            {issue.labels.length > 2 && (
              <Badge 
                variant="secondary" 
                className="text-xs px-1.5 sm:px-2 py-0.5 bg-jira-gray-100 text-jira-gray-700"
              >
                +{issue.labels.length - 2}
              </Badge>
            )}
          </div>
        )}

        {/* Bottom Row */}
        <div className="flex items-center justify-between mt-2 sm:mt-3">
          {/* Left side - Issue key, type, priority */}
          <div className="flex items-center space-x-1 sm:space-x-2">
            <span className="text-xs font-mono text-jira-gray-500 hover:text-jira-blue cursor-pointer" data-testid={`text-issue-key-${issue.id}`}>
              {issue.key}
            </span>
            
            <div className="flex items-center space-x-1">
              <TypeIcon className={`h-3 w-3 ${typeIcons[issue.type].color}`} />
              <PriorityIcon className={`h-3 w-3 ${priorityIcons[issue.priority].color}`} />
            </div>

            {/* Story Points */}
            {issue.storyPoints && (
              <div className="w-4 h-4 sm:w-5 sm:h-5 rounded-full bg-jira-gray-100 flex items-center justify-center">
                <span className="text-xs font-medium text-jira-gray-600" data-testid={`text-story-points-${issue.id}`}>
                  {issue.storyPoints}
                </span>
              </div>
            )}
          </div>

          {/* Right side - Assignee */}
          <div className="flex items-center">
            {issue.assignee ? (
              <Avatar className="h-5 w-5 sm:h-6 sm:w-6" data-testid={`avatar-assignee-${issue.id}`}>
                <AvatarImage src={issue.assignee.avatarUrl} alt={issue.assignee.name} />
                <AvatarFallback className="bg-jira-blue text-white text-xs font-medium">
                  {issue.assignee.initials}
                </AvatarFallback>
              </Avatar>
            ) : (
              <div className="w-5 h-5 sm:w-6 sm:h-6 rounded-full bg-jira-gray-200 flex items-center justify-center" data-testid={`avatar-unassigned-${issue.id}`}>
                <span className="text-xs text-jira-gray-500">?</span>
              </div>
            )}
          </div>
        </div>
      </div>
    </Card>
  );
}