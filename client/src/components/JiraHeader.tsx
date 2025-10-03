import { useState } from 'react';
import { Search, Bell, HelpCircle, Settings, Plus, MessageSquare, GitPullRequest, CheckCircle, AlertCircle, Menu } from 'lucide-react';
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
  onMobileMenuToggle?: () => void;
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
    id: '4',
    type: 'complete',
    title: 'Issue completed',
    message: 'PROJ-2 was moved to Done by Jessica Williams',
    time: '2 days ago',
    read: true,
    icon: CheckCircle,
  },
];

export default function JiraHeader({ onMobileMenuToggle }: JiraHeaderProps) {
  const currentUser = mockUsers[0]; // todo: remove mock functionality
  const [searchQuery, setSearchQuery] = useState('');
  const [searchOpen, setSearchOpen] = useState(false);

  const handleSearch = (query: string) => {
    setSearchQuery(query);
    setSearchOpen(query.length > 0);
  };


  const unreadCount = mockNotifications.filter(n => !n.read).length;

  const allSearchItems = [
    // Sidebar Pages
    { type: 'page', title: 'Roadmap', path: '/roadmap', category: 'Pages' },
    { type: 'page', title: 'Backlog', path: '/backlog', category: 'Pages' },
    { type: 'page', title: 'Active Sprints', path: '/board', category: 'Pages' },
    { type: 'page', title: 'Code', path: '/code', category: 'Pages' },
    { type: 'page', title: 'Releases', path: '/releases', category: 'Pages' },
    { type: 'page', title: 'Projects', path: '/projects', category: 'Pages' },
    { type: 'page', title: 'Project Settings', path: '/settings', category: 'Pages' },
    
    // Topbar Pages
    { type: 'page', title: 'Your Work', path: '/your-work', category: 'Pages' },
    { type: 'page', title: 'Dashboard', path: '/dashboard', category: 'Pages' },
    { type: 'page', title: 'Teams', path: '/teams', category: 'Pages' },
    { type: 'page', title: 'Filters', path: '/filters', category: 'Pages' },
    { type: 'page', title: 'Notifications', path: '/notifications', category: 'Pages' },
    { type: 'page', title: 'Help', path: '/help', category: 'Pages' },
    
    // Issues
    { type: 'issue', key: 'PROJ-1', title: 'Set up user authentication system', category: 'Issues', path: '/board' },
    { type: 'issue', key: 'PROJ-2', title: 'Design dashboard wireframes', category: 'Issues', path: '/board' },
  ];

  const searchResults = searchQuery.length > 0 ? allSearchItems.filter(item => 
    item.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    ('key' in item && item.key && item.key.toLowerCase().includes(searchQuery.toLowerCase()))
  ) : [];

  return (
    <header className="h-14 bg-white border-b border-jira-gray-200 flex items-center justify-between px-3 sm:px-4 md:px-6 relative z-50">
      {/* Left section */}
      <div className="flex items-center space-x-2 sm:space-x-3 md:space-x-4 flex-1 min-w-0">
        {/* Mobile menu button */}
        <Button
          variant="ghost"
          size="sm"
          className="lg:hidden h-8 w-8 p-0 flex-shrink-0"
          onClick={onMobileMenuToggle}
          data-testid="button-mobile-menu"
        >
          <Menu className="h-5 w-5" />
        </Button>

        {/* Jira Logo */}
        <Link href="/">
          <div className="flex items-center space-x-2 cursor-pointer hover:opacity-80 transition-opacity flex-shrink-0">
            <img 
              src="/assets/jira-logo.jpg" 
              alt="Jira" 
              className="w-6 h-6 sm:w-7 sm:h-7 rounded object-cover"
            />
            <span className="hidden sm:inline font-semibold text-jira-gray-800 text-sm md:text-base">Jira</span>
          </div>
        </Link>

        {/* Global Search Bar */}
        <div className="flex-1 max-w-md mx-2 sm:mx-4 md:mx-8">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-jira-gray-400 h-4 w-4 pointer-events-none" />
            <Input
              type="search"
              placeholder="Search..."
              className="hidden md:block pl-10 pr-4 py-2 w-full h-9 bg-jira-gray-50 border-jira-gray-200 focus:border-jira-blue focus:ring-jira-blue focus:bg-white text-sm transition-colors"
              value={searchQuery}
              onChange={(e) => handleSearch(e.target.value)}
              onFocus={() => searchQuery && setSearchOpen(true)}
              data-testid="input-global-search"
            />
            {/* Mobile search icon */}
            <Button
              variant="ghost"
              size="sm"
              className="md:hidden h-8 w-8 p-0 flex-shrink-0"
              onClick={() => setSearchOpen(!searchOpen)}
              data-testid="button-mobile-search"
            >
              <Search className="h-5 w-5" />
            </Button>
            {searchOpen && searchResults.length > 0 && (
              <div className="absolute top-full left-0 right-0 mt-1 bg-white border border-jira-gray-200 rounded-md shadow-lg max-h-80 sm:max-h-96 overflow-y-auto z-50 w-screen sm:w-auto sm:min-w-[300px] -ml-3 sm:ml-0">
                {searchResults.map((result, idx) => (
                  <div key={idx}>
                    {idx === 0 && (
                      <div className="px-3 py-2 text-xs font-semibold text-jira-gray-500 uppercase sticky top-0 bg-white">
                        {result.category}
                      </div>
                    )}
                    {idx > 0 && searchResults[idx - 1].category !== result.category && (
                      <div className="px-3 py-2 text-xs font-semibold text-jira-gray-500 uppercase border-t border-jira-gray-200 sticky top-0 bg-white">
                        {result.category}
                      </div>
                    )}
                    <Link 
                      href={result.type === 'page' ? result.path : '/board'}
                      onClick={() => setSearchOpen(false)}
                    >
                      <div className="px-3 py-2 hover:bg-jira-gray-50 cursor-pointer active:bg-jira-gray-100 transition-colors">
                        <div className="text-sm text-jira-gray-900 font-medium">{result.title}</div>
                        {'key' in result && result.key && (
                          <div className="text-xs text-jira-gray-500 mt-0.5">{result.key}</div>
                        )}
                      </div>
                    </Link>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Navigation */}
        <nav className="hidden lg:flex items-center space-x-2 xl:space-x-4 flex-shrink-0">
          
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="sm" className="text-jira-gray-700 hover:text-jira-blue hover:bg-jira-blue-light transition-colors">
              <span className="gradient-text text-sm">Projects</span>

              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="start" className="w-64">
              <DropdownMenuLabel>Recent projects</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem asChild>
                <a 
  href="https://aryavhir.in" 
  target="_blank" 
  rel="noopener noreferrer" 
  className="w-full"
>
  Portfolio-Website
</a>
              </DropdownMenuItem>
              <DropdownMenuItem asChild>
                 <a 
  href="https://modelia-project.vercel.app/" 
  target="_blank" 
  rel="noopener noreferrer" 
  className="w-full"
>AI-studio</a>
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem className="text-jira-blue" asChild>
                <Link href="/projects" className="w-full">View all projects</Link>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
          
        
          
          <Button asChild variant="ghost" size="sm" className="text-jira-gray-700 hover:text-jira-blue hover:bg-jira-blue-light transition-colors">
            <Link href="/dashboard">Dashboards</Link>
          </Button>
          
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="sm" className="text-jira-gray-700 hover:text-jira-blue hover:bg-jira-blue-light transition-colors">
                  
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
      <div className="flex items-center space-x-1 sm:space-x-2 flex-shrink-0">
      

    

        {/* Help */}
        <Button 
          asChild
          variant="ghost" 
          size="icon" 
          className="hidden sm:flex h-8 w-8 text-jira-gray-500 hover:text-jira-gray-700 hover:bg-jira-gray-100 transition-colors"
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
          className="hidden sm:flex h-8 w-8 text-jira-gray-500 hover:text-jira-gray-700 hover:bg-jira-gray-100 transition-colors"
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
              className="h-8 w-8 text-jira-gray-500 hover:text-jira-gray-700 hover:bg-jira-gray-100 relative transition-colors"
              data-testid="button-notifications"
            >
              <Bell className="h-4 w-4" />
              {unreadCount > 0 && (
                <span className="absolute -top-0.5 -right-0.5 h-4 w-4 bg-red-500 rounded-full text-white text-[10px] flex items-center justify-center font-medium">
                  {unreadCount}
                </span>
              )}
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-80 sm:w-96">
            <DropdownMenuLabel className="flex items-center justify-between">
              <span>Notifications</span>
              {unreadCount > 0 && (
                <Badge variant="secondary" className="ml-2">{unreadCount} new</Badge>
              )}
            </DropdownMenuLabel>
            <DropdownMenuSeparator />
            <div className="max-h-[60vh] sm:max-h-96 overflow-y-auto">
              {mockNotifications.map(notification => {
                const IconComponent = notification.icon;
                return (
                  <DropdownMenuItem 
                    key={notification.id} 
                    className={`p-3 cursor-pointer transition-colors ${!notification.read ? 'bg-blue-50' : ''}`}
                    onClick={() => window.location.href = '/notifications'}
                  >
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
            <Button variant="ghost" size="icon" className="h-8 w-8 transition-opacity hover:opacity-80" data-testid="button-user-menu">
              <Avatar className="h-6 w-6 sm:h-7 sm:w-7">
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
            
            <DropdownMenuItem asChild>
              <Link href="/settings" className="w-full">Settings</Link>
            </DropdownMenuItem>
            <DropdownMenuSeparator />

          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </header>
  );
}