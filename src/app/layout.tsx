import type { Metadata } from "next";
import { Poppins } from "next/font/google";
import "./globals.css";
import { Navbar } from "@/components/layout/Navbar";

const poppins = Poppins({
  variable: "--font-poppins",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
});

export const metadata: Metadata = {
  title: "Lanka Climate Hub",
  description: "Sri Lanka's Central Climate Intelligence & Environmental Monitoring Platform",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${poppins.variable} h-full antialiased dark`}
    >
      <body className="min-h-full flex flex-col bg-background text-foreground pb-24 lg:pb-0">
        <Navbar />
        <main className="flex-1 flex flex-col relative w-full h-full">
          {children}
        </main>
      </body>
    </html>
  );
}
