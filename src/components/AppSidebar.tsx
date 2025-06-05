
import { 
  Users, 
  CreditCard, 
  Radio, 
  ArrowLeftRight, 
  Home,
  BarChart3
} from "lucide-react";
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarHeader,
  SidebarFooter,
} from "@/components/ui/sidebar";
import { useState } from "react";

const menuItems = [
  {
    title: "Dashboard",
    icon: Home,
    id: "dashboard",
  },
  {
    title: "Users",
    icon: Users,
    id: "persons",
  },
  {
    title: "Accounts",
    icon: CreditCard,
    id: "accounts",
  },
  {
    title: "Signal Sources",
    icon: Radio,
    id: "sources",
  },
  {
    title: "Transactions",
    icon: ArrowLeftRight,
    id: "transactions",
  },
];

export function AppSidebar() {
  const [activeItem, setActiveItem] = useState("dashboard");

  return (
    <Sidebar className="border-r bg-white/80 backdrop-blur-sm">
      <SidebarHeader className="p-6">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 bg-gradient-to-br from-blue-500 to-purple-600 rounded-lg flex items-center justify-center">
            <BarChart3 className="w-5 h-5 text-white" />
          </div>
          <span className="font-bold text-lg">AutoTrade</span>
        </div>
      </SidebarHeader>
      
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel>Navigation</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {menuItems.map((item) => (
                <SidebarMenuItem key={item.id}>
                  <SidebarMenuButton 
                    isActive={activeItem === item.id}
                    onClick={() => setActiveItem(item.id)}
                    className="w-full"
                  >
                    <item.icon className="w-4 h-4" />
                    <span>{item.title}</span>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
      
      <SidebarFooter className="p-6">
        <div className="text-xs text-muted-foreground">
          AutoTrading v1.0.1
        </div>
      </SidebarFooter>
    </Sidebar>
  );
}
