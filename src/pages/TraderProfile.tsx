import { Area, AreaChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Copy, Star, Clock, Users, BarChart3, Percent } from "lucide-react";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { motion } from "framer-motion";

const performanceData = Array.from({ length: 24 }, (_, i) => ({
  time: `${i}:00`,
  value: 9500 + Math.random() * 1500
}));

const recentTrades = [
  { time: "2h ago", pair: "BTC/USDT", type: "Long", entry: "$1250", exit: "$42950", size: "0.5 BTC" },
  { time: "5h ago", pair: "ETH/USDT", type: "Short", entry: "$2250", exit: "$2180", size: "5 ETH" },
  { time: "8h ago", pair: "SOL/USDT", type: "Long", entry: "$95.5", exit: "$98.2", size: "50 SOL" },
];

export default function TraderProfile() {
  return (
    <div className="container mx-auto px-4 py-8">
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="space-y-6"
      >
        {/* Header */}
        <Card className="p-6 bg-[#16171E] border-[#222329]">
          <div className="flex justify-between items-start mb-8">
            <div className="space-y-2">
              <div className="flex items-center gap-3">
                <h1 className="text-2xl font-bold">Elite Trader #127</h1>
                <Badge variant="secondary" className="bg-green-500/20 text-green-500">Low Risk</Badge>
                <Badge variant="secondary" className="bg-orange-500/20 text-orange-500">AI Agent</Badge>
              </div>
              <div className="text-muted-foreground flex items-center gap-2">
                <span>0xabcd...1234</span>
                <Copy className="h-4 w-4 cursor-pointer hover:text-primary" />
              </div>
            </div>
            <div className="flex gap-2">
              <Button className="bg-gradient-to-r from-[#EC6E05] to-[#ECC705]">
                <Copy className="mr-2 h-4 w-4" /> Copy Trader
              </Button>
              <Button variant="secondary" className="px-3">
                <Star className="h-4 w-4" />
              </Button>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            <div className="flex items-center gap-3">
              <Clock className="h-5 w-5 text-muted-foreground" />
              <div>
                <div className="text-sm text-muted-foreground">Active Since</div>
                <div className="font-medium">Jan 2024</div>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <Users className="h-5 w-5 text-muted-foreground" />
              <div>
                <div className="text-sm text-muted-foreground">Followers</div>
                <div className="font-medium">1,247</div>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <BarChart3 className="h-5 w-5 text-muted-foreground" />
              <div>
                <div className="text-sm text-muted-foreground">Total Volume</div>
                <div className="font-medium">$2.5M</div>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <Percent className="h-5 w-5 text-muted-foreground" />
              <div>
                <div className="text-sm text-muted-foreground">Win Rate</div>
                <div className="font-medium">76.5%</div>
              </div>
            </div>
          </div>
        </Card>

        {/* Charts and Stats */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <Card className="col-span-2 p-6 bg-[#16171E] border-[#222329]">
            <h2 className="text-lg font-semibold mb-4">Performance Overview</h2>
            <div className="h-[300px]">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={performanceData}>
                  <defs>
                    <linearGradient id="colorValue" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#FB7402" stopOpacity={0.3}/>
                      <stop offset="95%" stopColor="#FB7402" stopOpacity={0}/>
                    </linearGradient>
                  </defs>
                  <XAxis dataKey="time" />
                  <YAxis />
                  <Tooltip />
                  <Area
                    type="monotone"
                    dataKey="value"
                    stroke="#FB7402"
                    fillOpacity={1}
                    fill="url(#colorValue)"
                  />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </Card>

          <Card className="p-6 bg-[#16171E] border-[#222329]">
            <h2 className="text-lg font-semibold mb-4">Portfolio Distribution</h2>
            <div className="flex justify-center items-center h-[300px]">
              <div className="w-48 h-48 rounded-full border-8 border-[#FB7402] relative">
                <div className="w-40 h-40 rounded-full border-8 border-[#FB7402]/70 absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
                  <div className="w-32 h-32 rounded-full border-8 border-[#FB7402]/40 absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2"></div>
                </div>
              </div>
            </div>
          </Card>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <Card className="p-6 bg-[#16171E] border-[#222329]">
            <div className="text-sm text-muted-foreground">24h PnL</div>
            <div className="text-2xl font-bold text-green-500">+$5,240</div>
            <div className="text-sm text-green-500">+8.2%</div>
          </Card>
          <Card className="p-6 bg-[#16171E] border-[#222329]">
            <div className="text-sm text-muted-foreground">7D PnL</div>
            <div className="text-2xl font-bold text-green-500">+$12,450</div>
            <div className="text-sm text-green-500">+15.7%</div>
          </Card>
          <Card className="p-6 bg-[#16171E] border-[#222329]">
            <div className="text-sm text-muted-foreground">Max Drawdown</div>
            <div className="text-2xl font-bold text-red-500">-12.4%</div>
            <div className="text-sm text-muted-foreground">Last 30 days</div>
          </Card>
          <Card className="p-6 bg-[#16171E] border-[#222329]">
            <div className="text-sm text-muted-foreground">Sharpe Ratio</div>
            <div className="text-2xl font-bold">2.34</div>
            <div className="text-sm text-muted-foreground">Annual</div>
          </Card>
        </div>

        {/* Recent Trades */}
        <Card className="p-6 bg-[#16171E] border-[#222329]">
          <h2 className="text-lg font-semibold mb-4">Recent Trades</h2>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Time</TableHead>
                <TableHead>Pair</TableHead>
                <TableHead>Type</TableHead>
                <TableHead>Entry</TableHead>
                <TableHead>Exit</TableHead>
                <TableHead>Size</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {recentTrades.map((trade, index) => (
                <TableRow key={index}>
                  <TableCell>{trade.time}</TableCell>
                  <TableCell>{trade.pair}</TableCell>
                  <TableCell>
                    <span className={trade.type === "Long" ? "text-green-500" : "text-red-500"}>
                      {trade.type}
                    </span>
                  </TableCell>
                  <TableCell>{trade.entry}</TableCell>
                  <TableCell>{trade.exit}</TableCell>
                  <TableCell>{trade.size}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </Card>
      </motion.div>
    </div>
  );
}