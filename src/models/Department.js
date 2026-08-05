import mongoose from "mongoose";

const departmentSchema = new mongoose.Schema(
  {
    committee_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Committee",
      required: true,
      index: true,
    },
    name: {
      en: { type: String, required: true },
      np: { type: String, default: "" },
    },
    description: {
      en: { type: String, default: "" },
      np: { type: String, default: "" },
    },
    displayOrder: {
      type: Number,
      default: 0,
    },
    status: {
      type: String,
      enum: ["Active", "Inactive", "Draft", "Archived"],
      default: "Active",
    },
    deletedAt: {
      type: Date,
      default: null,
    },
  },
  {
    timestamps: true,
  }
);

// Indexes for faster lookups
departmentSchema.index({ committee_id: 1, status: 1 });
departmentSchema.index({ committee_id: 1, deletedAt: 1 });

const Department = mongoose.models.Department || mongoose.model("Department", departmentSchema);

export default Department;
