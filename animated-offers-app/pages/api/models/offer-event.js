import mongoose from "mongoose";
import { Decimal128, ObjectId } from "mongodb";

const offerEventSchema = new mongoose.Schema(
  {
    shop: String,
    offerId: String,
    offerTypeId: Number,
    eventName: String,
    conversionValue: Decimal128,
    currency: String,
  },
  { collection: "offer-events" }
);

const offerEvent =
  mongoose.models.offerEvent || mongoose.model("offerEvent", offerEventSchema);

export default offerEvent;
