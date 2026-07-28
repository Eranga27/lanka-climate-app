"use client";

import { Info, Globe, Shield, Users, Zap, Database, Heart, Github, ExternalLink, Mail } from "lucide-react";
import { PageHeader } from "@/components/layout/PageHeader";
import { Card, CardContent } from "@/components/ui/card";
import { motion } from "framer-motion";

const STATS = [
  { value: "25+", label: "Districts Monitored" },
  { value: "15", label: "Data Modules" },
  { value: "Real-Time", label: "Data Refresh" },
  { value: "100%", label: "Open Platform" },
];

const PILLARS = [
  {
    icon: Shield,
    color: "text-safe",
    bg: "bg-safe/10 border-safe/20",
    title: "Government-Grade Security",
    desc: "Built to meet national cybersecurity standards for critical infrastructure platforms.",
  },
  {
    icon: Zap,
    color: "text-warning",
    bg: "bg-warning/10 border-warning/20",
    title: "Real-Time Intelligence",
    desc: "Live telemetry from weather stations, satellite feeds, buoys and air quality sensors across the island.",
  },
  {
    icon: Database,
    color: "text-primary",
    bg: "bg-primary/10 border-primary/20",
    title: "Unified Data Lake",
    desc: "All climate domains — weather, disaster, environment, marine — unified in a single intelligent platform.",
  },
  {
    icon: Users,
    color: "text-secondary",
    bg: "bg-secondary/10 border-secondary/20",
    title: "Built for Everyone",
    desc: "Designed for government agencies, researchers, farmers, fishers, tourists and the general public equally.",
  },
];

const PARTNERS = [
  { name: "Department of Meteorology", abbr: "DOM", country: "Sri Lanka" },
  { name: "Disaster Management Centre", abbr: "DMC", country: "Sri Lanka" },
  { name: "National Building Research Organisation", abbr: "NBRO", country: "Sri Lanka" },
  { name: "Central Environmental Authority", abbr: "CEA", country: "Sri Lanka" },
  { name: "World Meteorological Organization", abbr: "WMO", country: "International" },
  { name: "NOAA Climate Prediction Center", abbr: "NOAA", country: "USA" },
];

const TEAM_ROLES = [
  "Climate Scientists",
  "Software Engineers",
  "GIS Specialists",
  "Data Analysts",
  "UI/UX Designers",
  "Emergency Response Advisors",
];

const containerVariants = {
  hidden: {},
  show: { transition: { staggerChildren: 0.1 } },
};
const itemVariants = {
  hidden: { opacity: 0, y: 16 },
  show:  { opacity: 1, y: 0, transition: { duration: 0.4 } },
};

export default function AboutPage() {
  return (
    <div className="flex-1 flex flex-col p-4 md:p-6 lg:p-8 space-y-8">
      <PageHeader
        title="About Lanka Climate Hub"
        description="Sri Lanka's central climate intelligence and environmental monitoring platform — built for resilience, transparency and national development."
        icon={<Info className="h-7 w-7 text-primary" />}
      />

      {/* Mission Statement */}
      <Card className="glass-card border-primary/20 bg-primary/5 relative overflow-hidden">
        <div className="absolute -right-16 -top-16 opacity-5">
          <Globe className="h-64 w-64 text-primary" />
        </div>
        <CardContent className="p-8 relative z-10">
          <div className="flex items-center gap-2 mb-4">
            <Globe className="h-5 w-5 text-primary" />
            <span className="text-sm font-bold text-primary uppercase tracking-widest">Our Mission</span>
          </div>
          <h2 className="text-2xl md:text-3xl font-bold text-white mb-4 leading-snug max-w-3xl">
            Making climate intelligence accessible to every Sri Lankan — from the government minister to the fishing village.
          </h2>
          <p className="text-muted-foreground leading-relaxed max-w-2xl">
            Lanka Climate Hub was founded on the belief that democratising access to accurate, real-time environmental data is essential for building a climate-resilient nation. By unifying fragmented data sources into a single, intuitive platform, we empower decision-makers, communities and individuals to act on the best available climate intelligence.
          </p>
        </CardContent>
      </Card>

      {/* Platform Statistics */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {STATS.map((stat, i) => (
          <motion.div
            key={stat.label}
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: i * 0.08 }}
            className="glass-card rounded-2xl border-white/5 p-6 text-center"
          >
            <div className="text-3xl font-bold text-gradient mb-1">{stat.value}</div>
            <div className="text-xs text-muted-foreground uppercase tracking-wider font-medium">{stat.label}</div>
          </motion.div>
        ))}
      </div>

      {/* Platform Pillars */}
      <div>
        <h2 className="text-xl font-bold text-white mb-5 flex items-center gap-2">
          <Zap className="h-5 w-5 text-warning" /> Platform Foundations
        </h2>
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="show"
          className="grid grid-cols-1 md:grid-cols-2 gap-5"
        >
          {PILLARS.map((pillar) => (
            <motion.div key={pillar.title} variants={itemVariants}>
              <Card className="glass-card border-white/5 h-full hover:-translate-y-1 transition-all duration-300">
                <CardContent className="p-6 flex gap-4">
                  <div className={`h-12 w-12 rounded-2xl shrink-0 flex items-center justify-center border ${pillar.bg}`}>
                    <pillar.icon className={`h-6 w-6 ${pillar.color}`} />
                  </div>
                  <div>
                    <h3 className="font-bold text-white mb-1.5">{pillar.title}</h3>
                    <p className="text-sm text-muted-foreground leading-relaxed">{pillar.desc}</p>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </motion.div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Partner Organisations */}
        <Card className="glass-card border-white/5">
          <CardContent className="p-6">
            <h3 className="text-lg font-bold text-white mb-5 flex items-center gap-2">
              <Heart className="h-5 w-5 text-danger" /> Partner Organisations
            </h3>
            <div className="space-y-3">
              {PARTNERS.map((partner) => (
                <div key={partner.abbr} className="flex items-center justify-between bg-black/20 rounded-xl px-4 py-3 border border-white/5">
                  <div className="flex items-center gap-3">
                    <div className="h-8 w-8 rounded-lg bg-primary/20 border border-primary/30 flex items-center justify-center">
                      <span className="text-[9px] font-bold text-primary">{partner.abbr}</span>
                    </div>
                    <div>
                      <div className="text-sm font-medium text-white">{partner.name}</div>
                      <div className="text-xs text-muted-foreground">{partner.country}</div>
                    </div>
                  </div>
                  <ExternalLink className="h-3.5 w-3.5 text-muted-foreground" />
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <div className="space-y-5">
          {/* Technology Stack */}
          <Card className="glass-card border-white/5">
            <CardContent className="p-6">
              <h3 className="text-lg font-bold text-white mb-4 flex items-center gap-2">
                <Database className="h-5 w-5 text-primary" /> Technology Stack
              </h3>
              <div className="flex flex-wrap gap-2">
                {["Next.js 16","React 19","TypeScript","Tailwind CSS v4","Leaflet / GIS","Apache ECharts","Framer Motion","Lucide Icons","GitHub Actions CI/CD"].map((tech) => (
                  <span key={tech} className="text-xs font-medium px-2.5 py-1 rounded-lg bg-black/30 border border-white/10 text-white/80">
                    {tech}
                  </span>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Team */}
          <Card className="glass-card border-white/5">
            <CardContent className="p-6">
              <h3 className="text-lg font-bold text-white mb-4 flex items-center gap-2">
                <Users className="h-5 w-5 text-secondary" /> Built by a Multidisciplinary Team
              </h3>
              <div className="flex flex-wrap gap-2">
                {TEAM_ROLES.map((role) => (
                  <span key={role} className="text-xs font-medium px-2.5 py-1 rounded-full bg-secondary/10 border border-secondary/20 text-secondary">
                    {role}
                  </span>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Contact / Open Source */}
          <Card className="glass-card border-white/5">
            <CardContent className="p-6 flex flex-col gap-3">
              <h3 className="text-lg font-bold text-white mb-1 flex items-center gap-2">
                <Github className="h-5 w-5 text-white" /> Open Source & Contact
              </h3>
              <a
                href="https://github.com/Eranga27/lanka-climate-app"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-3 p-3 rounded-xl bg-black/20 border border-white/5 hover:border-primary/40 hover:bg-primary/5 transition-all group"
              >
                <Github className="h-5 w-5 text-muted-foreground group-hover:text-primary" />
                <span className="text-sm text-muted-foreground group-hover:text-white">github.com/Eranga27/lanka-climate-app</span>
                <ExternalLink className="h-3.5 w-3.5 text-muted-foreground ml-auto" />
              </a>
              <a
                href="mailto:info@lankaclimatehub.lk"
                className="flex items-center gap-3 p-3 rounded-xl bg-black/20 border border-white/5 hover:border-secondary/40 hover:bg-secondary/5 transition-all group"
              >
                <Mail className="h-5 w-5 text-muted-foreground group-hover:text-secondary" />
                <span className="text-sm text-muted-foreground group-hover:text-white">info@lankaclimatehub.lk</span>
              </a>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Version Footer */}
      <div className="glass rounded-2xl p-6 flex flex-col sm:flex-row items-center justify-between gap-4 text-sm border border-white/5">
        <div className="text-muted-foreground text-center sm:text-left">
          <span className="font-bold text-white">Lanka Climate Hub</span> · Version 1.0 · Built for Sri Lanka
        </div>
        <div className="flex items-center gap-2 text-muted-foreground text-xs">
          <span>Data updated every 15 minutes</span>
          <span className="h-1 w-1 rounded-full bg-muted-foreground" />
          <span className="text-safe font-semibold">All systems operational</span>
        </div>
      </div>
    </div>
  );
}
