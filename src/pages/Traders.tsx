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

const containerAnimation = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1
    }
  }
};

const itemAnimation = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0 }
};

export default function Traders() {
  return (
    <div className="container mx-auto px-4 py-8">
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="text-center mb-12 space-y-3 mt-[100px]"
      >
        <h1 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-[#EC6E05] to-[#ECC705] bg-clip-text text-transparent tracking-tight">
          AI-Powered Copy Trading
        </h1>
        <p className="text-gray-400 text-lg tracking-wide">
          Discover and automatically copy top-performing AI trading agents on Sui Network
        </p>
      </motion.div>

      <motion.div 
        variants={containerAnimation}
        initial="hidden"
        animate="show"
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8"
      >
        {statsData.map((stat, index) => (
          <motion.div
            key={index}
            variants={itemAnimation}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className="bg-[#16171E] border border-[#222329] rounded-[16px] p-6 flex flex-col items-center justify-center space-y-2 transition-all duration-300 cursor-pointer hover:bg-[#1a1f2a] hover:border-[#FB7402]/20"
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
      </motion.div>

      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
        className="space-y-4 mb-8"
      >
        <div className="relative group">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground h-4 w-4 transition-colors group-hover:text-[#FB7402]" />
          <Input 
            placeholder="Search by agent name, wallet address or trading strategy..." 
            className="pl-10 glass rounded-[16px] border-[#222329] bg-[#16171E] transition-all duration-300 hover:border-[#FB7402]/50 focus:border-[#FB7402] focus:ring-[#FB7402]/20"
          />
        </div>
        
        <div className="flex flex-wrap gap-2">
          {tradingPairs.map((pair) => (
            <motion.div
              key={pair}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <Button
                variant={pair === "All Agents" ? "default" : "secondary"}
                className={`transition-all duration-300 rounded-[16px] ${
                  pair === "All Agents" 
                    ? "bg-gradient-to-r from-[#EC6E05] to-[#ECC705] hover:from-[#EC6E05]/90 hover:to-[#ECC705]/90 shadow-lg hover:shadow-[#FB7402]/20" 
                    : "glass hover:bg-[#1a1f2a] hover:border-[#FB7402]/20"
                }`}
              >
                {pair}
              </Button>
            </motion.div>
          ))}
        </div>
      </motion.div>

      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <Card className="bg-[#16171E] border border-[#222329] rounded-[16px] overflow-hidden transition-all duration-300 hover:border-[#FB7402]/20">
          <Table>
            <TableHeader>
              <TableRow className="hover:bg-transparent">
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
                <TableRow key={index} className="group hover:bg-[#1a1f2a] transition-colors duration-300">
                  <TableCell className="font-medium">
                    <div className="flex flex-col">
                      <span className="group-hover:text-[#FB7402] transition-colors duration-300">{trader.agent}</span>
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
                      <span className="text-orange-500 animate-pulse">🔥</span>
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="flex gap-2">
                      <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                        <Button 
                          variant="default" 
                          size="sm"
                          className="bg-gradient-to-r from-[#EC6E05] to-[#ECC705] hover:from-[#EC6E05]/90 hover:to-[#ECC705]/90 rounded-[16px] shadow-lg hover:shadow-[#FB7402]/20"
                        >
                          Copy
                        </Button>
                      </motion.div>
                      <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                        <Button 
                          variant="secondary" 
                          size="sm"
                          className="glass hover:bg-[#1a1f2a] rounded-[16px] border border-[#222329] hover:border-[#FB7402]/20"
                          onClick={() => window.location.href = `/traders/${trader.agent.replace(/[^0-9]/g, '')}`}
                        >
                          Profile
                        </Button>
                      </motion.div>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </Card>

        <div className="flex items-center justify-between mt-4">
          <p className="text-sm text-muted-foreground">
            Showing 1-10 of 50 agents
          </p>
          <Pagination>
            <PaginationContent>
              <PaginationItem>
                <PaginationPrevious className="hover:bg-[#1a1f2a] transition-colors duration-300" />
              </PaginationItem>
              <PaginationItem>
                <PaginationLink href="#" isActive className="hover:bg-[#1a1f2a] transition-colors duration-300">1</PaginationLink>
              </PaginationItem>
              <PaginationItem>
                <PaginationLink href="#" className="hover:bg-[#1a1f2a] transition-colors duration-300">2</PaginationLink>
              </PaginationItem>
              <PaginationItem>
                <PaginationLink href="#" className="hover:bg-[#1a1f2a] transition-colors duration-300">3</PaginationLink>
              </PaginationItem>
              <PaginationItem>
                <PaginationNext className="hover:bg-[#1a1f2a] transition-colors duration-300" />
              </PaginationItem>
            </PaginationContent>
          </Pagination>
        </div>
      </motion.div>
    </div>
  );
}
