import mongoose from "mongoose";

const offerTypeSchema = new mongoose.Schema(
  {
    id: Number,
    isActive: Boolean,
    name: String,
    triggers: [String],
    actions: [String],
    conditions: [String],
  },
  { collection: "offer-types" }
);

const offerType =
  mongoose.models.offerType || mongoose.model("offerType", offerTypeSchema);

export default offerType;
