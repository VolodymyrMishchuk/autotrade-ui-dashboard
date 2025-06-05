
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
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

  // Mock data
  const sources = [
    {
      id: "1",
      name: "TradingView Alerts",
      platform: "TradingView",
      created_at: "2024-01-15",
      status: "Active",
      signals: 1250
    },
    {
      id: "2",
      name: "MetaTrader Expert Advisor",
      platform: "MetaTrader 5",
      created_at: "2024-01-10",
      status: "Active",
      signals: 890
    },
    {
      id: "3",
      name: "Custom API Source",
      platform: "REST API",
      created_at: "2024-01-08",
      status: "Inactive",
      signals: 0
    },
  ];

  const getPlatformIcon = (platform: string) => {
    switch (platform.toLowerCase()) {
      case "tradingview":
        return Radio;
      case "metatrader 5":
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
            <h1 className="text-2xl font-bold">Signal Sources</h1>
            <p className="text-muted-foreground">Manage trading signal sources and platforms</p>
          </div>
        </div>
        <Button onClick={() => setShowCreateForm(true)}>
          <Plus className="w-4 h-4 mr-2" />
          Add Source
        </Button>
      </div>

      {/* Search */}
      <Card className="bg-white/80 backdrop-blur-sm border-0 shadow-lg">
        <CardContent className="p-6">
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
          <CardHeader>
            <CardTitle>Create New Signal Source</CardTitle>
            <CardDescription>Add a new signal source to the autotrading system</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="name">Source Name</Label>
                <Input id="name" placeholder="Enter source name" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="platform">Platform</Label>
                <Input id="platform" placeholder="Enter platform name" />
              </div>
              <div className="space-y-2 md:col-span-2">
                <Label htmlFor="token">API Token</Label>
                <Input id="token" type="password" placeholder="Enter API token" />
              </div>
            </div>
            <div className="flex gap-2 pt-4">
              <Button type="submit">Create Source</Button>
              <Button variant="outline" onClick={() => setShowCreateForm(false)}>
                Cancel
              </Button>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Sources List */}
      <div className="grid gap-4">
        {sources.map((source) => {
          const IconComponent = getPlatformIcon(source.platform);
          return (
            <Card key={source.id} className="bg-white/80 backdrop-blur-sm border-0 shadow-lg hover:shadow-xl transition-all duration-300">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 bg-gradient-to-br from-purple-500 to-pink-600 rounded-full flex items-center justify-center">
                      <IconComponent className="w-6 h-6 text-white" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-lg">{source.name}</h3>
                      <div className="flex items-center gap-4 text-sm text-muted-foreground">
                        <span>Platform: {source.platform}</span>
                        <span>Signals: {source.signals}</span>
                        <span>Created: {new Date(source.created_at).toLocaleDateString()}</span>
                      </div>
                      <div className="flex items-center gap-2 mt-2">
                        <Badge className={getStatusColor(source.status)}>
                          {source.status}
                        </Badge>
                        <Badge variant="outline">{source.platform}</Badge>
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <Button variant="outline" size="sm">
                      <Edit className="w-4 h-4" />
                    </Button>
                    <Button variant="outline" size="sm">
                      <Trash2 className="w-4 h-4" />
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
