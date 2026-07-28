// Centralised design tokens — import from here to ensure platform-wide consistency
export const RISK_STYLES = {
  safe:     { badge: "bg-safe/15 text-safe border border-safe/30",     dot: "bg-safe",     text: "text-safe"     },
  warning:  { badge: "bg-warning/15 text-warning border border-warning/30",  dot: "bg-warning",  text: "text-warning"  },
  elevated: { badge: "bg-elevated/15 text-elevated border border-elevated/30",dot: "bg-elevated", text: "text-elevated" },
  danger:   { badge: "bg-danger/15 text-danger border border-danger/30",   dot: "bg-danger",   text: "text-danger"   },
  extreme:  { badge: "bg-extreme/15 text-extreme border border-extreme/30",  dot: "bg-extreme",  text: "text-extreme"  },
} as const;

export type RiskLevel = keyof typeof RISK_STYLES;

export const SECTION_PADDING = "p-4 md:p-6 lg:p-8";
export const CARD_BASE       = "glass-card rounded-2xl border-white/5";
export const SECTION_TITLE   = "text-lg font-bold text-white flex items-center gap-2";
export const SECTION_DESC    = "text-xs text-muted-foreground mt-0.5 mb-4";

export const PAGE_TRANSITION = {
  initial:    { opacity: 0, y: 10 },
  animate:    { opacity: 1, y: 0  },
  exit:       { opacity: 0, y: -10 },
  transition: { duration: 0.3, ease: "easeOut" as const },
};
