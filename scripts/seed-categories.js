import mongoose from 'mongoose';
import * as dotenv from 'dotenv';
import path from 'path';

// Load environment variables
dotenv.config({ path: path.resolve(process.cwd(), '.env.local') });
dotenv.config({ path: path.resolve(process.cwd(), '.env') });

const MONGODB_URI = process.env.MONGODB_URI;

if (!MONGODB_URI) {
  console.error("Please define the MONGODB_URI environment variable");
  process.exit(1);
}

const EVENT_CATEGORIES = [
  'Meeting',
  'Training',
  'Workshop',
  'Conference',
  'Campaign',
  'Social Service',
  'Sports',
  'Cultural',
  'Other',
];

const EventCategorySchema = new mongoose.Schema({
  name: {
    en: { type: String, required: true },
    np: { type: String, required: true },
  },
  slug: { type: String, required: true, unique: true },
  color: { type: String, default: '#1546B0' },
  isActive: { type: Boolean, default: true },
});

const EventCategory = mongoose.models.EventCategory || mongoose.model('EventCategory', EventCategorySchema);

async function seed() {
  try {
    await mongoose.connect(MONGODB_URI);
    console.log("Connected to database...");

    for (const cat of EVENT_CATEGORIES) {
      const slug = cat.toLowerCase().replace(/\s+/g, '-');
      
      const exists = await EventCategory.findOne({ slug });
      if (!exists) {
        await EventCategory.create({
          name: { en: cat, np: cat }, // using English as placeholder for Nepali
          slug,
          color: '#1546B0',
          isActive: true
        });
        console.log(`Created category: ${cat}`);
      } else {
        console.log(`Category already exists: ${cat}`);
      }
    }
    console.log("Seeding complete!");
  } catch (error) {
    console.error("Error seeding categories:", error);
  } finally {
    await mongoose.disconnect();
    process.exit(0);
  }
}

seed();
