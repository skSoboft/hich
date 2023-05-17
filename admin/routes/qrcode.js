// qrcodeRoutes.js

import express from "express";
import {
  createQRCode,
  getQRCodeList,
  getQRCodeById,
  deleteQRCode,
} from "../controllers/qrCodeController.js";
import {
  authenticateToken,
  authorizeRole,
} from "../middlewares/authMiddleware.js";

const router = express.Router();

// Generate a new QR code
router.post("/", authenticateToken, authorizeRole("user"), createQRCode);

// Get all QR codes
router.get("/", getQRCodeList);

// Get a QR code by ID
router.get("/:qrcodeId", getQRCodeById);

// Delete a QR code by ID
router.delete("/:qrcodeId", authorizeRole("user"), deleteQRCode);

export default router;
