import createMDX from '@next/mdx';

/** @type {import('next').NextConfig} */
const isProd = process.env.NODE_ENV === 'production';

const withMDX = createMDX({
  extension: /\.(md|mdx)$/,
});

const nextConfig = {
  output: 'export',
  trailingSlash: true,
  assetPrefix: isProd ? '/gamified-learning/' : '',
  basePath: isProd ? '/gamified-learning' : '',
  pageExtensions: ['js', 'jsx', 'ts', 'tsx', 'md', 'mdx'],
};

export default withMDX(nextConfig);
