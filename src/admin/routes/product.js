// productsRoutes.js
import express from "express";
import {
  createProduct,
  getAllProducts,
  getProductById,
  updateProductById,
  deleteProductById,
  uploadImage,
  getProductCount,
} from "../controllers/productController.js";
import {
  authenticateToken,
  authorizeRole,
} from "../middlewares/authMiddleware.js";
import languageMiddleware from "../middlewares/languageMiddleware.js";

const router = express.Router();

// Route for creating a new product
router.post(
  "/products",
  authenticateToken,
  authorizeRole("user"),
  uploadImage,
  createProduct
);

// Route for getting all products
router.get("/products", authenticateToken, languageMiddleware, getAllProducts);

//Route for get products count
router.get("/count", authenticateToken, authorizeRole("user"), getProductCount);

// Route for getting a specific product by ID
router.get("/products/:productId", authenticateToken, getProductById);

// Route for updating a product by ID
router.put(
  "/products/:productId",
  authenticateToken,
  authorizeRole("admin"),
  uploadImage,
  updateProductById
);

// Route for deleting a product by ID
router.delete(
  "/products/:productId",
  authenticateToken,
  authorizeRole("admin"),
  deleteProductById
);

export default router;
