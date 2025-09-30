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
