"use client";
import { PageHeader } from "@/components/layout/PageHeader";
import { Cloud } from "lucide-react";

export default function WeatherPage() {
  return (
    <div className="flex-1 flex flex-col p-4 md:p-6 lg:p-8">
      <PageHeader 
        title="Weather Forecasting" 
        description="Hyper-local, AI-driven weather predictions for 25 districts with hourly accuracy."
        icon={<Cloud className="h-8 w-8 text-secondary" />} 
      />
      <div className="flex-1 glass rounded-2xl flex items-center justify-center border border-white/5 min-h-[500px]">
         <p className="text-muted-foreground">Forecasting Models Loading...</p>
      </div>
    </div>
  );
}
