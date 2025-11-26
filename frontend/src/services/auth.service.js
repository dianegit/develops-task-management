import api from './api';

export const authService = {
    async register(userData) {
        const response = await api.post('/auth/register', userData);
        return response.data;
    },

    async login(credentials) {
        const response = await api.post('/auth/login', credentials);
        const { access_token, refresh_token } = response.data;

        localStorage.setItem('access_token', access_token);
        localStorage.setItem('refresh_token', refresh_token);

        return response.data;
    },

    async logout() {
        try {
            await api.post('/auth/logout');
        } finally {
            localStorage.removeItem('access_token');
            localStorage.removeItem('refresh_token');
        }
    },

    async getProfile() {
        const response = await api.get('/auth/profile');
        return response.data;
    },

    isAuthenticated() {
        return !!localStorage.getItem('access_token');
    },
};
