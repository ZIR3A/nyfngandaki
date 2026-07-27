"use client";
import { Card, CardContent } from "@/components/ui/card";
import { motion } from "framer-motion";

export function StatisticCard({ icon: Icon, title, value }) {
  return (
    <motion.div whileHover={{ y: -5 }} transition={{ duration: 0.2 }}>
      <Card className="border-t-4 border-t-primary shadow-sm hover:shadow-md hover:shadow-primary/20 hover:border-t-accent transition-all">
        <CardContent className="p-6 flex items-center space-x-4">
          <div className="p-3 bg-primary/10 text-primary rounded-full">
            <Icon className="w-8 h-8" />
          </div>
          <div>
            <p className="text-3xl font-bold text-primary">{value}</p>
            <p className="text-sm text-muted-foreground font-medium">{title}</p>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
}
