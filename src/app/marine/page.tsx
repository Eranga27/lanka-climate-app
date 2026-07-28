"use client";

import React, { useState, useEffect } from "react";
import { PageHeader } from "@/components/layout/PageHeader";
import { Card, CardContent } from "@/components/ui/card";
import ReactECharts from "echarts-for-react";
import { motion } from "framer-motion";
import { Anchor, Waves, Wind, Thermometer, Navigation, AlertTriangle, Ship, Fish } from "lucide-react";
import { getMarineData, getWeatherData } from "@/lib/weather";
import { SkeletonCard, ErrorState } from "@/components/ui/shared";

const HARBOURS = [
  { name: "Colombo", condition: "Good", wind: "12 knots", wave: "0.8m", temp: "28°C", status: "safe", lat: 6.9271, lng: 79.8612 },
  { name: "Galle", condition: "Moderate", wind: "18 knots", wave: "1.5m", temp: "27°C", status: "warning", lat: 6.0328, lng: 80.2170 },
  { name: "Trincomalee", condition: "Rough", wind: "28 knots", wave: "3.2m", temp: "29°C", status: "danger", lat: 8.5811, lng: 81.2330 },
  { name: "Jaffna", condition: "Poor", wind: "32 knots", wave: "4.1m", temp: "30°C", status: "elevated", lat: 9.6615, lng: 80.0255 },
  { name: "Hambantota", condition: "Good", wind: "10 knots", wave: "0.6m", temp: "27°C", status: "safe", lat: 6.1248, lng: 81.1185 },
];

const FISHING_ZONES = [
  { zone: "Deep Sea North", viability: "High", risk: "Extreme", season: "Avoid" },
  { zone: "Western Coast", viability: "Moderate", risk: "Warning", season: "Caution" },
  { zone: "Southern Waters", viability: "Good", risk: "Safe", season: "Favourable" },
  { zone: "Eastern Coast", viability: "Moderate", risk: "Elevated", season: "Caution" },
];

const statusColor = (s: string) =>
  s === "safe" ? "text-safe" : s === "warning" ? "text-warning" : s === "elevated" ? "text-elevated" : "text-danger";

export default function MarinePage() {
  const [mounted, setMounted] = useState(false);
  const [marineData, setMarineData] = useState<any>(null);
  const [weatherData, setWeatherData] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    setMounted(true);
    const fetchLiveMarineData = async () => {
      try {
        // Fetch for Colombo as the primary dashboard view
        const [marine, weather] = await Promise.all([
          getMarineData(6.9271, 79.8612),
          getWeatherData(6.9271, 79.8612)
        ]);
        setMarineData(marine);
        setWeatherData(weather);
      } catch (e) {
        console.error(e);
      } finally {
        setIsLoading(false);
      }
    };
    fetchLiveMarineData();
  }, []);

  if (!mounted) return null;

  if (isLoading) {
    return (
      <div className="flex-1 flex flex-col p-4 md:p-6 lg:p-8 space-y-6">
        <PageHeader title="Marine & Coastal Intelligence" description="Loading real-time marine data..." />
        <SkeletonCard rows={8} />
      </div>
    );
  }

  if (!marineData || !weatherData) {
    return (
      <div className="flex-1 flex flex-col p-4 md:p-6 lg:p-8 space-y-6">
        <PageHeader title="Marine & Coastal Intelligence" description="Data unavailable" />
        <ErrorState title="Marine API Offline" message="Could not connect to Open-Meteo Marine API." />
      </div>
    );
  }

  const currentWaveHeight = marineData.current.wave_height;
  const currentWindSpeed = weatherData.current.wind_speed_10m;
  const currentDirection = marineData.current.wave_direction;

  const waveOpts = {
    tooltip: { trigger: "axis", backgroundColor: "#1E293B", textStyle: { color: "#fff" } },
    grid: { left: "3%", right: "4%", bottom: "5%", top: "10%", containLabel: true },
    xAxis: {
      type: "category",
      boundaryGap: false,
      data: marineData.hourly.time.slice(0, 24).map((t: string) => new Date(t).toLocaleTimeString('en-US', { hour: 'numeric' })),
      axisLine: { lineStyle: { color: "#334155" } },
      axisLabel: { color: "#94A3B8" },
    },
    yAxis: {
      type: "value",
      axisLine: { show: false },
      splitLine: { lineStyle: { color: "#334155", type: "dashed" } },
      axisLabel: { formatter: "{value}m", color: "#94A3B8" },
    },
    series: [
      {
        name: "Wave Height",
        type: "line",
        smooth: true,
        data: marineData.hourly.wave_height.slice(0, 24),
        itemStyle: { color: "#38BDF8" },
        areaStyle: {
          color: { type: "linear", x: 0, y: 0, x2: 0, y2: 1, colorStops: [{ offset: 0, color: "rgba(56,189,248,0.4)" }, { offset: 1, color: "rgba(56,189,248,0)" }] },
        },
      },
    ],
  };

  const tideOpts = {
    tooltip: { trigger: "axis", backgroundColor: "#1E293B", textStyle: { color: "#fff" } },
    grid: { left: "3%", right: "4%", bottom: "5%", top: "10%", containLabel: true },
    xAxis: {
      type: "category",
      boundaryGap: false,
      data: ["6AM", "8AM", "10AM", "12PM", "2PM", "4PM", "6PM", "8PM", "10PM"],
      axisLine: { lineStyle: { color: "#334155" } },
      axisLabel: { color: "#94A3B8" },
    },
    yAxis: {
      type: "value",
      axisLine: { show: false },
      splitLine: { lineStyle: { color: "#334155", type: "dashed" } },
      axisLabel: { formatter: "{value}m", color: "#94A3B8" },
    },
    series: [
      {
        name: "Tide Level",
        type: "line",
        smooth: true,
        data: [0.4, 1.2, 1.8, 1.4, 0.6, 0.2, 0.9, 1.7, 1.5],
        itemStyle: { color: "#2563EB" },
        areaStyle: {
          color: { type: "linear", x: 0, y: 0, x2: 0, y2: 1, colorStops: [{ offset: 0, color: "rgba(37,99,235,0.5)" }, { offset: 1, color: "rgba(37,99,235,0)" }] },
        },
      },
    ],
  };

  const seaTempOpts = {
    tooltip: { trigger: "axis", backgroundColor: "#1E293B", textStyle: { color: "#fff" } },
    grid: { left: "3%", right: "4%", bottom: "5%", top: "10%", containLabel: true },
    xAxis: {
      type: "category",
      data: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"],
      axisLine: { lineStyle: { color: "#334155" } },
      axisLabel: { color: "#94A3B8" },
    },
    yAxis: {
      type: "value",
      min: 25,
      axisLine: { show: false },
      splitLine: { lineStyle: { color: "#334155", type: "dashed" } },
      axisLabel: { formatter: "{value}°C", color: "#94A3B8" },
    },
    series: [
      {
        name: "Sea Surface Temp",
        type: "line",
        smooth: true,
        data: [27.5, 28.0, 28.8, 29.2, 29.8, 29.4, 28.9, 28.4, 27.9, 27.4, 27.8, 27.6],
        itemStyle: { color: "#F97316" },
        areaStyle: {
          color: { type: "linear", x: 0, y: 0, x2: 0, y2: 1, colorStops: [{ offset: 0, color: "rgba(249,115,22,0.3)" }, { offset: 1, color: "rgba(249,115,22,0)" }] },
        },
      },
    ],
  };

  return (
    <div className="flex-1 flex flex-col p-4 md:p-6 lg:p-8 space-y-6">
      <PageHeader
        title="Marine & Coastal Intelligence"
        description="Real-time sea conditions, wave dynamics, tidal forecasts and fishery safety across Sri Lanka's coastline."
        icon={<Anchor className="h-8 w-8 text-primary" />}
      />

      {/* Cyclone Warning Banner */}
      <div className="glass-card rounded-2xl p-4 border border-danger/40 bg-danger/5 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
        <div className="flex items-center gap-3">
          <div className="h-10 w-10 rounded-full bg-danger/20 flex items-center justify-center shrink-0">
            <AlertTriangle className="h-5 w-5 text-danger animate-pulse" />
          </div>
          <div>
            <span className="text-danger font-bold text-sm uppercase tracking-widest">Cyclone Advisory</span>
            <p className="text-white/80 text-sm">Cyclone 'Mocha' tracking toward northeast — all maritime vessels north of 9°N advised to return to harbour immediately.</p>
          </div>
        </div>
        <span className="text-xs font-bold bg-danger text-white px-3 py-1.5 rounded-full shrink-0">Active</span>
      </div>

      {/* KPIs */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <MarineKPI title="Colombo Wave Height" value={`${currentWaveHeight}m`} icon={Waves} color="text-secondary" />
        <MarineKPI title="Air Temperature" value={`${weatherData.current.temperature_2m}°C`} icon={Thermometer} color="text-warning" />
        <MarineKPI title="Wind Speed" value={`${currentWindSpeed} km/h`} icon={Wind} color="text-muted-foreground" />
        <MarineKPI title="Wave Direction" value={`${currentDirection}°`} icon={Navigation} color="text-primary" />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Wave Height Chart */}
        <Card className="glass-card border-white/5 lg:col-span-2">
          <CardContent className="p-6">
            <div className="flex justify-between items-center mb-2">
              <h3 className="text-lg font-bold text-white flex items-center gap-2">
                <Waves className="h-5 w-5 text-secondary" /> 24-Hour Wave Forecast (Colombo)
              </h3>
              <span className="text-xs bg-primary/20 text-primary px-2 py-1 rounded font-semibold">Live API Data</span>
            </div>
            <p className="text-xs text-muted-foreground mb-4">Significant wave height predictions powered by Open-Meteo Marine.</p>
            <div className="h-[220px] w-full">
              <ReactECharts option={waveOpts} style={{ height: "100%", width: "100%" }} />
            </div>
          </CardContent>
        </Card>

        {/* Harbour Conditions */}
        <Card className="glass-card border-white/5">
          <CardContent className="p-6">
            <h3 className="text-lg font-bold text-white flex items-center gap-2 mb-5">
              <Ship className="h-5 w-5 text-primary" /> Harbour Conditions
            </h3>
            <div className="space-y-3">
              {HARBOURS.map((h) => (
                <div key={h.name} className="bg-black/20 rounded-xl p-3 border border-white/5">
                  <div className="flex justify-between items-center mb-1">
                    <span className="font-semibold text-white text-sm">{h.name}</span>
                    <span className={`text-xs font-bold uppercase ${statusColor(h.status)}`}>{h.condition}</span>
                  </div>
                  <div className="flex gap-4 text-xs text-muted-foreground">
                    <span>🌊 {h.wave}</span>
                    <span>💨 {h.wind}</span>
                    <span>🌡️ {h.temp}</span>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Tidal Chart */}
        <Card className="glass-card border-white/5 lg:col-span-1">
          <CardContent className="p-6">
            <h3 className="text-lg font-bold text-white flex items-center gap-2 mb-2">
              <Waves className="h-5 w-5 text-primary" /> Tidal Prediction — Colombo
            </h3>
            <p className="text-xs text-muted-foreground mb-4">High tide: 02:18 & 14:42 | Low tide: 08:30 & 20:55</p>
            <div className="h-[200px] w-full">
              <ReactECharts option={tideOpts} style={{ height: "100%", width: "100%" }} />
            </div>
          </CardContent>
        </Card>

        {/* Sea Temperature Trend */}
        <Card className="glass-card border-white/5 lg:col-span-1">
          <CardContent className="p-6">
            <h3 className="text-lg font-bold text-white flex items-center gap-2 mb-2">
              <Thermometer className="h-5 w-5 text-warning" /> Annual Sea Temp Profile
            </h3>
            <p className="text-xs text-muted-foreground mb-4">Monthly mean SST — Indian Ocean, Sri Lanka coastal.</p>
            <div className="h-[200px] w-full">
              <ReactECharts option={seaTempOpts} style={{ height: "100%", width: "100%" }} />
            </div>
          </CardContent>
        </Card>

        {/* Fishing Zone Safety */}
        <Card className="glass-card border-white/5 lg:col-span-1">
          <CardContent className="p-6">
            <h3 className="text-lg font-bold text-white flex items-center gap-2 mb-5">
              <Fish className="h-5 w-5 text-safe" /> Fishing Zone Advisories
            </h3>
            <div className="space-y-3">
              {FISHING_ZONES.map((zone) => (
                <motion.div
                  key={zone.zone}
                  whileHover={{ x: 4 }}
                  className="bg-black/20 rounded-xl p-3 border border-white/5 flex items-center justify-between"
                >
                  <div>
                    <div className="text-sm font-semibold text-white">{zone.zone}</div>
                    <div className="text-xs text-muted-foreground">Viability: {zone.viability}</div>
                  </div>
                  <span className={`text-xs font-bold px-2 py-1 rounded uppercase ${
                    zone.season === "Favourable" ? "bg-safe/20 text-safe" :
                    zone.season === "Caution" ? "bg-warning/20 text-warning" :
                    "bg-danger/20 text-danger"
                  }`}>
                    {zone.season}
                  </span>
                </motion.div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

function MarineKPI({ title, value, icon: Icon, color }: any) {
  return (
    <Card className="glass-card border-white/5">
      <CardContent className="p-5">
        <div className="flex justify-between items-start mb-3">
          <span className="text-xs text-muted-foreground uppercase tracking-wider font-medium">{title}</span>
          <Icon className={`h-4 w-4 ${color}`} />
        </div>
        <div className="text-2xl font-bold text-white">{value}</div>
      </CardContent>
    </Card>
  );
}
