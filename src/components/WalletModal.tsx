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

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="flex justify-between items-center">
            <span>Connect a Wallet</span>
            <button onClick={onClose} className="text-gray-400 hover:text-white">
              <X className="h-4 w-4" />
            </button>
          </DialogTitle>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <button
            onClick={() => onSelectWallet("sui")}
            className={cn(
              "flex items-center space-x-3 w-full p-3 rounded-lg transition-colors text-left",
              getWalletStatus("sui")
                ? "hover:bg-white/5"
                : "opacity-50 cursor-not-allowed"
            )}
            disabled={!getWalletStatus("sui")}
          >
            <img src="/lovable-uploads/a1fd43d4-26fa-4d06-8b4d-97c2b83df6e5.png" alt="Sui Wallet" className="w-6 h-6" />
            <div className="flex flex-col">
              <span>Sui Wallet</span>
              {!getWalletStatus("sui") && (
                <span className="text-sm text-red-400">Not installed</span>
              )}
            </div>
          </button>
          
          <button
            onClick={() => onSelectWallet("martian")}
            className={cn(
              "flex items-center space-x-3 w-full p-3 rounded-lg transition-colors text-left",
              getWalletStatus("martian")
                ? "hover:bg-white/5"
                : "opacity-50 cursor-not-allowed"
            )}
            disabled={!getWalletStatus("martian")}
          >
            <img src="/lovable-uploads/a1fd43d4-26fa-4d06-8b4d-97c2b83df6e5.png" alt="Martian Sui Wallet" className="w-6 h-6" />
            <div className="flex flex-col">
              <span>Martian Sui Wallet</span>
              {!getWalletStatus("martian") && (
                <span className="text-sm text-red-400">Not installed</span>
              )}
            </div>
          </button>
          
          <button
            onClick={() => onSelectWallet("suiet")}
            className={cn(
              "flex items-center space-x-3 w-full p-3 rounded-lg transition-colors text-left",
              getWalletStatus("suiet")
                ? "hover:bg-white/5"
                : "opacity-50 cursor-not-allowed"
            )}
            disabled={!getWalletStatus("suiet")}
          >
            <img src="/lovable-uploads/a1fd43d4-26fa-4d06-8b4d-97c2b83df6e5.png" alt="Suiet" className="w-6 h-6" />
            <div className="flex flex-col">
              <span>Suiet</span>
              {!getWalletStatus("suiet") && (
                <span className="text-sm text-red-400">Not installed</span>
              )}
            </div>
          </button>
        </div>
        <div className="mt-6 space-y-4">
          <div>
            <h3 className="font-medium mb-2">Easy Login</h3>
            <p className="text-sm text-gray-400">No need to create new accounts and passwords for every website. Just connect your wallet and get going.</p>
          </div>
          <div>
            <h3 className="font-medium mb-2">Store your Digital Assets</h3>
            <p className="text-sm text-gray-400">Send, receive, store, and display your digital assets like NFTs & coins.</p>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default WalletModal;