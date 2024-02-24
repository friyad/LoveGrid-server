import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true },
  password: { type: String, required: true, default: " " },
  profile: { type: String, required: false, default: " " },
  role: { type: [String], required: true, default: ["user"] },
  // myDonations: []
});

export const UserModel = mongoose.model("users", userSchema);
