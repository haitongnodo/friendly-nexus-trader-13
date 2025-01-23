import { Search } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Pagination, PaginationContent, PaginationItem, PaginationLink, PaginationNext, PaginationPrevious } from "@/components/ui/pagination";
import { motion } from "framer-motion";

const statsData = [
  { label: "Top AI Agents", value: "156", change: "+12%" },
  { label: "24h Trading Volume", value: "$2.5M", change: "+8.5%" },
  { label: "Success Rate", value: "87.5%", change: "+5.2%" },
  { label: "Active Copiers", value: "2,345", change: "+15%" },
];

const tradingPairs = ["All Agents", "Top Gainers", "Most Copied", "Highest Win Rate", "BTC/USDT", "ETH/USDT", "SOL/USDT"];

const traders = Array(10).fill({
  agent: "AI Agent #001",
  address: "0x93B86aCC47D45935...626",
  winRate: "71.2%",
  pnl24h: "-$6,543",
  pnl4d: "-$17,543",
  volume: "$4,297,243",
  copiers: "708",
});

export default function Traders() {
  return (
    <div className="container mx-auto px-4 py-8">
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="text-center mb-12 space-y-3"
      >
        <h1 className="text-6xl md:text-7xl font-bold bg-gradient-to-r from-[#FB7402] to-[#FB7402] bg-clip-text text-transparent tracking-tight">
          AI-Powered Copy Trading
        </h1>
        <p className="text-gray-400 text-lg tracking-wide">
          Discover and automatically copy top-performing AI trading agents on Sui Network
        </p>
      </motion.div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        {statsData.map((stat, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: index * 0.1 }}
            className="bg-[#151822] rounded-[16px] p-6 flex flex-col items-center justify-center space-y-2 hover:bg-[#1a1f2a] transition-all duration-300 cursor-pointer transform hover:scale-105 hover:shadow-xl border border-white/5"
          >
            <div className="space-y-2">
              <p className="text-sm text-muted-foreground">{stat.label}</p>
              <div className="flex items-center justify-between">
                <span className="text-2xl font-bold">{stat.value}</span>
                <span className={`text-sm ${stat.change.startsWith('+') ? 'text-green-500' : 'text-red-500'}`}>
                  {stat.change}
                </span>
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Search and Filters */}
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
        className="space-y-4 mb-8"
      >
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground h-4 w-4" />
          <Input 
            placeholder="Search by agent name, wallet address or trading strategy..." 
            className="pl-10 bg-[#151822] border border-white/5 rounded-[16px]"
          />
        </div>
        
        <div className="flex flex-wrap gap-2">
          {tradingPairs.map((pair) => (
            <Button
              key={pair}
              variant={pair === "All Agents" ? "default" : "secondary"}
              className={`hover:scale-105 transition-transform duration-200 rounded-[16px] ${
                pair === "All Agents" 
                  ? "bg-[#FB7402] hover:bg-[#FB7402]/90" 
                  : "bg-[#151822] hover:bg-[#1a1f2a] border border-white/5"
              }`}
            >
              {pair}
            </Button>
          ))}
        </div>
      </motion.div>

      {/* Traders Table */}
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <Card className="bg-[#151822] border border-white/5 rounded-[16px]">
          <Table>
            <TableHeader>
              <TableRow className="hover:bg-transparent border-white/5">
                <TableHead className="text-white">AGENT</TableHead>
                <TableHead className="text-white">WIN RATE</TableHead>
                <TableHead className="text-white">24H PNL</TableHead>
                <TableHead className="text-white">4D PNL</TableHead>
                <TableHead className="text-white">VOLUME</TableHead>
                <TableHead className="text-white">COPIERS</TableHead>
                <TableHead className="text-white">ACTION</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {traders.map((trader, index) => (
                <TableRow key={index} className="hover:bg-[#1a1f2a] border-white/5">
                  <TableCell className="font-medium">
                    <div className="flex flex-col">
                      <span>{trader.agent}</span>
                      <span className="text-sm text-muted-foreground">{trader.address}</span>
                    </div>
                  </TableCell>
                  <TableCell>
                    <span className="text-green-500">{trader.winRate}</span>
                  </TableCell>
                  <TableCell className="text-red-500">{trader.pnl24h}</TableCell>
                  <TableCell className="text-red-500">{trader.pnl4d}</TableCell>
                  <TableCell>{trader.volume}</TableCell>
                  <TableCell>
                    <div className="flex items-center gap-1">
                      {trader.copiers}
                      <span className="text-orange-500">🔥</span>
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="flex gap-2">
                      <Button 
                        variant="default" 
                        size="sm"
                        className="bg-[#FB7402] hover:bg-[#FB7402]/90 rounded-[16px]"
                      >
                        Copy
                      </Button>
                      <Button 
                        variant="secondary" 
                        size="sm"
                        className="bg-[#151822] hover:bg-[#1a1f2a] border border-white/5 rounded-[16px]"
                      >
                        Profile
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </Card>

        {/* Pagination */}
        <div className="flex items-center justify-between mt-4">
          <p className="text-sm text-muted-foreground">
            Showing 1-10 of 50 agents
          </p>
          <Pagination>
            <PaginationContent>
              <PaginationItem>
                <PaginationPrevious href="#" />
              </PaginationItem>
              <PaginationItem>
                <PaginationLink href="#" isActive>1</PaginationLink>
              </PaginationItem>
              <PaginationItem>
                <PaginationLink href="#">2</PaginationLink>
              </PaginationItem>
              <PaginationItem>
                <PaginationLink href="#">3</PaginationLink>
              </PaginationItem>
              <PaginationItem>
                <PaginationNext href="#" />
              </PaginationItem>
            </PaginationContent>
          </Pagination>
        </div>
      </motion.div>
    </div>
  );
}