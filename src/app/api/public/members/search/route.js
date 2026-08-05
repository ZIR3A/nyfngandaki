import { NextResponse } from "next/server";
import connectToDatabase from "@/lib/mongodb";
import Member from "@/models/Member";
import District from "@/models/District";
import Committee from "@/models/Committee";
import Position from "@/models/Position";
import { resolveAssets } from "@/modules/storage/helpers/resolver.helper";

const MEMBER_ASSET_MAPPING = [
  { idField: 'profilePhotoId', urlField: 'photo' },
  { idField: 'coverPhotoId', urlField: 'coverPhoto' }
];

export async function GET(request) {
  try {
    const { searchParams } = new URL(request.url);
    const q = searchParams.get("q") || "";

    if (!q || q.trim().length < 2) {
      return NextResponse.json({ success: true, data: [] });
    }

    await connectToDatabase();
    
    // Create regex for case-insensitive partial matching
    const regex = new (require("mongoose").mongo.BSONRegExp)(q, "i");

    // We can search by Name (en/np), Position (en/np), or District name (but district is an ObjectId reference, so we'd have to lookup or just search what's in the Member model)
    // To search district, we can lookup, but standard approach: populate district, then filter in memory if needed, 
    // OR we can do an aggregation pipeline with $lookup. 
    // For simplicity, we search name and position via regex. If they search by district, they can use the district filter later. 
    // Wait, the prompt says "Search by Name, Position, District". 
    // We will do a regex search on Member name.en, name.np, position.en, position.np.
    // For District, we first find matching districts.
    
    const matchedDistricts = await District.find({
      $or: [
        { "name.en": { $regex: q, $options: "i" } },
        { "name.np": { $regex: q, $options: "i" } }
      ]
    }).select("_id");
    const districtIds = matchedDistricts.map(d => d._id);

    const matchedCommittees = await Committee.find({
      $or: [
        { "name.en": { $regex: q, $options: "i" } },
        { "name.np": { $regex: q, $options: "i" } }
      ]
    }).select("_id");
    const committeeIds = matchedCommittees.map(c => c._id);

    const matchedPositions = await Position.find({
      $or: [
        { "name.en": { $regex: q, $options: "i" } },
        { "name.np": { $regex: q, $options: "i" } }
      ]
    }).select("_id");
    const positionIds = matchedPositions.map(p => p._id);

    // Also match organizationLevel explicitly if user types "province", "district", "incharge", or "central"
    const matchWords = q.toLowerCase().split(' ');
    const isCentralMatch = matchWords.includes("central") || matchWords.includes("केन्द्रीय");
    const isProvinceMatch = matchWords.includes("province") || matchWords.includes("प्रदेश") || matchWords.includes("गण्डकी");
    const isDistrictMatch = matchWords.includes("district") || matchWords.includes("जिल्ला");

    const searchCriteria = [
      { "name.en": { $regex: q, $options: "i" } },
      { "name.np": { $regex: q, $options: "i" } }
    ];
    
    if (districtIds.length > 0) searchCriteria.push({ district: { $in: districtIds } });
    if (committeeIds.length > 0) searchCriteria.push({ committee_id: { $in: committeeIds } });
    if (positionIds.length > 0) searchCriteria.push({ position_id: { $in: positionIds } });
    if (isCentralMatch) searchCriteria.push({ organizationLevel: "Central" });
    if (isProvinceMatch) searchCriteria.push({ organizationLevel: { $in: ["Province", "PROVINCE"] } });
    if (isDistrictMatch) searchCriteria.push({ organizationLevel: { $in: ["District", "DISTRICT"] } });

    const members = await Member.find({
      $or: searchCriteria,
      status: "Active"
    })
      .populate("district")
      .populate("committee_id")
      .populate("position_id")
      .limit(10)
      .lean();

    const resolved = await resolveAssets(members, MEMBER_ASSET_MAPPING);

    // Serialize object ids
    const serialized = resolved.map(member => {
      const s = { ...member };
      if (s._id) s._id = s._id.toString();
      if (s.district) {
        s.district = { ...s.district, _id: s.district._id?.toString() };
      }
      if (s.committee_id) {
        s.committee_id = { ...s.committee_id, _id: s.committee_id._id?.toString() };
      }
      if (s.position_id) {
        s.position_id = { ...s.position_id, _id: s.position_id._id?.toString() };
      }
      return s;
    });

    return NextResponse.json({ success: true, data: serialized });
  } catch (error) {
    console.error("Search API Error:", error);
    return NextResponse.json({ success: false, message: "Search failed" }, { status: 500 });
  }
}
