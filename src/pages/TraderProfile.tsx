import { Area, AreaChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Copy, Star, Clock, Users, BarChart3, Percent } from "lucide-react";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";
import { cn } from "@/lib/utils";

const performanceData = Array.from({ length: 24 }, (_, i) => ({
  time: `${i}:00`,
  value: 9500 + Math.random() * 1500
}));

const recentTrades = [
  { time: "2h ago", pair: "BTC/USDT", type: "Long", entry: "$1250", exit: "$42950", size: "0.5 BTC" },
  { time: "5h ago", pair: "ETH/USDT", type: "Short", entry: "$2250", exit: "$2180", size: "5 ETH" },
  { time: "8h ago", pair: "SOL/USDT", type: "Long", entry: "$95.5", exit: "$98.2", size: "50 SOL" },
];

const timePeriods = ["24H", "7D", "30D", "ALL"];

export default function TraderProfile() {
  const [selectedPeriod, setSelectedPeriod] = useState("24H");
  const [isHovering, setIsHovering] = useState(false);

  return (
    <div className="container mx-auto px-4 py-8">
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="space-y-8"
      >
        {/* Header */}
        <Card className="p-6 bg-background-surface border-border-subtle">
          <div className="flex justify-between items-start mb-8">
            <div className="space-y-3">
              <div className="flex items-center gap-3">
                <h1 className="text-title font-display">Elite Trader #127</h1>
                <Badge variant="secondary" className="bg-[rgba(52,199,89,0.2)] text-semantic-success">
                  Low Risk
                </Badge>
                <Badge variant="secondary" className="bg-[rgba(255,122,15,0.1)] text-primary">
                  AI Agent
                </Badge>
              </div>
              <div className="flex items-center gap-2 text-mono-base text-text-secondary">
                <span>0xabcd...1234</span>
                <button 
                  onClick={() => navigator.clipboard.writeText("0xabcd1234")}
                  className="hover:text-primary transition-colors"
                >
                  <Copy className="h-4 w-4" />
                </button>
              </div>
            </div>
            <div className="flex gap-2">
              <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
                <Button className="bg-primary-gradient hover:opacity-90 shadow-glow">
                  <Copy className="mr-2 h-4 w-4" /> Copy Trader
                </Button>
              </motion.div>
              <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
                <Button 
                  variant="secondary" 
                  className="glass hover:bg-overlay-hover"
                  onClick={() => setIsHovering(!isHovering)}
                >
                  <Star className={cn(
                    "h-4 w-4 transition-transform",
                    isHovering && "scale-110 text-primary"
                  )} />
                </Button>
              </motion.div>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            <motion.div 
              whileHover={{ scale: 1.02 }}
              className="flex items-center gap-3 p-4 rounded-xl bg-background-elevated hover:shadow-stats transition-all duration-200"
            >
              <Clock className="h-5 w-5 text-text-tertiary" />
              <div>
                <div className="text-helper text-text-tertiary">Active Since</div>
                <div className="text-mono-base">Jan 2024</div>
              </div>
            </motion.div>
            <motion.div 
              whileHover={{ scale: 1.02 }}
              className="flex items-center gap-3 p-4 rounded-xl bg-background-elevated hover:shadow-stats transition-all duration-200"
            >
              <Users className="h-5 w-5 text-text-tertiary" />
              <div>
                <div className="text-helper text-text-tertiary">Followers</div>
                <div className="text-mono-base">1,247</div>
              </div>
            </motion.div>
            <motion.div 
              whileHover={{ scale: 1.02 }}
              className="flex items-center gap-3 p-4 rounded-xl bg-background-elevated hover:shadow-stats transition-all duration-200"
            >
              <BarChart3 className="h-5 w-5 text-text-tertiary" />
              <div>
                <div className="text-helper text-text-tertiary">Total Volume</div>
                <div className="text-mono-base">$2.5M</div>
              </div>
            </motion.div>
            <motion.div 
              whileHover={{ scale: 1.02 }}
              className="flex items-center gap-3 p-4 rounded-xl bg-background-elevated hover:shadow-stats transition-all duration-200"
            >
              <Percent className="h-5 w-5 text-text-tertiary" />
              <div>
                <div className="text-helper text-text-tertiary">Win Rate</div>
                <div className="text-mono-base">76.5%</div>
              </div>
            </motion.div>
          </div>
        </Card>

        {/* Charts and Stats */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <Card className="col-span-2 p-6 bg-background-surface border-border-subtle">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-section">Performance Overview</h2>
              <div className="flex gap-2">
                {timePeriods.map((period) => (
                  <Button
                    key={period}
                    variant="ghost"
                    size="sm"
                    onClick={() => setSelectedPeriod(period)}
                    className={cn(
                      "text-sm font-mono transition-all",
                      selectedPeriod === period 
                        ? "bg-primary text-white" 
                        : "hover:bg-primary/10"
                    )}
                  >
                    {period}
                  </Button>
                ))}
              </div>
            </div>
            <div className="h-[300px]">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={performanceData}>
                  <defs>
                    <linearGradient id="colorValue" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#FB7402" stopOpacity={0.3}/>
                      <stop offset="95%" stopColor="#FB7402" stopOpacity={0}/>
                    </linearGradient>
                  </defs>
                  <XAxis 
                    dataKey="time" 
                    stroke="#666"
                    fontSize={12}
                    tickLine={false}
                  />
                  <YAxis 
                    stroke="#666"
                    fontSize={12}
                    tickLine={false}
                    axisLine={false}
                  />
                  <Tooltip 
                    contentStyle={{
                      background: "rgba(0,0,0,0.8)",
                      border: "1px solid rgba(255,255,255,0.1)",
                      borderRadius: "8px",
                    }}
                  />
                  <Area
                    type="monotone"
                    dataKey="value"
                    stroke="#FB7402"
                    strokeWidth={2}
                    fillOpacity={1}
                    fill="url(#colorValue)"
                  />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </Card>

          <Card className="p-6 bg-background-surface border-border-subtle">
            <h2 className="text-section mb-6">Portfolio Distribution</h2>
            <div className="flex justify-center items-center h-[300px]">
              <motion.div 
                whileHover={{ scale: 1.02 }}
                className="w-48 h-48 rounded-full border-8 border-primary/30 relative"
              >
                <motion.div 
                  className="w-40 h-40 rounded-full border-8 border-primary/20 absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2"
                >
                  <motion.div 
                    className="w-32 h-32 rounded-full border-8 border-primary/10 absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2"
                  />
                </motion.div>
              </motion.div>
            </div>
          </Card>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <motion.div whileHover={{ scale: 1.02 }}>
            <Card className="p-6 bg-background-surface border-border-subtle">
              <div className="text-helper text-text-tertiary">24h PnL</div>
              <div className="text-mono-lg text-semantic-success">+$5,240</div>
              <div className="text-helper text-semantic-success">+8.2%</div>
            </Card>
          </motion.div>
          <motion.div whileHover={{ scale: 1.02 }}>
            <Card className="p-6 bg-background-surface border-border-subtle">
              <div className="text-helper text-text-tertiary">7D PnL</div>
              <div className="text-mono-lg text-semantic-success">+$12,450</div>
              <div className="text-helper text-semantic-success">+15.7%</div>
            </Card>
          </motion.div>
          <motion.div whileHover={{ scale: 1.02 }}>
            <Card className="p-6 bg-background-surface border-border-subtle">
              <div className="text-helper text-text-tertiary">Max Drawdown</div>
              <div className="text-mono-lg text-semantic-error">-12.4%</div>
              <div className="text-helper text-text-tertiary">Last 30 days</div>
            </Card>
          </motion.div>
          <motion.div whileHover={{ scale: 1.02 }}>
            <Card className="p-6 bg-background-surface border-border-subtle">
              <div className="text-helper text-text-tertiary">Sharpe Ratio</div>
              <div className="text-mono-lg">2.34</div>
              <div className="text-helper text-text-tertiary">Annual</div>
            </Card>
          </motion.div>
        </div>

        {/* Recent Trades */}
        <Card className="p-6 bg-background-surface border-border-subtle overflow-hidden">
          <h2 className="text-section mb-6">Recent Trades</h2>
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow className="hover:bg-transparent border-border-subtle">
                  <TableHead className="text-text-secondary">Time</TableHead>
                  <TableHead className="text-text-secondary">Pair</TableHead>
                  <TableHead className="text-text-secondary">Type</TableHead>
                  <TableHead className="text-text-secondary">Entry</TableHead>
                  <TableHead className="text-text-secondary">Exit</TableHead>
                  <TableHead className="text-text-secondary">Size</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {recentTrades.map((trade, index) => (
                  <TableRow 
                    key={index}
                    className="group hover:bg-background-elevated transition-colors duration-200 border-border-subtle"
                  >
                    <TableCell className="font-mono-base">{trade.time}</TableCell>
                    <TableCell className="font-mono-base">{trade.pair}</TableCell>
                    <TableCell>
                      <Badge 
                        variant="secondary"
                        className={cn(
                          "font-mono-base",
                          trade.type === "Long" 
                            ? "bg-semantic-success/20 text-semantic-success" 
                            : "bg-semantic-error/20 text-semantic-error"
                        )}
                      >
                        {trade.type}
                      </Badge>
                    </TableCell>
                    <TableCell className="font-mono-base">{trade.entry}</TableCell>
                    <TableCell className="font-mono-base">{trade.exit}</TableCell>
                    <TableCell className="font-mono-base">{trade.size}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </Card>
      </motion.div>
    </div>
  );
}