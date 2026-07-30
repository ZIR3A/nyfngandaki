/**
 * Seed Script: About Statistics
 * Run: node scripts/seed-statistics.mjs
 *
 * Seeds the AboutStatistic collection with NYFN Gandaki statistics.
 * Finds the existing provinceId from the AboutPage document (or uses the
 * default fallback). Does NOT duplicate if items already exist.
 */

import mongoose from 'mongoose';
import dotenv from 'dotenv';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
dotenv.config({ path: join(__dirname, '../.env.local') });

const MONGODB_URI = process.env.MONGODB_URI;
if (!MONGODB_URI) {
  console.error('❌  MONGODB_URI is not set in .env.local');
  process.exit(1);
}

// ── Schemas (inline, no import aliases) ──────────────────────────────────────

const aboutPageSchema = new mongoose.Schema({ provinceId: mongoose.Schema.Types.ObjectId }, { strict: false });
const AboutPage = mongoose.models.AboutPage || mongoose.model('AboutPage', aboutPageSchema);

const aboutStatisticSchema = new mongoose.Schema(
  {
    provinceId:   { type: mongoose.Schema.Types.ObjectId, required: true },
    title:        { en: { type: String, required: true }, np: { type: String, required: true } },
    number:       { type: String, required: true },
    suffix:       { en: String, np: String },
    icon:         String,
    displayOrder: { type: Number, default: 0 },
    status:       { type: String, enum: ['ACTIVE', 'INACTIVE'], default: 'ACTIVE' },
    deletedAt:    { type: Date, default: null },
  },
  { timestamps: true }
);
const AboutStatistic = mongoose.models.AboutStatistic || mongoose.model('AboutStatistic', aboutStatisticSchema);

// ── Statistics seed data ──────────────────────────────────────────────────────

const STATISTICS = [
  {
    title:        { en: 'District Committees',      np: 'जिल्ला समितिहरू'          },
    number:       '11',
    suffix:       { en: '',  np: ''  },
    icon:         'globe',
    displayOrder: 1,
  },
  {
    title:        { en: 'Active Members',           np: 'सक्रिय सदस्यहरू'          },
    number:       '500',
    suffix:       { en: '+', np: '+' },
    icon:         'users',
    displayOrder: 2,
  },
  {
    title:        { en: 'Events Organised',         np: 'आयोजित कार्यक्रमहरू'      },
    number:       '120',
    suffix:       { en: '+', np: '+' },
    icon:         'activity',
    displayOrder: 3,
  },
  {
    title:        { en: 'Years of Service',         np: 'सेवाका वर्षहरू'            },
    number:       '15',
    suffix:       { en: '+', np: '+' },
    icon:         'award',
    displayOrder: 4,
  },
  {
    title:        { en: 'Youth Leaders Trained',    np: 'प्रशिक्षित युवा नेताहरू'   },
    number:       '2000',
    suffix:       { en: '+', np: '+' },
    icon:         'target',
    displayOrder: 5,
  },
  {
    title:        { en: 'Community Projects',       np: 'सामुदायिक परियोजनाहरू'    },
    number:       '80',
    suffix:       { en: '+', np: '+' },
    icon:         'heart',
    displayOrder: 6,
  },
  {
    title:        { en: 'Municipalities Covered',   np: 'समेटिएका नगरपालिकाहरू'   },
    number:       '85',
    suffix:       { en: '',  np: '' },
    icon:         'shield',
    displayOrder: 7,
  },
  {
    title:        { en: 'Province Coverage',        np: 'प्रदेश कभरेज'              },
    number:       '1',
    suffix:       { en: '',  np: '' },
    icon:         'zap',
    displayOrder: 8,
  },
];

// ── Main ──────────────────────────────────────────────────────────────────────

async function main() {
  console.log('🔌  Connecting to MongoDB…');
  await mongoose.connect(MONGODB_URI, { dbName: 'nyfn-gandaki' });
  console.log('✅  Connected.\n');

  // Resolve provinceId from existing AboutPage, fall back to default
  const existingPage = await AboutPage.findOne({ deletedAt: null }).lean();
  const PROVINCE_ID = existingPage?.provinceId
    ? existingPage.provinceId
    : new mongoose.Types.ObjectId('64f0b2f6e4b0a1b2c3d4e5f6');

  console.log(`📍  Using provinceId: ${PROVINCE_ID}\n`);

  // Check existing
  const existing = await AboutStatistic.find({ provinceId: PROVINCE_ID, deletedAt: null }).lean();
  console.log(`📊  Found ${existing.length} existing statistic(s) in DB.`);

  if (existing.length > 0) {
    console.log('ℹ️   Existing statistics:');
    existing.forEach(s => console.log(`     - [${s.displayOrder}] ${s.title?.en} = ${s.number}${s.suffix?.en || ''}`));
    console.log('\n⚠️   Statistics already exist. Skipping to avoid duplicates.');
    console.log('     Remove them via the CRM Statistics tab or MongoDB Atlas to re-seed.\n');
    await mongoose.disconnect();
    return;
  }

  // Insert
  const docs = STATISTICS.map(s => ({ ...s, provinceId: PROVINCE_ID, status: 'ACTIVE', deletedAt: null }));
  const result = await AboutStatistic.insertMany(docs);
  console.log(`\n✅  Seeded ${result.length} statistics:\n`);
  result.forEach(r => console.log(`     ✓ [${r.displayOrder}] ${r.title.en} = ${r.number}${r.suffix?.en || ''}`));
  console.log('\n🎉  Done! Refresh the public About page to see Statistics & Impact.\n');

  await mongoose.disconnect();
}

main().catch(err => {
  console.error('❌  Seed error:', err);
  mongoose.disconnect();
  process.exit(1);
});
