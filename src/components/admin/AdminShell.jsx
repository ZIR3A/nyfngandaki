"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { 
  LayoutDashboard, Users, UserCog, LogOut, Menu, X, Search, 
  Bell, MessageSquare, Plus, Sun, Moon, ChevronRight, Home, ChevronDown,
  HeartPulse, Calendar, FileText, Settings, HardDrive
} from "lucide-react";
import { useState, useEffect } from "react";
import { signOut } from "next-auth/react";
import { useTheme } from "next-themes";

export function AdminShell({ children, user }) {
  const pathname = usePathname();
  const router = useRouter();
  const { theme, setTheme } = useTheme();
  const [isSidebarOpen, setSidebarOpen] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    const handleResize = () => {
      if (window.innerWidth >= 1024) {
        setSidebarOpen(true);
      } else {
        setSidebarOpen(false);
      }
    };
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const isSuperAdmin = user?.role === "Super Admin";

  const navGroups = [
    {
      label: "Overview",
      items: [
        { name: "Dashboard", href: `/admin/dashboard`, icon: LayoutDashboard },
      ]
    },
    {
      label: "Organization",
      items: [
        { name: "Members", href: `/admin/members`, icon: Users },
      ]
    },
    {
      label: "Content Management",
      items: [
        { name: "Media Library", href: `/admin/storage`, icon: HardDrive },
        { name: "Activities", href: `/admin/activities`, icon: HeartPulse },
        { name: "Events", href: `/admin/events`, icon: Calendar },
        { name: "Resources", href: `/admin/resources`, icon: FileText },
      ]
    },
    {
      label: "System",
      items: [
        { name: "Users", href: `/admin/users`, icon: UserCog },
        { name: "Homepage Settings", href: `/admin/settings/homepage`, icon: Settings },
        ...(isSuperAdmin ? [{ name: "Storage Settings", href: `/admin/settings/storage`, icon: HardDrive }] : []),
      ]
    }
  ];

  const getPageTitle = () => {
    const pathParts = pathname.split('/').filter(p => p !== 'admin' && p !== '');
    if (pathParts.length === 0) return "Dashboard";
    return pathParts[0].charAt(0).toUpperCase() + pathParts[0].slice(1).replace(/-/g, ' ');
  };

  const handleLogout = async () => {
    await signOut({ redirect: false });
    router.push("/login");
  };

  return (
    <div className="flex h-screen bg-[#F8FAFC] dark:bg-gray-950 overflow-hidden text-[#111827] dark:text-gray-100 transition-colors">
      
      {/* Mobile Sidebar Overlay */}
      {isSidebarOpen && (
        <div 
          className="lg:hidden fixed inset-0 z-40 bg-black/40 dark:bg-black/60 backdrop-blur-sm transition-opacity" 
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Sidebar */}
      <aside 
        className={`${
          isSidebarOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0"
        } fixed lg:relative z-50 h-full w-[280px] bg-white dark:bg-gray-900 border-r border-[#E5E7EB] dark:border-gray-800 flex-shrink-0 transition-transform duration-300 ease-in-out flex flex-col shadow-sm`}
      >
        {/* Logo Area */}
        <div className="h-[80px] flex items-center px-6 border-b border-[#E5E7EB] dark:border-gray-800 shrink-0">
          <div className="flex items-center gap-3">
            <div className="h-8 w-8 bg-[#1546B0] rounded-lg flex items-center justify-center shrink-0 shadow-sm">
              <span className="font-bold text-white text-xs">NYFN</span>
            </div>
            <div className="flex flex-col">
              <span className="font-extrabold text-[#111827] dark:text-white text-sm tracking-tight leading-tight">National Youth Federation</span>
              <span className="font-medium text-[#4B5563] dark:text-gray-400 text-xs">Gandaki Province</span>
            </div>
          </div>
          <button className="lg:hidden ml-auto text-gray-400 hover:text-gray-600 dark:hover:text-white" onClick={() => setSidebarOpen(false)}>
            <X className="h-5 w-5" />
          </button>
        </div>
        
        {/* Menu Items */}
        <nav className="flex-1 overflow-y-auto py-6 px-3 space-y-8 custom-scrollbar">
          {navGroups.map((group, gIdx) => (
            <div key={gIdx}>
              <h4 className="px-3 mb-2 text-xs font-bold uppercase tracking-widest text-[#4B5563]/50 dark:text-gray-500">
                {group.label}
              </h4>
              <div className="space-y-0.5">
                {group.items.map((item) => {
                  const isActive = pathname === item.href || (item.href !== `/admin/dashboard` && pathname.startsWith(item.href));
                  return (
                    <Link
                      key={item.name}
                      href={item.href}
                      className="block relative group"
                      onClick={() => window.innerWidth < 1024 && setSidebarOpen(false)}
                    >
                      <div className={`flex items-center justify-between px-3 py-2 rounded-lg transition-all ${
                        isActive 
                          ? "bg-[#1546B0]/10 dark:bg-[#1546B0]/20 text-[#1546B0] dark:text-blue-400 font-bold" 
                          : "text-[#4B5563] dark:text-gray-400 hover:bg-[#F1F5F9] dark:hover:bg-gray-800 hover:text-[#111827] dark:hover:text-white font-medium"
                      }`}>
                        <div className="flex items-center">
                          <item.icon className={`h-4 w-4 mr-3 shrink-0 ${isActive ? "text-[#1546B0] dark:text-blue-400" : "text-[#4B5563]/60 dark:text-gray-500 group-hover:text-[#111827] dark:group-hover:text-white"}`} />
                          <span className="text-sm">{item.name}</span>
                        </div>
                      </div>
                    </Link>
                  );
                })}
              </div>
            </div>
          ))}
        </nav>
        
        {/* Bottom Profile Area */}
        <div className="p-4 border-t border-[#E5E7EB] dark:border-gray-800 shrink-0 bg-[#F8FAFC]/50 dark:bg-gray-950/50">
          <div className="flex items-center gap-3 px-2 py-2 mb-2 bg-white dark:bg-gray-900 border border-[#E5E7EB] dark:border-gray-800 rounded-xl shadow-sm">
            <div className="h-9 w-9 rounded-lg bg-gradient-to-br from-[#1546B0] to-[#0D2E78] flex items-center justify-center shrink-0">
              <span className="font-bold text-white text-xs uppercase">{user?.name?.substring(0, 2) || "SA"}</span>
            </div>
            <div className="flex flex-col overflow-hidden">
              <span className="font-bold text-sm text-[#111827] dark:text-white truncate">{user?.name || "Admin User"}</span>
              <span className="text-xs text-[#4B5563] dark:text-gray-400 truncate">{user?.email}</span>
            </div>
          </div>
          <button 
            onClick={handleLogout}
            className="flex items-center justify-center w-full px-4 py-2 text-[#4B5563] dark:text-gray-400 hover:text-[#D71920] dark:hover:text-red-400 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-lg transition-colors font-bold text-sm"
          >
            <LogOut className="h-4 w-4 shrink-0 mr-2" />
            Logout
          </button>
        </div>
      </aside>
 
      {/* Main Layout Area */}
      <div className="flex-1 flex flex-col min-w-0 bg-[#F8FAFC] dark:bg-gray-950">
        
        {/* Top Navbar */}
        <header className="h-[80px] bg-white dark:bg-gray-900 border-b border-[#E5E7EB] dark:border-gray-800 flex items-center justify-between px-6 shrink-0 sticky top-0 z-30 shadow-sm transition-colors">
          
          {/* Left: Breadcrumbs & Toggle */}
          <div className="flex items-center gap-4">
            <button 
              className="lg:hidden text-gray-500 dark:text-gray-400 hover:text-[#1546B0] dark:hover:text-blue-400 transition-colors p-2 -ml-2 rounded-lg hover:bg-[#F1F5F9] dark:hover:bg-gray-800"
              onClick={() => setSidebarOpen(true)}
            >
              <Menu className="h-5 w-5" />
            </button>
            <div className="hidden md:flex items-center gap-2 text-sm font-medium text-[#4B5563] dark:text-gray-400">
              <div className="flex items-center gap-2 px-3 py-1.5 bg-[#F1F5F9] dark:bg-gray-800 rounded-md border border-[#E5E7EB] dark:border-gray-700">
                <Home className="h-4 w-4" />
                <span>Admin</span>
              </div>
              <ChevronRight className="h-4 w-4 text-gray-400 dark:text-gray-600" />
              <span className="text-[#111827] dark:text-white font-bold">{getPageTitle()}</span>
            </div>
          </div>
          
          {/* Center: Global Search */}
          <div className="hidden lg:flex flex-1 max-w-md mx-8">
            <div className="relative w-full group">
              <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400 group-focus-within:text-[#1546B0] dark:group-focus-within:text-blue-400 transition-colors" />
              <input 
                type="text" 
                placeholder="Search everywhere..." 
                className="w-full bg-[#F1F5F9] dark:bg-gray-800 border border-transparent text-sm rounded-xl pl-10 pr-4 py-2 outline-none hover:bg-[#E5E7EB]/50 dark:hover:bg-gray-700 focus:bg-white dark:focus:bg-gray-900 focus:border-[#1546B0] dark:focus:border-blue-500 focus:ring-4 focus:ring-[#1546B0]/10 dark:focus:ring-blue-500/20 transition-all font-medium text-[#111827] dark:text-white placeholder:text-[#4B5563] dark:placeholder:text-gray-500"
              />
              <div className="absolute right-3 top-1/2 -translate-y-1/2 flex items-center gap-1">
                <kbd className="hidden xl:inline-flex items-center bg-white dark:bg-gray-700 border border-[#E5E7EB] dark:border-gray-600 px-1.5 py-0.5 rounded text-[10px] font-bold text-gray-400 dark:text-gray-300 shadow-sm">⌘K</kbd>
              </div>
            </div>
          </div>
 
          {/* Right: Actions */}
          <div className="flex items-center gap-3 sm:gap-4">
            <button className="hidden sm:flex items-center bg-[#111827] dark:bg-gray-800 hover:bg-[#1f2937] dark:hover:bg-gray-700 text-white rounded-lg px-4 py-2 text-sm font-bold shadow-sm transition-colors border border-transparent dark:border-gray-700">
              <Plus className="h-4 w-4 mr-1.5" />
              Quick Create
            </button>
            
            <div className="flex items-center gap-1 border-r border-[#E5E7EB] dark:border-gray-800 pr-3 sm:pr-4">
              <button className="p-2 text-gray-400 hover:text-[#111827] dark:hover:text-white hover:bg-[#F1F5F9] dark:hover:bg-gray-800 rounded-lg transition-colors relative">
                <MessageSquare className="h-5 w-5" />
              </button>
              <button className="p-2 text-gray-400 hover:text-[#111827] dark:hover:text-white hover:bg-[#F1F5F9] dark:hover:bg-gray-800 rounded-lg transition-colors relative">
                <Bell className="h-5 w-5" />
                <span className="absolute top-1.5 right-1.5 h-2 w-2 rounded-full bg-[#D71920] border-2 border-white dark:border-gray-900"></span>
              </button>
              
              {/* Dark Mode Switch */}
              <button 
                onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
                className="p-2 text-gray-400 hover:text-[#111827] dark:hover:text-white hover:bg-[#F1F5F9] dark:hover:bg-gray-800 rounded-lg transition-colors"
              >
                {mounted && theme === 'dark' ? (
                  <Moon className="h-5 w-5" />
                ) : (
                  <Sun className="h-5 w-5" />
                )}
              </button>
            </div>
            
            <button className="flex items-center gap-2 hover:bg-[#F1F5F9] dark:hover:bg-gray-800 p-1.5 rounded-xl transition-colors">
              <div className="h-8 w-8 rounded-lg bg-gradient-to-br from-[#1546B0] to-[#0D2E78] text-white flex items-center justify-center font-bold text-xs shadow-sm uppercase">
                {user?.name?.substring(0, 2) || "SA"}
              </div>
              <ChevronDown className="h-4 w-4 text-gray-400 hidden sm:block" />
            </button>
          </div>
 
        </header>
 
        {/* Scrollable Main Content */}
        <main className="flex-1 overflow-y-auto p-4 sm:p-6 lg:p-8">
          <div className="max-w-[1440px] mx-auto">
            {children}
          </div>
        </main>
 
      </div>
    </div>
  );
}
