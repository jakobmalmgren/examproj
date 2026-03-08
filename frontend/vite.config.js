// import { defineConfig } from "vite";
// import react from "@vitejs/plugin-react";

// // https://vitejs.dev/config/
// export default defineConfig({
//   plugins: [react()],
//   test: {
//     globals: true, // OBS: plural 'globals', inte 'global'
//     environment: "jsdom",
//     coverage: {
//       provider: "v8", // snabb coverage
//       reporter: ["text", "html"], // visa i terminal + html
//       all: true, // täck alla källfiler
//       statements: 90,
//       branches: 90,
//       functions: 90,
//       lines: 90,
//     },
//   },
// });

import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import { resolve } from "path";

export default defineConfig({
  plugins: [react()],
    root: ".", // frontend är root
  build: {
    outDir: resolve(__dirname, "dist"), // bygg output till frontend/dist
    emptyOutDir: true,
  },
  test: {
    globals: true,
    environment: "jsdom",
    coverage: {
      provider: "v8",
      reporter: ["text", "html"],
      all: true,
      // ⚠ här sätter du thresholds
      thresholds: {
        statements: 90,
        branches: 90,
        functions: 90,
        lines: 90,
      },
    },
  },
});
