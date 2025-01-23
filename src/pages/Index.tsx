import { useState } from "react";
import { MessageSquare, TrendingUp, Diamond, LineChart } from "lucide-react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import axios from "axios";
import { useQuery } from "@tanstack/react-query";

interface TraderData {
  address: string;
  pnl: string;
  volume: string;
  trades: number;
}

const fetchTraderData = async (): Promise<TraderData> => {
  // Note: Replace with actual Birdeye API endpoint and key
  const response = await axios.get('https://public-api.birdeye.so/public/trader_stats', {
    headers: {
      'X-API-KEY': 'your-birdeye-api-key'
    }
  });
  
  return {
    address: "0x14e76daeb9aa0498b6cbcce57ee55c68dc401c2edf9fb042649a3f965013c6cb",
    pnl: "+$223.08K",
    volume: "$1.97M",
    trades: 60
  };
};

const Index = () => {
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState([
    {
      type: "bot",
      content: "Hi! I'm Nexus, your AI trading companion. How can I help you today?",
    },
  ]);

  const { data: traderData, isLoading } = useQuery({
    queryKey: ['traderData'],
    queryFn: fetchTraderData,
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
        className="text-center mb-12 space-y-3"
      >
        <h1 className="text-4xl font-bold bg-gradient-to-r from-[#FB7402] to-[#FB7402] bg-clip-text text-transparent">
          NODO: Democratizing DeFi Trading with AI
        </h1>
        <p className="text-gray-400">
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
            className="bg-gradient-to-[45deg] from-[#212121] to-[#060606] rounded-[16px] p-6 flex flex-col items-center justify-center space-y-2 hover:bg-white/5 transition-all duration-300 cursor-pointer transform hover:scale-105 hover:shadow-lg"
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
        className="bg-gradient-to-[45deg] from-[#212121] to-[#060606] rounded-[16px] p-4 min-h-[500px] flex flex-col"
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
                className={`max-w-[80%] rounded-[16px] p-3 ${
                  msg.type === "user"
                    ? "bg-[#FB7402] text-white hover:bg-opacity-90"
                    : "bg-white/5 text-white hover:bg-white/10"
                } transition-all duration-300`}
              >
                {msg.content}
              </div>
            </motion.div>
          ))}
        </div>

        <form onSubmit={handleSubmit} className="relative mt-auto">
          <div className="flex gap-2 items-center bg-white/5 rounded-[16px] p-2 hover:bg-white/10 transition-all duration-300">
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