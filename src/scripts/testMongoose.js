import mongoose from 'mongoose';
import * as dotenv from 'dotenv';
import path from 'path';

dotenv.config({ path: path.resolve(process.cwd(), '.env.local') });
import connectToDatabase from '../lib/mongodb.js';
import AboutPage from '../models/AboutPage.js';

const test = async () => {
  try {
    await connectToDatabase();
    const provinceId = '64f0b2f6e4b0a1b2c3d4e5f6';
    const userId = new mongoose.Types.ObjectId();
    
    const data = {"hero":{"title":{"en":"","np":""},"subtitle":{"en":"","np":""},"imageId":null,"visibility":true}};
    
    const res = await AboutPage.findOneAndUpdate(
      { provinceId, deletedAt: null },
      { ...data, updatedBy: userId },
      { new: true, upsert: true }
    );
    console.log("Success:", res);
    process.exit(0);
  } catch(e) {
    console.error("Error:", e);
    process.exit(1);
  }
};
test();
