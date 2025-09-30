import JiraHeader from '@/components/JiraHeader';
import JiraSidebar from '@/components/JiraSidebar';
import { Settings, Users, Tag, Flag, Workflow, Archive, Trash2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { Switch } from '@/components/ui/switch';
import { Separator } from '@/components/ui/separator';
import { mockProjects, mockUsers } from '@/data/mockData';
import { useState } from 'react';

export default function ProjectSettings() {
  const project = mockProjects[0];
  const [projectName, setProjectName] = useState(project.name);
  const [projectDescription, setProjectDescription] = useState(project.description);
  const [projectKey, setProjectKey] = useState(project.key);

  return (
    <div className="h-screen bg-jira-gray-50 flex flex-col overflow-hidden">
      <JiraHeader />
      
      <div className="flex flex-1 overflow-hidden">
        <JiraSidebar />
        
        <main className="flex-1 overflow-y-auto">
          <div className="max-w-5xl mx-auto p-6">
            <div className="mb-6">
              <div className="flex items-center gap-3 mb-2">
                <Settings className="h-6 w-6 text-jira-gray-600" />
                <h1 className="text-2xl font-semibold text-jira-gray-900" data-testid="text-settings-title">
                  Project Settings
                </h1>
              </div>
              <p className="text-sm text-jira-gray-600">
                Configure your project settings, team members, and workflows
              </p>
            </div>

            <Tabs defaultValue="details" className="w-full">
              <TabsList className="mb-6" data-testid="tabs-settings">
                <TabsTrigger value="details" data-testid="tab-details">
                  <Settings className="h-4 w-4 mr-2" />
                  Details
                </TabsTrigger>
                <TabsTrigger value="team" data-testid="tab-team">
                  <Users className="h-4 w-4 mr-2" />
                  Team
                </TabsTrigger>
                <TabsTrigger value="labels" data-testid="tab-labels">
                  <Tag className="h-4 w-4 mr-2" />
                  Labels
                </TabsTrigger>
                <TabsTrigger value="workflow" data-testid="tab-workflow">
                  <Workflow className="h-4 w-4 mr-2" />
                  Workflow
                </TabsTrigger>
              </TabsList>

              <TabsContent value="details" className="space-y-6">
                <Card>
                  <CardHeader>
                    <CardTitle>Project Information</CardTitle>
                    <CardDescription>
                      Update your project's basic information
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="project-name">Project Name *</Label>
                      <Input
                        id="project-name"
                        value={projectName}
                        onChange={(e) => setProjectName(e.target.value)}
                        data-testid="input-project-name"
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="project-key">Project Key *</Label>
                      <Input
                        id="project-key"
                        value={projectKey}
                        onChange={(e) => setProjectKey(e.target.value)}
                        maxLength={10}
                        data-testid="input-project-key"
                      />
                      <p className="text-xs text-jira-gray-500">
                        This is used as a prefix for issue keys (e.g., PROJ-123)
                      </p>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="project-description">Description</Label>
                      <Textarea
                        id="project-description"
                        value={projectDescription}
                        onChange={(e) => setProjectDescription(e.target.value)}
                        rows={4}
                        data-testid="textarea-project-description"
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="project-category">Category</Label>
                      <Input
                        id="project-category"
                        value={project.category}
                        readOnly
                        data-testid="input-project-category"
                      />
                    </div>

                    <Separator />

                    <div className="flex gap-3">
                      <Button data-testid="button-save-details">Save Changes</Button>
                      <Button variant="outline" data-testid="button-cancel-details">Cancel</Button>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle className="text-red-600">Danger Zone</CardTitle>
                    <CardDescription>
                      Irreversible actions for this project
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    <div className="flex items-center justify-between p-3 border border-jira-gray-200 rounded-md">
                      <div>
                        <p className="font-medium text-jira-gray-900">Archive Project</p>
                        <p className="text-sm text-jira-gray-600">Archive this project and all its issues</p>
                      </div>
                      <Button variant="outline" size="sm" data-testid="button-archive">
                        <Archive className="h-4 w-4 mr-2" />
                        Archive
                      </Button>
                    </div>

                    <div className="flex items-center justify-between p-3 border border-red-200 rounded-md">
                      <div>
                        <p className="font-medium text-red-600">Delete Project</p>
                        <p className="text-sm text-jira-gray-600">Permanently delete this project</p>
                      </div>
                      <Button variant="destructive" size="sm" data-testid="button-delete">
                        <Trash2 className="h-4 w-4 mr-2" />
                        Delete
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="team" className="space-y-6">
                <Card>
                  <CardHeader>
                    <div className="flex items-center justify-between">
                      <div>
                        <CardTitle>Team Members</CardTitle>
                        <CardDescription>
                          Manage who has access to this project
                        </CardDescription>
                      </div>
                      <Button data-testid="button-add-member">Add Member</Button>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3">
                      {mockUsers.map((user, index) => (
                        <div key={user.id} className="flex items-center justify-between p-3 border border-jira-gray-200 rounded-md">
                          <div className="flex items-center gap-3">
                            <Avatar>
                              <AvatarImage src={user.avatarUrl} alt={user.name} />
                              <AvatarFallback className="bg-jira-blue text-white">
                                {user.initials}
                              </AvatarFallback>
                            </Avatar>
                            <div>
                              <p className="font-medium text-jira-gray-900">{user.name}</p>
                              <p className="text-sm text-jira-gray-600">{user.email}</p>
                            </div>
                          </div>
                          <div className="flex items-center gap-3">
                            {index === 0 && (
                              <Badge variant="secondary">Project Lead</Badge>
                            )}
                            <Button variant="ghost" size="sm" data-testid={`button-remove-${user.id}`}>
                              Remove
                            </Button>
                          </div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="labels" className="space-y-6">
                <Card>
                  <CardHeader>
                    <div className="flex items-center justify-between">
                      <div>
                        <CardTitle>Issue Labels</CardTitle>
                        <CardDescription>
                          Create and manage labels for categorizing issues
                        </CardDescription>
                      </div>
                      <Button data-testid="button-create-label">Create Label</Button>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3">
                      {['backend', 'frontend', 'design', 'ux', 'database', 'security', 'api', 'performance'].map((label) => (
                        <div key={label} className="flex items-center justify-between p-3 border border-jira-gray-200 rounded-md">
                          <div className="flex items-center gap-3">
                            <Badge variant="secondary" className="text-sm">{label}</Badge>
                            <span className="text-sm text-jira-gray-600">Used in 3 issues</span>
                          </div>
                          <div className="flex gap-2">
                            <Button variant="ghost" size="sm" data-testid={`button-edit-${label}`}>
                              Edit
                            </Button>
                            <Button variant="ghost" size="sm" data-testid={`button-delete-${label}`}>
                              Delete
                            </Button>
                          </div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="workflow" className="space-y-6">
                <Card>
                  <CardHeader>
                    <CardTitle>Workflow Configuration</CardTitle>
                    <CardDescription>
                      Configure the workflow stages for your project
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div className="p-4 border border-jira-gray-200 rounded-md">
                        <div className="flex items-center justify-between mb-3">
                          <h4 className="font-medium text-jira-gray-900">Column: TO DO</h4>
                          <Badge variant="secondary">Status: to-do</Badge>
                        </div>
                        <div className="flex items-center justify-between">
                          <span className="text-sm text-jira-gray-600">WIP Limit: 10</span>
                          <Button variant="ghost" size="sm">Configure</Button>
                        </div>
                      </div>

                      <div className="p-4 border border-jira-gray-200 rounded-md">
                        <div className="flex items-center justify-between mb-3">
                          <h4 className="font-medium text-jira-gray-900">Column: IN PROGRESS</h4>
                          <Badge variant="secondary">Status: in-progress</Badge>
                        </div>
                        <div className="flex items-center justify-between">
                          <span className="text-sm text-jira-gray-600">WIP Limit: 3</span>
                          <Button variant="ghost" size="sm">Configure</Button>
                        </div>
                      </div>

                      <div className="p-4 border border-jira-gray-200 rounded-md">
                        <div className="flex items-center justify-between mb-3">
                          <h4 className="font-medium text-jira-gray-900">Column: DONE</h4>
                          <Badge variant="secondary">Status: done</Badge>
                        </div>
                        <div className="flex items-center justify-between">
                          <span className="text-sm text-jira-gray-600">WIP Limit: None</span>
                          <Button variant="ghost" size="sm">Configure</Button>
                        </div>
                      </div>

                      <Button variant="outline" className="w-full" data-testid="button-add-column">
                        Add Column
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
            </Tabs>
          </div>
        </main>
      </div>
    </div>
  );
}
