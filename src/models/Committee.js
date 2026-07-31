import mongoose from "mongoose";

const LocalizedStringSchema = new mongoose.Schema(
  {
    en: { type: String, trim: true, default: "" },
    np: { type: String, trim: true, default: "" },
  },
  { _id: false }
);

const CommitteeSchema = new mongoose.Schema(
  {
    name: {
      type: LocalizedStringSchema,
      required: true,
    },
    slug: {
      type: String,
      unique: true,
      required: true,
    },
    organizationLevel: {
      type: String,
      enum: ["PROVINCE", "DISTRICT"],
      required: true,
      default: "PROVINCE",
    },
    status: {
      type: String,
      enum: ["Active", "Inactive"],
      default: "Active",
    },
  },
  {
    timestamps: true,
  }
);

if (mongoose.models.Committee) {
  delete mongoose.models.Committee;
}
const Committee = mongoose.model("Committee", CommitteeSchema);

export default Committee;
