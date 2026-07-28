"use client";
import { PageHeader } from "@/components/layout/PageHeader";
import { AlertTriangle } from "lucide-react";

export default function DisasterPage() {
  return (
    <div className="flex-1 flex flex-col p-4 md:p-6 lg:p-8">
      <PageHeader 
        title="Disaster Centre" 
        description="Early warning systems, risk mitigation protocols, and emergency broadcast integration."
        icon={<AlertTriangle className="h-8 w-8 text-danger" />} 
      />
      <div className="flex-1 glass rounded-2xl flex items-center justify-center border border-white/5 min-h-[500px] bg-danger/5">
         <p className="text-danger font-medium">Monitoring Active Risks...</p>
      </div>
    </div>
  );
}
