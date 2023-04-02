// @vitest-environment happy-dom
import { createServer } from "vite";
import { describe, test, expect, vi } from "vitest";
import { renderToString } from "@vue/test-utils";
import Vue from "@vitejs/plugin-vue";
import { vitePluginEdge } from "../vite-plugin-edge";
import { defineComponent } from "vue";

describe("vite-plugin-edge", () => {
	test("should correctly parse and render the component", async () => {
		const spy = vi.spyOn(console, "log");

		const server = await createServer({
			plugins: [Vue()],
			configFile: false,
			build: {
				ssr: true,
			},
		});

		await server.listen();

		// Load the TestEdge.vue component using Vite's development server
		const url = `${server.config.base}tests/fixtures/TestEdge.vue`;
		const module = await server.ssrLoadModule(url);
		const component = defineComponent(module.default);

		// Mount the component using Vue Test Utils
		const rendered = await renderToString(component);

		expect(rendered).toMatch(
			'<div data-testid="test-div">Hello, World! 2</div>',
		);
		expect(spy).toHaveBeenCalledWith("Hello from script setup!");
		spy.mockRestore();
		await server.close();
	});

	test("should correctly parse edge blocks in Vue components", async () => {
		const spy = vi.spyOn(console, "log");

		const server = await createServer({
			plugins: [Vue(), vitePluginEdge()],
			configFile: false,
			build: {
				ssr: true,
			},
		});

		await server.listen();

		// Load the TestEdge.vue component using Vite's development server
		const url = `${server.config.base}tests/fixtures/TestEdge.vue`;
		const module = await server.ssrLoadModule(url);
		const component = defineComponent(module.default);
		const rendered = await renderToString(component);
		component.edge();
		expect(rendered).toMatch(
			'<div data-testid="test-div">Hello, World! 2</div>',
		);
		expect(spy).toHaveBeenCalledWith("Hello from edge!");
		spy.mockRestore();
	});
});
