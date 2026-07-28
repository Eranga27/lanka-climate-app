"use client";

import React, { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  Search, Bell, User, Moon, Globe, Menu, X,
  Home, Map as MapIcon, Cloud, Activity, AlertTriangle,
  TreePine, Sprout, Anchor, Camera, History, Newspaper, Bot, Info,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { motion, AnimatePresence } from "framer-motion";

export const NAV_ITEMS = [
  { name: "Home",         path: "/",            icon: Home          },
  { name: "Live Map",     path: "/map",          icon: MapIcon       },
  { name: "Weather",      path: "/weather",      icon: Cloud         },
  { name: "Intelligence", path: "/intelligence", icon: Activity      },
  { name: "Disaster",     path: "/disaster",     icon: AlertTriangle },
  { name: "Environment",  path: "/environment",  icon: TreePine      },
  { name: "Agriculture",  path: "/agriculture",  icon: Sprout        },
  { name: "Marine",       path: "/marine",       icon: Anchor        },
  { name: "Tourism",      path: "/tourism",      icon: Camera        },
  { name: "History",      path: "/history",      icon: History       },
  { name: "News",         path: "/news",         icon: Newspaper     },
  { name: "AI Assistant", path: "/assistant",    icon: Bot           },
  { name: "About",        path: "/about",        icon: Info          },
];

const BOTTOM_NAV = NAV_ITEMS.slice(0, 4);

export function Navbar() {
  const pathname = usePathname();
  const [drawerOpen, setDrawerOpen] = useState(false);

  return (
    <>
      {/* ── Desktop Nav ─────────────────────────────────────────────── */}
      <nav
        className="sticky top-0 z-50 w-full border-b border-white/8 glass"
        aria-label="Main navigation"
      >
        <div className="flex h-16 items-center px-4 md:px-8 max-w-[1600px] mx-auto w-full">

          {/* Logo */}
          <Link href="/" className="flex items-center gap-2.5 mr-8 group shrink-0" aria-label="Lanka Climate Hub home">
            <div className="h-8 w-8 rounded-full bg-gradient-to-br from-primary to-secondary flex items-center justify-center shadow-lg group-hover:shadow-primary/30 transition-shadow duration-300">
              <Globe className="h-4 w-4 text-white" />
            </div>
            <span className="hidden md:inline-block font-bold text-white tracking-tight text-sm whitespace-nowrap">
              Lanka Climate Hub
            </span>
          </Link>

          {/* Desktop Links */}
          <div
            className="hidden lg:flex items-center gap-0.5 flex-1 overflow-x-auto no-scrollbar mask-edges"
            role="list"
          >
            {NAV_ITEMS.map((item) => {
              const active = pathname === item.path;
              return (
                <Link
                  key={item.path}
                  href={item.path}
                  role="listitem"
                  aria-current={active ? "page" : undefined}
                  className={cn(
                    "px-3 py-2 rounded-lg text-sm font-medium transition-all duration-200 whitespace-nowrap flex items-center gap-1.5",
                    active
                      ? "bg-primary/15 text-primary"
                      : "text-muted-foreground hover:bg-white/5 hover:text-white"
                  )}
                >
                  <item.icon className={cn("h-3.5 w-3.5 shrink-0", active ? "text-primary" : "")} />
                  {item.name}
                </Link>
              );
            })}
          </div>

          {/* Right Actions */}
          <div className="flex items-center gap-1 ml-auto lg:ml-4">
            {/* Mobile hamburger */}
            <button
              className="p-2 rounded-full text-muted-foreground hover:bg-white/10 hover:text-white transition-colors lg:hidden"
              onClick={() => setDrawerOpen(true)}
              aria-label="Open navigation menu"
            >
              <Menu className="h-5 w-5" />
            </button>

            {/* Desktop actions */}
            <div className="hidden md:flex items-center gap-1">
              <NavIconBtn aria-label="Search"><Search className="h-4.5 w-4.5" /></NavIconBtn>
              <NavIconBtn aria-label="Notifications"><Bell className="h-4.5 w-4.5" /></NavIconBtn>
              <NavIconBtn aria-label="Toggle dark mode"><Moon className="h-4.5 w-4.5" /></NavIconBtn>
              <NavIconBtn aria-label="Account" className="ml-1 border border-white/10">
                <User className="h-4.5 w-4.5" />
              </NavIconBtn>
            </div>
          </div>
        </div>
      </nav>

      {/* ── Mobile Drawer ────────────────────────────────────────────── */}
      <AnimatePresence>
        {drawerOpen && (
          <div className="fixed inset-0 z-[100] lg:hidden" role="dialog" aria-modal="true" aria-label="Navigation drawer">
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
              className="absolute inset-0 bg-black/60 backdrop-blur-sm"
              onClick={() => setDrawerOpen(false)}
            />
            {/* Panel */}
            <motion.div
              initial={{ x: "-100%" }} animate={{ x: 0 }} exit={{ x: "-100%" }}
              transition={{ type: "spring", damping: 30, stiffness: 300 }}
              className="relative w-4/5 max-w-[320px] bg-[#0F172A] border-r border-white/10 h-full flex flex-col p-6"
            >
              <div className="flex items-center justify-between mb-8">
                <div className="flex items-center gap-2.5">
                  <Globe className="h-6 w-6 text-primary" />
                  <span className="font-bold text-white text-sm">Lanka Climate Hub</span>
                </div>
                <button
                  onClick={() => setDrawerOpen(false)}
                  className="p-2 rounded-full hover:bg-white/10 text-muted-foreground hover:text-white transition-colors"
                  aria-label="Close menu"
                >
                  <X className="h-5 w-5" />
                </button>
              </div>

              <nav className="flex-1 overflow-y-auto space-y-1" aria-label="Mobile navigation">
                {NAV_ITEMS.map((item) => {
                  const active = pathname === item.path;
                  return (
                    <Link
                      key={item.path}
                      href={item.path}
                      onClick={() => setDrawerOpen(false)}
                      aria-current={active ? "page" : undefined}
                      className={cn(
                        "flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-all",
                        active
                          ? "bg-primary text-white shadow-lg shadow-primary/20"
                          : "text-muted-foreground hover:bg-white/5 hover:text-white"
                      )}
                    >
                      <item.icon className="h-5 w-5 shrink-0" />
                      {item.name}
                    </Link>
                  );
                })}
              </nav>

              <div className="mt-6 pt-6 border-t border-white/10">
                <p className="text-xs text-muted-foreground">
                  National Environmental Platform v1.0
                </p>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* ── Mobile Bottom Navigation ─────────────────────────────────── */}
      <div className="lg:hidden fixed bottom-4 left-4 right-4 z-50" role="navigation" aria-label="Quick navigation">
        <div className="glass rounded-2xl flex items-center justify-around p-2 shadow-2xl">
          {BOTTOM_NAV.map((item) => {
            const active = pathname === item.path;
            return (
              <Link
                key={item.path}
                href={item.path}
                aria-current={active ? "page" : undefined}
                className={cn(
                  "flex flex-col items-center gap-1 p-2 rounded-xl transition-all min-w-[60px]",
                  active ? "text-primary" : "text-muted-foreground"
                )}
              >
                <div className={cn("p-1.5 rounded-full transition-all", active && "bg-primary/20")}>
                  <item.icon className="h-5 w-5" />
                </div>
                <span className="text-[10px] font-medium">{item.name}</span>
              </Link>
            );
          })}
          <button
            onClick={() => setDrawerOpen(true)}
            aria-label="More navigation options"
            className="flex flex-col items-center gap-1 p-2 rounded-xl text-muted-foreground transition-all min-w-[60px]"
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

function NavIconBtn({ children, className = "", ...props }: React.ButtonHTMLAttributes<HTMLButtonElement>) {
  return (
    <button
      {...props}
      className={cn(
        "p-2 rounded-full text-muted-foreground hover:bg-white/10 hover:text-white transition-colors",
        className
      )}
    >
      {children}
    </button>
  );
}
