/** @type {import('next').NextConfig} */
const nextConfig = {
    reactStrictMode: true,
    async rewrites() {
        return [
            {
                source: '/v1/search/local.json',
                destination: 'https://openapi.naver.com/v1/search/local.json',
            },
        ]
    },
}

export default nextConfig
