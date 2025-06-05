
import { SidebarProvider } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/AppSidebar";
import { SidebarTrigger } from "@/components/ui/sidebar";
import { Dashboard } from "@/components/Dashboard";
import { useState } from "react";

const Index = () => {
  const [activeSection, setActiveSection] = useState("dashboard");

  return (
    <SidebarProvider>
      <div className="min-h-screen flex w-full bg-gradient-to-br from-slate-50 to-blue-50">
        <AppSidebar 
          activeSection={activeSection} 
          onSectionChange={setActiveSection} 
        />
        <main className="flex-1 flex flex-col min-w-0">
          <header className="border-b bg-white/80 backdrop-blur-sm p-3 lg:p-4 flex items-center gap-2 lg:gap-4">
            <SidebarTrigger />
            <h1 className="text-lg lg:text-2xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent truncate">
              AutoTrading Dashboard
            </h1>
          </header>
          <div className="flex-1 p-3 lg:p-6 overflow-auto">
            <Dashboard 
              activeSection={activeSection} 
              onSectionChange={setActiveSection}
            />
          </div>
        </main>
      </div>
    </SidebarProvider>
  );
};

export default Index;
