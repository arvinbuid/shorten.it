import {createContext, useContext} from "react";

interface JwtContextType {
  token: string | null;
  setToken: React.Dispatch<React.SetStateAction<string | null>>;
}

export const JwtContext = createContext<JwtContextType | undefined>(undefined);

export const useJwt = () => {
  const context = useContext(JwtContext);
  if (!context) throw new Error("useJwt must be used within a JwtProvider");
  return context;
};
