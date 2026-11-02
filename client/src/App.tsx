import { Toaster } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import NotFound from "@/pages/NotFound";
import { Route, Switch } from "wouter";
import ErrorBoundary from "./components/ErrorBoundary";
import { ThemeProvider } from "./contexts/ThemeContext";
import { pageMeta } from "./lib/pageMeta";
import CapstonePage from "./pages/CapstonePage";
import Home from "./pages/Home";
import ProjectPage from "./pages/ProjectPage";

function Router() {
  return (
    <Switch>
      <Route path="/" component={Home} />
      <Route path="/capstone" component={CapstonePage} />
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
    // Links like "/#projects" should land on that section, not the top of the page
    const section = window.location.hash
      ? document.getElementById(window.location.hash.slice(1))
      : null;
    if (section) {
      section.scrollIntoView({ behavior: "instant" });
      return;
    }

    // We use 'instant' to avoid a sliding animation that feels broken
    window.scrollTo({
      top: 0,
      left: 0,
      behavior: "instant", 
    });
  }, [pathname]);

  return null;
};

// Keep the tab title in step with in-app navigation
const PageTitle = () => {
  const [pathname] = useLocation();

  useEffect(() => {
    document.title = pageMeta(pathname).title;
  }, [pathname]);

  return null;
};

function App() {
  return (
    <ErrorBoundary>
      <ThemeProvider defaultTheme="light">
        <TooltipProvider>
          <ScrollToTop />
          <PageTitle />
          <Toaster />
          <Router />
        </TooltipProvider>
      </ThemeProvider>
    </ErrorBoundary>
  );
}

export default App;
