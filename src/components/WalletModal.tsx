import { X } from "lucide-react";
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
}

const WalletModal = ({ isOpen, onClose, onSelectWallet }: WalletModalProps) => {
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
            className="flex items-center space-x-3 w-full p-3 rounded-lg hover:bg-white/5 transition-colors text-left"
          >
            <img src="/lovable-uploads/a1fd43d4-26fa-4d06-8b4d-97c2b83df6e5.png" alt="Sui Wallet" className="w-6 h-6" />
            <span>Sui Wallet</span>
          </button>
          <button
            onClick={() => onSelectWallet("martian")}
            className="flex items-center space-x-3 w-full p-3 rounded-lg hover:bg-white/5 transition-colors text-left"
          >
            <img src="/lovable-uploads/a1fd43d4-26fa-4d06-8b4d-97c2b83df6e5.png" alt="Martian Sui Wallet" className="w-6 h-6" />
            <span>Martian Sui Wallet</span>
          </button>
          <button
            onClick={() => onSelectWallet("suiet")}
            className="flex items-center space-x-3 w-full p-3 rounded-lg hover:bg-white/5 transition-colors text-left"
          >
            <img src="/lovable-uploads/a1fd43d4-26fa-4d06-8b4d-97c2b83df6e5.png" alt="Suiet" className="w-6 h-6" />
            <span>Suiet</span>
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