/** @type {import('next').NextConfig} */

const isProd = process.env.NODE_ENV === 'production';

const nextConfig = {
    output: 'export', // enables static export
    trailingSlash: true, // recommended for GitHub Pages
    assetPrefix: isProd ? '/gamified-learning/' : '',
    basePath: isProd ? '/gamified-learning' : '',
};

export default nextConfig;
