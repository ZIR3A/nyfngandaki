import mongoose from "mongoose";
import crypto from "crypto";

const LeadershipMessageSchema = new mongoose.Schema(
  {
    uuid: {
      type: String,
      default: () => crypto.randomUUID(),
      unique: true,
    },
    member_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Member",
      default: null,
    },
    is_custom_person: {
      type: Boolean,
      default: false,
    },
    custom_name_en: { type: String, trim: true, default: "" },
    custom_name_np: { type: String, trim: true, default: "" },
    custom_position_en: { type: String, trim: true, default: "" },
    custom_position_np: { type: String, trim: true, default: "" },
    custom_photo: { type: String, default: "" },
    short_message_en: {
      type: String,
      trim: true,
      required: true,
      maxlength: 300,
    },
    short_message_np: {
      type: String,
      trim: true,
      maxlength: 300,
      default: "",
    },
    full_message_en: {
      type: String,
      required: true,
      default: "",
    },
    full_message_np: {
      type: String,
      default: "",
    },
    homepage_visible: {
      type: Boolean,
      default: true,
    },
    about_visible: {
      type: Boolean,
      default: true,
    },
    featured: {
      type: Boolean,
      default: false,
    },
    display_order: {
      type: Number,
      default: 0,
    },
    status: {
      type: String,
      enum: ["draft", "published", "archived"],
      default: "draft",
    },
    published_at: {
      type: Date,
      default: null,
    },
    created_by: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      default: null,
    },
    updated_by: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      default: null,
    },
    deleted_at: {
      type: Date,
      default: null,
    },
  },
  {
    timestamps: {
      createdAt: "created_at",
      updatedAt: "updated_at",
    },
  }
);

// Indexes for performance
LeadershipMessageSchema.index({ member_id: 1 });
LeadershipMessageSchema.index({ status: 1 });
LeadershipMessageSchema.index({ display_order: 1 });
LeadershipMessageSchema.index({ published_at: -1 });
LeadershipMessageSchema.index({ homepage_visible: 1 });
LeadershipMessageSchema.index({ about_visible: 1 });

if (mongoose.models.LeadershipMessage) {
  delete mongoose.models.LeadershipMessage;
}
const LeadershipMessage = mongoose.model("LeadershipMessage", LeadershipMessageSchema);

export default LeadershipMessage;
