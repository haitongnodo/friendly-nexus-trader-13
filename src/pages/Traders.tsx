import React, { useState, useMemo } from "react";
import { Search, X, ChevronDown } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Pagination, PaginationContent, PaginationItem, PaginationLink, PaginationNext, PaginationPrevious } from "@/components/ui/pagination";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { motion } from "framer-motion";
import { generateTraders, type Trader } from "@/utils/mockTraderData";
import { cn } from "@/lib/utils";

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

  const clearFilter = (type: 'pair' | 'strategy' | 'sort') => {
    switch (type) {
      case 'pair':
        setSelectedPair("All Pairs");
        break;
      case 'strategy':
        setSelectedStrategy("All Strategies");
        break;
      case 'sort':
        setSelectedSort("All Agents");
        break;
    }
  };

  const ActiveFilters = () => {
    const hasActiveFilters = selectedPair !== "All Pairs" || 
                           selectedStrategy !== "All Strategies" || 
                           selectedSort !== "All Agents";

    if (!hasActiveFilters) return null;

    return (
      <div className="flex flex-wrap gap-2 mt-4">
        {selectedSort !== "All Agents" && (
          <div className="flex items-center gap-1 px-3 py-1.5 bg-background-elevated rounded-full border border-border-subtle">
            <span className="text-sm text-text-secondary">{selectedSort}</span>
            <button
              onClick={() => clearFilter('sort')}
              className="text-text-tertiary hover:text-primary transition-colors"
            >
              <X size={14} />
            </button>
          </div>
        )}
        {selectedStrategy !== "All Strategies" && (
          <div className="flex items-center gap-1 px-3 py-1.5 bg-background-elevated rounded-full border border-border-subtle">
            <span className="text-sm text-text-secondary">{selectedStrategy}</span>
            <button
              onClick={() => clearFilter('strategy')}
              className="text-text-tertiary hover:text-primary transition-colors"
            >
              <X size={14} />
            </button>
          </div>
        )}
        {selectedPair !== "All Pairs" && (
          <div className="flex items-center gap-1 px-3 py-1.5 bg-background-elevated rounded-full border border-border-subtle">
            <span className="text-sm text-text-secondary">{selectedPair}</span>
            <button
              onClick={() => clearFilter('pair')}
              className="text-text-tertiary hover:text-primary transition-colors"
            >
              <X size={14} />
            </button>
          </div>
        )}
      </div>
    );
  };

  return (
    <div className="container mx-auto px-6 py-8">
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="text-center mb-12 space-y-4 mt-[100px]"
      >
        <h1 className="text-[32px] font-semibold bg-primary-gradient bg-clip-text text-transparent tracking-tight leading-tight">
          Discover the Best AI Traders & Copy Their Strategies
        </h1>
        <p className="text-[16px] text-text-secondary tracking-wide max-w-2xl mx-auto leading-relaxed">
          Discover top-performing AI traders on Sui and copy their winning strategies to boost your own trading results
        </p>
      </motion.div>

      <motion.div 
        variants={containerAnimation}
        initial="hidden"
        animate="show"
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12"
      >
        {statsData.map((stat, index) => (
          <motion.div
            key={index}
            variants={itemAnimation}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className="bg-background-surface/50 backdrop-blur-sm border border-border-subtle rounded-[16px] p-6 
              flex flex-col items-center justify-center space-y-3 transition-all duration-300 
              hover:bg-background-elevated hover:border-primary/20 hover:shadow-lg"
          >
            <p className="text-text-tertiary text-sm font-medium">{stat.label}</p>
            <div className="flex items-center justify-between w-full">
              <span className="text-2xl font-bold text-text-primary font-mono">{stat.value}</span>
              <span className={cn(
                "text-sm font-medium",
                stat.change.startsWith('+') ? 'text-semantic-success' : 'text-semantic-error'
              )}>
                {stat.change}
              </span>
            </div>
          </motion.div>
        ))}
      </motion.div>

      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
        className="space-y-6 mb-8"
      >
        <div className="flex flex-col md:flex-row md:items-center gap-4">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-text-tertiary h-4 w-4 
              transition-colors group-hover:text-primary" />
            <Input 
              placeholder="Search by agent name, wallet address or trading strategy..." 
              className="pl-10 bg-background-surface/50 backdrop-blur-sm border-border-subtle rounded-lg 
                transition-all duration-200 h-11
                hover:border-primary/50 hover:bg-[rgba(255,122,15,0.1)] hover:shadow-glow
                focus:border-primary focus:bg-[rgba(255,122,15,0.15)] focus:text-primary-foreground"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          
          <div className="flex items-center gap-3 flex-wrap md:flex-nowrap">
            <Select value={selectedSort} onValueChange={setSelectedSort}>
              <SelectTrigger 
                className="w-[160px] h-11 bg-background-surface/50 backdrop-blur-sm border-border-subtle
                  hover:border-primary/50 hover:bg-[rgba(255,122,15,0.1)] transition-all duration-200
                  data-[state=open]:border-primary data-[state=open]:bg-[rgba(255,122,15,0.15)]"
              >
                <SelectValue placeholder="Sort by" />
              </SelectTrigger>
              <SelectContent className="bg-background-surface/95 backdrop-blur-md border-border-subtle">
                {sortOptions.map((option) => (
                  <SelectItem 
                    key={option} 
                    value={option}
                    className="hover:bg-[rgba(255,122,15,0.1)] focus:bg-[rgba(255,122,15,0.15)]"
                  >
                    {option}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>

            <Select value={selectedStrategy} onValueChange={setSelectedStrategy}>
              <SelectTrigger 
                className="w-[160px] h-11 bg-background-surface/50 backdrop-blur-sm border-border-subtle
                  hover:border-primary/50 hover:bg-[rgba(255,122,15,0.1)] transition-all duration-200
                  data-[state=open]:border-primary data-[state=open]:bg-[rgba(255,122,15,0.15)]"
              >
                <SelectValue placeholder="Strategy" />
              </SelectTrigger>
              <SelectContent className="bg-background-surface/95 backdrop-blur-md border-border-subtle">
                {strategies.map((strategy) => (
                  <SelectItem 
                    key={strategy} 
                    value={strategy}
                    className="hover:bg-[rgba(255,122,15,0.1)] focus:bg-[rgba(255,122,15,0.15)]"
                  >
                    {strategy}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>

            <Select value={selectedPair} onValueChange={setSelectedPair}>
              <SelectTrigger 
                className="w-[160px] h-11 bg-background-surface/50 backdrop-blur-sm border-border-subtle
                  hover:border-primary/50 hover:bg-[rgba(255,122,15,0.1)] transition-all duration-200
                  data-[state=open]:border-primary data-[state=open]:bg-[rgba(255,122,15,0.15)]"
              >
                <SelectValue placeholder="Trading pair" />
              </SelectTrigger>
              <SelectContent className="bg-background-surface/95 backdrop-blur-md border-border-subtle">
                {tradingPairs.map((pair) => (
                  <SelectItem 
                    key={pair} 
                    value={pair}
                    className="hover:bg-[rgba(255,122,15,0.1)] focus:bg-[rgba(255,122,15,0.15)]"
                  >
                    {pair}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>

        <ActiveFilters />

        <Card className="bg-background-surface/50 backdrop-blur-sm border-border-subtle rounded-[16px] 
          overflow-hidden transition-all duration-300 hover:border-primary/20">
          <Table>
            <TableHeader>
              <TableRow className="hover:bg-transparent border-border-subtle">
                <TableHead className="text-text-primary font-semibold">AGENT</TableHead>
                <TableHead className="text-text-primary font-semibold">STRATEGY</TableHead>
                <TableHead className="text-text-primary font-semibold">PAIRS</TableHead>
                <TableHead className="text-text-primary font-semibold">WIN RATE</TableHead>
                <TableHead className="text-text-primary font-semibold">24H PNL</TableHead>
                <TableHead className="text-text-primary font-semibold">4D PNL</TableHead>
                <TableHead className="text-text-primary font-semibold">VOLUME</TableHead>
                <TableHead className="text-text-primary font-semibold">COPIERS</TableHead>
                <TableHead className="text-text-primary font-semibold">ACTION</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {paginatedTraders.map((trader) => (
                <TableRow 
                  key={trader.id} 
                  className="group hover:bg-background-elevated/50 transition-all duration-200 
                    border-border-subtle backdrop-blur-sm"
                >
                  <TableCell className="font-medium">
                    <div className="flex flex-col">
                      <span className="group-hover:text-primary transition-colors duration-200 text-[15px]">
                        {trader.agent}
                      </span>
                      <span className="text-sm text-text-tertiary font-mono">
                        {trader.address}
                      </span>
                    </div>
                  </TableCell>
                  <TableCell className="text-text-secondary text-[14px]">{trader.strategy}</TableCell>
                  <TableCell className="text-text-secondary text-[14px]">{trader.pairs.join(", ")}</TableCell>
                  <TableCell>
                    <span className="text-semantic-success text-[14px] font-medium">{trader.winRate}</span>
                  </TableCell>
                  <TableCell className={cn(
                    "text-[14px] font-medium",
                    trader.pnl24h.includes('+') ? 'text-semantic-success' : 'text-semantic-error'
                  )}>
                    {trader.pnl24h}
                  </TableCell>
                  <TableCell className={cn(
                    "text-[14px] font-medium",
                    trader.pnl4d.includes('+') ? 'text-semantic-success' : 'text-semantic-error'
                  )}>
                    {trader.pnl4d}
                  </TableCell>
                  <TableCell className="text-text-secondary text-[14px] font-mono">{trader.volume}</TableCell>
                  <TableCell>
                    <div className="flex items-center gap-1 text-text-secondary text-[14px]">
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
                          className="bg-primary-gradient hover:opacity-90 rounded-[16px] shadow-sm 
                            hover:shadow-glow transition-all duration-200"
                        >
                          Copy
                        </Button>
                      </motion.div>
                      <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                        <Button 
                          variant="secondary" 
                          size="sm"
                          className="glass hover:bg-background-elevated rounded-[16px] border border-border-subtle 
                            hover:border-primary/20 transition-all duration-200"
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

        <div className="flex items-center justify-between mt-6">
          <p className="text-sm text-text-tertiary">
            Showing {((currentPage - 1) * ITEMS_PER_PAGE) + 1}-{Math.min(currentPage * ITEMS_PER_PAGE, filteredAndSortedTraders.length)} of {filteredAndSortedTraders.length} agents
          </p>
          <Pagination>
            <PaginationContent>
              <PaginationItem>
                <PaginationPrevious 
                  className="hover:bg-background-elevated transition-colors duration-200"
                  onClick={() => setCurrentPage(prev => Math.max(1, prev - 1))}
                  disabled={currentPage === 1}
                />
              </PaginationItem>
              
              {visiblePageNumbers.map((pageNum) => (
                <PaginationItem key={pageNum}>
                  <PaginationLink
                    href="#"
                    isActive={pageNum === currentPage}
                    className="hover:bg-background-elevated transition-colors duration-200"
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
                  className="hover:bg-background-elevated transition-colors duration-200"
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
