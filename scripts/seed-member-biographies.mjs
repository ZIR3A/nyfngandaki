import mongoose from "mongoose";
import dotenv from "dotenv";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
dotenv.config({ path: path.join(__dirname, "../.env.local") });

// Localized String Schema definition matching the main codebase
const LocalizedStringSchema = new mongoose.Schema(
  {
    en: { type: String, trim: true, default: "" },
    np: { type: String, trim: true, default: "" },
  },
  { _id: false }
);

// We define a minimal schema here to interact with the existing members 
// without relying on the Next.js app structure (which might have issues in a pure Node script)
const MemberSchema = new mongoose.Schema(
  {
    biography: {
      type: LocalizedStringSchema,
    },
  },
  { strict: false } // allows us to load all docs without throwing schema errors on other fields
);

const Member = mongoose.models.Member || mongoose.model("Member", MemberSchema);

const DEFAULT_BIO_EN = `As a member of the National Youth Federation Nepal (NYFN), this individual is part of a youth-oriented organization committed to strengthening youth participation, leadership, and meaningful engagement in social and organizational activities. Their involvement reflects a shared commitment to the values, objectives, and principles of the organization.

Through their association with NYFN Gandaki, they contribute to building stronger connections among young people and encouraging active participation in community and organizational initiatives. The organization provides a platform for young people to develop leadership capabilities, exchange ideas, and work collectively toward positive change.

As part of the organizational structure, they have the opportunity to participate in various programs, discussions, campaigns, and activities that support youth development and organizational growth. Their role represents the collective responsibility of young members working together to strengthen coordination and promote constructive youth engagement.

NYFN Gandaki continues to encourage its members to demonstrate dedication, responsibility, discipline, and a spirit of collaboration. Through collective participation and continued engagement, members contribute to the broader vision of empowering youth and creating meaningful opportunities for their active role in society.`;

const DEFAULT_BIO_NP = `राष्ट्रिय युवा संघ नेपाल (NYFN) का सदस्यका रूपमा उहाँ युवाको सहभागिता, नेतृत्व विकास तथा सामाजिक र संगठनात्मक गतिविधिमा अर्थपूर्ण संलग्नता अभिवृद्धि गर्ने उद्देश्यसँग जोडिनुभएको छ। उहाँको संगठनसँगको आबद्धताले संघका मूल्य, उद्देश्य तथा सिद्धान्तप्रति साझा प्रतिबद्धतालाई प्रतिबिम्बित गर्दछ।

NYFN गण्डकीसँगको आबद्धतामार्फत उहाँले युवाहरूबीचको सम्बन्धलाई अझ सुदृढ बनाउन तथा विभिन्न सामाजिक र संगठनात्मक पहलहरूमा सक्रिय सहभागितालाई प्रोत्साहन गर्न योगदान पुर्याउँदै आउनुभएको छ। संघले युवाहरूलाई नेतृत्व क्षमता विकास गर्ने, विचार आदानप्रदान गर्ने तथा सकारात्मक परिवर्तनका लागि सामूहिक रूपमा कार्य गर्ने अवसर प्रदान गर्दछ।

संगठनात्मक संरचनाको एक सदस्यका रूपमा उहाँले युवा विकास तथा संगठनको सुदृढीकरणसँग सम्बन्धित विभिन्न कार्यक्रम, छलफल, अभियान तथा गतिविधिहरूमा सहभागी हुने अवसर प्राप्त गर्नुहुन्छ। उहाँको भूमिका युवाहरूको सामूहिक जिम्मेवारी, समन्वय र रचनात्मक सहभागितालाई थप मजबुत बनाउने साझा प्रयासको एक हिस्सा हो।

NYFN गण्डकीले आफ्ना सदस्यहरूमा समर्पण, जिम्मेवारी, अनुशासन तथा सहकार्यको भावना विकास गर्न निरन्तर प्रोत्साहन गर्दै आएको छ। सामूहिक सहभागिता र निरन्तर सक्रियतामार्फत सदस्यहरूले युवालाई सशक्त बनाउने तथा समाजमा उनीहरूको सक्रिय र अर्थपूर्ण भूमिकाका लागि अवसर सिर्जना गर्ने संगठनको व्यापक दृष्टिकोणमा योगदान पुर्याउँछन्।`;

const isEmpty = (str) => {
  return !str || str.trim() === "";
};

async function seedBiographies() {
  const MONGODB_URI = process.env.MONGODB_URI;
  if (!MONGODB_URI) {
    console.error("❌ MONGODB_URI is not defined in .env.local");
    process.exit(1);
  }

  try {
    console.log("Connecting to MongoDB...");
    await mongoose.connect(MONGODB_URI);
    console.log("✅ Connected to database");

    const members = await Member.find({});
    console.log(`\n📊 Total members found: ${members.length}`);

    let missingEnCount = 0;
    let missingNpCount = 0;
    let completeCount = 0;

    const updates = [];

    for (const member of members) {
      const bio = member.biography || { en: "", np: "" };
      let enMissing = isEmpty(bio.en);
      let npMissing = isEmpty(bio.np);

      if (enMissing) missingEnCount++;
      if (npMissing) missingNpCount++;
      if (!enMissing && !npMissing) completeCount++;

      if (enMissing || npMissing) {
        updates.push({
          updateOne: {
            filter: { _id: member._id },
            update: {
              $set: {
                "biography.en": enMissing ? DEFAULT_BIO_EN : bio.en,
                "biography.np": npMissing ? DEFAULT_BIO_NP : bio.np,
              },
            },
          },
        });
      }
    }

    console.log(`- Members with missing English biographies: ${missingEnCount}`);
    console.log(`- Members with missing Nepali biographies: ${missingNpCount}`);
    console.log(`- Members already having both biographies: ${completeCount}`);

    if (updates.length > 0) {
      console.log(`\n🚀 Executing bulk update for ${updates.length} members...`);
      const result = await Member.bulkWrite(updates);
      console.log(`✅ Update complete!`);
      console.log(`- Members updated: ${result.modifiedCount}`);
      
      // Counting how many EN/NP were newly inserted based on our earlier flags
      // is roughly missingEnCount and missingNpCount for the updated batch.
      console.log(`- English biographies inserted: ${missingEnCount}`);
      console.log(`- Nepali biographies inserted: ${missingNpCount}`);
    } else {
      console.log("\n✅ No updates needed. All members have both biographies.");
    }

    // Verify
    const finalMembers = await Member.find({});
    let finalMissingEn = 0;
    let finalMissingNp = 0;
    for (const member of finalMembers) {
      const bio = member.biography || { en: "", np: "" };
      if (isEmpty(bio.en)) finalMissingEn++;
      if (isEmpty(bio.np)) finalMissingNp++;
    }

    console.log(`\n🔎 Final Database Verification:`);
    console.log(`- Members with missing English biographies: ${finalMissingEn}`);
    console.log(`- Members with missing Nepali biographies: ${finalMissingNp}`);

  } catch (error) {
    console.error("❌ Error during script execution:", error);
  } finally {
    console.log("Disconnecting from database...");
    await mongoose.disconnect();
    console.log("✅ Disconnected");
  }
}

seedBiographies();
