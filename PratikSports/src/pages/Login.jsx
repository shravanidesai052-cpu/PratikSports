
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import API from "../services/api";



export default function Login() {
  const navigate = useNavigate();
  const [isSignup, setIsSignup] = useState(false);
  const [showForgotPassword, setShowForgotPassword] = useState(false);

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
    if (isSignup) {
      const value = form.emailOrMobile;
      if (!value) newErrors.emailOrMobile = "Email or Mobile is required";
      else if (value.includes("@")) {
        if (!value.endsWith("@gmail.com"))
          newErrors.emailOrMobile = "Email must end with @gmail.com";
      } else if (!/^\d{10}$/.test(value)) {
        newErrors.emailOrMobile = "Mobile number must be 10 digits";
      }
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // Send OTP for sign up (mobile only - backend doesn't support email OTP)
  const handleSendOtp = async () => {
    setOtpError("");
    setOtpMsg("");
    if (!form.emailOrMobile) {
      setOtpError("Enter mobile number");
      return;
    }
    // Only mobile numbers are supported for OTP
    const isMobile = /^\d{10}$/.test(form.emailOrMobile);
    
    if (!isMobile) {
      setOtpError("OTP is only available for mobile numbers. Please enter a 10-digit mobile number.");
      return;
    }
    try {
      console.log("Sending OTP to mobile:", form.emailOrMobile);
      const response = await API.post("/otp/send", { mobile: form.emailOrMobile });
      console.log("OTP send response:", response);
      setOtpSent(true);
      setOtpMsg("OTP sent to your mobile");
    } catch (err) {
      console.error("OTP send error:", err);
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

  // Forgot password state
  const [forgotForm, setForgotForm] = useState({ mobile: "", newPassword: "" });
  const [forgotOtpSent, setForgotOtpSent] = useState(false);
  const [forgotOtpVerified, setForgotOtpVerified] = useState(false);
  const [forgotOtp, setForgotOtp] = useState("");
  const [forgotMsg, setForgotMsg] = useState("");
  const [forgotError, setForgotError] = useState("");

  // Handle forgot password OTP send
  const handleForgotSendOtp = async () => {
    setForgotError("");
    setForgotMsg("");
    if (!/^\d{10}$/.test(forgotForm.mobile)) {
      setForgotError("Enter valid 10-digit mobile number");
      return;
    }
    try {
      await API.post("/otp/send", { mobile: forgotForm.mobile });
      setForgotOtpSent(true);
      setForgotMsg("OTP sent to your mobile");
    } catch (err) {
      setForgotError("Failed to send OTP");
    }
  };

  // Handle forgot password OTP verify
  const handleForgotVerifyOtp = async () => {
    setForgotError("");
    setForgotMsg("");
    try {
      const res = await API.post("/otp/verify", { mobile: forgotForm.mobile, otp: forgotOtp });
      if (res.data.success) {
        setForgotOtpVerified(true);
        setForgotMsg("OTP verified! Set your new password");
      } else {
        setForgotError("Invalid OTP");
      }
    } catch {
      setForgotError("Invalid or expired OTP");
    }
  };

  // Handle password reset
  const handlePasswordReset = async () => {
    if (!forgotForm.newPassword || forgotForm.newPassword.length < 5) {
      setForgotError("Password must be at least 5 characters");
      return;
    }
    try {
      await API.put("/auth/reset-password", {
        mobile: forgotForm.mobile,
        newPassword: forgotForm.newPassword
      });
      setForgotMsg("Password reset successful! Please login with your new password");
      setTimeout(() => {
        setShowForgotPassword(false);
        setForgotForm({ mobile: "", newPassword: "" });
        setForgotOtpSent(false);
        setForgotOtpVerified(false);
        setForgotOtp("");
        setForgotMsg("");
        setForgotError("");
      }, 2000);
    } catch (err) {
      setForgotError("Failed to reset password");
    }
  };

  // Support redirect after login/signup
  const urlParams = new URLSearchParams(window.location.search);
  const redirectTo = urlParams.get("redirect") || "/profile";

  const handleSubmit = async () => {
    if (validate()) {
      // Check if admin credentials first (before any other logic)
      if (form.username === "PratikSports" && form.password === "admin123") {
        localStorage.setItem("user", JSON.stringify({ username: "PratikSports", role: "admin" }));
        navigate("/admin");
        return;
      }
      
      if (isSignup && !otpVerified && /^\d{10}$/.test(form.emailOrMobile)) {
        setOtpError("Please verify OTP before signing up");
        return;
      }
      if (isSignup) {
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
      }
      
      // Mark user as signed in (simulate auth)
      localStorage.setItem("user", JSON.stringify({ 
        username: form.username, 
        mobile: /^\d{10}$/.test(form.emailOrMobile) ? form.emailOrMobile : "",
        email: !/^\d{10}$/.test(form.emailOrMobile) ? form.emailOrMobile : "",
        role: "user" 
      }));
      navigate(redirectTo);
    }
  };

  // If show forgot password, show forgot password form
  if (showForgotPassword) {
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
            Reset Password
          </motion.h2>

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3 }}
            className="text-[#1F2937] text-center mb-8 text-sm"
          >
            Enter your mobile number to reset password
          </motion.p>

          <div className="space-y-4">
            {/* Mobile Number */}
            <div>
              <label className="block text-sm font-medium text-[#1F2937] mb-1 ml-1">
                Mobile Number
              </label>
              <motion.input
                whileFocus={{ scale: 1.02 }}
                type="text"
                value={forgotForm.mobile}
                onChange={e => setForgotForm({ ...forgotForm, mobile: e.target.value })}
                placeholder="10-digit mobile number"
                className="w-full px-4 py-3 border border-gray-300 rounded-xl 
                           focus:ring-2 focus:ring-[#00B3B3] outline-none transition 
                           bg-[#F2F2F2] focus:bg-white"
                disabled={forgotOtpSent || forgotOtpVerified}
              />
            </div>

            {/* OTP Section */}
            {!forgotOtpVerified && forgotForm.mobile && /^\d{10}$/.test(forgotForm.mobile) && (
              <div className="mt-2 flex gap-2 items-center">
                {!forgotOtpSent ? (
                  <button
                    type="button"
                    onClick={handleForgotSendOtp}
                    className="bg-[#0A2540] text-white px-3 py-1 rounded text-sm hover:bg-[#00B3B3]"
                  >
                    Send OTP
                  </button>
                ) : (
                  <>
                    <input
                      type="text"
                      value={forgotOtp}
                      onChange={e => setForgotOtp(e.target.value)}
                      placeholder="Enter OTP"
                      className="border px-2 py-1 rounded text-sm w-28"
                      maxLength={6}
                    />
                    <button
                      type="button"
                      onClick={handleForgotVerifyOtp}
                      className="bg-green-600 text-white px-3 py-1 rounded text-sm hover:bg-green-700"
                    >
                      Verify OTP
                    </button>
                  </>
                )}
                {forgotMsg && <span className="text-green-600 text-xs ml-2">{forgotMsg}</span>}
                {forgotError && <span className="text-red-500 text-xs ml-2">{forgotError}</span>}
              </div>
            )}

            {/* New Password */}
            {forgotOtpVerified && (
              <div>
                <label className="block text-sm font-medium text-[#1F2937] mb-1 ml-1">
                  New Password
                </label>
                <motion.input
                  whileFocus={{ scale: 1.02 }}
                  type="password"
                  value={forgotForm.newPassword}
                  onChange={e => setForgotForm({ ...forgotForm, newPassword: e.target.value })}
                  placeholder="Enter new password (min 5 characters)"
                  className="w-full px-4 py-3 border border-gray-300 rounded-xl 
                             focus:ring-2 focus:ring-[#00B3B3] outline-none transition 
                             bg-[#F2F2F2] focus:bg-white"
                />
              </div>
            )}

            {/* Reset Button */}
            {forgotOtpVerified && (
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={handlePasswordReset}
                className="w-full bg-[#0A2540] text-white py-3 rounded-xl font-semibold 
                           hover:bg-[#00B3B3] transition duration-300 shadow-md"
              >
                Reset Password
              </motion.button>
            )}

            {/* Back to Login */}
            <motion.button
              whileHover={{ scale: 1.02 }}
              onClick={() => setShowForgotPassword(false)}
              className="w-full text-[#00B3B3] py-2 rounded-xl font-medium 
                         hover:text-[#0A2540] transition duration-300"
            >
              ← Back to Login
            </motion.button>
          </div>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-linear-to-br from-emerald-600 via-blue-600 to-indigo-700 p-4 relative overflow-hidden">
      {/* Sports-themed background elements */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-10 left-10 w-32 h-32 bg-white rounded-full blur-3xl"></div>
        <div className="absolute top-40 right-20 w-40 h-40 bg-yellow-400 rounded-full blur-3xl"></div>
        <div className="absolute bottom-20 left-1/4 w-36 h-36 bg-orange-500 rounded-full blur-3xl"></div>
        <div className="absolute bottom-10 right-10 w-28 h-28 bg-red-500 rounded-full blur-3xl"></div>
      </div>
      
      {/* Sports pattern overlay */}
      <div className="absolute inset-0 opacity-5">
        <div className="h-full w-full" style={{
          backgroundImage: `repeating-linear-gradient(45deg, transparent, transparent 35px, rgba(255,255,255,.1) 35px, rgba(255,255,255,.1) 70px)`,
        }}></div>
      </div>

      <motion.div
        initial={{ opacity: 0, y: 60, scale: 0.9 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className="bg-white/95 backdrop-blur-md p-10 rounded-3xl shadow-2xl w-full max-w-md border border-white/20 relative z-10"
      >
        {/* Sports icon/header */}
        <div className="flex justify-center mb-6">
          <div className="w-20 h-20 bg-linear-to-br from-emerald-500 to-blue-600 rounded-full flex items-center justify-center shadow-lg">
            <svg className="w-12 h-12 text-white" fill="currentColor" viewBox="0 0 24 24">
              <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"/>
            </svg>
          </div>
        </div>

        <motion.h2
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="text-4xl font-bold mb-2 bg-linear-to-r from-emerald-600 to-blue-600 bg-clip-text text-transparent text-center"
        >
          {isSignup ? "Sign Up" : "Login"}
        </motion.h2>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
          className="text-gray-600 text-center mb-8 text-sm font-medium"
        >
          {isSignup
            ? "Create your account to continue"
            : "Enter your credentials to continue"}
        </motion.p>

        <div className="space-y-5">

          {/* Username */}
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2 ml-1">
              <span className="flex items-center gap-2">
                <svg className="w-4 h-4 text-emerald-600" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z"/>
                </svg>
                UserName
              </span>
            </label>
            <motion.input
              whileFocus={{ scale: 1.02 }}
              type="text"
              name="username"
              value={form.username}
              onChange={handleChange}
              placeholder="Username"
              className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl 
                         focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 outline-none transition-all 
                         bg-gray-50 focus:bg-white shadow-sm"
            />
            {errors.username && (
              <p className="text-red-500 text-sm mt-1 flex items-center gap-1">
                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 15h-2v-2h2v2zm0-4h-2V7h2v6z"/>
                </svg>
                {errors.username}
              </p>
            )}
          </div>

          {/* Password */}
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2 ml-1">
              <span className="flex items-center gap-2">
                <svg className="w-4 h-4 text-blue-600" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M18 8h-1V6c0-2.76-2.24-5-5-5S7 3.24 7 6v2H6c-1.1 0-2 .9-2 2v10c0 1.1.9 2 2 2h12c1.1 0 2-.9 2-2V10c0-1.1-.9-2-2-2zm-6 9c-1.1 0-2-.9-2-2s.9-2 2-2 2 .9 2 2-.9 2-2 2zm3.1-9H8.9V6c0-1.71 1.39-3.1 3.1-3.1 1.71 0 3.1 1.39 3.1 3.1v2z"/>
                </svg>
                Password
              </span>
            </label>
            <motion.input
              whileFocus={{ scale: 1.02 }}
              type="password"
              name="password"
              value={form.password}
              onChange={handleChange}
              placeholder="Enter your password (min 5 characters)"
              className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl 
                         focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all 
                         bg-gray-50 focus:bg-white shadow-sm"
            />
            {errors.password && (
              <p className="text-red-500 text-sm mt-1 flex items-center gap-1">
                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 15h-2v-2h2v2zm0-4h-2V7h2v6z"/>
                </svg>
                {errors.password}
              </p>
            )}
            {/* Forgot Password Link */}
            {!isSignup && (
              <div className="text-right mt-2">
                <button
                  type="button"
                  onClick={() => setShowForgotPassword(true)}
                  className="text-blue-600 text-sm hover:text-blue-700 font-medium transition-colors"
                >
                  Forgot Password?
                </button>
              </div>
            )}
          </div>

          {/* Email or Mobile + OTP for signup */}
          {isSignup && (
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
          )}

          {/* Button */}
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={handleSubmit}
            className="w-full bg-[#0A2540] hover:bg-[#00B3B3] 
                       text-white font-semibold py-3 rounded-xl shadow-lg transition"
          >
            {isSignup ? "Sign Up & Continue" : "Login"}
          </motion.button>
        </div>

        {/* Toggle */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4 }}
          className="mt-8 text-center"
        >
          <p className="text-sm text-gray-600">
            {isSignup
              ? "Already have an account? "
              : "Don't have an account? "}
            <span
              className="font-bold text-emerald-600 hover:text-blue-600 cursor-pointer transition-colors duration-200 border-b-2 border-transparent hover:border-emerald-600"
              onClick={() => {
                setIsSignup(!isSignup);
                setErrors({});
              }}
            >
              {isSignup ? "Login" : "Sign Up"}
            </span>
          </p>
        </motion.div>

      </motion.div>
    </div>
  );
}