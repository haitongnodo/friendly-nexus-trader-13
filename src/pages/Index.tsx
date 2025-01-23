import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Send, TrendingUp, BarChart2, Diamond, ArrowDownUp } from "lucide-react";
import { cn } from "@/lib/utils";
import { DataDisplay } from "@/components/DataDisplay";
import { useToast } from "@/hooks/use-toast";

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
  const { toast } = useToast();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!message.trim()) return;
    
    if (message.toLowerCase().includes("trending") || 
        message.toLowerCase().includes("tokens") ||
        message.toLowerCase().includes("hot")) {
      handleFeatureClick("tokens");
    }
    
    setMessage("");
  };

  const handleFeatureClick = async (id: string) => {
    if (features.find(f => f.id === id)?.disabled) return;
    
    setSelectedFeature(id);
    setIsExpanded(true);
    setIsLoading(true);
    
    setTimeout(() => {
      setIsLoading(false);
    }, 500);
  };

  return (
    <div className="min-h-screen bg-page-gradient">
      {/* Content Container */}
      <div className="max-w-[800px] w-full mx-auto px-6">
        {/* Header Section */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="pt-32 pb-6 text-center"
        >
          <h1 className="text-[32px] font-semibold bg-primary-gradient bg-clip-text text-transparent">
            Nexus AI
          </h1>
          <p className="text-sm text-text-secondary mt-3">
            Your personal AI trading companion
          </p>
        </motion.div>

        {/* Chat Container */}
        <motion.div 
          initial={{ scale: 0.98, opacity: 0.9 }}
          animate={{ 
            scale: 1,
            opacity: 1,
            height: isExpanded ? "500px" : "100px",
          }}
          transition={{ 
            duration: 0.3,
            ease: [0.4, 0, 0.2, 1],
          }}
          className={cn(
            "w-full backdrop-blur-md rounded-xl border border-border-subtle",
            "shadow-[0_8px_20px_rgba(0,0,0,0.1)] overflow-hidden flex flex-col",
            "bg-[rgba(20,21,26,0.7)]"
          )}
        >
          {/* Welcome Message - Sticky Top */}
          <div className="flex-none sticky top-0 z-10 bg-inherit border-b border-border-subtle">
            <div className="flex items-center justify-center h-[60px]">
              <motion.div 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.3 }}
                className="text-[20px] font-medium text-text-primary"
              >
                How can I help you with trading today?
              </motion.div>
            </div>
          </div>

          {/* Scrollable Content Area */}
          <div className="flex-1 overflow-y-auto scrollbar-thin px-6">
            {isExpanded && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
                className="py-4 space-y-4"
              >
                <DataDisplay 
                  type={selectedFeature === "traders" ? "traders" : "tokens"}
                  isLoading={isLoading}
                />
              </motion.div>
            )}
          </div>

          {/* Input Area - Sticky Bottom */}
          <div className="flex-none sticky bottom-0 p-4 border-t border-border-subtle bg-background-surface/80 backdrop-blur-sm">
            <form onSubmit={handleSubmit} className="relative w-full">
              <Input
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                placeholder="Message Nexus..."
                className="h-[40px] pr-12 bg-background-elevated border-border-subtle 
                  placeholder:text-sm placeholder:text-text-disabled
                  focus:border-primary/30 focus:shadow-glow-sm focus:bg-background-surface
                  transition-all duration-200"
              />
              <div className="absolute right-2 top-1/2 -translate-y-1/2">
                <Button
                  type="submit"
                  size="icon"
                  className="h-7 w-7 bg-primary hover:bg-primary-hover transition-colors duration-200"
                  disabled={!message.trim()}
                >
                  <Send className="h-4 w-4" />
                </Button>
              </div>
            </form>
          </div>
        </motion.div>

        {/* Feature Buttons */}
        <div className="mt-5 mb-6 flex justify-center gap-3">
          {features.map((feature) => (
            <motion.button
              key={feature.id}
              onClick={() => handleFeatureClick(feature.id)}
              className={cn(
                "relative flex items-center gap-3 px-4 h-[40px] rounded-xl border transition-all duration-200",
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