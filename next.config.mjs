/** @type {import('next').NextConfig} */
const nextConfig = {
  /* config options here */
  reactCompiler: true,

  async redirects() {
    return [
      {
        source: "/:path*",
        has: [
          {
            type: "host",
            value: "seenbygeo.com",
          },
        ],
        destination: "https://www.seenbygeo.com/:path*",
        permanent: true,
      },
    ];
  },
};

export default nextConfig;
