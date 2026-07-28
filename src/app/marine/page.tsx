"use client";

import React, { useState, useEffect } from "react";
import { PageHeader } from "@/components/layout/PageHeader";
import { 
  Anchor, Waves, Wind, ThermometerSun, AlertTriangle, 
  Map as MapIcon, Compass, Navigation, Fish, ShieldAlert,
  Ship
} from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import ReactECharts from "echarts-for-react";
import { motion } from "framer-motion";

export default function MarinePage() {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const waveHeightOptions = {
    tooltip: { trigger: 'axis', backgroundColor: '#1E293B', textStyle: { color: '#fff' } },
    grid: { left: '3%', right: '4%', bottom: '5%', top: '10%', containLabel: true },
    xAxis: { type: 'category', boundaryGap: false, data: ['00:00', '04:00', '08:00', '12:00', '16:00', '20:00', '24:00'], axisLine: { lineStyle: { color: '#334155' } }, axisLabel: { color: '#94A3B8' } },
    yAxis: { type: 'value', axisLine: { show: false }, splitLine: { lineStyle: { color: '#334155', type: 'dashed' } }, axisLabel: { formatter: '{value}m', color: '#94A3B8' } },
    visualMap: { show: false, dimension: 1, pieces: [{ gt: 2.5, color: '#EF4444' }, { gt: 1.5, lte: 2.5, color: '#F97316' }, { lte: 1.5, color: '#38BDF8' }] },
    series: [
      {
        name: 'Wave Height', type: 'line', smooth: true, markLine: { data: [{ yAxis: 2.5, name: 'Rough Seas' }], lineStyle: { color: '#EF4444' } },
        data: [1.2, 1.4, 1.8, 2.6, 2.2, 1.6, 1.3], areaStyle: { opacity: 0.2 }
      }
    ]
  };

  const currentOptions = {
    tooltip: { formatter: '{a} <br/>{b} : {c} knots' },
    series: [
      {
        name: 'Ocean Current',
        type: 'gauge',
        min: 0, max: 5,
        splitNumber: 5,
        axisLine: { lineStyle: { width: 10, color: [[0.3, '#38BDF8'], [0.7, '#10B981'], [1, '#EF4444']] } },
        pointer: { itemStyle: { color: 'auto' } },
        axisTick: { distance: -10, length: 8, lineStyle: { color: '#fff', width: 2 } },
        splitLine: { distance: -10, length: 15, lineStyle: { color: '#fff', width: 3 } },
        axisLabel: { color: '#94A3B8', distance: 20, fontSize: 10 },
        detail: { valueAnimation: true, formatter: '{value} kt', color: '#fff', fontSize: 20 },
        data: [{ value: 1.8, name: 'Speed' }]
      }
    ]
  };

  if (!mounted) return null;

  return (
    <div className="flex-1 flex flex-col p-4 md:p-6 lg:p-8 space-y-6">
      
      {/* Cyclone Warning Banner */}
      <motion.div 
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        className="w-full bg-danger/10 border border-danger/50 rounded-2xl p-4 flex items-center justify-between gap-4"
      >
        <div className="flex items-center gap-4">
          <div className="h-10 w-10 rounded-full bg-danger/20 flex items-center justify-center">
            <ShieldAlert className="h-5 w-5 text-danger animate-pulse" />
          </div>
          <div>
            <h3 className="text-danger font-bold text-sm tracking-widest uppercase">Marine Weather Warning</h3>
            <p className="text-white text-sm">Deep depression in the Bay of Bengal. Wind speeds exceeding 70kmph expected in Eastern coastal waters.</p>
          </div>
        </div>
      </motion.div>

      <PageHeader 
        title="Marine & Coastal Hub" 
        description="Real-time oceanographic telemetry, sea state forecasts, and maritime safety intelligence."
        icon={<Anchor className="h-8 w-8 text-primary" />} 
      />

      {/* Main Intelligence Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        
        {/* Core Metrics */}
        <MetricCard title="Avg Wave Height" value="2.6m" status="Rough Seas" icon={Waves} color="text-danger" />
        <MetricCard title="Sea Surface Temp" value="29.2°C" status="Anomaly: +0.8°C" icon={ThermometerSun} color="text-elevated" />
        <MetricCard title="Wind Gusts (Coastal)" value="45 kt" status="Gale Warning" icon={Wind} color="text-warning" />
        <MetricCard title="Fishing Conditions" value="Poor" status="Stay in Port" icon={Fish} color="text-danger" />

        {/* Wave Height Forecast */}
        <Card className="glass-card border-white/5 lg:col-span-2">
          <CardContent className="p-6">
            <h3 className="font-semibold text-white text-lg flex items-center gap-2 mb-2">
              <Waves className="h-5 w-5 text-primary" /> 24-Hour Wave Height Forecast
            </h3>
            <p className="text-xs text-muted-foreground mb-4">Tracking significant wave height (Hs) across Eastern and Southern coastal zones.</p>
            <div className="h-[250px] w-full">
              <ReactECharts option={waveHeightOptions} style={{ height: '100%', width: '100%' }} />
            </div>
          </CardContent>
        </Card>

        {/* Ocean Currents & Tides */}
        <Card className="glass-card border-white/5 lg:col-span-2 flex flex-col">
          <CardContent className="p-6 flex-1 flex flex-col">
            <div className="flex justify-between items-start mb-2">
              <h3 className="font-semibold text-white text-lg flex items-center gap-2">
                <Compass className="h-5 w-5 text-secondary" /> Ocean Current Speed
              </h3>
            </div>
            <p className="text-xs text-muted-foreground mb-4">Surface current velocity (knots) in the Gulf of Mannar.</p>
            <div className="flex-1 min-h-[250px] -mt-4">
              <ReactECharts option={currentOptions} style={{ height: '100%', width: '100%' }} />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Secondary Intelligence Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        
        {/* Tide Schedule */}
        <Card className="glass-card border-white/5">
          <CardContent className="p-6">
            <div className="flex items-center justify-between mb-6">
              <h3 className="font-bold text-white text-lg flex items-center gap-2">
                <Navigation className="h-5 w-5 text-primary" /> Tide Schedule
              </h3>
              <span className="text-xs bg-black/40 px-2 py-1 rounded text-muted-foreground">Colombo Port</span>
            </div>
            <div className="space-y-4">
              <div className="flex items-center justify-between border-b border-white/5 pb-3">
                <span className="text-sm font-medium text-white">High Tide</span>
                <span className="text-sm font-bold text-primary">02:14 PM</span>
                <span className="text-xs text-muted-foreground">0.8m</span>
              </div>
              <div className="flex items-center justify-between border-b border-white/5 pb-3">
                <span className="text-sm font-medium text-white">Low Tide</span>
                <span className="text-sm font-bold text-secondary">08:45 PM</span>
                <span className="text-xs text-muted-foreground">0.1m</span>
              </div>
              <div className="flex items-center justify-between pb-1">
                <span className="text-sm font-medium text-white">High Tide</span>
                <span className="text-sm font-bold text-primary">03:10 AM</span>
                <span className="text-xs text-muted-foreground">0.7m</span>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Harbour Conditions */}
        <Card className="glass-card border-white/5">
          <CardContent className="p-6">
            <h3 className="font-bold text-white text-lg flex items-center gap-2 mb-6">
              <Ship className="h-5 w-5 text-safe" /> Harbour Status
            </h3>
            <div className="space-y-4">
               <div className="bg-black/20 p-3 rounded-lg border border-white/5 flex items-center justify-between">
                 <span className="text-sm font-medium text-white">Colombo Port</span>
                 <span className="text-xs font-bold px-2 py-1 rounded bg-safe/20 text-safe uppercase">Operational</span>
               </div>
               <div className="bg-black/20 p-3 rounded-lg border border-white/5 flex items-center justify-between">
                 <span className="text-sm font-medium text-white">Trincomalee Harbour</span>
                 <span className="text-xs font-bold px-2 py-1 rounded bg-warning/20 text-warning uppercase">Restricted</span>
               </div>
               <div className="bg-black/20 p-3 rounded-lg border border-white/5 flex items-center justify-between">
                 <span className="text-sm font-medium text-white">Galle Fishery</span>
                 <span className="text-xs font-bold px-2 py-1 rounded bg-danger/20 text-danger uppercase">Closed</span>
               </div>
            </div>
          </CardContent>
        </Card>

        {/* Cyclone Tracking Map Mock */}
        <Card className="glass-card border-danger/30 relative overflow-hidden group">
           <div className="absolute inset-0 bg-[#0F172A]">
             <div className="absolute inset-0 opacity-40 bg-[url('https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/8/125/185')] bg-cover bg-center" />
             <svg viewBox="0 0 100 100" className="absolute inset-0 w-full h-full opacity-60">
                <path d="M 80 80 Q 50 50 20 20" fill="none" stroke="#EF4444" strokeWidth="2" strokeDasharray="4 2" className="animate-[dash_5s_linear_infinite]" />
                <circle cx="20" cy="20" r="10" fill="url(#cycloneGrad)" className="animate-[spin_2s_linear_infinite]" />
                <defs>
                  <radialGradient id="cycloneGrad">
                    <stop offset="0%" stopColor="#EF4444" />
                    <stop offset="100%" stopColor="transparent" />
                  </radialGradient>
                </defs>
             </svg>
           </div>
           <div className="absolute inset-0 bg-gradient-to-t from-[#1E293B] via-transparent to-transparent" />
          <CardContent className="p-6 relative z-10 flex flex-col h-full justify-end">
            <h3 className="font-bold text-white text-xl mb-1">Live Cyclone Tracking</h3>
            <p className="text-sm text-white/80">Projected path of Depression 04B. Estimated landfall in 48 hours.</p>
          </CardContent>
        </Card>

      </div>
    </div>
  );
}

function MetricCard({ title, value, status, icon: Icon, color }: any) {
  return (
    <Card className={`glass-card border-white/5 relative overflow-hidden group hover:-translate-y-1 transition-all`}>
      <div className={`absolute top-0 left-0 w-full h-1 ${color.replace('text-', 'bg-')}`} />
      <CardContent className="p-5 flex flex-col h-full justify-between gap-4">
        <div className="flex justify-between items-start">
          <span className="text-sm font-semibold text-white">{title}</span>
          <div className={`p-2 rounded-lg bg-black/20 border border-white/5 ${color}`}>
            <Icon className="h-4 w-4" />
          </div>
        </div>
        <div>
          <div className="text-3xl font-bold text-white tracking-tight mb-1">{value}</div>
          <span className={`text-xs font-semibold ${color}`}>{status}</span>
        </div>
      </CardContent>
    </Card>
  );
}
