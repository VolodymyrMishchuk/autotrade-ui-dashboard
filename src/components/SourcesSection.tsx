
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { MaskedInput } from "@/components/ui/masked-input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Switch } from "@/components/ui/switch";
import { 
  ArrowLeft, 
  Plus, 
  Search, 
  Edit, 
  Trash2, 
  Radio,
  Wifi,
  Activity
} from "lucide-react";
import { useState } from "react";

interface SourcesSectionProps {
  onBack: () => void;
}

export function SourcesSection({ onBack }: SourcesSectionProps) {
  const [showCreateForm, setShowCreateForm] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [editingSource, setEditingSource] = useState<any>(null);

  // Mock data with secret symbols
  const [sources, setSources] = useState([
    {
      id: "1",
      name: "Expert Forex Signals",
      platform: "TradingView",
      created_at: "2024-01-15",
      status: "Active",
      signals: "•,•••"
    },
    {
      id: "2",
      name: "Professional Trading Advisor",
      platform: "MetaTrader 5",
      created_at: "2024-01-10",
      status: "Active",
      signals: "•••"
    },
    {
      id: "3",
      name: "Market Pro Signals",
      platform: "Forex Pro",
      created_at: "2024-01-08",
      status: "Inactive",
      signals: "•"
    },
  ]);

  const getPlatformIcon = (platform: string) => {
    switch (platform.toLowerCase()) {
      case "tradingview":
      case "•••••••••":
        return Radio;
      case "metatrader 5":
      case "•••••••••• •":
        return Activity;
      default:
        return Wifi;
    }
  };

  const getStatusColor = (status: string) => {
    return status === "Active" 
      ? "bg-green-100 text-green-800" 
      : "bg-gray-100 text-gray-800";
  };

  const handleToggleStatus = (sourceId: string) => {
    setSources(sources.map(source => 
      source.id === sourceId 
        ? { ...source, status: source.status === "Active" ? "Inactive" : "Active" }
        : source
    ));
  };

  const handleEditSource = (source: any) => {
    setEditingSource(source);
  };

  const handleSaveEdit = () => {
    if (editingSource) {
      setSources(sources.map(source => 
        source.id === editingSource.id ? editingSource : source
      ));
      setEditingSource(null);
    }
  };

  const handleDeleteSource = (sourceId: string) => {
    if (confirm("Are you sure you want to delete this source?")) {
      setSources(sources.filter(source => source.id !== sourceId));
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
            <h1 className="text-xl sm:text-2xl font-bold">Signal Sources</h1>
            <p className="text-sm sm:text-base text-muted-foreground">Manage trading signal sources and platforms</p>
          </div>
        </div>
        <Button onClick={() => setShowCreateForm(true)} className="w-full sm:w-auto">
          <Plus className="w-4 h-4 mr-2" />
          Add Source
        </Button>
      </div>

      {/* Search */}
      <Card className="bg-white/80 backdrop-blur-sm border-0 shadow-lg">
        <CardContent className="p-4 sm:p-6">
          <div className="relative">
            <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search signal sources..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10"
            />
          </div>
        </CardContent>
      </Card>

      {/* Create Source Form */}
      {showCreateForm && (
        <Card className="bg-white/80 backdrop-blur-sm border-0 shadow-lg">
          <CardHeader className="p-4 sm:p-6">
            <CardTitle className="text-lg sm:text-xl">Create New Signal Source</CardTitle>
            <CardDescription className="text-sm sm:text-base">Add a new signal source to the autotrading system</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4 p-4 sm:p-6 pt-0">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="name">Source Name</Label>
                <Input id="name" placeholder="Enter source name" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="platform">Platform</Label>
                <Input id="platform" placeholder="Enter platform name" />
              </div>
              <div className="space-y-2 sm:col-span-2">
                <Label htmlFor="token">API Token</Label>
                <MaskedInput id="token" placeholder="••••••••••••••••••••••••••••••••" />
              </div>
            </div>
            <div className="flex flex-col sm:flex-row gap-2 pt-4">
              <Button type="submit" className="w-full sm:w-auto">Create Source</Button>
              <Button variant="outline" onClick={() => setShowCreateForm(false)} className="w-full sm:w-auto">
                Cancel
              </Button>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Edit Source Dialog */}
      <Dialog open={!!editingSource} onOpenChange={() => setEditingSource(null)}>
        <DialogContent className="w-[95vw] max-w-md mx-auto">
          <DialogHeader>
            <DialogTitle>Edit Source</DialogTitle>
            <DialogDescription>
              Update source information and settings
            </DialogDescription>
          </DialogHeader>
          {editingSource && (
            <div className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="edit-name">Source Name</Label>
                <Input
                  id="edit-name"
                  value={editingSource.name}
                  onChange={(e) => setEditingSource({
                    ...editingSource,
                    name: e.target.value
                  })}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="edit-platform">Platform</Label>
                <Input
                  id="edit-platform"
                  value={editingSource.platform}
                  onChange={(e) => setEditingSource({
                    ...editingSource,
                    platform: e.target.value
                  })}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="edit-status">Status</Label>
                <select 
                  id="edit-status"
                  value={editingSource.status}
                  onChange={(e) => setEditingSource({
                    ...editingSource,
                    status: e.target.value
                  })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md"
                >
                  <option value="Active">Active</option>
                  <option value="Inactive">Inactive</option>
                </select>
              </div>
              <div className="flex flex-col sm:flex-row gap-2 pt-4">
                <Button onClick={handleSaveEdit} className="w-full sm:w-auto">Save Changes</Button>
                <Button variant="outline" onClick={() => setEditingSource(null)} className="w-full sm:w-auto">
                  Cancel
                </Button>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>

      {/* Sources List */}
      <div className="grid gap-3 sm:gap-4">
        {sources.map((source) => {
          const IconComponent = getPlatformIcon(source.platform);
          return (
            <Card key={source.id} className="bg-white/80 backdrop-blur-sm border-0 shadow-lg hover:shadow-xl transition-all duration-300">
              <CardContent className="p-4 sm:p-6">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                  <div className="flex flex-col xs:flex-row xs:items-center gap-3 xs:gap-4 min-w-0 flex-1">
                    <div className="w-10 h-10 sm:w-12 sm:h-12 bg-gradient-to-br from-purple-500 to-pink-600 rounded-full flex items-center justify-center flex-shrink-0">
                      <IconComponent className="w-5 h-5 sm:w-6 sm:h-6 text-white" />
                    </div>
                    <div className="min-w-0 flex-1">
                      <h3 className="font-semibold text-base sm:text-lg truncate">{source.name}</h3>
                      <div className="flex flex-col xs:flex-row xs:items-center gap-1 xs:gap-4 text-xs sm:text-sm text-muted-foreground">
                        <span>Platform: {source.platform}</span>
                        <span>Signals: {source.signals}</span>
                        <span className="hidden sm:inline">Created: {new Date(source.created_at).toLocaleDateString()}</span>
                      </div>
                      <div className="flex flex-wrap items-center gap-1 sm:gap-2 mt-2">
                        <Badge className={`${getStatusColor(source.status)} text-xs`}>
                          {source.status}
                        </Badge>
                        <Badge variant="outline" className="text-xs">{source.platform}</Badge>
                      </div>
                    </div>
                  </div>
                  <div className="flex flex-col sm:flex-row items-start sm:items-center gap-3">
                    <div className="flex items-center gap-2">
                      <span className="text-xs text-muted-foreground">Status:</span>
                      <Switch
                        checked={source.status === "Active"}
                        onCheckedChange={() => handleToggleStatus(source.id)}
                      />
                    </div>
                    <div className="flex items-center gap-2 flex-shrink-0">
                      <Button 
                        variant="outline" 
                        size="sm" 
                        onClick={() => handleEditSource(source)}
                        className="h-8 w-8 p-0"
                      >
                        <Edit className="w-3 h-3 sm:w-4 sm:h-4" />
                      </Button>
                      <Button 
                        variant="outline" 
                        size="sm" 
                        onClick={() => handleDeleteSource(source.id)}
                        className="h-8 w-8 p-0"
                      >
                        <Trash2 className="w-3 h-3 sm:w-4 sm:h-4" />
                      </Button>
                    </div>
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
