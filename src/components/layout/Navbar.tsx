"use client";

import React, { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Search, Bell, User, Moon, Globe, Menu, X, Home, Map as MapIcon, Cloud, Activity, AlertTriangle, TreePine, Sprout, Anchor, Camera, History, Newspaper, Bot, Info } from "lucide-react";
import { cn } from "@/lib/utils";

const NAV_ITEMS = [
  { name: "Home", path: "/", icon: Home },
  { name: "Live Map", path: "/map", icon: MapIcon },
  { name: "Weather", path: "/weather", icon: Cloud },
  { name: "Intelligence", path: "/intelligence", icon: Activity },
  { name: "Disaster", path: "/disaster", icon: AlertTriangle },
  { name: "Environment", path: "/environment", icon: TreePine },
  { name: "Agriculture", path: "/agriculture", icon: Sprout },
  { name: "Marine", path: "/marine", icon: Anchor },
  { name: "Tourism", path: "/tourism", icon: Camera },
  { name: "History", path: "/history", icon: History },
  { name: "News", path: "/news", icon: Newspaper },
  { name: "AI Assistant", path: "/assistant", icon: Bot },
  { name: "About", path: "/about", icon: Info },
];

export function Navbar() {
  const pathname = usePathname();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <>
      {/* Desktop Navigation */}
      <nav className="sticky top-0 z-50 w-full border-b border-white/10 glass">
        <div className="flex h-16 items-center px-4 md:px-8">
          {/* Logo (Left) */}
          <Link href="/" className="flex items-center gap-2 mr-8 group">
            <div className="h-8 w-8 rounded-full bg-gradient-to-br from-primary to-secondary flex items-center justify-center shadow-lg group-hover:shadow-primary/20 transition-all">
              <Globe className="h-5 w-5 text-white" />
            </div>
            <span className="hidden md:inline-block font-bold text-white tracking-tight">
              Lanka Climate Hub
            </span>
          </Link>

          {/* Nav Links (Center) */}
          <div className="hidden lg:flex items-center space-x-1 flex-1 overflow-x-auto no-scrollbar mask-edges">
            {NAV_ITEMS.map((item) => {
              const isActive = pathname === item.path;
              return (
                <Link
                  key={item.path}
                  href={item.path}
                  className={cn(
                    "px-3 py-2 rounded-md text-sm font-medium transition-colors whitespace-nowrap",
                    isActive
                      ? "bg-primary/20 text-primary"
                      : "text-muted-foreground hover:bg-white/5 hover:text-white"
                  )}
                >
                  {item.name}
                </Link>
              );
            })}
          </div>

          {/* Right Actions */}
          <div className="flex items-center gap-2 ml-auto lg:ml-4">
            <button className="p-2 rounded-full text-muted-foreground hover:bg-white/10 hover:text-white transition-colors lg:hidden" onClick={() => setMobileMenuOpen(true)}>
              <Menu className="h-5 w-5" />
            </button>
            <div className="hidden md:flex items-center gap-2">
              <button className="p-2 rounded-full text-muted-foreground hover:bg-white/10 hover:text-white transition-colors">
                <Search className="h-5 w-5" />
              </button>
              <button className="p-2 rounded-full text-muted-foreground hover:bg-white/10 hover:text-white transition-colors">
                <Bell className="h-5 w-5" />
              </button>
              <button className="p-2 rounded-full text-muted-foreground hover:bg-white/10 hover:text-white transition-colors">
                <Moon className="h-5 w-5" />
              </button>
              <button className="p-2 rounded-full text-muted-foreground hover:bg-white/10 hover:text-white transition-colors ml-2 border border-white/10">
                <User className="h-5 w-5" />
              </button>
            </div>
          </div>
        </div>
      </nav>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="fixed inset-0 z-[100] lg:hidden flex">
          <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" onClick={() => setMobileMenuOpen(false)} />
          <div className="relative w-4/5 max-w-sm bg-[#0F172A] border-r border-white/10 h-full flex flex-col p-6 animate-in slide-in-from-left-full">
            <div className="flex items-center justify-between mb-8">
              <div className="flex items-center gap-2">
                <Globe className="h-6 w-6 text-primary" />
                <span className="font-bold text-white">Menu</span>
              </div>
              <button onClick={() => setMobileMenuOpen(false)} className="p-2 rounded-full hover:bg-white/10 text-white">
                <X className="h-5 w-5" />
              </button>
            </div>
            <div className="flex-1 overflow-y-auto space-y-2">
              {NAV_ITEMS.map((item) => {
                const isActive = pathname === item.path;
                return (
                  <Link
                    key={item.path}
                    href={item.path}
                    onClick={() => setMobileMenuOpen(false)}
                    className={cn(
                      "flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-colors",
                      isActive
                        ? "bg-primary text-white shadow-lg shadow-primary/20"
                        : "text-muted-foreground hover:bg-white/5 hover:text-white"
                    )}
                  >
                    <item.icon className={cn("h-5 w-5", isActive ? "text-white" : "text-muted-foreground")} />
                    {item.name}
                  </Link>
                );
              })}
            </div>
          </div>
        </div>
      )}

      {/* Modern Bottom Navigation (Mobile Only) */}
      <div className="lg:hidden fixed bottom-4 left-4 right-4 z-50">
        <div className="glass-card rounded-2xl flex items-center justify-around p-2 shadow-2xl border-white/10 border">
           {NAV_ITEMS.slice(0, 4).map((item) => {
              const isActive = pathname === item.path;
              return (
                <Link
                  key={item.path}
                  href={item.path}
                  className={cn(
                    "flex flex-col items-center gap-1 p-2 rounded-xl transition-all",
                    isActive ? "text-primary" : "text-muted-foreground"
                  )}
                >
                  <div className={cn("p-1.5 rounded-full transition-all", isActive && "bg-primary/20")}>
                    <item.icon className="h-5 w-5" />
                  </div>
                  <span className="text-[10px] font-medium">{item.name}</span>
                </Link>
              );
           })}
           <button 
             onClick={() => setMobileMenuOpen(true)}
             className="flex flex-col items-center gap-1 p-2 rounded-xl transition-all text-muted-foreground"
           >
              <div className="p-1.5 rounded-full">
                <Menu className="h-5 w-5" />
              </div>
              <span className="text-[10px] font-medium">More</span>
           </button>
        </div>
      </div>
    </>
  );
}
