import type { NextConfig } from "next";

// Di produksi web ini disajikan di safwan.id/komodo (lihat .env.production);
// saat dev tetap di root (http://localhost:3000).
const basePath = process.env.NEXT_PUBLIC_BASE_PATH || undefined;

const nextConfig: NextConfig = {
  basePath,
};

export default nextConfig;
