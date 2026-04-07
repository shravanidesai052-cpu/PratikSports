import express from "express";

import {createOrder,getOrders,updateOrderStatus,updateOrderPayment,updateJerseyDetails} from "../controllers/orderController.js";

const router = express.Router();


router.post("/", createOrder);
router.get("/", getOrders);
router.put("/:id", updateOrderStatus); // <-- Add this for accept/reject
router.put("/:id/payment", updateOrderPayment);
router.put("/:id/jerseys", updateJerseyDetails); // <-- New endpoint for jersey details

export default router;