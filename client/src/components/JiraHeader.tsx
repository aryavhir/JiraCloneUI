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
  const [searchOpen, setSearchOpen] = useState(false);

  const handleSearch = (query: string) => {
    setSearchQuery(query);
    setSearchOpen(query.length > 0);
  };

  const handleProfileClick = () => {
    console.log('Profile clicked');
  };

  const unreadCount = mockNotifications.filter(n => !n.read).length;

  const searchResults = searchQuery.length > 0 ? [
    { type: 'issue', key: 'PROJ-1', title: 'Set up user authentication system', category: 'Issues' },
    { type: 'issue', key: 'PROJ-2', title: 'Design dashboard wireframes', category: 'Issues' },
    { type: 'issue', key: 'PROJ-3', title: 'Database connection timeout', category: 'Issues' },
    { type: 'page', title: 'Backlog', path: '/backlog', category: 'Pages' },
    { type: 'page', title: 'Board', path: '/board', category: 'Pages' },
    { type: 'page', title: 'Releases', path: '/releases', category: 'Pages' },
  ].filter(item => 
    item.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    ('key' in item && item.key && item.key.toLowerCase().includes(searchQuery.toLowerCase()))
  ) : [];

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
              <DropdownMenuItem asChild>
                <Link href="/your-work" className="w-full">Worked on</Link>
              </DropdownMenuItem>
              <DropdownMenuItem asChild>
                <Link href="/your-work" className="w-full">Viewed</Link>
              </DropdownMenuItem>
              <DropdownMenuItem asChild>
                <Link href="/your-work" className="w-full">Assigned to me</Link>
              </DropdownMenuItem>
              <DropdownMenuItem asChild>
                <Link href="/your-work" className="w-full">Starred</Link>
              </DropdownMenuItem>
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
              <DropdownMenuItem asChild>
                <Link href="/board" className="w-full">Project Management Tool</Link>
              </DropdownMenuItem>
              <DropdownMenuItem asChild>
                <Link href="/board" className="w-full">Website Redesign</Link>
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem className="text-jira-blue" asChild>
                <Link href="/projects" className="w-full">View all projects</Link>
              </DropdownMenuItem>
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
              <DropdownMenuItem asChild>
                <Link href="/filters" className="w-full">My open issues</Link>
              </DropdownMenuItem>
              <DropdownMenuItem asChild>
                <Link href="/filters" className="w-full">Reported by me</Link>
              </DropdownMenuItem>
              <DropdownMenuItem asChild>
                <Link href="/filters" className="w-full">Recently updated</Link>
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem className="text-jira-blue" asChild>
                <Link href="/filters" className="w-full">View all filters</Link>
              </DropdownMenuItem>
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
              <DropdownMenuItem asChild>
                <Link href="/teams" className="w-full">Development Team</Link>
              </DropdownMenuItem>
              <DropdownMenuItem asChild>
                <Link href="/teams" className="w-full">Design Team</Link>
              </DropdownMenuItem>
              <DropdownMenuItem asChild>
                <Link href="/teams" className="w-full">Product Team</Link>
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem className="text-jira-blue" asChild>
                <Link href="/teams" className="w-full">Create team</Link>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </nav>
      </div>

      {/* Right section */}
      <div className="flex items-center space-x-2">
        {/* Search */}
        <div className="relative hidden sm:block">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-jira-gray-400 h-4 w-4 z-10" />
          <Input
            type="search"
            placeholder="Search"
            value={searchQuery}
            className="pl-10 pr-4 py-2 w-64 h-8 bg-jira-gray-50 border-jira-gray-200 focus:border-jira-blue focus:ring-jira-blue text-sm"
            onChange={(e) => handleSearch(e.target.value)}
            onFocus={() => searchQuery.length > 0 && setSearchOpen(true)}
            onBlur={() => setTimeout(() => setSearchOpen(false), 200)}
            data-testid="input-search"
          />
          {searchOpen && searchResults.length > 0 && (
            <div className="absolute top-full mt-2 w-96 bg-white border border-jira-gray-200 rounded-lg shadow-lg z-50 max-h-96 overflow-y-auto">
              <div className="p-2">
                {searchResults.map((result, idx) => {
                  const prevCategory = idx > 0 ? searchResults[idx - 1].category : null;
                  const showCategory = result.category !== prevCategory;
                  const resultKey = `search-result-${idx}`;
                  
                  return (
                    <div key={resultKey}>
                      {showCategory && (
                        <div className="px-2 py-1 text-xs font-semibold text-jira-gray-500 uppercase tracking-wide mt-2 first:mt-0">
                          {result.category}
                        </div>
                      )}
                      <div
                        className="px-3 py-2 hover:bg-jira-gray-50 rounded cursor-pointer flex items-center gap-3"
                        onClick={() => {
                          if (result.type === 'page' && 'path' in result) {
                            window.location.href = result.path;
                          }
                          setSearchOpen(false);
                          setSearchQuery('');
                        }}
                      >
                        {result.type === 'issue' ? (
                          <>
                            <MessageSquare className="h-4 w-4 text-blue-500" />
                            <div>
                              <div className="text-sm font-medium text-jira-gray-900">{result.title}</div>
                              {'key' in result && <div className="text-xs text-jira-gray-500">{result.key}</div>}
                            </div>
                          </>
                        ) : (
                          <>
                            <Search className="h-4 w-4 text-jira-gray-500" />
                            <div className="text-sm text-jira-gray-900">{result.title}</div>
                          </>
                        )}
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          )}
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
          asChild
          variant="ghost" 
          size="icon" 
          className="h-8 w-8 text-jira-gray-500 hover:text-jira-gray-700 hover:bg-jira-gray-100"
          data-testid="button-help"
        >
          <Link href="/help">
            <HelpCircle className="h-4 w-4" />
          </Link>
        </Button>

        {/* Settings */}
        <Button 
          asChild
          variant="ghost" 
          size="icon" 
          className="h-8 w-8 text-jira-gray-500 hover:text-jira-gray-700 hover:bg-jira-gray-100"
          data-testid="button-settings"
        >
          <Link href="/settings">
            <Settings className="h-4 w-4" />
          </Link>
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
            <DropdownMenuItem className="justify-center text-jira-blue font-medium" asChild>
              <Link href="/notifications" className="w-full text-center">
                View all notifications
              </Link>
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
            <DropdownMenuItem asChild>
              <Link href="/settings" className="w-full">Settings</Link>
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