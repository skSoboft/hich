import mongoose from "mongoose";

// Define a Mongoose schema for the Reward
const rewardSchema = new mongoose.Schema(
  {
    nameInHindi: { type: String, required: true },
    nameInEnglish: { type: String, required: true },
    image: { type: Buffer, required: true },
    descriptionInHindi: { type: String, required: true },
    descriptionInEnglish: { type: String, required: true },
    deleted: {
      type: Boolean,
      default: false,
    },
    price: { type: Number, required: true },
  },
  { timestamps: true }
);

rewardSchema.methods.softDelete = function () {
  this.deleted = true;
  this.deletedAt = Date.now();
  return this.save();
};

// Create a Mongoose model for the Reward
const Reward = mongoose.model("Reward", rewardSchema);

export default Reward;
