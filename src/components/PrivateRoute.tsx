import type React from "react";
import { Navigate } from "react-router-dom";
import { useJwt } from "../context/useJwtContext";

interface PrivateRouteProps {
    children: React.ReactNode;
    publicPage: boolean;
}

const PrivateRoute = ({ children, publicPage }: PrivateRouteProps) => {
    const { token } = useJwt();

    if (publicPage) return token ? <Navigate to='/dashboard' /> : children; // if public page & token exists, redirect to dashboard

    return !token ? <Navigate to='/login' /> : children; // if not public page & token doesn't exist, redirect to login
}

export default PrivateRoute;