import { useState } from "react";
import { forgotPassword } from "../api/api";
import { motion } from "framer-motion";
import { Mail, ArrowRight } from "lucide-react";

export default function ForgotPassword({ switchToReset, handleFlow }) { // Added handleFlow
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMsg("");

    try {
      const res = await handleFlow("forgot", { email }); // Capture res
      console.log(res);
      setMsg("Reset link sent successfully 🚀");
      // Note: AuthFlow.jsx already calls setView("reset"), 
      // but keeping your timeout for the success message is fine.
    } catch (err) {
      setMsg("Something went wrong 😅");
    } finally {
      setLoading(false);
    }
  };

  return (
    <motion.form
      onSubmit={handleSubmit}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="space-y-5"
    >
      {/* Title */}
      <div className="text-center space-y-1">
        <h2 className="text-2xl font-semibold">Forgot Password 🔐</h2>
        <p className="text-gray-500 text-sm">
          Enter your email to receive reset link
        </p>
      </div>

      {/* Email Input with Icon */}
      <div className="relative">
        <Mail className="absolute left-3 top-2.5 text-gray-400" size={18} />

        <input
          type="email"
          placeholder="Enter your email"
          className="w-full pl-10 pr-3 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 outline-none transition"
          onChange={(e) => setEmail(e.target.value)}
          required
        />
      </div>

      {/* Message */}
      {msg && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="text-sm text-center text-green-600"
        >
          {msg}
        </motion.div>
      )}

      {/* Button */}
      <motion.button
        whileTap={{ scale: 0.95 }}
        whileHover={{ scale: 1.02 }}
        disabled={loading}
        className="w-full flex items-center justify-center gap-2 py-2 rounded-lg bg-gradient-to-r from-orange-400 to-red-500 text-white font-medium shadow-md hover:shadow-lg transition"
      >
        {loading ? "Sending..." : "Send Reset Link"}
        {!loading && <ArrowRight size={18} />}
      </motion.button>

      {/* Footer */}
      <p className="text-center text-sm text-gray-500">
        Remember your password?{" "}
        <span className="text-blue-500 cursor-pointer hover:underline">
          Login
        </span>
      </p>
    </motion.form>
  );
}