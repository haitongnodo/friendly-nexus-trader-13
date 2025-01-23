import { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { MessageSquare, Users, Plus, Settings, ChevronLeft, ChevronRight } from "lucide-react";
import { cn } from "@/lib/utils";
import { connectWallet, checkWalletStatus } from "@/utils/wallet";
import { useToast } from "@/hooks/use-toast";
import WalletModal from "./WalletModal";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";

const Navigation = () => {
  const location = useLocation();
  const { toast } = useToast();
  const [isWalletConnected, setIsWalletConnected] = useState(false);
  const [walletAddress, setWalletAddress] = useState<string | null>(null);
  const [isWalletModalOpen, setIsWalletModalOpen] = useState(false);
  const [availableWallets, setAvailableWallets] = useState<any[]>([]);
  const [isCollapsed, setIsCollapsed] = useState(false);

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
    console.log('Available wallets:', wallets);
  }, []);

  // Load sidebar state from localStorage
  useEffect(() => {
    const savedState = localStorage.getItem('sidebarCollapsed');
    if (savedState !== null) {
      setIsCollapsed(JSON.parse(savedState));
    }
  }, []);

  // Save sidebar state to localStorage
  useEffect(() => {
    localStorage.setItem('sidebarCollapsed', JSON.stringify(isCollapsed));
  }, [isCollapsed]);

  const handleSelectWallet = async (walletType: string) => {
    console.log(`Initiating connection to ${walletType} wallet...`);
    const address = await connectWallet(walletType);
    
    if (address) {
      console.log('Wallet connected successfully:', address);
      setIsWalletConnected(true);
      setWalletAddress(address);
      setIsWalletModalOpen(false);
      toast({
        title: "Wallet Connected",
        description: `Connected to ${walletType} wallet`,
      });
    }
  };

  return (
    <>
      <aside 
        className={cn(
          "fixed left-0 top-0 h-screen z-[1000] flex flex-col transition-all duration-200 ease-in-out",
          "bg-black/80 backdrop-blur-lg border-r border-white/10",
          isCollapsed ? "w-16" : "w-60"
        )}
      >
        <div className="p-8">
          <Link to="/" className={cn(
            "transition-all duration-200",
            isCollapsed ? "scale-75 -ml-4" : ""
          )}>
            <svg width="93" height="40" viewBox="0 0 93 40" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path fillRule="evenodd" clipRule="evenodd" d="M69.3719 6.24976H64.3995V13.9388C62.6725 12.848 60.6264 12.2167 58.4328 12.2167C53.1596 12.2167 48.7384 15.8649 47.5556 20.775C46.3728 15.8649 41.9517 12.2167 36.6785 12.2167C31.0287 12.2167 26.357 16.4045 25.5983 21.8453C24.0712 16.7087 19.3136 12.9625 13.681 12.9625C6.81557 12.9625 1.25 18.5281 1.25 25.3936V32.8522H6.22242V25.3936C6.22242 21.2743 9.56176 17.935 13.681 17.935C17.8003 17.935 21.1397 21.2743 21.1397 25.3936V32.8522H26.1121V27.0911C27.6358 31.4588 31.7912 34.5926 36.6785 34.5926C41.9517 34.5926 46.3728 30.9444 47.5556 26.0343C48.7384 30.9444 53.1596 34.5926 58.4328 34.5926C63.6172 34.5926 67.978 31.0663 69.2474 26.2813C70.5169 31.0663 74.8777 34.5926 80.0621 34.5926C86.241 34.5926 91.25 29.5836 91.25 23.4047C91.25 17.2257 86.241 12.2167 80.0621 12.2167C75.0355 12.2167 70.7831 15.5317 69.3719 20.0947V6.24976ZM64.6485 23.4046C64.6485 26.8374 61.8657 29.6202 58.4329 29.6202C55.0002 29.6202 52.2174 26.8374 52.2174 23.4046C52.2174 19.9719 55.0002 17.1891 58.4329 17.1891C61.8657 17.1891 64.6485 19.9719 64.6485 23.4046ZM36.6786 29.6202C40.1114 29.6202 42.8941 26.8374 42.8941 23.4046C42.8941 19.9719 40.1114 17.1891 36.6786 17.1891C33.2459 17.1891 30.4631 19.9719 30.4631 23.4046C30.4631 26.8374 33.2459 29.6202 36.6786 29.6202ZM80.0621 29.6202C83.4948 29.6202 86.2776 26.8374 86.2776 23.4047C86.2776 19.9719 83.4948 17.1891 80.0621 17.1891C76.6293 17.1891 73.8466 19.9719 73.8466 23.4047C73.8466 26.8374 76.6293 29.6202 80.0621 29.6202Z" fill="url(#paint0_linear_2235_5398)"/>
              <defs>
                <linearGradient id="paint0_linear_2235_5398" x1="1.25" y1="20.4212" x2="91.25" y2="20.4212" gradientUnits="userSpaceOnUse">
                  <stop stopColor="#D47150"/>
                  <stop offset="1" stopColor="#FFB854"/>
                </linearGradient>
              </defs>
            </svg>
          </Link>
        </div>

        <nav className="flex-1 px-4">
          <ul className="space-y-2">
            {navItems.map(({ icon: Icon, label, path }) => (
              <TooltipProvider key={path}>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <li>
                      <Link
                        to={path}
                        className={cn(
                          "flex items-center h-12 px-4 rounded-lg transition-all duration-200",
                          "hover:bg-primary/10",
                          location.pathname === path 
                            ? "bg-primary/15 border-2 border-primary shadow-glow text-text-highlight"
                            : "text-text-secondary",
                          isCollapsed ? "justify-center" : "space-x-3"
                        )}
                      >
                        <Icon className="w-5 h-5" />
                        {!isCollapsed && <span>{label}</span>}
                      </Link>
                    </li>
                  </TooltipTrigger>
                  {isCollapsed && (
                    <TooltipContent side="right">
                      <p>{label}</p>
                    </TooltipContent>
                  )}
                </Tooltip>
              </TooltipProvider>
            ))}
          </ul>
        </nav>

        <div className="p-4 mt-auto space-y-4">
          <button
            onClick={() => {
              console.log('Opening wallet modal');
              setIsWalletModalOpen(true);
            }}
            className={cn(
              "w-full px-4 py-2 rounded-lg font-medium transition-all text-center",
              isWalletConnected
                ? "bg-green-500/20 text-green-400"
                : "orange-gradient text-white hover:opacity-90"
            )}
          >
            {isCollapsed 
              ? (isWalletConnected ? "✓" : "$")
              : (isWalletConnected 
                  ? `${walletAddress?.slice(0, 6)}...${walletAddress?.slice(-4)}`
                  : "Connect Wallet"
                )
            }
          </button>

          <button
            onClick={() => setIsCollapsed(!isCollapsed)}
            className="w-full flex items-center justify-center h-10 rounded-lg 
                     text-text-secondary hover:bg-primary/10 transition-colors"
          >
            {isCollapsed ? <ChevronRight size={20} /> : <ChevronLeft size={20} />}
          </button>
        </div>
      </aside>

      <main className={cn(
        "transition-all duration-200 ease-in-out",
        isCollapsed ? "ml-16" : "ml-60"
      )}>
        {/* Wrap the existing content */}
        <div className="min-h-screen bg-background">
          <WalletModal
            isOpen={isWalletModalOpen}
            onClose={() => setIsWalletModalOpen(false)}
            onSelectWallet={handleSelectWallet}
            availableWallets={availableWallets}
          />
        </div>
      </main>
    </>
  );
};

export default Navigation;