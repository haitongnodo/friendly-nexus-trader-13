import React, { useState } from "react";
import { Skeleton } from "@/components/ui/skeleton";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Copy, CheckCircle2 } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { generateTopTraders, generateHotTokens } from "@/utils/mockData";
import type { TopTrader, HotToken } from "@/utils/mockData";
import { motion, AnimatePresence } from "framer-motion";

interface DataDisplayProps {
  type: "traders" | "tokens";
  isLoading: boolean;
}

export const DataDisplay = ({ type, isLoading }: DataDisplayProps) => {
  const [copiedAddress, setCopiedAddress] = useState<string | null>(null);
  const { toast } = useToast();

  const handleCopyAddress = async (address: string) => {
    try {
      await navigator.clipboard.writeText(address);
      setCopiedAddress(address);
      toast({
        title: "Address copied!",
        description: "The wallet address has been copied to your clipboard.",
      });
      setTimeout(() => setCopiedAddress(null), 2000);
    } catch (err) {
      toast({
        title: "Failed to copy",
        description: "Please try copying manually.",
        variant: "destructive",
      });
    }
  };

  const truncateAddress = (address: string) => {
    return `${address.slice(0, 6)}...${address.slice(-4)}`;
  };

  const handleCopyTrade = (trader: TopTrader) => {
    toast({
      title: "Strategy copied!",
      description: `You are now copying ${truncateAddress(trader.address)}'s strategy.`,
    });
  };

  if (isLoading) {
    return (
      <div className="space-y-4 p-4">
        <Skeleton className="h-8 w-full" />
        <Skeleton className="h-8 w-full" />
        <Skeleton className="h-8 w-full" />
      </div>
    );
  }

  if (type === "traders") {
    const traders = generateTopTraders();
    
    return (
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="p-4 space-y-4"
      >
        <h2 className="text-xl font-semibold mb-4">🏆 Top SUI Traders This Week</h2>
        <Card className="overflow-hidden rounded-xl bg-background-surface border-border-subtle hover:border-border-strong transition-colors duration-200">
          <div className="max-h-[500px] overflow-y-auto scrollbar-thin scrollbar-thumb-border-strong scrollbar-track-transparent">
            <Table>
              <TableHeader>
                <TableRow className="bg-background-elevated hover:bg-background-elevated">
                  <TableHead>Rank</TableHead>
                  <TableHead>Trader</TableHead>
                  <TableHead>PnL</TableHead>
                  <TableHead>Volume</TableHead>
                  <TableHead>Trades</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {traders.map((trader: TopTrader) => (
                  <TableRow 
                    key={trader.address}
                    className="group hover:bg-card-gradient transition-all duration-200"
                  >
                    <TableCell className="font-mono">
                      {trader.rank}{trader.medal}
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center space-x-2">
                        <span className="font-mono text-xs text-text-secondary">
                          {truncateAddress(trader.address)}
                        </span>
                        <Button
                          variant="ghost"
                          size="icon"
                          className="h-6 w-6 opacity-0 group-hover:opacity-100 transition-opacity"
                          onClick={() => handleCopyAddress(trader.address)}
                          title="Copy address"
                        >
                          {copiedAddress === trader.address ? (
                            <CheckCircle2 className="h-4 w-4 text-semantic-success" />
                          ) : (
                            <Copy className="h-4 w-4" />
                          )}
                        </Button>
                      </div>
                    </TableCell>
                    <TableCell className="font-mono text-semantic-success">
                      {trader.pnl}
                    </TableCell>
                    <TableCell className="font-mono">{trader.volume}</TableCell>
                    <TableCell className="font-mono">{trader.tradeCount}</TableCell>
                    <TableCell className="text-right">
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => handleCopyTrade(trader)}
                        className="opacity-0 group-hover:opacity-100 transition-opacity hover:bg-primary/10 hover:text-primary"
                      >
                        Copy Trade
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </Card>
        <p className="text-sm text-text-tertiary text-center">
          Data provided by Birdeye API, showing top traders from the past week.
        </p>
      </motion.div>
    );
  }

  const tokens = generateHotTokens();
  
  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="p-4 space-y-4"
    >
      <h2 className="text-xl font-semibold mb-4">🔥 Hot SUI Tokens</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {tokens.map((token: HotToken) => (
          <Card 
            key={token.name}
            className="p-4 space-y-2 bg-background-surface hover:bg-card-gradient transition-all duration-200 rounded-xl border border-border-subtle hover:border-border-strong"
          >
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <span>{token.rank}{token.medal}</span>
                <h3 className="text-lg font-semibold">{token.name}</h3>
              </div>
              <span className="text-text-tertiary text-sm">
                ({token.description})
              </span>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <div className="text-text-tertiary text-sm">Price</div>
                <div className="text-xl font-mono">{token.price}</div>
              </div>
              <div>
                <div className="text-text-tertiary text-sm">24h Change</div>
                <div className="text-lg font-mono">{token.change24h}</div>
              </div>
              <div>
                <div className="text-text-tertiary text-sm">Liquidity</div>
                <div className="font-mono">{token.liquidity}</div>
              </div>
              <div>
                <div className="text-text-tertiary text-sm">24h Volume</div>
                <div className="font-mono">{token.volume24h}</div>
              </div>
            </div>
            <button 
              className="text-primary hover:text-primary-hover text-sm transition-colors mt-2"
              onClick={() => console.log(`View ${token.name} traders`)}
            >
              [View top {token.name} traders]
            </button>
          </Card>
        ))}
      </div>
      <p className="text-sm text-text-tertiary text-center">
        Data provided by Birdeye API, showing top trending tokens on SUI.
      </p>
    </motion.div>
  );
};