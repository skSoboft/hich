import express from "express";
import {
  registerUser,
  loginUser,
  //logoutUser,
} from "../controllers/authController.js";

const router = express.Router();

// Define your authentication routes here

// User registration route
router.post("/register", registerUser);

// User login route
router.post("/login", loginUser);

// User logout route
//router.get("/logout", logoutUser);

export default router;
