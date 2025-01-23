import { X } from "lucide-react";
import { cn } from "@/lib/utils";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

interface WalletModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSelectWallet: (wallet: string) => void;
  availableWallets: any[];
}

const WalletModal = ({ isOpen, onClose, onSelectWallet, availableWallets }: WalletModalProps) => {
  const getWalletStatus = (type: string) => {
    const wallet = availableWallets.find(w => w.name === type);
    return wallet?.installed;
  };

  const handleWalletSelect = async (walletType: string) => {
    console.log(`Selecting wallet: ${walletType}`);
    onSelectWallet(walletType);
    onClose();
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
          <button
            onClick={() => handleWalletSelect("sui")}
            className={cn(
              "flex items-center space-x-4 w-full p-4 rounded-lg transition-all duration-200 text-left relative",
              getWalletStatus("sui")
                ? "hover:bg-[rgba(255,122,15,0.15)] hover:border-primary hover:shadow-[0_0_10px_rgba(255,122,15,0.3)] border-2 border-transparent"
                : "opacity-50 cursor-not-allowed"
            )}
            disabled={!getWalletStatus("sui")}
          >
            <img src="/lovable-uploads/a7083879-0396-4ae6-ab70-4c8ba2c768fc.png" alt="Sui Wallet" className="w-8 h-8" />
            <div className="flex flex-col">
              <span className="font-medium text-[#FFB366]">Sui Wallet</span>
              {!getWalletStatus("sui") && (
                <span className="text-sm text-semantic-error mt-0.5">Not installed</span>
              )}
            </div>
          </button>
          
          <button
            onClick={() => handleWalletSelect("martian")}
            className={cn(
              "flex items-center space-x-4 w-full p-4 rounded-lg transition-colors text-left",
              getWalletStatus("martian")
                ? "hover:bg-overlay-hover border border-transparent hover:border-border-subtle"
                : "opacity-50 cursor-not-allowed"
            )}
            disabled={!getWalletStatus("martian")}
          >
            <img src="/lovable-uploads/d6b8c326-0ce6-4e60-9b88-d0aaedcf00f6.png" alt="Martian Sui Wallet" className="w-8 h-8" />
            <div className="flex flex-col">
              <span className="font-medium">Martian Sui Wallet</span>
              {!getWalletStatus("martian") && (
                <span className="text-sm text-semantic-error mt-0.5">Not installed</span>
              )}
            </div>
          </button>
          
          <button
            onClick={() => handleWalletSelect("suiet")}
            className={cn(
              "flex items-center space-x-4 w-full p-4 rounded-lg transition-colors text-left",
              getWalletStatus("suiet")
                ? "hover:bg-overlay-hover border border-transparent hover:border-border-subtle"
                : "opacity-50 cursor-not-allowed"
            )}
            disabled={!getWalletStatus("suiet")}
          >
            <img src="/lovable-uploads/d96930e3-ce73-4d48-b9b4-76357fcee014.png" alt="Suiet" className="w-8 h-8" />
            <div className="flex flex-col">
              <span className="font-medium">Suiet</span>
              {!getWalletStatus("suiet") && (
                <span className="text-sm text-semantic-error mt-0.5">Not installed</span>
              )}
            </div>
          </button>
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