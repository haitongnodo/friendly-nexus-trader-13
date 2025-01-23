import { toast } from "@/hooks/use-toast";

export const connectWallet = async (walletType: string) => {
  try {
    let wallet;
    
    switch (walletType) {
      case 'sui':
        wallet = (window as any).suiWallet;
        break;
      case 'martian':
        wallet = (window as any).martianSuiWallet;
        break;
      case 'suiet':
        wallet = (window as any).suiet;
        break;
      default:
        wallet = null;
    }

    if (!wallet) {
      toast({
        title: "Wallet not found",
        description: `Please install ${walletType} wallet to continue`,
        variant: "destructive",
      });
      return false;
    }

    const response = await wallet.requestPermissions();
    if (response.success) {
      const address = await wallet.getAccounts();
      return address[0];
    }
    return false;
  } catch (error) {
    console.error("Error connecting wallet:", error);
    toast({
      title: "Connection Failed",
      description: "Failed to connect to wallet. Please try again.",
      variant: "destructive",
    });
    return false;
  }
};