import User from "../models/User.js";
import Redeem from "../models/Redeem.js";
import { ObjectId } from "mongoose";

export const redeemPoints = async (req, res) => {
  const { points, userId } = req.body;
  try {
    // Find the user by ID
    const user = await User.findById(userId);
    if (!user) {
      return res.status(401).json({ message: "User not found" });
    }

    // Check if the user has enough points to redeem
    if (user.points < points) {
      return res.status(401).json({ message: "Insufficient points" });
    }

    // Create a redeem record
    const redeem = new Redeem({
      userId,
      points,
      status: "pending",
    });

    // Save the redeem record
    await redeem.save();

    // Update the user's points
    // user.points -= points;
    // await user.save();

    return res.status(201).json({
      success: true,
      message: "Request successfully sent to Accept/Reject",
    });
  } catch (error) {
    return res
      .status(500)
      .json({ success: false, message: "Failed to redeem points" });
  }
};

const userId = "60f7165b9b55a72fd4cfd1e1"; // ID of the user redeeming points
// const pointsToRedeem = 100; // Number of points to redeem

export const acceptRedeemRequest = async (req, res) => {
  try {
    const redeem = await Redeem.findById(req.params.redeemId).populate(
      "userId"
    );
    const user = await User.findById(redeem?.userId?._id);
    if (!user) {
      return res.status(401).json({ message: "User not found" });
    }
    if (!redeem) {
      return res.status(401).json({ message: "Redeem not found" });
    }
    // Deduct the points from the user's balance
    user.points -= redeem.points;
    redeem.status = "completed";
    // Save the updated user
    await user.save();
    await redeem.save();
    return res.status(201).json({
      success: true,
      message: "Request accepted successfully",
    });
  } catch (error) {
    return { success: false, message: error.message };
  }
};

export const rejectRedeemRequest = async (req, res) => {
  try {
    const redeem = await Redeem.findById(req.params.redeemId);
    const user = await User.findById(redeem?.userId?._id);
    if (!user) {
      return res.status(401).json({ message: "User not found" });
    }
    if (!redeem) {
      return res.status(401).json({ message: "Redeem not found" });
    }

    redeem.status = "rejected";

    await redeem.save();
    return res.status(201).json({
      success: true,
      message: "Request rejected successfully",
    });
  } catch (error) {
    return { success: false, message: error.message };
  }
};

export const redeemRequestListing = async (req, res) => {
  try {
    const { status } = req.query;

    // Find status based on the status query parameter
    const redeemRequests = await Redeem.find({ status });

    return res.status(200).json({ redeemRequests });
  } catch (error) {
    console.log("ERROR:", error.message);
    return res.status(500).json({ message: "Server error." });
  }
};
