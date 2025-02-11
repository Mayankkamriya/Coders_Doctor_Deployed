import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  images: {
      domains: ['avatars.githubusercontent.com', 'res.cloudinary.com','lh3.googleusercontent.com'], // Use 'domains' for simple hostnames
      remotePatterns: [
        {
          protocol: 'https',
          hostname: 'res.cloudinary.com',
        }
      ]
  }
};

export default nextConfig;
