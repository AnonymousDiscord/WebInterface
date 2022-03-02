import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tsconfigPaths from 'vite-tsconfig-paths';
import svgr from "vite-plugin-svgr";

export default defineConfig({
  plugins: [
    react(),
    tsconfigPaths(),
    svgr(),
    {
      name: 'Auto Minify',
      transformIndexHtml: {
        // This short method reduces the index.html by 24% (from 2.07 KiB to 1.57 KiB)
        transform: (html: string) => html.replaceAll(/<!--([^]*?)-->|\s?\B\s?/g, "")
      },
    }
  ],
  server: {
    port: 3000,
  },
  build: {
    sourcemap: "hidden",
    outDir: "build"
  },
  esbuild: {
    legalComments: "none"
  }
})