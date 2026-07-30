"use client";

import { usePathname } from "next/navigation";
import { Footer } from "./Footer";

export function LayoutShell({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const isMapPage = pathname === "/map";

  return (
    <>
      <main
        id="main-content"
        className="flex-1 flex flex-col relative w-full"
        tabIndex={-1}
      >
        {children}
      </main>
      {!isMapPage && <Footer />}
    </>
  );
}
