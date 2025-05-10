/** @type {import('next').NextConfig} */

const isProd = process.env.NODE_ENV === 'production';

const nextConfig = {
    output: 'export', // enables static export
    trailingSlash: true, // recommended for GitHub Pages
    assetPrefix: isProd ? '/interactive-learning/' : '',
    basePath: isProd ? '/interactive-learning' : '',
};

export default nextConfig;
