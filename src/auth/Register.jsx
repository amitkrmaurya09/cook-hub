import { useState } from "react";
import { registerUser } from "../api/api";
import { motion } from "framer-motion";
import { Mail, Lock, Eye, EyeOff, ArrowRight, User } from "lucide-react";
import Login from "./Login";

export default function Register({ switchToOtp, switchToLogin }) {
  const [form, setForm] = useState({ email: "", password: "" });
  const [showPass, setShowPass] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const res = await handleFlow("register", form);
      console.log(res);
      switchToOtp(form.email);
    } catch (err) {
      console.log(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <motion.form
      onSubmit={handleSubmit}
      initial={{ opacity: 0, y: 25 }}
      animate={{ opacity: 1, y: 0 }}
      className="space-y-5"
    >
      {/* Title */}
      <div className="text-center space-y-1">
        <h2 className="text-2xl font-semibold">Create Account 🚀</h2>
        <p className="text-gray-500 text-sm">
          Join us and start your journey
        </p>
      </div>

      {/* Email */}
      <div className="relative">
        <Mail className="absolute left-3 top-2.5 text-gray-400" size={18} />

        <input
          type="email"
          placeholder="Enter your email"
          className="w-full pl-10 pr-3 py-2 rounded-lg border border-orange-400 focus:ring-2 focus:ring-orange-400 outline-none transition"
          onChange={(e) =>
            setForm({ ...form, email: e.target.value })
          }
          required
        />
      </div>

      {/* Password */}
      <div className="relative">
        <Lock className="absolute left-3 top-2.5 text-gray-400" size={18} />

        <input
          type={showPass ? "text" : "password"}
          placeholder="Create password"
          className="w-full pl-10 pr-10 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-orange-400 outline-none transition"
          onChange={(e) =>
            setForm({ ...form, password: e.target.value })
          }
          required
        />

        {/* Eye Toggle */}
        <div
          onClick={() => setShowPass(!showPass)}
          className="absolute right-3 top-2.5 cursor-pointer text-gray-400 hover:text-black"
        >
          {showPass ? <EyeOff size={18} /> : <Eye size={18} />}
        </div>
      </div>

      {/* Button */}
      <motion.button
        whileTap={{ scale: 0.95 }}
        whileHover={{ scale: 1.02 }}
        disabled={loading}
        className="w-full flex items-center justify-center gap-2 py-2 rounded-lg bg-gradient-to-r from-orange-400 to-red-500 text-white font-medium shadow-md hover:shadow-lg transition"
      >
        {loading ? "Creating..." : "Register"}
        {!loading && <ArrowRight size={18} />}
      </motion.button>

      {/* Footer */}
      <p className="text-center text-sm text-gray-500">
        Already have an account?{" "}
        <span
          onClick={switchToLogin}
          className="text-blue-600 cursor-pointer hover:underline font-medium"
        >
          Login 👋
        </span>
      </p>
    </motion.form>
  );
}