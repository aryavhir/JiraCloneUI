import JiraHeader from '@/components/JiraHeader';
import JiraSidebar from '@/components/JiraSidebar';
import { Users, Plus, Mail, Shield } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { mockUsers } from '@/data/mockData';

interface Team {
  id: string;
  name: string;
  description: string;
  memberCount: number;
  projectCount: number;
  members: typeof mockUsers;
}

const mockTeams: Team[] = [
  {
    id: '1',
    name: 'Development Team',
    description: 'Core development and engineering team',
    memberCount: 5,
    projectCount: 3,
    members: mockUsers.slice(0, 3),
  },
  {
    id: '2',
    name: 'Design Team',
    description: 'UX/UI design and user research',
    memberCount: 3,
    projectCount: 2,
    members: mockUsers.slice(2, 4),
  },
  {
    id: '3',
    name: 'Product Team',
    description: 'Product management and strategy',
    memberCount: 2,
    projectCount: 4,
    members: mockUsers.slice(0, 2),
  },
];

export default function Teams() {
  return (
    <div className="h-screen bg-jira-gray-50 flex flex-col overflow-hidden">
      <JiraHeader />
      
      <div className="flex flex-1 overflow-hidden">
        <JiraSidebar />
        
        <main className="flex-1 overflow-y-auto">
          <div className="max-w-6xl mx-auto p-6">
            <div className="mb-6">
              <div className="flex items-center justify-between mb-2">
                <div className="flex items-center gap-3">
                  <Users className="h-6 w-6 text-jira-blue" />
                  <h1 className="text-2xl font-semibold text-jira-gray-900" data-testid="text-teams-title">
                    Teams
                  </h1>
                </div>
                <Button data-testid="button-create-team">
                  <Plus className="h-4 w-4 mr-2" />
                  Create Team
                </Button>
              </div>
              <p className="text-sm text-jira-gray-600">
                Manage your teams and collaborate effectively
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {mockTeams.map(team => (
                <Card key={team.id} className="hover:shadow-md transition-shadow">
                  <CardHeader>
                    <div className="flex items-start justify-between mb-2">
                      <div>
                        <CardTitle className="text-xl mb-1">{team.name}</CardTitle>
                        <CardDescription>{team.description}</CardDescription>
                      </div>
                      <Badge variant="secondary" className="text-xs">
                        {team.memberCount} members
                      </Badge>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div className="flex items-center justify-between text-sm">
                        <span className="text-jira-gray-600">Active Projects</span>
                        <span className="font-medium text-jira-gray-900">{team.projectCount}</span>
                      </div>

                      <div>
                        <h4 className="text-sm font-medium text-jira-gray-700 mb-3">Team Members</h4>
                        <div className="space-y-2">
                          {team.members.map((member, index) => (
                            <div key={member.id} className="flex items-center justify-between p-2 hover:bg-jira-gray-50 rounded">
                              <div className="flex items-center gap-2">
                                <Avatar className="h-8 w-8">
                                  <AvatarImage src={member.avatarUrl} alt={member.name} />
                                  <AvatarFallback className="bg-jira-blue text-white text-xs">
                                    {member.initials}
                                  </AvatarFallback>
                                </Avatar>
                                <div>
                                  <p className="text-sm font-medium text-jira-gray-900">{member.name}</p>
                                  <p className="text-xs text-jira-gray-600">{member.email}</p>
                                </div>
                              </div>
                              {index === 0 && (
                                <Badge variant="secondary" className="text-xs">
                                  <Shield className="h-3 w-3 mr-1" />
                                  Lead
                                </Badge>
                              )}
                            </div>
                          ))}
                          {team.memberCount > team.members.length && (
                            <div className="flex items-center gap-2 p-2 text-sm text-jira-gray-600">
                              <span>+{team.memberCount - team.members.length} more members</span>
                            </div>
                          )}
                        </div>
                      </div>

                      <div className="flex gap-2 pt-2">
                        <Button variant="outline" className="flex-1" data-testid={`button-view-${team.id}`}>
                          View Team
                        </Button>
                        <Button variant="ghost" size="icon" data-testid={`button-invite-${team.id}`}>
                          <Mail className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>

            <Card className="mt-6">
              <CardHeader>
                <CardTitle>All Team Members</CardTitle>
                <CardDescription>
                  Everyone across all teams in your organization
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  {mockUsers.map(user => (
                    <div key={user.id} className="flex items-center justify-between p-3 border border-jira-gray-200 rounded-lg hover:bg-jira-gray-50">
                      <div className="flex items-center gap-3">
                        <Avatar className="h-10 w-10">
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
                      <Button variant="ghost" size="sm" data-testid={`button-profile-${user.id}`}>
                        View Profile
                      </Button>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </main>
      </div>
    </div>
  );
}
