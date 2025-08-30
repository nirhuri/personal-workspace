import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../auth/AuthContext";

export const AuthCallback = () => {
    const { login } = useAuth();
    const navigate = useNavigate();

    useEffect(() => {
        const params = new URLSearchParams(window.location.search);
        console.log("params: ", params.get("token"))
        const token = params.get("token");

        if (token) {
            login(token);
            navigate("/");
        } else {
            navigate("/login?error=missing_token");
        }
    }, [login, navigate]);

    return <p>מתחבר...</p>;
};