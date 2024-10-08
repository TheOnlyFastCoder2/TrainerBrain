import path from 'path';
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

const setPath = (dir) => {
  return path.resolve(__dirname,dir)
}


// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  // Vite options tailored for Tauri development and only applied in `tauri dev` or `tauri build`
  // prevent vite from obscuring rust errors
  clearScreen: false,
  // tauri expects a fixed port, fail if that port is not available
  server: {
    port: 1420,
    strictPort: true,
  },
  // to make use of `TAURI_DEBUG` and other env variables
  // https://tauri.studio/v1/api/config#buildconfig.beforedevcommand
  envPrefix: ["VITE_", "TAURI_"],
  build: {
    // Tauri supports es2021
    target: ["es2021", "chrome100", "safari13"],
    // don't minify for debug builds
    minify: !process.env.TAURI_DEBUG ? "esbuild" : false,
    // produce sourcemaps for debug builds
    sourcemap: !!process.env.TAURI_DEBUG,
  },
  resolve: {
    alias: {
      "imgs": setPath("./src/assets/imgs"),
      "lib": setPath("./src/lib"),
      "games": setPath("./src/games"),
      "components": setPath("./src/components"),
      "styles": setPath("./src/assets/scss")
    }
  }
});
