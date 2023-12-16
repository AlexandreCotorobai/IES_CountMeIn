const BASE_URL = import.meta.env.VITE_BASE_URL || 'http://localhost:8080/api';

export const API_URLS = {
    login: `${BASE_URL}/login`,
    user: `${BASE_URL}/user`,
    rooms: `${BASE_URL}/rooms`,
    settings: `${BASE_URL}/roomSettings/update`,
    generalInfo: `${BASE_URL}/roomSettings/generalInfo`,
    todayGraph: `${BASE_URL}/roomSettings/todayGraph`,
    weekGraph: `${BASE_URL}/roomSettings/weekGraph`,
    monthGraph: `${BASE_URL}/roomSettings/monthGraph`,

}