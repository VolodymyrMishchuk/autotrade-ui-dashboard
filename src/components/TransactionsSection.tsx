
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
  Calendar
} from "lucide-react";
import { useState } from "react";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

interface TransactionsSectionProps {
  onBack: () => void;
}

export function TransactionsSection({ onBack }: TransactionsSectionProps) {
  const [searchTerm, setSearchTerm] = useState("");

  // Mock data
  const [transactions, setTransactions] = useState([
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
  ]);

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

  const handleDeleteTransaction = (transactionId: string) => {
    if (confirm("Are you sure you want to delete this transaction?")) {
      setTransactions(transactions.filter(transaction => transaction.id !== transactionId));
    }
  };

  return (
    <div className="space-y-4 sm:space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div className="flex flex-col sm:flex-row sm:items-center gap-3 sm:gap-4">
          <Button variant="outline" size="sm" onClick={onBack} className="w-fit">
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Dashboard
          </Button>
          <div>
            <h1 className="text-xl sm:text-2xl font-bold">Transactions</h1>
            <p className="text-sm sm:text-base text-muted-foreground">Monitor and manage trading transactions</p>
          </div>
        </div>
        <Button className="w-full sm:w-auto">
          <Plus className="w-4 h-4 mr-2" />
          Manual Transaction
        </Button>
      </div>

      {/* Search and Filters */}
      <Card className="bg-white/80 backdrop-blur-sm border-0 shadow-lg">
        <CardContent className="p-4 sm:p-6">
          <div className="flex flex-col sm:flex-row gap-3 sm:gap-4">
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
            <div className="flex flex-col xs:flex-row gap-2 xs:gap-3">
              <Select defaultValue="all">
                <SelectTrigger className="w-full xs:w-[140px] sm:w-[160px]">
                  <SelectValue placeholder="Direction" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Directions</SelectItem>
                  <SelectItem value="BUY">Buy Orders</SelectItem>
                  <SelectItem value="SELL">Sell Orders</SelectItem>
                </SelectContent>
              </Select>
              <Select defaultValue="all">
                <SelectTrigger className="w-full xs:w-[140px] sm:w-[160px]">
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
          </div>
        </CardContent>
      </Card>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 sm:gap-6">
        <Card className="bg-white/80 backdrop-blur-sm border-0 shadow-lg">
          <CardContent className="p-4 sm:p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-xs sm:text-sm text-muted-foreground">Total Volume</p>
                <p className="text-lg sm:text-2xl font-bold">$4,151.25</p>
              </div>
              <DollarSign className="w-6 h-6 sm:w-8 sm:h-8 text-blue-500" />
            </div>
          </CardContent>
        </Card>
        <Card className="bg-white/80 backdrop-blur-sm border-0 shadow-lg">
          <CardContent className="p-4 sm:p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-xs sm:text-sm text-muted-foreground">Buy Orders</p>
                <p className="text-lg sm:text-2xl font-bold text-green-600">2</p>
              </div>
              <ArrowUpRight className="w-6 h-6 sm:w-8 sm:h-8 text-green-500" />
            </div>
          </CardContent>
        </Card>
        <Card className="bg-white/80 backdrop-blur-sm border-0 shadow-lg">
          <CardContent className="p-4 sm:p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-xs sm:text-sm text-muted-foreground">Sell Orders</p>
                <p className="text-lg sm:text-2xl font-bold text-red-600">1</p>
              </div>
              <ArrowDownLeft className="w-6 h-6 sm:w-8 sm:h-8 text-red-500" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Transactions List */}
      <div className="grid gap-3 sm:gap-4">
        {transactions.map((transaction) => {
          const DirectionIcon = getDirectionIcon(transaction.direction);
          return (
            <Card key={transaction.id} className="bg-white/80 backdrop-blur-sm border-0 shadow-lg hover:shadow-xl transition-all duration-300">
              <CardContent className="p-4 sm:p-6">
                <div className="flex flex-col sm:flex-row justify-between gap-4">
                  <div className="flex flex-col xs:flex-row xs:items-center gap-3 xs:gap-4 min-w-0 flex-1">
                    <div className={`w-10 h-10 sm:w-12 sm:h-12 rounded-full flex items-center justify-center flex-shrink-0 ${
                      transaction.direction === "BUY" 
                        ? "bg-green-100" 
                        : "bg-red-100"
                    }`}>
                      <DirectionIcon className={`w-5 h-5 sm:w-6 sm:h-6 ${
                        transaction.direction === "BUY" 
                          ? "text-green-600" 
                          : "text-red-600"
                      }`} />
                    </div>
                    <div className="min-w-0 flex-1">
                      <div className="flex flex-col xs:flex-row xs:items-center gap-2">
                        <h3 className="font-semibold text-base sm:text-lg">
                          {formatCurrency(transaction.amount, transaction.currency)}
                        </h3>
                        <Badge className={`${getDirectionColor(transaction.direction)} text-xs w-fit`}>
                          {transaction.direction}
                        </Badge>
                      </div>
                      <div className="flex flex-col xs:flex-row xs:items-center gap-1 xs:gap-4 text-xs sm:text-sm text-muted-foreground">
                        <span>Symbol: {transaction.symbol}</span>
                        <span>Account: #{transaction.account_id}</span>
                        <span className="hidden sm:inline">Source: {transaction.source_id}</span>
                      </div>
                      <div className="flex items-center gap-1 text-xs sm:text-sm text-muted-foreground mt-1">
                        <Calendar className="w-3 h-3 sm:w-4 sm:h-4" />
                        <span className="truncate">{formatDateTime(transaction.created_at)}</span>
                      </div>
                    </div>
                  </div>
                  <div className="flex flex-col sm:flex-row items-start sm:items-center gap-2">
                    <div className="text-left sm:text-right flex-shrink-0">
                      <div className="text-xs sm:text-sm text-muted-foreground">Transaction ID</div>
                      <div className="font-mono text-xs sm:text-sm">#{transaction.id}</div>
                    </div>
                    <Button 
                      variant="outline" 
                      size="sm" 
                      onClick={() => handleDeleteTransaction(transaction.id)}
                      className="h-8 px-2"
                    >
                      Delete
                    </Button>
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
