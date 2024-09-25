import React, { createContext, useContext, useEffect, useState } from "react";
import { IAuth, IToken } from "../interfaces";

interface IAuthProviderProps {
    children: React.ReactNode;
}

interface IContextProps extends Partial<IAuth>, Partial<IToken> {
    saveAuth: (auth: IAuth) => void;
    saveToken: (values: IToken) => void;
}

const AuthContext = createContext<IContextProps | null>(null);

export const AuthProvider = ({ children }: IAuthProviderProps) => {
    const [auth, setAuth] = useState<IAuth | null>(null);
    const [tokens, setTokens] = useState<IToken | null>();

    // Get Profile
    useEffect(() => {
        // get Token from cookie
    }, []);

    const saveAuth = (values: IAuth) => {
        setAuth(values);
    };

    const saveToken = (values: IToken) => {
        setTokens(values);
    };

    return (
        <AuthContext.Provider
            value={{
                ...tokens,
                ...auth,
                saveAuth,
                saveToken,
            }}
        >
            {children}
        </AuthContext.Provider>
    );
};
export const useAuth = () => {
    const context = useContext(AuthContext);
    if (!context) {
        throw new Error("useAuth must be used within an AuthProvider");
    }
    return context;
};
