import express from "express";
import {
  createProduct,
  deleteProduct,
  getProducts,
  updateProduct,
} from "../controller/product.controller.js";

const router = express.Router();

// api for getting all products
router.get("/", getProducts);

// api for adding new products
router.post("/", createProduct);

// api for deleting products
router.delete("/:id", deleteProduct);

// api to update product
router.put("/:id", updateProduct);

export default router;
