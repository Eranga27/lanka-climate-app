"use client";
import { PageHeader } from "@/components/layout/PageHeader";
import { Bot } from "lucide-react";

export default function AssistantPage() {
  return (
    <div className="flex-1 flex flex-col p-4 md:p-6 lg:p-8">
      <PageHeader 
        title="AI Assistant" 
        description="Ask complex climate questions and receive deep insights powered by advanced LLMs."
        icon={<Bot className="h-8 w-8 text-secondary" />} 
      />
      <div className="flex-1 glass rounded-2xl flex items-center justify-center border border-white/5 min-h-[500px]">
         <p className="text-muted-foreground">Initializing Neural Network...</p>
      </div>
    </div>
  );
}
