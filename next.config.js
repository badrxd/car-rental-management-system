/** @type {import('next').NextConfig} */
const nextConfig = {};

module.exports = {
  images: {
    // domains: ["lh3.googleusercontent.com"],
    remotePatterns: [
      {
        protocol: "https",
        hostname: "**",
      },
    ],
  },
};
