import { useState } from "react";

export default function OtpVerify({ email, handleFlow }) {
  const [otp, setOtp] = useState("");
  const [loading, setLoading] = useState(false);
  const [msg, setMsg] = useState("");
  const [error, setError] = useState("");

  const submit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    setMsg("");

    try {
      const res = await handleFlow("otp", { email, otp });

      if (res?.success) {
        setMsg("OTP verified successfully. Redirecting to login...");
      } else {
        setError(res?.error || "Invalid OTP");
      }
    } catch (err) {
      setError("Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <form
      onSubmit={submit}
      className="w-full max-w-sm mx-auto space-y-5 bg-white p-6 rounded-2xl shadow-md"
    >
      {/* Title */}
      <div className="text-center space-y-1">
        <h2 className="text-2xl font-semibold text-gray-800">
          Verify OTP 🔐
        </h2>
        <p className="text-sm text-gray-500">
          Enter the 6-digit code sent to
        </p>
        <p className="text-sm font-medium text-gray-700">{email}</p>
      </div>

      {/* OTP Input */}
      <input
        type="text"
        maxLength={6}
        placeholder="Enter OTP"
        value={otp}
        onChange={(e) => setOtp(e.target.value)}
        className="w-full text-center tracking-widest text-lg px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-orange-400 outline-none transition"
        required
      />

      {/* Success Message */}
      {msg && (
        <div className="text-green-600 text-sm text-center bg-green-50 py-2 rounded">
          {msg}
        </div>
      )}

      {/* Error Message */}
      {error && (
        <div className="text-red-500 text-sm text-center bg-red-50 py-2 rounded">
          {error}
        </div>
      )}

      {/* Button */}
      <button
        disabled={loading}
        className="w-full py-2 rounded-lg bg-gradient-to-r from-orange-400 to-red-500 text-white font-medium shadow hover:shadow-lg transition disabled:opacity-70"
      >
        {loading ? "Verifying..." : "Verify OTP"}
      </button>

      {/* Footer */}
      <p className="text-center text-xs text-gray-400">
        Didn’t receive the code?{" "}
        <span className="text-blue-500 cursor-pointer hover:underline">
          Resend OTP
        </span>
      </p>
    </form>
  );
}