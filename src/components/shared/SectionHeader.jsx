"use client";

import { useLanguage } from "@/localization/LanguageContext";
import { Button } from "@/components/ui/button";
import { ChevronRight } from "lucide-react";
import Link from "next/link";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

export function SectionHeader({ title, actionLabel, actionUrl, className, color = "accent" }) {
  const { t, language } = useLanguage();

  return (
    <div className={cn("flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6", className)}>
      <motion.h2 
        initial={{ opacity: 0, x: -20 }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{ once: true }}
        className={cn(
          "text-2xl md:text-3xl font-bold tracking-tight",
          color === "accent" ? "text-accent" : "text-primary"
        )}
      >
        {title}
      </motion.h2>
      
      {actionLabel && actionUrl && (
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
        >
          <Link href={`/${language}${actionUrl}`}>
            <Button 
              variant="default" 
              size="sm" 
              className={cn(
                "rounded-full pl-4 pr-3",
                color === "accent" 
                  ? "bg-accent text-accent-foreground hover:bg-accent-hover shadow-md" 
                  : "bg-primary text-primary-foreground hover:bg-primary-hover shadow-md"
              )}
            >
              {actionLabel} <ChevronRight className="w-4 h-4 ml-1" />
            </Button>
          </Link>
        </motion.div>
      )}
    </div>
  );
}
