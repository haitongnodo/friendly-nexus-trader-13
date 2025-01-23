import { toast } from "@/components/ui/use-toast";

export const connectWallet = async () => {
  try {
    // Check if Sui wallet is installed
    if (!(window as any).suiWallet) {
      toast({
        title: "Wallet not found",
        description: "Please install Sui Wallet to continue",
        variant: "destructive",
      });
      window.open("https://chrome.google.com/webstore/detail/sui-wallet/opcgpfmipidbgpenhmajoajpbobppdil", "_blank");
      return false;
    }

    // Request connection
    const response = await (window as any).suiWallet.requestPermissions();
    if (response.success) {
      const address = await (window as any).suiWallet.getAccounts();
      toast({
        title: "Wallet Connected",
        description: `Connected to address: ${address[0].slice(0, 6)}...${address[0].slice(-4)}`,
      });
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