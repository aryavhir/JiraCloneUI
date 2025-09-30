import { Switch, Route } from "wouter";
import { queryClient } from "./lib/queryClient";
import { QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import Board from "@/pages/Board";
import Dashboard from "@/pages/Dashboard";
import Backlog from "@/pages/Backlog";
import Code from "@/pages/Code";
import Releases from "@/pages/Releases";
import Roadmap from "@/pages/Roadmap";
import Notifications from "@/pages/Notifications";
import ProjectSettings from "@/pages/ProjectSettings";
import Help from "@/pages/Help";
import YourWork from "@/pages/YourWork";
import Projects from "@/pages/Projects";
import Filters from "@/pages/Filters";
import Teams from "@/pages/Teams";
import NotFound from "@/pages/not-found";

function Router() {
  return (
    <Switch>
      <Route path="/" component={Board} />
      <Route path="/board" component={Board} />
      <Route path="/dashboard" component={Dashboard} />
      <Route path="/backlog" component={Backlog} />
      <Route path="/code" component={Code} />
      <Route path="/releases" component={Releases} />
      <Route path="/roadmap" component={Roadmap} />
      <Route path="/notifications" component={Notifications} />
      <Route path="/settings" component={ProjectSettings} />
      <Route path="/help" component={Help} />
      <Route path="/your-work" component={YourWork} />
      <Route path="/projects" component={Projects} />
      <Route path="/filters" component={Filters} />
      <Route path="/teams" component={Teams} />
      <Route component={NotFound} />
    </Switch>
  );
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        <Router />
      </TooltipProvider>
    </QueryClientProvider>
  );
}

export default App;
