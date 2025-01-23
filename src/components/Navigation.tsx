import { useState, useEffect } from "react";
import { connectWallet, checkWalletStatus } from "@/utils/wallet";
import { useToast } from "@/hooks/use-toast";
import { cn } from "@/lib/utils";
import WalletModal from "./WalletModal";
import { SidebarProvider } from "@/components/ui/sidebar";
import { AppSidebar } from "./AppSidebar";

const Navigation = () => {
  const { toast } = useToast();
  const [isWalletConnected, setIsWalletConnected] = useState(false);
  const [walletAddress, setWalletAddress] = useState<string | null>(null);
  const [isWalletModalOpen, setIsWalletModalOpen] = useState(false);
  const [availableWallets, setAvailableWallets] = useState<any[]>([]);

  // Check wallet status on component mount
  useEffect(() => {
    const wallets = checkWalletStatus();
    setAvailableWallets(wallets);
    console.log('Available wallets:', wallets);
  }, []);

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
    <SidebarProvider>
      <div className="flex min-h-screen w-full">
        <AppSidebar />
        <main className="flex-1 transition-[margin] duration-200 ease-in-out">
          <div className="fixed right-4 top-4 z-50">
            <button
              onClick={() => {
                console.log('Opening wallet modal');
                setIsWalletModalOpen(true);
              }}
              className={cn(
                "px-4 py-2 rounded-lg font-medium transition-all",
                isWalletConnected
                  ? "bg-green-500/20 text-green-400"
                  : "bg-primary hover:bg-primary-hover text-white"
              )}
            >
              {isWalletConnected 
                ? `${walletAddress?.slice(0, 6)}...${walletAddress?.slice(-4)}`
                : "Connect Wallet"}
            </button>
          </div>

          <WalletModal
            isOpen={isWalletModalOpen}
            onClose={() => setIsWalletModalOpen(false)}
            onSelectWallet={handleSelectWallet}
            availableWallets={availableWallets}
          />
        </main>
      </div>
    </SidebarProvider>
  );
};

export default Navigation;