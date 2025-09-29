import { useState } from 'react';
import { Search, MoreHorizontal, Users, Settings, Share, Star } from 'lucide-react';
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
}

export default function BoardHeader({ 
  boardName = 'Active sprints', 
  sprintName,
  onSearch,
  onFilterChange,
  filters,
  issues = []
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
    <div className="bg-white border-b border-jira-gray-200 px-6 py-4">
      {/* Top row - Board title and actions */}
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center space-x-3">
          <h1 className="text-2xl font-medium text-jira-gray-900" data-testid="text-board-title">
            {boardName}
          </h1>
          <Button
            variant="ghost"
            size="icon"
            onClick={handleStarToggle}
            className={`h-8 w-8 ${isStarred ? 'text-yellow-500' : 'text-jira-gray-400 hover:text-yellow-500'}`}
            data-testid="button-star-board"
          >
            <Star className={`h-4 w-4 ${isStarred ? 'fill-current' : ''}`} />
          </Button>
        </div>

        <div className="flex items-center space-x-2">
          <Button 
            variant="outline" 
            size="sm"
            onClick={() => console.log('Share clicked')}
            data-testid="button-share"
          >
            <Share className="h-4 w-4 mr-2" />
            Share
          </Button>
          
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="icon" className="h-8 w-8" data-testid="button-board-menu">
                <MoreHorizontal className="h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem onClick={() => console.log('Configure board clicked')}>
                <Settings className="h-4 w-4 mr-2" />
                Configure board
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem onClick={() => console.log('Export clicked')}>
                Export
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => console.log('Print clicked')}>
                Print
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>

      {/* Sprint info */}
      {activeSprint && (
        <div className="mb-4">
          <div className="flex items-center space-x-4">
            <Badge variant="secondary" className="bg-green-100 text-green-800 border-green-200" data-testid="badge-sprint-status">
              Active Sprint
            </Badge>
            <span className="text-sm font-medium text-jira-gray-900" data-testid="text-sprint-name">
              {activeSprint.name}
            </span>
            <span className="text-sm text-jira-gray-500" data-testid="text-sprint-dates">
              {activeSprint.startDate && activeSprint.endDate && (
                `${new Date(activeSprint.startDate).toLocaleDateString()} - ${new Date(activeSprint.endDate).toLocaleDateString()}`
              )}
            </span>
          </div>
          {activeSprint.goal && (
            <p className="text-sm text-jira-gray-600 mt-1" data-testid="text-sprint-goal">
              <strong>Sprint goal:</strong> {activeSprint.goal}
            </p>
          )}
        </div>
      )}

      {/* Filter and search row */}
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-4">
          {/* Search */}
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-jira-gray-400 h-4 w-4" />
            <Input
              type="search"
              placeholder="Search this board"
              value={searchQuery}
              onChange={handleSearchChange}
              className="pl-10 pr-4 py-2 w-64 h-8 bg-white border-jira-gray-200 focus:border-jira-blue focus:ring-jira-blue text-sm"
              data-testid="input-board-search"
            />
          </div>

          {/* Filters */}
          <div className="flex items-center space-x-2">
            {filters && onFilterChange && (
              <FilterDropdown 
                filters={filters}
                onFiltersChange={onFilterChange}
                issues={issues}
              />
            )}

            <Button 
              variant="outline" 
              size="sm"
              onClick={() => console.log('People filter clicked')}
              data-testid="button-people-filter"
            >
              <Users className="h-4 w-4 mr-2" />
              People
            </Button>
          </div>
        </div>

        {/* Assigned team members */}
        <div className="flex items-center space-x-2">
          <span className="text-sm text-jira-gray-500">Assignees:</span>
          <div className="flex -space-x-2">
            {assignedUsers.map((user, index) => (
              <Avatar 
                key={user.id} 
                className="h-8 w-8 border-2 border-white hover:z-10 relative cursor-pointer"
                data-testid={`avatar-assignee-${user.id}`}
              >
                <AvatarImage src={user.avatarUrl} alt={user.name} />
                <AvatarFallback className="bg-jira-blue text-white text-xs font-medium">
                  {user.initials}
                </AvatarFallback>
              </Avatar>
            ))}
            <Button 
              variant="outline" 
              size="icon" 
              className="h-8 w-8 rounded-full border-2 border-white bg-jira-gray-100 hover:bg-jira-gray-200"
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