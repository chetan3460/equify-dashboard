/** @type {import('next').NextConfig} */

const nextConfig = {
  // Suppress React 19 ref warnings during React 18 migration period
  onDemandEntries: {
    // Keep pages in memory longer to avoid refactoring
    maxInactiveAge: 60 * 1000,
    pagesBufferLength: 5,
  },
  reactCompiler: false,
  experimental: {
    // Disable problematic devtools in development
    optimizePackageImports: ['@radix-ui/react-select', '@radix-ui/react-dialog'],
  },
  // Improve development experience
  devIndicators: {
    position: 'bottom-right',
  },
  // Turbopack configuration
  turbopack: {
    resolveExtensions: [
      '.mdx',
      '.tsx',
      '.ts',
      '.jsx',
      '.js',
      '.mjs',
      '.json',
    ],
  },
  // Fallback webpack config for production builds
  webpack(config) {
    // Grab the existing rule that handles SVG imports
    const fileLoaderRule = config.module.rules.find((rule) =>
      rule.test?.test?.(".svg")
    );

    config.module.rules.push(
      // Reapply the existing rule, but only for svg imports ending in ?url
      {
        ...fileLoaderRule,
        test: /\.svg$/i,
        resourceQuery: /url/, // *.svg?url
      },
      // Convert all other *.svg imports to React components
      {
        test: /\.svg$/i,
        issuer: fileLoaderRule.issuer,
        resourceQuery: { not: [...fileLoaderRule.resourceQuery.not, /url/] }, // exclude if *.svg?url
        use: ["@svgr/webpack"],
      }
    );

    // Modify the file loader rule to ignore *.svg, since we have it handled now.
    fileLoaderRule.exclude = /\.svg$/i;

    return config;
  },
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "api.lorem.space",
      },
    ],
  },
};

module.exports = nextConfig;
