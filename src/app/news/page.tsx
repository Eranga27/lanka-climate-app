"use client";

import { Newspaper, ExternalLink, Clock } from "lucide-react";
import { PageHeader } from "@/components/layout/PageHeader";
import { Card, CardContent } from "@/components/ui/card";
import { motion } from "framer-motion";

const NEWS = [
  {
    category: "Climate Alert",
    categoryColor: "text-danger bg-danger/15 border-danger/30",
    title: "Monsoon Onset 10 Days Earlier Than Average, Meteorology Department Warns",
    summary: "The Department of Meteorology has issued a statement noting the South-West Monsoon has established itself over the island significantly ahead of the historical mean.",
    date: "Jul 28, 2026",
    readTime: "3 min",
    source: "DMC Sri Lanka",
    icon: "🌧️",
  },
  {
    category: "ENSO Update",
    categoryColor: "text-warning bg-warning/15 border-warning/30",
    title: "El Niño Weakening — Transition to Neutral Conditions by Q4 Forecast",
    summary: "International climate modelling centres are converging on a consensus that the current El Niño episode is likely to weaken significantly by the fourth quarter.",
    date: "Jul 27, 2026",
    readTime: "5 min",
    source: "WMO",
    icon: "🌊",
  },
  {
    category: "Environment",
    categoryColor: "text-safe bg-safe/15 border-safe/30",
    title: "Reforestation Programme Reaches 1 Million Hectares Milestone",
    summary: "The Sri Lanka Forest Department announced that the national reforestation programme has successfully restored 1 million hectares of degraded land.",
    date: "Jul 26, 2026",
    readTime: "4 min",
    source: "Forest Dept",
    icon: "🌳",
  },
  {
    category: "Research",
    categoryColor: "text-primary bg-primary/15 border-primary/30",
    title: "New Study Links Urban Heat Islands to 2°C Local Warming in Colombo",
    summary: "Researchers from the University of Moratuwa have published a landmark study quantifying the urban heat island effect across the Colombo Metropolitan Region.",
    date: "Jul 25, 2026",
    readTime: "6 min",
    source: "Uni. of Moratuwa",
    icon: "🔬",
  },
  {
    category: "Agriculture",
    categoryColor: "text-elevated bg-elevated/15 border-elevated/30",
    title: "Dry Zone Farmers Warned of Below-Normal Maha Season Rainfall",
    summary: "Agronomists are advising farmers in the North-Central and Northern provinces to adopt drought-resistant crop varieties for the upcoming Maha season.",
    date: "Jul 24, 2026",
    readTime: "4 min",
    source: "Agri Ministry",
    icon: "🌾",
  },
  {
    category: "Marine",
    categoryColor: "text-secondary bg-secondary/15 border-secondary/30",
    title: "Bay of Bengal Sea Surface Temperatures Hit 5-Year High",
    summary: "Ocean monitoring data reveals SSTs in the Bay of Bengal have reached a 5-year high for this period, raising concerns about intensification of future weather systems.",
    date: "Jul 23, 2026",
    readTime: "3 min",
    source: "IOTC",
    icon: "🌡️",
  },
];

export default function NewsPage() {
  return (
    <div className="flex-1 flex flex-col p-4 md:p-6 lg:p-8 space-y-6">
      <PageHeader
        title="Climate Intelligence News"
        description="Curated scientific bulletins, research publications, and national environmental advisories."
        icon={<Newspaper className="h-7 w-7 text-primary" />}
      />

      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-5">
        {NEWS.map((article, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.06, duration: 0.35 }}
          >
            <Card className="glass-card border-white/5 h-full group hover:-translate-y-1 transition-all duration-300 cursor-pointer relative overflow-hidden">
              <CardContent className="p-6 flex flex-col h-full">
                <div className="flex items-start justify-between mb-4">
                  <span className={`text-xs font-bold px-2 py-0.5 rounded-full border uppercase tracking-wider ${article.categoryColor}`}>
                    {article.category}
                  </span>
                  <span className="text-2xl">{article.icon}</span>
                </div>
                <h3 className="text-base font-bold text-white leading-snug mb-3 group-hover:text-primary transition-colors line-clamp-2">
                  {article.title}
                </h3>
                <p className="text-sm text-muted-foreground leading-relaxed flex-1 line-clamp-3 mb-4">
                  {article.summary}
                </p>
                <div className="flex items-center justify-between text-xs text-muted-foreground pt-4 border-t border-white/5">
                  <div className="flex items-center gap-3">
                    <span className="font-medium text-white/60">{article.source}</span>
                    <span className="flex items-center gap-1"><Clock className="h-3 w-3" />{article.readTime}</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <span>{article.date}</span>
                    <ExternalLink className="h-3 w-3 opacity-0 group-hover:opacity-100 transition-opacity" />
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
