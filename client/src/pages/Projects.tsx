import JiraHeader from '@/components/JiraHeader';
import JiraSidebar from '@/components/JiraSidebar';
import { Folder, Plus, Star, Clock, Users, ExternalLink } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { mockProjects, mockIssues, mockUsers } from '@/data/mockData';
import { Link } from 'wouter';

export default function Projects() {
  const recentProjects = mockProjects;
  const starredProjects = mockProjects.slice(0, 1);

  return (
    <div className="h-screen bg-jira-gray-50 flex flex-col overflow-hidden">
      <JiraHeader />
      
      <div className="flex flex-1 overflow-hidden">
        <JiraSidebar />
        
        <main className="flex-1 overflow-y-auto">
          <div className="max-w-6xl mx-auto p-6">
            <div className="mb-6">
              <div className="flex items-center justify-between mb-2">
                <h1 className="text-2xl font-semibold text-jira-gray-900" data-testid="text-projects-title">
                  Projects
                </h1>
                <Button data-testid="button-create-project">
                  <Plus className="h-4 w-4 mr-2" />
                  Create Project
                </Button>
              </div>
              <p className="text-sm text-jira-gray-600">
                Browse and manage all your projects
              </p>
            </div>

            <Tabs defaultValue="recent" className="w-full">
              <TabsList className="mb-6" data-testid="tabs-projects">
                <TabsTrigger value="recent" data-testid="tab-recent">
                  <Clock className="h-4 w-4 mr-2" />
                  Recent
                </TabsTrigger>
                <TabsTrigger value="starred" data-testid="tab-starred">
                  <Star className="h-4 w-4 mr-2" />
                  Current
                </TabsTrigger>
                <TabsTrigger value="all" data-testid="tab-all">
                  <Folder className="h-4 w-4 mr-2" />
                  All Projects
                </TabsTrigger>
              </TabsList>

              <TabsContent value="recent" className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {recentProjects.map(project => {
                    const projectIssues = mockIssues.filter(issue => issue.project.id === project.id);
                    const activeIssues = projectIssues.filter(issue => issue.status !== 'done').length;
                    
                    return (
                      <Card key={project.id} className="hover:shadow-md transition-shadow">
                        <CardHeader>
                          <div className="flex items-start justify-between">
                            <div className="flex items-center gap-3">
                              <Avatar className="w-10 h-10">
                                <AvatarImage src={project.avatarUrl || '/assets/jira-logo.jpg'} alt={project.name} />
                                <AvatarFallback className="bg-jira-blue text-white font-bold text-sm">
                                  {project.key}
                                </AvatarFallback>
                              </Avatar>
                              <div>
                                <CardTitle className="text-lg">{project.name}</CardTitle>
                                <CardDescription className="text-xs">
                                  {project.category} • {project.type}
                                </CardDescription>
                              </div>
                            </div>
                            <Button variant="ghost" size="icon" className="h-8 w-8">
                              <Star className="h-4 w-4" />
                            </Button>
                          </div>
                        </CardHeader>
                        <CardContent>
                          <p className="text-sm text-jira-gray-600 mb-4 line-clamp-2">
                            {project.description}
                          </p>
                          
                          <div className="flex items-center justify-between mb-4">
                            <div className="flex items-center gap-4 text-sm">
                              <div>
                                <span className="font-medium text-jira-gray-900">{activeIssues}</span>
                                <span className="text-jira-gray-600 ml-1">Active</span>
                              </div>
                              <div>
                                <span className="font-medium text-jira-gray-900">{projectIssues.length}</span>
                                <span className="text-jira-gray-600 ml-1">Total</span>
                              </div>
                            </div>
                          </div>

                          <div className="flex items-center justify-between">
                            <div className="flex items-center gap-2">
                              <Avatar className="h-6 w-6">
                                <AvatarImage src={project.lead.avatarUrl} alt={project.lead.name} />
                                <AvatarFallback className="bg-jira-blue text-white text-xs">
                                  {project.lead.initials}
                                </AvatarFallback>
                              </Avatar>
                              <span className="text-xs text-jira-gray-600">{project.lead.name}</span>
                            </div>
                            <a href={project.ProjectUrl || '/board'} target={project.ProjectUrl ? '_blank' : '_self'} rel="noopener noreferrer">
                              <Button variant="outline" size="sm" data-testid={`button-view-${project.key}`}>
                                {project.ProjectUrl && <ExternalLink className="h-4 w-4 mr-1" />}
                                {project.ProjectUrl ? 'View Project' : 'View Board'}
                              </Button>
                            </a>
                          </div>
                        </CardContent>
                      </Card>
                    );
                  })}
                </div>
              </TabsContent>

              <TabsContent value="starred" className="space-y-4">
                {starredProjects.length === 0 ? (
                  <div className="text-center py-12">
                    <Star className="h-12 w-12 text-jira-gray-400 mx-auto mb-4" />
                    <p className="text-jira-gray-600">No starred projects yet</p>
                    <p className="text-sm text-jira-gray-500 mt-2">
                      Star projects to quickly find them here
                    </p>
                  </div>
                ) : (
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {starredProjects.map(project => {
                      const projectIssues = mockIssues.filter(issue => issue.project.id === project.id);
                      const activeIssues = projectIssues.filter(issue => issue.status !== 'done').length;
                      
                      return (
                        <Card key={project.id} className="hover:shadow-md transition-shadow">
                          <CardHeader>
                            <div className="flex items-start justify-between">
                              <div className="flex items-center gap-3">
                                <Avatar className="w-10 h-10">
                                  <AvatarImage src={project.avatarUrl || '/assets/jira-logo.jpg'} alt={project.name} />
                                  <AvatarFallback className="bg-jira-blue text-white font-bold text-sm">
                                    {project.key}
                                  </AvatarFallback>
                                </Avatar>
                                <div>
                                  <CardTitle className="text-lg">{project.name}</CardTitle>
                                  <CardDescription className="text-xs">
                                    {project.category} • {project.type}
                                  </CardDescription>
                                </div>
                              </div>
                              <Button variant="ghost" size="icon" className="h-8 w-8">
                                <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                              </Button>
                            </div>
                          </CardHeader>
                          <CardContent>
                            <p className="text-sm text-jira-gray-600 mb-4 line-clamp-2">
                              {project.description}
                            </p>
                            
                            <div className="flex items-center justify-between mb-4">
                              <div className="flex items-center gap-4 text-sm">
                                <div>
                                  <span className="font-medium text-jira-gray-900">{activeIssues}</span>
                                  <span className="text-jira-gray-600 ml-1">Active</span>
                                </div>
                                <div>
                                  <span className="font-medium text-jira-gray-900">{projectIssues.length}</span>
                                  <span className="text-jira-gray-600 ml-1">Total</span>
                                </div>
                              </div>
                            </div>

                            <div className="flex items-center justify-between">
                              <div className="flex items-center gap-2">
                                <Avatar className="h-6 w-6">
                                  <AvatarImage src={project.lead.avatarUrl} alt={project.lead.name} />
                                  <AvatarFallback className="bg-jira-blue text-white text-xs">
                                    {project.lead.initials}
                                  </AvatarFallback>
                                </Avatar>
                                <span className="text-xs text-jira-gray-600">{project.lead.name}</span>
                              </div>
                              <a href={project.ProjectUrl || '/board'} target={project.ProjectUrl ? '_blank' : '_self'} rel="noopener noreferrer">
                                <Button variant="outline" size="sm">
                                  {project.ProjectUrl && <ExternalLink className="h-4 w-4 mr-1" />}
                                  {project.ProjectUrl ? 'View Project' : 'View Board'}
                                </Button>
                              </a>
                            </div>
                          </CardContent>
                        </Card>
                      );
                    })}
                  </div>
                )}
              </TabsContent>

              <TabsContent value="all" className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {mockProjects.map(project => {
                    const projectIssues = mockIssues.filter(issue => issue.project.id === project.id);
                    const activeIssues = projectIssues.filter(issue => issue.status !== 'done').length;
                    
                    return (
                      <Card key={project.id} className="hover:shadow-md transition-shadow">
                        <CardHeader>
                          <div className="flex items-start justify-between">
                            <div className="flex items-center gap-3">
                              <Avatar className="w-10 h-10">
                                <AvatarImage src={project.avatarUrl || '/assets/jira-logo.jpg'} alt={project.name} />
                                <AvatarFallback className="bg-jira-blue text-white font-bold text-sm">
                                  {project.key}
                                </AvatarFallback>
                              </Avatar>
                              <div>
                                <CardTitle className="text-lg">{project.name}</CardTitle>
                                <CardDescription className="text-xs">
                                  {project.category} • {project.type}
                                </CardDescription>
                              </div>
                            </div>
                            <Button variant="ghost" size="icon" className="h-8 w-8">
                              <Star className="h-4 w-4" />
                            </Button>
                          </div>
                        </CardHeader>
                        <CardContent>
                          <p className="text-sm text-jira-gray-600 mb-4 line-clamp-2">
                            {project.description}
                          </p>
                          
                          <div className="flex items-center justify-between mb-4">
                            <div className="flex items-center gap-4 text-sm">
                              <div>
                                <span className="font-medium text-jira-gray-900">{activeIssues}</span>
                                <span className="text-jira-gray-600 ml-1">Active</span>
                              </div>
                              <div>
                                <span className="font-medium text-jira-gray-900">{projectIssues.length}</span>
                                <span className="text-jira-gray-600 ml-1">Total</span>
                              </div>
                            </div>
                          </div>

                          <div className="flex items-center justify-between">
                            <div className="flex items-center gap-2">
                              <Avatar className="h-6 w-6">
                                <AvatarImage src={project.lead.avatarUrl} alt={project.lead.name} />
                                <AvatarFallback className="bg-jira-blue text-white text-xs">
                                  {project.lead.initials}
                                </AvatarFallback>
                              </Avatar>
                              <span className="text-xs text-jira-gray-600">{project.lead.name}</span>
                            </div>
                            <a href={project.ProjectUrl || '/board'} target={project.ProjectUrl ? '_blank' : '_self'} rel="noopener noreferrer">
                              <Button variant="outline" size="sm">
                                {project.ProjectUrl && <ExternalLink className="h-4 w-4 mr-1" />}
                                {project.ProjectUrl ? 'View Project' : 'View Board'}
                              </Button>
                            </a>
                          </div>
                        </CardContent>
                      </Card>
                    );
                  })}
                </div>
              </TabsContent>
            </Tabs>
          </div>
        </main>
      </div>
    </div>
  );
}
