import { Search } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Pagination, PaginationContent, PaginationItem, PaginationLink, PaginationNext, PaginationPrevious } from "@/components/ui/pagination";
import { motion } from "framer-motion";
import { useState, useMemo } from "react";
import { generateTraders, type Trader } from "@/utils/mockTraderData";

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

const statsData = [
  { label: "Top AI Agents", value: "156", change: "+12%" },
  { label: "24h Trading Volume", value: "$2.5M", change: "+8.5%" },
  { label: "Success Rate", value: "87.5%", change: "+5.2%" },
  { label: "Active Copiers", value: "2,345", change: "+15%" },
];

const tradingPairs = ["All Pairs", "BTC/USDT", "ETH/USDT", "SOL/USDT", "AVAX/USDT", "BNB/USDT", "ADA/USDT"];
const strategies = ["All Strategies", "Momentum", "Mean Reversion", "Breakout", "Scalping", "Grid Trading"];
const sortOptions = ["All Agents", "Top Gainers", "Most Copied", "Highest Win Rate"];

const allTraders = generateTraders(100);

const ITEMS_PER_PAGE = 10;

export default function Traders() {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedPair, setSelectedPair] = useState("All Pairs");
  const [selectedStrategy, setSelectedStrategy] = useState("All Strategies");
  const [selectedSort, setSelectedSort] = useState("All Agents");
  const [currentPage, setCurrentPage] = useState(1);

  const filteredAndSortedTraders = useMemo(() => {
    let filtered = allTraders;

    if (searchTerm) {
      const searchLower = searchTerm.toLowerCase();
      filtered = filtered.filter(
        trader => 
          trader.agent.toLowerCase().includes(searchLower) ||
          trader.address.toLowerCase().includes(searchLower) ||
          trader.strategy.toLowerCase().includes(searchLower)
      );
    }

    if (selectedPair !== "All Pairs") {
      filtered = filtered.filter(trader => trader.pairs.includes(selectedPair));
    }

    if (selectedStrategy !== "All Strategies") {
      filtered = filtered.filter(trader => trader.strategy === selectedStrategy);
    }

    switch (selectedSort) {
      case "Top Gainers":
        filtered = [...filtered].sort((a, b) => 
          parseFloat(b.pnl24h.replace(/[^0-9.-]/g, '')) - 
          parseFloat(a.pnl24h.replace(/[^0-9.-]/g, ''))
        );
        break;
      case "Most Copied":
        filtered = [...filtered].sort((a, b) => parseInt(b.copiers) - parseInt(a.copiers));
        break;
      case "Highest Win Rate":
        filtered = [...filtered].sort((a, b) => 
          parseFloat(b.winRate.replace('%', '')) - 
          parseFloat(a.winRate.replace('%', ''))
        );
        break;
    }

    return filtered;
  }, [searchTerm, selectedPair, selectedStrategy, selectedSort]);

  const totalPages = Math.ceil(filteredAndSortedTraders.length / ITEMS_PER_PAGE);
  const paginatedTraders = filteredAndSortedTraders.slice(
    (currentPage - 1) * ITEMS_PER_PAGE,
    currentPage * ITEMS_PER_PAGE
  );

  const pageNumbers = Array.from({ length: totalPages }, (_, i) => i + 1);
  const visiblePageNumbers = pageNumbers.slice(
    Math.max(0, Math.min(currentPage - 2, totalPages - 4)),
    Math.min(totalPages, Math.max(5, currentPage + 2))
  );

  return (
    <div className="container mx-auto px-4 py-8">
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="text-center mb-12 space-y-3 mt-[100px]"
      >
        <h1 className="text-4xl md:text-5xl font-bold bg-primary-gradient bg-clip-text text-transparent tracking-tight">
          AI-Powered Copy Trading
        </h1>
        <p className="text-text-secondary text-lg tracking-wide">
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
            className="bg-background-surface border border-border-subtle rounded-[16px] p-6 flex flex-col items-center justify-center space-y-2 transition-all duration-normal cursor-pointer hover:bg-background-elevated hover:border-primary/20"
          >
            <div className="space-y-2">
              <p className="text-text-tertiary text-sm">{stat.label}</p>
              <div className="flex items-center justify-between">
                <span className="text-2xl font-bold text-text-primary">{stat.value}</span>
                <span className={`text-sm ${stat.change.startsWith('+') ? 'text-semantic-success' : 'text-semantic-error'}`}>
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
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-text-tertiary h-4 w-4 transition-colors group-hover:text-primary" />
          <Input 
            placeholder="Search by agent name, wallet address or trading strategy..." 
            className="pl-10 bg-background-surface border-border-subtle rounded-lg transition-all duration-normal hover:border-primary/50 focus:border-primary focus:ring-primary/20"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        
        <div className="bg-background-surface border border-border-subtle rounded-lg p-4 space-y-3">
          <div className="flex flex-wrap gap-2">
            {sortOptions.map((option) => (
              <motion.div
                key={option}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <Button
                  variant={option === selectedSort ? "default" : "secondary"}
                  size="sm"
                  className={`rounded-lg ${
                    option === selectedSort 
                      ? "bg-primary-gradient hover:opacity-90" 
                      : "bg-background-surface border border-border-subtle hover:bg-background-elevated"
                  }`}
                  onClick={() => setSelectedSort(option)}
                >
                  {option}
                </Button>
              </motion.div>
            ))}
          </div>

          <div className="flex flex-wrap gap-2">
            {strategies.map((strategy) => (
              <motion.div
                key={strategy}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <Button
                  variant={strategy === selectedStrategy ? "default" : "secondary"}
                  size="sm"
                  className={`rounded-lg ${
                    strategy === selectedStrategy 
                      ? "bg-primary-gradient hover:opacity-90" 
                      : "bg-background-surface border border-border-subtle hover:bg-background-elevated"
                  }`}
                  onClick={() => setSelectedStrategy(strategy)}
                >
                  {strategy}
                </Button>
              </motion.div>
            ))}
          </div>

          <div className="flex flex-wrap gap-2">
            {tradingPairs.map((pair) => (
              <motion.div
                key={pair}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <Button
                  variant={pair === selectedPair ? "default" : "secondary"}
                  size="sm"
                  className={`rounded-lg ${
                    pair === selectedPair 
                      ? "bg-primary-gradient hover:opacity-90" 
                      : "bg-background-surface border border-border-subtle hover:bg-background-elevated"
                  }`}
                  onClick={() => setSelectedPair(pair)}
                >
                  {pair}
                </Button>
              </motion.div>
            ))}
          </div>
        </div>
      </motion.div>

      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <Card className="bg-background-surface border border-border-subtle rounded-[16px] overflow-hidden transition-all duration-normal hover:border-primary/20">
          <Table>
            <TableHeader>
              <TableRow className="hover:bg-transparent border-border-subtle">
                <TableHead className="text-text-primary">AGENT</TableHead>
                <TableHead className="text-text-primary">STRATEGY</TableHead>
                <TableHead className="text-text-primary">PAIRS</TableHead>
                <TableHead className="text-text-primary">WIN RATE</TableHead>
                <TableHead className="text-text-primary">24H PNL</TableHead>
                <TableHead className="text-text-primary">4D PNL</TableHead>
                <TableHead className="text-text-primary">VOLUME</TableHead>
                <TableHead className="text-text-primary">COPIERS</TableHead>
                <TableHead className="text-text-primary">ACTION</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {paginatedTraders.map((trader) => (
                <TableRow key={trader.id} className="group hover:bg-background-elevated transition-colors duration-normal border-border-subtle">
                  <TableCell className="font-medium">
                    <div className="flex flex-col">
                      <span className="group-hover:text-primary transition-colors duration-normal">{trader.agent}</span>
                      <span className="text-sm text-text-tertiary">{trader.address}</span>
                    </div>
                  </TableCell>
                  <TableCell className="text-text-secondary">{trader.strategy}</TableCell>
                  <TableCell className="text-text-secondary">{trader.pairs.join(", ")}</TableCell>
                  <TableCell>
                    <span className="text-semantic-success">{trader.winRate}</span>
                  </TableCell>
                  <TableCell className={trader.pnl24h.includes('+') ? 'text-semantic-success' : 'text-semantic-error'}>
                    {trader.pnl24h}
                  </TableCell>
                  <TableCell className={trader.pnl4d.includes('+') ? 'text-semantic-success' : 'text-semantic-error'}>
                    {trader.pnl4d}
                  </TableCell>
                  <TableCell className="text-text-secondary">{trader.volume}</TableCell>
                  <TableCell>
                    <div className="flex items-center gap-1 text-text-secondary">
                      {trader.copiers}
                      <span className="text-primary animate-pulse">🔥</span>
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="flex gap-2">
                      <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                        <Button 
                          variant="default" 
                          size="sm"
                          className="bg-primary-gradient hover:opacity-90 rounded-[16px] shadow-small hover:shadow-medium"
                        >
                          Copy
                        </Button>
                      </motion.div>
                      <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                        <Button 
                          variant="secondary" 
                          size="sm"
                          className="glass hover:bg-background-elevated rounded-[16px] border border-border-subtle hover:border-primary/20"
                          onClick={() => window.location.href = `/traders/${trader.id}`}
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
          <p className="text-sm text-text-tertiary">
            Showing {((currentPage - 1) * ITEMS_PER_PAGE) + 1}-{Math.min(currentPage * ITEMS_PER_PAGE, filteredAndSortedTraders.length)} of {filteredAndSortedTraders.length} agents
          </p>
          <Pagination>
            <PaginationContent>
              <PaginationItem>
                <PaginationPrevious 
                  className="hover:bg-background-elevated transition-colors duration-normal"
                  onClick={() => setCurrentPage(prev => Math.max(1, prev - 1))}
                  disabled={currentPage === 1}
                />
              </PaginationItem>
              
              {visiblePageNumbers.map((pageNum) => (
                <PaginationItem key={pageNum}>
                  <PaginationLink
                    href="#"
                    isActive={pageNum === currentPage}
                    className="hover:bg-background-elevated transition-colors duration-normal"
                    onClick={(e) => {
                      e.preventDefault();
                      setCurrentPage(pageNum);
                    }}
                  >
                    {pageNum}
                  </PaginationLink>
                </PaginationItem>
              ))}
              
              <PaginationItem>
                <PaginationNext 
                  className="hover:bg-background-elevated transition-colors duration-normal"
                  onClick={() => setCurrentPage(prev => Math.min(totalPages, prev + 1))}
                  disabled={currentPage === totalPages}
                />
              </PaginationItem>
            </PaginationContent>
          </Pagination>
        </div>
      </motion.div>
    </div>
  );
}
