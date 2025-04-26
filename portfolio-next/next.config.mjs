// next.config.js
export default {
    transpilePackages: ['@mui/material', '@mui/system', '@mui/icons-material'],
    async rewrites() {
        return [
            {
                source: '/api/:path*',
                destination: 'https://mirzaredzic.hopto.org/api/:path*'
            }
        ]
    }
};
