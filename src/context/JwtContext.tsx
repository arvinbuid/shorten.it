import { useEffect, useState } from "react";
import { JwtContext, type JwtPayload } from "./useJwtContext";
import { jwtDecode } from "jwt-decode"

interface JwtProviderProps {
    children: React.ReactNode;
}

export const JwtProvider = ({ children }: JwtProviderProps) => {

    const [token, setToken] = useState<string | null>(() => {
        try {
            const rawToken = localStorage.getItem("JWT_TOKEN");
            return rawToken ? JSON.parse(rawToken) : null;
        } catch (error) {
            console.error("Failed to parse token from localStorage", error);
            return null;
        }
    });
    const [user, setUser] = useState<JwtPayload | null>(null);

    // Retrieve token from local storage
    useEffect(() => {
        const rawToken = localStorage.getItem("JWT_TOKEN");
        if (rawToken) {
            try {
                const storedToken = JSON.parse(rawToken);
                setToken(storedToken);
                const decodedUser = jwtDecode<JwtPayload>(storedToken);
                setUser(decodedUser);

            } catch (error) {
                console.error("Failed to parse or decode token", error);
                localStorage.removeItem("JWT_TOKEN"); // Clear invalid token
            }
        }
    }, [])

    return <JwtContext.Provider value={{ token, setToken, user }}>
        {children}
    </JwtContext.Provider>
}