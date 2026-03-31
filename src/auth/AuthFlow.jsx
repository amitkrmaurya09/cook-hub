import {
  loginUser,
  registerUser,
  verifyOtp,
  forgotPassword,
  resetPassword,
} from "../api/api";

// 🔥 CENTRAL AUTH FLOW CONTROLLER
export async function handleAuthFlow({
  type,
  data,
  setView,
  setEmail,
}) {
  try {
    switch (type) {

      // 🔐 LOGIN
      case "login": {
        const res = await loginUser(data);

        if (res?.error === "USER_NOT_FOUND") {
          setView("register"); // 👈 smart redirect
        } else if (res?.error === "INVALID_PASSWORD") {
          return { error: "Wrong password" };
        } else {
              // ✅ STORE TOKEN HERE
            localStorage.setItem("token", res.token);
            return { success: true, user: res.user };
        }
        break;
      }

      // 📝 REGISTER
      case "register": {
        const res = await registerUser(data);

        setEmail(data.email);
        setView("otp"); // 👈 move to OTP

        return res;
      }

      // 🔢 OTP VERIFY
      case "otp": {
        const res = await verifyOtp(data);

        if (res?.success) {
          return { success: true };
        }
        return { error: "Invalid OTP" };
      }

      // 🔑 FORGOT PASSWORD
      case "forgot": {
        const res = await forgotPassword(data);

        setEmail(data.email);
        setView("reset");

        return res;
      }

      // 🔄 RESET PASSWORD
      case "reset": {
        const res = await resetPassword(data);

        setView("login"); // 👈 back to login

        return res;
      }

      default:
        return { error: "Unknown action" };
    }
  } catch (err) {
    return { error: "Something went wrong" };
  }
}