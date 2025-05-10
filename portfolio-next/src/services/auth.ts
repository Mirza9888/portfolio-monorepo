import api from '../lib/axios';

export const authService = {
    async login(email: string, password: string) {
        const response = await api.post('/login', {
            email,
            password
        });
        return response.data;
    },

    async register(email: string, password: string, name: string) {
        const response = await api.post('/register', {
            email,
            password,
            name
        });
        return response.data;
    },

    async logout() {
        const response = await api.post('/logout');
        return response.data;
    }
};