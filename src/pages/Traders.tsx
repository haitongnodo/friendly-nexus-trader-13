import { Search } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Pagination, PaginationContent, PaginationItem, PaginationLink, PaginationNext, PaginationPrevious } from "@/components/ui/pagination";

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
    <div className="container mx-auto p-6 space-y-8 animate-fade-in">
      <div className="space-y-4">
        <h1 className="text-4xl font-bold bg-gradient-to-r from-nodo-orange to-nodo-orange-light bg-clip-text text-transparent animate-fade-in">
          AI-Powered Copy Trading
        </h1>
        <p className="text-muted-foreground max-w-2xl animate-fade-in">
          Discover and automatically copy top-performing AI trading agents. Our advanced algorithms analyze trading patterns to help you find the most profitable strategies.
        </p>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {statsData.map((stat) => (
          <Card key={stat.label} className="p-6 glass hover:scale-105 transition-transform duration-200">
            <div className="space-y-2">
              <p className="text-sm text-muted-foreground">{stat.label}</p>
              <div className="flex items-center justify-between">
                <span className="text-2xl font-bold">{stat.value}</span>
                <span className={`text-sm ${stat.change.startsWith('+') ? 'text-green-500' : 'text-red-500'}`}>
                  {stat.change}
                </span>
              </div>
            </div>
          </Card>
        ))}
      </div>

      {/* Search and Filters */}
      <div className="space-y-4">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground h-4 w-4" />
          <Input 
            placeholder="Search by agent name, wallet address or trading strategy..." 
            className="pl-10 glass"
          />
        </div>
        
        <div className="flex flex-wrap gap-2">
          {tradingPairs.map((pair) => (
            <Button
              key={pair}
              variant={pair === "All Agents" ? "default" : "secondary"}
              className="hover:scale-105 transition-transform duration-200"
            >
              {pair}
            </Button>
          ))}
        </div>
      </div>

      {/* Traders Table */}
      <Card className="glass">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>AGENT</TableHead>
              <TableHead>WIN RATE</TableHead>
              <TableHead>24H PNL</TableHead>
              <TableHead>4D PNL</TableHead>
              <TableHead>VOLUME</TableHead>
              <TableHead>COPIERS</TableHead>
              <TableHead>ACTION</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {traders.map((trader, index) => (
              <TableRow key={index} className="hover:bg-muted/50 transition-colors">
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
                      className="bg-nodo-orange hover:bg-nodo-orange-light"
                    >
                      Copy
                    </Button>
                    <Button 
                      variant="secondary" 
                      size="sm"
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
      <div className="flex items-center justify-between">
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
    </div>
  );
}