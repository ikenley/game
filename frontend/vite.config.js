import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig(() => {
  return {
    server: {
      open: true,
      proxy: {
        "/game/api": {
          target: "http://localhost:8090",
          changeOrigin: true,
        },
        "/auth/api": {
          target: "http://localhost:8088",
          changeOrigin: true,
        },
      },
    },
    // https://github.com/vitejs/vite/issues/1973#issuecomment-787571499
    define: {
      "process.env": {},
    },
    build: {
      outDir: "build",
    },
    plugins: [react()],
    base: "/game",
    test: {
      globals: true,
      environment: "jsdom",
      parallel: true,
      setupFiles: "./tests/setup.js",
    },
  };
});
