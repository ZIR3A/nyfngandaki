const mongoose = require('mongoose');
const dotenv = require('dotenv');

dotenv.config({ path: '.env.local' });

async function run() {
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    console.log("Connected to MongoDB.");
    
    const db = mongoose.connection.db;

    const storages = await db.collection('storages').deleteMany({});
    console.log(`Deleted ${storages.deletedCount} documents from storages`);

  } catch (error) {
    console.error("Error:", error);
  } finally {
    process.exit(0);
  }
}

run();
