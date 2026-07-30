'use client';

import React, { useState } from 'react';
import SectionHeading from '../../Strategy/Shared/SectionHeading';
import FAQItem from './FAQItem';

export default function FAQAccordion({ faqs, locale = 'en' }) {
  const [openIndex, setOpenIndex] = useState(0); // First item open by default

  if (!faqs || faqs.length === 0) return null;

  const isNp = locale === 'np';
  const label = isNp ? 'à¤¸à¤¾à¤®à¤¾à¤¨à¥à¤¯ à¤œà¤¾à¤¨à¤•à¤¾à¤°à¥€' : 'Knowledge Base';
  const heading = isNp ? 'à¤¬à¤¾à¤°à¤®à¥à¤¬à¤¾à¤° à¤¸à¥‹à¤§à¤¿à¤¨à¥‡ à¤ªà¥à¤°à¤¶à¥à¤¨à¤¹à¤°à¥‚' : 'Frequently Asked Questions';

  return (
    <section className="w-full max-w-[1024px] mx-auto px-6 md:px-12 py-16 md:py-16 lg:py-24">
      <div className="text-center mb-16">
        <SectionHeading label={label} heading={heading} centered={true} />
      </div>

      <div className="w-full">
        {faqs.map((faq, index) => (
          <FAQItem
            key={faq._id || index}
            item={faq}
            isOpen={openIndex === index}
            onClick={() => setOpenIndex(openIndex === index ? -1 : index)}
            locale={locale}
          />
        ))}
      </div>
    </section>
  );
}
