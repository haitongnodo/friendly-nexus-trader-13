export type WalletInfo = {
  name: string;
  installed: boolean;
  adapter: any;
};

const checkWalletAvailability = (windowObj: any, walletType: string): WalletInfo => {
  console.log(`Checking availability for ${walletType} wallet...`);
  
  let adapter;
  switch (walletType) {
    case 'sui':
      adapter = windowObj?.suiWallet;
      break;
    case 'martian':
      adapter = windowObj?.martianSuiWallet;
      break;
    case 'suiet':
      adapter = windowObj?.suiet;
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

export const connectWallet = async (walletType: string): Promise<string | null> => {
  try {
    console.log(`Attempting to connect to ${walletType} wallet...`);
    
    // Check if window is defined (browser environment)
    if (typeof window === 'undefined') {
      throw new Error('Window object not available');
    }

    // Check wallet availability
    const walletInfo = checkWalletAvailability(window, walletType);
    
    if (!walletInfo.installed) {
      console.error(`${walletType} wallet not detected`);
      return null;
    }

    // Handle different wallet types
    let accounts;
    switch (walletType) {
      case 'sui':
        if (typeof walletInfo.adapter.requestPermissions === 'function') {
          await walletInfo.adapter.requestPermissions();
          accounts = await walletInfo.adapter.getAccounts();
        } else {
          accounts = await walletInfo.adapter.connect();
        }
        break;
      
      case 'martian':
        accounts = await walletInfo.adapter.connect();
        break;
      
      case 'suiet':
        accounts = await walletInfo.adapter.connect();
        break;
      
      default:
        throw new Error('Unsupported wallet type');
    }

    if (accounts && accounts.length > 0) {
      console.log('Successfully connected to wallet:', accounts[0]);
      return accounts[0];
    }
    
    return null;
  } catch (error: any) {
    console.error('Wallet connection error:', error);
    return null;
  }
};

export const checkWalletStatus = (): WalletInfo[] => {
  console.log('Checking wallet status...');
  
  if (typeof window === 'undefined') {
    console.log('Window object not available, returning empty wallet list');
    return [];
  }
  
  const wallets = ['sui', 'martian', 'suiet'].map(type => 
    checkWalletAvailability(window, type)
  );
  
  console.log('Available wallets:', wallets);
  return wallets;
};

export const disconnectWallet = async (walletType: string): Promise<boolean> => {
  try {
    if (typeof window === 'undefined') return false;

    const walletInfo = checkWalletAvailability(window, walletType);
    if (!walletInfo.installed || !walletInfo.adapter) return false;

    if (typeof walletInfo.adapter.disconnect === 'function') {
      await walletInfo.adapter.disconnect();
      return true;
    }

    return false;
  } catch (error) {
    console.error('Error disconnecting wallet:', error);
    return false;
  }
};