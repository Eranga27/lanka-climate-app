"use client";
import { PageHeader } from "@/components/layout/PageHeader";
import { Activity } from "lucide-react";

export default function IntelligencePage() {
  return (
    <div className="flex-1 flex flex-col p-4 md:p-6 lg:p-8">
      <PageHeader 
        title="Climate Intelligence" 
        description="Deep analytics and long-term trend analysis powered by historical data and machine learning."
        icon={<Activity className="h-8 w-8 text-primary" />} 
      />
      <div className="flex-1 glass rounded-2xl flex items-center justify-center border border-white/5 min-h-[500px]">
         <p className="text-muted-foreground">Compiling Intelligence Reports...</p>
      </div>
    </div>
  );
}
