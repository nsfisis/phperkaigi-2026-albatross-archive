import { createReadStream, statSync } from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import tailwindcss from "@tailwindcss/vite";
import react from "@vitejs/plugin-react";
import { defineConfig, type Plugin } from "vite";
import tsconfigPaths from "vite-tsconfig-paths";

const archivesDir = fileURLToPath(new URL("./archives", import.meta.url));

const contentTypes: Record<string, string> = {
  ".json": "application/json",
  ".png": "image/png",
  ".jpg": "image/jpeg",
};

// Serve ./archives/{api,files} under the base path in the dev server.
// In production, nginx serves them instead (see /nginx.conf).
function serveArchives(): Plugin {
  return {
    name: "serve-archives",
    configureServer(server) {
      const base = server.config.base;
      server.middlewares.use((req, res, next) => {
        const url = (req.url ?? "").split("?")[0] ?? "";
        if (!url.startsWith(base)) {
          return next();
        }
        const rel = decodeURIComponent(url.slice(base.length));
        if (!rel.startsWith("api/") && !rel.startsWith("files/")) {
          return next();
        }
        const file = path.join(archivesDir, rel);
        const isFile =
          file.startsWith(archivesDir + path.sep) &&
          (statSync(file, { throwIfNoEntry: false })?.isFile() ?? false);
        if (!isFile) {
          res.statusCode = 404;
          res.end();
          return;
        }
        res.setHeader(
          "Content-Type",
          contentTypes[path.extname(file)] ?? "application/octet-stream",
        );
        createReadStream(file).pipe(res);
      });
    },
  };
}

export default defineConfig({
  base: process.env.ALBATROSS_BASE_PATH || "/",
  plugins: [tailwindcss(), react(), tsconfigPaths(), serveArchives()],
});
