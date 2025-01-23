import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { MessageSquare, Users, Plus, Settings } from "lucide-react";
import { cn } from "@/lib/utils";

const Navigation = () => {
  const location = useLocation();
  const [isWalletConnected, setIsWalletConnected] = useState(false);

  const navItems = [
    { icon: MessageSquare, label: "Chat", path: "/chat" },
    { icon: Users, label: "Traders", path: "/traders" },
    { icon: Plus, label: "Create Agent", path: "/create" },
    { icon: Settings, label: "Settings", path: "/settings" },
  ];

  const handleConnectWallet = () => {
    setIsWalletConnected(true);
    // TODO: Implement actual wallet connection
  };

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 glass">
      <div className="container mx-auto px-4 py-4 flex items-center justify-between">
        <Link to="/" className="text-2xl font-bold text-white">
          NODO
        </Link>
        
        <div className="hidden md:flex items-center space-x-8">
          {navItems.map(({ icon: Icon, label, path }) => (
            <Link
              key={path}
              to={path}
              className={cn(
                "flex items-center space-x-2 text-sm font-medium transition-colors hover:text-nodo-orange",
                location.pathname === path ? "text-nodo-orange" : "text-gray-400"
              )}
            >
              <Icon className="w-4 h-4" />
              <span>{label}</span>
            </Link>
          ))}
        </div>

        <button
          onClick={handleConnectWallet}
          className={cn(
            "px-4 py-2 rounded-lg font-medium transition-all",
            isWalletConnected
              ? "bg-green-500/20 text-green-400"
              : "orange-gradient text-white hover:opacity-90"
          )}
        >
          {isWalletConnected ? "Connected" : "Connect Wallet"}
        </button>
      </div>
    </nav>
  );
};

export default Navigation;