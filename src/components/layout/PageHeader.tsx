import React from "react";
import { motion } from "framer-motion";

interface PageHeaderProps {
  title: string;
  description: string;
  icon?: React.ReactNode;
}

export function PageHeader({ title, description, icon }: PageHeaderProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      className="glass rounded-2xl p-6 md:p-8 flex items-center gap-6 z-10 w-full mb-6"
    >
      {icon && (
        <div className="h-16 w-16 rounded-2xl bg-primary/20 flex items-center justify-center border border-primary/30 shadow-[0_0_15px_rgba(37,99,235,0.2)]">
          {icon}
        </div>
      )}
      <div>
        <h1 className="text-3xl font-bold tracking-tight text-white mb-2">{title}</h1>
        <p className="text-muted-foreground text-sm max-w-2xl">{description}</p>
      </div>
    </motion.div>
  );
}
