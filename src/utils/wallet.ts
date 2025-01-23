import { toast } from "@/hooks/use-toast";

// Wallet type definitions
type WalletInfo = {
  name: string;
  installed: boolean;
  adapter: any;
};

// Check if wallet is installed and available
const checkWalletAvailability = (windowObj: any, walletType: string): WalletInfo => {
  console.log(`Checking availability for ${walletType} wallet...`);
  
  let adapter;
  switch (walletType) {
    case 'sui':
      adapter = windowObj.suiWallet;
      break;
    case 'martian':
      adapter = windowObj.martianSuiWallet;
      break;
    case 'suiet':
      adapter = windowObj.suiet;
      break;
    default:
      adapter = null;
  }

  const installed = !!adapter;
  console.log(`${walletType} wallet ${installed ? 'is' : 'is not'} installed`);
  
  return {
    name: walletType,
    installed,
    adapter
  };
};

export const connectWallet = async (walletType: string) => {
  try {
    console.log(`Attempting to connect to ${walletType} wallet...`);
    
    // Check wallet availability
    const walletInfo = checkWalletAvailability(window, walletType);
    
    if (!walletInfo.installed) {
      console.error(`${walletType} wallet not detected`);
      toast({
        title: "Wallet Not Found",
        description: `Please install ${walletType} wallet extension to continue`,
        variant: "destructive",
      });
      return false;
    }

    console.log(`Requesting permissions for ${walletType} wallet...`);
    const response = await walletInfo.adapter.requestPermissions();
    console.log('Permission response:', response);

    if (response.success) {
      console.log('Permissions granted, getting accounts...');
      const accounts = await walletInfo.adapter.getAccounts();
      console.log('Retrieved accounts:', accounts);
      
      if (accounts && accounts.length > 0) {
        console.log('Successfully connected to wallet');
        return accounts[0];
      } else {
        throw new Error('No accounts found');
      }
    } else {
      throw new Error('Permission denied');
    }
  } catch (error: any) {
    console.error('Wallet connection error:', error);
    
    // Provide more specific error messages based on the error type
    let errorMessage = 'Failed to connect to wallet. Please try again.';
    if (error.message.includes('Permission denied')) {
      errorMessage = 'Wallet connection was rejected. Please approve the connection request.';
    } else if (error.message.includes('No accounts')) {
      errorMessage = 'No accounts found in the wallet. Please create or import an account.';
    } else if (error.message.includes('Network error')) {
      errorMessage = 'Network error. Please check your internet connection.';
    }

    toast({
      title: "Connection Failed",
      description: errorMessage,
      variant: "destructive",
    });
    return false;
  }
};

// Add a function to check wallet status
export const checkWalletStatus = () => {
  console.log('Checking wallet status...');
  const wallets = ['sui', 'martian', 'suiet'].map(type => 
    checkWalletAvailability(window, type)
  );
  
  console.log('Wallet status:', wallets);
  return wallets;
};