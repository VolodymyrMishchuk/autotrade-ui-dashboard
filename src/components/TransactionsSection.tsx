
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { 
  ArrowLeft, 
  Plus, 
  Search, 
  ArrowUpRight,
  ArrowDownLeft,
  DollarSign,
  Calendar,
  Filter
} from "lucide-react";
import { useState } from "react";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

interface TransactionsSectionProps {
  onBack: () => void;
}

export function TransactionsSection({ onBack }: TransactionsSectionProps) {
  const [searchTerm, setSearchTerm] = useState("");

  // Mock data
  const transactions = [
    {
      id: "1",
      amount: 1250.00,
      direction: "BUY",
      created_at: "2024-01-15T10:30:00Z",
      account_id: "12345678",
      source_id: "TradingView",
      currency: "USD",
      symbol: "EURUSD"
    },
    {
      id: "2",
      amount: 800.50,
      direction: "SELL",
      created_at: "2024-01-15T09:15:00Z",
      account_id: "87654321",
      source_id: "MetaTrader",
      currency: "EUR",
      symbol: "GBPUSD"
    },
    {
      id: "3",
      amount: 2100.75,
      direction: "BUY",
      created_at: "2024-01-14T16:45:00Z",
      account_id: "12345678",
      source_id: "TradingView",
      currency: "USD",
      symbol: "USDJPY"
    },
  ];

  const getDirectionIcon = (direction: string) => {
    return direction === "BUY" ? ArrowUpRight : ArrowDownLeft;
  };

  const getDirectionColor = (direction: string) => {
    return direction === "BUY" 
      ? "bg-green-100 text-green-800" 
      : "bg-red-100 text-red-800";
  };

  const formatCurrency = (amount: number, currency: string) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: currency,
    }).format(amount);
  };

  const formatDateTime = (dateString: string) => {
    return new Date(dateString).toLocaleString();
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <Button variant="outline" size="sm" onClick={onBack}>
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Dashboard
          </Button>
          <div>
            <h1 className="text-2xl font-bold">Transactions</h1>
            <p className="text-muted-foreground">Monitor and manage trading transactions</p>
          </div>
        </div>
        <Button>
          <Plus className="w-4 h-4 mr-2" />
          Manual Transaction
        </Button>
      </div>

      {/* Search and Filters */}
      <Card className="bg-white/80 backdrop-blur-sm border-0 shadow-lg">
        <CardContent className="p-6">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-1">
              <div className="relative">
                <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Search transactions..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                />
              </div>
            </div>
            <Select defaultValue="all">
              <SelectTrigger className="w-full md:w-[180px]">
                <SelectValue placeholder="Direction" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Directions</SelectItem>
                <SelectItem value="BUY">Buy Orders</SelectItem>
                <SelectItem value="SELL">Sell Orders</SelectItem>
              </SelectContent>
            </Select>
            <Select defaultValue="all">
              <SelectTrigger className="w-full md:w-[180px]">
                <SelectValue placeholder="Time Range" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Time</SelectItem>
                <SelectItem value="today">Today</SelectItem>
                <SelectItem value="week">This Week</SelectItem>
                <SelectItem value="month">This Month</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </CardContent>
      </Card>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card className="bg-white/80 backdrop-blur-sm border-0 shadow-lg">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Total Volume</p>
                <p className="text-2xl font-bold">$4,151.25</p>
              </div>
              <DollarSign className="w-8 h-8 text-blue-500" />
            </div>
          </CardContent>
        </Card>
        <Card className="bg-white/80 backdrop-blur-sm border-0 shadow-lg">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Buy Orders</p>
                <p className="text-2xl font-bold text-green-600">2</p>
              </div>
              <ArrowUpRight className="w-8 h-8 text-green-500" />
            </div>
          </CardContent>
        </Card>
        <Card className="bg-white/80 backdrop-blur-sm border-0 shadow-lg">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Sell Orders</p>
                <p className="text-2xl font-bold text-red-600">1</p>
              </div>
              <ArrowDownLeft className="w-8 h-8 text-red-500" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Transactions List */}
      <div className="grid gap-4">
        {transactions.map((transaction) => {
          const DirectionIcon = getDirectionIcon(transaction.direction);
          return (
            <Card key={transaction.id} className="bg-white/80 backdrop-blur-sm border-0 shadow-lg hover:shadow-xl transition-all duration-300">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-4">
                    <div className={`w-12 h-12 rounded-full flex items-center justify-center ${
                      transaction.direction === "BUY" 
                        ? "bg-green-100" 
                        : "bg-red-100"
                    }`}>
                      <DirectionIcon className={`w-6 h-6 ${
                        transaction.direction === "BUY" 
                          ? "text-green-600" 
                          : "text-red-600"
                      }`} />
                    </div>
                    <div>
                      <div className="flex items-center gap-2">
                        <h3 className="font-semibold text-lg">
                          {formatCurrency(transaction.amount, transaction.currency)}
                        </h3>
                        <Badge className={getDirectionColor(transaction.direction)}>
                          {transaction.direction}
                        </Badge>
                      </div>
                      <div className="flex items-center gap-4 text-sm text-muted-foreground">
                        <span>Symbol: {transaction.symbol}</span>
                        <span>Account: #{transaction.account_id}</span>
                        <span>Source: {transaction.source_id}</span>
                      </div>
                      <div className="flex items-center gap-1 text-sm text-muted-foreground mt-1">
                        <Calendar className="w-4 h-4" />
                        {formatDateTime(transaction.created_at)}
                      </div>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="text-sm text-muted-foreground">Transaction ID</div>
                    <div className="font-mono text-sm">#{transaction.id}</div>
                  </div>
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>
    </div>
  );
}
