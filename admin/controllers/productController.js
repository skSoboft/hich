import multer from "multer";
import Product from "../models/Product.js";

// Configure multer for file uploads
const storage = multer.memoryStorage();
const upload = multer({ storage });

// Create a new product
export const createProduct = async (req, res) => {
  const {
    nameInHindi,
    nameInEnglish,
    descriptionInHindi,
    descriptionInEnglish,
  } = req.body;

  try {
    // Create the product in the database
    const product = await Product.create({
      nameInHindi,
      nameInEnglish,
      image: req.file.buffer,
      descriptionInHindi,
      descriptionInEnglish,
    });

    res.status(201).json({ message: "Product created successfully", product });
  } catch (error) {
    res.status(500).json({ message: "Failed to create product" });
  }
};

const hindiLanguageFields = ["nameInHindi", "descriptionInHindi", "image"];
const englishLanguageFields = ["nameInEnglish", "nameInEnglish", "image"];

// Get all products
export const getAllProducts = async (req, res) => {
  try {
    const products = await Product.find().select(
      req.language === "en"
        ? englishLanguageFields.join(" ")
        : hindiLanguageFields.join(" ")
    );

    res.json(products);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Failed to retrieve products" });
  }
};

// Get a specific product by ID
export const getProductById = async (req, res) => {
  const productId = req.params.productId;
  try {
    const product = await Product.findById(productId);
    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }
    res.json(product);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Failed to retrieve product" });
  }
};

// Update a product by ID
export const updateProductById = async (req, res) => {
  try {
    const productId = req.params.productId;
    const {
      nameInHindi,
      nameInEnglish,
      descriptionInHindi,
      descriptionInEnglish,
    } = req.body;

    // Find the product by ID
    const product = await Product.findById(productId);

    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }

    // Update the image if provided
    if (req.file) {
      product.image = req.file.buffer;
    }

    // Update product fields
    product.nameInHindi = nameInHindi || product.nameInHindi;
    product.nameInEnglish = nameInEnglish || product.nameInEnglish;
    product.descriptionInHindi =
      descriptionInHindi || product.descriptionInHindi;
    product.descriptionInEnglish =
      descriptionInEnglish || product.descriptionInEnglish;

    // Save the updated product
    const updatedProduct = await product.save();

    res
      .status(200)
      .json({ message: "Product updated successfully", updatedProduct });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Failed to update product" });
  }
};

// Delete a product by ID
export const deleteProductById = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    if (!product) {
      return res.status(404).json({ error: "Product not found" });
    }

    await product.softDelete();

    res.json({ message: "Product deleted successfully" });
  } catch (error) {
    res.status(500).json({ error: "Failed to delete the product" });
  }
};

export const getProductCount = async (req, res) => {
  try {
    // Get the count of products with delete: false
    const count = await Product.countDocuments({ deleted: false });

    res.status(200).json({ success: true, count });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// Middleware for handling file upload
export const uploadImage = upload.single("image");
