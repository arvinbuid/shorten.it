import { useState } from "react";
import { JwtContext } from "./useJwtContext";

interface JwtProviderProps {
    children: React.ReactNode;
}

export const JwtProvider = ({ children }: JwtProviderProps) => {
    const storedToken = localStorage.getItem("JWT_TOKEN") ? JSON.parse(localStorage.getItem("JWT_TOKEN")!) : null;
    const [token, setToken] = useState(storedToken);

    return <JwtContext.Provider value={{ token, setToken }}>
        {children}
    </JwtContext.Provider>
}