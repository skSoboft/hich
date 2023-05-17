import User from "../models/User.js";

export const createUser = async (req, res) => {
  try {
    const { name, upiId, email, isCarpenter, isEnglish } = req.body;

    const user = await User.create({
      name,
      upiId,
      email,
      isCarpenter,
      isEnglish,
    });

    res.status(201).json(user);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
};

export const updateUser = async (req, res) => {
  try {
    const { id } = req.params;
    const { name, upiId, email, isCarpenter, isEnglish } = req.body;
    const user = await User.findByIdAndUpdate(
      id,
      { name, upiId, email, isCarpenter, isEnglish },
      { new: true }
    );
    res.status(200).json(user);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
};

export const getUserById = async (req, res) => {
  try {
    const { id } = req.params;
    const user = await User.findById(id);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    res.status(200).json(user);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
};

export const deleteUser = async (req, res) => {
  try {
    const { id } = req.params;
    const deletedUser = await User.findByIdAndDelete(id);
    res.status(204).json({ message: "Deleted User" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
};

export const getAllUsers = async (req, res) => {
  try {
    const users = await User.find({});
    res.status(200).json({ success: true, data: users });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};

// PUT /users/:userId/block - Block a user
export const blockUnblockUser = async (req, res) => {
  const userId = req.params.userId;
  const user = await User.findById(userId);
  if (!user) {
    return res.status(404).json({ message: "User not found" });
  }
  user.blocked = !user.blocked;
  await user.save();
  res.json({
    message: user.blocked
      ? `User blocked successfully`
      : `User unblocked successfully`,
  });
};

// PUT /users/:userId/unblock - Unblock a user
export const unblockUser = async (req, res) => {
  const userId = req.params.userId;
  const user = await User.findById(userId);
  if (!user) {
    return res.status(404).json({ message: "User not found" });
  }
  user.blocked = false;
  await user.save();
  res.json({ message: "User unblocked successfully" });
};

// GET /users/count - Get the total count of users
export const getTotalUserCount = async (_, res) => {
  try {
    // Retrieve the total count of users from the data source
    const count = await User.countDocuments({});
    res.status(201).json({ message: `Total Count is ${count}` });
  } catch (error) {
    // Handle any errors that occur during the retrieval process
    console.error("Failed to get total user count:", error);
    throw error;
  }
};
