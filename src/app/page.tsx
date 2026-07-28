"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import { 
  ThermometerSun, Droplets, Wind, Activity, Sun, AlertTriangle, 
  Map as MapIcon, Cloud, ArrowRight, ShieldCheck, Database, Zap, 
  TreePine, Sprout, BarChart3, CloudRain, ChevronRight
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";

// Simulated Dynamic Stats
const useDynamicStats = () => {
  const [stats, setStats] = useState({
    temp: 29.4,
    highTemp: 34.2,
    rainfall: 12.5,
    humidity: 78,
    windSpeed: 14,
    aqi: 45,
    uv: 8,
    alerts: 3
  });

  useEffect(() => {
    const interval = setInterval(() => {
      setStats(prev => ({
        ...prev,
        temp: +(prev.temp + (Math.random() - 0.5) * 0.2).toFixed(1),
        humidity: Math.max(0, Math.min(100, Math.round(prev.humidity + (Math.random() - 0.5) * 2))),
        windSpeed: Math.max(0, +(prev.windSpeed + (Math.random() - 0.5)).toFixed(1)),
      }));
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  return stats;
};

// Weather Particles component
const WeatherParticles = () => {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none opacity-30 z-0">
      {[...Array(20)].map((_, i) => (
        <motion.div
          key={i}
          className="absolute bg-white/20 rounded-full"
          style={{
            width: Math.random() * 4 + 1 + 'px',
            height: Math.random() * 4 + 1 + 'px',
            left: Math.random() * 100 + '%',
            top: -10,
          }}
          animate={{
            y: ['0vh', '100vh'],
            x: [(Math.random() - 0.5) * 50, (Math.random() - 0.5) * 100],
            opacity: [0, 1, 0],
          }}
          transition={{
            duration: Math.random() * 10 + 10,
            repeat: Infinity,
            ease: "linear",
            delay: Math.random() * 20,
          }}
        />
      ))}
    </div>
  );
};

export default function LandingPage() {
  const stats = useDynamicStats();
  const [mounted, setMounted] = useState(false);

  useEffect(() => setMounted(true), []);

  if (!mounted) return null;

  return (
    <div className="flex flex-col min-h-screen">
      {/* Hero Section */}
      <section className="relative min-h-[90vh] flex flex-col items-center justify-center pt-20 pb-16 overflow-hidden">
        {/* Animated Map Background */}
        <div className="absolute inset-0 z-0 flex items-center justify-center opacity-30">
          <motion.div 
            className="w-[800px] h-[1000px] absolute"
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 2, ease: "easeOut" }}
          >
             <svg viewBox="0 0 200 300" className="w-full h-full drop-shadow-[0_0_50px_rgba(37,99,235,0.4)]">
              <path 
                d="M 100 20 C 130 50, 160 100, 140 180 C 120 260, 90 280, 80 280 C 60 280, 50 250, 40 200 C 30 150, 50 80, 100 20 Z" 
                fill="none" 
                stroke="#38BDF8" 
                strokeWidth="0.5"
                className="animate-[dash_20s_linear_infinite]"
                strokeDasharray="4 4"
              />
              <path 
                d="M 100 20 C 130 50, 160 100, 140 180 C 120 260, 90 280, 80 280 C 60 280, 50 250, 40 200 C 30 150, 50 80, 100 20 Z" 
                fill="url(#mapGrad)" 
                opacity="0.2"
              />
              <defs>
                <radialGradient id="mapGrad" cx="50%" cy="50%" r="50%">
                  <stop offset="0%" stopColor="#2563EB" />
                  <stop offset="100%" stopColor="#0F172A" />
                </radialGradient>
              </defs>
            </svg>
          </motion.div>
          {/* Subtle Radar sweep */}
          <motion.div 
            className="absolute inset-0 origin-center rounded-full border-t border-primary/20 bg-gradient-to-t from-transparent to-primary/5"
            style={{ width: '150vh', height: '150vh' }}
            animate={{ rotate: 360 }}
            transition={{ duration: 15, repeat: Infinity, ease: "linear" }}
          />
        </div>
        
        <WeatherParticles />

        <div className="relative z-10 max-w-5xl mx-auto px-4 text-center space-y-8 mt-12">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
          >
            <span className="inline-block py-1.5 px-4 rounded-full bg-primary/10 border border-primary/20 text-primary text-sm font-medium mb-6 uppercase tracking-widest backdrop-blur-md">
              National Environmental Platform
            </span>
            <h1 className="text-5xl md:text-7xl font-bold tracking-tight text-white mb-6 leading-tight">
              Real-Time <span className="text-gradient">Climate Intelligence</span><br/> for Sri Lanka
            </h1>
            <p className="text-lg md:text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
              Monitor weather patterns, climate change anomalies, El Niño impacts, environmental conditions, and disaster risks from a single, unified enterprise platform.
            </p>
          </motion.div>

          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4"
          >
            <Button size="lg" className="w-full sm:w-auto h-14 px-8 text-base font-semibold rounded-full bg-primary hover:bg-primary/90 text-white shadow-[0_0_20px_rgba(37,99,235,0.4)] group" asChild>
              <Link href="/map">
                Explore Live Map 
                <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
              </Link>
            </Button>
            <Button size="lg" variant="outline" className="w-full sm:w-auto h-14 px-8 text-base font-semibold rounded-full border-white/20 bg-black/40 backdrop-blur-md text-white hover:bg-white/10" asChild>
              <Link href="/weather">
                <Cloud className="mr-2 h-5 w-5" /> View Weather
              </Link>
            </Button>
          </motion.div>
        </div>

        {/* Scroll Indicator */}
        <motion.div 
          className="absolute bottom-10 left-1/2 -translate-x-1/2 z-10 text-white/50 flex flex-col items-center gap-2"
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 2, repeat: Infinity }}
        >
          <span className="text-xs uppercase tracking-widest font-medium">Scroll Data</span>
          <div className="w-[1px] h-12 bg-gradient-to-b from-white/50 to-transparent" />
        </motion.div>
      </section>

      {/* Dynamic Statistics Strip */}
      <section className="relative z-20 -mt-8 px-4 md:px-8 max-w-[1400px] mx-auto w-full">
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-8 gap-3 md:gap-4">
          <StatCard title="National Avg" value={`${stats.temp}°C`} icon={ThermometerSun} color="text-warning" />
          <StatCard title="Highest Today" value={`${stats.highTemp}°C`} icon={Sun} color="text-danger" />
          <StatCard title="Rainfall" value={`${stats.rainfall}mm`} icon={CloudRain} color="text-primary" />
          <StatCard title="Humidity" value={`${stats.humidity}%`} icon={Droplets} color="text-secondary" />
          <StatCard title="Wind Speed" value={`${stats.windSpeed} km/h`} icon={Wind} color="text-muted-foreground" />
          <StatCard title="Air Quality" value={stats.aqi} icon={Activity} color="text-safe" subtitle="Good" />
          <StatCard title="UV Index" value={stats.uv} icon={Sun} color="text-warning" subtitle="High" />
          <StatCard title="Active Alerts" value={stats.alerts} icon={AlertTriangle} color="text-danger" alert />
        </div>
      </section>

      {/* Why Lanka Climate Hub */}
      <section className="py-24 px-4 md:px-8 max-w-7xl mx-auto relative z-10">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-5xl font-bold text-white mb-6 tracking-tight">Enterprise-Grade Architecture</h2>
          <p className="text-muted-foreground max-w-2xl mx-auto text-lg">Designed for national resilience, providing unparalleled access to critical environmental data and predictive modeling.</p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          <FeatureCard 
            icon={Database} 
            title="Unified Data Lake" 
            description="Aggregates satellite telemetry, ground sensors, and marine buoys into a single truth-source."
          />
          <FeatureCard 
            icon={Zap} 
            title="Real-Time Processing" 
            description="Sub-second latency on severe weather updates and intelligence dashboard rendering."
          />
          <FeatureCard 
            icon={ShieldCheck} 
            title="Government Grade" 
            description="Built securely to handle sensitive national disaster frameworks and emergency protocols."
          />
        </div>
      </section>

      {/* Sector Deep Dives */}
      <section className="py-24 relative overflow-hidden bg-[#1E293B]/20 border-y border-white/5">
        <div className="max-w-7xl mx-auto px-4 md:px-8 relative z-10">
          <div className="flex flex-col md:flex-row justify-between items-end mb-12 gap-6">
            <div>
              <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">Intelligence Across Sectors</h2>
              <p className="text-muted-foreground max-w-xl">Dedicated environments tailored for specific national industries and monitoring requirements.</p>
            </div>
            <Button variant="link" className="text-primary" asChild>
              <Link href="/intelligence">View All Sectors <ChevronRight className="ml-1 h-4 w-4" /></Link>
            </Button>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            <SectorCard href="/disaster" icon={AlertTriangle} title="Disaster Preparedness" color="from-danger/20 to-danger/5" />
            <SectorCard href="/agriculture" icon={Sprout} title="Agriculture Support" color="from-safe/20 to-safe/5" />
            <SectorCard href="/environment" icon={TreePine} title="Environmental Monitoring" color="from-primary/20 to-primary/5" />
            <SectorCard href="/map" icon={BarChart3} title="Real-time Analytics" color="from-secondary/20 to-secondary/5" />
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="py-32 px-4 text-center relative z-10">
        <div className="max-w-3xl mx-auto glass p-12 rounded-3xl border border-white/10 relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-b from-primary/10 to-transparent" />
          <Globe className="h-16 w-16 text-primary mx-auto mb-6 opacity-80" />
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">Ready to explore the data?</h2>
          <p className="text-muted-foreground mb-8 text-lg">Access Sri Lanka's most comprehensive climate and environmental intelligence platform today.</p>
          <Button size="lg" className="rounded-full h-12 px-8 bg-white text-black hover:bg-white/90 font-bold">
            Open Dashboard
          </Button>
        </div>
      </section>
    </div>
  );
}

// Subcomponents

function StatCard({ title, value, icon: Icon, color, subtitle, alert }: any) {
  return (
    <motion.div 
      whileHover={{ y: -5 }}
      className={`glass-card rounded-2xl p-4 flex flex-col justify-between border ${alert ? 'border-danger/50 shadow-[0_0_15px_rgba(239,68,68,0.2)]' : 'border-white/5'}`}
    >
      <div className="flex justify-between items-start mb-4">
        <span className="text-xs font-medium text-muted-foreground uppercase tracking-wider">{title}</span>
        <Icon className={`h-4 w-4 ${color}`} />
      </div>
      <div>
        <div className="flex items-baseline gap-2">
          <span className="text-xl md:text-2xl font-bold text-white tracking-tight">{value}</span>
          {subtitle && <span className={`text-xs font-semibold ${color}`}>{subtitle}</span>}
        </div>
      </div>
    </motion.div>
  );
}

function FeatureCard({ icon: Icon, title, description }: any) {
  return (
    <Card className="glass-card border-none bg-black/20 hover:bg-white/5 transition-colors duration-500">
      <CardContent className="p-8">
        <div className="h-12 w-12 rounded-2xl bg-primary/20 flex items-center justify-center mb-6 border border-primary/30">
          <Icon className="h-6 w-6 text-primary" />
        </div>
        <h3 className="text-xl font-bold text-white mb-3">{title}</h3>
        <p className="text-muted-foreground leading-relaxed text-sm">{description}</p>
      </CardContent>
    </Card>
  );
}

function SectorCard({ href, icon: Icon, title, color }: any) {
  return (
    <Link href={href} className="group block">
      <Card className={`glass border-white/5 relative overflow-hidden h-full transition-all duration-300 hover:border-white/20 hover:-translate-y-1`}>
        <div className={`absolute inset-0 bg-gradient-to-br ${color} opacity-20 group-hover:opacity-40 transition-opacity`} />
        <CardContent className="p-6 flex flex-col items-start relative z-10 h-full">
          <Icon className="h-8 w-8 text-white mb-auto pb-4" />
          <h3 className="text-lg font-bold text-white mt-8 group-hover:text-primary transition-colors">{title}</h3>
        </CardContent>
      </Card>
    </Link>
  );
}
