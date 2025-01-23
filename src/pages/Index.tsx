import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Send, TrendingUp, BarChart2, Diamond, ArrowDownUp } from "lucide-react";
import { cn } from "@/lib/utils";
import { DataDisplay } from "@/components/DataDisplay";
import { useToast } from "@/components/ui/use-toast";

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
    <div className="h-screen overflow-hidden bg-page-gradient relative flex flex-col">
      {/* Ambient gradients */}
      <div className="absolute inset-0 bg-noise opacity-[0.02] pointer-events-none" />
      <div className="fixed top-0 right-0 w-[500px] h-[500px] bg-primary/[0.02] blur-[120px] pointer-events-none mix-blend-soft-light" />
      <div className="fixed bottom-0 left-0 w-[500px] h-[500px] bg-primary/[0.03] blur-[120px] pointer-events-none mix-blend-soft-light" />
      
      {/* Main Content Container */}
      <div className="max-w-[1200px] w-full mx-auto px-6 flex flex-col h-full">
        {/* Header Section */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="flex-none text-center py-6 h-[120px] flex flex-col justify-center"
        >
          <h1 className="text-[32px] font-semibold bg-primary-gradient bg-clip-text text-transparent mb-2">
            Nexus AI
          </h1>
          <p className="text-base text-text-secondary">
            Your personal AI trading companion
          </p>
        </motion.div>

        {/* Chat Container */}
        <motion.div 
          initial={{ scale: 0.98, opacity: 0.9 }}
          animate={{ 
            scale: 1,
            opacity: 1,
            height: isExpanded ? "calc(100vh - 300px)" : "auto",
            maxWidth: isExpanded ? "100%" : "800px",
          }}
          transition={{ 
            duration: 0.3,
            ease: [0.4, 0, 0.2, 1],
            delay: 0.05
          }}
          className={cn(
            "flex-1 mx-auto w-full backdrop-blur-md rounded-xl border border-border-subtle",
            "shadow-[0_8px_20px_rgba(0,0,0,0.1)] overflow-hidden flex flex-col",
            "bg-[rgba(20,21,26,0.7)] transition-all duration-300"
          )}
        >
          {/* Message Area - Scrollable */}
          <div className="flex-1 overflow-y-auto">
            {!isExpanded ? (
              <div className="flex items-center justify-center h-full min-h-[200px] p-6">
                <motion.div 
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.3 }}
                  className="text-xl leading-relaxed font-medium text-text-primary text-center max-w-[600px]"
                >
                  How can I help you with trading today?
                </motion.div>
              </div>
            ) : (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
                className="p-6 space-y-4"
              >
                <DataDisplay 
                  type={selectedFeature === "traders" ? "traders" : "tokens"}
                  isLoading={isLoading}
                />
              </motion.div>
            )}
          </div>

          {/* Input Area */}
          <div className="flex-none p-6 border-t border-border-subtle bg-background-surface/80">
            <form onSubmit={handleSubmit} className="relative w-full">
              <Input
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                placeholder="Message Nexus..."
                className="h-[60px] pr-16 bg-background-elevated border-border-subtle 
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
        </motion.div>

        {/* Feature Buttons */}
        <div className="flex-none h-[60px] flex justify-center gap-4 mt-6 mb-6">
          {features.map((feature) => (
            <motion.button
              key={feature.id}
              onClick={() => handleFeatureClick(feature.id)}
              className={cn(
                "relative flex items-center gap-3 px-4 h-[60px] rounded-xl border transition-all duration-200",
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