import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import connectDB from "./config/db.js";

// 🔹 ROUTES IMPORTS
import adminRoutes from "./routes/adminRoutes.js";
import productRoutes from "./routes/productRoutes.js";
import orderRoutes from "./routes/orderRoutes.js";
import authRoutes from "./routes/authRoutes.js";
import otpRoutes from "./routes/otpRoutes.js";

dotenv.config();
connectDB();

const app = express();

// 🔹 Middlewares
app.use(cors());
app.use(express.json());
app.use("/uploads", express.static("uploads"));

// 🔹 API ROUTES (PHASE 7)
app.use("/api/admin", adminRoutes);     // admin login
app.use("/api/products", productRoutes); // jerseys, trophies, sportswear
app.use("/api/orders", orderRoutes);     // orders system


app.use("/api/auth", authRoutes); // auth endpoints (register, login, user)
app.use("/api/otp", otpRoutes); // OTP endpoints

// 🔹 Test route
app.get("/", (req, res) => {
  res.send("Pratik Sports Backend Running 🚀");
});

// 🔹 Server start
app.listen(process.env.PORT, () => {
  console.log(`Server running on port ${process.env.PORT}`);
});