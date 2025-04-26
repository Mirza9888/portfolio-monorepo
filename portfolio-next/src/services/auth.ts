// src/services/auth.ts

import axiosInstance from '@/api/axiosInstance';

export const authService = {
  async login(email: string, password: string) {
    const { data } = await axiosInstance.post('/login', { email, password });
    return data.data;
  },

  async logout() {
    const { data } = await axiosInstance.get('/logout');
    return data;
  },
};
