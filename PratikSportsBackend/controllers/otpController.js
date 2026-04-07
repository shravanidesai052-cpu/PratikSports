// OTP Controller
import crypto from "crypto";

// In-memory store for OTPs (for demo; use Redis or DB in production)
const otpStore = {};

export const sendOtp = async (req, res) => {
  const { mobile } = req.body;
  if (!/^\d{10}$/.test(mobile)) {
    return res.status(400).json({ message: "Invalid mobile number" });
  }
  const otp = (Math.floor(100000 + Math.random() * 900000)).toString();
  otpStore[mobile] = { otp, expires: Date.now() + 5 * 60 * 1000 };
  // TODO: Integrate SMS gateway here
  console.log(`OTP for ${mobile}: ${otp}`); // For demo
  res.json({ success: true, message: "OTP sent" });
};

export const verifyOtp = async (req, res) => {
  const { mobile, otp } = req.body;
  const record = otpStore[mobile];
  if (!record || record.otp !== otp || Date.now() > record.expires) {
    return res.status(400).json({ success: false, message: "Invalid or expired OTP" });
  }
  delete otpStore[mobile];
  res.json({ success: true, message: "OTP verified" });
};

export default { sendOtp, verifyOtp };
