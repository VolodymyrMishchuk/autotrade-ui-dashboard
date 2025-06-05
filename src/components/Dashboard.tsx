
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { 
  Users, 
  CreditCard, 
  Radio, 
  ArrowLeftRight,
  TrendingUp,
  DollarSign,
  Activity,
  Plus
} from "lucide-react";
import { PersonsSection } from "@/components/PersonsSection";
import { AccountsSection } from "@/components/AccountsSection";
import { SourcesSection } from "@/components/SourcesSection";
import { TransactionsSection } from "@/components/TransactionsSection";

interface DashboardProps {
  activeSection: string;
  onSectionChange: (section: string) => void;
}

export function Dashboard({ activeSection, onSectionChange }: DashboardProps) {
  const stats = [
    {
      title: "Total Users",
      value: "1,234",
      icon: Users,
      change: "+12%",
      changeType: "positive" as const,
    },
    {
      title: "Active Accounts",
      value: "892",
      icon: CreditCard,
      change: "+8%",
      changeType: "positive" as const,
    },
    {
      title: "Signal Sources",
      value: "24",
      icon: Radio,
      change: "+2",
      changeType: "positive" as const,
    },
    {
      title: "Total Volume",
      value: "$2.4M",
      icon: DollarSign,
      change: "+18%",
      changeType: "positive" as const,
    },
  ];

  const quickActions = [
    {
      title: "Create User",
      description: "Add a new user to the system",
      icon: Users,
      action: () => onSectionChange("persons"),
      color: "bg-blue-500",
    },
    {
      title: "Add Account",
      description: "Create a new trading account",
      icon: CreditCard,
      action: () => onSectionChange("accounts"),
      color: "bg-green-500",
    },
    {
      title: "Add Source",
      description: "Register a new signal source",
      icon: Radio,
      action: () => onSectionChange("sources"),
      color: "bg-purple-500",
    },
    {
      title: "View Transactions",
      description: "Monitor recent transactions",
      icon: ArrowLeftRight,
      action: () => onSectionChange("transactions"),
      color: "bg-orange-500",
    },
  ];

  if (activeSection === "persons") {
    return <PersonsSection onBack={() => onSectionChange("dashboard")} />;
  }

  if (activeSection === "accounts") {
    return <AccountsSection onBack={() => onSectionChange("dashboard")} />;
  }

  if (activeSection === "sources") {
    return <SourcesSection onBack={() => onSectionChange("dashboard")} />;
  }

  if (activeSection === "transactions") {
    return <TransactionsSection onBack={() => onSectionChange("dashboard")} />;
  }

  return (
    <div className="space-y-4 lg:space-y-6">
      {/* Overview Stats */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 lg:gap-6">
        {stats.map((stat, index) => (
          <Card key={index} className="bg-white/80 backdrop-blur-sm border-0 shadow-lg hover:shadow-xl transition-all duration-300">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2 p-3 lg:p-6">
              <CardTitle className="text-xs lg:text-sm font-medium text-muted-foreground">
                {stat.title}
              </CardTitle>
              <stat.icon className="h-3 w-3 lg:h-4 lg:w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent className="p-3 lg:p-6 pt-0">
              <div className="text-lg lg:text-2xl font-bold">{stat.value}</div>
              <Badge variant="secondary" className="mt-1 lg:mt-2 text-xs">
                <TrendingUp className="w-2 h-2 lg:w-3 lg:h-3 mr-1" />
                {stat.change}
              </Badge>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Quick Actions */}
      <Card className="bg-white/80 backdrop-blur-sm border-0 shadow-lg">
        <CardHeader className="p-4 lg:p-6">
          <CardTitle className="flex items-center gap-2 text-lg lg:text-xl">
            <Activity className="w-4 h-4 lg:w-5 lg:h-5" />
            Quick Actions
          </CardTitle>
          <CardDescription className="text-sm lg:text-base">
            Common tasks and operations
          </CardDescription>
        </CardHeader>
        <CardContent className="p-4 lg:p-6 pt-0">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 lg:gap-4">
            {quickActions.map((action, index) => (
              <Button
                key={index}
                variant="outline"
                className="h-auto p-3 lg:p-4 flex flex-col items-center gap-2 lg:gap-3 hover:shadow-md transition-all duration-300"
                onClick={action.action}
              >
                <div className={`w-8 h-8 lg:w-12 lg:h-12 rounded-lg ${action.color} flex items-center justify-center`}>
                  <action.icon className="w-4 h-4 lg:w-6 lg:h-6 text-white" />
                </div>
                <div className="text-center">
                  <div className="font-semibold text-xs lg:text-sm">{action.title}</div>
                  <div className="text-xs text-muted-foreground hidden lg:block">{action.description}</div>
                </div>
              </Button>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Recent Activity */}
      <Card className="bg-white/80 backdrop-blur-sm border-0 shadow-lg">
        <CardHeader className="p-4 lg:p-6">
          <CardTitle className="flex items-center gap-2 text-lg lg:text-xl">
            <ArrowLeftRight className="w-4 h-4 lg:w-5 lg:h-5" />
            Recent Activity
          </CardTitle>
          <CardDescription className="text-sm lg:text-base">
            Latest system events and transactions
          </CardDescription>
        </CardHeader>
        <CardContent className="p-4 lg:p-6 pt-0">
          <div className="space-y-3 lg:space-y-4">
            {[
              { type: "User Created", user: "john.doe@example.com", time: "2 minutes ago", status: "success" },
              { type: "Account Activated", user: "Trading Account #1234", time: "5 minutes ago", status: "success" },
              { type: "Signal Received", user: "TradingView Source", time: "8 minutes ago", status: "info" },
              { type: "Transaction Executed", user: "$1,250.00 BUY EURUSD", time: "12 minutes ago", status: "success" },
            ].map((activity, index) => (
              <div key={index} className="flex items-center justify-between p-2 lg:p-3 rounded-lg bg-gray-50 hover:bg-gray-100 transition-colors">
                <div className="flex items-center gap-2 lg:gap-3">
                  <div className={`w-2 h-2 rounded-full ${
                    activity.status === 'success' ? 'bg-green-500' : 
                    activity.status === 'info' ? 'bg-blue-500' : 'bg-yellow-500'
                  }`} />
                  <div>
                    <div className="font-medium text-xs lg:text-sm">{activity.type}</div>
                    <div className="text-xs text-muted-foreground truncate max-w-[150px] lg:max-w-none">{activity.user}</div>
                  </div>
                </div>
                <div className="text-xs text-muted-foreground">{activity.time}</div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
