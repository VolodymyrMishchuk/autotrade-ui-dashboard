
import { SidebarProvider } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/AppSidebar";
import { SidebarTrigger } from "@/components/ui/sidebar";
import { Dashboard } from "@/components/Dashboard";
import { useState } from "react";
import { AuthSection } from "@/components/AuthSection";

const Index = () => {
  const [activeSection, setActiveSection] = useState("dashboard");
  const [isAuthenticated, setIsAuthenticated] = useState(true); // Changed to true to hide auth

  // Commented out auth section to hide it
  // if (!isAuthenticated) {
  //   return <AuthSection onLogin={() => setIsAuthenticated(true)} />;
  // }

  return (
    <SidebarProvider>
      <div className="min-h-screen flex w-full bg-gradient-to-br from-slate-50 to-blue-50">
        <AppSidebar 
          activeSection={activeSection} 
          onSectionChange={setActiveSection} 
        />
        <main className="flex-1 flex flex-col min-w-0">
          <header className="border-b bg-white/80 backdrop-blur-sm p-3 sm:p-4 lg:p-6 flex items-center gap-3">
            <SidebarTrigger />
            <h1 className="text-lg sm:text-xl lg:text-2xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent truncate">
              AutoTrading Dashboard
            </h1>
          </header>
          <div className="flex-1 p-3 sm:p-4 lg:p-6 overflow-auto">
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
