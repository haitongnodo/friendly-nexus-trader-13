import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Plus, Upload, Copy, Wallet } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const CreateAgent = () => {
  const { toast } = useToast();

  const stats = [
    { label: "Top AI Agents", value: "156", change: "+8%" },
    { label: "24h Trading Volume", value: "$2.5M", change: "+6.5%" },
    { label: "Success Rate", value: "87.5%", change: "+5.2%" },
    { label: "Active Copiers", value: "2,345", change: "+10%" },
  ];

  return (
    <div className="container mx-auto px-4 py-8 max-w-6xl">
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-3xl font-bold mb-2">Create Your Agent</h1>
          <p className="text-muted-foreground">Set up your AI trading agent by configuring its personality and trading parameters.</p>
        </div>
        <div className="flex items-center gap-4">
          <span className="text-muted-foreground">My Balance</span>
          <Button variant="outline" className="gap-2">
            5000 <span className="text-orange-500">◎</span>
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        {stats.map((stat, index) => (
          <Card key={index} className="p-4 glass">
            <p className="text-sm text-muted-foreground">{stat.label}</p>
            <div className="flex items-end justify-between mt-2">
              <span className="text-2xl font-bold">{stat.value}</span>
              <span className="text-green-500 text-sm">{stat.change}</span>
            </div>
          </Card>
        ))}
      </div>

      <Card className="mb-8 glass">
        <div className="p-6">
          <h2 className="text-xl font-semibold mb-4 flex items-center gap-2">
            <span className="text-blue-400">⬡</span> Token Integration
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Button className="h-20 bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700">
              <Plus className="mr-2" />
              <div>
                <div className="font-semibold">Launch a New Agent</div>
                <div className="text-sm opacity-80">Fee: SUI/N 25,000 NODO + Pool Fee</div>
              </div>
            </Button>
            <Button variant="outline" className="h-20">
              <div>
                <div className="font-semibold">Use Existing Agent</div>
                <div className="text-sm opacity-80">Fee: SUI/N 4,000 NODO</div>
              </div>
            </Button>
          </div>
        </div>
      </Card>

      <Card className="mb-8 glass">
        <div className="p-6">
          <h2 className="text-xl font-semibold mb-4 flex items-center gap-2">
            <input type="checkbox" className="rounded border-gray-400" />
            Copy Trading
          </h2>
          <div className="space-y-4">
            <div className="relative">
              <Input placeholder="Enter wallet address to copy trades from" />
              <Copy className="absolute right-3 top-3 text-muted-foreground cursor-pointer" />
            </div>
            <div className="relative">
              <Input placeholder="Enter token address to copy trades from" />
              <Wallet className="absolute right-3 top-3 text-muted-foreground cursor-pointer" />
            </div>
          </div>
        </div>
      </Card>

      <Card className="mb-8 glass">
        <div className="p-6">
          <h2 className="text-xl font-semibold mb-4 flex items-center gap-2">
            <span className="text-gray-400">👤</span> Agent Details
          </h2>
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium mb-1">Name <span className="text-red-500">*</span></label>
              <Input placeholder="Enter agent name" />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">Description</label>
              <Textarea placeholder="Describe your agent's purpose and capabilities" className="h-32" />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">Profile Image</label>
              <div className="border-2 border-dashed rounded-lg p-8 text-center cursor-pointer hover:border-orange-500 transition-colors">
                <Upload className="mx-auto mb-2" />
                <p className="text-sm text-muted-foreground">Drop image here or click to upload</p>
                <p className="text-xs text-muted-foreground mt-1">Supported formats: PNG, JPG, GIF (max. 5MB)</p>
              </div>
            </div>
          </div>
        </div>
      </Card>

      <Card className="mb-8 glass">
        <div className="p-6">
          <h2 className="text-xl font-semibold mb-4 flex items-center gap-2">
            <span className="text-blue-400">🤖</span> AI Trading Configuration
          </h2>
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium mb-1">Trading Type</label>
              <Select>
                <SelectTrigger>
                  <SelectValue placeholder="Select trading type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="spot">Spot Trading</SelectItem>
                  <SelectItem value="futures">Futures Trading</SelectItem>
                  <SelectItem value="options">Options Trading</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">Trading Strategy</label>
              <Select>
                <SelectTrigger>
                  <SelectValue placeholder="Select trading strategy" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="momentum">Momentum Trading</SelectItem>
                  <SelectItem value="mean-reversion">Mean Reversion</SelectItem>
                  <SelectItem value="arbitrage">Arbitrage</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">Trading Strategy</label>
              <div className="flex gap-2">
                <Button variant="outline" size="sm" className="rounded-full">
                  <span className="w-2 h-2 rounded-full bg-red-500 mr-2"></span>
                  BTC
                </Button>
                <Button variant="outline" size="sm" className="rounded-full">
                  <span className="w-2 h-2 rounded-full bg-blue-500 mr-2"></span>
                  ETH
                </Button>
                <Button variant="outline" size="sm" className="rounded-full">
                  <span className="w-2 h-2 rounded-full bg-green-500 mr-2"></span>
                  USDT
                </Button>
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">Personality Traits</label>
              <div className="flex flex-wrap gap-2">
                <Button variant="secondary" size="sm" className="rounded-full">Conservative</Button>
                <Button variant="secondary" size="sm" className="rounded-full">Aggressive</Button>
                <Button variant="secondary" size="sm" className="rounded-full">Balanced</Button>
                <Button variant="secondary" size="sm" className="rounded-full">Data-Driven</Button>
                <Button variant="secondary" size="sm" className="rounded-full">Risk-Averse</Button>
              </div>
            </div>
          </div>
        </div>
      </Card>

      <div className="flex justify-center">
        <Button size="lg" className="bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700">
          <Plus className="mr-2" /> CREATE AGENT
        </Button>
      </div>
    </div>
  );
};

export default CreateAgent;