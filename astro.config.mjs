import { defineConfig } from "astro/config";
import sitemap from "@astrojs/sitemap";

export default defineConfig({
  site: "https://misocloud.com",
  integrations: [sitemap()],
  output: "static",
});
