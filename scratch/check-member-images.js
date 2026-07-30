const mongoose = require('mongoose');

async function checkMembers() {
  const uri = process.env.MONGODB_URI || "mongodb://127.0.0.1:27017/nyfn-gandaki";
  console.log("Connecting to:", uri);
  await mongoose.connect(uri);
  
  const memberSchema = new mongoose.Schema({}, { strict: false });
  const Member = mongoose.models.Member || mongoose.model('Member', memberSchema);
  
  const members = await Member.find({}).lean();
  console.log("Found members count:", members.length);
  members.forEach(m => {
    console.log({
      name: m.name,
      profilePhotoId: m.profilePhotoId,
      photo: m.photo,
      status: m.status
    });
  });
  
  await mongoose.disconnect();
}

checkMembers().catch(console.error);
