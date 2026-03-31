import { useState, forwardRef, useImperativeHandle, useRef } from "react";

import AuthModal from "./AuthModel";
import Login from "./Login";
import Register from "./Register";
import OtpVerify from "./OtpVerify";
import ForgotPassword from "./ForgotPassword";
import ResetPassword from "./ResetPassword";
import { handleAuthFlow } from "./AuthFlow"; // adjust path
import Profile from "../pages/Profile";
import Create from "../pages/Create";


const AuthContainer = forwardRef((props, ref) => {
    const modalRef = useRef();
    
    const [view, setView] = useState("login");
    const [email, setEmail] = useState("");
    
    const handleFlow = (type, data) =>
      handleAuthFlow({
        type,
        data,
        setView,
        setEmail,
      });

    // expose open() to navbar
    useImperativeHandle(ref, () => ({
        open: () => {
            setView("login");
            modalRef.current.open();
        },
        openProfile: () => {
            setView("profile");
            modalRef.current.open();
        },
        openCreate: ()=>{
            setView("create");
            modalRef.current.open();
        }
    }));

    const renderView = () => {
        switch (view) {
            case "register":
                return (
                    <Register
                        switchToOtp={(e) => {
                            setEmail(e);
                            setView("otp");
                        }}
                        switchToLogin={() => setView("login")} // ✅ ADD THIS
                    />
                );

            case "otp":
                return <OtpVerify email={email} handleFlow={handleFlow} />;

            case "forgot":
                return (
                    <ForgotPassword
                        switchToReset={(e) => {
                            setEmail(e);
                            setView("reset");
                        }}
                        handleFlow={handleFlow}
                    />
                );

            case "reset":
                return <ResetPassword email={email} />;
            case "profile":
                return <Profile />;
            case "create":
                return <Create />
            default:
                return (
                    <Login
                        switchToForgot={() => setView("forgot")}
                        switchToRegister={() => setView("register")}
                        handleFlow={handleFlow}
                        
                    />
                );
        }
    };

    return (
        <AuthModal ref={modalRef}>
            {renderView()}
        </AuthModal>
    );
});

export default AuthContainer;