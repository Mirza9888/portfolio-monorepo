export const authService = {
    async login(email: string, password: string) {
        const response = await fetch('http://portfolio:8443/api/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            credentials: 'include',
            body: JSON.stringify({ email, password }),
        });

        if (!response.ok) {
            throw new Error('Login failed');
        }

        return response.json();
    },

    async logout() {
        const response = await fetch('http://portfolio:8443/api/logout', {
            method: 'GET',
            credentials: 'include',
        });

        return response.json();
    }
};