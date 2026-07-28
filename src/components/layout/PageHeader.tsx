"use client";

import React from "react";
import { motion } from "framer-motion";

interface PageHeaderProps {
  title: string;
  description: string;
  icon?: React.ReactNode;
  actions?: React.ReactNode;
}

export function PageHeader({ title, description, icon, actions }: PageHeaderProps) {
  return (
    <motion.header
      initial={{ opacity: 0, y: -16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, ease: "easeOut" }}
      className="glass rounded-2xl p-6 md:p-8 flex flex-col sm:flex-row sm:items-center gap-5 z-10 w-full"
    >
      {icon && (
        <div
          className="h-14 w-14 rounded-2xl bg-primary/15 flex items-center justify-center border border-primary/25 shadow-[0_0_20px_rgba(37,99,235,0.15)] shrink-0"
          aria-hidden="true"
        >
          {icon}
        </div>
      )}
      <div className="flex-1 min-w-0">
        <h1 className="text-2xl md:text-3xl font-bold tracking-tight text-white leading-tight mb-1.5">
          {title}
        </h1>
        <p className="text-muted-foreground text-sm leading-relaxed max-w-2xl">{description}</p>
      </div>
      {actions && <div className="shrink-0">{actions}</div>}
    </motion.header>
  );
}
