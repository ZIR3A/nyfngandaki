const mongoose = require('mongoose');
const dotenv = require('dotenv');
dotenv.config({ path: '.env.local' });

async function run() {
  await mongoose.connect(process.env.MONGODB_URI);
  const db = mongoose.connection.db;
  const centralComm = await db.collection('committees').findOne({ "organizationLevel": "Central" });
  if (centralComm) {
    const members = await db.collection('members').find({ committee_id: centralComm._id }).toArray();
    for (const m of members) {
      console.log(`Name: ${m.fullName?.en}, Position: ${m.position?.en}, PosId: ${m.position_id}`);
    }
  } else {
    console.log("Central Committee not found");
  }
  process.exit(0);
}
run();
