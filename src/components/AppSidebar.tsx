import { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { MessageSquare, Users, Plus, Settings, ChevronLeft } from "lucide-react";
import { cn } from "@/lib/utils";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarProvider,
  useSidebar,
} from "@/components/ui/sidebar";
import { Button } from "@/components/ui/button";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

const navItems = [
  { icon: MessageSquare, label: "Chat", path: "/chat" },
  { icon: Users, label: "Traders", path: "/traders" },
  { icon: Plus, label: "Create Agent", path: "/create-agent" },
  { icon: Settings, label: "Settings", path: "/settings" },
];

export function AppSidebar() {
  const location = useLocation();
  const { state, toggleSidebar } = useSidebar();
  const isCollapsed = state === "collapsed";

  // Load saved state
  useEffect(() => {
    const savedState = localStorage.getItem("sidebar-state");
    if (savedState === "collapsed") {
      toggleSidebar();
    }
  }, []);

  // Save state changes
  useEffect(() => {
    localStorage.setItem("sidebar-state", state);
  }, [state]);

  return (
    <Sidebar className="border-r border-border-subtle bg-black/80 backdrop-blur-md">
      <SidebarHeader className="p-6">
        <Link to="/" className="block">
          {isCollapsed ? (
            <div className="h-8 w-8">
              <svg viewBox="0 0 93 40" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path fillRule="evenodd" clipRule="evenodd" d="M13.681 12.9625C6.81557 12.9625 1.25 18.5281 1.25 25.3936V32.8522H6.22242V25.3936C6.22242 21.2743 9.56176 17.935 13.681 17.935C17.8003 17.935 21.1397 21.2743 21.1397 25.3936V32.8522H26.1121V27.0911C27.6358 31.4588 31.7912 34.5926 36.6785 34.5926C41.9517 34.5926 46.3728 30.9444 47.5556 26.0343C48.7384 30.9444 53.1596 34.5926 58.4328 34.5926C63.6172 34.5926 67.978 31.0663 69.2474 26.2813C70.5169 31.0663 74.8777 34.5926 80.0621 34.5926C86.241 34.5926 91.25 29.5836 91.25 23.4047C91.25 17.2257 86.241 12.2167 80.0621 12.2167C75.0355 12.2167 70.7831 15.5317 69.3719 20.0947V6.24976H64.3995V13.9388C62.6725 12.848 60.6264 12.2167 58.4328 12.2167C53.1596 12.2167 48.7384 15.8649 47.5556 20.775C46.3728 15.8649 41.9517 12.2167 36.6785 12.2167C31.0287 12.2167 26.357 16.4045 25.5983 21.8453C24.0712 16.7087 19.3136 12.9625 13.681 12.9625Z" fill="url(#paint0_linear_2235_5398)"/>
                <defs>
                  <linearGradient id="paint0_linear_2235_5398" x1="1.25" y1="20.4212" x2="91.25" y2="20.4212" gradientUnits="userSpaceOnUse">
                    <stop stopColor="#D47150"/>
                    <stop offset="1" stopColor="#FFB854"/>
                  </linearGradient>
                </defs>
              </svg>
            </div>
          ) : (
            <svg width="93" height="40" viewBox="0 0 93 40" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path fillRule="evenodd" clipRule="evenodd" d="M69.3719 6.24976H64.3995V13.9388C62.6725 12.848 60.6264 12.2167 58.4328 12.2167C53.1596 12.2167 48.7384 15.8649 47.5556 20.775C46.3728 15.8649 41.9517 12.2167 36.6785 12.2167C31.0287 12.2167 26.357 16.4045 25.5983 21.8453C24.0712 16.7087 19.3136 12.9625 13.681 12.9625C6.81557 12.9625 1.25 18.5281 1.25 25.3936V32.8522H6.22242V25.3936C6.22242 21.2743 9.56176 17.935 13.681 17.935C17.8003 17.935 21.1397 21.2743 21.1397 25.3936V32.8522H26.1121V27.0911C27.6358 31.4588 31.7912 34.5926 36.6785 34.5926C41.9517 34.5926 46.3728 30.9444 47.5556 26.0343C48.7384 30.9444 53.1596 34.5926 58.4328 34.5926C63.6172 34.5926 67.978 31.0663 69.2474 26.2813C70.5169 31.0663 74.8777 34.5926 80.0621 34.5926C86.241 34.5926 91.25 29.5836 91.25 23.4047C91.25 17.2257 86.241 12.2167 80.0621 12.2167C75.0355 12.2167 70.7831 15.5317 69.3719 20.0947V6.24976Z" fill="url(#paint0_linear_2235_5398)"/>
              <defs>
                <linearGradient id="paint0_linear_2235_5398" x1="1.25" y1="20.4212" x2="91.25" y2="20.4212" gradientUnits="userSpaceOnUse">
                  <stop stopColor="#D47150"/>
                  <stop offset="1" stopColor="#FFB854"/>
                </linearGradient>
              </defs>
            </svg>
          )}
        </Link>
      </SidebarHeader>

      <SidebarContent>
        <SidebarMenu>
          {navItems.map(({ icon: Icon, label, path }) => (
            <SidebarMenuItem key={path}>
              <TooltipProvider delayDuration={0}>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <SidebarMenuButton
                      asChild
                      isActive={location.pathname === path}
                      className={cn(
                        "transition-all duration-200",
                        location.pathname === path && "border-2 border-primary bg-overlay-active text-text-highlight shadow-glow"
                      )}
                    >
                      <Link to={path}>
                        <Icon className="h-5 w-5" />
                        <span>{label}</span>
                      </Link>
                    </SidebarMenuButton>
                  </TooltipTrigger>
                  <TooltipContent side="right" className="bg-background-elevated text-text-primary">
                    {label}
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>
            </SidebarMenuItem>
          ))}
        </SidebarMenu>
      </SidebarContent>

      <SidebarFooter className="p-4">
        <Button
          variant="ghost"
          size="icon"
          onClick={toggleSidebar}
          className="w-full justify-center rounded-lg hover:bg-overlay-hover"
        >
          <ChevronLeft className={cn(
            "h-5 w-5 transition-transform duration-200",
            isCollapsed && "rotate-180"
          )} />
        </Button>
      </SidebarFooter>
    </Sidebar>
  );
}