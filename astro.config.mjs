import { defineConfig } from "astro/config";

import unocss from "unocss/astro";

import preact from "@astrojs/preact";
import react from "@astrojs/react";
import lit from "@astrojs/lit";

// https://astro.build/config
export default defineConfig({
    vite: {
        server: {
            proxy: {
                "/novelapi": {
                    target: "https://api.syosetu.com/novelapi/api",
                    changeOrigin: true,
                    secure: false,
                    rewrite: (path) => path.replace(/^\/novelapi/, ""),
                },
            },
        },
    },
    integrations: [preact(), react(), lit(), unocss({ injectReset: true })],
});
