import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Send, TrendingUp, BarChart2, Diamond, ArrowDownUp } from "lucide-react";
import { cn } from "@/lib/utils";
import { DataDisplay } from "@/components/DataDisplay";

const features = [
  {
    id: "traders",
    title: "Top Traders",
    icon: TrendingUp,
    disabled: false,
  },
  {
    id: "tokens",
    title: "Hot Tokens",
    icon: BarChart2,
    disabled: false,
  },
  {
    id: "gems",
    title: "Gem Finder",
    icon: Diamond,
    disabled: true,
  },
  {
    id: "bigmoves",
    title: "Big Moves",
    icon: ArrowDownUp,
    disabled: true,
  },
];

export default function Index() {
  const [message, setMessage] = useState("");
  const [isExpanded, setIsExpanded] = useState(false);
  const [selectedFeature, setSelectedFeature] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);

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
    <div className="min-h-screen bg-page-gradient relative">
      <div className="absolute inset-0 bg-noise opacity-[0.02] pointer-events-none" />
      
      {/* Ambient gradients */}
      <div className="fixed top-0 right-0 w-[500px] h-[500px] bg-primary/[0.02] blur-[120px] pointer-events-none mix-blend-soft-light" />
      <div className="fixed bottom-0 left-0 w-[500px] h-[500px] bg-primary/[0.03] blur-[120px] pointer-events-none mix-blend-soft-light" />
      
      {/* Content */}
      <div className="max-w-chat mx-auto px-6 relative">
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

        {/* Chat Container */}
        <motion.div 
          animate={{ height: isExpanded ? 400 : 100 }}
          transition={{ duration: 0.3, ease: [0.4, 0, 0.2, 1] }}
          className="w-full max-w-chat mx-auto bg-background-surface/60 backdrop-blur-md rounded-xl border border-border-subtle shadow-large overflow-hidden"
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
                  <DataDisplay 
                    type={selectedFeature === "traders" ? "traders" : "tokens"}
                    isLoading={isLoading}
                  />
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
                  className="h-12 pr-16 bg-background-elevated border-border-subtle 
                    placeholder:text-sm placeholder:text-text-disabled
                    focus:border-primary/30 focus:shadow-glow-sm focus:bg-background-surface
                    transition-all duration-200"
                />
                <div className="absolute right-3 top-1/2 -translate-y-1/2">
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
                "relative flex items-center gap-3 h-12 px-4 rounded-xl border transition-all duration-200",
                feature.disabled
                  ? "opacity-50 cursor-not-allowed grayscale bg-background-surface/30 border-border-subtle"
                  : "bg-background-surface/60 border-border-subtle hover:scale-102 hover:shadow-glow-sm active:scale-98"
              )}
              whileHover={!feature.disabled ? { scale: 1.02 } : undefined}
              whileTap={!feature.disabled ? { scale: 0.98 } : undefined}
              disabled={feature.disabled}
            >
              <feature.icon className="w-5 h-5 text-primary shrink-0" />
              <span className="text-sm font-semibold text-text-primary">{feature.title}</span>
              {feature.disabled && (
                <span className="absolute -top-2 -right-2 px-2 py-0.5 text-[10px] font-medium text-text-tertiary bg-background-elevated rounded-full border border-border-subtle">
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