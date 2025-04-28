import axiosInstance from '@/api/axiosInstance';

export const authService = {
  async login(email: string, password: string) {
    const { data } = await axiosInstance.post('https://mirzaredzic.hopto.org/api/login', { email, password });
    return data.data;
  },

  async logout() {
    const { data } = await axiosInstance.get('https://mirzaredzic.hopto.org/api/logout');
    return data;
  },
};
