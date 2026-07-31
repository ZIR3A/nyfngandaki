import mongoose from "mongoose";

const LocalizedStringSchema = new mongoose.Schema(
  {
    en: { type: String, trim: true, default: "" },
    np: { type: String, trim: true, default: "" },
  },
  { _id: false }
);

const PositionSchema = new mongoose.Schema(
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
    weight: {
      type: Number,
      default: 0,
    },
    displayGroup: {
      type: String,
      enum: ["featured", "leadership", "executive", "committee"],
      default: "committee",
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

if (mongoose.models.Position) {
  delete mongoose.models.Position;
}
const Position = mongoose.model("Position", PositionSchema);

export default Position;
