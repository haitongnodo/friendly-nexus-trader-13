import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Plus, Upload, Copy, Wallet, User, Bot } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { motion } from "framer-motion";
import { NodoLogo } from "@/components/NodoLogo";
import { cn } from "@/lib/utils";

const CreateAgent = () => {
  const { toast } = useToast();

  const stats = [
    { label: "Top AI Agents", value: "156", change: "+8%", icon: "📈" },
    { label: "24h Trading Volume", value: "$2.5M", change: "+6.5%", icon: "💹" },
    { label: "Success Rate", value: "87.5%", change: "+5.2%", icon: "🎯" },
    { label: "Active Copiers", value: "2,345", change: "+10%", icon: "👥" },
  ];

  return (
    <div className="container mx-auto px-6 py-8 max-w-6xl space-y-10">
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="flex flex-col md:flex-row justify-between items-start md:items-center gap-8"
      >
        <div className="space-y-3">
          <h1 className="text-[32px] font-semibold leading-tight bg-gradient-to-r from-[#FF7A0F] to-[#FFB366] bg-clip-text text-transparent">
            Create Your Agent
          </h1>
          <p className="text-[16px] leading-relaxed text-text-secondary">
            Set up your AI trading agent with advanced parameters
          </p>
        </div>
        
        <div className="flex items-center gap-4 bg-background-surface/30 backdrop-blur-lg p-6 rounded-xl border border-border-subtle">
          <div className="flex items-center gap-3">
            <NodoLogo className="w-6 h-6" />
            <span className="text-text-secondary font-medium">Balance</span>
          </div>
          <div className="flex items-center gap-3">
            <Button 
              variant="outline" 
              className="font-mono text-lg hover:shadow-lg transition-all duration-300"
            >
              5,000 <span className="text-primary ml-1">◎</span>
            </Button>
            <Button 
              className="bg-primary hover:bg-primary/90 active:bg-primary/80 text-white px-6 rounded-lg h-12 
                transition-all duration-300 hover:shadow-lg transform hover:scale-[1.02] active:scale-[0.98]"
            >
              Buy $NODO
            </Button>
          </div>
        </div>
      </motion.div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: index * 0.1 }}
            className={cn(
              "bg-background-surface/30 backdrop-blur-lg border border-border-subtle",
              "rounded-xl p-5 transition-all duration-200",
              "hover:transform hover:-translate-y-1 hover:shadow-lg",
              "group cursor-pointer"
            )}
          >
            <div className="flex items-center gap-3 mb-3">
              <span className="text-2xl">{stat.icon}</span>
              <p className="font-medium text-text-secondary">{stat.label}</p>
            </div>
            <div className="flex items-end justify-between">
              <span className="text-2xl font-mono font-bold">{stat.value}</span>
              <span className={cn(
                "text-sm font-medium",
                stat.change.startsWith("+") ? "text-green-500" : "text-red-500"
              )}>{stat.change}</span>
            </div>
          </motion.div>
        ))}
      </div>

      <Card className="bg-background-surface/30 backdrop-blur-lg border-border-subtle rounded-xl overflow-hidden">
        <div className="p-8 space-y-6">
          <h2 className="text-2xl font-semibold flex items-center gap-2">
            <span className="text-primary">⬡</span> Token Integration
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Button 
              className={cn(
                "h-24 rounded-xl transition-all duration-300",
                "bg-background-surface/50 border-2 border-primary",
                "hover:shadow-lg hover:scale-[1.02]",
                "active:shadow-xl active:scale-[0.98]",
                "group"
              )}
            >
              <Plus className="mr-3 group-hover:rotate-90 transition-transform duration-300" />
              <div className="space-y-1 text-left">
                <div className="font-semibold">Launch a New Agent</div>
                <div className="text-sm text-text-secondary">Fee: SUI/N 25,000 NODO + Pool Fee</div>
              </div>
            </Button>
            <Button 
              variant="outline" 
              className="h-24 bg-background-surface/50 border-border-subtle hover:border-primary/50 
                hover:shadow-lg rounded-xl transition-all duration-300"
            >
              <div className="space-y-1 text-left">
                <div className="font-semibold">Use Existing Agent</div>
                <div className="text-sm text-text-secondary">Fee: SUI/N 4,000 NODO</div>
              </div>
            </Button>
          </div>
        </div>
      </Card>

      <Card className="bg-background-surface/30 backdrop-blur-lg border-border-subtle rounded-xl overflow-hidden">
        <div className="p-8 space-y-8">
          <h2 className="text-2xl font-semibold flex items-center gap-2">
            <User className="text-primary" /> Agent Details
          </h2>
          <div className="space-y-6">
            <div>
              <label className="block text-base font-medium mb-2">Name <span className="text-red-500">*</span></label>
              <Input 
                placeholder="Enter agent name" 
                className="h-12 bg-background-surface/50 border-border-subtle hover:border-primary/50 
                  focus:border-primary focus:shadow-lg transition-all duration-300" 
              />
            </div>
            <div>
              <label className="block text-base font-medium mb-2">Description</label>
              <Textarea 
                placeholder="Describe your agent's purpose and capabilities" 
                className="min-h-[120px] bg-background-surface/50 border-border-subtle hover:border-primary/50 
                  focus:border-primary focus:shadow-lg transition-all duration-300" 
              />
            </div>

            <div>
              <label className="block text-base font-medium mb-2">Profile Image</label>
              <div className="bg-background-surface/50 border-2 border-dashed border-border-subtle hover:border-primary/50 
                rounded-xl p-8 text-center cursor-pointer transition-all duration-300 group">
                <Upload className="w-12 h-12 mx-auto mb-4 text-text-tertiary group-hover:text-primary 
                  transition-colors duration-300" />
                <p className="text-text-secondary mb-2">Drop image here or click to upload</p>
                <p className="text-sm text-text-tertiary">Supported formats: PNG, JPG, GIF (max. 5MB)</p>
              </div>
            </div>
          </div>
        </div>
      </Card>

      <Card className="bg-background-surface/30 backdrop-blur-lg border-border-subtle rounded-xl overflow-hidden">
        <div className="p-8 space-y-8">
          <h2 className="text-2xl font-semibold flex items-center gap-2">
            <Bot className="text-primary" /> AI Trading Configuration
          </h2>
          <div className="space-y-6">
            <div>
              <label className="block text-base font-medium mb-2">Trading Type</label>
              <Select>
                <SelectTrigger className="h-12 bg-background-surface/50 border-border-subtle hover:border-primary/50 
                  focus:border-primary focus:shadow-lg transition-all duration-300">
                  <SelectValue placeholder="Select trading type" />
                </SelectTrigger>
                <SelectContent className="bg-background-elevated border-border-subtle">
                  <SelectItem value="spot">Spot Trading</SelectItem>
                  <SelectItem value="futures">Futures Trading</SelectItem>
                  <SelectItem value="options">Options Trading</SelectItem>
                </SelectContent>
              </Select>
            </div>
            
            <div>
              <label className="block text-base font-medium mb-2">Trading Strategy</label>
              <Select>
                <SelectTrigger className="h-12 bg-background-surface/50 border-border-subtle hover:border-primary/50 
                  focus:border-primary focus:shadow-lg transition-all duration-300">
                  <SelectValue placeholder="Select trading strategy" />
                </SelectTrigger>
                <SelectContent className="bg-background-elevated border-border-subtle">
                  <SelectItem value="momentum">Momentum Trading</SelectItem>
                  <SelectItem value="mean-reversion">Mean Reversion</SelectItem>
                  <SelectItem value="arbitrage">Arbitrage</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-3">
              <label className="block text-base font-medium">Trading Pairs</label>
              <div className="flex flex-wrap gap-2">
                {["BTC", "ETH", "USDT"].map((pair) => (
                  <Button
                    key={pair}
                    variant="outline"
                    size="sm"
                    className="rounded-full bg-background-surface/50 border-border-subtle hover:border-primary/50 
                      hover:shadow-lg transition-all duration-300"
                  >
                    <span className="w-2 h-2 rounded-full bg-primary mr-2"></span>
                    {pair}
                  </Button>
                ))}
              </div>
            </div>

            <div className="space-y-3">
              <label className="block text-base font-medium">Personality Traits</label>
              <div className="flex flex-wrap gap-2">
                {["Conservative", "Aggressive", "Balanced", "Data-Driven", "Risk-Averse"].map((trait) => (
                  <Button
                    key={trait}
                    variant="outline"
                    size="sm"
                    className="rounded-full bg-background-surface/50 border-border-subtle hover:border-primary/50 
                      hover:shadow-lg transition-all duration-300"
                  >
                    {trait}
                  </Button>
                ))}
              </div>
            </div>
          </div>
        </div>
      </Card>

      <div className="flex justify-center pt-8">
        <Button 
          size="lg" 
          className={cn(
            "bg-primary hover:bg-primary/90 active:bg-primary/80",
            "text-white px-8 h-12 rounded-xl",
            "hover:shadow-lg active:shadow-xl",
            "transition-all duration-300 transform",
            "hover:scale-[1.02] active:scale-[0.98]"
          )}
        >
          <Plus className="mr-2" /> CREATE AGENT
        </Button>
      </div>
    </div>
  );
};

export default CreateAgent;