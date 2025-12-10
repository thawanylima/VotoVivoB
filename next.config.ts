import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'www.camara.leg.br',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'placehold.co',
        pathname: '/**',
      },
    ],
  },
  
  // Configuração ESSENCIAL para proxy - corrige CORS
  async rewrites() {
    return [
      {
        source: '/api/camara/:path*',
        destination: 'https://dadosabertos.camara.leg.br/api/v2/:path*',
      },
    ];
  }
};

export default nextConfig;