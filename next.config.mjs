const analyzing = process.env.ANALYZE === "true";
/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    staleTimes: {
      dynamic: 0,
      static: 180,
    },
  },
  images: {
    remotePatterns: [
      {
        protocol: "http",
        hostname: "localhost",
        port: "3000",
      },
    ],
  },
};

let finalConfig = nextConfig;

if (analyzing) {
  const withBundleAnalyzer = (await import("@next/bundle-analyzer")).default({
    enabled: true,
  });
  finalConfig = withBundleAnalyzer(nextConfig);
}

export default finalConfig;
