import { useState } from "react";
import { resetPassword } from "../api/api";

export default function ResetPassword({ email }) {
  const [password, setPassword] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    const res = await resetPassword({ email, password });
    console.log(res);
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2>Reset Password</h2>

      <input
        type="password"
        placeholder="New Password"
        onChange={(e) => setPassword(e.target.value)}
      />

      <button>Reset</button>
    </form>
  );
}