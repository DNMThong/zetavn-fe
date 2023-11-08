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
};

module.exports = nextConfig;
