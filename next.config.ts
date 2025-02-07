import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  images: {
      domains: ['avatars.githubusercontent.com', 'res.cloudinary.com'], // Use 'domains' for simple hostnames
      remotePatterns: [
        {
          protocol: 'https',
          hostname: 'res.cloudinary.com',
        }
      ]
  }
};

export default nextConfig;
