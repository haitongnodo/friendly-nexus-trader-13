import { useState, useEffect } from "react";
import { MessageSquare, TrendingUp, Diamond, LineChart } from "lucide-react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/components/ui/use-toast";
import axios from "axios";
import { useQuery } from "@tanstack/react-query";
import { getBirdeyeApiKey, setBirdeyeApiKey } from "@/config/api";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";

interface TraderData {
  address: string;
  pnl: string;
  volume: string;
  trades: number;
}

interface TokenData {
  symbol: string;
  price: string;
  change24h: string;
  volume24h: string;
}

const fetchTraderData = async (): Promise<TraderData> => {
  const apiKey = getBirdeyeApiKey();
  if (!apiKey) {
    throw new Error('Please set your Birdeye API key');
  }
  
  const response = await axios.get('https://public-api.birdeye.so/public/trader_stats', {
    headers: {
      'X-API-KEY': apiKey
    }
  });
  return response.data;
};

const fetchTrendingTokens = async (): Promise<TokenData[]> => {
  const apiKey = getBirdeyeApiKey();
  if (!apiKey) {
    throw new Error('Please set your Birdeye API key');
  }
  
  const response = await axios.get('https://public-api.birdeye.so/public/trending_tokens', {
    headers: {
      'X-API-KEY': apiKey
    }
  });
  return response.data;
};

const Index = () => {
  const [message, setMessage] = useState("");
  const [showApiKeyDialog, setShowApiKeyDialog] = useState(false);
  const [apiKey, setApiKey] = useState("");
  const { toast } = useToast();
  const [messages, setMessages] = useState([
    {
      type: "bot",
      content: "Hi! I'm Nexus, your AI trading companion. How can I help you today?",
    },
  ]);

  useEffect(() => {
    if (!getBirdeyeApiKey()) {
      setShowApiKeyDialog(true);
    }
  }, []);

  const { data: traderData, isLoading: isLoadingTrader, error: traderError } = useQuery({
    queryKey: ['traderData'],
    queryFn: fetchTraderData,
    enabled: !!getBirdeyeApiKey(),
  });

  const { data: trendingTokens, isLoading: isLoadingTokens, error: tokensError } = useQuery({
    queryKey: ['trendingTokens'],
    queryFn: fetchTrendingTokens,
    enabled: !!getBirdeyeApiKey(),
  });

  const handleSaveApiKey = () => {
    if (apiKey.trim()) {
      setBirdeyeApiKey(apiKey.trim());
      setShowApiKeyDialog(false);
      toast({
        title: "API Key Saved",
        description: "Your Birdeye API key has been saved successfully.",
      });
      window.location.reload(); // Reload to trigger new API calls
    }
  };

  const features = [
    {
      title: "Profitable Traders",
      icon: TrendingUp,
      comingSoon: false,
      onClick: () => {
        if (!getBirdeyeApiKey()) {
          setShowApiKeyDialog(true);
          return;
        }
        if (traderError) {
          toast({
            title: "Error",
            description: "Failed to fetch trader data. Please try again.",
            variant: "destructive",
          });
          return;
        }
        if (traderData) {
          setMessages(prev => [...prev, {
            type: "bot",
            content: `Trader ${traderData.address}\n\n• PnL: ${traderData.pnl}\n\n• Volume: ${traderData.volume}\n\n• Trades: ${traderData.trades}\n\nData provided by Birdeye API`
          }]);
        }
      }
    },
    {
      title: "Trending Tokens",
      icon: LineChart,
      comingSoon: false,
      onClick: () => {
        if (!getBirdeyeApiKey()) {
          setShowApiKeyDialog(true);
          return;
        }
        if (tokensError) {
          toast({
            title: "Error",
            description: "Failed to fetch token data. Please try again.",
            variant: "destructive",
          });
          return;
        }
        if (trendingTokens) {
          const tokenList = trendingTokens.map(token => 
            `${token.symbol}\n• Price: ${token.price}\n• 24h Change: ${token.change24h}\n• 24h Volume: ${token.volume24h}`
          ).join('\n\n');
          setMessages(prev => [...prev, {
            type: "bot",
            content: `Trending Tokens:\n\n${tokenList}\n\nData provided by Birdeye API`
          }]);
        }
      }
    },
    {
      title: "Find Gems",
      icon: Diamond,
      comingSoon: true,
    },
    {
      title: "Large Trades",
      icon: TrendingUp,
      comingSoon: true,
    },
  ];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!message.trim()) return;

    setMessages((prev) => [
      ...prev,
      { type: "user", content: message },
      { type: "bot", content: "I'm still being developed, but I'll be able to help you with trading soon!" },
    ]);
    setMessage("");
  };

  return (
    <div className="container mx-auto px-4 py-8 bg-background-base min-h-screen">
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="text-center mb-8 space-y-4 mt-[100px]"
      >
        <h1 className="text-4xl md:text-5xl font-bold bg-primary-gradient bg-clip-text text-transparent tracking-tight leading-tight">
          Building the Future of AI-Powered Trading on Sui Network
        </h1>
        <p className="text-text-secondary text-lg tracking-wide">
          Building the Future of AI-Powered Trading on Sui Network
        </p>
      </motion.div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        {features.map((feature, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: index * 0.1 }}
            onClick={feature.onClick}
            className="bg-background-surface rounded-[16px] p-6 flex flex-col items-center justify-center space-y-2 hover:bg-background-elevated transition-all duration-normal cursor-pointer transform hover:scale-105 hover:shadow-medium border border-border-subtle"
          >
            <feature.icon className="w-6 h-6 text-primary" />
            <h3 className="font-medium text-text-primary">{feature.title}</h3>
            {feature.comingSoon && (
              <span className="text-sm text-text-tertiary">(Coming Soon)</span>
            )}
          </motion.div>
        ))}
      </div>

      <Dialog open={showApiKeyDialog} onOpenChange={setShowApiKeyDialog}>
        <DialogContent className="bg-background-elevated border-border-strong">
          <DialogHeader>
            <DialogTitle className="text-text-primary">Enter Birdeye API Key</DialogTitle>
            <DialogDescription className="text-text-secondary">
              Please enter your Birdeye API key to access trading data.
              You can get your API key from the Birdeye website.
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4">
            <Input
              value={apiKey}
              onChange={(e) => setApiKey(e.target.value)}
              placeholder="Enter your Birdeye API key"
              type="password"
              className="bg-background-surface border-border-subtle text-text-primary placeholder:text-text-disabled"
            />
            <Button 
              onClick={handleSaveApiKey} 
              className="w-full bg-primary hover:bg-primary-hover active:bg-primary-pressed text-white transition-colors duration-normal"
            >
              Save API Key
            </Button>
          </div>
        </DialogContent>
      </Dialog>

      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
        className="bg-background-surface rounded-[16px] p-4 min-h-[500px] flex flex-col border border-border-subtle shadow-medium"
      >
        <div className="flex-1 space-y-4 overflow-y-auto mb-4 p-4">
          {messages.map((msg, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: i * 0.1 }}
              className={`flex ${
                msg.type === "user" ? "justify-end" : "justify-start"
              }`}
            >
              <div
                className={`max-w-[80%] rounded-[16px] p-4 ${
                  msg.type === "user"
                    ? "bg-primary text-white hover:bg-primary-hover"
                    : "bg-background-elevated text-text-primary border border-border-subtle"
                } transition-all duration-normal shadow-medium`}
              >
                {msg.content}
              </div>
            </motion.div>
          ))}
        </div>

        <form onSubmit={handleSubmit} className="relative mt-auto">
          <div className="flex gap-2 items-center bg-background-elevated rounded-[16px] p-2 border border-border-subtle shadow-medium">
            <Textarea
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              placeholder="Ask about crypto markets..."
              className="flex-1 bg-transparent border-none focus:ring-0 resize-none text-text-primary placeholder:text-text-disabled rounded-[16px]"
              rows={1}
            />
            <Button
              type="submit"
              className="bg-primary hover:bg-primary-hover active:bg-primary-pressed text-white transition-colors duration-normal rounded-[16px]"
            >
              Send
            </Button>
          </div>
        </form>
      </motion.div>
    </div>
  );
};

export default Index;
