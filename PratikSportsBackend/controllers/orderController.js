// Update payment status
export const updateOrderPayment = async (req, res) => {
  const { paymentStatus, paymentMethod } = req.body;
  await Order.findByIdAndUpdate(req.params.id, { paymentStatus, paymentMethod });
  res.json({ success: true });
};
import Order from "../models/Order.js";

export const createOrder = async (req,res)=>{
  try {
    console.log("Order data received:", req.body);
    
    // Handle both single and multiple jersey orders
    const orderData = { ...req.body };
    
    // If jerseys array is provided, use it
    if (req.body.jerseys && Array.isArray(req.body.jerseys)) {
      console.log("Jerseys array found:", req.body.jerseys);
      orderData.jerseys = req.body.jerseys;
      
      // Also set backward compatibility fields
      if (req.body.jerseys.length > 0) {
        orderData.jerseyName = req.body.jerseys[0].name;
        orderData.size = req.body.jerseys[0].size;
      }
    }
    
    const order = new Order(orderData);
    await order.save();
    console.log("Order saved successfully:", order);
    res.json({ success: true, data: order });
  } catch (err) {
    console.error("Order creation error:", err);
    res.status(500).json({ success: false, error: err.message, details: err });
  }
};

export const getOrders = async (req,res)=>{
  const orders = await Order.find();
  res.json(orders);
};


export const updateOrderStatus = async (req, res) => {
  const { status, rejectionReason, adminMessage } = req.body;
  const update = { status };
  if (status === "rejected" && rejectionReason) {
    update.rejectionReason = rejectionReason;
  }
  if (adminMessage) {
    update.adminMessage = adminMessage;
  }
  await Order.findByIdAndUpdate(req.params.id, update);
  res.json({ success: true });
};

// Add new function to update jersey details
export const updateJerseyDetails = async (req, res) => {
  try {
    const { jerseys } = req.body;
    const orderId = req.params.id;
    
    console.log("Updating jersey details for order:", orderId, jerseys);
    
    const update = { jerseys };
    
    // Also update backward compatibility fields
    if (jerseys && jerseys.length > 0) {
      update.jerseyName = jerseys[0].name;
      update.size = jerseys[0].size;
    }
    
    const order = await Order.findByIdAndUpdate(orderId, update, { new: true });
    res.json({ success: true, data: order });
  } catch (err) {
    console.error("Update jersey details error:", err);
    res.status(500).json({ success: false, error: err.message });
  }
};