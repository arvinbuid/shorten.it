import type React from "react";
import { Navigate } from "react-router-dom";
import { useJwt } from "../context/useJwtContext";

interface PrivateRouteProps {
    children: React.ReactNode;
    publicPage: React.ReactElement;
}

const PrivateRoute = ({ children, publicPage }: PrivateRouteProps) => {
    const { token } = useJwt();

    if (publicPage) return token ? <Navigate to='/dashboard' /> : children;

    return !token ? <Navigate to='/login' /> : children;
}

export default PrivateRoute;