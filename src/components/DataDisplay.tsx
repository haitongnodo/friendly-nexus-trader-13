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
import { getBirdeyeApiKey } from "@/config/api";
import { Alert, AlertTitle, AlertDescription } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";
import { ExternalLink } from "lucide-react";

interface Token {
  address: string;
  symbol: string;
  price: number;
  priceChange24h: number;
  volume24h: number;
}

interface DataDisplayProps {
  type: "traders" | "tokens";
  isLoading: boolean;
  error?: string;
  data?: any[];
}

export const DataDisplay = ({ type, isLoading, error, data }: DataDisplayProps) => {
  if (error) {
    const is401Error = error.includes("401") || error.toLowerCase().includes("api key");
    
    return (
      <Alert variant="destructive" className="mb-4">
        <AlertTitle>Error</AlertTitle>
        <AlertDescription className="space-y-4">
          {is401Error ? (
            <>
              <p>Your BirdEye API key needs to be updated. Please:</p>
              <ol className="list-decimal ml-4 space-y-2">
                <li>Visit the BirdEye dashboard to check your API key status</li>
                <li>Ensure your subscription plan allows access to this endpoint</li>
                <li>Copy your API key and update it in the settings</li>
              </ol>
              <div className="mt-4">
                <Button 
                  variant="outline" 
                  className="text-sm"
                  onClick={() => window.open('https://birdeye.so/settings?tab=api', '_blank')}
                >
                  Go to BirdEye Dashboard
                  <ExternalLink className="ml-2 h-4 w-4" />
                </Button>
              </div>
            </>
          ) : (
            error
          )}
        </AlertDescription>
      </Alert>
    );
  }

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
    return (
      <div className="p-4">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Trader</TableHead>
              <TableHead>Volume</TableHead>
              <TableHead>Success Rate</TableHead>
              <TableHead>Recent Trades</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            <TableRow>
              <TableCell className="font-mono text-xs">
                0x1234...5678
              </TableCell>
              <TableCell>$1.2M</TableCell>
              <TableCell className="text-semantic-success">98%</TableCell>
              <TableCell>24</TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-2 gap-4 p-4">
      {data && data.length > 0 ? (
        data.slice(0, 6).map((token: any) => (
          <Card key={token.address} className="p-4">
            <h3 className="text-sm font-semibold mb-2">{token.symbol}</h3>
            <div className="text-2xl font-mono">
              ${parseFloat(token.price).toFixed(2)}
            </div>
            <div className={`text-sm ${parseFloat(token.priceChange24h) >= 0 ? 'text-semantic-success' : 'text-semantic-error'}`}>
              {parseFloat(token.priceChange24h) >= 0 ? '+' : ''}{parseFloat(token.priceChange24h).toFixed(2)}%
            </div>
          </Card>
        ))
      ) : (
        <Alert>
          <AlertTitle>No Data Available</AlertTitle>
          <AlertDescription>
            No token data is currently available. Please try again later.
          </AlertDescription>
        </Alert>
      )}
    </div>
  );
};