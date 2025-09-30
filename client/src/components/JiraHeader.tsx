import { useState } from 'react';
import { Search, Bell, HelpCircle, Settings, Plus, MessageSquare, GitPullRequest, CheckCircle, AlertCircle } from 'lucide-react';
import { Link } from 'wouter';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
  DropdownMenuLabel,
} from '@/components/ui/dropdown-menu';
import { Badge } from '@/components/ui/badge';
import { mockUsers } from '@/data/mockData';
import { formatDistanceToNow } from 'date-fns';

interface JiraHeaderProps {
  onCreateIssue?: () => void;
}

const mockNotifications = [
  {
    id: '1',
    type: 'comment',
    title: 'New comment on PROJ-1',
    message: 'Mike Chen commented: "Started working on the Google OAuth integration"',
    time: '2 hours ago',
    read: false,
    icon: MessageSquare,
  },
  {
    id: '2',
    type: 'pr',
    title: 'Pull request approved',
    message: 'Your pull request #42 has been approved by Sarah Johnson',
    time: '5 hours ago',
    read: false,
    icon: GitPullRequest,
  },
  {
    id: '3',
    type: 'issue',
    title: 'Issue assigned to you',
    message: 'PROJ-3 "Database connection timeout" was assigned to you',
    time: '1 day ago',
    read: true,
    icon: AlertCircle,
  },
  {
    id: '4',
    type: 'complete',
    title: 'Issue completed',
    message: 'PROJ-2 was moved to Done by Jessica Williams',
    time: '2 days ago',
    read: true,
    icon: CheckCircle,
  },
];

export default function JiraHeader({ onCreateIssue }: JiraHeaderProps) {
  const currentUser = mockUsers[0]; // todo: remove mock functionality
  const [searchQuery, setSearchQuery] = useState('');

  const handleSearch = (query: string) => {
    setSearchQuery(query);
    console.log('Search triggered:', query);
  };

  const handleProfileClick = () => {
    console.log('Profile clicked');
  };

  const unreadCount = mockNotifications.filter(n => !n.read).length;

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
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="sm" className="text-jira-gray-700 hover:text-jira-blue hover:bg-jira-blue-light">
                Your work
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="start" className="w-64">
              <DropdownMenuLabel>Your work</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem>
                <Link href="/board" className="w-full">Worked on</Link>
              </DropdownMenuItem>
              <DropdownMenuItem>Viewed</DropdownMenuItem>
              <DropdownMenuItem>Assigned to me</DropdownMenuItem>
              <DropdownMenuItem>Starred</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
          
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="sm" className="text-jira-gray-700 hover:text-jira-blue hover:bg-jira-blue-light">
                Projects
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="start" className="w-64">
              <DropdownMenuLabel>Recent projects</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem>
                <Link href="/board" className="w-full">Project Management Tool</Link>
              </DropdownMenuItem>
              <DropdownMenuItem>Website Redesign</DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem className="text-jira-blue">View all projects</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
          
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="sm" className="text-jira-gray-700 hover:text-jira-blue hover:bg-jira-blue-light">
                Filters
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="start" className="w-64">
              <DropdownMenuLabel>Filters</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem>My open issues</DropdownMenuItem>
              <DropdownMenuItem>Reported by me</DropdownMenuItem>
              <DropdownMenuItem>Recently updated</DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem className="text-jira-blue">View all filters</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
          
          <Button asChild variant="ghost" size="sm" className="text-jira-gray-700 hover:text-jira-blue hover:bg-jira-blue-light">
            <Link href="/dashboard">Dashboards</Link>
          </Button>
          
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="sm" className="text-jira-gray-700 hover:text-jira-blue hover:bg-jira-blue-light">
                Teams
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="start" className="w-64">
              <DropdownMenuLabel>Your teams</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem>Development Team</DropdownMenuItem>
              <DropdownMenuItem>Design Team</DropdownMenuItem>
              <DropdownMenuItem>Product Team</DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem className="text-jira-blue">Create team</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
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
          onClick={onCreateIssue || (() => console.log('Create clicked'))}
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
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button 
              variant="ghost" 
              size="icon" 
              className="h-8 w-8 text-jira-gray-500 hover:text-jira-gray-700 hover:bg-jira-gray-100 relative"
              data-testid="button-notifications"
            >
              <Bell className="h-4 w-4" />
              {unreadCount > 0 && (
                <span className="absolute -top-1 -right-1 h-4 w-4 bg-red-500 rounded-full text-white text-[10px] flex items-center justify-center font-medium">
                  {unreadCount}
                </span>
              )}
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-96">
            <DropdownMenuLabel className="flex items-center justify-between">
              <span>Notifications</span>
              {unreadCount > 0 && (
                <Badge variant="secondary" className="ml-2">{unreadCount} new</Badge>
              )}
            </DropdownMenuLabel>
            <DropdownMenuSeparator />
            <div className="max-h-96 overflow-y-auto">
              {mockNotifications.map(notification => {
                const IconComponent = notification.icon;
                return (
                  <DropdownMenuItem key={notification.id} className={`p-3 cursor-pointer ${!notification.read ? 'bg-blue-50' : ''}`}>
                    <div className="flex gap-3 w-full">
                      <IconComponent className="h-5 w-5 text-jira-gray-500 flex-shrink-0 mt-0.5" />
                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-medium text-jira-gray-900">{notification.title}</p>
                        <p className="text-sm text-jira-gray-600 mt-1 line-clamp-2">{notification.message}</p>
                        <p className="text-xs text-jira-gray-500 mt-1">{notification.time}</p>
                      </div>
                      {!notification.read && (
                        <div className="h-2 w-2 bg-blue-500 rounded-full flex-shrink-0 mt-2"></div>
                      )}
                    </div>
                  </DropdownMenuItem>
                );
              })}
            </div>
            <DropdownMenuSeparator />
            <DropdownMenuItem className="justify-center text-jira-blue font-medium">
              View all notifications
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>

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