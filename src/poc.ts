import { pipeToWebWritable } from "vue/server-renderer";
import App from "../dist/worker/entry-server.js";

const handler: ExportedHandler = {
	async fetch(request, env) {
		console.log("Entering worker ...", { request, env });
		console.log(
			"VueFlare",
			globalThis.vueflareContext,
			globalThis.vueflareHasRun,
			globalThis.vueflareRun,
			globalThis.vueflareCountRuns,
		);
		const context = globalThis.vueflareRun({ request, env }); // This run the code on the edge
		console.log({ context });
		if (globalThis.vueflareContext)
			globalThis.vueflareContext.context = context; //We set the context here so we can use in the built App
		const { readable, writable } = new TransformStream();
		pipeToWebWritable(App, {}, writable);
		return new Response(readable, {
			headers: {
				"content-type": "text/html;charset=UTF-8",
			},
		});
	},
};

export default handler;
