/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    formats: ["image/avif", "image/webp"],
    remotePatterns: [
      { protocol: "https", hostname: "www.ludimagia.pt" },
      { protocol: "https", hostname: "uuxyiemoersrdkl4.public.blob.vercel-storage.com" },
      { protocol: "https", hostname: "roda-viva.pt" },
      { protocol: "https", hostname: "cdn0.casamentos.pt" },
      { protocol: "https", hostname: "static.wixstatic.com" },
      { protocol: "https", hostname: "irp.cdn-website.com" },
      { protocol: "https", hostname: "custom-images.strikinglycdn.com" },
      { protocol: "https", hostname: "www.barbaracaldeira.com" },
      { protocol: "https", hostname: "www.veeparty.pt" },
      { protocol: "https", hostname: "ateliermagico.pt" },
      { protocol: "https", hostname: "teatroinfantil.pt" },
      { protocol: "https", hostname: "www.espacokids.pt" },
    ],
  },
};

module.exports = nextConfig;
