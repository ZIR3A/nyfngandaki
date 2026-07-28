"use client";

import Link from "next/link";
import { useLanguage } from "@/localization/LanguageContext";
import { Globe, MessageCircle, Share2, Mail, Phone, MapPin, Send } from "lucide-react";
import { Container } from "./Container";
import { Button } from "../ui/button";

export function Footer({ settings }) {
  const { t, language } = useLanguage();
  const currentYear = new Date().getFullYear();

  // Dynamic Contact info
  const phone = settings?.contact?.phone || "+977 1234567890";
  const email = settings?.contact?.email || "info@nyfngandaki.org";
  const address = settings?.contact?.address?.[language] || "Pokhara, Gandaki Province, Nepal";
  const orgName = settings?.organizationName?.[language] || "NYFN Gandaki";

  return (
    <footer className="bg-[#0F172A] text-white pt-16 pb-8 border-t-4 border-t-accent">
      <Container>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8 lg:gap-12 mb-12">
          
          {/* Column 1: Organization */}
          <div className="space-y-4 lg:col-span-1">
            <h3 className="text-2xl font-bold text-white mb-2">{orgName}</h3>
            <p className="text-gray-400 text-sm leading-relaxed max-w-xs">
              National Youth Federation Nepal is the largest youth organization dedicated to social transformation and leadership development.
            </p>
            <div className="flex space-x-4 pt-2">
              <a href={settings?.socialLinks?.facebook || "#"} aria-label="Facebook" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-primary active:text-accent transition-colors">
                <Globe className="w-5 h-5" />
              </a>
              <a href={settings?.socialLinks?.twitter || "#"} aria-label="Twitter" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-primary active:text-accent transition-colors">
                <MessageCircle className="w-5 h-5" />
              </a>
              <a href={settings?.socialLinks?.youtube || "#"} aria-label="Youtube" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-primary active:text-accent transition-colors">
                <Share2 className="w-5 h-5" />
              </a>
            </div>
          </div>

          {/* Column 2: Quick Links */}
          <div className="lg:col-span-1">
            <h4 className="font-bold text-white mb-6 uppercase tracking-wider text-sm">Quick Links</h4>
            <ul className="space-y-3 text-sm text-gray-400">
              <li><Link href={`/${language}`} className="hover:text-primary transition-colors">{t("navigation.home") || "Home"}</Link></li>
              <li><Link href={`/${language}/about`} className="hover:text-primary transition-colors">{t("navigation.about") || "About"}</Link></li>
              <li><Link href={`/${language}/province-committee`} className="hover:text-primary transition-colors">{t("navigation.committee") || "Province Committee"}</Link></li>
              <li><Link href={`/${language}/districts`} className="hover:text-primary transition-colors">{t("navigation.districts") || "Districts"}</Link></li>
              <li><Link href={`/${language}/events`} className="hover:text-primary transition-colors">{t("navigation.events") || "Events"}</Link></li>
            </ul>
          </div>

          {/* Column 3: Contact Info */}
          <div className="lg:col-span-1">
            <h4 className="font-bold text-white mb-6 uppercase tracking-wider text-sm">Office Info</h4>
            <ul className="space-y-4 text-sm text-gray-400">
              <li className="flex items-start">
                <MapPin className="w-4 h-4 mr-3 mt-0.5 text-primary shrink-0" />
                <span>{address}</span>
              </li>
              <li className="flex items-center">
                <Phone className="w-4 h-4 mr-3 text-primary shrink-0" />
                <span>{phone}</span>
              </li>
              <li className="flex items-center">
                <Mail className="w-4 h-4 mr-3 text-primary shrink-0" />
                <span>{email}</span>
              </li>
            </ul>
          </div>

          {/* Column 4: Important Links */}
          <div className="lg:col-span-1">
            <h4 className="font-bold text-white mb-6 uppercase tracking-wider text-sm">Important Links</h4>
            <ul className="space-y-3 text-sm text-gray-400">
              <li><Link href={`/${language}/privacy`} className="hover:text-primary transition-colors">Privacy Policy</Link></li>
              <li><Link href={`/${language}/terms`} className="hover:text-primary transition-colors">Terms of Service</Link></li>
              <li><Link href={`/${language}/constitution`} className="hover:text-primary transition-colors">Constitution</Link></li>
              <li><Link href={`/${language}/documents`} className="hover:text-primary transition-colors">Downloads</Link></li>
            </ul>
          </div>

          {/* Column 5: Newsletter / Updates (New) */}
          <div className="lg:col-span-1 space-y-4">
            <h4 className="font-bold text-white mb-6 uppercase tracking-wider text-sm">Join Our Network</h4>
            <p className="text-gray-400 text-sm leading-relaxed">
              Stay updated with our latest activities, news, and opportunities in Gandaki Province.
            </p>
            <form className="mt-4 flex flex-col space-y-3" onSubmit={(e) => e.preventDefault()}>
              <input 
                type="email" 
                placeholder="Your email address" 
                className="bg-gray-800/50 border border-gray-700 rounded-lg px-4 py-2.5 text-sm text-white placeholder-gray-500 focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary"
                required
              />
              <Button type="submit" className="w-full bg-primary hover:bg-accent text-white rounded-lg flex items-center justify-center transition-colors">
                <Send className="w-4 h-4 mr-2" />
                Subscribe
              </Button>
            </form>
          </div>

        </div>

        {/* Bottom Bar */}
        <div className="border-t border-slate-800/80 pt-8 flex flex-col md:flex-row items-center justify-between text-xs text-gray-500">
          <p>&copy; {currentYear} {orgName}. All rights reserved.</p>
          <p className="mt-2 md:mt-0">Designed for NYFN Gandaki Province</p>
        </div>
      </Container>
    </footer>
  );
}
