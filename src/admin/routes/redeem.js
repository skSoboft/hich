import express from "express";
import {
  redeemPoints,
  acceptRedeemRequest,
  rejectRedeemRequest,
  redeemRequestListing,
} from "../controllers/redeemController.js";
import {
  authenticateToken,
  authorizeRole,
} from "../middlewares/authMiddleware.js";

const router = express.Router();

// Create a new reward
router.post("/", authenticateToken, redeemPoints);
router.post(
  "/accept/:redeemId",
  authenticateToken,
  authorizeRole("user"),
  acceptRedeemRequest
);
router.post(
  "/reject/:redeemId",
  authenticateToken,
  authorizeRole("user"),
  rejectRedeemRequest
);
router.get(
  "/listing",
  authenticateToken,
  authorizeRole("user"),
  redeemRequestListing
);

export default router;
