import tailwindcss from "@tailwindcss/vite";
import react from "@vitejs/plugin-react";
import { defineConfig } from "vite";

export default defineConfig({
  base: "/phperkaigi/2026/code-battle/",
  appType: "mpa",
  plugins: [tailwindcss(), react()],
});
