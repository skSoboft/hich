import express from "express";
import {
  getAllRewards,
  getRewardById,
  createReward,
  updateRewardById,
  deleteRewardById,
  uploadImage,
  getTotalRewardCount,
} from "../controllers/rewardController.js";
import {
  authenticateToken,
  authorizeRole,
} from "../middlewares/authMiddleware.js";

const router = express.Router();

// Create a new reward
router.post(
  "/",
  authenticateToken,
  authorizeRole("admin"),
  uploadImage,
  createReward
);

// Get all rewards
router.get("/", authenticateToken, getAllRewards);

//Total count of rewards
router.get(
  "/count",
  authenticateToken,
  authorizeRole("user"),
  getTotalRewardCount
);

// Get a specific reward by ID
router.get("/:rewardId", authenticateToken, getRewardById);

// Update a reward by ID
router.put(
  "/:rewardId",
  authenticateToken,
  authorizeRole("admin"),
  uploadImage,
  updateRewardById
);

// Delete a reward by ID
router.delete(
  "/:rewardId",
  authenticateToken,
  authorizeRole("admin"),
  deleteRewardById
);

export default router;
