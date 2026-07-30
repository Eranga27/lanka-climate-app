import type { Metadata, Viewport } from "next";
import "./globals.css";
import "leaflet/dist/leaflet.css";
import { Navbar } from "@/components/layout/Navbar";
import { LayoutShell } from "@/components/layout/LayoutShell";

export const viewport: Viewport = {
  themeColor: "#0F172A",
  width: "device-width",
  initialScale: 1,
};

export const metadata: Metadata = {
  title: {
    default: "Lanka Climate Hub — Sri Lanka's Climate Intelligence Platform",
    template: "%s | Lanka Climate Hub",
  },
  description:
    "Sri Lanka's central climate intelligence and environmental monitoring platform. Real-time weather, ENSO analytics, disaster alerts, marine conditions, agricultural forecasts and historical climate data.",
  keywords: [
    "Sri Lanka weather",
    "climate intelligence",
    "ENSO Sri Lanka",
    "flood warning",
    "monsoon forecast",
    "environmental monitoring",
    "disaster management Sri Lanka",
    "agriculture climate",
    "marine forecast Sri Lanka",
  ],
  authors: [{ name: "Lanka Climate Hub Team" }],
  creator: "Lanka Climate Hub",
  openGraph: {
    type: "website",
    locale: "en_LK",
    siteName: "Lanka Climate Hub",
    title: "Lanka Climate Hub — Sri Lanka's Climate Intelligence Platform",
    description:
      "Monitor real-time weather, climate change impacts, disaster risk, and environmental conditions across Sri Lanka.",
  },
  twitter: {
    card: "summary_large_image",
    title: "Lanka Climate Hub",
    description: "Sri Lanka's central climate intelligence platform.",
  },
  robots: { index: true, follow: true },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="h-full antialiased dark">
      <head>
        {/* Poppins via Google Fonts CDN — no next/font dependency */}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Poppins:wght@300;400;500;600;700&display=swap"
          rel="stylesheet"
        />
      </head>
      <body
        className="min-h-full flex flex-col bg-background text-foreground"
        style={{ fontFamily: "'Poppins', system-ui, sans-serif" }}
      >
        <Navbar />
        <LayoutShell>{children}</LayoutShell>
      </body>
    </html>
  );
}
