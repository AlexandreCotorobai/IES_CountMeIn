import {User, LoginSchema} from "@/lib/types";
import React, {useState, useMemo, useEffect} from "react";
import { QueryClient } from "react-query";
import { useMutation, useQuery } from 'react-query';
import axios from 'axios';
import { API_URLS } from '@/lib/urls';

export interface AuthProps {
    children: React.ReactNode;
}

export interface IAuthContext {
    user: User | null;
    token: string | null,
    setToken: (token: string | null) => void;
    login: (user: User, token: string) => Promise<void>;
    isLogged: () => boolean;
    logout: () => Promise<void>;
}

export const AuthContext = React.createContext<IAuthContext>({} as IAuthContext);

export const AuthProvider: React.FC<AuthProps> = ({children}: React.PropsWithChildren<{}>) => {
    const [user, setUser] = useState<User | null>(null);
    const [token, setToken] = useState<string | null>(null);
    const queryClient = new QueryClient();
    
    const login = async (user: User, token: string) => {
        setUser(user);
        setToken(token);
    }

    const isLogged = () => {
        return user !== null && token !== null;
    }

    const logout = async () => {
        setUser(null);
        setToken(null);
        localStorage.removeItem('token');
        queryClient.clear();
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

export const useAuthContext = () => {
    const context = React.useContext(AuthContext)
    if (context === undefined) {
        throw new Error('useAuthContext must be used within a AuthProvider')
    }
    return context
}