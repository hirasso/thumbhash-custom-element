import { defineConfig } from "astro/config";
import expressiveCode from "astro-expressive-code";
import mdx from "@astrojs/mdx";

import { buildAndInjectDistFiles } from "./integrations/buildAndInjectDistFiles.ts";

/** @type {import('astro-expressive-code').AstroExpressiveCodeOptions} */
const expressiveCodeOptions = {
  styleOverrides: {
    frames: {
      tooltipSuccessBackground: "#60ddcd",
      tooltipSuccessForeground: "black",
    },
  },
  // theme: 'dracula',
};



// https://astro.build/config
export default defineConfig({
  site: "https://thumbhash-custom-element.netlify.app",
  server: { port: 8274, host: false },
  devToolbar: {
    enabled: false
  },
  integrations: [
    buildAndInjectDistFiles('thumbhash-custom-element'),
    expressiveCode(expressiveCodeOptions),
    mdx(),
  ],
});
