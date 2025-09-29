import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { X, Bug, CheckSquare, BookOpen, Zap } from 'lucide-react';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import { JiraIssue, JiraProject, JiraUser, IssueType, IssuePriority } from '@shared/types';
import { mockUsers, mockProjects } from '@/data/mockData';

const issueSchema = z.object({
  project: z.string().min(1, 'Project is required'),
  issueType: z.enum(['story', 'bug', 'task', 'epic'], {
    errorMap: () => ({ message: 'Please select an issue type' })
  }),
  summary: z.string().min(1, 'Summary is required').max(255, 'Summary is too long'),
  description: z.string().optional(),
  priority: z.enum(['highest', 'high', 'medium', 'low', 'lowest']).default('medium'),
  assignee: z.string().optional(),
  labels: z.array(z.string()).default([]),
  storyPoints: z.number().min(1).max(100).optional()
});

type CreateIssueForm = z.infer<typeof issueSchema>;

interface CreateIssueModalProps {
  isOpen: boolean;
  onClose: () => void;
  onCreateIssue: (issue: Partial<JiraIssue>) => void;
  defaultProject?: JiraProject;
  defaultColumn?: string;
}

const issueTypeOptions = [
  { value: 'story', label: 'Story', icon: BookOpen, color: 'text-green-500', description: 'A user story' },
  { value: 'bug', label: 'Bug', icon: Bug, color: 'text-red-500', description: 'A problem which impairs functionality' },
  { value: 'task', label: 'Task', icon: CheckSquare, color: 'text-blue-500', description: 'A task that needs to be done' },
  { value: 'epic', label: 'Epic', icon: Zap, color: 'text-purple-500', description: 'A large body of work' }
] as const;

const priorityOptions = [
  { value: 'highest', label: 'Highest', color: 'text-red-600' },
  { value: 'high', label: 'High', color: 'text-red-500' },
  { value: 'medium', label: 'Medium', color: 'text-yellow-600' },
  { value: 'low', label: 'Low', color: 'text-green-500' },
  { value: 'lowest', label: 'Lowest', color: 'text-gray-500' }
] as const;

export default function CreateIssueModal({ 
  isOpen, 
  onClose, 
  onCreateIssue, 
  defaultProject,
  defaultColumn 
}: CreateIssueModalProps) {
  const [newLabel, setNewLabel] = useState('');
  const [labels, setLabels] = useState<string[]>([]);

  const form = useForm<CreateIssueForm>({
    resolver: zodResolver(issueSchema),
    defaultValues: {
      project: defaultProject?.id || mockProjects[0]?.id || '',
      issueType: 'story',
      summary: '',
      description: '',
      priority: 'medium',
      assignee: '',
      labels: [],
      storyPoints: undefined
    }
  });

  const watchedIssueType = form.watch('issueType');
  const selectedIssueType = issueTypeOptions.find(option => option.value === watchedIssueType);

  const handleAddLabel = () => {
    if (newLabel.trim() && !labels.includes(newLabel.trim())) {
      const updatedLabels = [...labels, newLabel.trim()];
      setLabels(updatedLabels);
      form.setValue('labels', updatedLabels);
      setNewLabel('');
    }
  };

  const handleRemoveLabel = (labelToRemove: string) => {
    const updatedLabels = labels.filter(label => label !== labelToRemove);
    setLabels(updatedLabels);
    form.setValue('labels', updatedLabels);
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      handleAddLabel();
    }
  };

  const onSubmit = (data: CreateIssueForm) => {
    const selectedProject = mockProjects.find(p => p.id === data.project);
    const selectedAssignee = data.assignee ? mockUsers.find(u => u.id === data.assignee) : undefined;
    const currentUser = mockUsers[0]; // todo: remove mock functionality
    
    // Generate issue key based on project
    const issueCount = Math.floor(Math.random() * 1000) + 1;
    const issueKey = `${selectedProject?.key}-${issueCount}`;

    const newIssue: Partial<JiraIssue> = {
      key: issueKey,
      summary: data.summary,
      description: data.description || '',
      type: data.issueType,
      priority: data.priority,
      status: defaultColumn === '1' ? 'to-do' : defaultColumn === '2' ? 'in-progress' : 'to-do',
      assignee: selectedAssignee,
      reporter: currentUser,
      project: selectedProject!,
      storyPoints: data.storyPoints,
      labels: data.labels,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      comments: []
    };

    console.log('Creating new issue:', newIssue);
    onCreateIssue(newIssue);
    onClose();
    form.reset();
    setLabels([]);
  };

  const handleClose = () => {
    onClose();
    form.reset();
    setLabels([]);
    setNewLabel('');
  };

  return (
    <Dialog open={isOpen} onOpenChange={handleClose}>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto" data-testid="modal-create-issue">
        <DialogHeader className="pb-4">
          <div className="flex items-center justify-between">
            <DialogTitle className="text-xl font-semibold text-jira-gray-900">
              Create Issue
            </DialogTitle>
            <Button 
              variant="ghost" 
              size="icon" 
              onClick={handleClose}
              className="h-8 w-8"
              data-testid="button-close-create-modal"
            >
              <X className="h-4 w-4" />
            </Button>
          </div>
        </DialogHeader>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            {/* Project Selection */}
            <FormField
              control={form.control}
              name="project"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-sm font-medium text-jira-gray-700">
                    Project *
                  </FormLabel>
                  <Select onValueChange={field.onChange} value={field.value}>
                    <FormControl>
                      <SelectTrigger data-testid="select-project">
                        <SelectValue placeholder="Select a project" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {mockProjects.map((project) => (
                        <SelectItem key={project.id} value={project.id}>
                          <div className="flex items-center space-x-2">
                            <Avatar className="h-4 w-4">
                              <AvatarFallback className="bg-jira-blue text-white text-xs">
                                {project.key.substring(0, 2)}
                              </AvatarFallback>
                            </Avatar>
                            <span>{project.name}</span>
                          </div>
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Issue Type */}
            <FormField
              control={form.control}
              name="issueType"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-sm font-medium text-jira-gray-700">
                    Issue Type *
                  </FormLabel>
                  <Select onValueChange={field.onChange} value={field.value}>
                    <FormControl>
                      <SelectTrigger data-testid="select-issue-type">
                        <SelectValue />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {issueTypeOptions.map((type) => {
                        const IconComponent = type.icon;
                        return (
                          <SelectItem key={type.value} value={type.value}>
                            <div className="flex items-center space-x-2">
                              <IconComponent className={`h-4 w-4 ${type.color}`} />
                              <div>
                                <div className="font-medium">{type.label}</div>
                                <div className="text-xs text-jira-gray-500">{type.description}</div>
                              </div>
                            </div>
                          </SelectItem>
                        );
                      })}
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Summary */}
            <FormField
              control={form.control}
              name="summary"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-sm font-medium text-jira-gray-700">
                    Summary *
                  </FormLabel>
                  <FormControl>
                    <Input 
                      {...field} 
                      placeholder="What needs to be done?"
                      data-testid="input-summary"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Description */}
            <FormField
              control={form.control}
              name="description"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-sm font-medium text-jira-gray-700">
                    Description
                  </FormLabel>
                  <FormControl>
                    <Textarea 
                      {...field} 
                      placeholder="Add a description..."
                      rows={4}
                      data-testid="textarea-description"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {/* Priority */}
              <FormField
                control={form.control}
                name="priority"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-sm font-medium text-jira-gray-700">
                      Priority
                    </FormLabel>
                    <Select onValueChange={field.onChange} value={field.value}>
                      <FormControl>
                        <SelectTrigger data-testid="select-priority">
                          <SelectValue />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        {priorityOptions.map((priority) => (
                          <SelectItem key={priority.value} value={priority.value}>
                            <span className={priority.color}>{priority.label}</span>
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {/* Assignee */}
              <FormField
                control={form.control}
                name="assignee"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-sm font-medium text-jira-gray-700">
                      Assignee
                    </FormLabel>
                    <Select onValueChange={field.onChange} value={field.value}>
                      <FormControl>
                        <SelectTrigger data-testid="select-assignee">
                          <SelectValue placeholder="Unassigned" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectItem value="">Unassigned</SelectItem>
                        {mockUsers.map((user) => (
                          <SelectItem key={user.id} value={user.id}>
                            <div className="flex items-center space-x-2">
                              <Avatar className="h-4 w-4">
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
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            {/* Story Points (only for stories and epics) */}
            {(watchedIssueType === 'story' || watchedIssueType === 'epic') && (
              <FormField
                control={form.control}
                name="storyPoints"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-sm font-medium text-jira-gray-700">
                      Story Points
                    </FormLabel>
                    <FormControl>
                      <Input 
                        type="number"
                        {...field}
                        onChange={(e) => field.onChange(e.target.value ? parseInt(e.target.value) : undefined)}
                        placeholder="Enter story points"
                        min={1}
                        max={100}
                        data-testid="input-story-points"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            )}

            {/* Labels */}
            <div>
              <FormLabel className="text-sm font-medium text-jira-gray-700">
                Labels
              </FormLabel>
              <div className="mt-2 space-y-2">
                <div className="flex items-center space-x-2">
                  <Input
                    value={newLabel}
                    onChange={(e) => setNewLabel(e.target.value)}
                    onKeyPress={handleKeyPress}
                    placeholder="Add a label"
                    className="flex-1"
                    data-testid="input-add-label"
                  />
                  <Button
                    type="button"
                    onClick={handleAddLabel}
                    variant="outline"
                    size="sm"
                    disabled={!newLabel.trim()}
                    data-testid="button-add-label"
                  >
                    Add
                  </Button>
                </div>
                {labels.length > 0 && (
                  <div className="flex flex-wrap gap-2">
                    {labels.map((label) => (
                      <Badge
                        key={label}
                        variant="secondary"
                        className="text-xs px-2 py-1 bg-jira-gray-100 text-jira-gray-700 cursor-pointer hover:bg-jira-gray-200"
                        onClick={() => handleRemoveLabel(label)}
                        data-testid={`badge-create-label-${label}`}
                      >
                        {label} ×
                      </Badge>
                    ))}
                  </div>
                )}
              </div>
            </div>

            {/* Form Actions */}
            <div className="flex justify-end space-x-2 pt-4 border-t border-jira-gray-200">
              <Button
                type="button"
                variant="outline"
                onClick={handleClose}
                data-testid="button-cancel-create"
              >
                Cancel
              </Button>
              <Button
                type="submit"
                className="bg-jira-blue hover:bg-jira-blue-dark text-white"
                data-testid="button-submit-create"
              >
                Create Issue
              </Button>
            </div>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}