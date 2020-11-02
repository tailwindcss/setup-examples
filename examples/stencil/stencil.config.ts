import { Config } from "@stencil/core";

import { postcss } from "@stencil/postcss";
import autoprefixer from "autoprefixer";
import tailwindcss from "tailwindcss";
import cssnano from "cssnano";
import purgecss from "@fullhuman/postcss-purgecss";

const purge = purgecss({
  content: ["./src/**/*.tsx", "./src/index.html"],

  defaultExtractor: (content) => content.match(/[A-Za-z0-9-_:/]+/g) || [],
});

export const config: Config = {
  globalStyle: "src/global/app.css",
  outputTargets: [
    {
      type: "www",
      serviceWorker: null,
      baseUrl: "http://localhost:5000",
    },
  ],
  plugins: [
    postcss({
      plugins: [
        tailwindcss("./tailwind.config.js"),
        autoprefixer(),
        ...(process.env.NODE_ENV === "production" ? [purge, cssnano()] : []),
      ],
    }),
  ],
};
