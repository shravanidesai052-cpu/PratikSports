import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import API from "../services/api";

export default function Signup() {
  const navigate = useNavigate();
  const [form, setForm] = useState({
    username: "",
    password: "",
    emailOrMobile: "",
  });
  const [errors, setErrors] = useState({});

  // OTP state
  const [otpSent, setOtpSent] = useState(false);
  const [otp, setOtp] = useState("");
  const [otpVerified, setOtpVerified] = useState(false);
  const [otpMsg, setOtpMsg] = useState("");
  const [otpError, setOtpError] = useState("");

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const validate = () => {
    const newErrors = {};
    if (!form.username) newErrors.username = "Username is required";
    if (!form.password) newErrors.password = "Password is required";
    else if (form.password.length < 5)
      newErrors.password = "Password must be at least 5 characters";
    const value = form.emailOrMobile;
    if (!value) newErrors.emailOrMobile = "Email or Mobile is required";
    else if (value.includes("@")) {
      if (!value.endsWith("@gmail.com"))
        newErrors.emailOrMobile = "Email must end with @gmail.com";
    } else if (!/^\d{10}$/.test(value)) {
      newErrors.emailOrMobile = "Mobile number must be 10 digits";
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // Send OTP for mobile sign up
  const handleSendOtp = async () => {
    setOtpError("");
    setOtpMsg("");
    if (!/^\d{10}$/.test(form.emailOrMobile)) {
      setOtpError("Enter valid 10-digit mobile number");
      return;
    }
    try {
      await API.post("/otp/send", { mobile: form.emailOrMobile });
      setOtpSent(true);
      setOtpMsg("OTP sent to your mobile");
    } catch (err) {
      setOtpError("Failed to send OTP");
    }
  };

  // Verify OTP
  const handleVerifyOtp = async () => {
    setOtpError("");
    setOtpMsg("");
    try {
      const res = await API.post("/otp/verify", { mobile: form.emailOrMobile, otp });
      if (res.data.success) {
        setOtpVerified(true);
        setOtpMsg("OTP verified!");
      } else {
        setOtpError("Invalid OTP");
      }
    } catch {
      setOtpError("Invalid or expired OTP");
    }
  };

  // Handle Google OAuth signup
  const handleGoogleSignup = async () => {
    try {
      // For demo purposes, simulate Google OAuth
      // In production, you would use Google OAuth 2.0 flow
      const googleUser = {
        username: `google_user_${Date.now()}`,
        email: "user@gmail.com",
        mobile: "",
        password: "google_oauth_password"
      };
      
      // Register Google user in database
      try {
        await API.post("/auth/register", {
          username: googleUser.username,
          email: googleUser.email,
          password: googleUser.password
        });
      } catch (err) {
        // Ignore duplicate error for now
      }
      
      // Mark user as signed in
      localStorage.setItem("user", JSON.stringify({ 
        username: googleUser.username, 
        email: googleUser.email,
        mobile: googleUser.mobile 
      }));
      navigate("/profile");
    } catch (error) {
      console.error("Google signup error:", error);
      alert("Failed to sign up with Google");
    }
  };

  const handleSubmit = async () => {
    if (validate()) {
      if (!otpVerified && /^\d{10}$/.test(form.emailOrMobile)) {
        setOtpError("Please verify OTP before signing up");
        return;
      }
      // Register user in database if not present
      try {
        await API.post("/auth/register", {
          username: form.username,
          email: form.emailOrMobile.includes("@") ? form.emailOrMobile : undefined,
          mobile: /^\d{10}$/.test(form.emailOrMobile) ? form.emailOrMobile : undefined,
          password: form.password
        });
      } catch (err) {
        // Ignore duplicate error for now
      }
      // Mark user as signed in
      localStorage.setItem("user", JSON.stringify({ username: form.username, mobile: form.emailOrMobile }));
      navigate("/profile");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-linear-to-br from-[#F2F2F2] to-[#E5E7EB] p-4">
      <motion.div
        initial={{ opacity: 0, y: 60, scale: 0.9 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className="bg-white p-10 rounded-2xl shadow-2xl w-full max-w-md border border-gray-100"
      >
        <motion.h2
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="text-3xl font-extrabold mb-2 text-[#0A2540] text-center tracking-tight"
        >
          Sign Up
        </motion.h2>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
          className="text-[#1F2937] text-center mb-8 text-sm"
        >
          Create your account to continue
        </motion.p>

        <div className="space-y-4">
          {/* Username */}
          <div>
            <label className="block text-sm font-medium text-[#1F2937] mb-1 ml-1">
              Username
            </label>
            <motion.input
              whileFocus={{ scale: 1.02 }}
              type="text"
              name="username"
              value={form.username}
              onChange={handleChange}
              placeholder="Username"
              className="w-full px-4 py-3 border border-gray-300 rounded-xl 
                         focus:ring-2 focus:ring-[#00B3B3] outline-none transition 
                         bg-[#F2F2F2] focus:bg-white"
            />
            {errors.username && (
              <p className="text-red-500 text-sm mt-1">{errors.username}</p>
            )}
          </div>

          {/* Password */}
          <div>
            <label className="block text-sm font-medium text-[#1F2937] mb-1 ml-1">
              Password
            </label>
            <motion.input
              whileFocus={{ scale: 1.02 }}
              type="password"
              name="password"
              value={form.password}
              onChange={handleChange}
              placeholder="Password (min 5 characters)"
              className="w-full px-4 py-3 border border-gray-300 rounded-xl 
                         focus:ring-2 focus:ring-[#00B3B3] outline-none transition 
                         bg-[#F2F2F2] focus:bg-white"
            />
            {errors.password && (
              <p className="text-red-500 text-sm mt-1">{errors.password}</p>
            )}
          </div>

          {/* Email or Mobile + OTP */}
          <div>
            <label className="block text-sm font-medium text-[#1F2937] mb-1 ml-1">
              Email or Mobile
            </label>
            <motion.input
              whileFocus={{ scale: 1.02 }}
              type="text"
              name="emailOrMobile"
              value={form.emailOrMobile}
              onChange={handleChange}
              placeholder="Email or Mobile"
              className="w-full px-4 py-3 border border-gray-300 rounded-xl 
                         focus:ring-2 focus:ring-[#00B3B3] outline-none transition 
                         bg-[#F2F2F2] focus:bg-white"
              disabled={otpSent || otpVerified}
            />
            {errors.emailOrMobile && (
              <p className="text-red-500 text-sm mt-1">
                {errors.emailOrMobile}
              </p>
            )}
            {/* Show OTP send/verify for mobile only */}
            {!otpVerified && /^\d{10}$/.test(form.emailOrMobile) && (
              <div className="mt-2 flex gap-2 items-center">
                {!otpSent ? (
                  <button
                    type="button"
                    onClick={handleSendOtp}
                    className="bg-[#0A2540] text-white px-3 py-1 rounded text-sm hover:bg-[#00B3B3]"
                  >
                    Send OTP
                  </button>
                ) : (
                  <>
                    <input
                      type="text"
                      value={otp}
                      onChange={e => setOtp(e.target.value)}
                      placeholder="Enter OTP"
                      className="border px-2 py-1 rounded text-sm w-28"
                      maxLength={6}
                    />
                    <button
                      type="button"
                      onClick={handleVerifyOtp}
                      className="bg-green-600 text-white px-3 py-1 rounded text-sm hover:bg-green-700"
                    >
                      Verify OTP
                    </button>
                  </>
                )}
                {otpMsg && <span className="text-green-600 text-xs ml-2">{otpMsg}</span>}
                {otpError && <span className="text-red-500 text-xs ml-2">{otpError}</span>}
              </div>
            )}
            {otpVerified && <span className="text-green-600 text-xs ml-2">Mobile verified</span>}
          </div>

          {/* Google Signup */}
          <div className="relative my-6">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-gray-300"></div>
            </div>
            <div className="relative flex justify-center text-sm">
              <span className="px-2 bg-white text-gray-500">Or continue with</span>
            </div>
          </div>

          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={handleGoogleSignup}
            className="w-full flex items-center justify-center gap-3 bg-white border border-gray-300 
                       text-gray-700 py-3 rounded-xl font-medium hover:bg-gray-50 transition duration-300 
                       shadow-sm hover:shadow-md"
          >
            <svg className="w-5 h-5" viewBox="0 0 24 24">
              <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
              <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
              <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
              <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
            </svg>
            Continue with Google
          </motion.button>

          {/* Button */}
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={handleSubmit}
            className="w-full bg-[#0A2540] text-white py-3 rounded-xl font-semibold 
                       hover:bg-[#00B3B3] transition duration-300 shadow-md"
          >
            Sign Up
          </motion.button>
        </div>

        {/* Link to Login */}
        <div className="mt-6 text-center">
          <p className="text-sm text-[#1F2937]">
            Already have an account?{" "}
            <button
              onClick={() => navigate("/login")}
              className="text-[#00B3B3] font-medium hover:underline"
            >
              Login
            </button>
          </p>
        </div>
      </motion.div>
    </div>
  );
}