"use client";

import dynamic from "next/dynamic";
import { Loader2 } from "lucide-react";

// Dynamically import the LiveMap component to disable Server-Side Rendering
// since leaflet interacts directly with the window/DOM.
const DynamicLiveMap = dynamic(() => import("@/components/map/LiveMap"), {
  ssr: false,
  loading: () => (
    <div className="flex-1 flex items-center justify-center bg-[#0F172A] w-full h-[calc(100vh-4rem)]">
      <div className="flex flex-col items-center gap-4 text-primary">
        <Loader2 className="h-8 w-8 animate-spin" />
        <span className="text-sm font-medium tracking-widest uppercase">Initializing GIS Engine...</span>
      </div>
    </div>
  ),
});

export default function LiveMapPage() {
  return (
    <div className="flex-1 flex w-full relative h-[calc(100vh-4rem)] lg:h-[calc(100vh)]">
       <DynamicLiveMap />
    </div>
  );
}
