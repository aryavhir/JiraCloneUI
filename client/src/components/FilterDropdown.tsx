import { useState, useEffect } from 'react';
import { Filter, X, Users, Tag, Flag, AlertCircle, CheckCircle, Clock, User } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Checkbox } from '@/components/ui/checkbox';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from '@/components/ui/tabs';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Separator } from '@/components/ui/separator';
import { mockUsers, mockKanbanColumns } from '@/data/mockData';
import { JiraIssue, IssueType, IssuePriority, IssueStatus } from '@shared/types';

export interface FilterOptions {
  assignees: string[]; // user IDs
  unassigned: boolean;
  issueTypes: IssueType[];
  priorities: IssuePriority[];
  statuses: IssueStatus[];
  labels: string[];
  reporters: string[]; // user IDs
}

interface FilterDropdownProps {
  filters: FilterOptions;
  onFiltersChange: (filters: FilterOptions) => void;
  issues: JiraIssue[];
}

const ISSUE_TYPE_CONFIG = {
  story: { icon: '📖', label: 'Story', color: 'bg-green-100 text-green-800' },
  bug: { icon: '🐛', label: 'Bug', color: 'bg-red-100 text-red-800' },
  task: { icon: '✓', label: 'Task', color: 'bg-blue-100 text-blue-800' },
  epic: { icon: '⚡', label: 'Epic', color: 'bg-purple-100 text-purple-800' },
};

const PRIORITY_CONFIG = {
  highest: { icon: <Flag className="h-3 w-3 text-red-600" />, label: 'Highest', color: 'text-red-600' },
  high: { icon: <Flag className="h-3 w-3 text-orange-500" />, label: 'High', color: 'text-orange-500' },
  medium: { icon: <Flag className="h-3 w-3 text-yellow-500" />, label: 'Medium', color: 'text-yellow-500' },
  low: { icon: <Flag className="h-3 w-3 text-green-500" />, label: 'Low', color: 'text-green-500' },
  lowest: { icon: <Flag className="h-3 w-3 text-gray-400" />, label: 'Lowest', color: 'text-gray-400' },
};

const STATUS_CONFIG = {
  'to-do': { icon: <Clock className="h-3 w-3 text-gray-500" />, label: 'To Do', color: 'text-gray-500' },
  'in-progress': { icon: <AlertCircle className="h-3 w-3 text-blue-600" />, label: 'In Progress', color: 'text-blue-600' },
  done: { icon: <CheckCircle className="h-3 w-3 text-green-600" />, label: 'Done', color: 'text-green-600' },
};

export default function FilterDropdown({ filters, onFiltersChange, issues }: FilterDropdownProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [activeTab, setActiveTab] = useState('assignee');

  // Extract unique values from issues for filter options
  const uniqueLabels = Array.from(new Set(issues.flatMap(issue => issue.labels || [])));
  const uniqueReporters = Array.from(new Set(issues.map(issue => issue.reporter.id)));
  const uniqueAssignees = Array.from(new Set(issues.map(issue => issue.assignee?.id).filter(Boolean))) as string[];

  // Count active filters
  const activeFilterCount = Object.values(filters).reduce((count, filterValues) => {
    if (Array.isArray(filterValues)) {
      return count + filterValues.length;
    }
    return count + (filterValues ? 1 : 0);
  }, 0);

  const updateFilters = (updates: Partial<FilterOptions>) => {
    onFiltersChange({ ...filters, ...updates });
  };

  const clearAllFilters = () => {
    onFiltersChange({
      assignees: [],
      unassigned: false,
      issueTypes: [],
      priorities: [],
      statuses: [],
      labels: [],
      reporters: [],
    });
    setIsOpen(false);
  };

  const handleAssigneeToggle = (userId: string, checked: boolean) => {
    const newAssignees = checked 
      ? [...filters.assignees, userId]
      : filters.assignees.filter(id => id !== userId);
    updateFilters({ assignees: newAssignees });
  };

  const handleUnassignedToggle = (checked: boolean) => {
    updateFilters({ unassigned: checked });
  };

  const handleIssueTypeToggle = (type: IssueType, checked: boolean) => {
    const newTypes = checked
      ? [...filters.issueTypes, type]
      : filters.issueTypes.filter(t => t !== type);
    updateFilters({ issueTypes: newTypes });
  };

  const handlePriorityToggle = (priority: IssuePriority, checked: boolean) => {
    const newPriorities = checked
      ? [...filters.priorities, priority]
      : filters.priorities.filter(p => p !== priority);
    updateFilters({ priorities: newPriorities });
  };

  const handleStatusToggle = (status: IssueStatus, checked: boolean) => {
    const newStatuses = checked
      ? [...filters.statuses, status]
      : filters.statuses.filter(s => s !== status);
    updateFilters({ statuses: newStatuses });
  };

  const handleLabelToggle = (label: string, checked: boolean) => {
    const newLabels = checked
      ? [...filters.labels, label]
      : filters.labels.filter(l => l !== label);
    updateFilters({ labels: newLabels });
  };

  const handleReporterToggle = (userId: string, checked: boolean) => {
    const newReporters = checked
      ? [...filters.reporters, userId]
      : filters.reporters.filter(id => id !== userId);
    updateFilters({ reporters: newReporters });
  };

  return (
    <Popover open={isOpen} onOpenChange={setIsOpen}>
      <PopoverTrigger asChild>
        <Button 
          variant="outline" 
          size="sm"
          className="relative"
          data-testid="button-filter"
        >
          <Filter className="h-4 w-4 mr-2" />
          Filter
          {activeFilterCount > 0 && (
            <Badge 
              variant="destructive" 
              className="absolute -top-2 -right-2 h-5 w-5 p-0 flex items-center justify-center text-xs"
              data-testid="badge-active-filters"
            >
              {activeFilterCount}
            </Badge>
          )}
        </Button>
      </PopoverTrigger>

      <PopoverContent className="w-80 p-0" align="start" data-testid="popover-filter">
        <div className="p-4 border-b border-jira-gray-200">
          <div className="flex items-center justify-between">
            <h3 className="font-medium text-jira-gray-900">Filters</h3>
            {activeFilterCount > 0 && (
              <Button 
                variant="ghost" 
                size="sm" 
                onClick={clearAllFilters}
                className="text-jira-gray-500 hover:text-jira-gray-700"
                data-testid="button-clear-filters"
              >
                <X className="h-4 w-4 mr-1" />
                Clear all
              </Button>
            )}
          </div>
        </div>

        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="grid w-full grid-cols-4 p-0 h-auto bg-transparent">
            <TabsTrigger 
              value="assignee" 
              className="text-xs py-2 data-[state=active]:bg-jira-blue data-[state=active]:text-white"
              data-testid="tab-assignee"
            >
              <Users className="h-3 w-3 mr-1" />
              People
            </TabsTrigger>
            <TabsTrigger 
              value="type" 
              className="text-xs py-2 data-[state=active]:bg-jira-blue data-[state=active]:text-white"
              data-testid="tab-type"
            >
              <Tag className="h-3 w-3 mr-1" />
              Type
            </TabsTrigger>
            <TabsTrigger 
              value="priority" 
              className="text-xs py-2 data-[state=active]:bg-jira-blue data-[state=active]:text-white"
              data-testid="tab-priority"
            >
              <Flag className="h-3 w-3 mr-1" />
              Priority
            </TabsTrigger>
            <TabsTrigger 
              value="more" 
              className="text-xs py-2 data-[state=active]:bg-jira-blue data-[state=active]:text-white"
              data-testid="tab-more"
            >
              More
            </TabsTrigger>
          </TabsList>

          <ScrollArea className="h-80">
            <TabsContent value="assignee" className="m-0 p-4">
              <div className="space-y-3">
                <div className="flex items-center space-x-2">
                  <Checkbox
                    id="unassigned"
                    checked={filters.unassigned}
                    onCheckedChange={handleUnassignedToggle}
                    data-testid="checkbox-unassigned"
                  />
                  <label htmlFor="unassigned" className="text-sm text-jira-gray-700 cursor-pointer">
                    <div className="flex items-center space-x-2">
                      <div className="h-6 w-6 rounded-full bg-jira-gray-200 flex items-center justify-center">
                        <User className="h-3 w-3 text-jira-gray-500" />
                      </div>
                      <span>Unassigned</span>
                    </div>
                  </label>
                </div>

                <Separator />

                {mockUsers.filter(user => uniqueAssignees.includes(user.id)).map(user => (
                  <div key={user.id} className="flex items-center space-x-2">
                    <Checkbox
                      id={`assignee-${user.id}`}
                      checked={filters.assignees.includes(user.id)}
                      onCheckedChange={(checked) => handleAssigneeToggle(user.id, !!checked)}
                      data-testid={`checkbox-assignee-${user.id}`}
                    />
                    <label htmlFor={`assignee-${user.id}`} className="text-sm text-jira-gray-700 cursor-pointer">
                      <div className="flex items-center space-x-2">
                        <Avatar className="h-6 w-6">
                          <AvatarImage src={user.avatarUrl} alt={user.name} />
                          <AvatarFallback className="bg-jira-blue text-white text-xs">
                            {user.initials}
                          </AvatarFallback>
                        </Avatar>
                        <span>{user.name}</span>
                      </div>
                    </label>
                  </div>
                ))}
              </div>
            </TabsContent>

            <TabsContent value="type" className="m-0 p-4">
              <div className="space-y-3">
                {Object.entries(ISSUE_TYPE_CONFIG).map(([type, config]) => (
                  <div key={type} className="flex items-center space-x-2">
                    <Checkbox
                      id={`type-${type}`}
                      checked={filters.issueTypes.includes(type as IssueType)}
                      onCheckedChange={(checked) => handleIssueTypeToggle(type as IssueType, !!checked)}
                      data-testid={`checkbox-type-${type}`}
                    />
                    <label htmlFor={`type-${type}`} className="text-sm text-jira-gray-700 cursor-pointer">
                      <div className="flex items-center space-x-2">
                        <span className="text-sm">{config.icon}</span>
                        <span>{config.label}</span>
                      </div>
                    </label>
                  </div>
                ))}
              </div>
            </TabsContent>

            <TabsContent value="priority" className="m-0 p-4">
              <div className="space-y-3">
                {Object.entries(PRIORITY_CONFIG).map(([priority, config]) => (
                  <div key={priority} className="flex items-center space-x-2">
                    <Checkbox
                      id={`priority-${priority}`}
                      checked={filters.priorities.includes(priority as IssuePriority)}
                      onCheckedChange={(checked) => handlePriorityToggle(priority as IssuePriority, !!checked)}
                      data-testid={`checkbox-priority-${priority}`}
                    />
                    <label htmlFor={`priority-${priority}`} className="text-sm text-jira-gray-700 cursor-pointer">
                      <div className="flex items-center space-x-2">
                        {config.icon}
                        <span>{config.label}</span>
                      </div>
                    </label>
                  </div>
                ))}
              </div>
            </TabsContent>

            <TabsContent value="more" className="m-0 p-4">
              <div className="space-y-4">
                {/* Status Filters */}
                <div>
                  <h4 className="text-sm font-medium text-jira-gray-900 mb-2">Status</h4>
                  <div className="space-y-2">
                    {Object.entries(STATUS_CONFIG).map(([status, config]) => (
                      <div key={status} className="flex items-center space-x-2">
                        <Checkbox
                          id={`status-${status}`}
                          checked={filters.statuses.includes(status as IssueStatus)}
                          onCheckedChange={(checked) => handleStatusToggle(status as IssueStatus, !!checked)}
                          data-testid={`checkbox-status-${status}`}
                        />
                        <label htmlFor={`status-${status}`} className="text-sm text-jira-gray-700 cursor-pointer">
                          <div className="flex items-center space-x-2">
                            {config.icon}
                            <span>{config.label}</span>
                          </div>
                        </label>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Labels */}
                {uniqueLabels.length > 0 && (
                  <>
                    <Separator />
                    <div>
                      <h4 className="text-sm font-medium text-jira-gray-900 mb-2">Labels</h4>
                      <div className="space-y-2">
                        {uniqueLabels.map(label => (
                          <div key={label} className="flex items-center space-x-2">
                            <Checkbox
                              id={`label-${label}`}
                              checked={filters.labels.includes(label)}
                              onCheckedChange={(checked) => handleLabelToggle(label, !!checked)}
                              data-testid={`checkbox-label-${label}`}
                            />
                            <label htmlFor={`label-${label}`} className="text-sm text-jira-gray-700 cursor-pointer">
                              <Badge variant="secondary" className="text-xs">
                                {label}
                              </Badge>
                            </label>
                          </div>
                        ))}
                      </div>
                    </div>
                  </>
                )}

                {/* Reporters */}
                {uniqueReporters.length > 0 && (
                  <>
                    <Separator />
                    <div>
                      <h4 className="text-sm font-medium text-jira-gray-900 mb-2">Reporter</h4>
                      <div className="space-y-2">
                        {mockUsers.filter(user => uniqueReporters.includes(user.id)).map(user => (
                          <div key={user.id} className="flex items-center space-x-2">
                            <Checkbox
                              id={`reporter-${user.id}`}
                              checked={filters.reporters.includes(user.id)}
                              onCheckedChange={(checked) => handleReporterToggle(user.id, !!checked)}
                              data-testid={`checkbox-reporter-${user.id}`}
                            />
                            <label htmlFor={`reporter-${user.id}`} className="text-sm text-jira-gray-700 cursor-pointer">
                              <div className="flex items-center space-x-2">
                                <Avatar className="h-5 w-5">
                                  <AvatarImage src={user.avatarUrl} alt={user.name} />
                                  <AvatarFallback className="bg-jira-blue text-white text-xs">
                                    {user.initials}
                                  </AvatarFallback>
                                </Avatar>
                                <span>{user.name}</span>
                              </div>
                            </label>
                          </div>
                        ))}
                      </div>
                    </div>
                  </>
                )}
              </div>
            </TabsContent>
          </ScrollArea>
        </Tabs>
      </PopoverContent>
    </Popover>
  );
}