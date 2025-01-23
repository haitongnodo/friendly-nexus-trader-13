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

interface DataDisplayProps {
  type: "traders" | "tokens";
  isLoading: boolean;
  error?: string;
}

export const DataDisplay = ({ type, isLoading, error }: DataDisplayProps) => {
  if (error) {
    return (
      <div className="p-4 text-center">
        <p className="text-semantic-error mb-2">{error}</p>
        <button className="text-primary hover:text-primary-hover">
          Try again
        </button>
      </div>
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
      <Card className="p-4">
        <h3 className="text-sm font-semibold mb-2">SOL/USD</h3>
        <div className="text-2xl font-mono">$123.45</div>
        <div className="text-semantic-success text-sm">+5.67%</div>
      </Card>
      <Card className="p-4">
        <h3 className="text-sm font-semibold mb-2">JUP/USD</h3>
        <div className="text-2xl font-mono">$0.89</div>
        <div className="text-semantic-error text-sm">-2.34%</div>
      </Card>
    </div>
  );
};