import { useState } from "react";
import { Switch, Route, useLocation } from "wouter";
import { queryClient } from "./lib/queryClient";
import { QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import Header from "@/components/Header";
import NotFound from "@/pages/not-found";
import Home from "@/pages/Home";
import CreatorPage from "@/pages/CreatorPage";
import DownloaderPage from "@/pages/DownloaderPage"; 
import TemplatesPage from "@/pages/TemplatesPage";

function Router() {
  const [location] = useLocation();
  const [currentView, setCurrentView] = useState<"home" | "downloader" | "creator" | "templates">("home");

  // Update current view based on location
  const getCurrentView = () => {
    if (location === "/creator") return "creator";
    if (location === "/downloader") return "downloader";
    if (location === "/templates") return "templates";
    return "home";
  };

  const handleViewChange = (view: "home" | "downloader" | "creator" | "templates") => {
    setCurrentView(view);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Header currentView={getCurrentView()} onViewChange={handleViewChange} />
      <Switch>
        <Route path="/" component={Home} />
        <Route path="/creator" component={CreatorPage} />
        <Route path="/downloader" component={DownloaderPage} />
        <Route path="/templates" component={TemplatesPage} />
        <Route component={NotFound} />
      </Switch>
    </div>
  );
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <Router />
      <Toaster />
    </QueryClientProvider>
  );
}

export default App;
