import React from "react";
import { Skeleton } from "@/components/ui/skeleton";
import { Card } from "@/components/ui/card";
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

interface DataDisplayProps {
  type: "traders" | "tokens";
  isLoading: boolean;
}

export const DataDisplay = ({ type, isLoading }: DataDisplayProps) => {
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
      <div className="p-4 space-y-4">
        <h2 className="text-xl font-semibold mb-4">🏆 Top SUI Traders This Week</h2>
        <Card className="overflow-hidden">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Rank</TableHead>
                <TableHead>Trader</TableHead>
                <TableHead>PnL</TableHead>
                <TableHead>Volume</TableHead>
                <TableHead>Trades</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {traders.map((trader: TopTrader) => (
                <TableRow key={trader.address}>
                  <TableCell className="font-mono">
                    {trader.rank}{trader.medal}
                  </TableCell>
                  <TableCell className="font-mono text-xs">
                    {trader.address}
                  </TableCell>
                  <TableCell className="text-semantic-success">
                    {trader.pnl}
                  </TableCell>
                  <TableCell>{trader.volume}</TableCell>
                  <TableCell>{trader.tradeCount}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </Card>
        <p className="text-sm text-text-tertiary text-center">
          Data provided by Birdeye API, showing top traders from the past week.
        </p>
      </div>
    );
  }

  const tokens = generateHotTokens();
  
  return (
    <div className="p-4 space-y-4">
      <h2 className="text-xl font-semibold mb-4">🔥 Hot SUI Tokens</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {tokens.map((token: HotToken) => (
          <Card key={token.name} className="p-4 space-y-2">
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
                <div className="text-lg">{token.change24h}</div>
              </div>
              <div>
                <div className="text-text-tertiary text-sm">Liquidity</div>
                <div>{token.liquidity}</div>
              </div>
              <div>
                <div className="text-text-tertiary text-sm">24h Volume</div>
                <div>{token.volume24h}</div>
              </div>
            </div>
            <button 
              className="text-primary hover:text-primary-hover text-sm transition-colors"
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
    </div>
  );
};