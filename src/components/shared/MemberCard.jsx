"use client";

import { useLanguage } from "@/localization/LanguageContext";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { User, Phone, Mail, Globe } from "lucide-react";
import { motion } from "framer-motion";
import Link from "next/link";

export function MemberCard({ member }) {
  const { language } = useLanguage();

  return (
    <Card className="overflow-hidden bg-surface hover:shadow-md transition-all duration-300 group border hover:border-primary">
      {/* Top Red Accent Strip */}
      <div className="w-full h-1 bg-accent opacity-0 group-hover:opacity-100 transition-opacity" />
      
      <CardContent className="p-0">
        <div className="flex flex-col items-center p-6 text-center">
          {/* Photo */}
          <div className="w-32 h-32 rounded-full overflow-hidden bg-muted mb-4 border-4 border-background shadow-sm flex items-center justify-center text-muted-foreground">
            {member.photoUrl ? (
              <img src={member.photoUrl} alt={member.name} className="w-full h-full object-cover" />
            ) : (
              <User className="w-12 h-12 opacity-50" />
            )}
          </div>
          
          <h4 className="text-xl font-bold text-foreground mb-1">{member.name}</h4>
          <span className="inline-block px-2 py-1 bg-primary/10 text-primary text-xs font-semibold rounded-md mb-2">
            {member.position}
          </span>
          <p className="text-sm text-muted-foreground mb-4">{member.district}</p>
          
          {/* Social Links (Optional) */}
          <div className="flex space-x-3 mb-6">
            {member.showPhonePublic && member.phone && (
              <a href={`tel:${member.phone}`} className="text-muted-foreground hover:text-primary transition-colors">
                <Phone className="w-4 h-4" />
              </a>
            )}
            {member.showEmailPublic && member.email && (
              <a href={`mailto:${member.email}`} className="text-muted-foreground hover:text-primary transition-colors">
                <Mail className="w-4 h-4" />
              </a>
            )}
            {member.facebook && (
              <a href={member.facebook} target="_blank" rel="noopener noreferrer" className="text-muted-foreground hover:text-primary transition-colors">
                <Globe className="w-4 h-4" />
              </a>
            )}
          </div>

          <Link href={`/${language}/members/${member.id || "#"}`} className="w-full">
            <Button variant="outline" className="w-full group-hover:bg-primary group-hover:text-primary-foreground transition-colors">
              View Profile
            </Button>
          </Link>
        </div>
      </CardContent>
    </Card>
  );
}
