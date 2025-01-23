import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Send, Mic, TrendingUp, BarChart2, Diamond, ArrowDownUp } from "lucide-react";
import { cn } from "@/lib/utils";

const features = [
  {
    id: "profitable-traders",
    title: "Profitable Traders",
    description: "Discover top-performing trading strategies",
    icon: TrendingUp,
    disabled: false,
  },
  {
    id: "trending-tokens",
    title: "Trending Tokens",
    description: "Track real-time market movements",
    icon: BarChart2,
    disabled: false,
  },
  {
    id: "find-gems",
    title: "Find Gems",
    description: "Discover promising opportunities",
    icon: Diamond,
    disabled: true,
  },
  {
    id: "large-trades",
    title: "Large Trades",
    description: "Monitor significant market activities",
    icon: ArrowDownUp,
    disabled: true,
  },
];

export default function Index() {
  const [message, setMessage] = React.useState("");
  const [isExpanded, setIsExpanded] = React.useState(false);
  const [selectedFeature, setSelectedFeature] = React.useState<string | null>(null);
  const [isLoading, setIsLoading] = React.useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!message.trim()) return;
    console.log("Sending message:", message);
    setMessage("");
  };

  const handleFeatureClick = async (id: string) => {
    if (features.find(f => f.id === id)?.disabled) return;
    
    setSelectedFeature(id);
    setIsLoading(true);
    setIsExpanded(true);
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000));
    setIsLoading(false);
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
          <h1 className="text-[32px] font-semibold leading-tight bg-gradient-to-r from-[#FF7A0F] to-[#FFB366] bg-clip-text text-transparent hover:animate-gradient-shift bg-[length:200%_200%]">
            Nexus AI
          </h1>
          <p className="text-base text-text-secondary mt-4 opacity-80">
            Your personal AI trading companion
          </p>
        </motion.div>

        {/* Chat Container */}
        <motion.div 
          animate={{ height: isExpanded ? 400 : 100 }}
          transition={{ duration: 0.3, ease: [0.4, 0, 0.2, 1] }}
          className="w-[768px] mx-auto bg-background-surface/60 rounded-xl border border-border-subtle overflow-hidden"
        >
          <div className="flex flex-col h-full">
            {/* Welcome Message */}
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.3 }}
              className="flex-1 p-6"
            >
              <div className="text-lg font-medium text-text-primary text-center">
                How can I help you with trading today?
              </div>
              
              {isExpanded && (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.2 }}
                  className="mt-4"
                >
                  {isLoading ? (
                    <div className="flex items-center justify-center space-x-2">
                      <div className="w-4 h-4 border-2 border-primary border-t-transparent rounded-full animate-spin" />
                      <span className="text-text-secondary">Loading...</span>
                    </div>
                  ) : (
                    <div className="space-y-4">
                      {selectedFeature === "profitable-traders" && (
                        <div className="space-y-2">
                          <h3 className="text-lg font-semibold">Top Traders</h3>
                          <div className="space-y-2">
                            <div className="h-12 bg-background-elevated rounded animate-pulse" />
                            <div className="h-12 bg-background-elevated rounded animate-pulse" />
                            <div className="h-12 bg-background-elevated rounded animate-pulse" />
                          </div>
                        </div>
                      )}
                      {selectedFeature === "trending-tokens" && (
                        <div className="space-y-2">
                          <h3 className="text-lg font-semibold">Market Overview</h3>
                          <div className="grid grid-cols-2 gap-4">
                            <div className="h-32 bg-background-elevated rounded animate-pulse" />
                            <div className="h-32 bg-background-elevated rounded animate-pulse" />
                          </div>
                        </div>
                      )}
                    </div>
                  )}
                </motion.div>
              )}
            </motion.div>

            {/* Input Area */}
            <div className="p-4 border-t border-border-subtle bg-background-surface/80">
              <form onSubmit={handleSubmit} className="relative">
                <Input
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  placeholder="Message Nexus..."
                  className="h-12 pr-32 bg-background-elevated border-border-subtle 
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
        </motion.div>

        {/* Feature Buttons */}
        <div className="flex justify-center gap-4 mt-6">
          {features.map((feature) => (
            <motion.button
              key={feature.id}
              onClick={() => handleFeatureClick(feature.id)}
              className={cn(
                "flex items-center gap-3 w-[174px] h-12 px-4 rounded-xl border transition-all duration-200",
                feature.disabled
                  ? "opacity-50 cursor-not-allowed grayscale bg-background-surface/30 border-border-subtle"
                  : "bg-background-surface/60 border-border-subtle hover:scale-102 hover:shadow-glow-sm active:scale-98"
              )}
              whileHover={!feature.disabled ? { scale: 1.02 } : undefined}
              whileTap={!feature.disabled ? { scale: 0.98 } : undefined}
              disabled={feature.disabled}
            >
              <feature.icon className="w-4 h-4 text-primary shrink-0" />
              <div className="flex flex-col items-start">
                <span className="text-sm font-semibold text-text-primary">{feature.title}</span>
                <span className="text-xs text-text-secondary">{feature.description}</span>
              </div>
              {feature.disabled && (
                <span className="absolute top-2 right-2 text-[10px] text-text-tertiary">
                  Soon
                </span>
              )}
            </motion.button>
          ))}
        </div>
      </div>
    </div>
  );
}