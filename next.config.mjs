/** @type {import('next').NextConfig} */
const nextConfig = {
  turbopack: {
    // Optional Turbopack config options can go here
  },
  images: {
    domains: ['fra.cloud.appwrite.io'],
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'res.cloudinary.com',
        pathname: '**',
      },
      {
        protocol: 'https',
        hostname: 'raw.githubusercontent.com',
        pathname: '**',
      },
    ],
  },
};

export default nextConfig;
