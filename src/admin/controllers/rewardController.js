import multer from "multer";
import Reward from "../models/Reward.js";

// Configure multer for file uploads
const storage = multer.memoryStorage();
const upload = multer({ storage });

// Get all rewards
export const getAllRewards = async (req, res) => {
  try {
    const rewards = await Reward.find();
    res.json(rewards);
  } catch (error) {
    res.status(500).json({ error: "Failed to retrieve rewards" });
  }
};

// Get a specific reward by ID
export const getRewardById = async (req, res) => {
  try {
    const reward = await Reward.findById(req.params.rewardId);
    if (!reward) {
      return res.status(404).json({ error: "Reward not found" });
    }
    res.json(reward);
  } catch (error) {
    res.status(500).json({ error: "Failed to retrieve the reward" });
  }
};

// Create a new reward

export const createReward = async (req, res) => {
  const {
    nameInHindi,
    nameInEnglish,
    descriptionInHindi,
    descriptionInEnglish,
    price,
  } = req.body;

  try {
    // Create the reward in the database
    const reward = await Reward.create({
      nameInHindi,
      nameInEnglish,
      image: req.file.buffer,
      descriptionInHindi,
      descriptionInEnglish,
      price,
    });

    res.status(201).json({ message: "Reward created successfully", reward });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Failed to create reward" });
  }
};

// Update a reward by ID
export const updateRewardById = async (req, res) => {
  try {
    const rewardId = req.params.rewardId;
    const {
      nameInHindi,
      nameInEnglish,
      descriptionInHindi,
      descriptionInEnglish,
      price,
    } = req.body;

    // Find the reward by ID
    const reward = await Reward.findById(rewardId);

    if (!reward) {
      return res.status(404).json({ message: "Reward not found" });
    }

    // Update the image if provided
    if (req.file) {
      reward.image = req.file.buffer;
    }

    // Update reward fields
    reward.nameInHindi = nameInHindi || reward.nameInHindi;
    reward.nameInEnglish = nameInEnglish || reward.nameInEnglish;
    reward.descriptionInHindi = descriptionInHindi || reward.descriptionInHindi;
    reward.descriptionInEnglish =
      descriptionInEnglish || reward.descriptionInEnglish;
    reward.price = price || reward.price;

    // Save the updated reward
    const updatedReward = await reward.save();
    res
      .status(200)
      .json({ message: "Reward updated successfully", reward: updatedReward });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Failed to update reward" });
  }
};

// Delete a reward by ID
export const deleteRewardById = async (req, res) => {
  try {
    const reward = await Reward.findById(req.params.id);
    if (!reward) {
      return res.status(404).json({ error: "Reward not found" });
    }

    await reward.softDelete();

    res.json({ message: "Reward deleted successfully" });
  } catch (error) {
    res.status(500).json({ error: "Failed to delete the reward" });
  }
};

// GET /rewards/count - Get the total count of rewards
export const getTotalRewardCount = async (_, res) => {
  try {
    // Retrieve the total count of rewards from the data source
    const count = await Reward.countDocuments({ deleted: false });
    res.status(201).json({ message: `Total Count is ${count}` });
  } catch (error) {
    // Handle any errors that occur during the retrieval process
    console.error("Failed to get total reward count:", error);
    throw error;
  }
};

export default {
  getAllRewards,
  getRewardById,
  createReward,
  updateRewardById,
  deleteRewardById,
};

// Middleware for handling file upload
export const uploadImage = upload.single("image");
