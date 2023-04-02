import type { Plugin } from "vite";

export function vitePluginEdge(): Plugin {
	return {
		name: "vite-plugin-edge",
		enforce: "pre",

		transform(code, id) {
			if (!/vue&type=edge/.test(id)) return;

			return /** js*/ `export default Comp => {
				globalThis.vueflareHasRun = false;
				globalThis.vueflareCountRuns = 0;
				Comp.edge = (vueflareContext) => { 
					if(true) {
					console.log(globalThis.vueflareCountRuns);
					globalThis.vueflareContext = vueflareContext;
					const useEdge = () => globalThis.vueflareContext;
					${code};
					globalThis.vueflareHasRun = true;
					globalThis.vueflareCountRuns ++;
					}
				 };
				globalThis.vueflareRun = Comp.edge;
			  }`;
		},
	};
}
