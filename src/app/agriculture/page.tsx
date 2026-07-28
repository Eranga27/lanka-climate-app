"use client";
import { PageHeader } from "@/components/layout/PageHeader";
import { Sprout } from "lucide-react";

export default function AgriculturePage() {
  return (
    <div className="flex-1 flex flex-col p-4 md:p-6 lg:p-8">
      <PageHeader 
        title="Agri-Climate Hub" 
        description="Soil moisture indices, crop-weather calendars, and predictive yield models."
        icon={<Sprout className="h-8 w-8 text-safe" />} 
      />
      <div className="flex-1 glass rounded-2xl flex items-center justify-center border border-white/5 min-h-[500px]">
         <p className="text-muted-foreground">Agricultural Models Loading...</p>
      </div>
    </div>
  );
}
