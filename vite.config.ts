import { defineConfig } from "vite";
import path from "node:path";
import Vue from "@vitejs/plugin-vue";
import AutoImport from "unplugin-auto-import/vite";
import { vitePluginEdge } from "./vite-plugin-edge";

export default defineConfig({
	build: {
		ssr: "src/entry-server.ts",
		outDir: "dist/worker",
		minify: false,
	},
	resolve: {
		alias: {
			"~/": `${path.resolve(__dirname, "src")}/`,
		},
		dedupe: ["vue"],
	},
	ssr: {
		target: "webworker",
		noExternal: true,
	},
	plugins: [
		Vue({
			reactivityTransform: true,
		}),
		vitePluginEdge(),
		// https://github.com/antfu/unplugin-auto-import
		// AutoImport({
		// 	imports: ["vue", "vue/macros", "vue-router"],
		// 	dts: true,
		// 	dirs: ["./src/composables"],
		// 	vueTemplate: true,
		// }),
	],
});
