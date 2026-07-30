'use client';

import React from 'react';
import { Link as LinkIcon } from 'lucide-react';
import { FaFacebook, FaTwitter, FaInstagram, FaYoutube, FaLinkedin } from 'react-icons/fa';

export default function SocialLinks({ social, locale = 'en' }) {
  if (!social || social.length === 0) return null;

  const isNp = locale === 'np';

  const getIcon = (platform) => {
    switch (platform?.toLowerCase()) {
      case 'facebook': return <FaFacebook size={20} />;
      case 'twitter': return <FaTwitter size={20} />;
      case 'x': return <FaTwitter size={20} />;
      case 'instagram': return <FaInstagram size={20} />;
      case 'youtube': return <FaYoutube size={20} />;
      case 'linkedin': return <FaLinkedin size={20} />;
      default: return <LinkIcon size={20} />;
    }
  };

  const activeLinks = social.filter(s => s.status === 'active' && s.url);

  if (activeLinks.length === 0) return null;

  return (
    <div className="bg-primary-blue text-white rounded-3xl p-8 shadow-sm h-full flex flex-col justify-between relative overflow-hidden">
      
      {/* Decorative background element */}
      <div className="absolute top-0 right-0 -mr-16 -mt-16 w-48 h-48 bg-white/10 rounded-full blur-2xl" />

      <div className="relative z-10">
        <h3 className="text-xl font-bold mb-3 font-serif">
          {isNp ? 'à¤¸à¤¾à¤®à¤¾à¤œà¤¿à¤• à¤¸à¤žà¥à¤œà¤¾à¤²à¤®à¤¾ à¤œà¥‹à¤¡à¤¿à¤¨à¥à¤¹à¥‹à¤¸à¥' : 'Connect on Social Media'}
        </h3>
        <p className="text-blue-100 text-sm mb-8 leading-relaxed max-w-sm">
          {isNp 
            ? 'à¤¹à¤¾à¤®à¥à¤°à¤¾ à¤¨à¤µà¥€à¤¨à¤¤à¤® à¤—à¤¤à¤¿à¤µà¤¿à¤§à¤¿à¤¹à¤°à¥‚, à¤•à¤¾à¤°à¥à¤¯à¤•à¥à¤°à¤®à¤¹à¤°à¥‚ à¤° à¤…à¤¦à¥à¤¯à¤¾à¤µà¤§à¤¿à¤•à¤¹à¤°à¥‚à¤•à¥‹ à¤²à¤¾à¤—à¤¿ à¤¹à¤¾à¤®à¥€à¤²à¤¾à¤ˆ à¤ªà¤›à¥à¤¯à¤¾à¤‰à¤¨à¥à¤¹à¥‹à¤¸à¥à¥¤' 
            : 'Follow our official channels for the latest updates, events, and initiatives.'}
        </p>
      </div>

      <div className="flex flex-wrap gap-4 relative z-10">
        {activeLinks.map((link, index) => (
          <a
            key={index}
            href={link.url}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={`Visit our ${link.platform}`}
            className="w-12 h-12 rounded-full bg-white/10 hover:bg-white text-white hover:text-primary-blue flex items-center justify-center transition-all duration-300 hover:scale-110 hover:-translate-y-1 shadow-lg backdrop-blur-sm"
          >
            {getIcon(link.platform)}
          </a>
        ))}
      </div>
    </div>
  );
}
