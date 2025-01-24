import { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { MessageSquare, Users, Plus, Settings } from "lucide-react";
import { cn } from "@/lib/utils";
import { connectWallet, checkWalletStatus, disconnectWallet } from "@/utils/wallet";
import { useToast } from "@/hooks/use-toast";
import WalletModal from "./WalletModal";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarProvider,
} from "@/components/ui/sidebar";

const Navigation = () => {
  const location = useLocation();
  const { toast } = useToast();
  const [isWalletConnected, setIsWalletConnected] = useState(false);
  const [walletAddress, setWalletAddress] = useState<string | null>(null);
  const [isWalletModalOpen, setIsWalletModalOpen] = useState(false);
  const [availableWallets, setAvailableWallets] = useState<any[]>([]);
  const [currentWalletType, setCurrentWalletType] = useState<string | null>(null);

  const navItems = [
    { icon: MessageSquare, label: "Chat", path: "/chat" },
    { icon: Users, label: "Traders", path: "/traders" },
    { icon: Plus, label: "Create Agent", path: "/create-agent" },
    { icon: Settings, label: "Settings", path: "/settings" },
  ];

  // Check wallet status on component mount
  useEffect(() => {
    const wallets = checkWalletStatus();
    setAvailableWallets(wallets);
  }, []);

  const handleSelectWallet = async (walletType: string) => {
    const address = await connectWallet(walletType);
    
    if (address) {
      setIsWalletConnected(true);
      setWalletAddress(address);
      setCurrentWalletType(walletType);
      setIsWalletModalOpen(false);
      toast({
        title: "Wallet Connected",
        description: `Connected to ${walletType} wallet`,
      });
    } else {
      toast({
        title: "Connection Failed",
        description: "Failed to connect wallet. Please try again.",
        variant: "destructive",
      });
    }
  };

  const handleDisconnectWallet = async () => {
    if (currentWalletType) {
      const success = await disconnectWallet(currentWalletType);
      if (success) {
        setIsWalletConnected(false);
        setWalletAddress(null);
        setCurrentWalletType(null);
        toast({
          title: "Wallet Disconnected",
          description: "Your wallet has been disconnected",
        });
      }
    }
  };

  const AppSidebar = () => {
    return (
      <Sidebar>
        <SidebarHeader className="p-4">
          <Link to="/" className="flex items-center">
            <svg width="93" height="40" viewBox="0 0 93 40" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-24">
              <path fillRule="evenodd" clipRule="evenodd" d="M69.3719 6.24976H64.3995V13.9388C62.6725 12.848 60.6264 12.2167 58.4328 12.2167C53.1596 12.2167 48.7384 15.8649 47.5556 20.775C46.3728 15.8649 41.9517 12.2167 36.6785 12.2167C31.0287 12.2167 26.357 16.4045 25.5983 21.8453C24.0712 16.7087 19.3136 12.9625 13.681 12.9625C6.81557 12.9625 1.25 18.5281 1.25 25.3936V32.8522H6.22242V25.3936C6.22242 21.2743 9.56176 17.935 13.681 17.935C17.8003 17.935 21.1397 21.2743 21.1397 25.3936V32.8522H26.1121V27.0911C27.6358 31.4588 31.7912 34.5926 36.6785 34.5926C41.9517 34.5926 46.3728 30.9444 47.5556 26.0343C48.7384 30.9444 53.1596 34.5926 58.4328 34.5926C63.6172 34.5926 67.978 31.0663 69.2474 26.2813C70.5169 31.0663 74.8777 34.5926 80.0621 34.5926C86.241 34.5926 91.25 29.5836 91.25 23.4047C91.25 17.2257 86.241 12.2167 80.0621 12.2167C75.0355 12.2167 70.7831 15.5317 69.3719 20.0947V6.24976Z" fill="url(#paint0_linear_2235_5398)"/>
              <defs>
                <linearGradient id="paint0_linear_2235_5398" x1="1.25" y1="20.4212" x2="91.25" y2="20.4212" gradientUnits="userSpaceOnUse">
                  <stop stopColor="#D47150"/>
                  <stop offset="1" stopColor="#FFB854"/>
                </linearGradient>
              </defs>
            </svg>
          </Link>
        </SidebarHeader>
        
        <SidebarContent>
          <SidebarMenu>
            {navItems.map((item) => (
              <SidebarMenuItem key={item.path}>
                <SidebarMenuButton
                  asChild
                  tooltip={item.label}
                  isActive={location.pathname === item.path}
                >
                  <Link 
                    to={item.path}
                    className={cn(
                      "flex items-center gap-3 px-3 py-2 rounded-md transition-colors duration-200",
                      location.pathname === item.path 
                        ? "text-primary bg-primary/10" 
                        : "text-text-secondary hover:text-primary hover:bg-primary/5"
                    )}
                  >
                    <item.icon className="w-5 h-5" />
                    <span className="text-sm font-medium">{item.label}</span>
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>
            ))}
          </SidebarMenu>
        </SidebarContent>

        <SidebarFooter className="p-4">
          {isWalletConnected ? (
            <div className="flex flex-col gap-2">
              <span className="text-sm text-green-400 font-medium">
                {`${walletAddress?.slice(0, 6)}...${walletAddress?.slice(-4)}`}
              </span>
              <button
                onClick={handleDisconnectWallet}
                className="text-red-400 hover:text-red-300 text-sm font-medium"
              >
                Disconnect
              </button>
            </div>
          ) : (
            <button
              onClick={() => setIsWalletModalOpen(true)}
              className="w-full orange-gradient px-4 py-2 rounded-lg font-medium text-white hover:opacity-90 transition-all"
            >
              Connect Wallet
            </button>
          )}
        </SidebarFooter>
      </Sidebar>
    );
  };

  return (
    <>
      <SidebarProvider defaultOpen>
        <div className="flex min-h-screen w-full">
          <AppSidebar />
          <main className="flex-1">
            <div className="container mx-auto px-6">
              {/* Removed the SidebarTrigger and unnecessary padding */}
            </div>
          </main>
        </div>
      </SidebarProvider>

      <WalletModal
        isOpen={isWalletModalOpen}
        onClose={() => setIsWalletModalOpen(false)}
        onSelectWallet={handleSelectWallet}
        availableWallets={availableWallets}
      />
    </>
  );
};

export default Navigation;
