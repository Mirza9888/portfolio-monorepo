// next.config.js
export default {
    transpilePackages: ['@mui/material', '@mui/system', '@mui/icons-material'],
    async rewrites() {
        return [
            {
                source: '/api/:path*',
                destination: 'https://mirzaredzic.duckdns.org/api/:path*'
            },
            {
                source: '/contents',
                destination: 'https://mirzaredzic.duckdns.org/api/contents'
            },
            {
                source: '/login',
                destination: 'https://mirzaredzic.duckdns.org/api/login'
            }
        ]
    }
};
