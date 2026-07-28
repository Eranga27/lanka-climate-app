"use client";
import { PageHeader } from "@/components/layout/PageHeader";
import { Map as MapIcon } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";

export default function LiveMapPage() {
  return (
    <div className="flex-1 flex flex-col p-4 md:p-6 lg:p-8">
      <PageHeader 
        title="Live Climate Map" 
        description="High-resolution, real-time satellite telemetry and sensor network visualization across Sri Lanka and the Indian Ocean."
        icon={<MapIcon className="h-8 w-8 text-primary" />} 
      />
      <div className="flex-1 glass rounded-2xl flex items-center justify-center border border-white/5 relative overflow-hidden min-h-[500px]">
         <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/stardust.png')] mix-blend-screen opacity-30" />
         <p className="text-muted-foreground relative z-10 flex flex-col items-center gap-4">
           <MapIcon className="h-12 w-12 text-white/20 animate-pulse" />
           Map Engine Initializing...
         </p>
      </div>
    </div>
  );
}
