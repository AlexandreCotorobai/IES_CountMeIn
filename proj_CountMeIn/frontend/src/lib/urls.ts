const BASE_URL = import.meta.env.VITE_BASE_URL || 'http://localhost:8080/api';

export const API_URLS = {
    login: `${BASE_URL}/login`,
    user: `${BASE_URL}/user`,
    settings: `${BASE_URL}/roomSettings/update`,
    generalInfo: `${BASE_URL}/roomSettings/generalInfo`,
}