"use client";

import Link from "next/link";
import { useLanguage } from "@/localization/LanguageContext";
import { Mail, Phone, MapPin } from "lucide-react";
import { FaFacebook, FaTwitter, FaInstagram, FaYoutube, FaTiktok } from "react-icons/fa";
import { Container } from "./Container";
import { Button } from "../ui/button";

export function Footer({ settings }) {
  const { t, language } = useLanguage();
  const currentYear = new Date().getFullYear();

  // Dynamic Contact info
  const primaryPhone = settings?.contact?.phones?.find(p => p.isPrimary) || settings?.contact?.phones?.[0];
  const primaryEmail = settings?.contact?.emails?.find(e => e.isPrimary) || settings?.contact?.emails?.[0];
  const phone = primaryPhone?.number || "";
  const email = primaryEmail?.address || "";
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
              {settings?.socialLinks?.facebook && (
                <a href={settings.socialLinks.facebook} aria-label="Facebook" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-primary active:text-accent transition-colors">
                  <FaFacebook className="w-5 h-5" />
                </a>
              )}
              {settings?.socialLinks?.twitter && (
                <a href={settings.socialLinks.twitter} aria-label="Twitter" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-primary active:text-accent transition-colors">
                  <FaTwitter className="w-5 h-5" />
                </a>
              )}
              {settings?.socialLinks?.instagram && (
                <a href={settings.socialLinks.instagram} aria-label="Instagram" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-primary active:text-accent transition-colors">
                  <FaInstagram className="w-5 h-5" />
                </a>
              )}
              {settings?.socialLinks?.youtube && (
                <a href={settings.socialLinks.youtube} aria-label="Youtube" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-primary active:text-accent transition-colors">
                  <FaYoutube className="w-5 h-5" />
                </a>
              )}
              {settings?.socialLinks?.tiktok && (
                <a href={settings.socialLinks.tiktok} aria-label="TikTok" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-primary active:text-accent transition-colors">
                  <FaTiktok className="w-5 h-5" />
                </a>
              )}
            </div>
          </div>

          {/* Column 2: Quick Links */}
          <div className="lg:col-span-1">
            <h4 className="font-bold text-white mb-6 uppercase tracking-wider text-sm">{language === 'en' ? 'Quick Links' : 'द्रुत लिङ्कहरू'}</h4>
            <ul className="space-y-3 text-sm text-gray-400">
              <li><Link href={`/${language}/about`} className="hover:text-primary transition-colors">{language === 'en' ? 'About Us' : 'हाम्रो बारेमा'}</Link></li>
              <li><Link href={`/${language}/members`} className="hover:text-primary transition-colors">{language === 'en' ? 'Members' : 'सदस्यहरू'}</Link></li>
              <li><Link href={`/${language}/districts`} className="hover:text-primary transition-colors">{language === 'en' ? 'Districts' : 'जिल्लाहरू'}</Link></li>
              <li><Link href={`/${language}/events`} className="hover:text-primary transition-colors">{language === 'en' ? 'Events' : 'कार्यक्रमहरू'}</Link></li>
            </ul>
          </div>

          {/* Column 3: Contact Info */}
          <div className="lg:col-span-1">
            <h4 className="font-bold text-white mb-6 uppercase tracking-wider text-sm">{language === 'en' ? 'Office Info' : 'कार्यालय जानकारी'}</h4>
            <ul className="space-y-4 text-sm text-gray-400">
              {address && (
                <li className="flex items-start">
                  <MapPin className="w-4 h-4 mr-3 mt-0.5 text-primary shrink-0" />
                  <span>{address}</span>
                </li>
              )}
              {phone && (
                <li className="flex items-center">
                  <Phone className="w-4 h-4 mr-3 text-primary shrink-0" />
                  <a href={`tel:${phone}`} className="hover:text-primary transition-colors">{phone}</a>
                </li>
              )}
              {email && (
                <li className="flex items-center">
                  <Mail className="w-4 h-4 mr-3 text-primary shrink-0" />
                  <a href={`mailto:${email}`} className="hover:text-primary transition-colors">{email}</a>
                </li>
              )}
            </ul>
          </div>

          {/* Column 4: Important Links */}
          <div className="lg:col-span-1">
            <h4 className="font-bold text-white mb-6 uppercase tracking-wider text-sm">{language === 'en' ? 'Important Links' : 'महत्वपूर्ण लिङ्कहरू'}</h4>
            <ul className="space-y-3 text-sm text-gray-400">
              <li><Link href={`/${language}/bidhan`} className="hover:text-primary transition-colors">{language === 'en' ? 'Bidhan (Constitution)' : 'विधान'}</Link></li>
              <li><Link href={`/${language}/contact`} className="hover:text-primary transition-colors">{language === 'en' ? 'Contact' : 'सम्पर्क'}</Link></li>
              <li><Link href={`/${language}/privacy`} className="hover:text-primary transition-colors">{language === 'en' ? 'Privacy Policy' : 'गोपनीयता नीति'}</Link></li>
              <li><Link href={`/${language}/terms`} className="hover:text-primary transition-colors">{language === 'en' ? 'Terms of Service' : 'सेवाका सर्तहरू'}</Link></li>
            </ul>
          </div>
          {/* Column 5: Contact Us CTA */}
          <div className="lg:col-span-1 space-y-4">
            <h4 className="font-bold text-white mb-6 uppercase tracking-wider text-sm">{language === 'en' ? 'Get In Touch' : 'सम्पर्क गर्नुहोस्'}</h4>
            <p className="text-gray-400 text-sm leading-relaxed mb-4">
              {language === 'en' ? 'Have questions or want to collaborate? Reach out to our team.' : 'कुनै प्रश्न छ वा सहकार्य गर्न चाहनुहुन्छ? हाम्रो टोलीलाई सम्पर्क गर्नुहोस्।'}
            </p>
            <Button asChild className="w-full bg-primary hover:bg-accent text-white rounded-lg flex items-center justify-center transition-colors">
              <Link href={`/${language}/contact`}>
                {language === 'en' ? 'Contact Us' : 'सम्पर्क गर्नुहोस्'}
              </Link>
            </Button>
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
