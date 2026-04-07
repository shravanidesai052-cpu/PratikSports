import Product from "../models/Product.js";
import cloudinary from "../config/cloudinary.js";

export const createProduct = async (req, res) => {
  try {
    const { name, price, category, description, image } = req.body;

    let imageUrl = "";

    // Handle image URL or file upload
    if (req.file) {
      try {
        // Try to upload image to Cloudinary first
        const result = await cloudinary.uploader.upload(req.file.path, {
          folder: "pratik-sports/products",
          resource_type: "image",
        });
        imageUrl = result.secure_url;
        console.log("Image uploaded to Cloudinary:", imageUrl);
      } catch (cloudinaryError) {
        console.error("Cloudinary upload failed, using local file:", cloudinaryError);
        // Fallback to local file path if Cloudinary fails
        imageUrl = `http://localhost:5000/uploads/${req.file.filename}`;
        console.log("Using local file path:", imageUrl);
      }
    } else if (image) {
      // Use provided image URL
      imageUrl = image;
      console.log("Using provided image URL:", imageUrl);
    } else {
      return res.status(400).json({ message: "Image is required" });
    }

    const product = new Product({
      name,
      price,
      category,
      description,
      image: imageUrl,
    });

    await product.save();
    console.log("Product created successfully:", product);
    res.status(201).json(product);

  } catch (err) {
    console.error("Product creation error:", err);
    res.status(500).json({ message: "Upload failed", error: err.message });
  }
};

export const getProducts = async (req, res) => {
  try {
    const { category } = req.query;
    
    // If category is specified, filter by category
    const filter = category && category !== "all" ? { category } : {};
    
    const products = await Product.find(filter).sort({ createdAt: -1 });
    res.json(products);
  } catch (err) {
    console.error("Fetch products error:", err);
    res.status(500).json({ message: "Fetch failed", error: err.message });
  }
};

export const deleteProduct = async (req, res) => {
  try {
    const product = await Product.findByIdAndDelete(req.params.id);
    
    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }
    
    console.log("Product deleted successfully:", product);
    res.json({ message: "Product deleted successfully", product });
  } catch (err) {
    console.error("Delete product error:", err);
    res.status(500).json({ message: "Delete failed", error: err.message });
  }
};