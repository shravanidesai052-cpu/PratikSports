import express from "express";
import { createProduct, getProducts, deleteProduct } from "../controllers/productController.js";
import upload from "../config/multer.js";

const router = express.Router();

router.post("/create", upload.single("image"), createProduct);
router.get("/all", getProducts);
router.get("/", getProducts); // Additional route for category filtering
router.delete("/:id", deleteProduct); // Add delete route

export default router;