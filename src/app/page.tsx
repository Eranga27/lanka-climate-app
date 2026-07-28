"use client";

import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import {
  CloudRain,
  Wind,
  ThermometerSun,
  Activity,
  AlertTriangle,
  Map as MapIcon,
  Globe,
  Settings,
  Bell,
  Search,
  Droplets,
  Zap,
} from "lucide-react";
import {
  LineChart,
  Line,
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip as RechartsTooltip,
  ResponsiveContainer,
} from "recharts";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

const climateData = [
  { time: "00:00", temp: 24, humidity: 82, rain: 0 },
  { time: "04:00", temp: 23, humidity: 85, rain: 0 },
  { time: "08:00", temp: 26, humidity: 78, rain: 10 },
  { time: "12:00", temp: 31, humidity: 65, rain: 20 },
  { time: "16:00", temp: 33, humidity: 60, rain: 5 },
  { time: "20:00", temp: 28, humidity: 75, rain: 0 },
];

const regions = [
  { name: "Colombo", temp: 31, status: "safe", aqi: 45, alert: "Normal" },
  { name: "Galle", temp: 29, status: "warning", aqi: 60, alert: "High Tide Warning" },
  { name: "Nuwara Eliya", temp: 18, status: "safe", aqi: 20, alert: "Clear" },
  { name: "Trincomalee", temp: 34, status: "elevated", aqi: 85, alert: "Heat Advisory" },
  { name: "Ratnapura", temp: 30, status: "danger", aqi: 55, alert: "Flash Flood Risk" },
];

const getStatusColor = (status: string) => {
  switch (status) {
    case "safe": return "bg-safe/20 text-safe border-safe/50";
    case "warning": return "bg-warning/20 text-warning border-warning/50";
    case "elevated": return "bg-elevated/20 text-elevated border-elevated/50";
    case "danger": return "bg-danger/20 text-danger border-danger/50";
    case "extreme": return "bg-extreme/20 text-extreme border-extreme/50";
    default: return "bg-primary/20 text-primary border-primary/50";
  }
};

const getStatusDot = (status: string) => {
  switch (status) {
    case "safe": return "bg-safe";
    case "warning": return "bg-warning";
    case "elevated": return "bg-elevated";
    case "danger": return "bg-danger";
    case "extreme": return "bg-extreme";
    default: return "bg-primary";
  }
};

export default function LankaClimateHub() {
  const [mounted, setMounted] = useState(false);
  const [activeTab, setActiveTab] = useState("overview");

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  return (
    <div className="min-h-screen flex flex-col p-4 md:p-6 lg:p-8 space-y-6">
      {/* Header */}
      <motion.header
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="glass rounded-2xl p-4 flex flex-col sm:flex-row items-center justify-between gap-4 z-10"
      >
        <div className="flex items-center gap-3">
          <div className="h-10 w-10 rounded-full bg-gradient-to-br from-primary to-secondary flex items-center justify-center shadow-lg">
            <Globe className="text-white h-6 w-6" />
          </div>
          <div>
            <h1 className="text-xl font-bold tracking-tight text-white">Lanka Climate Hub</h1>
            <p className="text-xs text-muted-foreground uppercase tracking-wider font-medium">National Intelligence Platform</p>
          </div>
        </div>

        <div className="flex-1 max-w-md mx-auto sm:mx-8 relative w-full">
          <div className="relative group">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <Search className="h-4 w-4 text-muted-foreground group-focus-within:text-primary transition-colors" />
            </div>
            <input
              type="text"
              placeholder="Search regions, parameters, stations..."
              className="w-full bg-black/20 border border-white/10 rounded-full py-2 pl-10 pr-4 text-sm text-white placeholder-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all backdrop-blur-md"
            />
          </div>
        </div>

        <div className="flex items-center gap-3">
          <div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-black/20 border border-white/5 mr-2">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-safe opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-safe"></span>
            </span>
            <span className="text-xs font-medium text-white/90">System Online</span>
          </div>
          <Button variant="ghost" size="icon" className="rounded-full hover:bg-white/10 text-white">
            <Bell className="h-5 w-5" />
          </Button>
          <Button variant="ghost" size="icon" className="rounded-full hover:bg-white/10 text-white">
            <Settings className="h-5 w-5" />
          </Button>
        </div>
      </motion.header>

      {/* Main Grid Layout */}
      <div className="flex-1 grid grid-cols-1 lg:grid-cols-12 gap-6 z-10">
        
        {/* Left Sidebar - Navigation & Quick Stats */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.1 }}
          className="lg:col-span-3 space-y-6 flex flex-col"
        >
          <Card className="glass-card border-none flex-1">
            <CardHeader className="pb-4">
              <CardTitle className="text-lg text-white">Active Monitors</CardTitle>
              <CardDescription>Real-time sensor network status</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              {regions.map((region, i) => (
                <motion.div
                  key={region.name}
                  whileHover={{ scale: 1.02, x: 5 }}
                  className="flex items-center justify-between p-3 rounded-xl bg-black/20 border border-white/5 cursor-pointer transition-all hover:bg-white/5"
                >
                  <div className="flex flex-col">
                    <span className="font-medium text-white/90">{region.name}</span>
                    <span className="text-xs text-muted-foreground flex items-center gap-1 mt-1">
                      <div className={`w-1.5 h-1.5 rounded-full ${getStatusDot(region.status)}`} />
                      {region.alert}
                    </span>
                  </div>
                  <div className="flex flex-col items-end">
                    <span className="font-bold text-white">{region.temp}°C</span>
                    <span className={`text-[10px] px-2 py-0.5 rounded-full mt-1 border uppercase tracking-wider font-semibold ${getStatusColor(region.status)}`}>
                      AQI {region.aqi}
                    </span>
                  </div>
                </motion.div>
              ))}
            </CardContent>
          </Card>
        </motion.div>

        {/* Center - Map / Main Vis */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.2 }}
          className="lg:col-span-6 flex flex-col h-full min-h-[500px]"
        >
          <div className="glass rounded-2xl flex-1 relative overflow-hidden flex flex-col p-1 border-white/10 border">
            {/* Nav Tabs overlaying Map */}
            <div className="absolute top-4 left-4 z-20 flex gap-2 p-1 bg-black/40 backdrop-blur-md rounded-lg border border-white/10">
              {['Overview', 'Radar', 'Wind', 'Satellite'].map((tab) => (
                <button
                  key={tab}
                  onClick={() => setActiveTab(tab.toLowerCase())}
                  className={`px-4 py-1.5 rounded-md text-sm font-medium transition-all ${
                    activeTab === tab.toLowerCase()
                      ? 'bg-primary text-white shadow-md'
                      : 'text-white/60 hover:text-white hover:bg-white/10'
                  }`}
                >
                  {tab}
                </button>
              ))}
            </div>

            {/* Faux Interactive Map Background */}
            <div className="absolute inset-0 bg-[#0F172A] flex items-center justify-center overflow-hidden rounded-xl">
              <div className="absolute inset-0 opacity-30 bg-[url('https://www.transparenttextures.com/patterns/stardust.png')] mix-blend-screen" />
              
              {/* Dynamic Island Outline (Faux Sri Lanka) */}
              <motion.div 
                className="relative w-full h-full flex items-center justify-center opacity-80"
                initial={{ scale: 0.9, opacity: 0 }}
                animate={{ scale: 1, opacity: 0.8 }}
                transition={{ duration: 1.5, ease: "easeOut" }}
              >
                 <svg width="400" height="600" viewBox="0 0 200 300" className="drop-shadow-[0_0_15px_rgba(37,99,235,0.3)]">
                  <path 
                    d="M 100 20 C 130 50, 160 100, 140 180 C 120 260, 90 280, 80 280 C 60 280, 50 250, 40 200 C 30 150, 50 80, 100 20 Z" 
                    fill="#1E293B" 
                    stroke="#38BDF8" 
                    strokeWidth="1.5"
                    strokeDasharray="4 4"
                    className="animate-[dash_10s_linear_infinite]"
                  />
                  {/* Heatmap overlay spots */}
                  <circle cx="100" cy="80" r="15" fill="#EF4444" opacity="0.3" filter="blur(8px)" />
                  <circle cx="80" cy="180" r="25" fill="#F97316" opacity="0.3" filter="blur(12px)" />
                  <circle cx="120" cy="220" r="20" fill="#10B981" opacity="0.3" filter="blur(10px)" />
                  
                  {/* Node points */}
                  <circle cx="100" cy="80" r="3" fill="#FFFFFF" />
                  <circle cx="80" cy="180" r="3" fill="#FFFFFF" />
                  <circle cx="120" cy="220" r="3" fill="#FFFFFF" />
                  <circle cx="60" cy="140" r="3" fill="#FFFFFF" />
                </svg>
              </motion.div>

              {/* Data Overlay Cards on Map */}
              <motion.div 
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.5 }}
                className="absolute bottom-4 right-4 glass-card p-4 rounded-xl max-w-[200px]"
              >
                <div className="flex items-center gap-2 mb-2">
                  <Zap className="h-4 w-4 text-warning" />
                  <span className="text-sm font-semibold text-white">Live Alert</span>
                </div>
                <p className="text-xs text-white/80 leading-relaxed">
                  High precipitation detected in Southwestern quadrant. Flash flood risks elevated.
                </p>
              </motion.div>
            </div>
          </div>
        </motion.div>

        {/* Right Sidebar - Analytics */}
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.3 }}
          className="lg:col-span-3 space-y-6"
        >
          <div className="grid grid-cols-2 gap-4">
            <Card className="glass-card border-none bg-primary/10">
              <CardContent className="p-4 flex flex-col items-center justify-center text-center">
                <ThermometerSun className="h-6 w-6 text-warning mb-2" />
                <span className="text-2xl font-bold text-white">31°</span>
                <span className="text-xs text-white/60">Avg Temp</span>
              </CardContent>
            </Card>
            <Card className="glass-card border-none bg-secondary/10">
              <CardContent className="p-4 flex flex-col items-center justify-center text-center">
                <Droplets className="h-6 w-6 text-secondary mb-2" />
                <span className="text-2xl font-bold text-white">78%</span>
                <span className="text-xs text-white/60">Humidity</span>
              </CardContent>
            </Card>
            <Card className="glass-card border-none col-span-2 relative overflow-hidden group">
              <div className="absolute inset-0 bg-gradient-to-r from-danger/20 to-danger/5 opacity-50 group-hover:opacity-100 transition-opacity" />
              <CardContent className="p-5 flex items-center justify-between relative z-10">
                <div>
                  <div className="flex items-center gap-2 mb-1">
                    <AlertTriangle className="h-4 w-4 text-danger" />
                    <span className="font-semibold text-danger">Severe Weather</span>
                  </div>
                  <span className="text-sm text-white/80">Monsoon Depression Active</span>
                </div>
                <Button size="sm" variant="destructive" className="rounded-full px-4 text-xs font-semibold">
                  Details
                </Button>
              </CardContent>
            </Card>
          </div>

          <Card className="glass-card border-none">
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground uppercase tracking-wider flex items-center gap-2">
                <Activity className="h-4 w-4" /> Predictive Index
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div>
                  <div className="flex justify-between text-xs mb-1">
                    <span className="text-white">Flood Risk</span>
                    <span className="text-danger font-medium">85%</span>
                  </div>
                  <div className="h-1.5 w-full bg-black/40 rounded-full overflow-hidden">
                    <motion.div 
                      initial={{ width: 0 }}
                      animate={{ width: "85%" }}
                      transition={{ duration: 1, delay: 0.5 }}
                      className="h-full bg-danger rounded-full" 
                    />
                  </div>
                </div>
                <div>
                  <div className="flex justify-between text-xs mb-1">
                    <span className="text-white">Landslide Probability</span>
                    <span className="text-warning font-medium">60%</span>
                  </div>
                  <div className="h-1.5 w-full bg-black/40 rounded-full overflow-hidden">
                    <motion.div 
                      initial={{ width: 0 }}
                      animate={{ width: "60%" }}
                      transition={{ duration: 1, delay: 0.6 }}
                      className="h-full bg-warning rounded-full" 
                    />
                  </div>
                </div>
                <div>
                  <div className="flex justify-between text-xs mb-1">
                    <span className="text-white">Air Quality Stress</span>
                    <span className="text-safe font-medium">20%</span>
                  </div>
                  <div className="h-1.5 w-full bg-black/40 rounded-full overflow-hidden">
                    <motion.div 
                      initial={{ width: 0 }}
                      animate={{ width: "20%" }}
                      transition={{ duration: 1, delay: 0.7 }}
                      className="h-full bg-safe rounded-full" 
                    />
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </div>

      {/* Bottom - Charts */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4 }}
        className="glass rounded-2xl p-6 z-10 border border-white/5"
      >
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-lg font-semibold text-white">24-Hour Metereological Trends</h3>
          <div className="flex gap-2">
             <Button variant="outline" size="sm" className="bg-black/20 border-white/10 text-white hover:bg-white/10">Temperature</Button>
             <Button variant="outline" size="sm" className="bg-black/20 border-white/10 text-white/50 hover:bg-white/10 hover:text-white">Precipitation</Button>
          </div>
        </div>
        <div className="h-[200px] w-full">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={climateData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
              <defs>
                <linearGradient id="colorTemp" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#38BDF8" stopOpacity={0.3}/>
                  <stop offset="95%" stopColor="#38BDF8" stopOpacity={0}/>
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="#334155" vertical={false} />
              <XAxis dataKey="time" stroke="#94A3B8" fontSize={12} tickLine={false} axisLine={false} />
              <YAxis stroke="#94A3B8" fontSize={12} tickLine={false} axisLine={false} />
              <RechartsTooltip 
                contentStyle={{ backgroundColor: '#1E293B', borderColor: '#334155', borderRadius: '8px', color: '#fff' }}
                itemStyle={{ color: '#38BDF8' }}
              />
              <Area type="monotone" dataKey="temp" stroke="#38BDF8" strokeWidth={3} fillOpacity={1} fill="url(#colorTemp)" />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </motion.div>
    </div>
  );
}
