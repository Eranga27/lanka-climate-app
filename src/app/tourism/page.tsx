"use client";
import { PageHeader } from "@/components/layout/PageHeader";
import { Camera } from "lucide-react";

export default function TourismPage() {
  return (
    <div className="flex-1 flex flex-col p-4 md:p-6 lg:p-8">
      <PageHeader 
        title="Tourism Impact" 
        description="Favorable condition mapping for seasonal tourism and recreational safety."
        icon={<Camera className="h-8 w-8 text-elevated" />} 
      />
      <div className="flex-1 glass rounded-2xl flex items-center justify-center border border-white/5 min-h-[500px]">
         <p className="text-muted-foreground">Tourism Insights Loading...</p>
      </div>
    </div>
  );
}
