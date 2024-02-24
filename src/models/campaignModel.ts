import mongoose from "mongoose";

const campaignSchema = new mongoose.Schema({
  title: { type: String, required: true },
  category: { type: String, required: true },
  img: { type: String, required: true },
  blurImg: { type: String, required: true },
  color: { type: String, required: true },
  totalDonations: { type: Number, default: 0 },
  tlDonateAmount: { type: Number, default: 0 },
  goal: { type: Number, required: true },
  fundRaiserName: { type: String, required: true },
  fundRaiserPhoto: { type: String },
  lastDate: { type: String, required: true },
  description: { type: String, required: true },
});

export const CampaignModel = mongoose.model("Campaign", campaignSchema);
