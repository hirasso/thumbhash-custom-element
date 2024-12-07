import type { AstroIntegration } from "astro";
import { execSync } from "node:child_process";
import { cpSync, rmSync } from "node:fs";

export function buildAndInjectDistFiles(folder: string): AstroIntegration {
  return {
    name: "build-and-inject",
    hooks: {
      "astro:config:setup": async ({ config, command, isRestart, logger }) => {
        if (command !== "build") return;

        logger.info("Building and injecting library...");

        // cleanup
        rmSync(`./website/public/${folder}`, { recursive: true, force: true });

        // build
        execSync("pnpm run build");

        // inject
        cpSync("./dist/", `./website/public/${folder}/`, { recursive: true });

        logger.info("Injected library into astro's /public folder!");
      },
    },
  };
}
