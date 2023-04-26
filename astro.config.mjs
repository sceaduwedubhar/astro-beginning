import { defineConfig } from "astro/config";

import unocss from "@unocss/astro";

import preact from "@astrojs/preact";
import react from "@astrojs/react";
import lit from "@astrojs/lit";

// https://astro.build/config
export default defineConfig({
    vite: {},
    integrations: [preact(), react(), lit(), unocss()],
});
