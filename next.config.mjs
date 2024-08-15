const analyzing = process.env.ANALYZE === "true";
/** @type {import('next').NextConfig} */
const nextConfig = {
  async rewrites() {
    return [
      {
        // http://43.203.222.95:8080/api/chat/rooms
        source: "/api/chat/rooms", // 요청한 경로
        destination: `${process.env.NEXT_PUBLIC_API_BASE_URL}/api/chat/rooms`, // 내가 사용할 경로
      },
      {
        // http://43.203.222.95:8080/api/member/colleague'
        source: "/api/member/colleague", // 요청한 경로
        destination: `http://43.203.222.95:8080/api/member/colleague`, // 내가 사용할 경로
      },
    ];
  },
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
