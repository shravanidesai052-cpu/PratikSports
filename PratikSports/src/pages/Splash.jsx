import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import logo from "../assets/images/PS_logo.png";

export default function Splash() {
  const navigate = useNavigate();

  useEffect(() => {
    const timer = setTimeout(() => {
      navigate("/home");
    }, 3000);
    return () => clearTimeout(timer);
  }, [navigate]);

  return (
    <div className="h-screen flex flex-col justify-center items-center bg-linear-to-br from-emerald-900 via-blue-900 to-indigo-900 text-white relative overflow-hidden">

      {/* Sports-themed background elements */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-20 left-20 w-40 h-40 bg-emerald-500 rounded-full blur-3xl"></div>
        <div className="absolute top-60 right-20 w-32 h-32 bg-blue-500 rounded-full blur-3xl"></div>
        <div className="absolute bottom-40 left-1/3 w-36 h-36 bg-indigo-500 rounded-full blur-3xl"></div>
        <div className="absolute bottom-20 right-1/4 w-28 h-28 bg-orange-400 rounded-full blur-3xl"></div>
      </div>

      {/* Glow background effect */}
      <div className="absolute w-72 h-72 bg-linear-to-br from-orange-500/30 to-red-500/30 rounded-full blur-3xl"></div>

      {/* Animated Logo */}
      <motion.img
        src={logo}
        alt="Pratik Sports Logo"
        className="w-36 mb-6 drop-shadow-xl relative z-10"
        initial={{ scale: 0, opacity: 0, rotate: -20 }}
        animate={{ scale: 1, opacity: 1, rotate: 0 }}
        transition={{
          duration: 1,
          type: "spring",
          stiffness: 120,
        }}
        whileHover={{ scale: 1.1 }}
      />

      {/* Animated Brand Text */}
      <motion.h1
        className="text-4xl md:text-5xl font-extrabold tracking-wide relative z-10"
        initial={{ y: 30, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.5, duration: 1 }}
      >
        <span className="bg-linear-to-r from-emerald-400 to-blue-400 bg-clip-text text-transparent">Pratik</span>{" "}
        <span className="bg-linear-to-r from-blue-400 to-orange-400 bg-clip-text text-transparent">Sports</span>
      </motion.h1>

      {/* Subtitle */}
      <motion.p
        className="mt-3 text-gray-300 text-lg tracking-wide relative z-10"
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 1, duration: 1 }}
      >
        Premium Sportswear & Accessories
      </motion.p>

      {/* Sports-themed loading indicator */}
      <motion.div
        className="mt-8 flex gap-2 relative z-10"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5 }}
      >
        <span className="w-3 h-3 bg-linear-to-r from-emerald-500 to-blue-500 rounded-full animate-bounce"></span>
        <span className="w-3 h-3 bg-linear-to-r from-blue-500 to-orange-500 rounded-full animate-bounce [animation-delay:0.2s]"></span>
        <span className="w-3 h-3 bg-linear-to-r from-orange-500 to-red-500 rounded-full animate-bounce [animation-delay:0.4s]"></span>
      </motion.div>

      {/* Sports icons animation */}
      <motion.div
        className="absolute top-10 left-10 text-emerald-400 opacity-20"
        initial={{ rotate: 0 }}
        animate={{ rotate: 360 }}
        transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
      >
        <svg className="w-12 h-12" fill="currentColor" viewBox="0 0 24 24">
          <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"/>
        </svg>
      </motion.div>

      <motion.div
        className="absolute bottom-10 right-10 text-orange-400 opacity-20"
        initial={{ rotate: 0 }}
        animate={{ rotate: -360 }}
        transition={{ duration: 15, repeat: Infinity, ease: "linear" }}
      >
        <svg className="w-10 h-10" fill="currentColor" viewBox="0 0 24 24">
          <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
        </svg>
      </motion.div>

    </div>
  );
}