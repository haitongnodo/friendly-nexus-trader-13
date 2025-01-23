import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Send, Mic, TrendingUp, BarChart2, Diamond, ArrowDownUp, X } from "lucide-react";
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
  const [expandedCard, setExpandedCard] = React.useState<string | null>(null);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!message.trim()) return;
    console.log("Sending message:", message);
    setMessage("");
  };

  const handleCardClick = (id: string) => {
    if (expandedCard === id) {
      setExpandedCard(null);
    } else {
      setExpandedCard(id);
    }
  };

  React.useEffect(() => {
    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setExpandedCard(null);
      }
    };
    window.addEventListener("keydown", handleEsc);
    return () => window.removeEventListener("keydown", handleEsc);
  }, []);

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
        <div className="w-[768px] mx-auto bg-background-surface rounded-lg border border-border-subtle mb-10 overflow-hidden">
          <div className="h-[70vh] flex flex-col">
            {/* Chat Messages */}
            <div className="flex-1 overflow-y-auto p-6">
              <div className="text-[24px] font-medium text-text-primary text-center">
                How can I help you with trading today?
              </div>
            </div>

            {/* Input Area */}
            <div className="p-6 border-t border-border-subtle">
              <form onSubmit={handleSubmit} className="relative">
                <Input
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  placeholder="Message Nexus..."
                  className="h-[48px] pr-32 bg-background-elevated border-border-subtle 
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

        {/* Feature Cards */}
        <div className="flex justify-center gap-6 mb-10">
          <AnimatePresence>
            {features.map((feature) => (
              <motion.div
                key={feature.id}
                layout
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ 
                  opacity: 1, 
                  scale: 1,
                  width: expandedCard === feature.id ? '768px' : '174px',
                  height: expandedCard === feature.id ? '400px' : '64px',
                }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.3, ease: [0.4, 0, 0.2, 1] }}
                onClick={() => !feature.disabled && handleCardClick(feature.id)}
                className={cn(
                  "relative p-3 rounded-xl border border-border-subtle backdrop-blur-lg",
                  feature.disabled 
                    ? "bg-background-surface/30 cursor-not-allowed grayscale opacity-50" 
                    : "bg-background-surface hover:scale-102 hover:shadow-glow-sm transition-all duration-200 cursor-pointer",
                  expandedCard && expandedCard !== feature.id ? "opacity-60" : ""
                )}
                aria-disabled={feature.disabled}
              >
                <div className="flex items-center gap-3">
                  <feature.icon className="w-4 h-4 text-primary shrink-0" />
                  <div className="flex flex-col">
                    <h3 className="text-sm font-semibold">{feature.title}</h3>
                    {!expandedCard && (
                      <p className="text-xs text-text-secondary">{feature.description}</p>
                    )}
                  </div>
                  {feature.disabled && (
                    <span className="absolute top-2 right-2 text-[10px] text-text-tertiary">
                      Soon
                    </span>
                  )}
                  {expandedCard === feature.id && (
                    <Button
                      size="icon"
                      variant="ghost"
                      className="absolute top-2 right-2 h-6 w-6"
                      onClick={(e) => {
                        e.stopPropagation();
                        setExpandedCard(null);
                      }}
                    >
                      <X className="h-4 w-4" />
                    </Button>
                  )}
                </div>
                
                {expandedCard === feature.id && (
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.2 }}
                    className="mt-6 p-4"
                  >
                    {/* Expanded content based on card type */}
                    {feature.id === "profitable-traders" && (
                      <div className="space-y-4">
                        <h4 className="text-lg font-semibold">Top Traders</h4>
                        <div className="space-y-2">
                          {/* Placeholder content */}
                          <div className="h-8 bg-background-elevated rounded animate-pulse" />
                          <div className="h-8 bg-background-elevated rounded animate-pulse" />
                          <div className="h-8 bg-background-elevated rounded animate-pulse" />
                        </div>
                      </div>
                    )}
                    {feature.id === "trending-tokens" && (
                      <div className="space-y-4">
                        <h4 className="text-lg font-semibold">Market Overview</h4>
                        <div className="space-y-2">
                          {/* Placeholder content */}
                          <div className="h-32 bg-background-elevated rounded animate-pulse" />
                          <div className="h-8 bg-background-elevated rounded animate-pulse" />
                        </div>
                      </div>
                    )}
                  </motion.div>
                )}
              </motion.div>
            ))}
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
}