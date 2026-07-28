"use client";

import React, { useState, useEffect } from "react";
import { PageHeader } from "@/components/layout/PageHeader";
import { 
  AlertTriangle, Waves, Tornado, CloudRain, Wind, Sun, 
  CloudLightning, Flame, Phone, MapPin, Clock, ShieldAlert,
  ChevronRight, Building
} from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { motion, AnimatePresence } from "framer-motion";

const DISASTERS = [
  { id: "cyclones", title: "Cyclones", icon: Tornado, risk: "extreme", color: "text-extreme", bg: "bg-extreme", border: "border-extreme" },
  { id: "floods", title: "Floods", icon: Waves, risk: "danger", color: "text-danger", bg: "bg-danger", border: "border-danger" },
  { id: "landslides", title: "Landslides", icon: AlertTriangle, risk: "elevated", color: "text-elevated", bg: "bg-elevated", border: "border-elevated" },
  { id: "rain", title: "Extreme Rain", icon: CloudRain, risk: "warning", color: "text-warning", bg: "bg-warning", border: "border-warning" },
  { id: "wind", title: "Strong Winds", icon: Wind, risk: "safe", color: "text-safe", bg: "bg-safe", border: "border-safe" },
  { id: "heat", title: "Heatwaves", icon: Sun, risk: "safe", color: "text-safe", bg: "bg-safe", border: "border-safe" },
  { id: "lightning", title: "Lightning", icon: CloudLightning, risk: "warning", color: "text-warning", bg: "bg-warning", border: "border-warning" },
  { id: "surge", title: "Storm Surge", icon: Waves, risk: "elevated", color: "text-elevated", bg: "bg-elevated", border: "border-elevated" },
  { id: "fires", title: "Forest Fires", icon: Flame, risk: "safe", color: "text-safe", bg: "bg-safe", border: "border-safe" },
  { id: "drought", title: "Drought", icon: Sun, risk: "warning", color: "text-warning", bg: "bg-warning", border: "border-warning" },
];

const DISASTER_DATA: Record<string, any> = {
  cyclones: {
    status: "Severe Cyclonic Storm 'Mocha' Forming",
    riskLevel: "EXTREME",
    districts: [
      { name: "Jaffna", severity: "Extreme", pop: "150k at risk" },
      { name: "Trincomalee", severity: "Extreme", pop: "80k at risk" },
      { name: "Batticaloa", severity: "Danger", pop: "120k at risk" }
    ],
    timeline: [
      { time: "08:00 AM", event: "Depression upgraded to Cyclonic Storm." },
      { time: "02:00 PM", event: "Red Alert issued for Northern Province." },
      { time: "11:00 PM (Predicted)", event: "Expected landfall near Jaffna Peninsula." }
    ],
    recommendations: [
      "Evacuate coastal areas immediately.",
      "Secure loose objects and board up windows.",
      "Stockpile 3 days of non-perishable food and water."
    ],
    contacts: [
      { name: "Disaster Management Centre", number: "117" },
      { name: "Navy Rescue", number: "011-2445368" }
    ],
    shelters: [
      { name: "Jaffna Central College", capacity: 1500, status: "Open" },
      { name: "Trincomalee Base Hospital (Safe Zone)", capacity: 800, status: "Open" }
    ]
  },
  floods: {
    status: "Kelani River Overflow - Minor Flooding",
    riskLevel: "DANGER",
    districts: [
      { name: "Colombo", severity: "Danger", pop: "45k at risk" },
      { name: "Gampaha", severity: "Elevated", pop: "20k at risk" }
    ],
    timeline: [
      { time: "06:00 AM", event: "Kelani river level reached 5.2m." },
      { time: "09:30 AM", event: "Spill gates opened at Castlereagh." }
    ],
    recommendations: [
      "Move electrical appliances to higher ground.",
      "Avoid driving through flooded roads.",
      "Boil all drinking water."
    ],
    contacts: [
      { name: "Disaster Management Centre", number: "117" },
      { name: "Police Emergency", number: "119" }
    ],
    shelters: [
      { name: "Kolonnawa Temple Hall", capacity: 300, status: "Open" }
    ]
  },
  landslides: {
    status: "Soil Saturation High in Central Highlands",
    riskLevel: "ELEVATED",
    districts: [
      { name: "Ratnapura", severity: "Elevated", pop: "12k at risk" },
      { name: "Kegalle", severity: "Warning", pop: "8k at risk" }
    ],
    timeline: [
      { time: "Yesterday", event: "150mm rainfall recorded in 24h." },
      { time: "07:00 AM", event: "NBRO issued Level 2 Landslide Warning." }
    ],
    recommendations: [
      "Look for cracks on walls or sudden springs of water.",
      "Evacuate immediately if rumbling sounds are heard."
    ],
    contacts: [
      { name: "NBRO Emergency", number: "011-2588946" },
      { name: "Disaster Management Centre", number: "117" }
    ],
    shelters: [
      { name: "Ratnapura Town Hall", capacity: 500, status: "Standby" }
    ]
  }
};

export default function DisasterPage() {
  const [mounted, setMounted] = useState(false);
  const [activeDisaster, setActiveDisaster] = useState(DISASTERS[0]);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  // Fallback data for disasters without specific mock data
  const data = DISASTER_DATA[activeDisaster.id] || {
    status: "Standard Monitoring Active",
    riskLevel: activeDisaster.risk.toUpperCase(),
    districts: [{ name: "All Provinces", severity: activeDisaster.risk.charAt(0).toUpperCase() + activeDisaster.risk.slice(1), pop: "N/A" }],
    timeline: [{ time: "Current", event: "Continuous monitoring by DMC." }],
    recommendations: ["Stay tuned to official broadcasts.", "Maintain standard emergency kits."],
    contacts: [{ name: "Disaster Management Centre", number: "117" }],
    shelters: [{ name: "Designated District Centres", capacity: "Unknown", status: "Standby" }]
  };

  return (
    <div className="flex-1 flex flex-col p-4 md:p-6 lg:p-8 space-y-6">
      
      {/* Global EOC Banner */}
      <motion.div 
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="w-full bg-extreme/10 border border-extreme/50 rounded-2xl p-4 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 relative overflow-hidden"
      >
        <div className="absolute inset-0 bg-extreme/5 animate-pulse" />
        <div className="flex items-center gap-4 relative z-10">
          <div className="h-12 w-12 rounded-full bg-extreme/20 flex items-center justify-center">
            <ShieldAlert className="h-6 w-6 text-extreme animate-bounce" />
          </div>
          <div>
            <span className="text-extreme font-bold tracking-widest uppercase text-sm flex items-center gap-2">
              <span className="h-2 w-2 rounded-full bg-extreme animate-ping" /> National Red Alert
            </span>
            <p className="text-white font-medium">Severe Cyclonic Storm forming in the Bay of Bengal. Immediate evacuation orders active for Northern coastal regions.</p>
          </div>
        </div>
        <Button variant="destructive" className="relative z-10 shrink-0 bg-extreme hover:bg-extreme/90 text-white font-bold">
          View Emergency Protocol
        </Button>
      </motion.div>

      <PageHeader 
        title="Disaster Intelligence Centre" 
        description="National Emergency Operations Dashboard tracking 10 distinct hazard categories in real-time."
        icon={<AlertTriangle className="h-8 w-8 text-danger" />} 
      />

      <div className="grid grid-cols-1 xl:grid-cols-12 gap-6 h-full">
        
        {/* Left Sidebar - Threat Matrix */}
        <div className="xl:col-span-3 space-y-3">
          <h3 className="text-sm font-bold text-white uppercase tracking-widest mb-4">Threat Matrix</h3>
          <div className="grid grid-cols-2 xl:grid-cols-1 gap-3">
            {DISASTERS.map((disaster) => {
              const isActive = activeDisaster.id === disaster.id;
              return (
                <button
                  key={disaster.id}
                  onClick={() => setActiveDisaster(disaster)}
                  className={`flex items-center gap-3 p-3 rounded-xl border transition-all ${
                    isActive 
                      ? `bg-${disaster.color.split('-')[1]}/20 border-${disaster.color.split('-')[1]}/50 shadow-[0_0_15px_rgba(0,0,0,0.2)]` 
                      : 'bg-black/20 border-white/5 hover:bg-white/5'
                  }`}
                >
                  <disaster.icon className={`h-5 w-5 ${disaster.color}`} />
                  <span className={`font-medium text-sm flex-1 text-left ${isActive ? 'text-white' : 'text-muted-foreground'}`}>{disaster.title}</span>
                  {disaster.risk !== 'safe' && (
                    <span className={`h-2 w-2 rounded-full ${disaster.bg}`} />
                  )}
                </button>
              )
            })}
          </div>
        </div>

        {/* Center/Right - EOC Main Panel */}
        <div className="xl:col-span-9 flex flex-col gap-6">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeDisaster.id}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.3 }}
              className="space-y-6"
            >
              {/* Status Header */}
              <Card className={`glass-card border-${activeDisaster.color.split('-')[1]}/30 overflow-hidden relative`}>
                <div className={`absolute top-0 left-0 w-2 h-full ${activeDisaster.bg}`} />
                <CardContent className="p-8 flex flex-col md:flex-row items-start md:items-center justify-between gap-6 relative z-10">
                  <div>
                    <span className={`inline-block px-3 py-1 rounded-full text-xs font-bold uppercase tracking-widest mb-3 ${activeDisaster.bg}/20 ${activeDisaster.color} border ${activeDisaster.border}/50`}>
                      Risk Level: {data.riskLevel}
                    </span>
                    <h2 className="text-3xl font-bold text-white mb-2">{data.status}</h2>
                    <p className="text-muted-foreground flex items-center gap-2">
                      <activeDisaster.icon className="h-4 w-4" /> Monitoring {activeDisaster.title} Intelligence
                    </p>
                  </div>
                  <div className="h-24 w-24 rounded-full bg-black/40 border border-white/10 flex items-center justify-center shrink-0">
                    <activeDisaster.icon className={`h-12 w-12 ${activeDisaster.color}`} />
                  </div>
                </CardContent>
              </Card>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                
                {/* Affected Districts */}
                <Card className="glass-card border-white/5">
                  <CardContent className="p-6">
                    <h3 className="text-lg font-bold text-white mb-4 flex items-center gap-2">
                      <MapPin className="h-5 w-5 text-secondary" /> Affected Districts
                    </h3>
                    <div className="space-y-3">
                      {data.districts.map((d: any, i: number) => (
                        <div key={i} className="bg-black/20 rounded-xl p-3 border border-white/5 flex items-center justify-between">
                          <div>
                            <div className="text-white font-semibold">{d.name}</div>
                            <div className="text-xs text-muted-foreground">{d.pop}</div>
                          </div>
                          <span className={`text-xs font-bold px-2 py-1 rounded uppercase bg-${getSeverityColor(d.severity)}/20 text-${getSeverityColor(d.severity)}`}>
                            {d.severity}
                          </span>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>

                {/* Timeline */}
                <Card className="glass-card border-white/5">
                  <CardContent className="p-6">
                    <h3 className="text-lg font-bold text-white mb-4 flex items-center gap-2">
                      <Clock className="h-5 w-5 text-primary" /> Incident Timeline
                    </h3>
                    <div className="relative border-l border-white/10 ml-3 space-y-6 pb-2">
                      {data.timeline.map((item: any, i: number) => (
                        <div key={i} className="relative pl-6">
                          <div className={`absolute -left-1.5 top-1.5 h-3 w-3 rounded-full border-2 border-[#1E293B] ${i === 0 ? activeDisaster.bg : 'bg-muted-foreground'}`} />
                          <div className="text-xs font-bold text-primary mb-1">{item.time}</div>
                          <div className="text-sm text-white/90">{item.event}</div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>

                {/* Recommendations */}
                <Card className="glass-card border-white/5">
                  <CardContent className="p-6">
                    <h3 className="text-lg font-bold text-white mb-4 flex items-center gap-2">
                      <ShieldAlert className="h-5 w-5 text-warning" /> Official Recommendations
                    </h3>
                    <ul className="space-y-3">
                      {data.recommendations.map((rec: string, i: number) => (
                        <li key={i} className="flex items-start gap-3 text-sm text-white/80 bg-black/20 p-3 rounded-lg border border-white/5">
                          <ChevronRight className={`h-5 w-5 shrink-0 ${activeDisaster.color}`} />
                          <span>{rec}</span>
                        </li>
                      ))}
                    </ul>
                  </CardContent>
                </Card>

                {/* Contacts & Shelters */}
                <Card className="glass-card border-white/5 flex flex-col gap-4">
                  <CardContent className="p-6 pb-2">
                    <h3 className="text-lg font-bold text-white mb-4 flex items-center gap-2">
                      <Phone className="h-5 w-5 text-safe" /> Emergency Contacts
                    </h3>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-6">
                      {data.contacts.map((contact: any, i: number) => (
                        <div key={i} className="bg-safe/10 border border-safe/20 rounded-xl p-3 flex flex-col items-center text-center">
                          <span className="text-xs text-muted-foreground mb-1">{contact.name}</span>
                          <span className="text-xl font-bold text-safe">{contact.number}</span>
                        </div>
                      ))}
                    </div>

                    <h3 className="text-lg font-bold text-white mb-4 flex items-center gap-2 pt-2 border-t border-white/10">
                      <Building className="h-5 w-5 text-elevated" /> Shelter Locations
                    </h3>
                    <div className="space-y-2">
                      {data.shelters.map((shelter: any, i: number) => (
                        <div key={i} className="flex items-center justify-between bg-black/20 p-2.5 rounded-lg border border-white/5 text-sm">
                          <span className="text-white">{shelter.name}</span>
                          <div className="flex items-center gap-3">
                            <span className="text-xs text-muted-foreground">Cap: {shelter.capacity}</span>
                            <span className={`text-xs font-bold ${shelter.status === 'Open' ? 'text-safe' : 'text-warning'}`}>{shelter.status}</span>
                          </div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </div>

            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
}

// Helper to map severity string to tailwind color string
function getSeverityColor(severity: string) {
  switch(severity.toLowerCase()) {
    case 'extreme': return 'extreme';
    case 'danger': return 'danger';
    case 'elevated': return 'elevated';
    case 'warning': return 'warning';
    default: return 'safe';
  }
}
