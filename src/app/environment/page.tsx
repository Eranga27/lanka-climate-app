"use client";
import { PageHeader } from "@/components/layout/PageHeader";
import { TreePine } from "lucide-react";

export default function EnvironmentPage() {
  return (
    <div className="flex-1 flex flex-col p-4 md:p-6 lg:p-8">
      <PageHeader 
        title="Environment & Ecology" 
        description="Biodiversity monitoring, deforestation mapping, and ecological impact tracking."
        icon={<TreePine className="h-8 w-8 text-safe" />} 
      />
      <div className="flex-1 glass rounded-2xl flex items-center justify-center border border-white/5 min-h-[500px]">
         <p className="text-muted-foreground">Ecological Data Syncing...</p>
      </div>
    </div>
  );
}
