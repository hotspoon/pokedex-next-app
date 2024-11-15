import type { NextConfig } from "next"

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "raw.githubusercontent.com",
        port: "",
        pathname: "/**",
        search: ""
      },
      {
        protocol: "https",
        hostname: "assets.pokemon.com",
        port: "",
        pathname: "/**",
        search: ""
      }
    ]
  }
}

export default nextConfig
