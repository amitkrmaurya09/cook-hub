import { useState } from "react";
import { verifyOtp } from "../api/api";

export default function OtpVerify({ email }) {
  const [otp, setOtp] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    const res = await handleFlow("otp", { email, otp });
    console.log(res);
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2>Verify OTP</h2>

      <input
        placeholder="Enter OTP"
        onChange={(e) => setOtp(e.target.value)}
      />

      <button type="submit">Verify</button>
    </form>
  );
}