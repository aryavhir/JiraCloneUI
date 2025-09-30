import { useState } from 'react';
import { ChevronDown, ChevronRight, BarChart3, Settings, FolderOpen, Users, Zap, Search, Star, Clock, UserCheck } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { mockProjects } from '@/data/mockData';

interface SidebarItemProps {
  icon: React.ReactNode;
  label: string;
  isActive?: boolean;
  onClick?: () => void;
  hasSubmenu?: boolean;
  isExpanded?: boolean;
  onToggle?: () => void;
  children?: React.ReactNode;
  testId?: string;
}

function SidebarItem({ 
  icon, 
  label, 
  isActive = false, 
  onClick, 
  hasSubmenu = false, 
  isExpanded = false, 
  onToggle, 
  children,
  testId 
}: SidebarItemProps) {
  return (
    <div className="w-full">
      <Button
        variant="ghost"
        onClick={hasSubmenu ? onToggle : onClick}
        className={`w-full justify-start px-3 py-2 h-8 text-sm font-normal text-jira-gray-700 hover:bg-jira-gray-100 ${
          isActive ? 'bg-jira-blue-light text-jira-blue border-r-2 border-jira-blue' : ''
        }`}
        data-testid={testId}
      >
        <div className="flex items-center justify-between w-full">
          <div className="flex items-center space-x-2">
            {icon}
            <span className="text-left">{label}</span>
          </div>
          {hasSubmenu && (
            <div className="ml-auto">
              {isExpanded ? (
                <ChevronDown className="h-3 w-3 text-jira-gray-500" />
              ) : (
                <ChevronRight className="h-3 w-3 text-jira-gray-500" />
              )}
            </div>
          )}
        </div>
      </Button>
      {hasSubmenu && isExpanded && (
        <div className="ml-6 mt-1 space-y-1">
          {children}
        </div>
      )}
    </div>
  );
}

export default function JiraSidebar() {
  const [expandedItems, setExpandedItems] = useState<Record<string, boolean>>({
    projects: true,
    filters: false
  });
  const [activeItem, setActiveItem] = useState('board');

  const currentProject = mockProjects[0]; // todo: remove mock functionality

  const toggleExpanded = (key: string) => {
    setExpandedItems(prev => ({
      ...prev,
      [key]: !prev[key]
    }));
  };

  const handleItemClick = (item: string) => {
    console.log(`${item} clicked`);
    setActiveItem(item);
  };

  return (
    <aside className="w-64 bg-white border-r border-jira-gray-200 h-full overflow-y-auto">
      {/* Project Header */}
      <div className="p-4 border-b border-jira-gray-200">
        <div className="flex items-center space-x-3">
          <Avatar className="h-8 w-8">
            <AvatarImage src={currentProject.avatarUrl} alt={currentProject.name} />
            <AvatarFallback className="bg-jira-blue text-white text-sm font-medium">
              {currentProject.key.substring(0, 2)}
            </AvatarFallback>
          </Avatar>
          <div className="flex-1 min-w-0">
            <h2 className="text-sm font-medium text-jira-gray-900 truncate" data-testid="text-project-name">
              {currentProject.name}
            </h2>
            <p className="text-xs text-jira-gray-500" data-testid="text-project-type">
              Software project
            </p>
          </div>
        </div>
      </div>

      {/* Navigation Menu */}
      <nav className="p-2 space-y-1">
        {/* Planning */}
        <div className="mb-4">
          <div className="px-2 py-1 mb-2">
            <span className="text-xs font-semibold text-jira-gray-500 uppercase tracking-wide">
              Planning
            </span>
          </div>
          <SidebarItem
            icon={<BarChart3 className="h-4 w-4" />}
            label="Roadmap"
            onClick={() => handleItemClick('roadmap')}
            testId="nav-roadmap"
          />
          <SidebarItem
            icon={<FolderOpen className="h-4 w-4" />}
            label="Backlog"
            onClick={() => handleItemClick('backlog')}
            testId="nav-backlog"
          />
          <SidebarItem
            icon={<Zap className="h-4 w-4" />}
            label="Active sprints"
            isActive={activeItem === 'board'}
            onClick={() => handleItemClick('board')}
            testId="nav-active-sprints"
          />
        </div>

        {/* Development */}
        <div className="mb-4">
          <div className="px-2 py-1 mb-2">
            <span className="text-xs font-semibold text-jira-gray-500 uppercase tracking-wide">
              Development
            </span>
          </div>
          <SidebarItem
            icon={<BarChart3 className="h-4 w-4" />}
            label="Code"
            onClick={() => handleItemClick('code')}
            testId="nav-code"
          />
          <SidebarItem
            icon={<UserCheck className="h-4 w-4" />}
            label="Releases"
            onClick={() => handleItemClick('releases')}
            testId="nav-releases"
          />
        </div>


        

        {/* Project Settings */}
        <div className="pt-4 border-t border-jira-gray-200">
          <SidebarItem
            icon={<Settings className="h-4 w-4" />}
            label="Project settings"
            onClick={() => handleItemClick('settings')}
            testId="nav-project-settings"
          />
        </div>
      </nav>
    </aside>
  );
}