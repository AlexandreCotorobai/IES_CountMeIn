import {User, LoginSchema} from "@/lib/types";
import React, {useState, useMemo, useEffect} from "react";
import { useMutation, useQuery, QueryClient } from 'react-query';
import axios from 'axios';
import { API_URLS } from '@/lib/urls';

export interface AuthProps {
    children: React.ReactNode;
}

export interface IAuthContext {
    user: User | null;
    token: string,
    setToken: (token: string | null) => void;
    login: (user: User, token: string) => Promise<void>;
    isLogged: () => boolean;
    logout: () => Promise<void>;
    loginMutation: any;
    error: string | null;
}

export const AuthContext = React.createContext<IAuthContext>({} as IAuthContext);

export const AuthProvider: React.FC<AuthProps> = ({children}: React.PropsWithChildren<{}>) => {
    const [user, setUser] = useState<User | null>(null);
    const [token, setToken] = useState<string | null >("");
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
        setToken("");
        localStorage.removeItem('token');
        queryClient.clear();
    }

    const [error, setError] = useState<string | null>(null);

    const loginMutation = useMutation({
        mutationFn: async (loginData: LoginSchema) => {
            const { data } = await axios.post(API_URLS.login, loginData);
            return data;
        },
        onSuccess: (data) => {
            setToken(data.token);
            localStorage.setItem('token', data.token);
        },
        onError: (error: any) => {
            setError(error.response?.data?.message || 'Login failed. Please try again.');
        },
    });

    useQuery(
        'userData',
        async () => {
            const response = await axios.get(API_URLS.user, {
                headers: { Authorization: `Bearer ${token}` }
            });
            return response.data;
        },
        {
            enabled: !!token,
            onSuccess: (data) => {
                if (token){
                    login(data, token);
                }
            },
            onError: (error: any) => {
                setError(error.response?.data?.message || 'Failed to fetch user data.');
            },
        }
    );

    useEffect(() => {
        const token = localStorage.getItem('token');
        if (token) {
            setToken(token);
        }
    }, []);

    const authCtx = useMemo<IAuthContext>(():IAuthContext => ({
        user,
        token,
        setToken,
        login,
        isLogged,
        logout,
        loginMutation,
        error,
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