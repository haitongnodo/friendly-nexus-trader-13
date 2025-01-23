import { useState } from "react";
import { Copy, Star, Clock, Users, BarChart2 } from "lucide-react";
import { motion } from "framer-motion";
import { Card } from "@/components/ui/card";
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";
import { Button } from "@/components/ui/button";
import { LineChart, Line, ResponsiveContainer, PieChart, Pie, Cell } from "recharts";

interface TraderProfileProps {
  traderId: string;
}

const performanceData = [
  { time: "0:00", value: 10200 },
  { time: "2:00", value: 9800 },
  { time: "4:00", value: 9600 },
  { time: "6:00", value: 10000 },
  { time: "8:00", value: 10400 },
  { time: "10:00", value: 10800 },
  { time: "12:00", value: 10600 },
  { time: "14:00", value: 10200 },
  { time: "16:00", value: 9900 },
  { time: "18:00", value: 10100 },
  { time: "20:00", value: 10300 },
  { time: "22:00", value: 10200 },
];

const portfolioData = [
  { name: "BTC", value: 45 },
  { name: "ETH", value: 30 },
  { name: "SOL", value: 15 },
  { name: "Others", value: 10 },
];

const PORTFOLIO_COLORS = ["#FB7402", "#FEC6A1", "#FFD7BC", "#FFE8D9"];

const TraderProfile = ({ traderId }: TraderProfileProps) => {
  const [isFavorite, setIsFavorite] = useState(false);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="container mx-auto px-4 py-8 space-y-6"
    >
      <Card className="glass p-6">
        <div className="flex justify-between items-center">
          <div className="flex items-center space-x-4">
            <h1 className="text-2xl font-bold">Elite Trader #{traderId}</h1>
            <span className="px-3 py-1 text-sm rounded-full bg-green-500/20 text-green-500">
              Low Risk
            </span>
            <span className="px-3 py-1 text-sm rounded-full bg-[#FB7402]/20 text-[#FB7402]">
              AI Agent
            </span>
          </div>
          <div className="flex items-center space-x-4">
            <Button
              variant="outline"
              className="flex items-center space-x-2 hover:scale-105 transition-transform"
              onClick={() => {/* Copy trader logic */}}
            >
              <Copy className="w-4 h-4" />
              <span>Copy Trader</span>
            </Button>
            <Button
              variant="ghost"
              size="icon"
              className="hover:scale-110 transition-transform"
              onClick={() => setIsFavorite(!isFavorite)}
            >
              <Star
                className={`w-5 h-5 ${
                  isFavorite ? "fill-yellow-500 text-yellow-500" : "text-gray-400"
                }`}
              />
            </Button>
          </div>
        </div>

        <div className="grid grid-cols-3 gap-8 mt-6">
          <div className="flex items-center space-x-2">
            <Clock className="w-4 h-4 text-gray-400" />
            <div>
              <p className="text-sm text-gray-400">Active Since</p>
              <p className="font-medium">Jan 2024</p>
            </div>
          </div>
          <div className="flex items-center space-x-2">
            <Users className="w-4 h-4 text-gray-400" />
            <div>
              <p className="text-sm text-gray-400">Followers</p>
              <p className="font-medium">1,247</p>
            </div>
          </div>
          <div className="flex items-center space-x-2">
            <BarChart2 className="w-4 h-4 text-gray-400" />
            <div>
              <p className="text-sm text-gray-400">Win Rate</p>
              <p className="font-medium">76.5%</p>
            </div>
          </div>
        </div>
      </Card>

      <div className="grid grid-cols-3 gap-6">
        <Card className="glass col-span-2">
          <div className="p-6">
            <h2 className="text-xl font-semibold mb-4">Performance Overview</h2>
            <div className="h-[300px]">
              <ChartContainer config={{}}>
                <LineChart data={performanceData}>
                  <Line
                    type="monotone"
                    dataKey="value"
                    stroke="#FB7402"
                    strokeWidth={2}
                    dot={false}
                  />
                  <ChartTooltip
                    content={({ active, payload }) => {
                      if (active && payload && payload.length) {
                        return (
                          <ChartTooltipContent
                            className="glass"
                            payload={payload}
                          />
                        );
                      }
                      return null;
                    }}
                  />
                </LineChart>
              </ChartContainer>
            </div>
          </div>
        </Card>

        <Card className="glass">
          <div className="p-6">
            <h2 className="text-xl font-semibold mb-4">Portfolio Distribution</h2>
            <div className="h-[300px]">
              <ResponsiveContainer>
                <PieChart>
                  <Pie
                    data={portfolioData}
                    innerRadius={60}
                    outerRadius={80}
                    paddingAngle={5}
                    dataKey="value"
                  >
                    {portfolioData.map((entry, index) => (
                      <Cell
                        key={`cell-${index}`}
                        fill={PORTFOLIO_COLORS[index % PORTFOLIO_COLORS.length]}
                      />
                    ))}
                  </Pie>
                </PieChart>
              </ResponsiveContainer>
              <div className="flex justify-center gap-4 mt-4">
                {portfolioData.map((entry, index) => (
                  <div key={entry.name} className="flex items-center gap-2">
                    <div
                      className="w-3 h-3 rounded-full"
                      style={{
                        backgroundColor:
                          PORTFOLIO_COLORS[index % PORTFOLIO_COLORS.length],
                      }}
                    />
                    <span className="text-sm">{entry.name}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </Card>
      </div>

      <div className="grid grid-cols-4 gap-6">
        <Card className="glass p-6">
          <h3 className="text-sm text-gray-400 mb-2">24h PnL</h3>
          <div className="text-2xl font-bold text-green-500">+$5,240</div>
          <div className="text-sm text-green-500">+8.2%</div>
        </Card>
        <Card className="glass p-6">
          <h3 className="text-sm text-gray-400 mb-2">7D PnL</h3>
          <div className="text-2xl font-bold text-green-500">+$12,450</div>
          <div className="text-sm text-green-500">+15.7%</div>
        </Card>
        <Card className="glass p-6">
          <h3 className="text-sm text-gray-400 mb-2">Max Drawdown</h3>
          <div className="text-2xl font-bold text-red-500">-12.4%</div>
          <div className="text-sm text-gray-400">Last 30 days</div>
        </Card>
        <Card className="glass p-6">
          <h3 className="text-sm text-gray-400 mb-2">Sharpe Ratio</h3>
          <div className="text-2xl font-bold">2.34</div>
          <div className="text-sm text-gray-400">Annual</div>
        </Card>
      </div>

      <Card className="glass p-6">
        <h2 className="text-xl font-semibold mb-4">Recent Trades</h2>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="text-left text-sm text-gray-400">
                <th className="pb-4">Time</th>
                <th className="pb-4">Pair</th>
                <th className="pb-4">Type</th>
                <th className="pb-4">Entry</th>
                <th className="pb-4">Exit</th>
                <th className="pb-4">Size</th>
              </tr>
            </thead>
            <tbody className="text-sm">
              <tr className="border-t border-white/5">
                <td className="py-4">2h ago</td>
                <td>BTC/USDT</td>
                <td className="text-green-500">Long</td>
                <td>$1250</td>
                <td>$42950</td>
                <td>0.5 BTC</td>
              </tr>
              <tr className="border-t border-white/5">
                <td className="py-4">5h ago</td>
                <td>ETH/USDT</td>
                <td className="text-red-500">Short</td>
                <td>$2250</td>
                <td>$2180</td>
                <td>5 ETH</td>
              </tr>
              <tr className="border-t border-white/5">
                <td className="py-4">8h ago</td>
                <td>SOL/USDT</td>
                <td className="text-green-500">Long</td>
                <td>$95.5</td>
                <td>$98.2</td>
                <td>50 SOL</td>
              </tr>
            </tbody>
          </table>
        </div>
      </Card>
    </motion.div>
  );
};

export default TraderProfile;