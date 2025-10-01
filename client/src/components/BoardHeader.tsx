import { useState } from 'react';
import { Search, MoreHorizontal, Users, Settings, Share, Star, Plus } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Badge } from '@/components/ui/badge';
import { mockUsers, mockSprints } from '@/data/mockData';
import FilterDropdown, { FilterOptions } from './FilterDropdown';
import { JiraIssue } from '@shared/types';

interface BoardHeaderProps {
  boardName?: string;
  sprintName?: string;
  onSearch?: (query: string) => void;
  onFilterChange?: (filters: FilterOptions) => void;
  filters?: FilterOptions;
  issues?: JiraIssue[];
  onCreateIssue?: () => void;
}

export default function BoardHeader({ 
  boardName = 'Active sprints', 
  sprintName,
  onSearch,
  onFilterChange,
  filters,
  issues = [],
  onCreateIssue
}: BoardHeaderProps) {
  const [searchQuery, setSearchQuery] = useState('');
  const [isStarred, setIsStarred] = useState(false);
  
  const activeSprint = mockSprints.find(s => s.state === 'active'); // todo: remove mock functionality
  const assignedUsers = mockUsers.slice(0, 3); // todo: remove mock functionality

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setSearchQuery(value);
    onSearch?.(value);
  };

  const handleStarToggle = () => {
    setIsStarred(!isStarred);
    console.log(`Board ${isStarred ? 'unstarred' : 'starred'}`);
  };

  return (
    <div className="bg-white border-b border-jira-gray-200 px-3 sm:px-6 py-4">
      {/* Top row - Board title and actions */}
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center space-x-2 sm:space-x-3 min-w-0 flex-1">
          <h1 className="text-lg sm:text-2xl font-medium text-jira-gray-900 truncate" data-testid="text-board-title">
            {boardName}
          </h1>
          <Button
            variant="ghost"
            size="icon"
            onClick={handleStarToggle}
            className={`h-8 w-8 flex-shrink-0 ${isStarred ? 'text-yellow-500' : 'text-jira-gray-400 hover:text-yellow-500'}`}
            data-testid="button-star-board"
          >
            <Star className={`h-4 w-4 ${isStarred ? 'fill-current' : ''}`} />
          </Button>
        </div>
      </div>

      {/* Sprint info */}
      {activeSprint && (
        <div className="mb-4">
          <div className="flex flex-col sm:flex-row sm:items-center space-y-2 sm:space-y-0 sm:space-x-4">
            <div className="flex items-center space-x-2 sm:space-x-4">
              <Badge variant="secondary" className="bg-green-100 text-green-800 border-green-200" data-testid="badge-sprint-status">
                Active Sprint
              </Badge>
              <span className="text-sm font-medium text-jira-gray-900 truncate" data-testid="text-sprint-name">
                {activeSprint.name}
              </span>
            </div>
            <span className="text-xs sm:text-sm text-jira-gray-500" data-testid="text-sprint-dates">
              {activeSprint.startDate && activeSprint.endDate && (
                `${new Date(activeSprint.startDate).toLocaleDateString()} - ${new Date(activeSprint.endDate).toLocaleDateString()}`
              )}
            </span>
          </div>
          {activeSprint.goal && (
            <p className="text-xs sm:text-sm text-jira-gray-600 mt-1" data-testid="text-sprint-goal">
              <strong>Sprint goal:</strong> {activeSprint.goal}
            </p>
          )}
        </div>
      )}

      {/* Filter and search row */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between space-y-3 sm:space-y-0">
        <div className="flex items-center space-x-2 sm:space-x-4 min-w-0 flex-1">
          {/* Search */}
          <div className="relative flex-1 max-w-xs">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-jira-gray-400 h-4 w-4" />
            <Input
              type="search"
              placeholder="Search this board"
              value={searchQuery}
              onChange={handleSearchChange}
              className="pl-10 pr-4 py-2 w-full h-8 bg-white border-jira-gray-200 focus:border-jira-blue focus:ring-jira-blue text-sm"
              data-testid="input-board-search"
            />
          </div>

          {/* Filters */}
          <div className="flex items-center space-x-2 flex-shrink-0">
            {filters && onFilterChange && (
              <FilterDropdown 
                filters={filters}
                onFiltersChange={onFilterChange}
                issues={issues}
              />
            )}
          </div>
        </div>
        
        {/* Create Issue Button */}
        <div className="flex-shrink-0">
          {onCreateIssue && (
            <Button 
              onClick={onCreateIssue}
              size="sm"
              className="bg-jira-blue hover:bg-jira-blue-dark text-white"
              data-testid="button-create-issue"
            >
              <Plus className="h-4 w-4 mr-1" />
              Create
            </Button>
          )}
        </div>

        {/* Assigned team members */}
        <div className="flex items-center space-x-2 mt-3 sm:mt-0">
          <span className="text-xs sm:text-sm text-jira-gray-500">Assignees:</span>
          <div className="flex -space-x-1 sm:-space-x-2">
            {assignedUsers.slice(0, 3).map((user, index) => (
              <Avatar 
                key={user.id} 
                className="h-5 w-5 sm:h-8 sm:w-8 border-2 border-white hover:z-10 relative cursor-pointer"
                data-testid={`avatar-assignee-${user.id}`}
              >
                <AvatarImage src={user.avatarUrl} alt={user.name} />
                <AvatarFallback className="bg-jira-blue text-white text-xs font-medium">
                  {user.initials}
                </AvatarFallback>
              </Avatar>
            ))}
            {assignedUsers.length > 3 && (
              <div className="h-5 w-5 sm:h-8 sm:w-8 rounded-full bg-jira-gray-200 border-2 border-white flex items-center justify-center">
                <span className="text-xs text-jira-gray-600">+{assignedUsers.length - 3}</span>
              </div>
            )}
            <Button 
              variant="outline" 
              size="icon" 
              className="h-5 w-5 sm:h-8 sm:w-8 rounded-full border-2 border-white bg-jira-gray-100 hover:bg-jira-gray-200"
              onClick={() => console.log('Add assignee clicked')}
              data-testid="button-add-assignee"
            >
              <span className="text-xs text-jira-gray-600">+</span>
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}