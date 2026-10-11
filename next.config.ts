import type { NextConfig } from "next";

// Web ini disajikan di root domainnya (komodo.safwan.id). Isi
// NEXT_PUBLIC_BASE_PATH hanya kalau suatu saat dipindah ke subpath.
const basePath = process.env.NEXT_PUBLIC_BASE_PATH || undefined;

const nextConfig: NextConfig = {
  basePath,
};

export default nextConfig;
