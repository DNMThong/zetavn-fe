/** @type {import('next').NextConfig} */
const path = require("path");

const nextConfig = {
  images: {
    domains: [
      "via.placeholder.com",
      "lipsum.app",
      "images.unsplash.com",
      "plus.unsplash.com",
      "res.cloudinary.com",
    ],
  },
  sassOptions: {
    includePaths: [path.join(__dirname, "assets/scss")],
  },
  reactStrictMode: false,
  env: {
    ZEGO_APP_ID: 851941891,
    ZEGO_SERVER_SECRET: "41c60a73d8036693a7d4503ee90c3a94",
  },
};

module.exports = nextConfig;
