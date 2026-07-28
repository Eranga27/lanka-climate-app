"use client";

import React, { useState, useEffect } from "react";
import { PageHeader } from "@/components/layout/PageHeader";
import { 
  Sprout, Droplets, Sun, Wind, Bug, Calendar, Map as MapIcon, 
  Activity, CloudRain, ThermometerSun, ShieldCheck, Wheat
} from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import ReactECharts from "echarts-for-react";

export default function AgriculturePage() {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const soilMoistureOptions = {
    tooltip: { trigger: 'axis', backgroundColor: '#1E293B', textStyle: { color: '#fff' } },
    grid: { left: '3%', right: '4%', bottom: '5%', top: '10%', containLabel: true },
    xAxis: { type: 'category', boundaryGap: false, data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'], axisLine: { lineStyle: { color: '#334155' } }, axisLabel: { color: '#94A3B8' } },
    yAxis: { type: 'value', min: 0, max: 100, axisLine: { show: false }, splitLine: { lineStyle: { color: '#334155', type: 'dashed' } }, axisLabel: { formatter: '{value}%', color: '#94A3B8' } },
    visualMap: { show: false, dimension: 1, pieces: [{ gt: 60, color: '#10B981' }, { gt: 30, lte: 60, color: '#EAB308' }, { lte: 30, color: '#EF4444' }] },
    series: [
      {
        name: 'Soil Moisture', type: 'line', smooth: true, markLine: { data: [{ yAxis: 30, name: 'Critical Threshold' }], lineStyle: { color: '#EF4444' } },
        data: [75, 70, 65, 55, 45, 35, 25], areaStyle: { opacity: 0.1 }
      }
    ]
  };

  const cropYieldOptions = {
    tooltip: { trigger: 'axis', axisPointer: { type: 'shadow' }, backgroundColor: '#1E293B', textStyle: { color: '#fff' } },
    legend: { data: ['Predicted Yield', 'Historical Avg'], textStyle: { color: '#94A3B8' }, bottom: 0 },
    grid: { left: '3%', right: '4%', bottom: '15%', top: '10%', containLabel: true },
    xAxis: { type: 'category', data: ['Paddy', 'Tea', 'Rubber', 'Coconut', 'Spices'], axisLine: { lineStyle: { color: '#334155' } }, axisLabel: { color: '#94A3B8' } },
    yAxis: { type: 'value', axisLine: { show: false }, splitLine: { lineStyle: { color: '#334155', type: 'dashed' } }, axisLabel: { color: '#94A3B8' } },
    series: [
      { name: 'Predicted Yield', type: 'bar', barWidth: '30%', itemStyle: { color: '#10B981', borderRadius: [4, 4, 0, 0] }, data: [4.2, 2.8, 1.5, 3.1, 1.2] },
      { name: 'Historical Avg', type: 'line', symbol: 'circle', symbolSize: 8, itemStyle: { color: '#38BDF8' }, data: [4.5, 2.7, 1.6, 2.9, 1.1] }
    ]
  };

  if (!mounted) return null;

  return (
    <div className="flex-1 flex flex-col p-4 md:p-6 lg:p-8 space-y-6">
      <PageHeader 
        title="Agri-Climate Hub" 
        description="Predictive farming intelligence, crop yield modeling, and hyper-local drought monitoring."
        icon={<Sprout className="h-8 w-8 text-safe" />} 
      />

      {/* Main Intelligence Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        
        {/* Core Metrics */}
        <MetricCard title="Soil Moisture Avg" value="42%" status="Declining" icon={Droplets} color="text-warning" />
        <MetricCard title="Water Availability" value="Moderate" status="Reservoirs at 65%" icon={Waves} color="text-primary" />
        <MetricCard title="Drought Risk (Yala)" value="High" status="Rainfall Deficit" icon={Sun} color="text-danger" />
        <MetricCard title="Pest Threat Level" value="Elevated" status="Faw Invasion Risk" icon={Bug} color="text-elevated" />

        {/* Predictive Analytics Section */}
        <Card className="glass-card border-white/5 lg:col-span-2">
          <CardContent className="p-6">
            <h3 className="font-semibold text-white text-lg flex items-center gap-2 mb-2">
              <Droplets className="h-5 w-5 text-primary" /> 7-Day Soil Moisture Depletion
            </h3>
            <p className="text-xs text-muted-foreground mb-4">Tracking volumetric water content in the root zone (Top 20cm). Critical threshold approaching.</p>
            <div className="h-[250px] w-full">
              <ReactECharts option={soilMoistureOptions} style={{ height: '100%', width: '100%' }} />
            </div>
          </CardContent>
        </Card>

        {/* Harvest & Yield Modeling */}
        <Card className="glass-card border-white/5 lg:col-span-2">
          <CardContent className="p-6">
            <h3 className="font-semibold text-white text-lg flex items-center gap-2 mb-2">
              <Activity className="h-5 w-5 text-safe" /> Predictive Yield Modeling (t/ha)
            </h3>
            <p className="text-xs text-muted-foreground mb-4">Comparing AI-predicted seasonal yield against decadal historical averages.</p>
            <div className="h-[250px] w-full">
              <ReactECharts option={cropYieldOptions} style={{ height: '100%', width: '100%' }} />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Seasonal & Planning Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        
        {/* Crop Recommendations */}
        <Card className="glass-card border-safe/30 bg-safe/5 relative overflow-hidden h-full">
          <div className="absolute top-0 left-0 w-2 h-full bg-safe" />
          <CardContent className="p-6">
            <div className="flex items-center gap-3 mb-6">
              <div className="p-3 bg-safe/20 rounded-xl border border-safe/30">
                <Wheat className="h-6 w-6 text-safe" />
              </div>
              <div>
                <h3 className="font-bold text-white text-lg">AI Crop Recommendations</h3>
                <span className="text-xs text-safe font-semibold">Dry Zone Adaptations</span>
              </div>
            </div>
            <ul className="space-y-4">
              <li className="flex items-start gap-3">
                <span className="h-6 w-6 rounded-full bg-black/40 flex items-center justify-center text-xs font-bold text-white shrink-0 border border-white/10">1</span>
                <div>
                  <h4 className="text-sm font-bold text-white">Sorghum & Finger Millet (Kurakkan)</h4>
                  <p className="text-xs text-muted-foreground">High resistance to current moisture deficits.</p>
                </div>
              </li>
              <li className="flex items-start gap-3">
                <span className="h-6 w-6 rounded-full bg-black/40 flex items-center justify-center text-xs font-bold text-white shrink-0 border border-white/10">2</span>
                <div>
                  <h4 className="text-sm font-bold text-white">Short-age Paddy Varieties (Bg 300)</h4>
                  <p className="text-xs text-muted-foreground">Maturation in 3 months; ideal for delayed monsoons.</p>
                </div>
              </li>
            </ul>
          </CardContent>
        </Card>

        {/* Growing Seasons & Rain */}
        <Card className="glass-card border-white/5 relative overflow-hidden h-full">
          <CardContent className="p-6">
            <div className="flex items-center gap-3 mb-6">
              <div className="p-3 bg-primary/20 rounded-xl border border-primary/30">
                <Calendar className="h-6 w-6 text-primary" />
              </div>
              <div>
                <h3 className="font-bold text-white text-lg">Season Intelligence</h3>
                <span className="text-xs text-primary font-semibold">Yala Season Tracker</span>
              </div>
            </div>
            <div className="space-y-4">
               <div className="bg-black/20 p-3 rounded-lg border border-white/5">
                 <div className="flex justify-between items-center mb-2">
                   <span className="text-sm font-medium text-white">Rainfall Deficit</span>
                   <span className="text-sm font-bold text-warning">-18%</span>
                 </div>
                 <div className="h-1.5 w-full bg-black/40 rounded-full overflow-hidden">
                    <div className="h-full bg-warning rounded-full w-[82%]" />
                 </div>
               </div>
               <p className="text-xs text-muted-foreground leading-relaxed">
                 The Yala cultivation season is currently experiencing significant rainfall deficits. Supplemental irrigation is highly recommended for non-paddy crops.
               </p>
            </div>
          </CardContent>
        </Card>

        {/* Harvest Planning */}
        <Card className="glass-card border-white/5 relative overflow-hidden h-full">
           {/* Mock Map Background */}
           <div className="absolute inset-0 opacity-20 bg-[url('https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/8/125/185')] bg-cover bg-center grayscale mix-blend-screen" />
           <div className="absolute inset-0 bg-gradient-to-t from-[#1E293B] via-[#1E293B]/80 to-transparent" />
           
          <CardContent className="p-6 relative z-10 flex flex-col h-full justify-end">
            <div className="mb-auto flex items-center gap-2 bg-black/60 w-max px-3 py-1.5 rounded-full border border-white/10 backdrop-blur-md">
              <MapIcon className="h-4 w-4 text-white" />
              <span className="text-xs font-semibold text-white">Harvest Mapping Active</span>
            </div>
            
            <h3 className="font-bold text-white text-xl mt-8 mb-2">Optimal Harvest Window</h3>
            <div className="flex items-center justify-between bg-black/40 p-4 rounded-xl border border-white/10 backdrop-blur-md">
               <div>
                 <span className="block text-xs text-muted-foreground uppercase tracking-wider mb-1">North Central Province</span>
                 <span className="font-bold text-white">Aug 15 - Aug 25</span>
               </div>
               <ShieldCheck className="h-8 w-8 text-safe" />
            </div>
          </CardContent>
        </Card>

      </div>
    </div>
  );
}

function MetricCard({ title, value, status, icon: Icon, color }: any) {
  return (
    <Card className="glass-card border-white/5 relative overflow-hidden group hover:-translate-y-1 transition-all">
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
