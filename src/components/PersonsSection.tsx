
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
  Mail, 
  Phone,
  User
} from "lucide-react";
import { useState } from "react";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

interface PersonsSectionProps {
  onBack: () => void;
}

export function PersonsSection({ onBack }: PersonsSectionProps) {
  const [showCreateForm, setShowCreateForm] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");

  // Mock data - in real app this would come from API
  const users = [
    {
      id: "1",
      first_name: "John",
      last_name: "Doe",
      email: "john.doe@example.com",
      phone_number: "+1234567890",
      role: "USER",
      type: "Individual",
      created_at: "2024-01-15",
    },
    {
      id: "2",
      first_name: "Jane",
      last_name: "Smith",
      email: "jane.smith@example.com",
      phone_number: "+1234567891",
      role: "ADMIN",
      type: "Individual",
      created_at: "2024-01-10",
    },
  ];

  const filteredUsers = users.filter(user => 
    user.first_name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    user.last_name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    user.email.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const getRoleColor = (role: string) => {
    switch (role) {
      case "SUPERADMIN":
        return "bg-red-100 text-red-800";
      case "ADMIN":
        return "bg-blue-100 text-blue-800";
      default:
        return "bg-green-100 text-green-800";
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
            <h1 className="text-xl sm:text-2xl font-bold">Users Management</h1>
            <p className="text-sm sm:text-base text-muted-foreground">Manage system users and their roles</p>
          </div>
        </div>
        <Button onClick={() => setShowCreateForm(true)} className="w-full sm:w-auto">
          <Plus className="w-4 h-4 mr-2" />
          Add User
        </Button>
      </div>

      {/* Search and Filters */}
      <Card className="bg-white/80 backdrop-blur-sm border-0 shadow-lg">
        <CardContent className="p-4 sm:p-6">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-1">
              <div className="relative">
                <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Search users..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                />
              </div>
            </div>
            <Select defaultValue="all">
              <SelectTrigger className="w-full md:w-[180px]">
                <SelectValue placeholder="Filter by role" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Roles</SelectItem>
                <SelectItem value="USER">Users</SelectItem>
                <SelectItem value="ADMIN">Admins</SelectItem>
                <SelectItem value="SUPERADMIN">Super Admins</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </CardContent>
      </Card>

      {/* Create User Form */}
      {showCreateForm && (
        <Card className="bg-white/80 backdrop-blur-sm border-0 shadow-lg">
          <CardHeader className="p-4 sm:p-6">
            <CardTitle className="text-lg sm:text-xl">Create New User</CardTitle>
            <CardDescription className="text-sm sm:text-base">Add a new user to the autotrading system</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4 p-4 sm:p-6 pt-0">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="first_name" className="text-sm">First Name</Label>
                <Input id="first_name" placeholder="Enter first name" className="text-sm" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="last_name" className="text-sm">Last Name</Label>
                <Input id="last_name" placeholder="Enter last name" className="text-sm" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="email" className="text-sm">Email</Label>
                <Input id="email" type="email" placeholder="Enter email address" className="text-sm" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="phone" className="text-sm">Phone Number</Label>
                <Input id="phone" placeholder="Enter phone number" className="text-sm" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="type" className="text-sm">User Type</Label>
                <Select>
                  <SelectTrigger className="text-sm">
                    <SelectValue placeholder="Select user type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Individual">Individual</SelectItem>
                    <SelectItem value="Corporate">Corporate</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label htmlFor="role" className="text-sm">Role</Label>
                <Select>
                  <SelectTrigger className="text-sm">
                    <SelectValue placeholder="Select role" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="USER">User</SelectItem>
                    <SelectItem value="ADMIN">Admin</SelectItem>
                    <SelectItem value="SUPERADMIN">Super Admin</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2 sm:col-span-2">
                <Label htmlFor="password" className="text-sm">Password</Label>
                <Input id="password" type="password" placeholder="Enter password" className="text-sm" />
              </div>
            </div>
            <div className="flex flex-col sm:flex-row gap-2 pt-4">
              <Button type="submit" className="w-full sm:w-auto">Create User</Button>
              <Button variant="outline" onClick={() => setShowCreateForm(false)} className="w-full sm:w-auto">
                Cancel
              </Button>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Users List */}
      <div className="grid gap-3 sm:gap-4">
        {filteredUsers.map((user) => (
          <Card key={user.id} className="bg-white/80 backdrop-blur-sm border-0 shadow-lg hover:shadow-xl transition-all duration-300">
            <CardContent className="p-4 sm:p-6">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div className="flex flex-col xs:flex-row xs:items-center gap-3 xs:gap-4 min-w-0 flex-1">
                  <div className="w-10 h-10 sm:w-12 sm:h-12 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center flex-shrink-0">
                    <User className="w-5 h-5 sm:w-6 sm:h-6 text-white" />
                  </div>
                  <div className="min-w-0 flex-1">
                    <h3 className="font-semibold text-base sm:text-lg truncate">
                      {user.first_name} {user.last_name}
                    </h3>
                    <div className="flex flex-col xs:flex-row xs:items-center gap-1 xs:gap-4 text-xs sm:text-sm text-muted-foreground">
                      <div className="flex items-center gap-1 truncate">
                        <Mail className="w-3 h-3 sm:w-4 sm:h-4 flex-shrink-0" />
                        <span className="truncate">{user.email}</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <Phone className="w-3 h-3 sm:w-4 sm:h-4 flex-shrink-0" />
                        <span>{user.phone_number}</span>
                      </div>
                    </div>
                    <div className="flex flex-wrap items-center gap-1 sm:gap-2 mt-2">
                      <Badge className={`${getRoleColor(user.role)} text-xs`}>
                        {user.role}
                      </Badge>
                      <Badge variant="outline" className="text-xs">{user.type}</Badge>
                    </div>
                  </div>
                </div>
                <div className="flex items-center gap-2 flex-shrink-0">
                  <Button variant="outline" size="sm" className="h-8 w-8 p-0">
                    <Edit className="w-3 h-3 sm:w-4 sm:h-4" />
                  </Button>
                  <Button variant="outline" size="sm" className="h-8 w-8 p-0">
                    <Trash2 className="w-3 h-3 sm:w-4 sm:h-4" />
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
