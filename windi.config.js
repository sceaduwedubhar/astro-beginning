import { defineConfig } from "windicss/helpers";

export default defineConfig({
    darkMode: false, // or 'media'
    corePlugins: {
        container: false,
    },
    theme: {
        extend: {},
    },
    extract: {
        include: ["./src/**/*.{vue,html,jsx,tsx,astro}"],
        exclude: ["node_modules", ".git"],
    },
    plugins: [
        require("windicss/plugin/filters"),
        require("windicss/plugin/forms"),
        require("windicss/plugin/aspect-ratio"),
        require("windicss/plugin/line-clamp"),
        require("windicss/plugin/typography"),
    ],
});
