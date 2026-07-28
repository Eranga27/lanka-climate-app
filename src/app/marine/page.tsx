"use client";
import { PageHeader } from "@/components/layout/PageHeader";
import { Anchor } from "lucide-react";

export default function MarinePage() {
  return (
    <div className="flex-1 flex flex-col p-4 md:p-6 lg:p-8">
      <PageHeader 
        title="Marine & Coastal" 
        description="Sea-surface temperatures, wave dynamics, and coastal erosion predictions."
        icon={<Anchor className="h-8 w-8 text-primary" />} 
      />
      <div className="flex-1 glass rounded-2xl flex items-center justify-center border border-white/5 min-h-[500px]">
         <p className="text-muted-foreground">Marine Data Syncing...</p>
      </div>
    </div>
  );
}
