import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  test: {
    globals: true, // OBS: plural 'globals', inte 'global'
    environment: "jsdom",
    coverage: {
      provider: "v8", // snabb coverage
      reporter: ["text", "html"], // visa i terminal + html
      all: true, // täck alla källfiler
      statements: 90,
      branches: 90,
      functions: 90,
      lines: 90,
    },
  },
});
