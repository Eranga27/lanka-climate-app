"use client";

import React, { useState, useEffect } from "react";
import { PageHeader } from "@/components/layout/PageHeader";
import { Card, CardContent } from "@/components/ui/card";
import ReactECharts from "echarts-for-react";
import { motion } from "framer-motion";
import {
  Sprout, CloudRain, Sun, Droplets, AlertTriangle,
  Calendar, Thermometer, Bug, CheckCircle
} from "lucide-react";

const CROPS = [
  { name: "Rice (Maha)", season: "Oct–Feb", viability: 82, rain: "Good", risk: "Low", icon: "🌾" },
  { name: "Rice (Yala)", season: "Mar–Aug", viability: 65, rain: "Moderate", risk: "Medium", icon: "🌾" },
  { name: "Tea", season: "Year-round", viability: 90, rain: "Excellent", risk: "Low", icon: "🍃" },
  { name: "Rubber", season: "Year-round", viability: 74, rain: "Good", risk: "Low", icon: "🌿" },
  { name: "Coconut", season: "Year-round", viability: 78, rain: "Good", risk: "Low", icon: "🥥" },
  { name: "Maize", season: "Oct–Jan", viability: 55, rain: "Poor", risk: "High", icon: "🌽" },
];

const ZONES = [
  { name: "Dry Zone (North-Central)", drought: 68, moisture: 28, water: "Deficit" },
  { name: "Wet Zone (Western)", drought: 12, moisture: 85, water: "Surplus" },
  { name: "Intermediate Zone", drought: 35, moisture: 62, water: "Adequate" },
  { name: "Highlands (Central)", drought: 18, moisture: 78, water: "Adequate" },
];

const useAgriLive = () => {
  const [data, setData] = useState({ soilMoisture: 62, temp: 29.4, rain7d: 45 });
  useEffect(() => {
    const id = setInterval(() => {
      setData(p => ({
        soilMoisture: Math.max(0, Math.min(100, +(p.soilMoisture + (Math.random() - 0.5) * 2).toFixed(1))),
        temp: +(p.temp + (Math.random() - 0.5) * 0.2).toFixed(1),
        rain7d: Math.max(0, +(p.rain7d + (Math.random() - 0.5) * 2).toFixed(1)),
      }));
    }, 3000);
    return () => clearInterval(id);
  }, []);
  return data;
};

export default function AgriculturePage() {
  const [mounted, setMounted] = useState(false);
  const live = useAgriLive();
  useEffect(() => setMounted(true), []);

  const rainfallForecastOpts = {
    tooltip: { trigger: "axis", backgroundColor: "#1E293B", textStyle: { color: "#fff" } },
    grid: { left: "3%", right: "4%", bottom: "5%", top: "10%", containLabel: true },
    xAxis: {
      type: "category",
      data: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"],
      axisLine: { lineStyle: { color: "#334155" } },
      axisLabel: { color: "#94A3B8" },
    },
    yAxis: {
      type: "value",
      axisLine: { show: false },
      splitLine: { lineStyle: { color: "#334155", type: "dashed" } },
      axisLabel: { formatter: "{value}mm", color: "#94A3B8" },
    },
    series: [
      {
        name: "Predicted Rainfall",
        type: "bar",
        data: [12, 5, 35, 80, 45, 10, 22],
        itemStyle: {
          borderRadius: [4, 4, 0, 0],
          color: { type: "linear", x: 0, y: 0, x2: 0, y2: 1, colorStops: [{ offset: 0, color: "#2563EB" }, { offset: 1, color: "#38BDF8" }] },
        },
      },
    ],
  };

  const soilMoistureOpts = {
    tooltip: { trigger: "axis", backgroundColor: "#1E293B", textStyle: { color: "#fff" } },
    grid: { left: "3%", right: "4%", bottom: "5%", top: "10%", containLabel: true },
    xAxis: {
      type: "category",
      boundaryGap: false,
      data: ["Day 1", "Day 2", "Day 3", "Day 4", "Day 5", "Day 6", "Today"],
      axisLine: { lineStyle: { color: "#334155" } },
      axisLabel: { color: "#94A3B8" },
    },
    yAxis: {
      type: "value",
      axisLine: { show: false },
      splitLine: { lineStyle: { color: "#334155", type: "dashed" } },
      axisLabel: { formatter: "{value}%", color: "#94A3B8" },
    },
    series: [
      {
        name: "Soil Moisture",
        type: "line",
        smooth: true,
        data: [72, 68, 65, 59, 64, 60, live.soilMoisture],
        itemStyle: { color: "#10B981" },
        areaStyle: { color: { type: "linear", x: 0, y: 0, x2: 0, y2: 1, colorStops: [{ offset: 0, color: "rgba(16,185,129,0.4)" }, { offset: 1, color: "rgba(16,185,129,0)" }] } },
      },
    ],
  };

  const harvestCalendarOpts = {
    tooltip: { trigger: "axis", backgroundColor: "#1E293B", textStyle: { color: "#fff" } },
    legend: { data: ["Rice", "Tea", "Vegetables", "Fruit"], textStyle: { color: "#94A3B8" }, bottom: 0 },
    grid: { left: "3%", right: "4%", bottom: "15%", top: "10%", containLabel: true },
    xAxis: {
      type: "category",
      data: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"],
      axisLine: { lineStyle: { color: "#334155" } },
      axisLabel: { color: "#94A3B8" },
    },
    yAxis: {
      type: "value",
      axisLine: { show: false },
      splitLine: { lineStyle: { color: "#334155", type: "dashed" } },
      axisLabel: { formatter: "{value}%", color: "#94A3B8" },
    },
    series: [
      { name: "Rice", type: "line", smooth: true, data: [80, 90, 40, 20, 60, 70, 80, 90, 60, 40, 70, 85], itemStyle: { color: "#EAB308" } },
      { name: "Tea", type: "line", smooth: true, data: [70, 65, 80, 90, 85, 75, 60, 70, 80, 85, 80, 75], itemStyle: { color: "#10B981" } },
      { name: "Vegetables", type: "line", smooth: true, data: [50, 60, 70, 80, 40, 30, 50, 60, 70, 80, 75, 60], itemStyle: { color: "#F97316" } },
      { name: "Fruit", type: "line", smooth: true, data: [40, 50, 75, 90, 85, 70, 50, 45, 60, 80, 85, 70], itemStyle: { color: "#38BDF8" } },
    ],
  };

  if (!mounted) return null;

  return (
    <div className="flex-1 flex flex-col p-4 md:p-6 lg:p-8 space-y-6">
      <PageHeader
        title="Agri-Climate Intelligence"
        description="Predictive analytics for crop planning, drought monitoring, soil conditions and harvest optimization."
        icon={<Sprout className="h-8 w-8 text-safe" />}
      />

      {/* Top KPIs */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <AgriKPI title="Soil Moisture" value={`${live.soilMoisture}%`} icon={Droplets} color="text-primary" trend="Adequate" />
        <AgriKPI title="7-Day Rainfall" value={`${live.rain7d}mm`} icon={CloudRain} color="text-secondary" trend="Below Average" />
        <AgriKPI title="Ground Temp" value={`${live.temp}°C`} icon={Thermometer} color="text-warning" trend="Normal" />
        <AgriKPI title="Pest Risk" value="Moderate" icon={Bug} color="text-elevated" trend="Monitor Weekly" />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Crop Recommendations */}
        <Card className="glass-card border-white/5 lg:col-span-1">
          <CardContent className="p-6">
            <h3 className="text-lg font-bold text-white mb-1 flex items-center gap-2">
              <Sprout className="h-5 w-5 text-safe" /> Crop Suitability Index
            </h3>
            <p className="text-xs text-muted-foreground mb-5">AI-ranked viability for current climate conditions.</p>
            <div className="space-y-3">
              {CROPS.map((crop) => (
                <motion.div
                  key={crop.name}
                  whileHover={{ x: 4 }}
                  className="bg-black/20 rounded-xl p-3 border border-white/5 flex items-center justify-between"
                >
                  <div className="flex items-center gap-3">
                    <span className="text-2xl">{crop.icon}</span>
                    <div>
                      <div className="text-sm font-semibold text-white">{crop.name}</div>
                      <div className="text-xs text-muted-foreground">{crop.season}</div>
                    </div>
                  </div>
                  <div className="flex flex-col items-end gap-1">
                    <span className="text-sm font-bold text-white">{crop.viability}%</span>
                    <span className={`text-[10px] font-bold uppercase px-1.5 py-0.5 rounded ${
                      crop.risk === "Low" ? "bg-safe/20 text-safe" :
                      crop.risk === "Medium" ? "bg-warning/20 text-warning" :
                      "bg-danger/20 text-danger"
                    }`}>{crop.risk} Risk</span>
                  </div>
                </motion.div>
              ))}
            </div>
          </CardContent>
        </Card>

        <div className="lg:col-span-2 space-y-6">
          {/* Rainfall Forecast */}
          <Card className="glass-card border-white/5">
            <CardContent className="p-6">
              <h3 className="text-lg font-bold text-white mb-1 flex items-center gap-2">
                <CloudRain className="h-5 w-5 text-primary" /> 7-Day Rainfall Prediction
              </h3>
              <p className="text-xs text-muted-foreground mb-4">Critical for irrigation and harvest planning.</p>
              <div className="h-[200px] w-full">
                <ReactECharts option={rainfallForecastOpts} style={{ height: "100%", width: "100%" }} />
              </div>
            </CardContent>
          </Card>

          {/* Soil Moisture Trend */}
          <Card className="glass-card border-white/5">
            <CardContent className="p-6">
              <div className="flex justify-between items-center mb-2">
                <h3 className="text-lg font-bold text-white flex items-center gap-2">
                  <Droplets className="h-5 w-5 text-safe" /> Soil Moisture Trend
                </h3>
                <span className="text-xs bg-primary/20 text-primary px-2 py-1 rounded font-semibold">Live Sensor</span>
              </div>
              <div className="h-[180px] w-full">
                <ReactECharts option={soilMoistureOpts} style={{ height: "100%", width: "100%" }} />
              </div>
            </CardContent>
          </Card>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Drought Zone Monitor */}
        <Card className="glass-card border-white/5">
          <CardContent className="p-6">
            <h3 className="text-lg font-bold text-white mb-1 flex items-center gap-2">
              <Sun className="h-5 w-5 text-danger" /> Drought & Water Stress by Zone
            </h3>
            <p className="text-xs text-muted-foreground mb-5">Cross-regional vulnerability assessment.</p>
            <div className="space-y-4">
              {ZONES.map((zone) => (
                <div key={zone.name} className="space-y-1.5">
                  <div className="flex justify-between text-xs">
                    <span className="text-white font-medium">{zone.name}</span>
                    <div className="flex items-center gap-3">
                      <span className={`font-bold ${zone.water === "Deficit" ? "text-danger" : zone.water === "Surplus" ? "text-safe" : "text-warning"}`}>{zone.water}</span>
                      <span className="text-muted-foreground">Drought: {zone.drought}%</span>
                    </div>
                  </div>
                  <div className="h-2 w-full bg-black/40 rounded-full overflow-hidden">
                    <motion.div
                      initial={{ width: 0 }}
                      animate={{ width: `${zone.drought}%` }}
                      transition={{ duration: 1.2, delay: 0.2 }}
                      className={`h-full rounded-full ${zone.drought > 60 ? "bg-danger" : zone.drought > 30 ? "bg-warning" : "bg-safe"}`}
                    />
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Harvest Planning Calendar */}
        <Card className="glass-card border-white/5">
          <CardContent className="p-6">
            <h3 className="text-lg font-bold text-white mb-1 flex items-center gap-2">
              <Calendar className="h-5 w-5 text-warning" /> Harvest Suitability Calendar
            </h3>
            <p className="text-xs text-muted-foreground mb-4">Climate-adjusted growing windows for major crops.</p>
            <div className="h-[250px] w-full">
              <ReactECharts option={harvestCalendarOpts} style={{ height: "100%", width: "100%" }} />
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

function AgriKPI({ title, value, icon: Icon, color, trend }: any) {
  return (
    <Card className="glass-card border-white/5">
      <CardContent className="p-5">
        <div className="flex justify-between items-start mb-3">
          <span className="text-xs text-muted-foreground uppercase tracking-wider font-medium">{title}</span>
          <Icon className={`h-4 w-4 ${color}`} />
        </div>
        <div className="text-2xl font-bold text-white mb-1">{value}</div>
        <div className="text-xs text-muted-foreground">{trend}</div>
      </CardContent>
    </Card>
  );
}
