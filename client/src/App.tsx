import { Toaster } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import NotFound from "@/pages/NotFound";
import { Route, Switch } from "wouter";
import ErrorBoundary from "./components/ErrorBoundary";
import { ThemeProvider } from "./contexts/ThemeContext";
import Home from "./pages/Home";
import ProjectPage from "./pages/ProjectPage";

function Router() {
  return (
    <Switch>
      <Route path="/" component={Home} />
      <Route path="/project/:id" component={ProjectPage} />
      <Route path="/404" component={NotFound} />
      <Route component={NotFound} />
    </Switch>
  );
}

import { useEffect } from "react";
import { useLocation } from "wouter";

const ScrollToTop = () => {
  // wouter's useLocation returns [location, setLocation]
  const [pathname] = useLocation();

  useEffect(() => {
    // We use 'instant' to avoid a sliding animation that feels broken
    window.scrollTo({
      top: 0,
      left: 0,
      behavior: "instant", 
    });
  }, [pathname]);

  return null;
};

function App() {
  return (
    <ErrorBoundary>
      <ThemeProvider defaultTheme="light">
        <TooltipProvider>
          <ScrollToTop />
          <Toaster />
          <Router />
        </TooltipProvider>
      </ThemeProvider>
    </ErrorBoundary>
  );
}

export default App;
