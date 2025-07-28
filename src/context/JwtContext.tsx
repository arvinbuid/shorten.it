import { useState } from "react";
import { JwtContext } from "./useJwtContext";

interface JwtProviderProps {
    children: React.ReactNode;
}

export const JwtProvider = ({ children }: JwtProviderProps) => {
    const rawToken = localStorage.getItem("JWT_TOKEN");
    const storedToken = rawToken ? JSON.parse(rawToken) : null;
    const [token, setToken] = useState<string | null>(storedToken);

    return <JwtContext.Provider value={{ token, setToken }}>
        {children}
    </JwtContext.Provider>
}