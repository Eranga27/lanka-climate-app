"use client";

import { Camera } from "lucide-react";
import { PageHeader } from "@/components/layout/PageHeader";
import { Card, CardContent } from "@/components/ui/card";
import { EmptyState } from "@/components/ui/shared";
import { motion } from "framer-motion";

const DESTINATIONS = [
  { name: "Sigiriya", region: "North Central", season: "Jan–Apr", climate: "Dry & Sunny", risk: "Low", icon: "🦁" },
  { name: "Ella", region: "Uva Province", season: "Year-round", climate: "Cool & Misty", risk: "Low", icon: "🌿" },
  { name: "Galle Fort", region: "Southern", season: "Nov–Apr", climate: "Coastal Breeze", risk: "Low", icon: "🏰" },
  { name: "Yala National Park", region: "Southern", season: "Feb–Jul", climate: "Hot & Dry", risk: "Medium", icon: "🐆" },
  { name: "Mirissa Beach", region: "Southern", season: "Nov–Apr", climate: "Tropical Sunny", risk: "Low", icon: "🐋" },
  { name: "Adams Peak", region: "Sabaragamuwa", season: "Dec–May", climate: "Cool & Wet", risk: "Medium", icon: "⛰️" },
];

export default function TourismPage() {
  return (
    <div className="flex-1 flex flex-col p-4 md:p-6 lg:p-8 space-y-6">
      <PageHeader
        title="Tourism & Travel Intelligence"
        description="Climate-optimised travel planning with seasonal recommendations, weather advisories, and destination safety ratings."
        icon={<Camera className="h-7 w-7 text-elevated" />}
      />

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
        {DESTINATIONS.map((dest, i) => (
          <motion.div
            key={dest.name}
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.07, duration: 0.35 }}
          >
            <Card className="glass-card border-white/5 h-full hover:-translate-y-1 transition-all duration-300 cursor-pointer group relative overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-br from-elevated/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
              <CardContent className="p-6 relative z-10">
                <div className="flex items-start justify-between mb-4">
                  <span className="text-4xl">{dest.icon}</span>
                  <span className={`text-xs font-bold px-2 py-0.5 rounded-full border uppercase tracking-wider ${
                    dest.risk === "Low"
                      ? "bg-safe/15 text-safe border-safe/30"
                      : "bg-warning/15 text-warning border-warning/30"
                  }`}>
                    {dest.risk} Risk
                  </span>
                </div>
                <h3 className="text-lg font-bold text-white mb-1 group-hover:text-primary transition-colors">{dest.name}</h3>
                <p className="text-sm text-muted-foreground mb-4">{dest.region}</p>
                <div className="space-y-2 text-xs">
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Best Season</span>
                    <span className="text-white font-medium">{dest.season}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Climate</span>
                    <span className="text-white font-medium">{dest.climate}</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
