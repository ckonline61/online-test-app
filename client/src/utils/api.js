import axios from 'axios';

const api = axios.create({
    baseURL: '/api', // Proxy handles this in dev
});

// Add headers if token exists
api.interceptors.request.use((config) => {
    const user = JSON.parse(localStorage.getItem('user'));
    if (user?.token) {
        config.headers.Authorization = `Bearer ${user.token}`;
    }
    return config;
});

export default api;
