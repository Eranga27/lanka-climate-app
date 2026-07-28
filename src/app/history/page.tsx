"use client";

import React, { useState, useMemo } from "react";
import { PageHeader } from "@/components/layout/PageHeader";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import ReactECharts from "echarts-for-react";
import { motion, AnimatePresence } from "framer-motion";
import {
  History, Download, Calendar, MapPin, Filter, TrendingUp,
  TrendingDown, Thermometer, Droplets, Wind, Waves, Sun,
  CloudLightning, AlertTriangle, ChevronDown, BarChart3
} from "lucide-react";

// ── Static Data ─────────────────────────────────────────────────────────────

const DISTRICTS = [
  "All Districts","Colombo","Gampaha","Kalutara","Kandy","Matale",
  "Nuwara Eliya","Galle","Matara","Hambantota","Jaffna","Kilinochchi",
  "Mannar","Mullaitivu","Vavuniya","Puttalam","Kurunegala","Anuradhapura",
  "Polonnaruwa","Badulla","Moneragala","Ratnapura","Kegalle","Ampara",
  "Batticaloa","Trincomalee",
];

const PROVINCES = [
  "All Provinces","Western","Central","Southern","Northern","Eastern",
  "North Western","North Central","Uva","Sabaragamuwa",
];

const EVENTS = [
  "All Events","Cyclone","Flood","Drought","Heatwave","Heavy Rain",
  "Landslide","Storm Surge","Extreme Wind",
];

const YEARS = ["2024","2023","2022","2021","2020","2019","2018","2017","2016","2015"];

// Generate synthetic year-over-year monthly data
const makeMonthlyTemp = (base: number, variance: number) =>
  Array.from({ length: 12 }, (_, i) =>
    +(base + Math.sin((i / 12) * Math.PI * 2) * variance + (Math.random() - 0.5) * 0.5).toFixed(1)
  );
const makeMonthlyRain = (base: number) =>
  Array.from({ length: 12 }, () =>
    Math.max(0, Math.round(base + (Math.random() - 0.5) * base * 0.8))
  );

const YEAR_DATA: Record<string, { temp: number[]; rain: number[] }> = {
  "2024": { temp: makeMonthlyTemp(29, 2.5), rain: makeMonthlyRain(180) },
  "2023": { temp: makeMonthlyTemp(30.2, 2.8), rain: makeMonthlyRain(165) },
  "2022": { temp: makeMonthlyTemp(28.8, 2.2), rain: makeMonthlyRain(210) },
  "2021": { temp: makeMonthlyTemp(28.5, 2.0), rain: makeMonthlyRain(195) },
  "2020": { temp: makeMonthlyTemp(28.0, 2.4), rain: makeMonthlyRain(220) },
};

const CLIMATE_EVENTS = [
  { year: 2024, type: "Cyclone", name: "Cyclone Mocha", districts: "Jaffna, Trincomalee", impact: "Extreme", fatalities: 12, description: "Category 4 cyclone caused widespread coastal destruction." },
  { year: 2023, type: "Flood", name: "May Flash Floods", districts: "Colombo, Gampaha, Kalutara", impact: "Danger", fatalities: 8, description: "Severe flooding affecting 50,000+ residents." },
  { year: 2022, type: "Drought", name: "North-Central Drought", districts: "Anuradhapura, Polonnaruwa", impact: "Elevated", fatalities: 0, description: "Prolonged dry period devastated Maha season." },
  { year: 2021, type: "Heatwave", name: "April Heatwave", districts: "Jaffna, Vavuniya, Mannar", impact: "Elevated", fatalities: 3, description: "Maximum temperatures exceeded 38°C for 9 consecutive days." },
  { year: 2020, type: "Flood", name: "Monsoon Flooding", districts: "Ratnapura, Kegalle", impact: "Danger", fatalities: 15, description: "Record 24h rainfall triggered flash floods and landslides." },
  { year: 2019, type: "Landslide", name: "Meeriyabedda Landslide", districts: "Badulla", impact: "Extreme", fatalities: 22, description: "Major landslide following prolonged heavy rains." },
];

const IMPACT_COLORS: Record<string, string> = {
  Extreme: "bg-extreme/20 text-extreme border border-extreme/40",
  Danger: "bg-danger/20 text-danger border border-danger/40",
  Elevated: "bg-elevated/20 text-elevated border border-elevated/40",
  Warning: "bg-warning/20 text-warning border border-warning/40",
};

const EVENT_ICON: Record<string, React.ComponentType<any>> = {
  Cyclone: Wind,
  Flood: Waves,
  Drought: Sun,
  Heatwave: Thermometer,
  Landslide: AlertTriangle,
  Heavy_Rain: Droplets,
};

const MONTHS = ["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"];

// ── Component ────────────────────────────────────────────────────────────────

export default function HistoryPage() {
  const [district, setDistrict] = useState("All Districts");
  const [province, setProvince] = useState("All Provinces");
  const [eventType, setEventType] = useState("All Events");
  const [compareYears, setCompareYears] = useState<string[]>(["2024", "2023"]);
  const [activeTab, setActiveTab] = useState<"temperature" | "rainfall" | "wind" | "events">("temperature");

  const toggleYear = (y: string) => {
    setCompareYears(prev =>
      prev.includes(y)
        ? prev.length > 1 ? prev.filter(x => x !== y) : prev
        : prev.length < 4 ? [...prev, y] : prev
    );
  };

  const PALETTE = ["#38BDF8","#F97316","#10B981","#8B5CF6","#EF4444"];

  // ── Temperature Comparison Chart ─────────────────────────────────────────
  const tempChartOpts = useMemo(() => ({
    tooltip: { trigger: "axis", backgroundColor: "#1E293B", textStyle: { color: "#fff" }, axisPointer: { type: "cross", lineStyle: { color: "#334155" } } },
    legend: { data: compareYears, textStyle: { color: "#94A3B8" }, top: 0 },
    grid: { left: "3%", right: "4%", bottom: "5%", top: "15%", containLabel: true },
    xAxis: { type: "category", data: MONTHS, axisLine: { lineStyle: { color: "#334155" } }, axisLabel: { color: "#94A3B8" } },
    yAxis: { type: "value", axisLine: { show: false }, splitLine: { lineStyle: { color: "#334155", type: "dashed" } }, axisLabel: { formatter: "{value}°C", color: "#94A3B8" }, min: 20 },
    series: compareYears.map((yr, i) => ({
      name: yr,
      type: "line",
      smooth: true,
      data: YEAR_DATA[yr]?.temp ?? [],
      itemStyle: { color: PALETTE[i] },
      lineStyle: { width: 2.5 },
      areaStyle: { color: { type: "linear", x: 0, y: 0, x2: 0, y2: 1, colorStops: [{ offset: 0, color: PALETTE[i] + "44" }, { offset: 1, color: "transparent" }] } },
    })),
  }), [compareYears]);

  // ── Rainfall Chart ────────────────────────────────────────────────────────
  const rainChartOpts = useMemo(() => ({
    tooltip: { trigger: "axis", backgroundColor: "#1E293B", textStyle: { color: "#fff" } },
    legend: { data: compareYears, textStyle: { color: "#94A3B8" }, top: 0 },
    grid: { left: "3%", right: "4%", bottom: "5%", top: "15%", containLabel: true },
    xAxis: { type: "category", data: MONTHS, axisLine: { lineStyle: { color: "#334155" } }, axisLabel: { color: "#94A3B8" } },
    yAxis: { type: "value", axisLine: { show: false }, splitLine: { lineStyle: { color: "#334155", type: "dashed" } }, axisLabel: { formatter: "{value}mm", color: "#94A3B8" } },
    series: compareYears.map((yr, i) => ({
      name: yr,
      type: "bar",
      barGap: "5%",
      data: YEAR_DATA[yr]?.rain ?? [],
      itemStyle: { color: PALETTE[i], borderRadius: [3, 3, 0, 0] },
    })),
  }), [compareYears]);

  // ── Wind Trend Chart ──────────────────────────────────────────────────────
  const windChartOpts = useMemo(() => ({
    tooltip: { trigger: "axis", backgroundColor: "#1E293B", textStyle: { color: "#fff" } },
    grid: { left: "3%", right: "4%", bottom: "5%", top: "10%", containLabel: true },
    xAxis: { type: "category", data: MONTHS, axisLine: { lineStyle: { color: "#334155" } }, axisLabel: { color: "#94A3B8" } },
    yAxis: { type: "value", axisLine: { show: false }, splitLine: { lineStyle: { color: "#334155", type: "dashed" } }, axisLabel: { formatter: "{value} km/h", color: "#94A3B8" } },
    series: compareYears.map((yr, i) => ({
      name: yr,
      type: "line",
      smooth: true,
      data: Array.from({ length: 12 }, () => Math.round(10 + Math.random() * 15)),
      itemStyle: { color: PALETTE[i] },
      lineStyle: { width: 2, type: i === 0 ? "solid" : "dashed" },
    })),
  }), [compareYears]);

  // ── Humidity Heatmap (Static visual) ─────────────────────────────────────
  const humidityHeatData = Array.from({ length: 12 }, (_, m) =>
    Array.from({ length: 5 }, (_, y) => [m, y, Math.round(60 + Math.random() * 35)])
  ).flat();

  const humidityHeatOpts = {
    tooltip: {
      backgroundColor: "#1E293B", textStyle: { color: "#fff" },
      formatter: (p: any) => `${MONTHS[p.data[0]]} ${2020 + p.data[1]}: ${p.data[2]}%`,
    },
    grid: { left: "10%", right: "5%", top: "10%", bottom: "15%" },
    xAxis: { type: "category", data: MONTHS, axisLine: { lineStyle: { color: "#334155" } }, axisLabel: { color: "#94A3B8" } },
    yAxis: { type: "category", data: ["2020","2021","2022","2023","2024"], axisLine: { lineStyle: { color: "#334155" } }, axisLabel: { color: "#94A3B8" } },
    visualMap: { min: 55, max: 95, calculable: true, orient: "horizontal", bottom: 0, left: "center", textStyle: { color: "#94A3B8" }, inRange: { color: ["#0F172A","#2563EB","#38BDF8","#EAB308","#EF4444"] } },
    series: [{ name: "Humidity %", type: "heatmap", data: humidityHeatData, label: { show: false }, emphasis: { itemStyle: { shadowBlur: 10 } } }],
  };

  // ── Filtered Events ───────────────────────────────────────────────────────
  const filteredEvents = CLIMATE_EVENTS.filter(e =>
    eventType === "All Events" || e.type === eventType
  );

  // ── Render ────────────────────────────────────────────────────────────────
  return (
    <div className="flex-1 flex flex-col p-4 md:p-6 lg:p-8 space-y-6">
      <div className="flex flex-col md:flex-row md:items-start justify-between gap-4">
        <PageHeader
          title="Historical Climate Analytics"
          description="Explore Sri Lanka's complete climate archive from 1950–present. Trend analysis, event logs, and year-over-year comparisons."
          icon={<History className="h-8 w-8 text-primary" />}
        />
        <Button
          className="shrink-0 h-11 px-6 rounded-xl bg-primary/20 border border-primary/40 text-primary hover:bg-primary hover:text-white transition-all font-semibold flex items-center gap-2"
        >
          <Download className="h-4 w-4" /> Export Report
        </Button>
      </div>

      {/* ── Filter Bar ── */}
      <div className="glass-card rounded-2xl p-4 flex flex-wrap gap-3 items-center border border-white/5">
        <div className="flex items-center gap-2 text-muted-foreground mr-2">
          <Filter className="h-4 w-4" />
          <span className="text-sm font-medium">Filter:</span>
        </div>
        <FilterSelect
          icon={MapPin}
          value={district}
          options={DISTRICTS}
          onChange={setDistrict}
          label="District"
        />
        <FilterSelect
          icon={MapPin}
          value={province}
          options={PROVINCES}
          onChange={setProvince}
          label="Province"
        />
        <FilterSelect
          icon={AlertTriangle}
          value={eventType}
          options={EVENTS}
          onChange={setEventType}
          label="Event Type"
        />
      </div>

      {/* ── Year Comparison Selector ── */}
      <div className="glass-card rounded-2xl p-5 border border-white/5">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-4">
          <div>
            <h3 className="font-semibold text-white flex items-center gap-2">
              <Calendar className="h-5 w-5 text-secondary" /> Year-over-Year Comparison
            </h3>
            <p className="text-xs text-muted-foreground mt-0.5">Select up to 4 years to compare side by side.</p>
          </div>
          <div className="flex flex-wrap gap-2">
            {YEARS.map((yr) => (
              <button
                key={yr}
                onClick={() => toggleYear(yr)}
                disabled={!compareYears.includes(yr) && compareYears.length >= 4}
                className={`px-3 py-1.5 rounded-lg text-sm font-semibold transition-all border ${
                  compareYears.includes(yr)
                    ? "bg-primary text-white border-primary shadow-[0_0_10px_rgba(37,99,235,0.4)]"
                    : "bg-black/20 text-muted-foreground border-white/10 hover:border-white/30 hover:text-white disabled:opacity-30 disabled:cursor-not-allowed"
                }`}
              >
                {yr}
              </button>
            ))}
          </div>
        </div>

        {/* Tab Switcher */}
        <div className="flex gap-1 p-1 bg-black/30 rounded-xl w-fit mb-5">
          {(["temperature","rainfall","wind","events"] as const).map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`px-4 py-1.5 rounded-lg text-sm font-medium capitalize transition-all ${
                activeTab === tab
                  ? "bg-primary text-white shadow-md"
                  : "text-muted-foreground hover:text-white"
              }`}
            >
              {tab}
            </button>
          ))}
        </div>

        {/* Charts */}
        <AnimatePresence mode="wait">
          <motion.div
            key={activeTab}
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.25 }}
            className="h-[320px] w-full"
          >
            {activeTab === "temperature" && (
              <ReactECharts option={tempChartOpts} style={{ height: "100%", width: "100%" }} />
            )}
            {activeTab === "rainfall" && (
              <ReactECharts option={rainChartOpts} style={{ height: "100%", width: "100%" }} />
            )}
            {activeTab === "wind" && (
              <ReactECharts option={windChartOpts} style={{ height: "100%", width: "100%" }} />
            )}
            {activeTab === "events" && (
              <div className="h-full overflow-y-auto space-y-3 pr-1">
                {filteredEvents.map((event, i) => (
                  <EventRow key={i} event={event} />
                ))}
              </div>
            )}
          </motion.div>
        </AnimatePresence>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Humidity Heatmap */}
        <Card className="glass-card border-white/5">
          <CardContent className="p-6">
            <h3 className="font-semibold text-white text-lg flex items-center gap-2 mb-2">
              <Droplets className="h-5 w-5 text-secondary" /> Humidity Heatmap (2020–2024)
            </h3>
            <p className="text-xs text-muted-foreground mb-4">Monthly relative humidity intensity by year.</p>
            <div className="h-[280px] w-full">
              <ReactECharts option={humidityHeatOpts} style={{ height: "100%", width: "100%" }} />
            </div>
          </CardContent>
        </Card>

        {/* Trend Summary Cards */}
        <div className="space-y-4">
          <h3 className="font-semibold text-white text-lg flex items-center gap-2">
            <BarChart3 className="h-5 w-5 text-primary" /> Decadal Trend Summary
          </h3>
          <div className="grid grid-cols-2 gap-4">
            <TrendCard title="Avg Temperature" value="+1.4°C" trend="up" detail="vs 2010 baseline" color="text-danger" />
            <TrendCard title="Annual Rainfall" value="-8.2%" trend="down" detail="vs 10-yr average" color="text-warning" />
            <TrendCard title="Extreme Events" value="+42%" trend="up" detail="since 2015" color="text-elevated" />
            <TrendCard title="Sea Level Rise" value="+3.2mm/yr" trend="up" detail="coastal monitoring" color="text-danger" />
            <TrendCard title="Forest Cover" value="-3.8%" trend="down" detail="since 2010" color="text-warning" />
            <TrendCard title="Cyclone Frequency" value="+28%" trend="up" detail="Bay of Bengal" color="text-extreme" />
          </div>
        </div>
      </div>

      {/* Event Table */}
      <Card className="glass-card border-white/5">
        <CardContent className="p-6">
          <div className="flex items-center justify-between mb-6">
            <h3 className="font-semibold text-white text-lg flex items-center gap-2">
              <CloudLightning className="h-5 w-5 text-warning" /> Major Climate Events Archive
            </h3>
            <Button size="sm" className="bg-black/30 border border-white/10 text-white hover:bg-white/10 rounded-xl gap-2">
              <Download className="h-4 w-4" /> Download CSV
            </Button>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-white/10 text-left">
                  <th className="pb-3 text-muted-foreground font-medium uppercase tracking-wider text-xs pr-4">Year</th>
                  <th className="pb-3 text-muted-foreground font-medium uppercase tracking-wider text-xs pr-4">Event</th>
                  <th className="pb-3 text-muted-foreground font-medium uppercase tracking-wider text-xs pr-4">Name</th>
                  <th className="pb-3 text-muted-foreground font-medium uppercase tracking-wider text-xs pr-4">Districts Affected</th>
                  <th className="pb-3 text-muted-foreground font-medium uppercase tracking-wider text-xs pr-4">Impact</th>
                  <th className="pb-3 text-muted-foreground font-medium uppercase tracking-wider text-xs">Fatalities</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/5">
                {filteredEvents.map((event, i) => (
                  <motion.tr
                    key={i}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: i * 0.05 }}
                    className="hover:bg-white/5 transition-colors group"
                  >
                    <td className="py-3 pr-4 text-white font-semibold">{event.year}</td>
                    <td className="py-3 pr-4">
                      <span className="flex items-center gap-2 text-muted-foreground">
                        {React.createElement(EVENT_ICON[event.type] ?? AlertTriangle, { className: "h-4 w-4" })}
                        {event.type}
                      </span>
                    </td>
                    <td className="py-3 pr-4 text-white">{event.name}</td>
                    <td className="py-3 pr-4 text-muted-foreground text-xs max-w-[180px] truncate">{event.districts}</td>
                    <td className="py-3 pr-4">
                      <span className={`text-xs font-bold px-2 py-0.5 rounded uppercase ${IMPACT_COLORS[event.impact]}`}>
                        {event.impact}
                      </span>
                    </td>
                    <td className="py-3 text-white font-semibold">
                      {event.fatalities > 0 ? (
                        <span className="text-danger">{event.fatalities}</span>
                      ) : (
                        <span className="text-safe">0</span>
                      )}
                    </td>
                  </motion.tr>
                ))}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

// ── Sub-components ────────────────────────────────────────────────────────────

function FilterSelect({ icon: Icon, value, options, onChange, label }: {
  icon: React.ComponentType<any>; value: string; options: string[]; onChange: (v: string) => void; label: string;
}) {
  return (
    <div className="relative">
      <div className="flex items-center gap-2 bg-black/30 border border-white/10 rounded-xl px-3 py-2 cursor-pointer hover:border-white/30 transition-all">
        <Icon className="h-3.5 w-3.5 text-muted-foreground" />
        <select
          value={value}
          onChange={(e) => onChange(e.target.value)}
          className="bg-transparent text-sm text-white border-none outline-none cursor-pointer appearance-none pr-6"
          style={{ backgroundImage: "none" }}
        >
          {options.map(o => <option key={o} value={o} style={{ background: "#1E293B" }}>{o}</option>)}
        </select>
        <ChevronDown className="h-3.5 w-3.5 text-muted-foreground absolute right-3 pointer-events-none" />
      </div>
    </div>
  );
}

function EventRow({ event }: { event: typeof CLIMATE_EVENTS[0] }) {
  const Icon = EVENT_ICON[event.type] ?? AlertTriangle;
  return (
    <div className="bg-black/20 rounded-xl p-4 border border-white/5 flex gap-4 items-start hover:bg-white/5 transition-colors">
      <div className="h-10 w-10 rounded-full bg-white/5 flex items-center justify-center shrink-0">
        <Icon className="h-5 w-5 text-muted-foreground" />
      </div>
      <div className="flex-1 min-w-0">
        <div className="flex items-center justify-between gap-2 mb-1">
          <span className="font-semibold text-white truncate">{event.year} — {event.name}</span>
          <span className={`text-xs font-bold px-2 py-0.5 rounded uppercase shrink-0 ${IMPACT_COLORS[event.impact]}`}>
            {event.impact}
          </span>
        </div>
        <p className="text-xs text-muted-foreground">{event.description}</p>
        <p className="text-xs text-primary/70 mt-1">📍 {event.districts}</p>
      </div>
    </div>
  );
}

function TrendCard({ title, value, trend, detail, color }: {
  title: string; value: string; trend: "up" | "down"; detail: string; color: string;
}) {
  return (
    <Card className="glass-card border-white/5 hover:-translate-y-1 transition-transform duration-300">
      <CardContent className="p-4">
        <div className="flex items-start justify-between mb-2">
          <span className="text-xs text-muted-foreground uppercase tracking-wider font-medium leading-tight">{title}</span>
          {trend === "up"
            ? <TrendingUp className={`h-4 w-4 shrink-0 ${color}`} />
            : <TrendingDown className={`h-4 w-4 shrink-0 ${color}`} />}
        </div>
        <div className={`text-xl font-bold ${color} mb-1`}>{value}</div>
        <div className="text-xs text-muted-foreground">{detail}</div>
      </CardContent>
    </Card>
  );
}
