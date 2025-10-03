import { useState } from 'react';
import { X, ArrowUp, ArrowDown, Minus, Bug, CheckSquare, BookOpen, Zap, Paperclip, MessageSquare, User, Calendar, Tag, MoreHorizontal, Plus } from 'lucide-react';
import { mockUsers } from '@/data/mockData';
import {
  Dialog,
  DialogContent,
  DialogHeader,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { Textarea } from '@/components/ui/textarea';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { JiraIssue, IssuePriority, IssueType, IssueStatus } from '@shared/types';
import { formatDistanceToNow } from 'date-fns';

interface IssueModalProps {
  issue: JiraIssue | null;
  isOpen: boolean;
  onClose: () => void;
  onUpdate?: (updatedIssue: Partial<JiraIssue>) => void;
}

const priorityIcons: Record<IssuePriority, { icon: React.ComponentType<any>; color: string; label: string; }> = {
  highest: { icon: ArrowUp, color: 'text-red-500', label: 'Highest' },
  high: { icon: ArrowUp, color: 'text-orange-500', label: 'High' }, 
  medium: { icon: Minus, color: 'text-green-500', label: 'Medium' },
  low: { icon: ArrowDown, color: 'text-green-500', label: 'Low' },
  lowest: { icon: ArrowDown, color: 'text-gray-400', label: 'Lowest' }
};

const typeIcons: Record<IssueType, { icon: React.ComponentType<any>; color: string; label: string; }> = {
  story: { icon: BookOpen, color: 'text-green-500', label: 'Story' },
  bug: { icon: Bug, color: 'text-red-500', label: 'Bug' },
  task: { icon: CheckSquare, color: 'text-blue-500', label: 'Task' },
  epic: { icon: Zap, color: 'text-purple-500', label: 'Epic' }
};

const statusOptions: Record<IssueStatus, string> = {
  'to-do': 'To Do',
  'in-progress': 'In Progress',
  'done': 'Done'
};

export default function IssueModal({ issue, isOpen, onClose, onUpdate }: IssueModalProps) {
  const [isEditing, setIsEditing] = useState(false);
  const [newComment, setNewComment] = useState('');

  if (!issue) return null;

  const PriorityIcon = priorityIcons[issue.priority].icon;
  const TypeIcon = typeIcons[issue.type].icon;

  const handleEditToggle = () => {
    setIsEditing(!isEditing);
  };

  const handleSave = () => {
    console.log('Saving changes to issue:', issue.key);
    onUpdate?.({});
    setIsEditing(false);
  };

  const handleAddComment = () => {
    if (newComment.trim()) {
      console.log('Adding comment:', newComment);
      
      const newCommentObj = {
        id: Date.now().toString(),
        author: {
          id: 'current-user',
          name: 'You',
          email: 'you@company.com',
          initials: 'YU'
        },
        body: newComment.trim(),
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString()
      };
      
      onUpdate?.({ 
        comments: [...issue.comments, newCommentObj] 
      });
      
      setNewComment('');
    }
  };

  const handleFieldChange = (field: string, value: any) => {
    console.log(`Updating ${field}:`, value);
    onUpdate?.({ [field]: value });
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto p-0" data-testid="modal-issue">
        {/* Header */}
        <DialogHeader className="px-6 py-4 border-b border-jira-gray-200 flex flex-row items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="flex items-center space-x-2">
              <TypeIcon className={`h-4 w-4 ${typeIcons[issue.type].color}`} />
              <span className="text-sm text-jira-gray-500">{typeIcons[issue.type].label}</span>
            </div>
            <span className="text-sm font-mono text-jira-gray-500" data-testid={`text-modal-issue-key-${issue.id}`}>
              {issue.key}
            </span>
          </div>
      
        </DialogHeader>

        <div className="flex">
          {/* Main Content */}
          <div className="flex-1 p-6 space-y-6">
            {/* Summary */}
            <div>
              <h1 className="text-xl font-medium text-jira-gray-900" 
                  data-testid={`text-modal-issue-summary-${issue.id}`}>
                {issue.summary}
              </h1>
            </div>

            {/* Description */}
            <div>
              <h3 className="text-sm font-medium text-jira-gray-900 mb-2">Description</h3>
              <div 
                className="text-sm text-jira-gray-700 p-3 bg-jira-gray-50 rounded min-h-20"
                data-testid={`text-modal-issue-description-${issue.id}`}
              >
                {issue.description || 'No description provided'}
              </div>
            </div>

            {/* Edit Actions */}
            {isEditing && (
              <div className="flex space-x-2">
                <Button onClick={handleSave} size="sm" data-testid="button-save-changes">
                  Save
                </Button>
                <Button variant="outline" onClick={() => setIsEditing(false)} size="sm" data-testid="button-cancel-changes">
                  Cancel
                </Button>
              </div>
            )}

            {/* Comments */}
            <div>
              <h3 className="text-sm font-medium text-jira-gray-900 mb-4 flex items-center">
                <MessageSquare className="h-4 w-4 mr-2" />
                Comments ({issue.comments.length})
              </h3>

              {/* Add Comment */}
              <div className="mb-4">
                <div className="flex space-x-3">
                  <Avatar className="h-8 w-8">
                    <AvatarFallback className="bg-jira-blue text-white text-xs font-medium">
                      You
                    </AvatarFallback>
                  </Avatar>
                  <div className="flex-1">
                    <Textarea
                      value={newComment}
                      onChange={(e) => setNewComment(e.target.value)}
                      placeholder="Add a comment..."
                      rows={3}
                      className="resize-none"
                      data-testid="textarea-add-comment"
                    />
                    <div className="flex justify-end mt-2">
                      <Button 
                        onClick={handleAddComment}
                        size="sm"
                        disabled={!newComment.trim()}
                        data-testid="button-add-comment"
                      >
                        Comment
                      </Button>
                    </div>
                  </div>
                </div>
              </div>

              {/* Existing Comments */}
              <div className="space-y-4">
                {issue.comments.map((comment) => (
                  <div key={comment.id} className="flex space-x-3" data-testid={`comment-${comment.id}`}>
                    <Avatar className="h-8 w-8">
                      <AvatarImage src={comment.author.avatarUrl} alt={comment.author.name} />
                      <AvatarFallback className="bg-jira-blue text-white text-xs font-medium">
                        {comment.author.initials}
                      </AvatarFallback>
                    </Avatar>
                    <div className="flex-1">
                      <div className="bg-jira-gray-50 p-3 rounded border">
                        <div className="flex items-center justify-between mb-1">
                          <span className="text-sm font-medium text-jira-gray-900" data-testid={`text-comment-author-${comment.id}`}>
                            {comment.author.name}
                          </span>
                          <span className="text-xs text-jira-gray-500" data-testid={`text-comment-date-${comment.id}`}>
                            {formatDistanceToNow(new Date(comment.createdAt), { addSuffix: true })}
                          </span>
                        </div>
                        <p className="text-sm text-jira-gray-700" data-testid={`text-comment-body-${comment.id}`}>
                          {comment.body}
                        </p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Sidebar */}
          <div className="w-64 bg-jira-gray-50 border-l border-jira-gray-200 p-4 space-y-4">
            <div>
              <label className="text-xs font-medium text-jira-gray-500 uppercase tracking-wide mb-2 block">
                Status
              </label>
              <Select 
                value={issue.status} 
                onValueChange={(value) => handleFieldChange('status', value)}
              >
                <SelectTrigger className="w-full" data-testid="select-status">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {Object.entries(statusOptions).map(([key, label]) => (
                    <SelectItem key={key} value={key}>
                      {label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div>
              <div className="flex items-center justify-between mb-2">
                <label className="text-xs font-medium text-jira-gray-500 uppercase tracking-wide">
                  Assignee
                </label>
                <Button
                  variant="ghost"
                  size="sm"
                  className="h-6 w-6 p-0 text-jira-gray-500 hover:text-jira-blue"
                  onClick={() => window.open('/project-settings', '_blank')}
                  title="Manage team members"
                >
                  <Plus className="h-3 w-3" />
                </Button>
              </div>
              <Select 
                value={issue.assignee?.id || 'unassigned'} 
                onValueChange={(value) => {
                  if (value === 'unassigned') {
                    handleFieldChange('assignee', undefined);
                  } else {
                    const user = mockUsers.find(u => u.id === value);
                    handleFieldChange('assignee', user);
                  }
                }}
              >
                <SelectTrigger className="w-full" data-testid="select-assignee">
                  <SelectValue>
                    <div className="flex items-center space-x-2">
                      {issue.assignee ? (
                        <>
                          <Avatar className="h-5 w-5">
                            <AvatarImage src={issue.assignee.avatarUrl} alt={issue.assignee.name} />
                            <AvatarFallback className="bg-jira-blue text-white text-xs">
                              {issue.assignee.initials}
                            </AvatarFallback>
                          </Avatar>
                          <span className="text-sm">{issue.assignee.name}</span>
                        </>
                      ) : (
                        <>
                          <User className="h-4 w-4 text-jira-gray-500" />
                          <span className="text-sm text-jira-gray-500">Unassigned</span>
                        </>
                      )}
                    </div>
                  </SelectValue>
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="unassigned">
                    <div className="flex items-center space-x-2">
                      <User className="h-4 w-4 text-jira-gray-500" />
                      <span>Unassigned</span>
                    </div>
                  </SelectItem>
                  {mockUsers.map((user) => (
                    <SelectItem key={user.id} value={user.id}>
                      <div className="flex items-center space-x-2">
                        <Avatar className="h-5 w-5">
                          <AvatarImage src={user.avatarUrl} alt={user.name} />
                          <AvatarFallback className="bg-jira-blue text-white text-xs">
                            {user.initials}
                          </AvatarFallback>
                        </Avatar>
                        <span>{user.name}</span>
                      </div>
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div>
              <label className="text-xs font-medium text-jira-gray-500 uppercase tracking-wide mb-2 block">
                Priority
              </label>
              <div className="flex items-center space-x-2 p-2 rounded border border-jira-gray-200 bg-white" data-testid="field-priority">
                <PriorityIcon className={`h-4 w-4 ${priorityIcons[issue.priority].color}`} />
                <span className="text-sm text-jira-gray-900">{priorityIcons[issue.priority].label}</span>
              </div>
            </div>

            <div>
              <label className="text-xs font-medium text-jira-gray-500 uppercase tracking-wide mb-2 block">
                Story Points
              </label>
              <div className="p-2 rounded border border-jira-gray-200 bg-white" data-testid="field-story-points">
                <span className="text-sm text-jira-gray-900">
                  {issue.storyPoints || 'None'}
                </span>
              </div>
            </div>

            <div>
              <label className="text-xs font-medium text-jira-gray-500 uppercase tracking-wide mb-2 block">
                Labels
              </label>
              <div className="flex flex-wrap gap-1">
                {issue.labels.map((label) => (
                  <Badge 
                    key={label} 
                    variant="secondary" 
                    className="text-xs px-2 py-0.5 bg-jira-gray-200 text-jira-gray-700"
                    data-testid={`badge-modal-label-${label}`}
                  >
                    {label}
                  </Badge>
                ))}
              
              </div>
            </div>

            <div className="pt-4 border-t border-jira-gray-200">
              <div className="text-xs text-jira-gray-500 space-y-1">
                <div data-testid="text-modal-created">
                  Created {formatDistanceToNow(new Date(issue.createdAt), { addSuffix: true })}
                </div>
                <div data-testid="text-modal-updated">
                  Updated {formatDistanceToNow(new Date(issue.updatedAt), { addSuffix: true })}
                </div>
                <div data-testid="text-modal-reporter">
                  Reporter: {issue.reporter.name}
                </div>
              </div>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}