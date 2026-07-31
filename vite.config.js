import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";

export default defineConfig({
  // Base path for GitHub Pages deployment (project site)
  base: "/grace-community-church/",
  plugins: [react(), tailwindcss()],
});
