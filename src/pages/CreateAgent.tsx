import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Plus, Upload, Copy, Wallet, User, Bot } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

const CreateAgent = () => {
  const { toast } = useToast();

  const stats = [
    { label: "Top AI Agents", value: "156", change: "+8%" },
    { label: "24h Trading Volume", value: "$2.5M", change: "+6.5%" },
    { label: "Success Rate", value: "87.5%", change: "+5.2%" },
    { label: "Active Copiers", value: "2,345", change: "+10%" },
  ];

  return (
    <div className="container mx-auto px-6 py-8 max-w-6xl space-y-8">
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="flex justify-between items-center mt-[100px]"
      >
        <div className="space-y-2">
          <h1 className="text-4xl font-bold text-text-primary">Create Your Agent</h1>
          <p className="text-muted-foreground">Set up your AI trading agent by configuring its personality and trading parameters.</p>
        </div>
        <div className="flex items-center gap-4">
          <span className="text-muted-foreground">My Balance</span>
          <Button variant="outline" className="gap-2 glass hover:bg-overlay-hover hover:shadow-glow-sm active:bg-overlay-active active:shadow-glow-sm active:border-primary transition-all duration-200">
            5000 <span className="text-primary">◎</span>
          </Button>
        </div>
      </motion.div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: index * 0.1 }}
            className="bg-[#16171E] border border-[#222329] rounded-[16px] p-6 hover:bg-overlay-hover hover:shadow-glow-sm active:bg-overlay-active active:shadow-glow transition-all duration-200 cursor-pointer transform hover:scale-105"
          >
            <p className="text-sm text-muted-foreground">{stat.label}</p>
            <div className="flex items-end justify-between mt-3">
              <span className="text-2xl font-bold">{stat.value}</span>
              <span className="text-green-500 text-sm">{stat.change}</span>
            </div>
          </motion.div>
        ))}
      </div>

      <Card className="bg-[#16171E] border-[#222329] rounded-[16px]">
        <div className="p-8 space-y-6">
          <h2 className="text-xl font-semibold flex items-center gap-2">
            <span className="text-blue-400">⬡</span> Token Integration
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Button className="h-24 bg-gradient-to-r from-[#FB7402] to-[#FB7402] hover:opacity-90 rounded-[16px]">
              <Plus className="mr-3" />
              <div className="space-y-1 text-left">
                <div className="font-semibold">Launch a New Agent</div>
                <div className="text-sm opacity-80">Fee: SUI/N 25,000 NODO + Pool Fee</div>
              </div>
            </Button>
            <Button variant="outline" className="h-24 bg-[#16171E] border-[#222329] hover:bg-[#222329] rounded-[16px]">
              <div className="space-y-1 text-left">
                <div className="font-semibold">Use Existing Agent</div>
                <div className="text-sm opacity-80">Fee: SUI/N 4,000 NODO</div>
              </div>
            </Button>
          </div>
        </div>
      </Card>

      <Card className="bg-[#16171E] border-[#222329] rounded-[16px]">
        <div className="p-8 space-y-6">
          <h2 className="text-xl font-semibold flex items-center gap-2">
            <input type="checkbox" className="rounded border-gray-400 hover:border-primary focus:border-primary active:border-primary" />
            Copy Trading
          </h2>
          <div className="space-y-4">
            <div className="relative">
              <Input 
                placeholder="Enter wallet address to copy trades from" 
                className="bg-[#16171E] border-[#222329] hover:border-primary focus:border-primary active:border-primary hover:shadow-glow-sm focus:shadow-glow transition-all duration-200" 
              />
              <Copy className="absolute right-3 top-3 text-muted-foreground cursor-pointer hover:text-text-highlight active:text-primary transition-colors duration-200" />
            </div>
            <div className="relative">
              <Input 
                placeholder="Enter token address to copy trades from" 
                className="bg-[#16171E] border-[#222329] hover:border-primary focus:border-primary active:border-primary hover:shadow-glow-sm focus:shadow-glow transition-all duration-200" 
              />
              <Wallet className="absolute right-3 top-3 text-muted-foreground cursor-pointer hover:text-text-highlight active:text-primary transition-colors duration-200" />
            </div>
          </div>
        </div>
      </Card>

      <Card className="mb-8 bg-[#16171E] border-[#222329] rounded-[16px]">
        <div className="p-8 space-y-8">
          <h2 className="text-xl font-semibold flex items-center gap-2">
            <User className="text-gray-400" /> Agent Details
          </h2>
          <div className="space-y-5">
            <div>
              <label className="block text-sm font-medium mb-3">Name <span className="text-red-500">*</span></label>
              <Input 
                placeholder="Enter agent name" 
                className="h-12 bg-[#16171E] border-[#222329] hover:border-[#FB7402] focus:border-[#FB7402] px-4" 
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-3">Description</label>
              <Textarea 
                placeholder="Describe your agent's purpose and capabilities" 
                className="min-h-[120px] bg-[#16171E] border-[#222329] hover:border-[#FB7402] focus:border-[#FB7402] px-4 py-3" 
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-3">Profile Image</label>
              <div className="bg-[#16171E] border-2 border-dashed border-[#222329] rounded-lg py-10 px-6 text-center cursor-pointer hover:border-[#FB7402] transition-colors aspect-video flex flex-col items-center justify-center">
                <Upload className="mb-4 h-8 w-8" />
                <p className="text-sm text-muted-foreground mb-2">Drop image here or click to upload</p>
                <p className="text-xs text-muted-foreground">Supported formats: PNG, JPG, GIF (max. 5MB)</p>
              </div>
            </div>
          </div>
        </div>
      </Card>

      <Card className="mb-8 bg-[#16171E] border-[#222329] rounded-[16px]">
        <div className="p-8 space-y-8">
          <h2 className="text-xl font-semibold flex items-center gap-2">
            <Bot className="text-blue-400" /> AI Trading Configuration
          </h2>
          <div className="space-y-6">
            <div>
              <label className="block text-sm font-medium mb-3">Trading Type</label>
              <Select>
                <SelectTrigger className="h-12 bg-[#16171E] border-[#222329] hover:border-[#FB7402] focus:border-[#FB7402]">
                  <SelectValue placeholder="Select trading type" />
                </SelectTrigger>
                <SelectContent className="bg-[#16171E] border-[#222329]">
                  <SelectItem value="spot">Spot Trading</SelectItem>
                  <SelectItem value="futures">Futures Trading</SelectItem>
                  <SelectItem value="options">Options Trading</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div>
              <label className="block text-sm font-medium mb-3">Trading Strategy</label>
              <Select>
                <SelectTrigger className="h-12 bg-[#16171E] border-[#222329] hover:border-[#FB7402] focus:border-[#FB7402]">
                  <SelectValue placeholder="Select trading strategy" />
                </SelectTrigger>
                <SelectContent className="bg-[#16171E] border-[#222329]">
                  <SelectItem value="momentum">Momentum Trading</SelectItem>
                  <SelectItem value="mean-reversion">Mean Reversion</SelectItem>
                  <SelectItem value="arbitrage">Arbitrage</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-3">
              <label className="block text-sm font-medium">Trading Pairs</label>
              <div className="flex flex-wrap gap-4">
                <Button variant="outline" size="sm" className="rounded-full bg-[#16171E] border-[#222329] hover:bg-[#222329]">
                  <span className="w-2 h-2 rounded-full bg-red-500 mr-2"></span>
                  BTC
                </Button>
                <Button variant="outline" size="sm" className="rounded-full bg-[#16171E] border-[#222329] hover:bg-[#222329]">
                  <span className="w-2 h-2 rounded-full bg-blue-500 mr-2"></span>
                  ETH
                </Button>
                <Button variant="outline" size="sm" className="rounded-full bg-[#16171E] border-[#222329] hover:bg-[#222329]">
                  <span className="w-2 h-2 rounded-full bg-green-500 mr-2"></span>
                  USDT
                </Button>
              </div>
            </div>
            <div className="space-y-3">
              <label className="block text-sm font-medium">Personality Traits</label>
              <div className="flex flex-wrap gap-3">
                <Button variant="outline" size="sm" className="rounded-full bg-[#16171E] border-[#222329] hover:bg-[#222329]">
                  Conservative
                </Button>
                <Button variant="outline" size="sm" className="rounded-full bg-[#16171E] border-[#222329] hover:bg-[#222329]">
                  Aggressive
                </Button>
                <Button variant="outline" size="sm" className="rounded-full bg-[#16171E] border-[#222329] hover:bg-[#222329]">
                  Balanced
                </Button>
                <Button variant="outline" size="sm" className="rounded-full bg-[#16171E] border-[#222329] hover:bg-[#222329]">
                  Data-Driven
                </Button>
                <Button variant="outline" size="sm" className="rounded-full bg-[#16171E] border-[#222329] hover:bg-[#222329]">
                  Risk-Averse
                </Button>
              </div>
            </div>
          </div>
        </div>
      </Card>

      <div className="flex justify-center pt-6">
        <Button size="lg" className="bg-primary hover:bg-primary-hover active:bg-primary-pressed text-primary-foreground hover:shadow-glow active:shadow-glow transition-all duration-200 rounded-[16px]">
          <Plus className="mr-2" /> CREATE AGENT
        </Button>
      </div>
    </div>
  );
};

export default CreateAgent;
