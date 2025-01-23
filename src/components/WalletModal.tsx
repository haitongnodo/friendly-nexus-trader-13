import { X } from "lucide-react";
import { cn } from "@/lib/utils";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import type { WalletInfo } from "@/utils/wallet";

interface WalletModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSelectWallet: (wallet: string) => void;
  availableWallets: WalletInfo[];
}

const WalletModal = ({ isOpen, onClose, onSelectWallet, availableWallets }: WalletModalProps) => {
  const getWalletStatus = (type: string) => {
    const wallet = availableWallets.find(w => w.name === type);
    return wallet?.installed;
  };

  const handleWalletSelect = async (walletType: string) => {
    console.log(`Selecting wallet: ${walletType}`);
    onSelectWallet(walletType);
  };

  const getWalletInstallLink = (type: string) => {
    switch (type) {
      case 'sui':
        return 'https://chrome.google.com/webstore/detail/sui-wallet/opcgpfmipidbgpenhmajoajpbobppdil';
      case 'martian':
        return 'https://chrome.google.com/webstore/detail/martian-wallet-sui/efbglgofoippbgcjepnhiblaibcnclgk';
      case 'suiet':
        return 'https://chrome.google.com/webstore/detail/suiet-sui-wallet/khpkpbbcccdmmclmpigdgddabeilkdpd';
      default:
        return '';
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-md bg-background-base border-border">
        <DialogHeader>
          <DialogTitle className="flex justify-between items-center">
            <span>Connect a Wallet</span>
            <button 
              onClick={onClose} 
              className="text-text-tertiary hover:text-text-primary transition-colors"
            >
              <X className="h-4 w-4" />
            </button>
          </DialogTitle>
        </DialogHeader>
        <div className="grid gap-6 py-6">
          {[
            { type: 'sui', name: 'Sui Wallet', icon: '/lovable-uploads/a7083879-0396-4ae6-ab70-4c8ba2c768fc.png' },
            { type: 'martian', name: 'Martian Sui Wallet', icon: '/lovable-uploads/d6b8c326-0ce6-4e60-9b88-d0aaedcf00f6.png' },
            { type: 'suiet', name: 'Suiet', icon: '/lovable-uploads/d96930e3-ce73-4d48-b9b4-76357fcee014.png' }
          ].map(wallet => (
            <div key={wallet.type} className="relative">
              <button
                onClick={() => handleWalletSelect(wallet.type)}
                className={cn(
                  "flex items-center space-x-4 w-full p-4 rounded-lg transition-all duration-200 text-left relative",
                  getWalletStatus(wallet.type)
                    ? "hover:bg-[rgba(255,122,15,0.15)] hover:border-primary hover:shadow-[0_0_10px_rgba(255,122,15,0.3)] border-2 border-transparent"
                    : "opacity-50 cursor-not-allowed"
                )}
                disabled={!getWalletStatus(wallet.type)}
              >
                <img src={wallet.icon} alt={wallet.name} className="w-8 h-8" />
                <div className="flex flex-col">
                  <span className="font-medium text-[#FFB366]">{wallet.name}</span>
                  {!getWalletStatus(wallet.type) && (
                    <div className="flex items-center space-x-2">
                      <span className="text-sm text-semantic-error">Not installed</span>
                      <a
                        href={getWalletInstallLink(wallet.type)}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-sm text-primary hover:text-primary-hover"
                        onClick={(e) => e.stopPropagation()}
                      >
                        Install
                      </a>
                    </div>
                  )}
                </div>
              </button>
            </div>
          ))}
        </div>
        <div className="mt-6 space-y-4">
          <div>
            <h3 className="font-medium mb-2">Easy Login</h3>
            <p className="text-sm text-text-tertiary">No need to create new accounts and passwords for every website. Just connect your wallet and get going.</p>
          </div>
          <div>
            <h3 className="font-medium mb-2">Store your Digital Assets</h3>
            <p className="text-sm text-text-tertiary">Send, receive, store, and display your digital assets like NFTs & coins.</p>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default WalletModal;