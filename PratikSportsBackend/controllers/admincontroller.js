import Admin from "../models/Admin.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

export const adminLogin = async(req,res)=>{
  const {username,password} = req.body;
  const admin = await Admin.findOne({username});
  if(!admin) return res.status(400).json("No admin");
  const match = bcrypt.compare(password, admin.password);
  if(!match) return res.status(400).json("Wrong password");
  const token = jwt.sign({id:admin._id,role:"admin"},"admin_secret");
  res.json({token});
};