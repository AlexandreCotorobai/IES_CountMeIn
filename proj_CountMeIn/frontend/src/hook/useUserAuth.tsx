import { useEffect, useState } from 'react';
import { useMutation, useQuery } from 'react-query';
import axios from 'axios';
import { useAuthContext } from '@/contexts/auth';
import { API_URLS } from '@/lib/urls';
import { LoginSchema } from '@/lib/types';

const useUserAuth = () => {
    const { setToken, login, token } = useAuthContext();
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
                login(data);
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

    return {
        login: loginMutation.mutateAsync,
        isLoading: loginMutation.isLoading,
        error,
    };
};

export default useUserAuth;