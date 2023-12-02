import {User} from "@/lib/types";
import React, {useState, useMemo} from "react";

export interface AuthProps {
    children: React.ReactNode;
}

export interface IAuthContext {
    user: User | null;
    token: string | null,
    setToken: (token: string | null) => void;
    login: (auth: User) => void;
    isLogged: () => boolean;
    logout: () => void;
}

export const AuthContext = React.createContext<IAuthContext>({} as IAuthContext);

export const AuthProvider: React.FC<AuthProps> = ({children}: React.PropsWithChildren<{}>) => {
    const [user, setUser] = useState<User | null>(null);
    const [token, setToken] = useState<string | null>(null);
    const login = async (user: User) => {
        setUser(user);
        // await queryClient.resetQueries('articles')
    }

    const isLogged = () => {
        return user !== null && token !== null;
    }

    const logout = async () => {
        setUser(null);
        setToken(null);
    }

    const authCtx = useMemo<IAuthContext>(():IAuthContext => ({
        user,
        token,
        setToken,
        login,
        isLogged,
        logout,
    }), [user, token]);

    return (
        <AuthContext.Provider value={authCtx}>
            {children}
        </AuthContext.Provider>
    );
}

export const useAuthContext = () => React.useContext(AuthContext);