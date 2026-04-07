import mongoose from "mongoose";


const OrderSchema = new mongoose.Schema({
  userId: String,
  name: String,
  mobile: String,
  jerseyName: String,
  size: String,
  jerseys: [{
    name: String,
    size: String
  }],
  quantity: Number,
  address: String,
  status: { type: String, default: "pending" }, // pending, accepted, rejected
  paymentStatus: { type: String, default: "unpaid" },
  paymentMethod: { type: String, default: "" },
  rejectionReason: { type: String, default: "" },
  adminMessage: { type: String, default: "" }
});

export default mongoose.model("Order", OrderSchema);