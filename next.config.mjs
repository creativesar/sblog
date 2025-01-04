/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'cdn.sanity.io',
      },
      {
        protocol: 'https',
        hostname: 'pagedone.io',
      },
      {
        protocol: 'https',
        hostname: 'readymadeui.com',
      },
    ],
    unoptimized: true,  // Disable image optimization
  },
  // output: 'export', // For static export
};

export default nextConfig;
