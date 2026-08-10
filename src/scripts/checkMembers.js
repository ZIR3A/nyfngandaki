import mongoose from "mongoose";

const uri = "mongodb+srv://saranbrl35_db_user:vRUPnszvVtNKueYG@nyfn.m8kfb2l.mongodb.net/test?retryWrites=true&w=majority";

const districtSchema = new mongoose.Schema({}, { strict: false });
const District = mongoose.models.District || mongoose.model("District", districtSchema, "districts");

const memberSchema = new mongoose.Schema({}, { strict: false });
const Member = mongoose.models.Member || mongoose.model("Member", memberSchema, "members");

async function main() {
  try {
    await mongoose.connect(uri);
    console.log("Connected to MongoDB.");

    const districts = await District.find({}).lean();
    console.log("Districts:", districts.map(d => ({ slug: d.slug, en: d.name?.en, _id: d._id })));

    const members = await Member.find({}).lean();
    console.log(`Found ${members.length} members`);
    
    // Check Nawalpur or Nawalparasi members
    const nawalpur = districts.find(d => d.slug.includes('nawalpur') || d.slug.includes('nawalparasi'));
    if (nawalpur) {
      console.log("Nawalpur district:", nawalpur);
      const nawalpurMembers = members.filter(m => String(m.district) === String(nawalpur._id));
      console.log(`Members in ${nawalpur.slug}:`, nawalpurMembers.map(m => m.name?.en));
    } else {
      console.log("Nawalpur district not found in DB.");
    }
  } catch (err) {
    console.error(err);
  } finally {
    await mongoose.disconnect();
  }
}

main();
