import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { BarChart3, TrendingUp, Clock, CheckCircle2, AlertCircle, Users, Calendar, Activity } from "lucide-react";
import { Link } from "wouter";
import JiraHeader from "@/components/JiraHeader";
import JiraSidebar from "@/components/JiraSidebar";

export default function Dashboard() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  // todo: remove mock functionality
  const projectStats = {
    totalIssues: 45,
    completedIssues: 23,
    inProgressIssues: 12,
    todoIssues: 10,
    averageVelocity: 24,
    sprintProgress: 68
  };

  const recentActivity = [
    {
      id: "1",
      type: "issue_created",
      message: "Alice Smith created PROJ-106",
      timestamp: "2 hours ago",
      user: { name: "Alice Smith", avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=alice" }
    },
    {
      id: "2", 
      type: "issue_completed",
      message: "Bob Johnson completed PROJ-102",
      timestamp: "4 hours ago",
      user: { name: "Bob Johnson", avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=bob" }
    },
    {
      id: "3",
      type: "comment_added",
      message: "Carol Davis commented on PROJ-103",
      timestamp: "6 hours ago", 
      user: { name: "Carol Davis", avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=carol" }
    }
  ];

  const upcomingDeadlines = [
    { id: "1", title: "Sprint 3 Review", date: "Tomorrow", type: "sprint" },
    { id: "2", title: "Feature Demo", date: "Friday", type: "demo" },
    { id: "3", title: "Release v2.1", date: "Next Monday", type: "release" }
  ];

  const assignedToMe = [
    { id: "1", key: "PROJ-101", summary: "Create user authentication system", priority: "high" as const },
    { id: "2", key: "PROJ-108", summary: "Fix mobile responsive layout", priority: "medium" as const },
    { id: "3", key: "PROJ-109", summary: "Update team documentation", priority: "low" as const }
  ];

  return (
    <div className="min-h-screen bg-jira-gray-50 flex flex-col overflow-x-hidden">
      <JiraHeader onMobileMenuToggle={() => setIsMobileMenuOpen(!isMobileMenuOpen)} />
      
      <div className="flex flex-1 overflow-x-hidden">
        <JiraSidebar 
          isMobileMenuOpen={isMobileMenuOpen}
          onMobileMenuClose={() => setIsMobileMenuOpen(false)}
        />
        <main className="p-3 sm:p-6 space-y-4 sm:space-y-6 flex-1 overflow-y-auto" data-testid="page-dashboard">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between space-y-3 sm:space-y-0">
        <div>
          <h1 className="text-xl sm:text-2xl font-bold" data-testid="text-dashboard-title">Dashboard</h1>
          <p className="text-sm sm:text-base text-muted-foreground">Welcome back! Here's what's happening with your project.</p>
        </div>
        <Button asChild className="w-full sm:w-auto" data-testid="button-view-board">
          <Link href="/board">View Board</Link>
        </Button>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-6">
        <Card data-testid="card-total-issues">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Issues</CardTitle>
            <BarChart3 className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{projectStats.totalIssues}</div>
            <p className="text-xs text-muted-foreground">
              +12% from last sprint
            </p>
          </CardContent>
        </Card>

        <Card data-testid="card-completed-issues">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Completed</CardTitle>
            <CheckCircle2 className="h-4 w-4 text-green-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{projectStats.completedIssues}</div>
            <p className="text-xs text-muted-foreground">
              {Math.round((projectStats.completedIssues / projectStats.totalIssues) * 100)}% completion rate
            </p>
          </CardContent>
        </Card>

        <Card data-testid="card-in-progress-issues">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">In Progress</CardTitle>
            <Clock className="h-4 w-4 text-blue-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{projectStats.inProgressIssues}</div>
            <p className="text-xs text-muted-foreground">
              Average 3.2 days in progress
            </p>
          </CardContent>
        </Card>

        <Card data-testid="card-team-velocity">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Team Velocity</CardTitle>
            <TrendingUp className="h-4 w-4 text-purple-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{projectStats.averageVelocity}</div>
            <p className="text-xs text-muted-foreground">
              Story points per sprint
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Main Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Recent Activity */}
        <Card className="lg:col-span-2" data-testid="card-recent-activity">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Activity className="w-5 h-5" />
              Recent Activity
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {recentActivity.map(activity => (
              <div key={activity.id} className="flex items-start gap-3" data-testid={`activity-${activity.id}`}>
                <Avatar className="w-8 h-8">
                  <AvatarImage src={activity.user.avatar} />
                  <AvatarFallback className="text-xs">
                    {activity.user.name.split(' ').map(n => n[0]).join('')}
                  </AvatarFallback>
                </Avatar>
                <div className="flex-1 min-w-0">
                  <p className="text-sm text-foreground">{activity.message}</p>
                  <p className="text-xs text-muted-foreground">{activity.timestamp}</p>
                </div>
              </div>
            ))}
            <Button variant="outline" size="sm" className="w-full mt-4" data-testid="button-view-all-activity">
              View All Activity
            </Button>
          </CardContent>
        </Card>

        {/* Assigned to Me */}
        <Card data-testid="card-assigned-to-me">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Users className="w-5 h-5" />
              Assigned to Me
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            {assignedToMe.map(issue => (
              <div key={issue.id} className="space-y-1" data-testid={`assigned-issue-${issue.key}`}>
                <div className="flex items-center justify-between">
                  <span className="text-sm font-mono text-muted-foreground">{issue.key}</span>
                  <Badge 
                    variant={issue.priority === "high" ? "destructive" : issue.priority === "medium" ? "default" : "secondary"}
                    className="text-xs"
                  >
                    {issue.priority}
                  </Badge>
                </div>
                <p className="text-sm">{issue.summary}</p>
              </div>
            ))}
            <Button variant="outline" size="sm" className="w-full mt-4" data-testid="button-view-all-assigned">
              View All Assigned Issues
            </Button>
          </CardContent>
        </Card>
      </div>

      {/* Bottom Section */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Sprint Progress */}
        <Card data-testid="card-sprint-progress">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <BarChart3 className="w-5 h-5" />
              Current Sprint Progress
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium">Sprint 3</span>
                <span className="text-sm text-muted-foreground">{projectStats.sprintProgress}% complete</span>
              </div>
              <div className="w-full bg-muted rounded-full h-2">
                <div 
                  className="bg-primary h-2 rounded-full transition-all" 
                  style={{ width: `${projectStats.sprintProgress}%` }}
                ></div>
              </div>
              <div className="grid grid-cols-3 gap-4 text-sm">
                <div className="text-center">
                  <div className="font-medium">{projectStats.todoIssues}</div>
                  <div className="text-muted-foreground">To Do</div>
                </div>
                <div className="text-center">
                  <div className="font-medium">{projectStats.inProgressIssues}</div>
                  <div className="text-muted-foreground">In Progress</div>
                </div>
                <div className="text-center">
                  <div className="font-medium">{projectStats.completedIssues}</div>
                  <div className="text-muted-foreground">Done</div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Upcoming Deadlines */}
        <Card data-testid="card-upcoming-deadlines">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Calendar className="w-5 h-5" />
              Upcoming Deadlines
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            {upcomingDeadlines.map(deadline => (
              <div key={deadline.id} className="flex items-center justify-between" data-testid={`deadline-${deadline.id}`}>
                <div className="flex items-center gap-3">
                  <div className="w-2 h-2 bg-primary rounded-full"></div>
                  <div>
                    <p className="text-sm font-medium">{deadline.title}</p>
                    <p className="text-xs text-muted-foreground capitalize">{deadline.type}</p>
                  </div>
                </div>
                <Badge variant="outline" className="text-xs">
                  {deadline.date}
                </Badge>
              </div>
            ))}
            <Button variant="outline" size="sm" className="w-full mt-4" data-testid="button-view-calendar">
              View Full Calendar
            </Button>
          </CardContent>
        </Card>
      </div>
        </main>
      </div>
    </div>
  );
}
