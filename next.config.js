/** @type {import('next').NextConfig} */
const path = require("path");

const nextConfig = {
  images: {
    domains: ["via.placeholder.com", "lipsum.app"],
  },
  sassOptions: {
    includePaths: [path.join(__dirname, "assets/scss")],
  },
};

module.exports = nextConfig;
