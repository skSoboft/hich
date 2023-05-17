import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  upiId: {
    type: String,
    required: true,
  },
  blocked: { type: Boolean, default: false },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  phone: {
    type: String,
    required: true,
  },
  isCarpenter: {
    type: Boolean,
    required: true,
    default: 0,
  },
  isEnglish: {
    type: Boolean,
    required: true,
    default: 1,
  },
  points: {
    type: Number,
    default: 0,
  },
  language: {
    type: String,
    default: "en", // Set the default language to 'en' (English)
  },
  role: {
    type: String,
    enum: ["admin", "user"],
    default: "user",
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

const User = mongoose.model("User", userSchema);

export default User;
