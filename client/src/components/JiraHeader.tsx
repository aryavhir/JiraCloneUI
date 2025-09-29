import { Search, Bell, HelpCircle, Settings, Plus } from 'lucide-react';
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
import { mockUsers } from '@/data/mockData';

export default function JiraHeader() {
  const currentUser = mockUsers[0]; // todo: remove mock functionality

  const handleSearch = (query: string) => {
    console.log('Search triggered:', query);
  };

  const handleProfileClick = () => {
    console.log('Profile clicked');
  };

  const handleNotificationClick = () => {
    console.log('Notifications clicked');
  };

  return (
    <header className="h-14 bg-white border-b border-jira-gray-200 flex items-center justify-between px-4 relative z-50">
      {/* Left section */}
      <div className="flex items-center space-x-4">
        {/* Jira Logo */}
        <div className="flex items-center space-x-2">
          <div className="w-6 h-6 bg-jira-blue rounded-sm flex items-center justify-center">
            <span className="text-white font-bold text-sm">J</span>
          </div>
          <span className="font-semibold text-jira-gray-800">Jira</span>
        </div>

        {/* Navigation */}
        <nav className="hidden md:flex items-center space-x-6 ml-8">
          <Button variant="ghost" size="sm" className="text-jira-gray-700 hover:text-jira-blue hover:bg-jira-blue-light">
            Your work
          </Button>
          <Button variant="ghost" size="sm" className="text-jira-gray-700 hover:text-jira-blue hover:bg-jira-blue-light">
            Projects
          </Button>
          <Button variant="ghost" size="sm" className="text-jira-gray-700 hover:text-jira-blue hover:bg-jira-blue-light">
            Filters
          </Button>
          <Button variant="ghost" size="sm" className="text-jira-gray-700 hover:text-jira-blue hover:bg-jira-blue-light">
            Dashboards
          </Button>
          <Button variant="ghost" size="sm" className="text-jira-gray-700 hover:text-jira-blue hover:bg-jira-blue-light">
            Teams
          </Button>
        </nav>
      </div>

      {/* Right section */}
      <div className="flex items-center space-x-2">
        {/* Search */}
        <div className="relative hidden sm:block">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-jira-gray-400 h-4 w-4" />
          <Input
            type="search"
            placeholder="Search"
            className="pl-10 pr-4 py-2 w-64 h-8 bg-jira-gray-50 border-jira-gray-200 focus:border-jira-blue focus:ring-jira-blue text-sm"
            onChange={(e) => handleSearch(e.target.value)}
            data-testid="input-search"
          />
        </div>

        {/* Create button */}
        <Button 
          size="sm" 
          className="bg-jira-blue hover:bg-jira-blue-dark text-white"
          onClick={() => console.log('Create clicked')}
          data-testid="button-create"
        >
          <Plus className="h-4 w-4 mr-1" />
          Create
        </Button>

        {/* Help */}
        <Button 
          variant="ghost" 
          size="icon" 
          className="h-8 w-8 text-jira-gray-500 hover:text-jira-gray-700 hover:bg-jira-gray-100"
          onClick={() => console.log('Help clicked')}
          data-testid="button-help"
        >
          <HelpCircle className="h-4 w-4" />
        </Button>

        {/* Settings */}
        <Button 
          variant="ghost" 
          size="icon" 
          className="h-8 w-8 text-jira-gray-500 hover:text-jira-gray-700 hover:bg-jira-gray-100"
          onClick={() => console.log('Settings clicked')}
          data-testid="button-settings"
        >
          <Settings className="h-4 w-4" />
        </Button>

        {/* Notifications */}
        <Button 
          variant="ghost" 
          size="icon" 
          className="h-8 w-8 text-jira-gray-500 hover:text-jira-gray-700 hover:bg-jira-gray-100 relative"
          onClick={handleNotificationClick}
          data-testid="button-notifications"
        >
          <Bell className="h-4 w-4" />
          <span className="absolute -top-1 -right-1 h-2 w-2 bg-red-500 rounded-full"></span>
        </Button>

        {/* User Avatar */}
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" size="icon" className="h-8 w-8" data-testid="button-user-menu">
              <Avatar className="h-6 w-6">
                <AvatarImage src={currentUser.avatarUrl} alt={currentUser.name} />
                <AvatarFallback className="bg-jira-blue text-white text-xs font-medium">
                  {currentUser.initials}
                </AvatarFallback>
              </Avatar>
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-56">
            <div className="px-2 py-2">
              <p className="text-sm font-medium text-jira-gray-900" data-testid="text-user-name">
                {currentUser.name}
              </p>
              <p className="text-xs text-jira-gray-500" data-testid="text-user-email">
                {currentUser.email}
              </p>
            </div>
            <DropdownMenuSeparator />
            <DropdownMenuItem onClick={handleProfileClick}>
              Profile
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => console.log('Settings clicked')}>
              Settings
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem onClick={() => console.log('Logout clicked')}>
              Log out
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </header>
  );
}