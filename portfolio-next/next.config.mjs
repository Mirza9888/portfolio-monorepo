// next.config.js
export default {
    output: 'standalone',
    transpilePackages: ['@mui/material', '@mui/system', '@mui/icons-material'],
    async headers() {
        return [
            {
                source: '/:path*',
                headers: [
                    {
                        key: 'Content-Security-Policy',
                        value: "default-src 'self' https: data: blob: 'unsafe-inline' 'unsafe-eval'; connect-src 'self' https://mirzaredzic.duckdns.org https://*.duckdns.org wss://*.duckdns.org;"
                    },
                    {
                        key: 'X-Content-Type-Options',
                        value: 'nosniff'
                    },
                    {
                        key: 'X-Frame-Options',
                        value: 'DENY'
                    },
                    {
                        key: 'X-XSS-Protection',
                        value: '1; mode=block'
                    }
                ]
            }
        ]
    },
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
    },
    env: {
        NEXT_PUBLIC_API_URL: 'https://mirzaredzic.duckdns.org/api'
    }
};
