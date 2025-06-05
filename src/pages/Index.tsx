
import { SidebarProvider } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/AppSidebar";
import { SidebarTrigger } from "@/components/ui/sidebar";
import { Dashboard } from "@/components/Dashboard";

const Index = () => {
  return (
    <SidebarProvider>
      <div className="min-h-screen flex w-full bg-gradient-to-br from-slate-50 to-blue-50">
        <AppSidebar />
        <main className="flex-1 flex flex-col">
          <header className="border-b bg-white/80 backdrop-blur-sm p-4 flex items-center gap-4">
            <SidebarTrigger />
            <h1 className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              AutoTrading Dashboard
            </h1>
          </header>
          <div className="flex-1 p-6">
            <Dashboard />
          </div>
        </main>
      </div>
    </SidebarProvider>
  );
};

export default Index;
