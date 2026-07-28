"use client";
import { PageHeader } from "@/components/layout/PageHeader";
import { Newspaper } from "lucide-react";

export default function NewsPage() {
  return (
    <div className="flex-1 flex flex-col p-4 md:p-6 lg:p-8">
      <PageHeader 
        title="Climate News" 
        description="Latest developments, scientific publications, and local impact reports."
        icon={<Newspaper className="h-8 w-8 text-primary" />} 
      />
      <div className="flex-1 glass rounded-2xl flex items-center justify-center border border-white/5 min-h-[500px]">
         <p className="text-muted-foreground">Fetching Latest Bulletins...</p>
      </div>
    </div>
  );
}
