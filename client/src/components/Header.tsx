import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { 
  PlayIcon, 
  ImageIcon, 
  DownloadIcon, 
  BookTemplateIcon,
  MenuIcon,
  SparklesIcon,
  PaletteIcon
} from "lucide-react";
import { useLocation } from "wouter";

interface HeaderProps {
  currentView: "home" | "downloader" | "creator" | "templates";
  onViewChange: (view: "home" | "downloader" | "creator" | "templates") => void;
}

export default function Header({ currentView, onViewChange }: HeaderProps) {
  const [location, setLocation] = useLocation();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navigationItems = [
    {
      id: "home",
      label: "Home",
      icon: PlayIcon,
      path: "/",
    },
    {
      id: "creator",
      label: "AI Creator",
      icon: SparklesIcon,
      path: "/creator",
      badge: "New"
    },
    {
      id: "downloader", 
      label: "Downloader",
      icon: DownloadIcon,
      path: "/downloader",
    },
    {
      id: "templates",
      label: "Templates",
      icon: BookTemplateIcon,
      path: "/templates",
    }
  ];

  const handleNavigation = (item: typeof navigationItems[0]) => {
    onViewChange(item.id as any);
    setLocation(item.path);
    setMobileMenuOpen(false);
  };

  const NavItems = ({ mobile = false }: { mobile?: boolean }) => (
    <div className={`flex ${mobile ? 'flex-col space-y-4' : 'space-x-1'}`}>
      {navigationItems.map((item) => {
        const Icon = item.icon;
        const isActive = currentView === item.id;
        
        return (
          <Button
            key={item.id}
            variant={isActive ? "default" : "ghost"}
            size={mobile ? "lg" : "sm"}
            onClick={() => handleNavigation(item)}
            className={`${mobile ? 'justify-start w-full' : ''} relative`}
          >
            <Icon className={`h-4 w-4 ${mobile ? 'mr-3' : 'mr-2'}`} />
            {item.label}
            {item.badge && (
              <Badge 
                variant="secondary" 
                className="ml-2 text-xs bg-green-100 text-green-800 border-green-200"
              >
                {item.badge}
              </Badge>
            )}
          </Button>
        );
      })}
    </div>
  );

  return (
    <header className="sticky top-0 z-50 border-b bg-white/80 backdrop-blur-md">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo and Brand */}
          <div className="flex items-center space-x-4">
            <div className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-gradient-to-br from-red-500 to-purple-600 rounded-lg flex items-center justify-center">
                <PaletteIcon className="h-5 w-5 text-white" />
              </div>
              <div className="hidden sm:block">
                <h1 className="text-xl font-bold bg-gradient-to-r from-red-600 to-purple-600 bg-clip-text text-transparent">
                  ThumbnailAI
                </h1>
                <p className="text-xs text-gray-500 -mt-1">Create & Download</p>
              </div>
            </div>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-6">
            <NavItems />
          </div>

          {/* Desktop CTA Buttons */}
          <div className="hidden md:flex items-center space-x-3">
            <Button 
              variant="outline" 
              size="sm"
              onClick={() => handleNavigation(navigationItems.find(item => item.id === 'creator')!)}
            >
              <SparklesIcon className="h-4 w-4 mr-2" />
              Try AI Creator
            </Button>
            <Button 
              size="sm"
              className="bg-gradient-to-r from-red-500 to-purple-600 hover:from-red-600 hover:to-purple-700"
              onClick={() => handleNavigation(navigationItems.find(item => item.id === 'creator')!)}
            >
              Get Started
            </Button>
          </div>

          {/* Mobile Menu */}
          <div className="md:hidden">
            <Sheet open={mobileMenuOpen} onOpenChange={setMobileMenuOpen}>
              <SheetTrigger asChild>
                <Button variant="ghost" size="sm">
                  <MenuIcon className="h-5 w-5" />
                </Button>
              </SheetTrigger>
              <SheetContent side="right" className="w-[300px] sm:w-[400px]">
                <div className="flex flex-col space-y-6 mt-6">
                  <div className="flex items-center space-x-2">
                    <div className="w-8 h-8 bg-gradient-to-br from-red-500 to-purple-600 rounded-lg flex items-center justify-center">
                      <PaletteIcon className="h-5 w-5 text-white" />
                    </div>
                    <div>
                      <h1 className="text-lg font-bold bg-gradient-to-r from-red-600 to-purple-600 bg-clip-text text-transparent">
                        ThumbnailAI
                      </h1>
                      <p className="text-xs text-gray-500 -mt-1">Create & Download</p>
                    </div>
                  </div>
                  
                  <NavItems mobile />
                  
                  <div className="border-t pt-6 space-y-3">
                    <Button 
                      variant="outline" 
                      size="lg"
                      className="w-full"
                      onClick={() => handleNavigation(navigationItems.find(item => item.id === 'creator')!)}
                    >
                      <SparklesIcon className="h-4 w-4 mr-2" />
                      Try AI Creator
                    </Button>
                    <Button 
                      size="lg"
                      className="w-full bg-gradient-to-r from-red-500 to-purple-600 hover:from-red-600 hover:to-purple-700"
                      onClick={() => handleNavigation(navigationItems.find(item => item.id === 'creator')!)}
                    >
                      Get Started
                    </Button>
                  </div>
                </div>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </div>

      {/* Secondary Navigation Bar (Mobile) */}
      <div className="md:hidden border-t bg-gray-50/80">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between py-2">
            <div className="flex space-x-1 overflow-x-auto">
              {navigationItems.map((item) => {
                const Icon = item.icon;
                const isActive = currentView === item.id;
                
                return (
                  <Button
                    key={item.id}
                    variant={isActive ? "default" : "ghost"}
                    size="sm"
                    onClick={() => handleNavigation(item)}
                    className="relative flex-shrink-0"
                  >
                    <Icon className="h-4 w-4" />
                    {item.badge && (
                      <Badge 
                        variant="secondary" 
                        className="absolute -top-1 -right-1 text-xs bg-green-100 text-green-800 border-green-200 px-1"
                      >
                        {item.badge}
                      </Badge>
                    )}
                  </Button>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}