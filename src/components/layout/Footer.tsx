import Link from "next/link";
import { Globe, Twitter, Github, Mail } from "lucide-react";

export function Footer() {
  return (
    <footer className="border-t border-white/10 bg-black/40 backdrop-blur-md mt-20">
      <div className="max-w-7xl mx-auto px-4 md:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="md:col-span-1 space-y-4">
            <Link href="/" className="flex items-center gap-2 group">
              <div className="h-8 w-8 rounded-full bg-gradient-to-br from-primary to-secondary flex items-center justify-center shadow-lg">
                <Globe className="h-5 w-5 text-white" />
              </div>
              <span className="font-bold text-white tracking-tight">
                Lanka Climate Hub
              </span>
            </Link>
            <p className="text-sm text-muted-foreground leading-relaxed">
              Sri Lanka's central intelligence platform for real-time meteorological data, environmental monitoring, and predictive disaster analytics.
            </p>
          </div>

          <div>
            <h3 className="font-semibold text-white mb-4">Platform</h3>
            <ul className="space-y-2 text-sm">
              <li><Link href="/map" className="text-muted-foreground hover:text-white transition-colors">Live Map</Link></li>
              <li><Link href="/weather" className="text-muted-foreground hover:text-white transition-colors">Weather Models</Link></li>
              <li><Link href="/intelligence" className="text-muted-foreground hover:text-white transition-colors">Climate Intelligence</Link></li>
              <li><Link href="/disaster" className="text-muted-foreground hover:text-white transition-colors">Disaster Centre</Link></li>
            </ul>
          </div>

          <div>
            <h3 className="font-semibold text-white mb-4">Sectors</h3>
            <ul className="space-y-2 text-sm">
              <li><Link href="/environment" className="text-muted-foreground hover:text-white transition-colors">Environment</Link></li>
              <li><Link href="/agriculture" className="text-muted-foreground hover:text-white transition-colors">Agriculture</Link></li>
              <li><Link href="/marine" className="text-muted-foreground hover:text-white transition-colors">Marine</Link></li>
              <li><Link href="/tourism" className="text-muted-foreground hover:text-white transition-colors">Tourism</Link></li>
            </ul>
          </div>

          <div>
            <h3 className="font-semibold text-white mb-4">Connect</h3>
            <div className="flex gap-4 mb-4">
              <a href="#" className="p-2 rounded-full bg-white/5 hover:bg-white/10 text-white transition-colors"><Twitter className="h-4 w-4" /></a>
              <a href="https://github.com/Eranga27/lanka-climate-app" target="_blank" rel="noreferrer" className="p-2 rounded-full bg-white/5 hover:bg-white/10 text-white transition-colors"><Github className="h-4 w-4" /></a>
              <a href="#" className="p-2 rounded-full bg-white/5 hover:bg-white/10 text-white transition-colors"><Mail className="h-4 w-4" /></a>
            </div>
            <p className="text-xs text-muted-foreground">
              Official data sources synchronized with national meteorological agencies.
            </p>
          </div>
        </div>

        <div className="mt-12 pt-8 border-t border-white/5 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-xs text-muted-foreground">
            © {new Date().getFullYear()} Lanka Climate Hub. Built for the future.
          </p>
          <div className="flex gap-4 text-xs text-muted-foreground">
            <Link href="#" className="hover:text-white">Privacy Policy</Link>
            <Link href="#" className="hover:text-white">Terms of Service</Link>
            <Link href="#" className="hover:text-white">API Access</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
