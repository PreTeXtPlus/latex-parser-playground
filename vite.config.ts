/// <reference types="node" />

import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import viteTsconfigPaths from "vite-tsconfig-paths";
import svgrPlugin from "vite-plugin-svgr";
import path from "path";
import fs from "fs";
import { createRequire } from "module";
const require = createRequire(import.meta.url);

// `unified-latex-utils-parse` is as good a dep as any to check the version of unified-latex from
const packageJsonPath = path.join(
    require.resolve("@unified-latex/unified-latex-util-parse"),
    "..",
    "package.json"
);
const packageJson = JSON.parse(fs.readFileSync(packageJsonPath, "utf-8"));
const unifiedLatexVersion = packageJson.version as string;
const unifiedLatexDeps = [
    "@unified-latex/unified-latex-lint",
    "@unified-latex/unified-latex-prettier",
    "@unified-latex/unified-latex-to-hast",
    "@unified-latex/unified-latex-to-mdast",
    "@unified-latex/unified-latex-to-pretext",
    "@unified-latex/unified-latex-util-parse",
    "@unified-latex/unified-latex-util-pegjs",
    "@unified-latex/unified-latex-util-pgfkeys",
    "@unified-latex/unified-latex-util-print-raw",
    "@unified-latex/unified-latex-util-replace",
    "@unified-latex/unified-latex-util-split",
    "@unified-latex/unified-latex-ctan",
    "@unified-latex/unified-latex",
    "@unified-latex/unified-latex-builder",
    "@unified-latex/unified-latex-types",
];

export default defineConfig({
    base: "./",
    plugins: [react(), viteTsconfigPaths(), svgrPlugin()],
    build: {
        sourcemap: true,
        minify: false,
        outDir: "docs",
    },
    server: {
        // Allow dev server to read from the unified-latex repo via symlink.
        fs: {
            allow: [
                "/files/GitHub/dev/latex-parser-playground",
                "/files/GitHub/dev/unified-latex",
            ],
        },
    },
    define: {
        __UNIFIED_LATEX_VERSION__: "'" + unifiedLatexVersion + "'",
    },
    resolve: {
        conditions: ["worker"],
    },
    optimizeDeps: {
        esbuildOptions: {
            conditions: ["worker"],
        },
    },
});
