import mongoose from "mongoose";

const qrCodeSchema = new mongoose.Schema(
  {
    points: {
      type: Number,
      required: true,
    },
    qrData: {
      type: String,
      required: true,
    },
    unique_id: {
        type: String,
        required: true
    },
    createdAt: {
      type: Date,
      default: Date.now,
    },
    redeemed: {
      type: Boolean,
      default: false,
    },
    redeemedAt: {
      type: Date,
    },
    deleted: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true }
);

qrCodeSchema.methods.softDelete = function () {
  this.deleted = true;
  this.deletedAt = Date.now();
  return this.save();
};

const QRCode = mongoose.model("QRCode", qrCodeSchema);

export default QRCode;
