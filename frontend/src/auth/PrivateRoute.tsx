import { Navigate } from "react-router-dom";
import { useAuth } from "./AuthContext";
import { JSX } from "react";

export const PrivateRoute = ({ children }: { children: JSX.Element }) => {
    const { user, loading } = useAuth();

    if (loading) return <p>Loading...</p>;
    if (!user) return <Navigate to="/login" />;

    return children;
};