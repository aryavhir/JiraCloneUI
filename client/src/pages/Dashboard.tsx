import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { useState, useMemo } from "react";
import { BarChart3, TrendingUp, Clock, CheckCircle2, AlertCircle, Users, Calendar, Activity, Briefcase, Award, Code } from "lucide-react";
import { Link } from "wouter";
import JiraHeader from "@/components/JiraHeader";
import JiraSidebar from "@/components/JiraSidebar";
import { mockUsers, mockIssues } from "@/data/mockData";

export default function Dashboard() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  
  // Get current user (Aryavhir Koul)
  const currentUser = mockUsers[0];
  
  // Get actual TODO issues assigned to current user
  const assignedToMe = useMemo(() => {
    return mockIssues.filter(issue => issue.assignee?.id === currentUser.id && issue.status === 'to-do');
  }, [currentUser.id]);
  
  // Calculate stats from actual data
  const projectStats = useMemo(() => {
    const totalIssues = mockIssues.length;
    const completedIssues = mockIssues.filter(issue => issue.status === 'done').length;
    const inProgressIssues = mockIssues.filter(issue => issue.status === 'in-progress').length;
    const todoIssues = mockIssues.filter(issue => issue.status === 'to-do').length;
    const userCompletedIssues = assignedToMe.filter(issue => issue.status === 'done').length;
    const userInProgressIssues = assignedToMe.filter(issue => issue.status === 'in-progress').length;
    const userTodoIssues = assignedToMe.filter(issue => issue.status === 'to-do').length;
    
    return {
      totalIssues,
      completedIssues,
      inProgressIssues,
      todoIssues,
      userCompletedIssues,
      userInProgressIssues,
      userTodoIssues,
      averageVelocity: 24,
      sprintProgress: Math.round((completedIssues / totalIssues) * 100)
    };
  }, [assignedToMe]);
  
  // Work experience data
  const workExperience = [
    {
      id: "1",
      company: "Hydro Online",
      role: "Full Stack Developer",
      duration: "Q3 2024 - Present",
      description: "Developing adtech platform with React.js, Go, and blockchain integrations. Working on OpenRTB compliant ad banners, advertisers portal, publisher rewards system, and multi-chain crypto payment infrastructure.",
      technologies: ["React", "Go", "TypeScript", "Blockchain", "Web3", "OpenRTB", "AdTech", "Payment Systems", "SQL", "REST API"]
    }
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
        <div className="flex items-center space-x-4">
          <Avatar className="h-12 w-12">
            <AvatarImage src={currentUser.avatarUrl} alt={currentUser.name} />
            <AvatarFallback className="bg-jira-blue text-white text-lg font-medium">
              {currentUser.initials}
            </AvatarFallback>
          </Avatar>
          <div>
            <h1 className="text-xl sm:text-2xl font-bold" data-testid="text-dashboard-title">
              Welcome back, {currentUser.name}!
            </h1>
            <p className="text-sm sm:text-base text-muted-foreground">
              Full Stack Developer & Blockchain Enthusiast
            </p>
          </div>
        </div>
        <Button asChild className="w-full sm:w-auto" data-testid="button-view-board">
          <Link href="/board">View Board</Link>
        </Button>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-6">
        <Card data-testid="card-assigned-issues">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">To Do</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{projectStats.todoIssues}</div>
            <p className="text-xs text-muted-foreground">
              Total issues in to do
            </p>
          </CardContent>
        </Card>

        <Card data-testid="card-completed-issues">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Done</CardTitle>
            <CheckCircle2 className="h-4 w-4 text-green-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{projectStats.completedIssues}</div>
            <p className="text-xs text-muted-foreground">
              Total issues in done
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
              Total issues in progress
            </p>
          </CardContent>
        </Card>

        <Card data-testid="card-skills">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Technologies</CardTitle>
            <Code className="h-4 w-4 text-purple-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">15+</div>
            <p className="text-xs text-muted-foreground">
              Technologies mastered
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Main Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-1 gap-6">
        {/* Assigned to Me */}
        <Card data-testid="card-assigned-to-me">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Users className="w-5 h-5" />
              Assigned to Me
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            {assignedToMe.slice(0, 3).map(issue => (
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
                <div className="flex flex-wrap gap-1 mt-1">
                  {issue.labels.slice(0, 3).map(label => (
                    <Badge key={label} variant="outline" className="text-xs">
                      {label}
                    </Badge>
                  ))}
                  {issue.labels.length > 3 && (
                    <Badge variant="outline" className="text-xs">
                      +{issue.labels.length - 3}
                    </Badge>
                  )}
                </div>
              </div>
            ))}
            <Button asChild variant="outline" size="sm" className="w-full mt-4" data-testid="button-view-all-assigned">
              <Link href="/backlog">View All Issues</Link>
            </Button>
          </CardContent>
        </Card>
      </div>

      {/* Work Experience Section */}
      <div className="grid grid-cols-1 lg:grid-cols-1 gap-6">
        <Card data-testid="card-work-experience">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Briefcase className="w-5 h-5" />
              Work Experience
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {workExperience.map(experience => (
              <div key={experience.id} className="space-y-2 p-4 border border-muted rounded-lg" data-testid={`experience-${experience.id}`}>
                <div className="flex items-center justify-between">
                  <div>
                    <h4 className="font-semibold text-lg">{experience.role}</h4>
                    <p className="text-sm text-muted-foreground">{experience.company}</p>
                  </div>
                  <Badge variant="outline" className="text-xs">
                    {experience.duration}
                  </Badge>
                </div>
                <p className="text-sm text-muted-foreground">{experience.description}</p>
                <div className="flex flex-wrap gap-2">
                  {experience.technologies.map(tech => (
                    <Badge key={tech} variant="secondary" className="text-xs">
                      {tech}
                    </Badge>
                  ))}
                </div>
              </div>
            ))}
            <div className="flex justify-center">
              <Button asChild variant="outline" size="sm" data-testid="button-view-portfolio">
                <a href="https://aryavhir.in" target="_blank" rel="noopener noreferrer">
                  View Portfolio
                </a>
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
        </main>
      </div>
    </div>
  );
}
