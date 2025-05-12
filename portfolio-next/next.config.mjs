// next.config.js
export default {
    transpilePackages: ['@mui/material', '@mui/system', '@mui/icons-material'],
    async rewrites() {
        return [
            {
                source: '/api/:path*',
                destination: 'http://mirzaredzic.duckdns.org/api/:path*'
            },
            {
                source: '/contents',
                destination: 'http://mirzaredzic.duckdns.org/api/contents'
            }
        ]
    }
};
