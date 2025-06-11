
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { Switch } from "@/components/ui/switch";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from "@/components/ui/alert-dialog";
import { 
  ArrowLeft, 
  Plus, 
  Search, 
  Edit, 
  Trash2, 
  User,
  Mail,
  Phone,
  Shield,
  UserCheck,
  UserX
} from "lucide-react";
import { useState } from "react";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

interface PersonsSectionProps {
  onBack: () => void;
}

export function PersonsSection({ onBack }: PersonsSectionProps) {
  const [showCreateForm, setShowCreateForm] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [editingPerson, setEditingPerson] = useState<any>(null);
  const [roleFilter, setRoleFilter] = useState("all");
  const [statusFilter, setStatusFilter] = useState("all");

  // Mock data with extended properties
  const [persons, setPersons] = useState([
    {
      id: "1",
      name: "John Doe",
      email: "john.doe@example.com",
      phone: "+1234567890",
      role: "USER",
      type: "Individual",
      isActive: true,
      created_at: "2024-01-15"
    },
    {
      id: "2",
      name: "Jane Smith", 
      email: "jane.smith@example.com",
      phone: "+1234567891",
      role: "ADMIN",
      type: "Individual",
      isActive: true,
      created_at: "2024-01-10"
    },
    {
      id: "3",
      name: "Mike Johnson", 
      email: "mike.johnson@example.com",
      phone: "+1234567892",
      role: "SUPERADMIN",
      type: "Individual",
      isActive: false,
      created_at: "2024-01-05"
    },
  ]);

  // Filter persons based on search term, role filter, and status filter
  const filteredPersons = persons.filter(person => {
    const matchesSearch = person.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         person.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         person.phone.includes(searchTerm);
    
    const matchesRole = roleFilter === "all" || person.role === roleFilter;
    const matchesStatus = statusFilter === "all" || 
                         (statusFilter === "active" && person.isActive) ||
                         (statusFilter === "inactive" && !person.isActive);
    
    return matchesSearch && matchesRole && matchesStatus;
  });

  const getRoleColor = (role: string) => {
    switch (role) {
      case "SUPERADMIN":
        return "bg-red-100 text-red-800";
      case "ADMIN":
        return "bg-blue-100 text-blue-800";
      case "USER":
        return "bg-green-100 text-green-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  const getRoleIcon = (role: string) => {
    switch (role) {
      case "SUPERADMIN":
        return Shield;
      case "ADMIN":
        return UserCheck;
      case "USER":
        return User;
      default:
        return User;
    }
  };

  const handleEditPerson = (person: any) => {
    setEditingPerson(person);
  };

  const handleSaveEdit = () => {
    if (editingPerson) {
      setPersons(persons.map(p => 
        p.id === editingPerson.id ? editingPerson : p
      ));
      setEditingPerson(null);
    }
  };

  const handleDeletePerson = (personId: string) => {
    setPersons(persons.filter(person => person.id !== personId));
  };

  const handleToggleUserStatus = (personId: string) => {
    setPersons(persons.map(person => 
      person.id === personId 
        ? { ...person, isActive: !person.isActive }
        : person
    ));
  };

  const handleCreatePerson = () => {
    // This would typically create a new person
    setShowCreateForm(false);
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
          <div className="flex flex-col sm:flex-row gap-3 sm:gap-4">
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
            <Select value={roleFilter} onValueChange={setRoleFilter}>
              <SelectTrigger className="w-full sm:w-[180px]">
                <SelectValue placeholder="Filter by role" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Roles</SelectItem>
                <SelectItem value="USER">User</SelectItem>
                <SelectItem value="ADMIN">Admin</SelectItem>
                <SelectItem value="SUPERADMIN">Super Admin</SelectItem>
              </SelectContent>
            </Select>
            <Select value={statusFilter} onValueChange={setStatusFilter}>
              <SelectTrigger className="w-full sm:w-[180px]">
                <SelectValue placeholder="Filter by status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Status</SelectItem>
                <SelectItem value="active">Active</SelectItem>
                <SelectItem value="inactive">Inactive</SelectItem>
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
            <CardDescription className="text-sm sm:text-base">Add a new user to the system</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4 p-4 sm:p-6 pt-0">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="name">Full Name</Label>
                <Input id="name" placeholder="Enter full name" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <Input id="email" type="email" placeholder="Enter email address" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="phone">Phone</Label>
                <Input id="phone" placeholder="Enter phone number" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="role">Role</Label>
                <Select>
                  <SelectTrigger>
                    <SelectValue placeholder="Select user role" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="USER">User</SelectItem>
                    <SelectItem value="ADMIN">Admin</SelectItem>
                    <SelectItem value="SUPERADMIN">Super Admin</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2 sm:col-span-2">
                <div className="flex items-center space-x-2">
                  <Switch id="active" defaultChecked />
                  <Label htmlFor="active">Active user</Label>
                </div>
              </div>
            </div>
            <div className="flex flex-col sm:flex-row gap-2 pt-4">
              <Button onClick={handleCreatePerson} className="w-full sm:w-auto">Create User</Button>
              <Button variant="outline" onClick={() => setShowCreateForm(false)} className="w-full sm:w-auto">
                Cancel
              </Button>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Edit User Dialog */}
      <Dialog open={!!editingPerson} onOpenChange={() => setEditingPerson(null)}>
        <DialogContent className="w-[95vw] max-w-md mx-auto">
          <DialogHeader>
            <DialogTitle>Edit User</DialogTitle>
            <DialogDescription>
              Update user information and settings
            </DialogDescription>
          </DialogHeader>
          {editingPerson && (
            <div className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="edit-name">Full Name</Label>
                <Input
                  id="edit-name"
                  value={editingPerson.name}
                  onChange={(e) => setEditingPerson({
                    ...editingPerson,
                    name: e.target.value
                  })}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="edit-email">Email</Label>
                <Input
                  id="edit-email"
                  type="email"
                  value={editingPerson.email}
                  onChange={(e) => setEditingPerson({
                    ...editingPerson,
                    email: e.target.value
                  })}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="edit-phone">Phone</Label>
                <Input
                  id="edit-phone"
                  value={editingPerson.phone}
                  onChange={(e) => setEditingPerson({
                    ...editingPerson,
                    phone: e.target.value
                  })}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="edit-role">Role</Label>
                <Select 
                  value={editingPerson.role} 
                  onValueChange={(value) => setEditingPerson({
                    ...editingPerson,
                    role: value
                  })}
                >
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="USER">User</SelectItem>
                    <SelectItem value="ADMIN">Admin</SelectItem>
                    <SelectItem value="SUPERADMIN">Super Admin</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <div className="flex items-center space-x-2">
                  <Switch 
                    id="edit-active" 
                    checked={editingPerson.isActive}
                    onCheckedChange={(checked) => setEditingPerson({
                      ...editingPerson,
                      isActive: checked
                    })}
                  />
                  <Label htmlFor="edit-active">Active user</Label>
                </div>
              </div>
              <div className="flex flex-col sm:flex-row gap-2 pt-4">
                <Button onClick={handleSaveEdit} className="w-full sm:w-auto">Save Changes</Button>
                <Button variant="outline" onClick={() => setEditingPerson(null)} className="w-full sm:w-auto">
                  Cancel
                </Button>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>

      {/* Users List */}
      <div className="grid gap-3 sm:gap-4">
        {filteredPersons.map((person) => {
          const RoleIcon = getRoleIcon(person.role);
          return (
            <Card key={person.id} className="bg-white/80 backdrop-blur-sm border-0 shadow-lg hover:shadow-xl transition-all duration-300">
              <CardContent className="p-4 sm:p-6">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                  <div className="flex flex-col xs:flex-row xs:items-center gap-3 xs:gap-4 min-w-0 flex-1">
                    <div className="w-10 h-10 sm:w-12 sm:h-12 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center flex-shrink-0">
                      <RoleIcon className="w-5 h-5 sm:w-6 sm:h-6 text-white" />
                    </div>
                    <div className="min-w-0 flex-1">
                      <div className="flex items-center gap-2 mb-1">
                        <h3 className="font-semibold text-base sm:text-lg truncate">{person.name}</h3>
                        {person.isActive ? (
                          <UserCheck className="w-4 h-4 text-green-500" />
                        ) : (
                          <UserX className="w-4 h-4 text-red-500" />
                        )}
                      </div>
                      <div className="flex flex-col xs:flex-row xs:items-center gap-1 xs:gap-4 text-xs sm:text-sm text-muted-foreground">
                        <div className="flex items-center gap-1">
                          <Mail className="w-3 h-3 sm:w-4 sm:h-4" />
                          <span className="truncate">{person.email}</span>
                        </div>
                        <div className="flex items-center gap-1">
                          <Phone className="w-3 h-3 sm:w-4 sm:h-4" />
                          <span>{person.phone}</span>
                        </div>
                      </div>
                      <div className="flex flex-wrap items-center gap-1 sm:gap-2 mt-2">
                        <Badge className={`${getRoleColor(person.role)} text-xs`}>
                          {person.role}
                        </Badge>
                        <Badge variant="outline" className="text-xs">{person.type}</Badge>
                        <Badge 
                          variant="outline" 
                          className={`text-xs ${person.isActive ? 'text-green-700 border-green-300' : 'text-red-700 border-red-300'}`}
                        >
                          {person.isActive ? 'Active' : 'Inactive'}
                        </Badge>
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center gap-2 flex-shrink-0">
                    <div className="flex items-center space-x-2">
                      <Switch 
                        checked={person.isActive}
                        onCheckedChange={() => handleToggleUserStatus(person.id)}
                        size="sm"
                      />
                    </div>
                    <Button 
                      variant="outline" 
                      size="sm"
                      onClick={() => handleEditPerson(person)}
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
                          <AlertDialogTitle>Delete User</AlertDialogTitle>
                          <AlertDialogDescription>
                            Are you sure you want to delete {person.name}? This action cannot be undone.
                          </AlertDialogDescription>
                        </AlertDialogHeader>
                        <AlertDialogFooter>
                          <AlertDialogCancel>Cancel</AlertDialogCancel>
                          <AlertDialogAction onClick={() => handleDeletePerson(person.id)}>
                            Delete
                          </AlertDialogAction>
                        </AlertDialogFooter>
                      </AlertDialogContent>
                    </AlertDialog>
                  </div>
                </div>
              </CardContent>
            </Card>
          );
        })}
        {filteredPersons.length === 0 && (
          <Card className="bg-white/80 backdrop-blur-sm border-0 shadow-lg">
            <CardContent className="p-8 text-center">
              <p className="text-muted-foreground">No users found matching your filters.</p>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
}
