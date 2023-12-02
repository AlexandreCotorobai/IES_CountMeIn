import { useState } from 'react';
import { useMutation, useQuery } from 'react-query';
import axios from 'axios';
import { useAuthContext } from '@/contexts/auth';
import { API_URLS } from '@/lib/urls';

const useUserAuth = () => {
    const { setToken, login, token } = useAuthContext();
    const [error, setError] = useState<string | null>(null);

    const loginMutation = useMutation({
        mutationFn: async (loginData) => {
            const { data } = await axios.post(API_URLS.login, loginData);
            return data;
        },
        onSuccess: (data) => {
            setToken(data.token);
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

    return {
        login: loginMutation.mutateAsync,
        isLoading: loginMutation.isLoading,
        error,
    };
};

export default useUserAuth;