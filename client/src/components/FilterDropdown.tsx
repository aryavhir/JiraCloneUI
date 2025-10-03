import { useState, useEffect } from 'react';
import { Filter, X, Tag, AlertCircle, CheckCircle, Clock } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
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
import { JiraIssue, IssueStatus } from '@shared/types';

export interface FilterOptions {
  statuses: IssueStatus[];
  labels: string[];
}

interface FilterDropdownProps {
  filters: FilterOptions;
  onFiltersChange: (filters: FilterOptions) => void;
  issues: JiraIssue[];
}


const STATUS_CONFIG = {
  'to-do': { icon: <Clock className="h-3 w-3 text-gray-500" />, label: 'To Do', color: 'text-gray-500' },
  'in-progress': { icon: <AlertCircle className="h-3 w-3 text-blue-600" />, label: 'In Progress', color: 'text-blue-600' },
  done: { icon: <CheckCircle className="h-3 w-3 text-green-600" />, label: 'Done', color: 'text-green-600' },
};

export default function FilterDropdown({ filters, onFiltersChange, issues }: FilterDropdownProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [activeTab, setActiveTab] = useState('status');

  // Extract unique values from issues for filter options
  const uniqueLabels = Array.from(new Set(issues.flatMap(issue => issue.labels || [])));

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
      statuses: [],
      labels: [],
    });
    setIsOpen(false);
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
          <TabsList className="grid w-full grid-cols-2 p-0 h-auto bg-transparent">
            <TabsTrigger 
              value="status" 
              className="text-xs py-2 data-[state=active]:bg-jira-blue data-[state=active]:text-white"
              data-testid="tab-status"
            >
              <CheckCircle className="h-3 w-3 mr-1" />
              Status
            </TabsTrigger>
            <TabsTrigger 
              value="skills" 
              className="text-xs py-2 data-[state=active]:bg-jira-blue data-[state=active]:text-white"
              data-testid="tab-skills"
            >
              <Tag className="h-3 w-3 mr-1" />
              Skills
            </TabsTrigger>
          </TabsList>

          <ScrollArea className="h-80">
            <TabsContent value="status" className="m-0 p-4">
              <div className="space-y-3">
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
            </TabsContent>

            <TabsContent value="skills" className="m-0 p-4">
              <div className="space-y-3">
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
            </TabsContent>
          </ScrollArea>
        </Tabs>
      </PopoverContent>
    </Popover>
  );
}