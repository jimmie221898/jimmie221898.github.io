import tailwindcss from "@tailwindcss/vite";
import react from "@vitejs/plugin-react";
import fs from "node:fs";
import path from "node:path";
import { defineConfig, type Plugin } from "vite";
import {
  pageMeta,
  pages,
  SITE_URL,
  type PageMeta,
} from "./client/src/lib/pageMeta";

// =============================================================================
// Page meta - Vite Plugin
// Title, description and link-preview tags per page, plus a static copy of
// index.html per route
// =============================================================================

// Placeholder in client/index.html that the tags replace
const PAGE_META_PLACEHOLDER = "<!-- page-meta -->";

const escapeHtml = (text: string) =>
  text
    .replace(/&/g, "&amp;")
    .replace(/"/g, "&quot;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;");

function metaTags(page: PageMeta) {
  const url = SITE_URL + page.path;
  const title = escapeHtml(page.title);
  const description = escapeHtml(page.description);
  return [
    `<title>${title}</title>`,
    `<meta name="description" content="${description}" />`,
    `<link rel="canonical" href="${url}" />`,
    `<meta property="og:type" content="website" />`,
    `<meta property="og:site_name" content="James Byrne" />`,
    `<meta property="og:title" content="${title}" />`,
    `<meta property="og:description" content="${description}" />`,
    `<meta property="og:url" content="${url}" />`,
    `<meta property="og:image" content="${SITE_URL}/og-image.png" />`,
    `<meta property="og:image:width" content="1200" />`,
    `<meta property="og:image:height" content="630" />`,
    `<meta name="twitter:card" content="summary_large_image" />`,
  ].join("\n    ");
}

/**
 * Fills in the home page's tags, and on build writes a copy of index.html per
 * route (capstone.html, project/project-1.html, ...) with that page's tags.
 * GitHub Pages serves /capstone from capstone.html, so deep links return 200
 * with the right preview instead of going through the 404.html redirect.
 */
function vitePluginPageMeta(): Plugin {
  let outDir = "";
  let isBuild = false;
  return {
    name: "page-meta",

    configResolved(config) {
      outDir = path.resolve(config.root, config.build.outDir);
      isBuild = config.command === "build";
    },

    transformIndexHtml(html) {
      return html.replace(PAGE_META_PLACEHOLDER, () => metaTags(pageMeta("/")));
    },

    closeBundle() {
      if (!isBuild) return;
      const html = fs.readFileSync(path.join(outDir, "index.html"), "utf-8");
      const homeTags = metaTags(pageMeta("/"));
      if (!html.includes(homeTags)) {
        throw new Error("page-meta: home page tags not found in index.html");
      }
      for (const page of pages) {
        if (page.path === "/") continue;
        const file = path.join(outDir, `${page.path.slice(1)}.html`);
        fs.mkdirSync(path.dirname(file), { recursive: true });
        fs.writeFileSync(
          file,
          html.replace(homeTags, () => metaTags(page))
        );
      }
    },
  };
}

const plugins = [react(), tailwindcss(), vitePluginPageMeta()];

export default defineConfig({
  plugins,
  resolve: {
    alias: {
      "@": path.resolve(import.meta.dirname, "client", "src"),
      "@shared": path.resolve(import.meta.dirname, "shared"),
      "@assets": path.resolve(import.meta.dirname, "attached_assets"),
    },
  },
  envDir: path.resolve(import.meta.dirname),
  root: path.resolve(import.meta.dirname, "client"),
  build: {
    outDir: path.resolve(import.meta.dirname, "dist/public"),
    emptyOutDir: true,
  },
  server: {
    port: 3000,
    strictPort: false, // Will find next available port if 3000 is busy
    host: true,
    allowedHosts: ["localhost", "127.0.0.1"],
    fs: {
      strict: true,
      deny: ["**/.*"],
    },
  },
});
