import { useState } from "react";
import { MessageSquare, TrendingUp, Diamond, LineChart } from "lucide-react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";

const Index = () => {
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState([
    {
      type: "bot",
      content: "Hi! I'm Nexus, your AI trading companion. How can I help you today?",
    },
  ]);

  const features = [
    {
      title: "Profitable Traders",
      icon: TrendingUp,
      comingSoon: false,
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
      {/* Hero Section */}
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="text-center mb-12 space-y-3"
      >
        <h1 className="text-4xl font-bold bg-gradient-to-r from-nodo-orange to-nodo-orange-light bg-clip-text text-transparent">
          NODO: Democratizing DeFi Trading with AI
        </h1>
        <p className="text-gray-400">
          Building the Future of AI-Powered Trading on Sui Network
        </p>
      </motion.div>

      {/* Feature Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        {features.map((feature, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: index * 0.1 }}
            className="glass rounded-lg p-6 flex flex-col items-center justify-center space-y-2 hover:bg-white/20 transition-all duration-200 cursor-pointer"
          >
            <feature.icon className="w-6 h-6 text-nodo-orange" />
            <h3 className="font-medium text-white">{feature.title}</h3>
            {feature.comingSoon && (
              <span className="text-sm text-gray-400">(Coming Soon)</span>
            )}
          </motion.div>
        ))}
      </div>

      {/* Chat Interface */}
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
        className="glass rounded-lg p-4 min-h-[500px] flex flex-col"
      >
        {/* Messages Container */}
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
                className={`max-w-[80%] rounded-lg p-3 ${
                  msg.type === "user"
                    ? "orange-gradient text-white"
                    : "bg-white/5 text-white hover:bg-white/10 transition-colors duration-200"
                }`}
              >
                {msg.content}
              </div>
            </motion.div>
          ))}
        </div>

        {/* Input Form */}
        <form onSubmit={handleSubmit} className="relative mt-auto">
          <div className="flex gap-2 items-center bg-white/5 rounded-lg p-2 hover:bg-white/10 transition-all duration-200">
            <Textarea
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              placeholder="Ask about crypto markets..."
              className="flex-1 bg-transparent border-none focus:ring-0 resize-none text-white placeholder:text-gray-400"
              rows={1}
            />
            <Button
              type="submit"
              className="orange-gradient hover:opacity-90 transition-all duration-200"
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