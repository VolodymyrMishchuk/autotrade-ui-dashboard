import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { 
  TrendingUp, 
  TrendingDown, 
  DollarSign, 
  Activity,
  Users,
  CreditCard,
  ArrowUpRight,
  ArrowDownRight
} from "lucide-react";
import { PersonsSection } from "./PersonsSection";
import { SourcesSection } from "./SourcesSection";
import { AccountsSection } from "./AccountsSection";
import { TransactionsSection } from "./TransactionsSection";

interface DashboardProps {
  activeSection: string;
  onSectionChange: (section: string) => void;
}

export function Dashboard({ activeSection, onSectionChange }: DashboardProps) {
  // Mock data with real values instead of symbols
  const stats = [
    {
      title: "Total Balance",
      value: "$12,345.67",
      change: "+12.5%",
      trend: "up" as const,
      icon: DollarSign,
    },
    {
      title: "Active Signals",
      value: "42",
      change: "+8",
      trend: "up" as const,
      icon: Activity,
    },
    {
      title: "Users",
      value: "128",
      change: "+15",
      trend: "up" as const,
      icon: Users,
    },
    {
      title: "Transactions",
      value: "1,234",
      change: "+123",
      trend: "up" as const,
      icon: CreditCard,
    },
  ];

  const recentTransactions = [
    {
      id: 1,
      type: "Signal",
      symbol: "EUR/USD",
      amount: "$234.56",
      status: "Completed",
      time: "5 min ago"
    },
    {
      id: 2,
      type: "Manual",
      symbol: "GBP/USD", 
      amount: "$1,234.78",
      status: "Pending",
      time: "12 min ago"
    },
    {
      id: 3,
      type: "Signal",
      symbol: "USD/JPY",
      amount: "$567.89",
      status: "Completed", 
      time: "23 min ago"
    },
  ];

  const activeSignals = [
    {
      id: 1,
      pair: "EUR/USD",
      direction: "BUY",
      entry: "1.08450",
      current: "1.08567",
      pnl: "+234.56",
      status: "Active"
    },
    {
      id: 2,
      pair: "GBP/USD", 
      direction: "SELL",
      entry: "1.26789",
      current: "1.26654",
      pnl: "-123.45",
      status: "Active"
    },
  ];

  // Render different sections based on activeSection
  if (activeSection === "persons") {
    return <PersonsSection onBack={() => onSectionChange("dashboard")} />;
  }

  if (activeSection === "sources") {
    return <SourcesSection onBack={() => onSectionChange("dashboard")} />;
  }

  if (activeSection === "accounts") {
    return <AccountsSection onBack={() => onSectionChange("dashboard")} />;
  }

  if (activeSection === "transactions") {
    return <TransactionsSection onBack={() => onSectionChange("dashboard")} />;
  }

  // Dashboard content (only show when activeSection is "dashboard")
  if (activeSection !== "dashboard") {
    return null;
  }

  return (
    <div className="space-y-4 sm:space-y-6">
      {/* Stats Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4 lg:gap-6">
        {stats.map((stat) => {
          const IconComponent = stat.icon;
          return (
            <Card key={stat.title} className="bg-white/80 backdrop-blur-sm border-0 shadow-lg hover:shadow-xl transition-all duration-300">
              <CardContent className="p-4 sm:p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-xs sm:text-sm font-medium text-muted-foreground uppercase tracking-wide">
                      {stat.title}
                    </p>
                    <p className="text-xl sm:text-2xl lg:text-3xl font-bold mt-1 sm:mt-2">
                      {stat.value}
                    </p>
                    <div className="flex items-center mt-1 sm:mt-2">
                      {stat.trend === "up" ? (
                        <ArrowUpRight className="w-3 h-3 sm:w-4 sm:h-4 text-green-500 mr-1" />
                      ) : (
                        <ArrowDownRight className="w-3 h-3 sm:w-4 sm:h-4 text-red-500 mr-1" />
                      )}
                      <span className={`text-xs sm:text-sm font-medium ${
                        stat.trend === "up" ? "text-green-600" : "text-red-600"
                      }`}>
                        {stat.change}
                      </span>
                    </div>
                  </div>
                  <div className="w-10 h-10 sm:w-12 sm:h-12 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center flex-shrink-0">
                    <IconComponent className="w-5 h-5 sm:w-6 sm:h-6 text-white" />
                  </div>
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>

      {/* Charts and Recent Activity Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 sm:gap-6">
        {/* Active Signals */}
        <Card className="lg:col-span-2 bg-white/80 backdrop-blur-sm border-0 shadow-lg">
          <CardHeader className="p-4 sm:p-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
              <div>
                <CardTitle className="text-lg sm:text-xl">Active Signals</CardTitle>
                <CardDescription className="text-sm sm:text-base">Current trading positions</CardDescription>
              </div>
              <Button 
                variant="outline" 
                size="sm"
                onClick={() => onSectionChange("sources")}
                className="w-full sm:w-auto"
              >
                View Sources
              </Button>
            </div>
          </CardHeader>
          <CardContent className="p-4 sm:p-6 pt-0">
            <div className="space-y-3 sm:space-y-4">
              {activeSignals.map((signal) => (
                <div key={signal.id} className="flex flex-col sm:flex-row sm:items-center justify-between p-3 sm:p-4 bg-muted/50 rounded-lg gap-2 sm:gap-4">
                  <div className="flex flex-col xs:flex-row xs:items-center gap-2 xs:gap-4 min-w-0 flex-1">
                    <div className="flex items-center gap-2">
                      <Badge 
                        variant={signal.direction === "BUY" ? "default" : "secondary"}
                        className="text-xs font-medium"
                      >
                        {signal.direction}
                      </Badge>
                      <span className="font-semibold text-sm sm:text-base">{signal.pair}</span>
                    </div>
                    <div className="flex flex-wrap items-center gap-2 xs:gap-4 text-xs sm:text-sm text-muted-foreground">
                      <span>Entry: {signal.entry}</span>
                      <span>Current: {signal.current}</span>
                    </div>
                  </div>
                  <div className="flex flex-col xs:flex-row xs:items-center gap-2 xs:gap-4">
                    <span className={`text-sm font-medium ${
                      signal.pnl.startsWith("+") ? "text-green-600" : "text-red-600"
                    }`}>
                      {signal.pnl}
                    </span>
                    <Badge variant="outline" className="text-xs w-fit">
                      {signal.status}
                    </Badge>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Recent Transactions */}
        <Card className="bg-white/80 backdrop-blur-sm border-0 shadow-lg">
          <CardHeader className="p-4 sm:p-6">
            <div className="flex items-center justify-between">
              <div>
                <CardTitle className="text-lg sm:text-xl">Recent Activity</CardTitle>
                <CardDescription className="text-sm sm:text-base">Latest transactions</CardDescription>
              </div>
            </div>
          </CardHeader>
          <CardContent className="p-4 sm:p-6 pt-0">
            <div className="space-y-3 sm:space-y-4">
              {recentTransactions.map((transaction) => (
                <div key={transaction.id} className="flex items-center justify-between p-3 sm:p-4 bg-muted/50 rounded-lg">
                  <div className="min-w-0 flex-1">
                    <div className="flex items-center gap-2 mb-1">
                      <Badge 
                        variant={transaction.type === "Signal" ? "default" : "secondary"}
                        className="text-xs"
                      >
                        {transaction.type}
                      </Badge>
                      <span className="font-medium text-sm truncate">{transaction.symbol}</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-xs sm:text-sm font-medium">{transaction.amount}</span>
                      <span className="text-xs text-muted-foreground">{transaction.time}</span>
                    </div>
                    <Badge 
                      variant={transaction.status === "Completed" ? "outline" : "secondary"}
                      className="text-xs mt-1"
                    >
                      {transaction.status}
                    </Badge>
                  </div>
                </div>
              ))}
            </div>
            <Button 
              variant="outline" 
              className="w-full mt-4"
              onClick={() => onSectionChange("transactions")}
            >
              View All Transactions
            </Button>
          </CardContent>
        </Card>
      </div>

      {/* Quick Actions */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-4">
        <Button 
          variant="outline" 
          className="h-20 sm:h-24 flex flex-col items-center justify-center gap-2 bg-white/80 backdrop-blur-sm hover:bg-white"
          onClick={() => onSectionChange("sources")}
        >
          <Activity className="w-5 h-5 sm:w-6 sm:h-6" />
          <span className="text-xs sm:text-sm font-medium">Sources</span>
        </Button>
        <Button 
          variant="outline" 
          className="h-20 sm:h-24 flex flex-col items-center justify-center gap-2 bg-white/80 backdrop-blur-sm hover:bg-white"
          onClick={() => onSectionChange("accounts")}
        >
          <CreditCard className="w-5 h-5 sm:w-6 sm:h-6" />
          <span className="text-xs sm:text-sm font-medium">Accounts</span>
        </Button>
        <Button 
          variant="outline" 
          className="h-20 sm:h-24 flex flex-col items-center justify-center gap-2 bg-white/80 backdrop-blur-sm hover:bg-white"
          onClick={() => onSectionChange("users")}
        >
          <Users className="w-5 h-5 sm:w-6 sm:h-6" />
          <span className="text-xs sm:text-sm font-medium">Users</span>
        </Button>
        <Button 
          variant="outline" 
          className="h-20 sm:h-24 flex flex-col items-center justify-center gap-2 bg-white/80 backdrop-blur-sm hover:bg-white"
          onClick={() => onSectionChange("transactions")}
        >
          <TrendingUp className="w-5 h-5 sm:w-6 sm:h-6" />
          <span className="text-xs sm:text-sm font-medium">Transactions</span>
        </Button>
      </div>
    </div>
  );
}
