import mongoose from 'mongoose';
import * as dotenv from 'dotenv';
import path from 'path';

// Load .env.local
dotenv.config({ path: path.resolve(process.cwd(), '.env.local') });

// Assuming models are properly structured, we will import them dynamically or define them here if not fully available in script context.
// Let's use standard ES module imports assuming this is run with node --experimental-modules or we can just require if needed.
// Given Next.js, we should use dynamic imports or transpile. Let's write a simple script that we can run with `npx tsx` or `node`.
import connectToDatabase from '../lib/mongodb.js';
import AboutPage from '../models/AboutPage.js';
import AboutCoreValue from '../models/AboutCoreValue.js';
import AboutTimeline from '../models/AboutTimeline.js';
import AboutActivity from '../models/AboutActivity.js';
import AboutStatistic from '../models/AboutStatistic.js';
import AboutDocument from '../models/AboutDocument.js';

const seed = async () => {
  try {
    console.log('Connecting to database...');
    await connectToDatabase();
    console.log('Connected.');

    const provinceId = process.env.NEXT_PUBLIC_PROVINCE_ID || '64f0b2f6e4b0a1b2c3d4e5f6';

    // Default system user ID for seeding (or just use a dummy one if required)
    const userId = new mongoose.Types.ObjectId();

    console.log(`Seeding About Page data for province: ${provinceId}`);

    // 1. AboutPage
    const aboutPageData = {
      hero: {
        title: { en: 'Welcome to NYFN Gandaki', np: 'राष्ट्रिय युवा संघ नेपाल गण्डकीमा स्वागत छ' },
        subtitle: { en: 'Empowering the youth for a better tomorrow.', np: 'भोलिको उज्ज्वल भविष्यको लागि युवा सशक्तिकरण।' },
      },
      organization: {
        whoWeAre: { en: 'We are a dedicated youth organization...', np: 'हामी एक समर्पित युवा संगठन हौं...' },
        vision: { en: 'To create a prosperous society led by capable youth.', np: 'सक्षम युवाहरुको नेतृत्वमा समृद्ध समाजको निर्माण गर्ने।' },
        mission: { en: 'Empowering youth through education, leadership, and action.', np: 'शिक्षा, नेतृत्व र कार्यको माध्यमबाट युवाहरुलाई सशक्त बनाउने।' },
      },
      leadership: {
        quote: { en: 'Youth are the pillars of our nation. We must unite to build a prosperous Gandaki.', np: 'युवा राष्ट्रका खम्बा हुन्। समृद्ध गण्डकी निर्माणका लागि हामी एकजुट हुनुपर्छ।' },
        author: { en: 'Mahendra Bista', np: 'महेन्द्र बिष्ट' },
        role: { en: 'President, NYFN Gandaki', np: 'अध्यक्ष, राष्ट्रिय युवा संघ नेपाल गण्डकी' }, // Role is not in schema, but quote and author are
      },
      cta: {
        title: { en: 'Join Our Movement Today', np: 'आजै हाम्रो अभियानमा जोडिनुहोस्' },
        link: '/join',
      },
      seo: {
        title: { en: 'About Us | NYFN Gandaki', np: 'हाम्रो बारेमा | NYFN गण्डकी' },
        description: { en: 'Official website of National Youth Federation Nepal, Gandaki Province', np: 'राष्ट्रिय युवा संघ नेपाल, गण्डकी प्रदेशको आधिकारिक वेबसाइट' },
        keywords: ['youth', 'nepal', 'gandaki']
      },
      status: 'PUBLISHED'
    };

    await AboutPage.findOneAndUpdate(
      { provinceId },
      { ...aboutPageData, createdBy: userId, updatedBy: userId },
      { upsert: true, new: true }
    );
    console.log('Upserted AboutPage.');

    // 2. Core Values
    await AboutCoreValue.deleteMany({ provinceId });
    const coreValues = [
      { title: { en: 'Integrity', np: 'सत्यनिष्ठा' }, description: { en: 'We believe in honesty.', np: 'हामी इमान्दारीतामा विश्वास गर्छौं।' }, iconName: 'Shield', displayOrder: 1, status: 'ACTIVE' },
      { title: { en: 'Leadership', np: 'नेतृत्व' }, description: { en: 'Guiding the next generation.', np: 'नयाँ पुस्तालाई मार्गदर्शन गर्ने।' }, iconName: 'Flag', displayOrder: 2, status: 'ACTIVE' },
      { title: { en: 'Innovation', np: 'नवप्रवर्तन' }, description: { en: 'Thinking outside the box.', np: 'नयाँ सोचको विकास गर्ने।' }, iconName: 'Lightbulb', displayOrder: 3, status: 'ACTIVE' }
    ];
    for (const val of coreValues) {
      await AboutCoreValue.create({ ...val, provinceId, createdBy: userId, updatedBy: userId });
    }
    console.log('Seeded AboutCoreValue.');

    // 3. Timeline
    await AboutTimeline.deleteMany({ provinceId });
    const timeline = [
      { year: 2024, title: { en: 'Youth Festival', np: 'युवा महोत्सव' }, description: { en: 'Celebrated across the province.', np: 'प्रदेशभरि युवा महोत्सव मनाइयो।' }, displayOrder: 1, status: 'ACTIVE' },
      { year: 2023, title: { en: 'First General Assembly', np: 'प्रथम साधारण सभा' }, description: { en: 'The historical first assembly.', np: 'ऐतिहासिक प्रथम साधारण सभा सम्पन्न।' }, displayOrder: 2, status: 'ACTIVE' }
    ];
    for (const val of timeline) {
      await AboutTimeline.create({ ...val, provinceId, createdBy: userId, updatedBy: userId });
    }
    console.log('Seeded AboutTimeline.');

    // 4. Activities
    await AboutActivity.deleteMany({ provinceId });
    const activities = [
      { title: { en: 'Blood Donation', np: 'रक्तदान कार्यक्रम' }, category: { en: 'Social Work', np: 'समाज सेवा' }, shortDescription: { en: 'Annual blood donation camp.', np: 'वार्षिक रक्तदान शिविर।' }, displayOrder: 1, status: 'ACTIVE' },
      { title: { en: 'Tree Plantation', np: 'वृक्षारोपण' }, category: { en: 'Environment', np: 'वातावरण' }, shortDescription: { en: 'Planting 1000 trees.', np: '१००० वृक्षारोपण कार्यक्रम।' }, displayOrder: 2, status: 'ACTIVE' }
    ];
    for (const val of activities) {
      await AboutActivity.create({ ...val, provinceId, createdBy: userId, updatedBy: userId });
    }
    console.log('Seeded AboutActivity.');

    // 5. Statistics
    await AboutStatistic.deleteMany({ provinceId });
    const statistics = [
      { title: { en: 'Active Members', np: 'सक्रिय सदस्यहरु' }, value: '5,000+', iconName: 'Users', displayOrder: 1, status: 'ACTIVE' },
      { title: { en: 'Districts Reached', np: 'जिल्लाहरु' }, value: '11', iconName: 'Map', displayOrder: 2, status: 'ACTIVE' },
      { title: { en: 'Events Completed', np: 'सम्पन्न कार्यक्रम' }, value: '150+', iconName: 'Calendar', displayOrder: 3, status: 'ACTIVE' }
    ];
    for (const val of statistics) {
      await AboutStatistic.create({ ...val, provinceId, createdBy: userId, updatedBy: userId });
    }
    console.log('Seeded AboutStatistic.');

    console.log('Seeding completed successfully!');
    process.exit(0);
  } catch (error) {
    console.error('Error seeding data:', error);
    process.exit(1);
  }
};

seed();
