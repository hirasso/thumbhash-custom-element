import type { AstroIntegration } from "astro";
import { execSync } from "node:child_process";
import { cpSync, rmSync } from "node:fs";

export function buildAndInjectDistFiles(folder: string): AstroIntegration {
  return {
    name: "copy-files",
    hooks: {
      "astro:config:setup": async ({ config, command, isRestart }) => {
        if (command !== "build") return;

        // cleanup
        rmSync(`./website/public/${folder}`, { recursive: true, force: true });

        // build
        execSync("pnpm run build");

        // inject
        cpSync("./dist/", `./website/public/${folder}/`, { recursive: true });
      },
    },
  };
}
