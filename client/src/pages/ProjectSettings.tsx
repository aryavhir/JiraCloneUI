import JiraHeader from '@/components/JiraHeader';
import JiraSidebar from '@/components/JiraSidebar';
import { Settings, Users, Tag, Flag, Workflow, Archive, Trash2, Plus, X, Edit, AlertTriangle } from 'lucide-react';
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
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { mockProjects, mockUsers } from '@/data/mockData';
import { useState } from 'react';
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle } from '@/components/ui/alert-dialog';
import { useWorkflow } from '@/contexts/WorkflowContext';

export default function ProjectSettings() {
  const project = mockProjects[0];
  const [projectName, setProjectName] = useState(project.name);
  const [projectDescription, setProjectDescription] = useState(project.description);
  const [projectKey, setProjectKey] = useState(project.key);
  
  // Team management state
  const [teamMembers, setTeamMembers] = useState(mockUsers);
  const [showAddMember, setShowAddMember] = useState(false);
  const [selectedUser, setSelectedUser] = useState('');
  
  // Labels management state
  const [labels, setLabels] = useState(['backend', 'frontend', 'design', 'ux', 'database', 'security', 'api', 'performance']);
  const [showCreateLabel, setShowCreateLabel] = useState(false);
  const [showEditLabel, setShowEditLabel] = useState(false);
  const [newLabelName, setNewLabelName] = useState('');
  const [editingLabel, setEditingLabel] = useState('');
  const [editedLabelName, setEditedLabelName] = useState('');
  
  // Workflow management state - using context
  const { columns, addColumn } = useWorkflow();
  const [showAddColumn, setShowAddColumn] = useState(false);
  const [newColumnTitle, setNewColumnTitle] = useState('');
  const [newColumnStatus, setNewColumnStatus] = useState('');
  const [newColumnLimit, setNewColumnLimit] = useState('');
  
  // Delete warning state
  const [showDeleteWarning, setShowDeleteWarning] = useState(false);

  const handleAddMember = () => {
    if (selectedUser) {
      const user = mockUsers.find(u => u.id === selectedUser);
      if (user && !teamMembers.find(m => m.id === user.id)) {
        setTeamMembers([...teamMembers, user]);
      }
      setShowAddMember(false);
      setSelectedUser('');
    }
  };

  const handleRemoveMember = (userId: string) => {
    setTeamMembers(teamMembers.filter(m => m.id !== userId));
  };

  const handleCreateLabel = () => {
    if (newLabelName.trim() && !labels.includes(newLabelName.trim())) {
      setLabels([...labels, newLabelName.trim()]);
      setNewLabelName('');
      setShowCreateLabel(false);
    }
  };

  const handleEditLabel = () => {
    if (editedLabelName.trim() && !labels.includes(editedLabelName.trim())) {
      setLabels(labels.map(l => l === editingLabel ? editedLabelName.trim() : l));
      setShowEditLabel(false);
      setEditingLabel('');
      setEditedLabelName('');
    }
  };

  const handleDeleteLabel = (label: string) => {
    setLabels(labels.filter(l => l !== label));
  };

  const handleAddColumn = () => {
    if (newColumnTitle.trim() && newColumnStatus.trim()) {
      const newColumn = {
        id: (columns.length + 1).toString(),
        title: newColumnTitle.toUpperCase(),
        status: newColumnStatus as any,
        issues: [],
        limit: newColumnLimit ? parseInt(newColumnLimit) : undefined
      };
      addColumn(newColumn);
      setShowAddColumn(false);
      setNewColumnTitle('');
      setNewColumnStatus('');
      setNewColumnLimit('');
    }
  };

  const availableUsers = mockUsers.filter(u => !teamMembers.find(m => m.id === u.id));

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
                      <Button 
                        variant="destructive" 
                        size="sm" 
                        data-testid="button-delete"
                        onClick={() => setShowDeleteWarning(true)}
                      >
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
                      <Button onClick={() => setShowAddMember(true)} data-testid="button-add-member">
                        <Plus className="h-4 w-4 mr-2" />
                        Add Member
                      </Button>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3">
                      {teamMembers.map((user, index) => (
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
                            {index !== 0 && (
                              <Button 
                                variant="ghost" 
                                size="sm" 
                                onClick={() => handleRemoveMember(user.id)}
                                data-testid={`button-remove-${user.id}`}
                              >
                                Remove
                              </Button>
                            )}
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
                      <Button onClick={() => setShowCreateLabel(true)} data-testid="button-create-label">
                        <Plus className="h-4 w-4 mr-2" />
                        Create Label
                      </Button>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3">
                      {labels.map((label) => (
                        <div key={label} className="flex items-center justify-between p-3 border border-jira-gray-200 rounded-md">
                          <div className="flex items-center gap-3">
                            <Badge variant="secondary" className="text-sm">{label}</Badge>
                            <span className="text-sm text-jira-gray-600">Used in 3 issues</span>
                          </div>
                          <div className="flex gap-2">
                            <Button 
                              variant="ghost" 
                              size="sm" 
                              onClick={() => {
                                setEditingLabel(label);
                                setEditedLabelName(label);
                                setShowEditLabel(true);
                              }}
                              data-testid={`button-edit-${label}`}
                            >
                              <Edit className="h-4 w-4 mr-1" />
                              Edit
                            </Button>
                            <Button 
                              variant="ghost" 
                              size="sm" 
                              onClick={() => handleDeleteLabel(label)}
                              data-testid={`button-delete-${label}`}
                            >
                              <Trash2 className="h-4 w-4 mr-1 text-red-600" />
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
                      {columns.map((column) => (
                        <div key={column.id} className="p-4 border border-jira-gray-200 rounded-md">
                          <div className="flex items-center justify-between mb-3">
                            <h4 className="font-medium text-jira-gray-900">Column: {column.title}</h4>
                            <Badge variant="secondary">Status: {column.status}</Badge>
                          </div>
                          <div className="flex items-center justify-between">
                            <span className="text-sm text-jira-gray-600">
                              WIP Limit: {column.limit || 'None'}
                            </span>
                            <Button variant="ghost" size="sm">Configure</Button>
                          </div>
                        </div>
                      ))}

                      <Button 
                        variant="outline" 
                        className="w-full" 
                        onClick={() => setShowAddColumn(true)}
                        data-testid="button-add-column"
                      >
                        <Plus className="h-4 w-4 mr-2" />
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

      {/* Add Member Dialog */}
      <Dialog open={showAddMember} onOpenChange={setShowAddMember}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Add Team Member</DialogTitle>
            <DialogDescription>
              Select a user to add to this project
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4 py-4">
            <Select value={selectedUser} onValueChange={setSelectedUser}>
              <SelectTrigger>
                <SelectValue placeholder="Select a user" />
              </SelectTrigger>
              <SelectContent>
                {availableUsers.map((user) => (
                  <SelectItem key={user.id} value={user.id}>
                    <div className="flex items-center gap-2">
                      <Avatar className="h-6 w-6">
                        <AvatarFallback className="bg-jira-blue text-white text-xs">
                          {user.initials}
                        </AvatarFallback>
                      </Avatar>
                      <span>{user.name}</span>
                    </div>
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setShowAddMember(false)}>Cancel</Button>
            <Button onClick={handleAddMember}>Add Member</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Create Label Dialog */}
      <Dialog open={showCreateLabel} onOpenChange={setShowCreateLabel}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Create Label</DialogTitle>
            <DialogDescription>
              Enter a name for the new label
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4 py-4">
            <div className="space-y-2">
              <Label htmlFor="new-label">Label Name</Label>
              <Input
                id="new-label"
                value={newLabelName}
                onChange={(e) => setNewLabelName(e.target.value)}
                placeholder="e.g., bug-fix, feature"
              />
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setShowCreateLabel(false)}>Cancel</Button>
            <Button onClick={handleCreateLabel}>Create</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Edit Label Dialog */}
      <Dialog open={showEditLabel} onOpenChange={setShowEditLabel}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Edit Label</DialogTitle>
            <DialogDescription>
              Update the label name
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4 py-4">
            <div className="space-y-2">
              <Label htmlFor="edit-label">Label Name</Label>
              <Input
                id="edit-label"
                value={editedLabelName}
                onChange={(e) => setEditedLabelName(e.target.value)}
              />
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setShowEditLabel(false)}>Cancel</Button>
            <Button onClick={handleEditLabel}>Save</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Add Column Dialog */}
      <Dialog open={showAddColumn} onOpenChange={setShowAddColumn}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Add Workflow Column</DialogTitle>
            <DialogDescription>
              Create a new column for your workflow
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4 py-4">
            <div className="space-y-2">
              <Label htmlFor="column-title">Column Title</Label>
              <Input
                id="column-title"
                value={newColumnTitle}
                onChange={(e) => setNewColumnTitle(e.target.value)}
                placeholder="e.g., In Review"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="column-status">Status Value</Label>
              <Input
                id="column-status"
                value={newColumnStatus}
                onChange={(e) => setNewColumnStatus(e.target.value)}
                placeholder="e.g., in-review"
              />
              <p className="text-xs text-jira-gray-500">
                Use lowercase with hyphens (e.g., in-review, ready-to-deploy)
              </p>
            </div>
            <div className="space-y-2">
              <Label htmlFor="column-limit">WIP Limit (optional)</Label>
              <Input
                id="column-limit"
                type="number"
                value={newColumnLimit}
                onChange={(e) => setNewColumnLimit(e.target.value)}
                placeholder="e.g., 5"
              />
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setShowAddColumn(false)}>Cancel</Button>
            <Button onClick={handleAddColumn}>Add Column</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Delete Warning Dialog */}
      <AlertDialog open={showDeleteWarning} onOpenChange={setShowDeleteWarning}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <div className="flex items-center gap-3">
              <div className="h-12 w-18 rounded-full bg-red-100 flex items-center justify-center">
                <AlertTriangle className="h-6 w-6 text-red-600" />
              </div>
              <div>
                <AlertDialogTitle>Please Don't Do That!</AlertDialogTitle>
                <AlertDialogDescription>
                  Deleting this project would remove all issues, comments, and history. This action cannot be undone. Are you absolutely sure you want to proceed?
                </AlertDialogDescription>
              </div>
            </div>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>I Changed My Mind</AlertDialogCancel>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
}
