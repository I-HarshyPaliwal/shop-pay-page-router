/** @type {import('next').NextConfig} */
import path from "path";
const __dirname = path.resolve();

const nextConfig = {
  reactStrictMode: true,
  sassOptions: {
    includePaths: [path.join(__dirname , "styles")],
    prependData : `@import "base.scss";`,
  },
};

export default nextConfig;
