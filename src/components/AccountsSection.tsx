
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from "@/components/ui/alert-dialog";
import { 
  ArrowLeft, 
  Plus, 
  Search, 
  Edit, 
  Trash2, 
  DollarSign,
  CreditCard,
  Activity
} from "lucide-react";
import { useState } from "react";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

interface AccountsSectionProps {
  onBack: () => void;
}

export function AccountsSection({ onBack }: AccountsSectionProps) {
  const [showCreateForm, setShowCreateForm] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [editingAccount, setEditingAccount] = useState<any>(null);

  // Mock data
  const [accounts, setAccounts] = useState([
    {
      id: "1",
      number: 12345678,
      balance: 15750.50,
      currency: "USD",
      status: "ACTIVE",
      created_at: "2024-01-15",
      person_id: "1",
      source_id: "1",
      owner: "John Doe",
      source: "TradingView"
    },
    {
      id: "2",
      number: 87654321,
      balance: 8900.25,
      currency: "EUR",
      status: "ACTIVE",
      created_at: "2024-01-10",
      person_id: "2",
      source_id: "2",
      owner: "Jane Smith",
      source: "MetaTrader"
    },
  ]);

  const getStatusColor = (status: string) => {
    return status === "ACTIVE" 
      ? "bg-green-100 text-green-800" 
      : "bg-red-100 text-red-800";
  };

  const formatCurrency = (amount: number, currency: string) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: currency,
    }).format(amount);
  };

  const handleEditAccount = (account: any) => {
    setEditingAccount(account);
  };

  const handleSaveEdit = () => {
    if (editingAccount) {
      setAccounts(accounts.map(acc => 
        acc.id === editingAccount.id ? editingAccount : acc
      ));
      setEditingAccount(null);
    }
  };

  const handleDeleteAccount = (accountId: string) => {
    setAccounts(accounts.filter(account => account.id !== accountId));
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
            <h1 className="text-xl sm:text-2xl font-bold">Accounts Management</h1>
            <p className="text-sm sm:text-base text-muted-foreground">Manage trading accounts and balances</p>
          </div>
        </div>
        <Button onClick={() => setShowCreateForm(true)} className="w-full sm:w-auto">
          <Plus className="w-4 h-4 mr-2" />
          Add Account
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
                  placeholder="Search accounts..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                />
              </div>
            </div>
            <Select defaultValue="all">
              <SelectTrigger className="w-full sm:w-[180px]">
                <SelectValue placeholder="Filter by status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Status</SelectItem>
                <SelectItem value="ACTIVE">Active</SelectItem>
                <SelectItem value="DEACTIVATED">Deactivated</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </CardContent>
      </Card>

      {/* Create Account Form */}
      {showCreateForm && (
        <Card className="bg-white/80 backdrop-blur-sm border-0 shadow-lg">
          <CardHeader className="p-4 sm:p-6">
            <CardTitle className="text-lg sm:text-xl">Create New Account</CardTitle>
            <CardDescription className="text-sm sm:text-base">Add a new trading account to the system</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4 p-4 sm:p-6 pt-0">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="person_id">Account Owner</Label>
                <Select>
                  <SelectTrigger>
                    <SelectValue placeholder="Select account owner" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="1">John Doe</SelectItem>
                    <SelectItem value="2">Jane Smith</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label htmlFor="source_id">Signal Source</Label>
                <Select>
                  <SelectTrigger>
                    <SelectValue placeholder="Select signal source" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="1">TradingView</SelectItem>
                    <SelectItem value="2">MetaTrader</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2 sm:col-span-2">
                <Label htmlFor="token">MetaTrader API Token</Label>
                <Input id="token" placeholder="Enter MetaTrader API token" />
              </div>
            </div>
            <div className="flex flex-col sm:flex-row gap-2 pt-4">
              <Button type="submit" className="w-full sm:w-auto">Create Account</Button>
              <Button variant="outline" onClick={() => setShowCreateForm(false)} className="w-full sm:w-auto">
                Cancel
              </Button>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Edit Account Dialog */}
      <Dialog open={!!editingAccount} onOpenChange={() => setEditingAccount(null)}>
        <DialogContent className="w-[95vw] max-w-md mx-auto">
          <DialogHeader>
            <DialogTitle>Edit Account</DialogTitle>
            <DialogDescription>
              Update account information and settings
            </DialogDescription>
          </DialogHeader>
          {editingAccount && (
            <div className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="edit-balance">Balance</Label>
                <Input
                  id="edit-balance"
                  type="number"
                  value={editingAccount.balance}
                  onChange={(e) => setEditingAccount({
                    ...editingAccount,
                    balance: parseFloat(e.target.value)
                  })}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="edit-status">Status</Label>
                <Select 
                  value={editingAccount.status} 
                  onValueChange={(value) => setEditingAccount({
                    ...editingAccount,
                    status: value
                  })}
                >
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="ACTIVE">Active</SelectItem>
                    <SelectItem value="DEACTIVATED">Deactivated</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label htmlFor="edit-owner">Owner</Label>
                <Input
                  id="edit-owner"
                  value={editingAccount.owner}
                  onChange={(e) => setEditingAccount({
                    ...editingAccount,
                    owner: e.target.value
                  })}
                />
              </div>
              <div className="flex flex-col sm:flex-row gap-2 pt-4">
                <Button onClick={handleSaveEdit} className="w-full sm:w-auto">Save Changes</Button>
                <Button variant="outline" onClick={() => setEditingAccount(null)} className="w-full sm:w-auto">
                  Cancel
                </Button>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>

      {/* Accounts List */}
      <div className="grid gap-3 sm:gap-4">
        {accounts.map((account) => (
          <Card key={account.id} className="bg-white/80 backdrop-blur-sm border-0 shadow-lg hover:shadow-xl transition-all duration-300">
            <CardContent className="p-4 sm:p-6">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div className="flex flex-col xs:flex-row xs:items-center gap-3 xs:gap-4 min-w-0 flex-1">
                  <div className="w-10 h-10 sm:w-12 sm:h-12 bg-gradient-to-br from-green-500 to-blue-600 rounded-full flex items-center justify-center flex-shrink-0">
                    <CreditCard className="w-5 h-5 sm:w-6 sm:h-6 text-white" />
                  </div>
                  <div className="min-w-0 flex-1">
                    <h3 className="font-semibold text-base sm:text-lg truncate">
                      Account #{account.number}
                    </h3>
                    <div className="flex flex-col xs:flex-row xs:items-center gap-1 xs:gap-4 text-xs sm:text-sm text-muted-foreground">
                      <div className="flex items-center gap-1">
                        <DollarSign className="w-3 h-3 sm:w-4 sm:h-4" />
                        {formatCurrency(account.balance, account.currency)}
                      </div>
                      <div className="flex items-center gap-1">
                        <Activity className="w-3 h-3 sm:w-4 sm:h-4" />
                        {account.source}
                      </div>
                    </div>
                    <div className="flex flex-wrap items-center gap-1 sm:gap-2 mt-2">
                      <Badge className={`${getStatusColor(account.status)} text-xs`}>
                        {account.status}
                      </Badge>
                      <Badge variant="outline" className="text-xs">{account.owner}</Badge>
                      <Badge variant="outline" className="text-xs">{account.currency}</Badge>
                    </div>
                  </div>
                </div>
                <div className="flex items-center gap-2 flex-shrink-0">
                  <Button 
                    variant="outline" 
                    size="sm"
                    onClick={() => handleEditAccount(account)}
                    className="h-8 w-8 p-0"
                  >
                    <Edit className="w-3 h-3 sm:w-4 sm:h-4" />
                  </Button>
                  <AlertDialog>
                    <AlertDialogTrigger asChild>
                      <Button variant="outline" size="sm" className="h-8 w-8 p-0">
                        <Trash2 className="w-3 h-3 sm:w-4 sm:h-4" />
                      </Button>
                    </AlertDialogTrigger>
                    <AlertDialogContent>
                      <AlertDialogHeader>
                        <AlertDialogTitle>Delete Account</AlertDialogTitle>
                        <AlertDialogDescription>
                          Are you sure you want to delete Account #{account.number}? This action cannot be undone.
                        </AlertDialogDescription>
                      </AlertDialogHeader>
                      <AlertDialogFooter>
                        <AlertDialogCancel>Cancel</AlertDialogCancel>
                        <AlertDialogAction onClick={() => handleDeleteAccount(account.id)}>
                          Delete
                        </AlertDialogAction>
                      </AlertDialogFooter>
                    </AlertDialogContent>
                  </AlertDialog>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
