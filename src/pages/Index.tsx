import React from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Send, Mic, TrendingUp, BarChart2, Diamond, ArrowDownUp } from "lucide-react";

const features = [
  {
    title: "Profitable Traders",
    description: "Discover top-performing trading strategies",
    icon: TrendingUp,
    disabled: false,
  },
  {
    title: "Trending Tokens",
    description: "Track real-time market movements",
    icon: BarChart2,
    disabled: false,
  },
  {
    title: "Find Gems",
    description: "Discover promising opportunities",
    icon: Diamond,
    disabled: true,
  },
  {
    title: "Large Trades",
    description: "Monitor significant market activities",
    icon: ArrowDownUp,
    disabled: true,
  },
];

export default function Index() {
  const [message, setMessage] = React.useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!message.trim()) return;
    console.log("Sending message:", message);
    setMessage("");
  };

  return (
    <div className="min-h-screen bg-background-base text-text-primary">
      <div className="max-w-chat mx-auto px-6">
        {/* Header Section */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mt-[89px] mb-[55px]"
        >
          <h1 className="text-title bg-primary-gradient bg-clip-text text-transparent hover:animate-gradient-shift bg-[length:200%_200%]">
            Nexus AI
          </h1>
          <p className="text-base text-text-secondary mt-4">
            Your personal AI trading companion
          </p>
        </motion.div>

        {/* Feature Cards Grid */}
        <motion.div 
          variants={{
            show: {
              transition: {
                staggerChildren: 0.1
              }
            }
          }}
          initial="hidden"
          animate="show"
          className="grid grid-cols-2 gap-8 mb-10"
        >
          {features.map((feature, index) => (
            <motion.div
              key={index}
              variants={{
                hidden: { opacity: 0, y: 20 },
                show: { opacity: 1, y: 0 }
              }}
              className={`relative h-24 p-6 rounded-lg border border-border-subtle 
                ${feature.disabled 
                  ? 'bg-background-surface/30 cursor-not-allowed grayscale opacity-50' 
                  : 'bg-background-surface hover:scale-[1.01] hover:shadow-glow-sm transition-all duration-200'
                }`}
              aria-disabled={feature.disabled}
            >
              <div className="flex items-start gap-4">
                <div className={`p-2 rounded-md ${feature.disabled ? 'opacity-50' : ''}`}>
                  <feature.icon className="w-6 h-6 text-primary" />
                </div>
                <div>
                  <h3 className="font-medium text-base mb-1">{feature.title}</h3>
                  <p className="text-sm text-text-secondary">{feature.description}</p>
                </div>
                {feature.disabled && (
                  <span className="absolute top-2 right-2 text-helper text-text-tertiary">
                    Coming Soon
                  </span>
                )}
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* Chat Container */}
        <div className="w-[672px] mx-auto bg-background-surface rounded-lg border border-border-subtle mb-6 overflow-hidden">
          <div className="h-[70vh] flex flex-col">
            {/* Chat Messages */}
            <div className="flex-1 overflow-y-auto p-6">
              <div className="text-chat text-text-secondary">
                Start a conversation with your AI trading assistant...
              </div>
            </div>

            {/* Input Area */}
            <div className="p-6 border-t border-border-subtle">
              <form onSubmit={handleSubmit} className="relative">
                <Input
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  placeholder="Message Nexus..."
                  className="h-chat-input pr-32 bg-background-elevated border-border-subtle 
                    placeholder:text-sm placeholder:text-text-disabled
                    focus:border-primary/30 focus:shadow-glow-sm focus:bg-background-surface
                    transition-all duration-200"
                />
                <div className="absolute right-3 top-1/2 -translate-y-1/2 flex items-center gap-2">
                  <Button
                    type="button"
                    size="icon"
                    variant="ghost"
                    className="h-8 w-8 text-text-tertiary hover:text-primary hover:bg-primary/10"
                  >
                    <Mic className="h-5 w-5" />
                  </Button>
                  <Button
                    type="submit"
                    size="icon"
                    className="h-8 w-8 bg-primary hover:bg-primary-hover transition-colors duration-200"
                    disabled={!message.trim()}
                  >
                    <Send className="h-5 w-5" />
                  </Button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}