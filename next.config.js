/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export',
  trailingSlash: true,
  images: {
    loader: 'custom',
    loaderFile: './src/image-loader.js',
  },
  // distDir: 'dist',
};

module.exports = nextConfig;
