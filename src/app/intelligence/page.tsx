"use client";

import React, { useState, useEffect } from "react";
import { PageHeader } from "@/components/layout/PageHeader";
import { Activity, Waves, Wind, ThermometerSun, AlertTriangle, Sprout, Droplets, ArrowUpRight, ArrowDownRight, Globe2 } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import ReactECharts from "echarts-for-react";
import { motion } from "framer-motion";

export default function IntelligencePage() {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const ensoProbabilityOptions = {
    tooltip: { trigger: 'axis', axisPointer: { type: 'shadow' }, backgroundColor: '#1E293B', textStyle: { color: '#fff' } },
    legend: { data: ['El Niño', 'Neutral', 'La Niña'], textStyle: { color: '#94A3B8' }, bottom: 0 },
    grid: { left: '3%', right: '4%', bottom: '15%', top: '10%', containLabel: true },
    xAxis: { type: 'category', data: ['JJA', 'JAS', 'ASO', 'SON', 'OND', 'NDJ', 'DJF', 'JFM', 'FMA'], axisLine: { lineStyle: { color: '#334155' } }, axisLabel: { color: '#94A3B8' } },
    yAxis: { type: 'value', axisLine: { show: false }, splitLine: { lineStyle: { color: '#334155', type: 'dashed' } }, axisLabel: { formatter: '{value}%', color: '#94A3B8' } },
    series: [
      { name: 'El Niño', type: 'bar', stack: 'total', itemStyle: { color: '#EF4444' }, data: [95, 90, 85, 75, 60, 45, 30, 20, 10] },
      { name: 'Neutral', type: 'bar', stack: 'total', itemStyle: { color: '#94A3B8' }, data: [5, 10, 15, 25, 35, 50, 60, 70, 80] },
      { name: 'La Niña', type: 'bar', stack: 'total', itemStyle: { color: '#38BDF8' }, data: [0, 0, 0, 0, 5, 5, 10, 10, 10] }
    ]
  };

  const anomalyOptions = {
    tooltip: { trigger: 'axis', backgroundColor: '#1E293B', textStyle: { color: '#fff' } },
    grid: { left: '3%', right: '4%', bottom: '5%', top: '10%', containLabel: true },
    xAxis: { type: 'category', boundaryGap: false, data: ['2014', '2015', '2016', '2017', '2018', '2019', '2020', '2021', '2022', '2023', '2024'], axisLine: { lineStyle: { color: '#334155' } }, axisLabel: { color: '#94A3B8' } },
    yAxis: { type: 'value', axisLine: { show: false }, splitLine: { lineStyle: { color: '#334155', type: 'dashed' } }, axisLabel: { formatter: '{value}°C', color: '#94A3B8' } },
    visualMap: {
      show: false, dimension: 1,
      pieces: [{ gt: 0.5, color: '#EF4444' }, { gt: -0.5, lte: 0.5, color: '#94A3B8' }, { lte: -0.5, color: '#38BDF8' }]
    },
    series: [
      {
        name: 'SST Anomaly', type: 'line', smooth: true, markLine: { data: [{ yAxis: 0.5 }, { yAxis: -0.5 }], lineStyle: { color: '#F97316', type: 'dashed' } },
        data: [0.2, 2.6, 0.4, -0.6, 0.8, 0.4, -1.2, -1.0, -1.1, 1.8, 1.4],
        areaStyle: { opacity: 0.1 }
      }
    ]
  };

  if (!mounted) return null;

  return (
    <div className="flex-1 flex flex-col p-4 md:p-6 lg:p-8 space-y-8">
      <PageHeader 
        title="Climate Intelligence Centre" 
        description="Deep scientific analytics on ENSO cycles, ocean temperature anomalies, and predictive national impacts."
        icon={<Activity className="h-8 w-8 text-primary" />} 
      />

      {/* Hero Status Bar */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <Card className="glass-card border-danger/50 lg:col-span-2 relative overflow-hidden bg-danger/5">
          <div className="absolute top-0 right-0 p-8 opacity-10"><Globe2 className="h-48 w-48 text-danger" /></div>
          <CardContent className="p-8 relative z-10 flex flex-col justify-center h-full">
            <span className="inline-block py-1 px-3 rounded-full bg-danger/20 text-danger text-xs font-bold uppercase tracking-widest w-max mb-4 border border-danger/30">
              Active Advisory
            </span>
            <h2 className="text-4xl md:text-5xl font-bold text-white tracking-tight mb-2">El Niño Phase Active</h2>
            <p className="text-muted-foreground text-lg max-w-xl">
              Oceanic and atmospheric indicators are aligned with a strong El Niño episode. Expect significant deviations in the standard monsoon precipitation across Sri Lanka.
            </p>
          </CardContent>
        </Card>

        <div className="space-y-4">
          <MetricCard title="Ocean Temp Anomaly (Niño 3.4)" value="+1.4°C" status="increasing" icon={ThermometerSun} color="text-danger" />
          <MetricCard title="Southern Oscillation Index (SOI)" value="-12.4" status="decreasing" icon={Activity} color="text-warning" />
          <MetricCard title="Trade Wind Strength" value="Weakened" status="neutral" icon={Wind} color="text-muted-foreground" />
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* ENSO Probabilities */}
        <Card className="glass-card border-white/5">
          <CardContent className="p-6">
            <h3 className="font-semibold text-white text-lg mb-2">ENSO Phase Probabilities</h3>
            <p className="text-sm text-muted-foreground mb-6">IRI/CPC model consensus for upcoming seasons.</p>
            <div className="h-[300px] w-full">
              <ReactECharts option={ensoProbabilityOptions} style={{ height: '100%', width: '100%' }} />
            </div>
          </CardContent>
        </Card>

        {/* Historical Anomalies */}
        <Card className="glass-card border-white/5">
          <CardContent className="p-6">
             <div className="flex justify-between items-start mb-2">
               <div>
                  <h3 className="font-semibold text-white text-lg">Historical Sea Surface Temp (SST) Anomaly</h3>
                  <p className="text-sm text-muted-foreground mb-6">Tracking El Niño (Red) and La Niña (Blue) events over the past decade.</p>
               </div>
               <span className="bg-primary/20 text-primary px-2 py-1 rounded text-xs font-semibold">Live Data</span>
             </div>
             <div className="h-[300px] w-full">
              <ReactECharts option={anomalyOptions} style={{ height: '100%', width: '100%' }} />
             </div>
          </CardContent>
        </Card>
      </div>

      {/* Predicted Impacts on Sri Lanka */}
      <div>
        <h2 className="text-2xl font-bold text-white mb-6 flex items-center gap-2">
          <AlertTriangle className="h-6 w-6 text-warning" /> 
          Predicted Impacts on Sri Lanka
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <ImpactCard 
            title="Agricultural Output" 
            value="High Risk" 
            description="Potential yield reduction in the Dry Zone due to delayed Maha season rains." 
            icon={Sprout} 
            color="border-danger/40 bg-danger/10 text-danger"
          />
          <ImpactCard 
            title="Water Availability" 
            value="Moderate Deficit" 
            description="Reservoir levels in central highlands projected to drop by 15%." 
            icon={Droplets} 
            color="border-warning/40 bg-warning/10 text-warning"
          />
          <ImpactCard 
            title="Drought Probability" 
            value="68% Chance" 
            description="Elevated risk of prolonged dry spells in North-Central and Eastern provinces." 
            icon={Sun} 
            color="border-danger/40 bg-danger/10 text-danger"
          />
          <ImpactCard 
            title="Flood Probability" 
            value="22% Chance" 
            description="Reduced national flood risk, though localized flash floods remain possible." 
            icon={Waves} 
            color="border-safe/40 bg-safe/10 text-safe"
          />
        </div>
      </div>
    </div>
  );
}

function MetricCard({ title, value, status, icon: Icon, color }: any) {
  return (
    <Card className="glass-card border-white/5">
      <CardContent className="p-5 flex items-center justify-between h-full">
        <div>
          <span className="text-xs font-medium text-muted-foreground uppercase tracking-wider block mb-1">{title}</span>
          <div className="text-2xl font-bold text-white flex items-center gap-2">
            {value}
            {status === "increasing" && <ArrowUpRight className="h-4 w-4 text-danger" />}
            {status === "decreasing" && <ArrowDownRight className="h-4 w-4 text-primary" />}
          </div>
        </div>
        <div className={`p-3 rounded-xl bg-black/20 border border-white/5 ${color}`}>
          <Icon className="h-6 w-6" />
        </div>
      </CardContent>
    </Card>
  );
}

function ImpactCard({ title, value, description, icon: Icon, color }: any) {
  return (
    <Card className="glass-card border-white/5 relative overflow-hidden group hover:-translate-y-1 transition-transform duration-300">
      <div className={`absolute top-0 left-0 w-1 h-full ${color.split(' ')[0].replace('border-', 'bg-')}`} />
      <CardContent className="p-6">
        <div className="flex justify-between items-start mb-4">
           <div className={`p-2 rounded-lg ${color}`}>
              <Icon className="h-5 w-5" />
           </div>
           <span className="text-sm font-bold text-white">{value}</span>
        </div>
        <h3 className="font-semibold text-white mb-2">{title}</h3>
        <p className="text-sm text-muted-foreground leading-relaxed">{description}</p>
      </CardContent>
    </Card>
  );
}
