import { useState } from "react";
import { loginUser } from "../api/auth-api";
import { motion } from "framer-motion";
import { Mail, Lock, Eye, EyeOff, ArrowRight } from "lucide-react";
import { useNavigate } from "react-router-dom";

export default function Login({ switchToForgot, switchToRegister, handleFlow, closeModal }) {
  const [form, setForm] = useState({ email: "", password: "" });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [showPass, setShowPass] = useState(false);

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const res = await handleFlow("login", form);

      if (res?.error) {
        setError(res.error);
      } else if (res?.success) {
        console.log("Login success 🚀");

        closeModal();           // ✅ close modal
        window.location.reload(); // ✅ refresh dashboard
      }
    } catch (err) {
      setError("Something went wrong 😅");
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
        <h2 className="text-2xl font-semibold">Welcome Back 👋</h2>
        <p className="text-gray-500 text-sm">Login to continue</p>
      </div>

      {/* Email */}
      <div className="relative">
        <Mail className="absolute left-3 top-2.5 text-gray-400" size={18} />

        <input
          type="email"
          placeholder="Enter your email"
          className="w-full pl-10 pr-3 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-orange-400 outline-none transition"
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
          placeholder="Enter password"
          className="w-full pl-10 pr-10 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-orange-400 outline-none transition"
          onChange={(e) =>
            setForm({ ...form, password: e.target.value })
          }
          required
        />

        {/* Toggle Eye */}
        <div
          className="absolute right-3 top-2.5 cursor-pointer text-gray-400 hover:text-black"
          onClick={() => setShowPass(!showPass)}
        >
          {showPass ? <EyeOff size={18} /> : <Eye size={18} />}
        </div>
      </div>

      {/* Error */}
      {error && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="text-sm text-red-500 bg-red-50 p-2 rounded text-center"
        >
          {error}
        </motion.div>
      )}

      {/* Forgot */}
      <div className="text-right">
        <span
          onClick={switchToForgot}
          className="text-sm text-blue-500 cursor-pointer hover:underline"
        >
          Forgot Password?
        </span>
      </div>

      {/* Button */}
      <motion.button
        whileTap={{ scale: 0.95 }}
        whileHover={{ scale: 1.02 }}
        disabled={loading}
        className="w-full flex items-center justify-center gap-2 py-2 rounded-lg bg-gradient-to-r from-orange-400 to-red-500 text-white font-medium shadow-md hover:shadow-lg transition"
      >
        {loading ? "Logging in..." : "Login"}
        {!loading && <ArrowRight size={18} />}
      </motion.button>

      {/* Register CTA */}
      <p className="text-center text-sm text-gray-500">
        Don’t have an account?{" "}
        <span
          onClick={switchToRegister}
          className="text-blue-600 cursor-pointer hover:underline font-medium"
        >
          Register 🚀
        </span>
      </p>
    </motion.form>
  );
}