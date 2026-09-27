/**
 * Resolve the `@/*` tsconfig alias so Node's test runner can import the app's
 * source directly. Avoids adding a dependency (vitest/tsx) just to run tests.
 *
 * Two things are needed, because the app is written for a bundler resolver:
 *   1. `@/x` -> `<root>/src/x`
 *   2. the `.ts` / `.tsx` extension, which Node's ESM resolver will not infer
 *
 * Usage: node --import ./tests/alias-hooks.mjs --test tests/unit
 */
import { registerHooks } from "node:module";
import { pathToFileURL, fileURLToPath } from "node:url";
import { existsSync } from "node:fs";
import path from "node:path";

const root = path.resolve(import.meta.dirname, "..");
const EXTENSIONS = ["", ".ts", ".tsx", "/index.ts", "/index.tsx"];

registerHooks({
  resolve(specifier, context, nextResolve) {
    if (!specifier.startsWith("@/")) return nextResolve(specifier, context);

    const base = path.join(root, "src", specifier.slice(2));
    const match = EXTENSIONS.map((ext) => base + ext).find((f) => existsSync(f));
    if (!match) return nextResolve(specifier, context);

    return nextResolve(pathToFileURL(match).href, context);
  },
});

/** Silence the unused-import warning while keeping the helper available. */
export const toPath = (url) => fileURLToPath(url);
