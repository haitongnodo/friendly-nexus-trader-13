import React from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card } from "@/components/ui/card";
import { Send, Mic, Image, Settings, Command, ChevronRight } from "lucide-react";

const features = [
  {
    title: "Natural Conversations",
    description: "Chat naturally with AI about trading strategies and market analysis",
    icon: Command,
  },
  {
    title: "Voice Commands",
    description: "Use voice commands to control your trading experience",
    icon: Mic,
  },
  {
    title: "Visual Analysis",
    description: "Upload charts and images for AI-powered technical analysis",
    icon: Image,
  },
  {
    title: "Custom Settings",
    description: "Personalize your AI assistant's behavior and responses",
    icon: Settings,
  },
];

export default function Index() {
  const [message, setMessage] = React.useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!message.trim()) return;
    
    // Keep existing message handling logic
    console.log("Sending message:", message);
    setMessage("");
  };

  return (
    <div className="min-h-screen bg-background-base text-text-primary">
      <div className="max-w-chat mx-auto px-6 pt-[120px] pb-24">
        {/* Header Section */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h1 className="text-title bg-primary-gradient bg-clip-text text-transparent">
            Chat with Your AI Trading Assistant
          </h1>
          <p className="text-base text-text-secondary opacity-70 mt-4">
            Get real-time insights, analysis, and trading recommendations
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
          className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16"
        >
          {features.map((feature, index) => (
            <motion.div
              key={index}
              variants={{
                hidden: { opacity: 0, y: 20 },
                show: { opacity: 1, y: 0 }
              }}
            >
              <Card className="h-[100px] p-5 bg-background-surface border-border-subtle hover:border-primary/20 transition-all duration-200">
                <div className="flex items-start gap-4">
                  <div className="p-2 rounded-md bg-background-elevated">
                    <feature.icon className="w-5 h-5 text-primary" />
                  </div>
                  <div>
                    <h3 className="font-medium mb-1">{feature.title}</h3>
                    <p className="text-sm text-text-secondary">{feature.description}</p>
                  </div>
                </div>
              </Card>
            </motion.div>
          ))}
        </motion.div>

        {/* Chat Container */}
        <div className="h-[70vh] bg-background-surface rounded-lg border border-border-subtle mb-6 overflow-hidden">
          <div className="h-full flex flex-col">
            {/* Command Bar */}
            <div className="h-8 border-b border-border-subtle px-6 flex items-center gap-6">
              {['General', 'Trading', 'Analysis', 'Settings'].map((item) => (
                <button
                  key={item}
                  className="flex items-center gap-1.5 text-sm text-text-secondary hover:text-text-primary transition-colors"
                >
                  <span>{item}</span>
                  <ChevronRight className="w-3 h-3" />
                </button>
              ))}
            </div>

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
                  placeholder="Message your AI trading assistant..."
                  className="h-chat-input pr-32 bg-background-elevated border-border-subtle 
                    placeholder:text-sm placeholder:text-text-disabled
                    focus:border-primary/40 focus:bg-background-surface"
                />
                <div className="absolute right-3 top-1/2 -translate-y-1/2 flex items-center gap-2">
                  <Button
                    type="button"
                    size="icon"
                    variant="ghost"
                    className="h-8 w-8 text-text-tertiary hover:text-primary hover:bg-primary/10"
                  >
                    <Mic className="h-4 w-4" />
                  </Button>
                  <Button
                    type="submit"
                    size="icon"
                    className="h-8 w-8 bg-primary hover:bg-primary-hover"
                    disabled={!message.trim()}
                  >
                    <Send className="h-4 w-4" />
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
