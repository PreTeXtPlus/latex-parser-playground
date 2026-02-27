#!/usr/bin/env node

/**
 * Post-install script to restore symlinks for local unified-latex packages.
 * This ensures that changes to the source packages in ../unified-latex
 * are immediately reflected in the playground without rebuilding.
 */

const fs = require("fs");
const path = require("path");

const unifiedLatexDir = path.join(__dirname, "..", "..", "unified-latex", "packages");
const nodeModulesDir = path.join(__dirname, "..", "node_modules", "@unified-latex");

if (!fs.existsSync(nodeModulesDir)) {
    console.log("@unified-latex not found in node_modules, skipping symlink setup");
    process.exit(0);
}

// Get all unified-latex-* directories from the source
const packages = fs.readdirSync(unifiedLatexDir).filter((name) => {
    const fullPath = path.join(unifiedLatexDir, name);
    return fs.statSync(fullPath).isDirectory() && name.startsWith("unified-latex");
});

let symlinkCount = 0;
for (const pkgName of packages) {
    const sourcePath = path.join(unifiedLatexDir, pkgName);
    const targetPath = path.join(nodeModulesDir, pkgName);

    try {
        // Remove existing symlink or directory synchronously
        try {
            const stat = fs.lstatSync(targetPath);
            if (stat.isSymbolicLink()) {
                fs.unlinkSync(targetPath);
            } else {
                fs.rmSync(targetPath, { recursive: true, force: true });
            }
        } catch (e) {
            // Target doesn't exist, that's fine
        }

        // Create symlink
        fs.symlinkSync(sourcePath, targetPath, "dir");
        symlinkCount++;
    } catch (err) {
        console.warn(`Failed to symlink ${pkgName}:`, err.message);
    }
}

console.log(`✓ Restored ${symlinkCount} symlinks for development`);

