// Tests import app modules the way the app does ("@/lib/…"). This hook teaches
// Node the same alias, so a test exercises the real file, never a copy of it.
import { registerHooks } from "node:module";
import { pathToFileURL } from "node:url";

registerHooks({
  resolve(specifier, context, nextResolve) {
    if (specifier.startsWith("@/")) {
      const target = new URL(`../src/${specifier.slice(2)}.js`, import.meta.url);
      return { url: pathToFileURL(target.pathname).href, shortCircuit: true };
    }
    return nextResolve(specifier, context);
  },
});