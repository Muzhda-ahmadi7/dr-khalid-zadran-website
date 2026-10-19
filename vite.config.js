import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";

// VITE_BASE lets a host such as GitHub Pages serve the app from a sub-path
// (e.g. /dr-khalid-zadran-website/). Locally it stays "/" so `npm run dev` is unaffected.
export default defineConfig({
  plugins: [react(), tailwindcss()],
  base: process.env.VITE_BASE || "/",
});