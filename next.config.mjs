/** @type {import('next').NextConfig} */
const nextConfig = {
    reactStrictMode: false,
    images: {
        remotePatterns: [
            {
                protocol: 'https',
                hostname: '**',
            },
            {
                protocol: 'http',
                hostname: '**',
            },
        ],
    },
    typescript: {
        // !! WARN !!
        // Dangerously allow production builds to successfully complete even if
        // your project has type errors.
        // !! WARN !!
        ignoreBuildErrors: true,
    },
    async rewrites() {
        return [
            {
                source: '/v1/search/local.json',
                destination: 'https://openapi.naver.com/v1/search/local.json',
            },
            {
                source: '/v1/search/image.json',
                destination: 'https://openapi.naver.com/v1/search/image.json',
            },
        ];
    },
};

export default nextConfig;
