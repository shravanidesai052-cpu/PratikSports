import mongoose from "mongoose";

const UserSchema = new mongoose.Schema({
  username: String,
  email: String,
  mobile: String,
  password: String,
  address: String,
  role: { type: String, default: "user" } // user / admin
});

export default mongoose.model("User", UserSchema);