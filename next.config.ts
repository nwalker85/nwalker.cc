import type { NextConfig } from "next";

// This site is a static export: `next build` emits plain HTML/CSS/JS into
// `out/`, and GitHub Pages serves it from a CDN. There is no origin server,
// so there is nothing to patch, restart, or 503.
//
// That has two consequences worth stating where the config lives:
//   1. `headers()` is not supported by `output: "export"`. Response headers
//      (HSTS, CSP, X-Content-Type-Options) are applied at the Cloudflare edge
//      instead, which sits in front of Pages. Keeping the rules here would be
//      a comment pretending to be a control.
//   2. `trailingSlash` is on so every route exports as `<route>/index.html`,
//      which GitHub Pages resolves without a redirect hop.
const nextConfig: NextConfig = {
  output: "export",
  trailingSlash: true,
  poweredByHeader: false,
  reactCompiler: true,
};

export default nextConfig;
