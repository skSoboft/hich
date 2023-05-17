import express from "express";

import {
  getAllUsers,
  getUserById,
  createUser,
  updateUser,
  deleteUser,
  blockUnblockUser,
  getTotalUserCount,
} from "../controllers/UserController.js";
import {
  authenticateToken,
  authorizeRole,
} from "../middlewares/authMiddleware.js";

const router = express.Router();

// Define routes for user
router.get("/users", authenticateToken, authorizeRole("admin"), getAllUsers);
// GET /users/count - Get the total count of users
router.get(
  "/users/count",
  authenticateToken,
  authorizeRole("admin"),
  getTotalUserCount
);
router.get("/users/:id", authenticateToken, getUserById);
router.put("/users/:id", authenticateToken, updateUser);
router.delete(
  "/users/:id",
  authenticateToken,
  authorizeRole("admin"),
  deleteUser
);
// PUT /users/:userId/block - Block Unblock a user
router.put(
  "/users/:userId/blockUnblockUser",
  authenticateToken,
  blockUnblockUser
);

// PUT /users/:userId/unblock - Unblock a user
//router.put("/users/:userId/unblock", authenticateToken, unblockUser);

export default router;
