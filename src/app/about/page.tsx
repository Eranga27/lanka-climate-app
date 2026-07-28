"use client";
import { PageHeader } from "@/components/layout/PageHeader";
import { Info } from "lucide-react";

export default function AboutPage() {
  return (
    <div className="flex-1 flex flex-col p-4 md:p-6 lg:p-8">
      <PageHeader 
        title="About the Hub" 
        description="The mission, open-source technology, and scientific partners behind Lanka Climate Hub."
        icon={<Info className="h-8 w-8 text-primary" />} 
      />
      <div className="flex-1 glass rounded-2xl flex flex-col items-center justify-center border border-white/5 min-h-[500px] gap-4">
         <div className="text-2xl font-bold">Version 1.0</div>
         <p className="text-muted-foreground max-w-lg text-center">Built for enterprise-scale environmental monitoring and rapid intelligence distribution.</p>
      </div>
    </div>
  );
}
