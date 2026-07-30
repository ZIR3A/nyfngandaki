const { MemberService } = require('./src/services/MemberService');

async function test() {
  const uri = process.env.MONGODB_URI || "mongodb+srv://saranbrl35_db_user:vRUPnszvVtNKueYG@nyfn.m8kfb2l.mongodb.net";
  const mongoose = require('mongoose');
  await mongoose.connect(uri);
  
  const members = await MemberService.getAllMembers({ status: "Active" });
  console.log("Resolved members:", members.map(m => ({
    name: m.name,
    photo: m.photo,
    profilePhotoId: m.profilePhotoId
  })));
  
  await mongoose.disconnect();
}

test().catch(console.error);
