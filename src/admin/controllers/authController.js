import User from "../models/User.js";
import { generateToken } from "../middlewares/authMiddleware.js";

export const registerUser = async (req, res) => {
  const { name, upiId, email, isCarpenter, isEnglish, phone, role } = req.body;

  // Check if the required fields are provided
  if (!name || !email || !upiId || !phone) {
    return res
      .status(400)
      .json({ message: "Name, email, upiId and phone are required." });
  }

  try {
    // Check if the user already exists with the given email or name
    const existingUser = await User.findOne({ $or: [{ email }, { phone }] });

    if (existingUser) {
      const duplicatedFields = [];
      if (existingUser.email === email) {
        duplicatedFields.push("email");
      }
      if (existingUser.phone === phone) {
        duplicatedFields.push("phone");
      }
      return res.status(409).json({ message: "User already exists." });
    }

    // Create a new user instance
    const newUser = new User({
      name,
      upiId,
      email,
      isCarpenter,
      isEnglish,
      phone,
      role: role || "user",
    });

    // Save the user to the database
    const savedUser = await newUser.save();

    // Generate and return the JWT token
    const token = generateToken(savedUser);

    return res.status(201).json({ token });
  } catch (error) {
    return res.status(500).json({ message: "Server error." });
  }
};

export const loginUser = async (req, res) => {
  const { phone } = req.body;

  // Check if the phone number are provided
  if (!phone) {
    return res.status(400).json({ message: "Phone No. are required." });
  }

  try {
    const user = await User.findOne({ phone });
    console.log("USER::", user);
    if (!user) {
      return res.status(401).json({ message: "No User with this number." });
    }
    if (user) {
      // Assuming the user is valid, generate a JWT token for the logged-in user
      const token = generateToken({ _id: user.id, role: user.role });

      // Return the token in the response
      return res.status(201).json({ token });
    }
  } catch (error) {
    return res.status(500).json({ message: "Server error." });
  }
};
