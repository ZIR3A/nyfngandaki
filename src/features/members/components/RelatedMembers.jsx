"use client";

import { motion } from "framer-motion";
import { CompactMemberCard } from "./CompactMemberCard";
import { Users } from "lucide-react";

export function RelatedMembers({ members, isNepali }) {
  if (!members || members.length === 0) return null;

  return (
    <section className="mt-16 md:mt-24 mb-12">
      <div className="flex items-center gap-3 mb-8">
        <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center shrink-0">
          <Users className="w-5 h-5 text-primary" />
        </div>
        <h3 className="text-2xl font-extrabold text-foreground">
          {isNepali ? "अन्य सदस्यहरू" : "Related Members"}
        </h3>
      </div>
      
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {members.map((member, i) => (
          <motion.div
            key={member._id}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.1, duration: 0.5 }}
          >
            <CompactMemberCard member={member} isNepali={isNepali} />
          </motion.div>
        ))}
      </div>
    </section>
  );
}
