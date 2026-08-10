const mongoose = require('mongoose');
const dotenv = require('dotenv');
dotenv.config({ path: '.env.local' });

async function run() {
  await mongoose.connect(process.env.MONGODB_URI);
  const db = mongoose.connection.db;
  const positions = await db.collection('positions').find({}).toArray();
  for (const p of positions) {
    if (p.name?.en?.toLowerCase().includes("incharge")) {
        console.log(`Position: ${p.name?.en}, Weight: ${p.weight}, Group: ${p.displayGroup}`);
    }
  }
  process.exit(0);
}
run();
