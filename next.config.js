/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  images: {
  remotePatterns: [
    {
      protocol: 'https',
      hostname: 'your-domain.com',
      pathname: '/**',
    },
  ],
  dangerouslyAllowSVG: true,
},
  // Configuration for handling server-side rendering
  experimental: {
    // This setting helps with hydration issues
    optimizeCss: true,
  },
  // Disable static optimization for pages that use browser-only APIs
  // This ensures they're rendered at runtime instead of build time
  typescript: {
    // Ignore TypeScript errors during build
    ignoreBuildErrors: true,
  },
  eslint: {
    // Ignore ESLint errors during build
    ignoreDuringBuilds: true,
  },
}

module.exports = nextConfig