"use client";

// Shared reusable UI primitives used across every page
import React from "react";
import { cn } from "@/lib/utils";
import { AlertTriangle, RefreshCw, Inbox } from "lucide-react";

// ── Skeleton ────────────────────────────────────────────────────────────────
export function Skeleton({ className, ...props }: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      className={cn(
        "animate-pulse rounded-xl bg-white/5",
        className
      )}
      {...props}
    />
  );
}

export function SkeletonCard({ rows = 3 }: { rows?: number }) {
  return (
    <div className="glass-card rounded-2xl border-white/5 p-6 space-y-4">
      <Skeleton className="h-5 w-1/3" />
      {Array.from({ length: rows }).map((_, i) => (
        <Skeleton key={i} className={`h-4 w-${i === rows - 1 ? "2/3" : "full"}`} />
      ))}
    </div>
  );
}

export function SkeletonChart({ height = "h-[250px]" }: { height?: string }) {
  return (
    <div className={cn("glass-card rounded-2xl border-white/5 p-6 space-y-4", height)}>
      <Skeleton className="h-5 w-1/4" />
      <div className="flex-1 flex items-end gap-2 pt-4">
        {Array.from({ length: 12 }).map((_, i) => (
          <Skeleton
            key={i}
            style={{ height: `${30 + Math.random() * 70}%` }}
            className="flex-1 rounded-t-lg"
          />
        ))}
      </div>
    </div>
  );
}

// ── Error State ─────────────────────────────────────────────────────────────
export function ErrorState({
  title = "Unable to load data",
  message = "There was a problem fetching data from the server. Please try again.",
  onRetry,
}: {
  title?: string;
  message?: string;
  onRetry?: () => void;
}) {
  return (
    <div className="flex-1 flex flex-col items-center justify-center gap-6 p-12 text-center">
      <div className="h-16 w-16 rounded-full bg-danger/10 border border-danger/30 flex items-center justify-center">
        <AlertTriangle className="h-8 w-8 text-danger" />
      </div>
      <div>
        <h3 className="text-xl font-bold text-white mb-2">{title}</h3>
        <p className="text-muted-foreground max-w-md text-sm leading-relaxed">{message}</p>
      </div>
      {onRetry && (
        <button
          onClick={onRetry}
          className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-primary/20 border border-primary/40 text-primary hover:bg-primary hover:text-white transition-all text-sm font-semibold"
        >
          <RefreshCw className="h-4 w-4" /> Retry
        </button>
      )}
    </div>
  );
}

// ── Empty State ─────────────────────────────────────────────────────────────
export function EmptyState({
  title = "No data available",
  message = "No records match your current filters. Try adjusting your selection.",
  icon: Icon = Inbox,
}: {
  title?: string;
  message?: string;
  icon?: React.ComponentType<{ className?: string }>;
}) {
  return (
    <div className="flex flex-col items-center justify-center gap-4 p-12 text-center">
      <div className="h-14 w-14 rounded-2xl bg-white/5 flex items-center justify-center">
        <Icon className="h-7 w-7 text-muted-foreground" />
      </div>
      <div>
        <h3 className="text-base font-semibold text-white mb-1">{title}</h3>
        <p className="text-muted-foreground text-sm max-w-sm leading-relaxed">{message}</p>
      </div>
    </div>
  );
}

// ── Live Indicator ───────────────────────────────────────────────────────────
export function LiveBadge({ label = "Live" }: { label?: string }) {
  return (
    <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-safe/10 border border-safe/30 text-safe text-xs font-semibold">
      <span className="relative flex h-1.5 w-1.5">
        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-safe opacity-75" />
        <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-safe" />
      </span>
      {label}
    </span>
  );
}

// ── Risk Badge ───────────────────────────────────────────────────────────────
export function RiskBadge({ level }: { level: string }) {
  const colors: Record<string, string> = {
    safe:     "bg-safe/15 text-safe border-safe/30",
    warning:  "bg-warning/15 text-warning border-warning/30",
    elevated: "bg-elevated/15 text-elevated border-elevated/30",
    danger:   "bg-danger/15 text-danger border-danger/30",
    extreme:  "bg-extreme/15 text-extreme border-extreme/30",
  };
  const key = level.toLowerCase();
  return (
    <span className={cn("text-xs font-bold px-2.5 py-0.5 rounded-full border uppercase tracking-wider", colors[key] ?? colors.safe)}>
      {level}
    </span>
  );
}

// ── Section Header ───────────────────────────────────────────────────────────
export function SectionHeader({
  title,
  description,
  icon: Icon,
  action,
}: {
  title: string;
  description?: string;
  icon?: React.ComponentType<{ className?: string }>;
  action?: React.ReactNode;
}) {
  return (
    <div className="flex items-start justify-between gap-4 mb-5">
      <div>
        <h3 className="text-lg font-bold text-white flex items-center gap-2">
          {Icon && <Icon className="h-5 w-5 text-primary" />}
          {title}
        </h3>
        {description && <p className="text-xs text-muted-foreground mt-0.5">{description}</p>}
      </div>
      {action && <div className="shrink-0">{action}</div>}
    </div>
  );
}

// ── KPI Card ─────────────────────────────────────────────────────────────────
export function KPICard({
  title,
  value,
  unit,
  icon: Icon,
  iconColor = "text-primary",
  trend,
}: {
  title: string;
  value: string | number;
  unit?: string;
  icon: React.ComponentType<{ className?: string }>;
  iconColor?: string;
  trend?: string;
}) {
  return (
    <div className="glass-card rounded-2xl border-white/5 p-5">
      <div className="flex justify-between items-start mb-3">
        <span className="text-xs font-medium text-muted-foreground uppercase tracking-wider leading-tight">{title}</span>
        <Icon className={cn("h-4 w-4 shrink-0", iconColor)} />
      </div>
      <div className="flex items-baseline gap-1.5">
        <span className="text-2xl font-bold text-white">{value}</span>
        {unit && <span className={cn("text-xs font-semibold", iconColor)}>{unit}</span>}
      </div>
      {trend && <div className="text-xs text-muted-foreground mt-1">{trend}</div>}
    </div>
  );
}
