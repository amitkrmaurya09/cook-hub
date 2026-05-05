import { useState, forwardRef, useImperativeHandle, useRef } from "react";

import AuthModal from "./Model";
import Login from "../../auth/Login";
import Register from "../../auth/Register";
import OtpVerify from "../../auth/OtpVerify";
import ForgotPassword from "../../auth/ForgotPassword";
import ResetPassword from "../../auth/ResetPassword";
import { handleAuthFlow } from "./ModalFlow"; // adjust path
import Profile from "../ProfilePages/Profile";
import Create from "../../pages/Create";
import Feed from "../../feed/FeedPage";


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
        close: () => {
            modalRef.current.close(); // 👈 add this
        },
        openProfile: () => {
            setView("profile");
            modalRef.current.open();
        },
        openCreate: () => {
            setView("create");
            modalRef.current.open();
        },
        openFeed: () => {
            setView("feed");
            modalRef.current.open();
        }
    }));

    const renderView = () => {
        switch (view) {
            case "register":
                return (
                    <Register
                        handleFlow={handleFlow} // Added this
                        switchToOtp={(e) => {
                            setEmail(e);
                            setView("otp");
                        }}
                        switchToLogin={() => setView("login")}
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
                return <ResetPassword email={email} handleFlow={handleFlow} />;
            case "profile":
                return <Profile />;
            case "create":
                return <Create />
            case "edit":
                return <Create />
            case "feed":
                return <Feed />
            default:
                return (
                    <Login
                        switchToForgot={() => setView("forgot")}
                        switchToRegister={() => setView("register")}
                        handleFlow={handleFlow}
                        closeModal={() => modalRef.current.close()}
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