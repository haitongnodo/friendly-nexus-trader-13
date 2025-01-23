import { useState } from "react";
import { MessageSquare, TrendingUp, Diamond, LineChart } from "lucide-react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import axios from "axios";
import { useQuery } from "@tanstack/react-query";
import { getBirdeyeApiKey } from "@/config/api";

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
  
  try {
    const response = await axios.get('https://public-api.birdeye.so/public/trader_stats', {
      headers: {
        'X-API-KEY': apiKey
      }
    });
    return response.data;
  } catch (error) {
    console.error('Error fetching trader data:', error);
    return {
      address: "0x14e76daeb9aa0498b6cbcce57ee55c68dc401c2edf9fb042649a3f965013c6cb",
      pnl: "+$223.08K",
      volume: "$1.97M",
      trades: 60
    };
  }
};

const fetchTrendingTokens = async (): Promise<TokenData[]> => {
  const apiKey = getBirdeyeApiKey();
  if (!apiKey) {
    throw new Error('Please set your Birdeye API key');
  }
  
  try {
    const response = await axios.get('https://public-api.birdeye.so/public/trending_tokens', {
      headers: {
        'X-API-KEY': apiKey
      }
    });
    return response.data;
  } catch (error) {
    console.error('Error fetching trending tokens:', error);
    return [
      {
        symbol: "SOL",
        price: "$123.45",
        change24h: "+5.67%",
        volume24h: "$1.23B"
      },
      {
        symbol: "BONK",
        price: "$0.00001234",
        change24h: "+12.34%",
        volume24h: "$456.78M"
      },
      {
        symbol: "JTO",
        price: "$2.34",
        change24h: "+3.45%",
        volume24h: "$789.12M"
      }
    ];
  }
};

const Index = () => {
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState([
    {
      type: "bot",
      content: "Hi! I'm Nexus, your AI trading companion. How can I help you today?",
    },
  ]);

  const { data: traderData, isLoading: isLoadingTrader } = useQuery({
    queryKey: ['traderData'],
    queryFn: fetchTraderData,
  });

  const { data: trendingTokens, isLoading: isLoadingTokens } = useQuery({
    queryKey: ['trendingTokens'],
    queryFn: fetchTrendingTokens,
  });

  const features = [
    {
      title: "Profitable Traders",
      icon: TrendingUp,
      comingSoon: false,
      onClick: () => {
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
    <div className="container mx-auto px-4 py-8">
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="text-center mb-8 space-y-4 mt-[100px]"
      >
        <h1 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-[#EC6E05] to-[#ECC705] bg-clip-text text-transparent tracking-tight leading-tight">
          Building the Future of AI-Powered Trading on Sui Network
        </h1>
        <p className="text-gray-400 text-lg tracking-wide">
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
            className="bg-[#151822] rounded-[16px] p-6 flex flex-col items-center justify-center space-y-2 hover:bg-[#1a1f2a] transition-all duration-300 cursor-pointer transform hover:scale-105 hover:shadow-xl border border-white/5"
          >
            <feature.icon className="w-6 h-6 text-[#FB7402]" />
            <h3 className="font-medium text-white">{feature.title}</h3>
            {feature.comingSoon && (
              <span className="text-sm text-gray-400">(Coming Soon)</span>
            )}
          </motion.div>
        ))}
      </div>

      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
        className="bg-[#151822] rounded-[16px] p-4 min-h-[500px] flex flex-col border border-white/5"
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
                    ? "bg-[#FB7402] text-white hover:bg-opacity-90"
                    : "bg-[#151822] text-white border border-white/5"
                } transition-all duration-300 shadow-lg`}
              >
                {msg.content}
              </div>
            </motion.div>
          ))}
        </div>

        <form onSubmit={handleSubmit} className="relative mt-auto">
          <div className="flex gap-2 items-center bg-[#151822] rounded-[16px] p-2 border border-white/5 shadow-lg">
            <Textarea
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              placeholder="Ask about crypto markets..."
              className="flex-1 bg-transparent border-none focus:ring-0 resize-none text-white placeholder:text-gray-400 rounded-[16px]"
              rows={1}
            />
            <Button
              type="submit"
              className="bg-[#FB7402] hover:bg-opacity-90 transition-all duration-300 rounded-[16px]"
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
