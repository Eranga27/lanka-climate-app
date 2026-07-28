"use client";
import { PageHeader } from "@/components/layout/PageHeader";
import { History } from "lucide-react";

export default function HistoryPage() {
  return (
    <div className="flex-1 flex flex-col p-4 md:p-6 lg:p-8">
      <PageHeader 
        title="Historical Data" 
        description="Explore decadal climate archives and anomaly trends since 1950."
        icon={<History className="h-8 w-8 text-muted-foreground" />} 
      />
      <div className="flex-1 glass rounded-2xl flex items-center justify-center border border-white/5 min-h-[500px]">
         <p className="text-muted-foreground">Accessing Archives...</p>
      </div>
    </div>
  );
}
